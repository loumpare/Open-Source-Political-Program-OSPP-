# Open Source Political Program + Virtual Simulation (OSPP)

> The first open source, data-driven political platform combining citizen collaboration and LLM agent simulation — built for any country.

## Vision

| Pillar | Description |
|--------|-------------|
| **Detailed proposals** | 50+ propositions per country, grounded in public data |
| **Citizen collaboration** | GitHub Issues, PRs, transparent votes |
| **Virtual simulation** | Mesa ABM + Claude API, up to 1M agents |
| **Full transparency** | Every decision is public & auditable |

## How it works

1. Proposals live in `propositions/{country_code}/{domain}/` as markdown files
2. Citizens debate and vote via GitHub Issues & PRs
3. Each adopted proposal is simulated on a virtual population calibrated to that country's demographics
4. Results feed back into the proposal text automatically

## Stack

- **Frontend**: React 18 + TypeScript + D3.js
- **Backend**: Python 3.11 + FastAPI + PostgreSQL
- **Simulation**: Mesa (ABM) + Claude API (Anthropic)
- **Infra**: Docker + GitHub Actions + Kubernetes

## Quick start

```bash
cp .env.example .env
# Fill in ANTHROPIC_API_KEY in .env
docker compose up
```

- Frontend: http://localhost:3000
- API docs: http://localhost:8000/docs

## Repository structure

```
├── backend/          FastAPI + PostgreSQL
├── frontend/         React + TypeScript + D3.js
├── simulation/       Mesa ABM + LLM agents
├── propositions/
│   ├── global/       Universal proposals (any country)
│   ├── fr/           France
│   ├── us/           United States
│   └── {cc}/         Any country (ISO 3166-1 alpha-2)
├── data/             ETL scripts + documented sources
├── docs/             Architecture, roadmap, state of the art
└── infra/            Docker, Kubernetes
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Proposals live in `propositions/` — open an Issue or PR to discuss.

Proposals can be:
- **Country-specific** (`propositions/fr/`, `propositions/de/`…)
- **Universal** (`propositions/global/`) — applicable to any democratic system

## Roadmap

- **Weeks 1-4**: MVP — structure + 50 proposals across 3 countries
- **Weeks 5-8**: Mesa simulation, 100k agents, multi-country demographic profiles
- **Weeks 9-12**: Full integration + 1M agents, multi-language UI

## License

GNU AGPL-3.0 — any derivative work must also be open source.
