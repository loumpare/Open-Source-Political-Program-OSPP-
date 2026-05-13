# Proposals

Proposals are organized as `{country_code}/{domain}/`. To add or modify one, see [CONTRIBUTING.md](../CONTRIBUTING.md).

## Classification logic

A proposal belongs to a country if it references **specific national institutions** (laws, social systems, national data). Otherwise → global.
- 🇫🇷 France: SMIC, Assurance Maladie, ISF, INSEE, COR…
- 🇺🇸 US: federal minimum wage, Medicare, Head Start, BLS…
- 🇩🇰 Denmark: Flexicurity, SU grants, 37h working week, Dagpenge…
- 🌐 Global: no country-specific institution referenced

## Structure

```
propositions/
├── global/          Universal proposals (any democratic system)
│   └── governance/
├── fr/              France
│   ├── economie/
│   ├── social/
│   ├── environnement/
│   ├── education/
│   └── sante/
├── us/              United States
│   ├── economy/
│   ├── social/
│   ├── environment/
│   ├── education/
│   └── health/
├── dk/              Denmark (Nordic model)
│   ├── economie/
│   ├── education/
│   └── social/
└── {cc}/            Any country (ISO 3166-1 alpha-2)
```

## Current proposals (21)

### 🇫🇷 France

| ID | Domain | Title | Status |
|----|--------|-------|--------|
| ECO-FR-001 | economie | Revalorisation du SMIC à 1 600 € net | discussion |
| ECO-FR-002 | economie | Revenu universel de base — expérimentation nationale (800 €/mois) | draft |
| ECO-FR-003 | economie | Impôt sur la fortune progressif 2.0 — 1 % au-delà de 5 M€ | draft |
| EDU-FR-001 | education | Gratuité de l'université publique + bourse 600 €/mois | draft |
| EDU-FR-002 | education | École maternelle universelle dès 2 ans | draft |
| ENV-FR-001 | environnement | 100 % énergies renouvelables d'ici 2045 | draft |
| ENV-FR-002 | environnement | Taxe carbone progressive + dividende citoyen | draft |
| SOC-FR-001 | social | Retraite à 62 ans avec pension minimale garantie 1 200 € | draft |
| SOC-FR-002 | social | Programme national Housing First — 50 000 logements d'ici 2030 | draft |
| SOC-FR-003 | social | Congé parental égalitaire — 6 mois chacun, non transférable | draft |
| HLT-FR-001 | sante | Remboursement universel santé mentale — psychologues remboursés | draft |

### 🇺🇸 United States

| ID | Domain | Title | Status |
|----|--------|-------|--------|
| ECO-US-001 | economy | Federal minimum wage $17/hour | draft |
| EDU-US-001 | education | Universal Pre-K — federally funded for ages 3–4 | draft |
| ENV-US-001 | environment | Federal carbon price and dividend — $65/ton rising to $200 | draft |
| SOC-US-001 | social | Federal paid family and medical leave — 12 weeks at 90% | draft |
| HLT-US-001 | health | Medicare expansion — universal coverage for under-65s | draft |

### 🇩🇰 Denmark (Nordic model)

| ID | Domain | Title | Status |
|----|--------|-------|--------|
| ECO-DK-001 | economie | Flexicurité — le triangle d'or : flexibilité + sécurité + formation | draft |
| EDU-DK-001 | education | Bourses étudiantes universelles SU — 900 €/mois, sans conditions de ressources | draft |
| SOC-DK-001 | social | Semaine de 37 heures — norme légale nationale avec pleine productivité | draft |

### 🌐 Global

| ID | Domain | Title | Status |
|----|--------|-------|--------|
| GOV-GLOBAL-001 | governance | Open Source Government Software Mandate | draft |
| GOV-GLOBAL-002 | governance | Mandatory algorithmic transparency for public-sector AI | draft |

## Proposal ID format

`{DOMAIN_3}-{COUNTRY}-{NUMBER}` — e.g. `ECO-FR-001`, `GOV-GLOBAL-001`
