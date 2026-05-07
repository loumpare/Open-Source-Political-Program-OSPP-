# Programme Politique Open Source + Simulation Virtuelle

> Programme politique français open source, combinant collaboration citoyenne et simulation d'impact par agents LLM.

## Vision

| Pilier | Description |
|--------|-------------|
| **Programme détaillé** | 50+ propositions basées sur données IFOP/INSEE |
| **Collaboration citoyenne** | GitHub Issues, PRs, votes transparents |
| **Simulation virtuelle** | Mesa ABM + Claude API, jusqu'à 1M agents |
| **Transparence totale** | Tout le processus est public & auditable |

## Stack

- **Frontend** : React 18 + TypeScript + D3.js
- **Backend** : Python 3.11 + FastAPI + PostgreSQL
- **Simulation** : Mesa (ABM) + Claude API (Anthropic)
- **Infra** : Docker + GitHub Actions + Kubernetes

## Démarrage rapide

```bash
cp .env.example .env
# Remplir ANTHROPIC_API_KEY dans .env
docker compose up
```

- Frontend : http://localhost:3000
- API : http://localhost:8000/docs
- PgAdmin : http://localhost:5050

## Structure

```
├── backend/        FastAPI + PostgreSQL
├── frontend/       React + TypeScript + D3.js
├── simulation/     Mesa ABM + LLM agents
├── propositions/   Propositions politiques (markdown)
├── data/           Sources, scripts ETL, pipelines
├── docs/           Architecture, roadmap, état de l'art
└── infra/          Docker, Kubernetes
```

## Contribuer

Voir [CONTRIBUTING.md](CONTRIBUTING.md). Les propositions sont dans `propositions/` — ouvrez une Issue ou PR pour en discuter.

## Roadmap

- **Semaines 1-4** : MVP — structure GitHub + 50 propositions
- **Semaines 5-8** : Simulation Mesa 100k agents
- **Semaines 9-12** : Intégration complète + 1M agents

Créé Mai 2026
