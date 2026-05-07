# OSPP Research Log

Tracks every search session: what was asked, when, why, and what was found.

---

## Format

```
### [DOMAIN] — Session N — YYYY-MM-DD
**Objective:** Why this search was done
**Queries run:** List of search strings used
**Sub-domains covered:** Which sub-fields
**Results:** Brief summary of what was found
**Catalog entries added:** N papers/reports
**Estimated volume:** X MB
**Status:** complete | partial | to-continue
```

---

## Sessions

---

### [ECONOMY] — Session 1 — 2026-05-07

**Objective:** First systematic scan of economics scientific literature (2016–2026) to build the OSPP knowledge base for the economy domain. Goal: identify all major peer-reviewed papers and institutional reports covering the key sub-domains needed to ground political proposals in evidence.

**Queries run:**
1. Income inequality & wealth distribution — NBER, IZA, Piketty lab
2. Minimum wage employment effects — NBER, IZA, U Chicago journals
3. Fiscal policy, taxation, redistribution — IMF, NBER, OECD
4. Global macroeconomics, growth, inflation — IMF WEO, World Bank GEP
5. Automation, AI, future of work — NBER, IZA, Oxford Martin
6. Housing affordability & rent — NBER, IZA, Brookings, Harvard JCHS
7. Social mobility & intergenerational mobility — Chetty/NBER, Opportunity Insights
8. International trade & globalization — NBER, World Bank, IZA
9. Universal Basic Income — NBER, Stanford Basic Income Lab

**Sub-domains covered:** inequality · labor markets · fiscal policy · macroeconomics · digital economy · housing · social mobility · trade & globalization · UBI

**Key sources tapped:**
- NBER (National Bureau of Economic Research) — primary academic source
- IZA (Institute of Labor Economics) — labor-focused peer review
- IMF (World Economic Outlook, SDN series) — macro & fiscal
- OECD (Economic Outlook series) — comparative OECD data
- World Bank (GEP, Open Knowledge) — global development
- WID World / World Inequality Lab — Piketty, Saez, Zucman, Chancel
- Opportunity Insights (Chetty lab) — mobility
- Stanford Basic Income Lab — UBI synthesis
- Harvard JCHS — housing
- SF Federal Reserve — housing

**Results summary:**
- Inequality: clear consensus that top 1% wealth share ~35-40%, bottom 50% income share collapsed from 20% (1980) to 12% (2014). Key authors: Piketty, Saez, Zucman, Chancel.
- Labor: minimum wage median employment elasticity -0.13 (72-study meta-analysis 2024) — small negative effect. Worker productivity increases documented post-increase.
- Fiscal: redistributive impact of fiscal policy has declined since mid-1990s despite progressive taxes. Progressive taxes + transfers reduce inequality by ~1/3.
- Macro: IMF April 2026 — global growth 3.1% projected. AI productivity gains cited as upside risk. Trade tensions as downside.
- Digital: AI widens skill gap, low-skill displacement risk. Aggregate 2026 employment impact <0.4% — small but concentrated.
- Housing: 12.1M renter households spending >50% income on housing (2022 record). Supply vs. income-growth debate ongoing.
- Mobility: Chetty lab — intergenerational mobility stable 1971-1993 cohorts but varies enormously by geography.
- Trade: "China Shock" — large, localized, long-lived negative effects on affected workers. Trade increased wage inequality modestly.
- UBI: no significant labor supply reduction found. Mental health improvements documented across pilots.

**Catalog entries added:** 61 documents
**Estimated volume:** ~104 MB (PDF batch download)
**Google Drive path:** `OSPP/research/economy/pdfs/`
**Catalog file:** `research/economy/CATALOG.md`
**Status:** complete — ready for download phase

**Next steps:**
- [ ] Batch download all 61 PDFs to Google Drive
- [ ] Run embedding pipeline on downloaded PDFs (ChromaDB)

---

### [EDUCATION] — Session 2 — 2026-05-07

**Objective:** Systematic scan of education scientific literature (2016–2026) covering psychology, human sciences, clinical data and global reports. Goal: ground education proposals in evidence across all key sub-domains.

**Queries run:**
1. Education inequality & achievement gap — NBER, IZA, Brookings, EPI
2. Educational psychology & cognitive development — APA, NCBI/PMC, Nature
3. School funding & returns to education — NBER, IZA, U Chicago journals
4. Universal preschool & early childhood education — NBER, IZA, PMC
5. Mental health in schools & universities — NCBI, Lancet, JAMA
6. Higher education access & completion — NBER, IZA
7. Teacher quality & value-added — NBER, IZA, U Chicago
8. Digital technology & AI in education — NBER, NCBI, Nature, OECD
9. Global education reports — UNESCO GEM, World Bank, OECD PISA

**Sub-domains covered:** inequality · school funding · early childhood · teacher quality · mental health · cognitive science · AI in education · global reports

