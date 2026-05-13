"""
OSPP Research API — RAG server (port 8001)
==========================================
Uses Ollama local models + ChromaDB. No API key required.

Start:
    source .venv/bin/activate
    python research/api.py

Default model: qwen2.5:7b (change with OLLAMA_MODEL env var)
Ollama must be running: ollama serve
"""

import asyncio
import json
import os
import sys
from pathlib import Path
from typing import AsyncIterator

import chromadb
import requests
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer

# ── Config ───────────────────────────────────────────────────────────────────

ROOT = Path(__file__).parent.parent
VECTORDB_DIR = ROOT / "research" / "vectordb"

load_dotenv(ROOT / ".env")

OLLAMA_URL   = os.getenv("OLLAMA_URL",   "http://localhost:11434")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "qwen2.5:7b")

DOMAIN_MAP = {
    "economy":     "economy",
    "education":   "education",
    "environment": "environment",
    "social":      "social",
    "health":      "health",
    "governance":  None,   # fallback → multi-domain search
}

# ── App ───────────────────────────────────────────────────────────────────────

app = FastAPI(title="OSPP Research API", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:4173",
        "http://127.0.0.1:3000",
    ],
    allow_methods=["POST", "GET", "OPTIONS"],
    allow_headers=["*"],
)

# ── Lazy singletons ───────────────────────────────────────────────────────────

_embed_model: SentenceTransformer | None = None
_collections: dict[str, chromadb.Collection] = {}


def get_embed_model() -> SentenceTransformer:
    global _embed_model
    if _embed_model is None:
        _embed_model = SentenceTransformer("all-MiniLM-L6-v2")
    return _embed_model


def get_collection(domain: str) -> chromadb.Collection | None:
    if domain in _collections:
        return _collections[domain]
    db_path = VECTORDB_DIR / domain
    if not db_path.exists():
        return None
    try:
        client = chromadb.PersistentClient(path=str(db_path))
        col = client.get_collection(f"ospp_{domain}")
        _collections[domain] = col
        return col
    except Exception:
        return None


# ── Request model ─────────────────────────────────────────────────────────────

class AskRequest(BaseModel):
    question:         str
    domain:           str
    proposal_id:      str = ""
    proposal_title:   str = ""
    proposal_summary: str = ""


# ── RAG retrieval ─────────────────────────────────────────────────────────────

def retrieve(question: str, domain: str, n: int = 5) -> tuple[list[str], list[dict]]:
    model  = get_embed_model()
    q_vec  = model.encode([question]).tolist()
    db_dom = DOMAIN_MAP.get(domain)
    domains_to_search = [db_dom] if db_dom else [d for d in DOMAIN_MAP.values() if d]

    all_chunks, all_metas, all_scores = [], [], []
    for d in domains_to_search:
        col = get_collection(d)
        if col is None:
            continue
        try:
            res = col.query(query_embeddings=q_vec, n_results=n)
            all_chunks.extend(res["documents"][0])
            all_metas.extend(res["metadatas"][0])
            all_scores.extend([1 - dist for dist in res["distances"][0]])
        except Exception:
            continue

    ranked = sorted(zip(all_scores, all_chunks, all_metas), reverse=True)[:n]
    chunks, sources = [], []
    for i, (score, chunk, meta) in enumerate(ranked):
        chunks.append(chunk)
        sources.append({
            "rank":      i + 1,
            "title":     meta.get("title", "Unknown source"),
            "authors":   meta.get("authors", ""),
            "year":      str(meta.get("year", "")),
            "subdomain": meta.get("subdomain", ""),
            "score":     round(score, 3),
        })
    return chunks, sources


# ── Ollama streaming ──────────────────────────────────────────────────────────

