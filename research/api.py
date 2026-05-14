"""
OSPP Research API — RAG + Votes server (port 8001)
===================================================
Uses Ollama local models + ChromaDB + SQLite. No Docker required.

Start:
    source .venv/bin/activate
    python research/api.py

Default model: qwen2.5:7b (change with OLLAMA_MODEL env var)
Ollama must be running: ollama serve
"""

import asyncio
import base64
import hashlib
import json
import os
import sqlite3
import sys
import time
from contextlib import contextmanager
from pathlib import Path
from typing import AsyncIterator

# Ensure project root is on the path so `simulation` package is importable
sys.path.insert(0, str(Path(__file__).parent.parent))

import chromadb
import requests
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.util import get_remote_address

# ── Config ───────────────────────────────────────────────────────────────────

ROOT = Path(__file__).parent.parent
VECTORDB_DIR = ROOT / "research" / "vectordb"

load_dotenv(ROOT / ".env")

OLLAMA_URL   = os.getenv("OLLAMA_URL",   "http://localhost:11434")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "qwen2.5:7b")

DB_PATH = ROOT / "research" / "votes.db"

DOMAIN_MAP = {
    "economy":     "economy",
    "education":   "education",
    "environment": "environment",
    "social":      "social",
    "health":      "health",
    "governance":  None,   # fallback → multi-domain search
}

# ── SQLite votes DB ──────────────────────────────────────────────────────────

