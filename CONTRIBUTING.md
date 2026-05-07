# Contributing Guide

## Adding or modifying a proposal

1. **Open an Issue** describing the proposal or change
2. **Discuss** with the community (labels: `proposal`, `data`, `simulation`, `country:fr`, `country:us`…)
3. **Submit a PR** in `propositions/{country_code}/{domain}/`
4. PR is merged after community vote (>60% support, min 10 votes)

## Proposal format

Each file in `propositions/` follows this template:

```markdown
---
id: ECO-FR-001
country: fr          # ISO 3166-1 alpha-2, or "global"
domain: economy
title: "Proposal title"
status: draft | discussion | vote | adopted | rejected
author: @github_handle
date: YYYY-MM-DD
language: fr         # primary language of this proposal
sources:
  - url: https://...
    description: "Source"
---

## Summary

One sentence.

## Proposal

Detailed text.

## Estimated impact

- Population affected: X
- Estimated cost: Y
- Sources: Z

## Simulation results

(filled automatically after Mesa simulation)
```

## Countries & domains

Proposals are organized as `propositions/{country_code}/{domain}/`.

| Path | Examples |
|------|---------|
| `propositions/global/governance/` | Electoral reform, digital rights |
| `propositions/fr/economie/` | SMIC, fiscalité |
| `propositions/us/economy/` | Minimum wage, healthcare |
| `propositions/de/wirtschaft/` | Mindestlohn, Rente |
| `propositions/{cc}/{domain}/` | Any country, any domain |

**Domain naming**: use the local language (e.g. `economie` for FR, `economy` for EN, `wirtschaft` for DE). This keeps proposals readable to local contributors.

### Standard domains (adapt name to local language)

- `economy` / `economie` / `wirtschaft`
- `social` / `soziales`
- `environment` / `environnement` / `umwelt`
- `education`
- `governance` / `gouvernance`
- `health` / `sante` / `gesundheit`

## Multi-language support

- Proposals are written in the **local language** of the country
- An English summary is encouraged but not required
- Simulation prompts sent to Claude are auto-translated per agent profile

## Code contributions

- Backend Python: follow PEP 8, tests with pytest
- Frontend: ESLint + Prettier, functional React components
- Simulation: document Mesa parameters

## Code of Conduct

Evidence-based, respectful debate. No ad hominem, no ideology without data.
