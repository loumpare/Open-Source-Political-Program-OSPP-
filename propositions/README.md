# Proposals

Proposals are organized as `{country_code}/{domain}/`. To add or modify one, see [CONTRIBUTING.md](../CONTRIBUTING.md).

## Classification logic

A proposal belongs to a country if it references **specific national institutions** (laws, social systems, national data). Otherwise → global.

| Country | Key institutions referenced |
|---------|---------------------------|
| 🇫🇷 France | SMIC, Assurance Maladie, ISF, INSEE, COR, REP/REP+ |
| 🇺🇸 United States | federal minimum wage, Medicare, Head Start, BLS, CBO |
| 🇩🇰 Denmark | Flexicurity, SU grants, Dagpenge, 37h convention |
| 🇩🇪 Germany | Kurzarbeit, Elterngeld, Berufsausbildung, BIBB |
| 🇸🇪 Sweden | Daddy months, Skolpeng voucher, LO/SAF bargaining |
| 🇳🇴 Norway | Government Pension Fund Global, EV incentives, NBIM |
| 🇫🇮 Finland | PAAVO Housing First, Kela UBI, CPE, Yläastikoe |
| 🇨🇦 Canada | Pharmacare, Climate Action Incentive, CPE/Québec |
| 🇬🇧 United Kingdom | NHS, NLW, Right to Buy, HMRC |
| 🇯🇵 Japan | LTCI, kaigo rishoku, karoshi, Womenomics |
| 🌐 Global | No country-specific institution referenced |

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
├── de/              Germany
│   ├── economie/
│   ├── social/
│   ├── environnement/
│   └── education/
├── se/              Sweden
│   ├── economie/
│   ├── social/
│   └── education/
├── no/              Norway
│   ├── economie/
│   ├── environnement/
│   └── social/
├── fi/              Finland
│   ├── economie/
│   ├── education/
│   └── social/
├── ca/              Canada
│   ├── economie/
│   ├── sante/
│   └── social/
├── gb/              United Kingdom
│   ├── economie/
│   ├── sante/
│   └── social/
├── jp/              Japan
│   ├── economie/
│   └── social/
└── {cc}/            Any country (ISO 3166-1 alpha-2)
```

## Current proposals (43 total)

### 🇫🇷 France (11)

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

### 🇺🇸 United States (5)

| ID | Domain | Title | Status |
|----|--------|-------|--------|
| ECO-US-001 | economy | Federal minimum wage $17/hour | draft |
| EDU-US-001 | education | Universal Pre-K — federally funded for ages 3–4 | draft |
| ENV-US-001 | environment | Federal carbon price and dividend — $65/ton rising to $200 | draft |
| SOC-US-001 | social | Federal paid family and medical leave — 12 weeks at 90% | draft |
| HLT-US-001 | health | Medicare expansion — universal coverage for under-65s | draft |

### 🇩🇰 Denmark (3)

| ID | Domain | Title | Status |
|----|--------|-------|--------|
| ECO-DK-001 | economie | Flexicurité — le triangle d'or : flexibilité + sécurité + formation | draft |
| EDU-DK-001 | education | Bourses étudiantes universelles SU — 900 €/mois, sans conditions de ressources | draft |
| SOC-DK-001 | social | Semaine de 37 heures — norme légale nationale avec pleine productivité | draft |

### 🇩🇪 Germany (4)

| ID | Domain | Title | Status |
|----|--------|-------|--------|
| ECO-DE-001 | economie | Kurzarbeit universelle — chômage partiel automatique en cas de crise | draft |
| SOC-DE-001 | social | Elterngeld Plus — 28 mois de congé parental avec 4 mois réservés au père | draft |
| ENV-DE-001 | environnement | Energiewende 2.0 — 100 % renouvelables d'ici 2040, sortie du charbon 2030 | draft |
| EDU-DE-001 | education | Formation duale — généraliser le système Berufsausbildung | draft |

### 🇸🇪 Sweden (3)

| ID | Domain | Title | Status |
|----|--------|-------|--------|
| SOC-SE-001 | social | Daddy months — 3 mois non transférables pour chaque parent | draft |
| EDU-SE-001 | education | Réforme du voucher scolaire — encadrer le libre choix pour éviter la ségrégation | draft |
| ECO-SE-001 | economie | Rehn-Meidner revisité — négociation salariale centralisée | draft |

### 🇳🇴 Norway (3)

| ID | Domain | Title | Status |
|----|--------|-------|--------|
| ECO-NO-001 | economie | Fonds souverain — gérer les ressources naturelles pour les générations futures | draft |
| ENV-NO-001 | environnement | Électrification des transports — 90 % de voitures électriques d'ici 2030 | draft |
| SOC-NO-001 | social | Congé parental de 49 semaines à 100 % — 15 semaines réservées à chaque parent | draft |

### 🇫🇮 Finland (3)

| ID | Domain | Title | Status |
|----|--------|-------|--------|
| EDU-FI-001 | education | Modèle éducatif finlandais — équité, autonomie enseignante, zéro test avant 16 ans | draft |
| ECO-FI-001 | economie | UBI finlandais — bilan de l'expérimentation 2017-2018 et déploiement | draft |
| SOC-FI-001 | social | Housing First national — la Finlande a quasi-éliminé le sans-abrisme chronique | draft |

### 🇨🇦 Canada (3)

| ID | Domain | Title | Status |
|----|--------|-------|--------|
| HLT-CA-001 | sante | Pharmacare universel — assurance médicaments publique nationale | draft |
| ECO-CA-001 | economie | Taxe carbone + remise climatique — le modèle canadien en action | draft |
| SOC-CA-001 | social | Garderies à 10 $/jour — le modèle du Québec à l'échelle nationale | draft |

### 🇬🇧 United Kingdom (3)

| ID | Domain | Title | Status |
|----|--------|-------|--------|
| HLT-GB-001 | sante | NHS restoration — £40bn to eliminate the 7.6M waiting list | draft |
| SOC-GB-001 | social | Social housing emergency — 300,000 new homes per year, 90,000 social rent | draft |
| ECO-GB-001 | economie | National Living Wage to £15/hour, indexed to median earnings | draft |

### 🇯🇵 Japan (3)

| ID | Domain | Title | Status |
|----|--------|-------|--------|
| SOC-JP-001 | social | Work style reform — overtime cap at 45h/month and karoshi prevention | draft |
| ECO-JP-001 | economie | Womenomics 3.0 — gender pay parity law and universal childcare by 2030 | draft |
| SOC-JP-002 | social | Silver Society — elder care reform for 30% over-65 population | draft |

### 🌐 Global (2)

| ID | Domain | Title | Status |
|----|--------|-------|--------|
| GOV-GLOBAL-001 | governance | Open Source Government Software Mandate | draft |
| GOV-GLOBAL-002 | governance | Mandatory algorithmic transparency for public-sector AI | draft |

## Proposal ID format

`{DOMAIN_3}-{COUNTRY}-{NUMBER}` — e.g. `ECO-FR-001`, `HLT-US-002`, `GOV-GLOBAL-003`

## Available domains

| Code | Label | Used in |
|------|-------|---------|
| `economy` / `economie` | Economy | fr, us, dk, de, se, no, fi, ca, gb, jp |
| `education` | Education | fr, us, dk, de, se, fi |
| `environment` / `environnement` | Environment | fr, us, de, no |
| `social` | Social | fr, us, dk, de, se, no, fi, ca, gb, jp |
| `health` / `sante` | Health | fr, us, ca, gb |
| `governance` | Governance | global |
