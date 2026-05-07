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
9. [Project structure](#9-project-structure)

---

## 1. Prerequisites

| Tool | Version | Purpose |
|------|---------|---------|
| Conda / Miniconda | any | Python + Node.js environment |
| Docker + Docker Compose | 24+ | Full stack (backend, database, Redis) |
| Git | any | Version control |

Check if you have them:

```bash
conda --version
docker --version
git --version
```

The `ospp` conda environment (Python 3.11 + Node.js 20) was created during setup.
If it doesn't exist yet, create it:

```bash
conda create -n ospp python=3.11 -y
conda activate ospp
conda install -c conda-forge nodejs=20 -y
cd ~/Bureau/OSPP/frontend && npm install
```

---

## 2. Run the frontend (quickstart)

No Docker required. The frontend runs entirely with static data — no backend needed.

```bash
conda activate ospp
cd ~/Bureau/OSPP/frontend
npm run dev
```

Open **http://localhost:3000** in your browser.

To stop: `Ctrl+C`

---

## 3. Run the full stack (with backend)

Starts the React frontend, FastAPI backend, PostgreSQL database, Redis cache, and Celery worker.

**Step 1 — Configure environment variables:**

```bash
cd ~/Bureau/OSPP
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
- **Domain** — Economy, Education, Environment, Social
- **Country** — France, United States, Global
- **Search bar** — search by keyword, tag, or topic

### Read a proposal

Click any proposal card to open the detail page. Each proposal shows:
- Full policy text with citations
- **Scientific sources** from the research catalog (208 peer-reviewed papers)
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
│   └── social/      SOC-FR-001_retraites.md
├── us/
│   └── economy/     ECO-US-001_federal_minimum_wage.md
└── global/
    └── governance/  GOV-GLOBAL-001_open_source_government.md
```

**To add a new proposal:**

1. Create a file: `propositions/{cc}/{domain}/{ID}_{slug}.md`
2. Use this header (frontmatter):

```markdown
---
id: ECO-FR-002
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

3. Open a Pull Request on GitHub — the community votes on it

**ID format:** `{DOMAIN_3}-{COUNTRY}-{NNN}` — e.g. `ECO-FR-002`, `ENV-US-001`, `GOV-GLOBAL-002`

---

## 7. Run the research pipeline

The research pipeline downloads and indexes the 208+ peer-reviewed papers backing the proposals.

**Activate the environment:**

```bash
conda activate ospp
cd ~/Bureau/OSPP
```

**Download PDFs for a domain:**

```bash
python research/pipeline.py download --domain economy
python research/pipeline.py download --domain education
python research/pipeline.py download --domain environment
python research/pipeline.py download --domain social
```

PDFs are saved to `research/{domain}/pdfs/` (~350 MB total across all domains).
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
```

**Current index:**

| Domain | Docs | Chunks |
|--------|------|--------|
| Economy | 61 | 1,847 |
| Education | 47 | 1,008 |
| Environment | 52 | 805 |
| Social | 48 | pending |

---

## 8. Build for production

Build an optimized static bundle ready to deploy:

```bash
conda activate ospp
cd ~/Bureau/OSPP/frontend
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
cd ~/Bureau/OSPP/frontend
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

## 9. Project structure

```
OSPP/
├── frontend/               React 18 + TypeScript + Tailwind + Vite
│   ├── src/
│   │   ├── components/     Navbar, Footer, ProposalCard, VoteWidget, InstallPrompt…
│   │   ├── pages/          Home, Proposals, ProposalDetail
│   │   ├── data/           proposals.ts (static proposal data)
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
├── research/               Scientific knowledge base
│   ├── pipeline.py         download → embed → query (conda activate ospp)
│   ├── RESEARCH_LOG.md     History of all search sessions
│   ├── economy/CATALOG.md  61 documents with direct PDF URLs
│   ├── education/CATALOG.md
│   ├── environment/CATALOG.md
│   └── social/CATALOG.md
│
├── propositions/           Proposal markdown files
│   ├── fr/                 France (economie, social, environnement, education)
│   ├── us/                 United States (economy)
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
# Start frontend only
conda activate ospp && cd ~/Bureau/OSPP/frontend && npm run dev

# Start full stack
cd ~/Bureau/OSPP && docker compose up

# Build for production
cd ~/Bureau/OSPP/frontend && conda run -n ospp npm run build

# Run simulation locally
conda activate ospp && cd ~/Bureau/OSPP
python simulation/run.py --agents 1000 --steps 5 --seed 42

# Download research papers (economy)
python research/pipeline.py download --domain economy

# Semantic search
python research/pipeline.py query --domain economy --q "your question"

# Git push
git add . && git commit -m "your message" && git push
```