**Key sources tapped:**
- NBER — economics of education (Chetty, Jackson, Hoxby)
- IZA — international labor & education
- PMC/NCBI — clinical & psychological research
- APA — educational psychology peer review
- Nature (npj Science of Learning, HSSC) — cognitive science
- UNESCO GEM Report — global access & equity
- OECD (PISA, Digital Education Outlook) — international comparisons
- World Bank — learning poverty, developing countries

**Results summary:**
- Inequality: achievement gap widening; school funding gap grew 44% over a decade; +10% spending → +7.25% wages in adulthood (Jackson et al.)
- Early childhood: Boston preschool → +8pp college enrollment, reduced incarceration. Perry Preschool effects persist into adulthood.
- Teachers: high value-added teachers improve long-term earnings; test scores miss non-cognitive outcomes (absences, grades, suspensions).
- Mental health: CBT most effective intervention; school-based services cost-effective and increase achievement.
- AI in education: personalized learning benefits documented; risk of dependency without pedagogical guidance (OECD 2026).
- Global: 53% of children in low/middle-income countries cannot read a simple story at age 10 (World Bank learning poverty). Sub-Saharan Africa: 86%.

**Catalog entries added:** 47 documents
**Estimated volume:** ~95 MB
**Google Drive path:** `OSPP/research/education/pdfs/`
**Catalog file:** `research/education/CATALOG.md`
**Status:** complete — ready for download phase

**Next steps:**
- [ ] Download education PDFs to Google Drive

---

### [ENVIRONMENT] — Session 3 — 2026-05-07

**Objective:** Systematic scan of environment & climate scientific literature (2016–2026). Focus: IPCC, UNEP, IPBES core reports + peer-reviewed research on energy transition, carbon pricing, adaptation costs, biodiversity, deforestation, just transition, and CDR.

**Queries run:**
1. IPCC AR6 reports (WGI, WGII, WGIII) — ipcc.ch
2. Carbon pricing & emissions trading — NBER, IMF
3. Energy transition, renewables costs — Nature, Science, NBER
4. UNEP Emissions Gap Reports 2023–2025 — unep.org
5. Biodiversity & ecosystem services — IPBES, Nature, Science
6. Climate adaptation & economic costs — NBER, Nature
7. Just transition, green jobs, fossil fuel workers — Nature Communications, IZA
8. Deforestation, land use, agriculture emissions — Nature, Science
9. Ocean & marine ecosystems — Nature, Frontiers, Annual Reviews
10. Carbon capture & removal (CDR) — Nature Communications, PMC

**Sub-domains covered:** climate science (IPCC) · emissions gap (UNEP) · carbon pricing · energy transition · adaptation & costs · biodiversity (IPBES) · deforestation · just transition · CDR

**Key sources tapped:**
- IPCC — AR6 WGI/WGII/WGIII (definitive physical & mitigation science)
- UNEP — Emissions Gap Reports 2023–2025 (annual NDC gap tracking)
- IPBES — Global & Regional Biodiversity Assessments (ecosystem services)
- NBER — economics of carbon pricing, adaptation, macroeconomic impacts
- Nature (Energy, Communications, Food, Reviews) — dominant peer-review outlet
- Science — deforestation drivers
- IMF Staff Climate Notes — carbon tax instrument design
- Frontiers in Marine Science — ocean solutions
- U Chicago journals — green job transitions

**Results summary:**
- IPCC AR6: 1.5°C likely exceeded by early 2030s without immediate deep cuts. Residual emissions require CDR of 7–9 GtCO2/yr by mid-century.
- UNEP 2025: Current NDCs put world at ~2.6–2.8°C. Emissions still rising.
- Carbon pricing: ETS reduced emissions 12.1%; cap-and-trade outperforms carbon tax on emission reductions. China ETS benefits exceed costs 5x.
- Renewables: Solar & wind now cost-competitive with fossil fuels on LCOE basis. Costs declined 80–90% since 2010.
- Climate costs: Economy committed to -19% income by 2050 independent of future emissions (Nature 2024). Extreme weather attributable costs: $143B/year.
- Biodiversity: 1 million species threatened with extinction (IPBES 2019). 86% of deforestation driven by crop & cattle production.
- Just transition: <1% of fossil fuel workers transition to green jobs currently. Geography & skills are primary barriers.
- CDR: ~29,000 studies mapped via AI (3-4x more than expected). DACCS critical but not yet at scale.

**Catalog entries added:** 52 documents
**Estimated volume:** ~153 MB (incl. large IPCC/IPBES/UNEP reports)
**Google Drive path:** `OSPP/research/environment/pdfs/`
**Catalog file:** `research/environment/CATALOG.md`
**Status:** complete — ready for download phase

**Next steps:**
- [ ] Download environment PDFs to Google Drive
- [ ] Start Session 4: Social domain (inequality geography, welfare states, health)
