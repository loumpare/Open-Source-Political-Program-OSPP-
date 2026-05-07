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
- [ ] Start Session 2: Education domain (psychology + clinical + human sciences)
