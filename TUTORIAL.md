# OSPP — Usage Tutorial

> **OpenPolicy — Open Source Political Program + Virtual Simulation**
> Science-backed proposals · Citizen votes · LLM-powered impact simulation

---

## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [Run the frontend (quickstart)](#2-run-the-frontend-quickstart)
3. [Run the full stack (with backend)](#3-run-the-full-stack-with-backend)
4. [Use the app](#4-use-the-app)
5. [Install as a mobile app (PWA)](#5-install-as-a-mobile-app-pwa)
6. [Add or edit a proposal](#6-add-or-edit-a-proposal)
7. [Run the research pipeline](#7-run-the-research-pipeline)
8. [Build for production](#8-build-for-production)
9. [**Deploy with Docker (recommended for sharing)**](#9-deploy-with-docker-recommended-for-sharing)
10. [Project structure](#10-project-structure)

---

## 1. Prerequisites

**Strictly required (frontend only):**

| Tool | Version | Check |
|------|---------|-------|
| Node.js | 18+ | `node --version` |
| npm | 9+ | `npm --version` |
| Git | any | `git --version` |

**Required for the full stack (backend + database):**

| Tool | Version | Install |
|------|---------|---------|
| Docker + Docker Compose | 24+ | See below |

**Required for the research pipeline:**

| Tool | Version | Check |
|------|---------|-------|
| Python 3.10+ | 3.10+ | `python3 --version` |
| pip | any | `pip --version` |

### Project path

All commands below use the correct path:

```
~/Bureau/Project_Claude/OSPP/
```

### Install Docker (if missing)

```bash
# Ubuntu / Debian
sudo apt update
sudo apt install -y docker.io docker-compose-v2
sudo usermod -aG docker $USER
newgrp docker
docker --version   # should show 24+
```

---

## 2. Run the frontend (quickstart)

No Docker required. The frontend runs entirely with static data — no backend needed.

```bash
cd ~/Bureau/Project_Claude/OSPP/frontend
npm install
npm run dev
```

Open **http://localhost:3000** in your browser.

To stop: `Ctrl+C`

> **First run:** `npm install` takes ~30 seconds and downloads ~150 MB of packages into `node_modules/`. You only run it once (or after a `git pull` that changes `package.json`).

---

## 3. Run the full stack (with backend)

Starts the React frontend, FastAPI backend, PostgreSQL database, Redis cache, and Celery worker.

**Step 1 — Configure environment variables:**

```bash
cd ~/Bureau/Project_Claude/OSPP
cp .env.example .env
```

Open `.env` and fill in:
- `ANTHROPIC_API_KEY` — your key from console.anthropic.com
- `SECRET_KEY` — generate one: `python3 -c "import secrets; print(secrets.token_hex(32))"`
- `REDIS_PASSWORD` — any strong password

**Step 2 — Start all services:**

```bash
docker compose up
```

First launch downloads Docker images (~2 min). Subsequent launches are instant.

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| API docs | http://localhost:8000/docs |
| Health check | http://localhost:8000/health |

**Stop everything:**

```bash
docker compose down
```

**Stop and wipe the database:**

```bash
docker compose down -v
```

---

## 4. Use the app

### Browse proposals

Go to **http://localhost:3000/proposals** to see all active proposals.

Use the filters to narrow down:
- **Domain** — Economy, Education, Environment, Social, Health, Governance
- **Country** — France, United States, Global
- **Search bar** — search by keyword, tag, or topic

### Read a proposal

Click any proposal card to open the detail page. Each proposal shows:
- Full policy text with citations
- **Scientific sources** from the research catalog (262 peer-reviewed papers)
- **Impact estimate** — population affected, estimated cost
- **Community vote** — current support/oppose percentages

### Vote

On the proposal detail page, click **Support** or **Oppose**.

- No account required
- Your vote is stored anonymously — a one-time random token is generated in your browser, hashed server-side with SHA256 before storage
- Click again to undo your vote

### Contribute on GitHub

Each proposal page has an **Open on GitHub** button. You can:
- Fix a number or source
- Add a new data point
- Translate the proposal
- Open a discussion (Issue)

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full contribution guide.

---

## 5. Install as a mobile app (PWA)

The app is a Progressive Web App — it installs on Android and iOS like a native app.

### Android (Chrome / Edge)

1. Open http://localhost:3000 (or your deployed URL) in Chrome
2. A banner appears at the bottom: **"Install OpenPolicy"**
3. Tap **Install app**
4. The app appears on your home screen

Or tap the browser menu (⋮) → **Add to Home Screen**

### iOS (Safari)

1. Open the URL in **Safari** (must be Safari, not Chrome)
2. A banner appears with instructions
3. Tap the **Share** button (□↑) at the bottom of Safari
4. Scroll down and tap **Add to Home Screen**
5. Tap **Add**

### Offline use

Once installed, the app works **offline**:
- All proposals and pages are cached after first visit
- Votes queue locally and sync when back online
- When a new version is deployed, a banner appears — tap **Update** to refresh

---

## 6. Add or edit a proposal

Proposals are markdown files in `propositions/{country_code}/{domain}/`.

**Example structure:**

```
propositions/
├── fr/
│   ├── economie/    ECO-FR-001_salaire_minimum.md
│   ├── social/      SOC-FR-001_retraites.md
│   ├── sante/       HLT-FR-001_sante_mentale.md
│   └── education/   EDU-FR-001_universite.md
├── us/
│   ├── economy/     ECO-US-001_federal_minimum_wage.md
│   └── health/      HLT-US-001_medicare_expansion.md
└── global/
    └── governance/  GOV-GLOBAL-001_open_source_government.md
```

**To add a new proposal:**

1. Create a file: `propositions/{cc}/{domain}/{ID}_{slug}.md`
2. Use this header (frontmatter):

```markdown
---
id: ECO-FR-004
country: fr
domain: economie
title: "Your proposal title"
language: fr
status: draft
author: @your_github_handle
date: YYYY-MM-DD
sources:
  - url: https://...
    description: "Source description"
---

## Summary

One sentence.

## Proposal

Full text.

## Estimated impact

- Population affected: X
- Estimated cost: Y

## Simulation results

> Filled automatically after Mesa simulation
```

3. Add the proposal data to `frontend/src/data/proposals.ts` (use an existing entry as template)
4. Open a Pull Request on GitHub — the community votes on it

**ID format:** `{DOMAIN_3}-{COUNTRY}-{NNN}` — e.g. `ECO-FR-004`, `HLT-US-002`, `GOV-GLOBAL-003`

**Available domains:**

| Code | Label | Countries |
|------|-------|-----------|
| `economy` / `economie` | Economy | fr, us, global |
| `education` | Education | fr, us |
| `environment` / `environnement` | Environment | fr, us |
| `social` | Social | fr, us |
| `health` / `sante` | Health | fr, us |
| `governance` | Governance | global |

---

## 7. Run the research pipeline

The research pipeline downloads and indexes the 262+ peer-reviewed papers backing the proposals.

**Setup a Python virtual environment (first time only):**

```bash
cd ~/Bureau/Project_Claude/OSPP
python3 -m venv .venv
source .venv/bin/activate
pip install -r research/requirements-research.txt
```

To re-activate later:

```bash
cd ~/Bureau/Project_Claude/OSPP
source .venv/bin/activate
```

**Download PDFs for a domain:**

```bash
python research/pipeline.py download --domain economy
python research/pipeline.py download --domain education
python research/pipeline.py download --domain environment
python research/pipeline.py download --domain social
python research/pipeline.py download --domain health
```

PDFs are saved to `research/{domain}/pdfs/` (~440 MB total across all domains).
Back these up to Google Drive: `OSPP/research/{domain}/pdfs/`

**Build the vector database (semantic search):**

```bash
python research/pipeline.py embed --domain economy
```

This extracts text, chunks it into ~500-word passages, embeds with `all-MiniLM-L6-v2`, and stores in ChromaDB.

**Test a semantic query:**

```bash
python research/pipeline.py query --domain economy --q "minimum wage employment effects"
python research/pipeline.py query --domain environment --q "carbon pricing emissions trading"
python research/pipeline.py query --domain education --q "early childhood long term outcomes"
python research/pipeline.py query --domain health --q "universal health coverage mental health"
```

**Current research index:**

| Domain | Docs | Status |
|--------|------|--------|
| Economy | 61 | ✅ catalogued |
| Education | 47 | ✅ catalogued |
| Environment | 52 | ✅ catalogued |
| Social | 48 | ✅ catalogued |
| Health | 54 | ✅ catalogued |
| **Total** | **262** | |

---

## 8. Build for production

Build an optimized static bundle ready to deploy:

```bash
cd ~/Bureau/Project_Claude/OSPP/frontend
npm run build
```

Output is in `frontend/dist/`. Deploy it to any static host:

**Netlify (drag & drop):**
1. Go to netlify.com → New site
2. Drag the `dist/` folder into the deploy zone
3. Done — your app is live at `https://your-app.netlify.app`

**Vercel:**
```bash
npm install -g vercel
cd ~/Bureau/Project_Claude/OSPP/frontend
vercel --prod
```

**GitHub Pages:**
```bash
npm run build
# Push the dist/ folder to the gh-pages branch
```

**Preview the production build locally:**
```bash
npm run preview
# Opens at http://localhost:4173
```

---

## 9. Deploy with Docker (recommended for sharing)

Docker Compose bundles everything — Ollama, the FastAPI backend and the React
frontend — into a single command.  No Python or Node.js required on the target
machine.

### Prerequisites on the target machine

| Tool | Install |
|------|---------|
| Docker Engine 24+ | <https://docs.docker.com/engine/install/> |
| Docker Compose v2 | included with Docker Desktop; on Linux: `apt install docker-compose-plugin` |
| Git | `apt install git` |

### One-command deployment

```bash
# 1. Clone
git clone <your-repo-url> ospp && cd ospp

# 2. (Optional) adjust settings — defaults work out of the box
cp .env.example .env
# Edit .env if you want a different model or port

# 3. Build images and start
docker compose up --build -d
```

Open **http://\<server-ip\>** in a browser.

> **First run note:** the `ollama-init` container automatically pulls
> `qwen2.5:7b` (~4.7 GB).  This happens once; the model is cached in the
> `ollama_data` Docker volume for future starts.

### Useful commands

```bash
# Follow logs for all services
docker compose logs -f

# Follow logs for one service
docker compose logs -f api

# Restart after a code change
docker compose up --build -d

# Stop everything
docker compose down

# Stop AND delete volumes (wipes votes DB + downloaded model)
docker compose down -v
```

### Configuration via `.env`

| Variable | Default | Description |
|----------|---------|-------------|
| `OLLAMA_MODEL` | `qwen2.5:7b` | LLM model — use `llama3.2:3b` for faster/lighter |
| `PORT` | `80` | Host port for the frontend |
| `OLLAMA_URL` | `http://ollama:11434` | Override if Ollama runs on the host |

### Enable GPU (NVIDIA)

In `docker-compose.yml`, uncomment the `deploy` block inside the `ollama` service:

```yaml
deploy:
  resources:
    reservations:
      devices:
        - driver: nvidia
          count: 1
          capabilities: [gpu]
```

Also install the
[NVIDIA Container Toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html)
on the host.

### Use an existing host-installed Ollama

If Ollama is already running on the host (e.g. you don't want it inside
Docker), remove the `ollama` and `ollama-init` services from
`docker-compose.yml` and set in `.env`:

```
OLLAMA_URL=http://host.docker.internal:11434
```

On Linux add `extra_hosts: ["host.docker.internal:host-gateway"]` to the
`api` service.

### Architecture inside Docker

```
Browser → :80
          │
     ┌────▼─────────────────────────────┐
     │  nginx (ospp_frontend)           │
     │  - serves /usr/share/nginx/html  │
     │  - proxies /api/* → api:8001     │
     └────────────────────┬─────────────┘
                          │ /api/*
     ┌────────────────────▼─────────────┐
     │  FastAPI (ospp_api)  :8001       │
     │  - Mesa simulation               │
     │  - ChromaDB RAG                  │
     │  - SQLite votes                  │
     └────────────────────┬─────────────┘
                          │ http://ollama:11434
     ┌────────────────────▼─────────────┐
     │  Ollama (ospp_ollama)  :11434    │
     │  qwen2.5:7b (CPU or GPU)         │
     └──────────────────────────────────┘

Volumes:
  ollama_data  →  /root/.ollama         (LLM weights ~4.7 GB)
  votes_db     →  /app/research/        (SQLite votes.db)
  ./research/vectordb  (bind-mount)     (ChromaDB index)
```

---

## 10. Project structure

```
OSPP/
├── frontend/               React 18 + TypeScript + Tailwind + Vite
│   ├── src/
│   │   ├── components/     Navbar, Footer, ProposalCard, VoteWidget, InstallPrompt…
│   │   ├── pages/          Home, Proposals, ProposalDetail
│   │   ├── data/           proposals.ts (18 static proposals across 6 domains)
│   │   └── hooks/          useVote.ts, usePwa.ts
│   └── public/             Icons, apple-touch-icon, favicon
│
├── backend/                FastAPI + PostgreSQL + Redis + Celery
│   ├── main.py             App entry point, CORS, rate limiting, security headers
│   └── app/
│       ├── api/            propositions.py, simulations.py, analytics.py
│       ├── models/         SQLAlchemy ORM models
│       ├── services/       llm_service.py, simulation_service.py
│       └── db/             database.py, migrations/001_initial.sql
│
├── simulation/             Mesa ABM
│   ├── model.py            PoliticalModel (up to 100k agents)
│   ├── agents.py           CitizenAgent with multi-country demographic profiles
│   └── run.py              CLI: python simulation/run.py --agents 1000 --steps 5
│
├── research/               Scientific knowledge base (262 papers)
│   ├── pipeline.py         download → embed → query
│   ├── RESEARCH_LOG.md     History of all search sessions
│   ├── economy/CATALOG.md  61 documents with direct PDF URLs
│   ├── education/CATALOG.md  47 documents
│   ├── environment/CATALOG.md  52 documents
│   ├── social/CATALOG.md  48 documents
│   └── health/CATALOG.md  54 documents
│
├── propositions/           Proposal markdown files (18 proposals)
│   ├── fr/                 France (economie, social, environnement, education, sante)
│   ├── us/                 United States (economy, social, environment, education, health)
│   └── global/             Universal (governance)
│
├── CONTRIBUTING.md         How to add proposals and contribute code
├── SECURITY.md             Threat model, attack vectors, patches
├── TUTORIAL.md             ← You are here
└── docker-compose.yml      Full stack: db + redis + backend + frontend + celery
```

---

## Useful commands — cheat sheet

```bash
# ── Frontend (no Docker needed) ──────────────────────────────────────────────
cd ~/Bureau/Project_Claude/OSPP/frontend
npm install          # first time only
npm run dev          # http://localhost:3000

# ── Full stack ────────────────────────────────────────────────────────────────
cd ~/Bureau/Project_Claude/OSPP
docker compose up            # start everything
docker compose down          # stop
docker compose down -v       # stop + wipe database

# ── Research pipeline ─────────────────────────────────────────────────────────
cd ~/Bureau/Project_Claude/OSPP
source .venv/bin/activate    # activate Python environment
python research/pipeline.py download --domain economy
python research/pipeline.py embed --domain economy
python research/pipeline.py query --domain economy --q "your question"

# ── Production build ──────────────────────────────────────────────────────────
cd ~/Bureau/Project_Claude/OSPP/frontend
npm run build                # output in frontend/dist/
npm run preview              # preview at http://localhost:4173

# ── Simulation ────────────────────────────────────────────────────────────────
cd ~/Bureau/Project_Claude/OSPP
source .venv/bin/activate
python simulation/run.py --agents 1000 --steps 5 --seed 42

# ── Git ───────────────────────────────────────────────────────────────────────
git add propositions/ frontend/src/data/proposals.ts
git commit -m "feat: new proposal XYZ"
git push
```