async def stream_answer(
    question:          str,
    chunks:            list[str],
    sources:           list[dict],
    proposal_title:    str,
    proposal_summary:  str,
) -> AsyncIterator[str]:

    # 1. Emit sources immediately so the UI can show them while the LLM thinks
    yield f"data: {json.dumps({'type': 'sources', 'sources': sources})}\n\n"

    # 2. Build context string
    context = "\n\n---\n\n".join(
        f"[Source {i+1}] {s['title']} ({s['authors']}, {s['year']})\n{chunk[:900]}"
        for i, (s, chunk) in enumerate(zip(sources, chunks))
    )

    system = (
        "You are a scientific policy assistant for the OSPP open-source platform. "
        "Answer questions about political proposals using peer-reviewed evidence.\n\n"
        "Rules:\n"
        "- Reply in the same language as the question "
        "(French if in French, English otherwise)\n"
        "- Be concise: 3–5 sentences maximum\n"
        "- Cite sources by number: [Source 1], [Source 2]…\n"
        "- Only use information from the provided context\n"
        "- If the sources don't answer the question, say so honestly\n"
        "- Tone: clear, neutral, evidence-based, no jargon"
    )

    user_msg = (
        f"Proposal: {proposal_title}\n"
        f"Summary: {proposal_summary}\n\n"
        f"Research context:\n{context}\n\n"
        f"Question: {question}\n\n"
        "Answer concisely (cite sources by number):"
    )

    payload = {
        "model":    OLLAMA_MODEL,
        "messages": [
            {"role": "system",  "content": system},
            {"role": "user",    "content": user_msg},
        ],
        "stream":  True,
        "options": {
            "num_predict": 512,
            "temperature": 0.3,
        },
    }

    # 3. Stream from Ollama
    try:
        with requests.post(
            f"{OLLAMA_URL}/api/chat",
            json=payload,
            stream=True,
            timeout=60,
        ) as resp:
            resp.raise_for_status()
            for raw_line in resp.iter_lines():
                if not raw_line:
                    continue
                try:
                    obj = json.loads(raw_line)
                except json.JSONDecodeError:
                    continue

                token = obj.get("message", {}).get("content", "")
                if token:
                    yield f"data: {json.dumps({'type': 'text', 'text': token})}\n\n"
                    await asyncio.sleep(0)   # yield control to event loop

                if obj.get("done"):
                    break

    except requests.exceptions.ConnectionError:
        msg = "Cannot connect to Ollama. Run: ollama serve"
        yield f"data: {json.dumps({'type': 'error', 'message': msg})}\n\n"
    except requests.exceptions.HTTPError as e:
        if e.response is not None and e.response.status_code == 404:
            msg = (
                f"Model {OLLAMA_MODEL!r} not found. "
                f"Run: ollama pull {OLLAMA_MODEL}"
            )
            yield f"data: {json.dumps({'type': 'error', 'message': msg})}\n\n"
        else:
            yield f"data: {json.dumps({'type': 'error', 'message': str(e)})}\n\n"
    except Exception as e:
        yield f"data: {json.dumps({'type': 'error', 'message': str(e)})}\n\n"

    yield f"data: {json.dumps({'type': 'done'})}\n\n"


# ── Endpoints ─────────────────────────────────────────────────────────────────

@app.get("/health")
def health():
    # Check Ollama
    try:
        r = requests.get(f"{OLLAMA_URL}/api/tags", timeout=3)
        ollama_ok    = r.status_code == 200
        ollama_models = [m["name"] for m in r.json().get("models", [])]
    except Exception:
        ollama_ok    = False
        ollama_models = []

    # Check ChromaDB collections
    dbs = {}
    for label, db_domain in DOMAIN_MAP.items():
        if db_domain is None:
            dbs[label] = "→ multi-domain"
            continue
        col = get_collection(db_domain)
        dbs[label] = col.count() if col else 0

    return {
        "status":        "ok",
        "ollama": {
            "ok": ollama_ok,
            "model": OLLAMA_MODEL,
            "available": ollama_models,
        },
        "collections":   dbs,
        "total_chunks":  sum(v for v in dbs.values() if isinstance(v, int)),
    }


@app.post("/ask")
async def ask(req: AskRequest):
    if not req.question.strip():
        raise HTTPException(400, "Question cannot be empty")

    chunks, sources = retrieve(req.question, req.domain)
    if not chunks:
        raise HTTPException(404, f"No research data found for domain '{req.domain}'")

    return StreamingResponse(
        stream_answer(
            req.question, chunks, sources,
            req.proposal_title, req.proposal_summary,
        ),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )


# ── Entry point ───────────────────────────────────────────────────────────────

if __name__ == "__main__":
    import uvicorn
    print(f"Starting OSPP Research API — model: {OLLAMA_MODEL}")
    print(f"Ollama: {OLLAMA_URL}")
    print(f"ChromaDB: {VECTORDB_DIR}")
    uvicorn.run(app, host="127.0.0.1", port=8001, log_level="warning")
