"""
OSPP Research Pipeline
======================
Usage:
    conda activate ospp

    # Step 1 — download PDFs
    python research/pipeline.py download --domain economy

    # Step 2 — build vector DB from downloaded PDFs
    python research/pipeline.py embed --domain economy

    # Step 3 — query the vector DB (test)
    python research/pipeline.py query --domain economy --q "minimum wage employment effects"
"""

import argparse
import hashlib
import json
import os
import re
import sys
import time
from pathlib import Path

import requests
from tqdm import tqdm

ROOT = Path(__file__).parent.parent
RESEARCH_DIR = ROOT / "research"
VECTORDB_DIR = RESEARCH_DIR / "vectordb"

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def parse_catalog(domain: str) -> list[dict]:
    """Extract all PDF entries from a CATALOG.md file."""
    catalog_path = RESEARCH_DIR / domain / "CATALOG.md"
    if not catalog_path.exists():
        sys.exit(f"No catalog found at {catalog_path}")

    entries = []
    current_section = ""
    for line in catalog_path.read_text().splitlines():
        # Section header (sub-domain)
        if line.startswith("## "):
            current_section = line.lstrip("# ").split("—")[0].strip()

        # Table row with a PDF URL
        if line.startswith("|") and "http" in line and ".pdf" in line.lower():
            cols = [c.strip() for c in line.split("|")[1:-1]]
            if len(cols) < 6:
                continue
            # Extract URL from markdown link or plain text
            url_col = cols[5]
            url_match = re.search(r'https?://\S+', url_col)
            if not url_match:
                continue
            url = url_match.group(0).rstrip(")")
            if not url.lower().endswith(".pdf"):
                continue
            entries.append({
                "id": cols[0],
                "title": cols[1],
                "authors": cols[2],
                "year": cols[3],
                "source": cols[4],
                "url": url,
                "subdomain": current_section,
                "domain": domain,
            })
    return entries


def safe_filename(entry: dict) -> str:
    # Use source (e.g. "NBER w25462") + year for readable filenames
    source = re.sub(r"[^\w\-]", "_", entry.get("source", str(entry["id"])))
    year = entry.get("year", "")
    return f"{source}_{year}.pdf"


# ---------------------------------------------------------------------------
# Step 1 — Download
# ---------------------------------------------------------------------------

def download(domain: str, output_dir: Path = None, delay: float = 1.5):
    entries = parse_catalog(domain)
    if not entries:
        sys.exit("No PDF entries found in catalog.")

    out = output_dir or (RESEARCH_DIR / domain / "pdfs")
    out.mkdir(parents=True, exist_ok=True)

    manifest_path = out / "manifest.json"
    manifest = json.loads(manifest_path.read_text()) if manifest_path.exists() else {}

    headers = {"User-Agent": "OSPP-Research-Bot/1.0 (academic use; github.com/loumpare/Open-Source-Political-Program-OSPP-)"}

    print(f"\nDownloading {len(entries)} PDFs → {out}\n")
    failed = []

    for entry in tqdm(entries, desc="Downloading"):
        fname = safe_filename(entry)
        dest = out / fname

        if dest.exists():
            tqdm.write(f"  skip (exists): {fname}")
            manifest[entry["id"]] = {"path": str(dest), "url": entry["url"], **entry}
            continue

        try:
            resp = requests.get(entry["url"], headers=headers, timeout=30, stream=True)
            resp.raise_for_status()
            with open(dest, "wb") as f:
                for chunk in resp.iter_content(chunk_size=8192):
                    f.write(chunk)
            size_kb = dest.stat().st_size // 1024
            tqdm.write(f"  OK ({size_kb} KB): {fname}")
            manifest[entry["id"]] = {"path": str(dest), "url": entry["url"], **entry}
        except Exception as e:
            tqdm.write(f"  FAIL: {fname} — {e}")
            failed.append({"id": entry["id"], "url": entry["url"], "error": str(e)})

        time.sleep(delay)

    manifest_path.write_text(json.dumps(manifest, indent=2))
    print(f"\nDone. {len(manifest)} downloaded, {len(failed)} failed.")

    if failed:
        fail_path = out / "failed.json"
        fail_path.write_text(json.dumps(failed, indent=2))
        print(f"Failed list saved to {fail_path}")

    print(f"\nNext step:\n  python research/pipeline.py embed --domain {domain}")


# ---------------------------------------------------------------------------
# Step 2 — Embed
# ---------------------------------------------------------------------------

