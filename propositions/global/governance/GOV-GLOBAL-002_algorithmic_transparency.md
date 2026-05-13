---
id: GOV-GLOBAL-002
country: global
domain: governance
title: "Mandatory algorithmic transparency for public-sector AI"
language: en
status: draft
author: community
date: 2026-05-13
sources:
  - url: https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689
    description: "EU AI Act — Regulation 2024/1689 (European Parliament)"
  - url: https://ainowinstitute.org/publication/algorithmic-impact-assessments-a-practical-framework/
    description: "Reisman et al. — Algorithmic Impact Assessments (AI Now Institute, 2018)"
  - url: https://dl.acm.org/doi/10.1145/2909784
    description: "Diakopoulos — Accountability in Algorithmic Decision-Making (Commun ACM, 2016)"
---

## Summary

Any AI or algorithmic system used to make or significantly influence public administration decisions must be openly auditable, provide individual explanations to affected citizens, and be assessed for bias and impact before deployment.

## Proposal

Governments worldwide are deploying AI systems for welfare eligibility determinations, criminal sentencing recommendations, school admissions, tax audits, asylum claim processing, and social care assessments — in most cases with no transparency, no appeal rights, and no public accountability.

**Binding requirements for any AI/algorithmic system used in public decisions (Annex III risk-level equivalent):**

1. **Purpose and logic disclosure:** Public publication of the system's purpose, data sources, training methodology, and decision logic in plain language. Model weights need not be published, but the decision criteria must be auditable by independent experts.

2. **Individual explanations:** Any citizen affected by an automated decision has the right to a written explanation specifying which factors influenced the decision and their relative weights.

3. **Human review right:** The right to request review by a qualified human official for any automated decision affecting material interests (benefits, housing, immigration, employment, justice).

4. **Pre-deployment impact assessment:** Mandatory algorithmic impact assessment (AIA) before deployment, covering: accuracy by demographic group, historical bias audit, adversarial testing, and proportionality assessment.

5. **Annual independent audit:** Conducted by certified algorithmic auditors (new professional certification standard), with results published publicly.

6. **Sunset provisions:** Automatic 3-year review cycle; systems failing to meet standards are suspended.

## Context and evidence

The EU AI Act (2024) already classifies high-risk AI applications in benefits, justice, education, and employment as requiring transparency, explainability, and human oversight. This proposal universalises the EU standard globally.

OSF/AI Now Institute research (Reisman et al., 2018) documents systematic errors in algorithmic public-sector systems that disproportionately affect minorities, low-income groups, and people with disabilities — including:
- COMPAS recidivism scoring (US): 44% false positive rate for Black defendants vs 23% for white defendants
- Netherlands SyRI welfare fraud detection: ruled illegal by court for discriminating against low-income and immigrant populations
- UK A-level exam algorithm (2020): systematically downgraded students from disadvantaged schools

France's Law for a Digital Republic (2016) already mandates algorithmic transparency for individual administrative decisions — but enforcement is nearly non-existent.

## Implementation path

**Year 1:** Establish international standard (ISO/IEC or OECD framework) for algorithmic impact assessments
**Year 2:** Countries with >1M residents commit to national register of public AI systems
**Year 3:** AIA requirement enters force for all new high-risk deployments
**Year 5:** Retroactive audit of all existing high-risk systems

## Arguments for

- Prevents documented harms from biased automated systems
- Restores democratic accountability for consequential public decisions
- EU AI Act already establishes this precedent for the world's largest single market
- Builds public trust in government digitalisation
- Creates a level playing field between AI-adopting and non-adopting governments

## Arguments against

- Compliance costs for governments with limited technical capacity
- "Explainability" is technically challenging for deep learning systems
- Security/gaming risk: if decision criteria are fully public, bad actors can optimise against the system
- Slows beneficial AI adoption if requirements are too burdensome
- Enforcement internationally requires treaty-level commitment

## Estimated impact

- Directly affects: any country with significant public-sector AI deployment (est. 60+ countries)
- People affected by automated decisions: hundreds of millions (welfare, immigration, justice alone)
- Compliance cost: ~0.5–1% of public AI procurement budgets
- Avoids: discrimination lawsuits, policy failures, erosion of public trust (costs vastly exceed compliance)

## Simulation results

> Auto-populated after Mesa simulation run