def _init_db() -> None:
    with sqlite3.connect(DB_PATH) as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS votes (
                proposal_id TEXT NOT NULL,
                voter_hash  TEXT NOT NULL,
                value       INTEGER NOT NULL CHECK(value IN (1, -1)),
                ts          INTEGER DEFAULT (strftime('%s','now')),
                PRIMARY KEY (proposal_id, voter_hash)
            )
        """)
        conn.execute("""
            CREATE TABLE IF NOT EXISTS seed_votes (
                proposal_id TEXT PRIMARY KEY,
                support     INTEGER NOT NULL DEFAULT 0,
                oppose      INTEGER NOT NULL DEFAULT 0
            )
        """)
        # Seed realistic starting counts
        seeds = [
            ("ECO-FR-001",     847,  203),
            ("SOC-FR-001",     612,  318),
            ("ENV-FR-001",     934,  142),
            ("EDU-FR-001",     721,   89),
            ("ECO-US-001",    1204,  387),
            ("GOV-GLOBAL-001", 502,   61),
            ("ECO-DK-001",     388,   72),
            ("EDU-DK-001",     291,   44),
            ("SOC-DK-001",     443,  118),
            ("ECO-DE-001",     519,  143),
            ("ENV-DE-001",     612,  201),
            ("SOC-SE-001",     734,   88),
            ("ECO-NO-001",     289,   41),
            ("ENV-NO-001",     821,  134),
            ("EDU-FI-001",     677,   92),
            ("ECO-FI-001",     534,  287),
            ("SOC-FI-001",     498,   33),
            ("HLT-CA-001",     891,  102),
            ("ECO-CA-001",     643,  228),
            ("HLT-GB-001",     1102, 344),
            ("SOC-GB-001",     788,  267),
        ]
        conn.executemany(
            "INSERT OR IGNORE INTO seed_votes VALUES (?,?,?)", seeds
        )


@contextmanager
def _db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
        conn.commit()
    finally:
        conn.close()


def _b64url_to_int(s: str) -> int:
    """Decode a base64url-encoded JWK coordinate to an integer."""
    pad = 4 - len(s) % 4
    return int.from_bytes(base64.urlsafe_b64decode(s + ("=" * pad if pad != 4 else "")), "big")


def _p1363_to_der(sig: bytes) -> bytes:
    """Convert IEEE P1363 ECDSA signature (r‖s, 64 bytes) to DER format."""
    r = int.from_bytes(sig[:32], "big")
    s = int.from_bytes(sig[32:], "big")

    def _enc(n: int) -> bytes:
        b = n.to_bytes((n.bit_length() + 7) // 8, "big")
        if b[0] & 0x80:
            b = b"\x00" + b
        return bytes([0x02, len(b)]) + b

    r_enc, s_enc = _enc(r), _enc(s)
    return bytes([0x30, len(r_enc) + len(s_enc)]) + r_enc + s_enc


def verify_ecdsa_vote(
    proposal_id: str,
    value: int,
    timestamp: int,
    public_key_jwk: dict,
    signature_b64: str,
) -> str:
    """
    Verify an ECDSA-P256 vote signature from the browser's Web Crypto API.
    Returns the voter_hash (SHA-256 of public key coords) on success.
    Raises ValueError on any verification failure.
    """
    from cryptography.hazmat.primitives.asymmetric.ec import (
        ECDSA, SECP256R1, EllipticCurvePublicNumbers,
    )
    from cryptography.hazmat.primitives import hashes
    from cryptography.exceptions import InvalidSignature

    # ── Timestamp freshness: ±5 min ──────────────────────────────────────────
    now_ms = int(time.time() * 1000)
    if abs(now_ms - timestamp) > 5 * 60 * 1000:
        raise ValueError("Vote timestamp expired (±5 min window)")

    # ── Validate JWK key type ────────────────────────────────────────────────
    if public_key_jwk.get("kty") != "EC" or public_key_jwk.get("crv") != "P-256":
        raise ValueError("Only P-256 EC keys are accepted")

    # ── Reconstruct public key from JWK x / y coordinates ───────────────────
    x = _b64url_to_int(public_key_jwk["x"])
    y = _b64url_to_int(public_key_jwk["y"])
    pub = EllipticCurvePublicNumbers(x, y, SECP256R1()).public_key()

    # ── Decode signature: base64 → bytes → P1363 → DER ──────────────────────
    sig_bytes = base64.b64decode(signature_b64)
    if len(sig_bytes) != 64:
        raise ValueError("Invalid signature length (expected 64 bytes for P-256)")
    der_sig = _p1363_to_der(sig_bytes)

    # ── Verify ───────────────────────────────────────────────────────────────
    message = f"{proposal_id}:{value}:{timestamp}".encode()
    try:
        pub.verify(der_sig, message, ECDSA(hashes.SHA256()))
    except InvalidSignature:
        raise ValueError("Invalid ECDSA signature")

    # ── Voter hash: SHA-256 of public key coordinates (anonymous identifier) ─
    return hashlib.sha256(
        f"{public_key_jwk['x']}:{public_key_jwk['y']}".encode()
    ).hexdigest()


def get_counts(proposal_id: str) -> dict:
    with _db() as conn:
        seed = conn.execute(
            "SELECT support, oppose FROM seed_votes WHERE proposal_id=?",
            (proposal_id,)
        ).fetchone()
        s0 = seed["support"] if seed else 0
        o0 = seed["oppose"]  if seed else 0

        row = conn.execute("""
            SELECT
                COALESCE(SUM(CASE WHEN value=1  THEN 1 ELSE 0 END), 0) AS s,
                COALESCE(SUM(CASE WHEN value=-1 THEN 1 ELSE 0 END), 0) AS o
            FROM votes WHERE proposal_id=?
        """, (proposal_id,)).fetchone()

    support = s0 + row["s"]
    oppose  = o0 + row["o"]
    total   = support + oppose
    return {
        "proposal_id": proposal_id,
        "support": support,
        "oppose":  oppose,
        "total":   total,
        "support_pct": round(support / total * 100) if total else 50,
    }


# ── App ───────────────────────────────────────────────────────────────────────

app = FastAPI(title="OSPP Research API", version="3.0.0")

# ── Rate limiting ─────────────────────────────────────────────────────────────
limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# ── CORS ─────────────────────────────────────────────────────────────────────
_CORS_ORIGINS = [
    o.strip()
    for o in os.getenv(
        "CORS_ORIGINS",
        "http://localhost:3000,http://localhost:4173,http://127.0.0.1:3000",
    ).split(",")
    if o.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=_CORS_ORIGINS,
    allow_methods=["POST", "GET", "OPTIONS"],
    allow_headers=["Content-Type", "Accept"],
)


@app.middleware("http")
async def security_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    return response


@app.on_event("startup")
def startup():
    _init_db()

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
@limiter.limit("20/minute")
async def ask(request: Request, req: AskRequest):
    if not req.question.strip():
        raise HTTPException(400, "Question cannot be empty")
    if len(req.question) > 500:
        raise HTTPException(400, "Question too long (max 500 chars)")

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


# ── Vote endpoints ───────────────────────────────────────────────────────────

class VoteRequest(BaseModel):
    public_key_jwk: dict   # ECDSA P-256 public key in JWK format
    signature:      str    # base64-encoded IEEE P1363 signature
    timestamp:      int    # ms since epoch (used in signed message)
    value:          int    # 1 = support, -1 = oppose, 0 = remove


@app.get("/votes/{proposal_id}")
def vote_get(proposal_id: str):
    return get_counts(proposal_id)


@app.post("/votes/{proposal_id}")
@limiter.limit("30/minute")
def vote_post(request: Request, proposal_id: str, req: VoteRequest):
    if req.value not in (1, -1, 0):
        raise HTTPException(400, "value must be 1, -1, or 0")

    try:
        vh = verify_ecdsa_vote(
            proposal_id,
            req.value,
            req.timestamp,
            req.public_key_jwk,
            req.signature,
        )
    except ValueError as exc:
        raise HTTPException(400, str(exc))

    with _db() as conn:
        if req.value == 0:
            conn.execute(
                "DELETE FROM votes WHERE proposal_id=? AND voter_hash=?",
                (proposal_id, vh),
            )
        else:
            conn.execute(
                """INSERT INTO votes (proposal_id, voter_hash, value)
                   VALUES (?, ?, ?)
                   ON CONFLICT(proposal_id, voter_hash)
                   DO UPDATE SET value=excluded.value,
                                 ts=strftime('%s','now')""",
                (proposal_id, vh, req.value),
            )

    return get_counts(proposal_id)


@app.get("/votes")
def votes_all():
    """Return counts for every proposal that has at least one seed."""
    with _db() as conn:
        rows = conn.execute(
            "SELECT proposal_id FROM seed_votes"
        ).fetchall()
    return {r["proposal_id"]: get_counts(r["proposal_id"]) for r in rows}


# ── Simulation endpoint ──────────────────────────────────────────────────────

class SimulateRequest(BaseModel):
    proposal_id:    str
    title:          str
    country:        str = "fr"
    domain:         str = "economy"
    body:           str = ""
    n_agents:       int = 10_000
    seed:           int = 42
    horizon_years:  int | None = None   # overrides policy horizon if given
    scenario:       str = "baseline"    # baseline | optimistic | pessimistic


def _apply_scenario(policy, scenario: str):
    """Scale PolicyParams effects by scenario multiplier."""
    if scenario == "baseline":
        return policy
    mult_pos = 1.30 if scenario == "optimistic" else 0.70
    mult_neg = 0.70 if scenario == "optimistic" else 1.30
    from dataclasses import replace
    return replace(
        policy,
        income_multiplier=1 + (policy.income_multiplier - 1)
        * (mult_pos if policy.income_multiplier >= 1 else mult_neg),
        employment_delta=policy.employment_delta
        * (mult_pos if policy.employment_delta >= 0 else mult_neg),
        monthly_transfer=policy.monthly_transfer * mult_pos,
        wellbeing_delta=policy.wellbeing_delta * mult_pos,
        gini_delta=policy.gini_delta
        * (mult_pos if policy.gini_delta <= 0 else mult_neg),
    )


@app.post("/simulate")
@limiter.limit("5/hour")
def simulate(request: Request, req: SimulateRequest):
    """Run an ABM policy simulation and return time-series results."""
    if req.n_agents < 100:
        raise HTTPException(400, "n_agents must be ≥ 100")
    if req.n_agents > 50_000:
        raise HTTPException(400, "n_agents must be ≤ 50 000")
    if req.scenario not in ("baseline", "optimistic", "pessimistic"):
        raise HTTPException(400, "scenario must be baseline|optimistic|pessimistic")

    try:
        from simulation.policy_parser import parse_proposal_dict
        from simulation.model import run_simulation

        policy = parse_proposal_dict(
            req.proposal_id, req.title,
            req.country, req.domain, req.body,
        )
        if req.horizon_years is not None:
            from dataclasses import replace
            policy = replace(policy, horizon_years=req.horizon_years)
        policy = _apply_scenario(policy, req.scenario)
        results = run_simulation(policy, n_agents=req.n_agents, seed=req.seed)
        results["meta"]["scenario"] = req.scenario
        return results

    except Exception as exc:
        raise HTTPException(500, str(exc)) from exc


# ── Simulation interpretation (streaming) ────────────────────────────────────

class InterpretRequest(BaseModel):
    summary: dict
    meta:    dict


async def _stream_interpretation(
    meta: dict, summary: dict
) -> AsyncIterator[str]:
    """Ask Ollama to narrate simulation results in 4 paragraphs (SSE)."""
    title   = meta.get("title", "this policy")
    country = meta.get("country", "").upper()
    years   = meta.get("horizon_years", 5)
    n       = meta.get("n_agents", 0)
    scenario = meta.get("scenario", "baseline")

    def fmt(v, unit="", positive_good=True):
        sign = "+" if v >= 0 else ""
        good = (v >= 0) == positive_good
        label = "↑" if v >= 0 else "↓"
        return f"{sign}{v:.2f}{unit} {label} ({'positive' if good else 'negative'})"

    lines = [
        f"Simulation: {title} — {country}, {n:,} agents, {years} years ({scenario})",
        "",
        "Economic outcomes:",
        f"  GDP/capita:       {fmt(summary.get('gdp_delta_pct', 0), '%')}",
        f"  Gini coefficient: {fmt(summary.get('gini_delta', 0), '', positive_good=False)}",
        f"  Employment rate:  {fmt(summary.get('employment_delta', 0)*100, ' pp')}",
        f"  Poverty rate:     {fmt(summary.get('poverty_delta', 0)*100, ' pp', False)}",
        f"  Wellbeing index:  {fmt(summary.get('wellbeing_delta', 0)*100, ' pp')}",
        "",
        "Environmental outcomes:",
        f"  Carbon footprint: {fmt(summary.get('carbon_delta_pct', 0), '%', False)}",
        f"  Green behaviour:  {fmt(summary.get('green_delta', 0)*100, ' pp')}",
        "",
        "Social outcomes:",
        f"  Health score:     {fmt(summary.get('health_delta', 0)*100, ' pp')}",
        f"  Social trust:     {fmt(summary.get('trust_delta', 0)*100, ' pp')}",
    ]
    context = "\n".join(lines)

    system = (
        "You are an expert policy analyst for the OSPP open-source platform. "
        "You receive agent-based simulation results and write a clear, "
        "evidence-based interpretation.\n"
        "Rules:\n"
        "- Reply in the same language as the policy title "
        "(French if title is in French, English otherwise)\n"
        "- Write exactly 4 short paragraphs:\n"
        "  1. Overall verdict (2–3 sentences)\n"
        "  2. Economic analysis and distributional effects\n"
        "  3. Environmental and social impact\n"
        "  4. Caveats, limitations, policy recommendations\n"
        "- Be precise, cite the numbers, stay neutral\n"
        "- Max 250 words total"
    )

    payload = {
        "model":   OLLAMA_MODEL,
        "messages": [
            {"role": "system", "content": system},
            {"role": "user",   "content": context},
        ],
        "stream":  True,
        "options": {"num_predict": 512, "temperature": 0.4},
    }

    try:
        with requests.post(
            f"{OLLAMA_URL}/api/chat",
            json=payload, stream=True, timeout=60,
        ) as resp:
            resp.raise_for_status()
            for raw in resp.iter_lines():
                if not raw:
                    continue
                try:
                    obj = json.loads(raw)
                except json.JSONDecodeError:
                    continue
                token = obj.get("message", {}).get("content", "")
                if token:
                    yield (
                        f"data: {json.dumps({'type': 'text', 'text': token})}\n\n"
                    )
                    await asyncio.sleep(0)
                if obj.get("done"):
                    break
    except requests.exceptions.ConnectionError:
        msg = "Ollama offline — run: ollama serve"
        yield f"data: {json.dumps({'type': 'error', 'message': msg})}\n\n"
    except Exception as e:
        yield f"data: {json.dumps({'type': 'error', 'message': str(e)})}\n\n"

    yield f"data: {json.dumps({'type': 'done'})}\n\n"


@app.post("/simulate/interpret")
@limiter.limit("10/hour")
async def simulate_interpret(request: Request, req: InterpretRequest):
    """Stream an Ollama interpretation of simulation results."""
    return StreamingResponse(
        _stream_interpretation(req.meta, req.summary),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )


# ── Monte Carlo endpoint ─────────────────────────────────────────────────────

class MonteCarloRequest(BaseModel):
    proposal_id:    str
    title:          str
    country:        str = "fr"
    domain:         str = "economy"
    body:           str = ""
    n_agents:       int = 2_000
    n_runs:         int = 10
    horizon_years:  int | None = None
    scenario:       str = "baseline"


def _mc_percentile(values: list, p: float) -> float:
    """Simple percentile without numpy dependency on sorted list."""
    if not values:
        return 0.0
    s = sorted(values)
    idx = (len(s) - 1) * p / 100
    lo, hi = int(idx), min(int(idx) + 1, len(s) - 1)
    return round(s[lo] + (s[hi] - s[lo]) * (idx - lo), 4)


def _aggregate_runs(runs: list[dict]) -> dict:
    """Aggregate N simulation results into mean/std/p5/p95 per metric per year."""
    if not runs:
        return {}

    n = len(runs)
    first = runs[0]
    years = [s["year"] for s in first["series"]]

    # Identify all numeric metric keys from first series point
    metric_keys = [
        k for k, v in first["series"][0].items()
        if isinstance(v, (int, float)) and k != "year"
    ]

    series_agg = []
    for i, year in enumerate(years):
        point: dict = {"year": year}
        for mk in metric_keys:
            vals = [r["series"][i][mk] for r in runs if i < len(r["series"])]
            if not vals:
                continue
            mean = sum(vals) / n
            std = (sum((v - mean) ** 2 for v in vals) / n) ** 0.5
            point[mk] = {
                "mean":   round(mean, 4),
                "std":    round(std,  4),
                "p5":     _mc_percentile(vals, 5),
                "p95":    _mc_percentile(vals, 95),
                "min":    round(min(vals), 4),
                "max":    round(max(vals), 4),
            }
        series_agg.append(point)

    # Summary = final year aggregation
    summary_keys = list(first["summary"].keys())
    summary_agg: dict = {}
    for sk in summary_keys:
        vals = [r["summary"][sk] for r in runs
                if isinstance(r["summary"].get(sk), (int, float))]
        if not vals:
            continue
        mean = sum(vals) / n
        std = (sum((v - mean) ** 2 for v in vals) / n) ** 0.5
        summary_agg[sk] = {
            "mean": round(mean, 4),
            "std":  round(std,  4),
            "p5":   _mc_percentile(vals, 5),
            "p95":  _mc_percentile(vals, 95),
            "values": [round(v, 4) for v in vals],
        }

    return {
        "meta": {
            **first["meta"],
            "n_runs": n,
        },
        "summary": summary_agg,
        "series": series_agg,
    }


@app.post("/simulate/montecarlo")
@limiter.limit("2/hour")
def simulate_montecarlo(request: Request, req: MonteCarloRequest):
    """Run N simulations with different seeds and return aggregated stats."""
    if req.n_agents < 100:
        raise HTTPException(400, "n_agents must be ≥ 100")
    if req.n_agents > 20_000:
        raise HTTPException(400, "n_agents must be ≤ 20 000 for Monte Carlo")
    if req.n_runs < 2:
        raise HTTPException(400, "n_runs must be ≥ 2")
    if req.n_runs > 50:
        raise HTTPException(400, "n_runs must be ≤ 50")

    try:
        from concurrent.futures import ThreadPoolExecutor
        from simulation.policy_parser import parse_proposal_dict
        from simulation.model import run_simulation
        from dataclasses import replace

        policy = parse_proposal_dict(
            req.proposal_id, req.title,
            req.country, req.domain, req.body,
        )
        if req.horizon_years is not None:
            policy = replace(policy, horizon_years=req.horizon_years)
        policy = _apply_scenario(policy, req.scenario)

        def _run(seed: int) -> dict:
            return run_simulation(policy, n_agents=req.n_agents, seed=seed)

        with ThreadPoolExecutor(max_workers=min(req.n_runs, 4)) as pool:
            runs = list(pool.map(_run, range(req.n_runs)))

        result = _aggregate_runs(runs)
        result["meta"]["scenario"] = req.scenario
        return result

    except Exception as exc:
        raise HTTPException(500, str(exc)) from exc


# ── Entry point ───────────────────────────────────────────────────────────────

if __name__ == "__main__":
    import uvicorn
    print(f"Starting OSPP Research API — model: {OLLAMA_MODEL}")
    print(f"Ollama: {OLLAMA_URL}")
    print(f"ChromaDB: {VECTORDB_DIR}")
    uvicorn.run(app, host="127.0.0.1", port=8001, log_level="warning")