def embed(domain: str, chunk_size: int = 500, chunk_overlap: int = 50):
    try:
        import pdfplumber
        import chromadb
        from sentence_transformers import SentenceTransformer
    except ImportError as e:
        sys.exit(f"Missing dependency: {e}\nRun: pip install pdfplumber chromadb sentence-transformers")

    pdf_dir = RESEARCH_DIR / domain / "pdfs"
    manifest_path = pdf_dir / "manifest.json"
    if not manifest_path.exists():
        sys.exit(f"No manifest found. Run download first.")

    manifest = json.loads(manifest_path.read_text())

    # Only embed academic papers — skip large reference reports (>15 MB)
    SKIP_SOURCES = {"IMF WEO", "OECD", "World Bank GEP"}
    to_embed = {
        k: v for k, v in manifest.items()
        if v.get("source", "") not in SKIP_SOURCES
        and Path(v["path"]).exists()
        and Path(v["path"]).stat().st_size < 15 * 1024 * 1024
    }

    print(f"\nEmbedding {len(to_embed)}/{len(manifest)} documents (large reference reports skipped)")
    print("Loading sentence-transformers model (first run downloads ~90 MB)...")

    model = SentenceTransformer("all-MiniLM-L6-v2")

    db_path = VECTORDB_DIR / domain
    db_path.mkdir(parents=True, exist_ok=True)
    client = chromadb.PersistentClient(path=str(db_path))
    collection = client.get_or_create_collection(
        name=f"ospp_{domain}",
        metadata={"hnsw:space": "cosine"},
    )

    existing_ids = set(collection.get(include=[])["ids"])
    print(f"Already embedded: {len(existing_ids)} chunks\n")

    total_chunks = 0
    for paper_id, meta in tqdm(to_embed.items(), desc="Papers"):
        path = Path(meta["path"])
        try:
            with pdfplumber.open(path) as pdf:
                full_text = "\n".join(
                    page.extract_text() or "" for page in pdf.pages
                ).strip()
        except Exception as e:
            tqdm.write(f"  FAIL reading {path.name}: {e}")
            continue

        if not full_text:
            tqdm.write(f"  SKIP (no text extracted): {path.name}")
            continue

        # Chunk by words
        words = full_text.split()
        chunks = []
        for i in range(0, len(words), chunk_size - chunk_overlap):
            chunk = " ".join(words[i:i + chunk_size])
            if len(chunk.strip()) > 100:
                chunks.append(chunk)

        new_chunks, new_ids, new_metas = [], [], []
        for i, chunk in enumerate(chunks):
            chunk_id = f"{paper_id}_chunk_{i}"
            if chunk_id in existing_ids:
                continue
            new_chunks.append(chunk)
            new_ids.append(chunk_id)
            new_metas.append({
                "paper_id": paper_id,
                "title": meta.get("title", ""),
                "authors": meta.get("authors", ""),
                "year": str(meta.get("year", "")),
                "subdomain": meta.get("subdomain", ""),
                "domain": domain,
                "chunk_index": i,
            })

        if not new_chunks:
            continue

        # Embed in batches of 64
        batch_size = 64
        for b in range(0, len(new_chunks), batch_size):
            batch_texts = new_chunks[b:b + batch_size]
            embeddings = model.encode(batch_texts, show_progress_bar=False).tolist()
            collection.add(
                documents=batch_texts,
                embeddings=embeddings,
                ids=new_ids[b:b + batch_size],
                metadatas=new_metas[b:b + batch_size],
            )

        total_chunks += len(new_chunks)
        tqdm.write(f"  {path.name}: {len(new_chunks)} new chunks")

    print(f"\nDone. {total_chunks} new chunks added to ChromaDB at {db_path}")
    print(f"\nNext step:\n  python research/pipeline.py query --domain {domain} --q \"your question\"")


# ---------------------------------------------------------------------------
# Step 3 — Query
# ---------------------------------------------------------------------------

def query(domain: str, question: str, n_results: int = 5):
    try:
        import chromadb
        from sentence_transformers import SentenceTransformer
    except ImportError as e:
        sys.exit(f"Missing dependency: {e}")

    db_path = VECTORDB_DIR / domain
    if not db_path.exists():
        sys.exit(f"No vector DB found for domain '{domain}'. Run embed first.")

    print(f"\nQuerying [{domain}]: \"{question}\"\n")
    model = SentenceTransformer("all-MiniLM-L6-v2")
    client = chromadb.PersistentClient(path=str(db_path))
    collection = client.get_collection(f"ospp_{domain}")

    embedding = model.encode([question]).tolist()
    results = collection.query(query_embeddings=embedding, n_results=n_results)

    for i, (doc, meta, dist) in enumerate(zip(
        results["documents"][0],
        results["metadatas"][0],
        results["distances"][0],
    )):
        score = round(1 - dist, 3)
        print(f"[{i+1}] {meta['title']} ({meta['authors']}, {meta['year']}) — score: {score}")
        print(f"     Sub-domain: {meta['subdomain']}")
        print(f"     {doc[:300].strip()}…\n")


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(description="OSPP Research Pipeline")
    sub = parser.add_subparsers(dest="cmd", required=True)

    dl = sub.add_parser("download", help="Download PDFs from catalog")
    dl.add_argument("--domain", required=True)
    dl.add_argument("--output-dir", type=Path, default=None)
    dl.add_argument("--delay", type=float, default=1.5, help="Seconds between requests")

    em = sub.add_parser("embed", help="Embed PDFs into ChromaDB")
    em.add_argument("--domain", required=True)
    em.add_argument("--chunk-size", type=int, default=500)

    qr = sub.add_parser("query", help="Semantic search in vector DB")
    qr.add_argument("--domain", required=True)
    qr.add_argument("--q", required=True, help="Question to search")
    qr.add_argument("--n", type=int, default=5)

    args = parser.parse_args()

    if args.cmd == "download":
        download(args.domain, args.output_dir, args.delay)
    elif args.cmd == "embed":
        embed(args.domain, args.chunk_size)
    elif args.cmd == "query":
        query(args.domain, args.q, args.n)


if __name__ == "__main__":
    main()
