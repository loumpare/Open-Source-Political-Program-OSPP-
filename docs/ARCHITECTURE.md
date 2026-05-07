# Architecture Système

## Vue d'Ensemble

```
Frontend (React + D3.js)
        │  HTTP / WebSocket
API Layer (FastAPI)
        │
Business Logic (Propositions · Simulations · Analytics)
        │
Data Layer (PostgreSQL + Redis)
        │
LLM Integration (Claude API + Redis cache)
```

## Modules

| Module | Responsabilité | Stack |
|--------|---------------|-------|
| Propositions | CRUD propositions | FastAPI + PostgreSQL |
| Simulations | Orchestration Mesa | Python + Celery |
| Analytics | Analyse résultats | Python + SciPy |
| LLM Service | Intégration Claude | Python + Redis |
| Auth | OAuth2 + JWT | FastAPI |
| Frontend | Interface UI | React + D3.js |

## Base de Données

### Tables principales

- **propositions** — propositions politiques (domain, title, position, status)
- **proposition_votes** — votes citoyens (support/oppose)
- **proposition_history** — historique changements (version control)
- **simulations** — exécutions simulations (status, results JSON)
- **simulation_agents** — état agents (demographics, positions, votes)

### Index

- `idx_propositions_domain`
- `idx_propositions_status`
- `idx_simulations_status`

## Performance & Scaling

### Benchmarks

| Métrique | Valeur |
|----------|--------|
| Lectures DB | 10k+ req/sec (avec indexes) |
| Écritures DB | 1k req/sec |
| Latence typique | <100ms |
| Cache hit rate LLM | 60-70% |

### Simulation

| Scale | Durée/step |
|-------|-----------|
| 10k agents | ~2 min |
| 100k agents | ~20 min (batching) |
| 1M agents | ~3-4h (distributed) |

### Stratégies scaling

- **Horizontal** : Celery workers parallèles
- **Vertical** : GPU acceleration, distributed DB
- **Caching** : Redis 3 layers (LLM, résultats, analytics)

## Déploiement

| Env | Stack |
|-----|-------|
| Développement | Docker Compose |
| Staging | Kubernetes + RDS + ElastiCache |
| Production | Multi-zone K8s + CDN + Load Balancer |

### CI/CD Pipeline

1. Tests (lint, type, unit, integration)
2. Build (Docker image)
3. Deploy staging
4. Smoke tests
5. Deploy production (canary)
