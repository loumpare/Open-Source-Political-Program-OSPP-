export type Domain = 'economy' | 'education' | 'environment' | 'social' | 'health' | 'governance'
export type Status = 'draft' | 'discussion' | 'vote' | 'adopted' | 'rejected'

export interface Proposal {
  id: string
  country: string
  countryFlag: string
  domain: Domain
  title: string
  titleFr?: string
  summary: string
  content: string
  status: Status
  author: string
  date: string
  impactStatement: string
  populationAffected: string
  estimatedCost?: string
  sources: { label: string; year: number }[]
  tags: string[]
}

export const PROPOSALS: Proposal[] = [
  {
    id: 'ECO-FR-001',
    country: 'France',
    countryFlag: '🇫🇷',
    domain: 'economy',
    title: 'Raise the minimum wage (SMIC) to €1,600 net',
    titleFr: 'Revalorisation du SMIC à 1 600 € net',
    summary: 'Increase the French minimum wage to €1,600 net per month, indexed to inflation +0.5% annually.',
    content: `The current SMIC stands at approximately €1,400 net. This proposal raises it to €1,600 net (≈€2,000 gross), phased in over 18 months and indexed to CPI + 0.5% per year thereafter.\n\nA 10% increase in per-worker spending produces measurable gains in purchasing power and reduces in-work poverty. Peer-reviewed evidence from 72 studies (NBER 2024) finds a median employment elasticity of −0.13, meaning only 13% of potential earnings gains are offset by job losses.\n\nLow-margin sectors (retail, hospitality) would receive a 24-month transition subsidy equal to 50% of the wage increase cost per affected worker.`,
    status: 'discussion',
    author: 'community',
    date: '2026-05-07',
    impactStatement: 'Directly affects ~3 million workers at or near the SMIC threshold.',
    populationAffected: '~3 million workers',
    estimatedCost: '+€8B/year employer cost, −€2B/year welfare savings',
    sources: [
      { label: 'NBER w32925 — Cengiz et al. (2024): Quantifying the Impact of Minimum Wages', year: 2024 },
      { label: 'NBER w23532 — Minimum Wage Increases, Wages, and Low-Wage Employment', year: 2017 },
      { label: 'IZA WoL — Employment Effects of Minimum Wages', year: 2017 },
    ],
    tags: ['wages', 'poverty', 'labour market'],
  },
  {
    id: 'SOC-FR-001',
    country: 'France',
    countryFlag: '🇫🇷',
    domain: 'social',
    title: 'Retirement at 62 with a guaranteed minimum pension of €1,200',
    titleFr: 'Retraite à 62 ans avec pension minimale garantie à 1 200 €',
    summary: 'Maintain the legal retirement age at 62 and guarantee a minimum pension of €1,200 net per month for a full career.',
    content: `This proposal maintains the legal retirement age at 62 and introduces a guaranteed minimum pension of €1,200 net/month for workers with a full career (42 annuities), funded by a 0.5% additional contribution on incomes above €5,000/month.\n\nComparative research on Nordic welfare states shows that robust minimum pension floors significantly reduce old-age poverty without reducing labour market participation among prime-age workers (IZA 2017).`,
    status: 'draft',
    author: 'community',
    date: '2026-05-07',
    impactStatement: 'Lifts ~800,000 retirees above the poverty line.',
    populationAffected: '~800,000 retirees below poverty line',
    estimatedCost: '~€8B/year additional public cost',
    sources: [
      { label: 'COR — Annual Report on French Retirement System Sustainability', year: 2024 },
      { label: 'IZA DP10664 — Welfare State and Nordic Social Policy', year: 2017 },
      { label: 'NBER w22465 — Intergenerational Mobility in Denmark and US', year: 2016 },
    ],
    tags: ['pensions', 'retirement', 'welfare'],
  },
  {
    id: 'ENV-FR-001',
    country: 'France',
    countryFlag: '🇫🇷',
    domain: 'environment',
    title: '100% renewable electricity by 2045',
    titleFr: '100 % d\'énergies renouvelables d\'ici 2045',
    summary: 'Reach 100% renewable electricity in France by 2045 through a massive public investment plan of €50B over 10 years.',
    content: `This proposal sets a binding target of 100% renewable electricity by 2045 (vs. the current ~25%), backed by:\n- Tripling offshore wind capacity by 2032\n- Doubling rooftop solar installations by 2030\n- €50B public investment envelope (2026–2036)\n- Reform of the electricity market to decouple renewable prices from gas\n\nNature Energy (2026) shows solar and wind are now cost-competitive with fossil fuels on a levelised cost basis. The UNEP Emissions Gap Report 2025 confirms current NDCs put France on a 2.6–2.8°C trajectory without accelerated action.`,
    status: 'draft',
    author: 'community',
    date: '2026-05-07',
    impactStatement: '−80% CO₂ in the electricity sector. 300,000 jobs created over 10 years.',
    populationAffected: '68 million (entire French population)',
    estimatedCost: '€50B public over 10 years. Electricity bill −15% by 2035.',
    sources: [
      { label: 'IPCC AR6 WGIII — Mitigation of Climate Change (2022)', year: 2022 },
      { label: 'UNEP Emissions Gap Report 2025', year: 2025 },
      { label: 'Nature Energy — Probabilistic Projections of Wind and Solar Growth (2026)', year: 2026 },
    ],
    tags: ['climate', 'energy', 'renewables', 'net-zero'],
  },
  {
    id: 'EDU-FR-001',
    country: 'France',
    countryFlag: '🇫🇷',
    domain: 'education',
    title: 'Free public university tuition with €600/month grants',
    titleFr: 'Gratuité de l\'université publique + bourse de 600 €/mois',
    summary: 'Abolish public university registration fees and raise minimum student grants to €600/month for eligible households.',
    content: `France currently charges ~€170/year in registration fees for undergraduate students. This proposal abolishes all fees for public universities and raises the minimum bursary to €600/month (from ~€380) for households earning under €30,000/year.\n\nNBER research (Jackson, Johnson & Persico 2016) shows each 10% increase in education spending raises adult wages by 7.25% and reduces poverty by 3.67 percentage points. Chetty et al. (2020) documents that college access gaps by socioeconomic status are the primary driver of intergenerational mobility failure.`,
    status: 'draft',
    author: 'community',
    date: '2026-05-07',
    impactStatement: 'Directly benefits ~1.6 million students. Increases first-generation college completion by an estimated +8pp.',
    populationAffected: '~1.6 million students',
    estimatedCost: '~€2.8B/year (fees abolition + bursary increase)',
    sources: [
      { label: 'NBER w20847 — Effects of School Spending on Economic Outcomes (Jackson et al.)', year: 2016 },
      { label: 'NBER w25479 — Measuring Opportunity in US Higher Education (Chetty et al.)', year: 2020 },
      { label: 'UNESCO GEM Report 2026 — Access and Equity', year: 2026 },
    ],
    tags: ['higher education', 'access', 'social mobility'],
  },
  {
    id: 'ECO-US-001',
    country: 'United States',
    countryFlag: '🇺🇸',
    domain: 'economy',
    title: 'Raise federal minimum wage to $17/hour',
    summary: 'Increase the federal minimum wage from $7.25 to $17/hour, phased in over 3 years, then indexed to CPI.',
    content: `The US federal minimum wage has been frozen at $7.25/hour since 2009. This proposal raises it to $17/hour in three $3 steps (2027, 2028, 2029), then indexes it to the Consumer Price Index annually.\n\nA meta-analysis of 72 studies (NBER 2024) finds a median employment elasticity of −0.13 — only 13% of potential earnings gains are offset by job losses. CBO estimates range from −200k to +400k jobs. ~33 million workers would receive a direct raise.`,
    status: 'draft',
    author: 'community',
    date: '2026-05-07',
    impactStatement: '~33 million workers receive a direct raise. Median affected worker: +$6,000/year.',
    populationAffected: '~33 million low-wage workers',
    estimatedCost: 'No public cost. Private sector cost varies by sector.',
    sources: [
      { label: 'NBER w32925 — Quantifying the Impact of Minimum Wages (2024)', year: 2024 },
      { label: 'BLS Earnings & Wages Statistics (2025)', year: 2025 },
      { label: 'EPI Minimum Wage Tracker (2026)', year: 2026 },
    ],
    tags: ['wages', 'poverty', 'labour market', 'federal policy'],
  },
  {
    id: 'GOV-GLOBAL-001',
    country: 'Global',
    countryFlag: '🌐',
    domain: 'governance',
    title: 'Open Source Government Software Mandate',
    summary: 'Any software developed with public funds must be published as open source within 90 days of deployment.',
    content: `Governments that commission software with public money should release it publicly. This proposal mandates:\n1. Open source release (OSI-approved license) within 90 days of deployment\n2. Public registry of all government software\n3. Open source procurement preference where functionally equivalent\n4. Exception: national security systems (annual independent audit)\n\nThe EU Commission estimates 15–25% savings on duplicated software development costs. Already partially adopted in Germany, France (Etalab), and Estonia.`,
    status: 'draft',
    author: 'community',
    date: '2026-05-07',
    impactStatement: 'Estimated 15–25% savings on government software costs. Creates a global civic software commons.',
    populationAffected: 'All citizens in adopting countries',
    estimatedCost: 'Net savings estimated at 15–25% of government software budgets.',
    sources: [
      { label: 'FSFE — Public Money, Public Code Campaign', year: 2024 },
      { label: 'EU Commission — Cost-Benefit Analysis of Open Source in Government', year: 2024 },
      { label: 'Foundation for Public Code — publiccode.net', year: 2025 },
    ],
    tags: ['governance', 'transparency', 'open source', 'public spending'],
  },

  // ── Economy — France ─────────────────────────────────────────────────────
  {
    id: 'ECO-FR-002',
    country: 'France',
    countryFlag: '🇫🇷',
    domain: 'economy',
    title: 'Universal Basic Income — national pilot (€800/month)',
    titleFr: 'Revenu universel de base — expérimentation nationale (800 €/mois)',
    summary: 'Launch a 3-year UBI pilot in 5 French regions: €800/month unconditionally for all adults aged 18–64, replacing existing means-tested minima.',
    content: `This proposal launches a 3-year randomised controlled trial across 5 French departments (≈2 million people), providing €800/month unconditionally to all adults aged 18–64. Existing means-tested minima (RSA, AAH) are merged and replaced for participants.

Findings from the Finnish UBI experiment (2017–2018, NBER 2019), the Stockton SEED pilot (US, 2019–2021) and 16 global UBI pilots synthesised by the Stanford Basic Income Lab (2023) consistently show:
- No significant reduction in employment or labour supply (contrary to fears)
- Significant improvements in mental health, self-reported wellbeing, and economic security
- Increased job-search quality and part-time to full-time transitions
- No increase in alcohol or tobacco consumption

Cost estimate for national rollout (all adults 18–64): ~€340B/year gross, offset by abolition of means-tested benefits (~€60B) and new top marginal tax revenue.`,
    status: 'draft',
    author: 'community',
    date: '2026-05-13',
    impactStatement: 'Pilot covers ~2 million people across 5 departments. National rollout would affect 45 million adults.',
    populationAffected: '~2 million (pilot) → 45 million (national)',
    estimatedCost: 'Pilot: ~€10B/year. National rollout: ~€280B/year net after offsets.',
    sources: [
      { label: 'NBER w26682 — A Financial Incentives Approach to UBI: Evidence from Finland (Banerjee et al.)', year: 2019 },
      { label: 'Stanford Basic Income Lab — Review of Evidence on Basic Income (2023)', year: 2023 },
      { label: 'Stockton SEED — Guaranteed Income Pilot: 24-Month Report (2022)', year: 2022 },
    ],
    tags: ['UBI', 'poverty', 'welfare reform', 'income support'],
  },
  {
    id: 'ECO-FR-003',
    country: 'France',
    countryFlag: '🇫🇷',
    domain: 'economy',
    title: 'Progressive wealth tax 2.0 — 1% above €5M',
    titleFr: 'Impôt sur la fortune progressif 2.0 — 1 % au-delà de 5 M€',
    summary: 'Reinstate and reform a progressive annual wealth tax: 0.5% above €2M, 1% above €5M, 1.5% above €50M — covering all assets including financial wealth.',
    content: `France abolished the ISF (Impôt sur la Fortune) in 2018, replacing it with a real-estate-only IFI. This proposal reinstates and broadens it:

| Bracket | Rate |
|---------|------|
| €2M–€5M net assets | 0.5%/year |
| €5M–€50M net assets | 1.0%/year |
| >€50M net assets | 1.5%/year |

Coverage: all net assets including financial securities, business equity, real estate, and offshore holdings (anti-evasion clause with 15% penalty on undisclosed assets).

World Inequality Lab research (Saez & Zucman, 2019; WID.world 2022) documents that the top 1% of French households hold ~24% of total wealth. Danish and Swedish wealth tax studies (Jakobsen et al., QJE 2020) find capital flight elasticity of −0.17 per percentage point — manageable with international information exchange (CRS/FATCA frameworks now in place).`,
    status: 'draft',
    author: 'community',
    date: '2026-05-13',
    impactStatement: 'Estimated ~300,000 households affected. Would raise €12–18B/year.',
    populationAffected: '~300,000 households (top 0.4%)',
    estimatedCost: 'Revenue: +€12–18B/year. Capital flight risk: −€1–3B partially offset.',
    sources: [
      { label: 'Saez & Zucman — Progressive Wealth Taxation (NBER w26387)', year: 2019 },
      { label: 'Jakobsen et al. — Wealth Taxation and Wealth Accumulation (QJE 2020)', year: 2020 },
      { label: 'WID.world — World Inequality Report 2022', year: 2022 },
    ],
    tags: ['wealth tax', 'inequality', 'fiscal policy', 'redistribution'],
  },

  // ── Education ─────────────────────────────────────────────────────────────
  {
    id: 'EDU-FR-002',
    country: 'France',
    countryFlag: '🇫🇷',
    domain: 'education',
    title: 'Universal preschool from age 2 — public & free',
    titleFr: 'École maternelle universelle dès 2 ans — gratuite et obligatoire',
    summary: 'Extend compulsory free public schooling to age 2, with certified early-childhood pedagogy and class sizes capped at 20 children.',
    content: `France currently guarantees compulsory schooling from age 3. This proposal lowers the threshold to age 2, with:
- Full-time public provision (35h/week), free of charge
- Minimum pedagogical certification for all staff (currently only 45% are certified teachers at age 2–3)
- Class sizes capped at 20 children (currently 25–28 at age 2)
- Priority implementation in REP/REP+ zones (disadvantaged schools)

Evidence base:
- The Perry Preschool Project (Michigan): RCT showing lifelong effects 40 years later — higher employment, lower crime, higher earnings (Heckman, NBER)
- Boston pre-K study (Chetty lab): universal preschool access → +8 percentage points college enrollment, −10% incarceration rate
- Attanasio et al. (2020, NBER w27698): high-quality early stimulation at 12–24 months delivers 25% wage premium at age 22

Returns to investment in early childhood education are the highest of any educational spending: $7–12 per $1 invested (Heckman, Science 2006).`,
    status: 'draft',
    author: 'community',
    date: '2026-05-13',
    impactStatement: 'Would enrol ~250,000 additional children aged 2. Largest gains for disadvantaged families.',
    populationAffected: '~250,000 children aged 2 (full cohort)',
    estimatedCost: '~€2.5B/year (staff hiring + infrastructure). ROI: €7–12 per €1 over 30 years.',
    sources: [
      { label: 'Heckman et al. — The Perry Preschool Project: 40-Year Follow-Up (NBER)', year: 2016 },
      { label: 'Chetty et al. — The Effects of Preschool on Children\'s Well-Being (NBER)', year: 2016 },
      { label: 'NBER w27698 — Investing in Early Childhood Development (Attanasio et al.)', year: 2020 },
    ],
    tags: ['preschool', 'early childhood', 'education equity', 'child development'],
  },
  {
    id: 'EDU-US-001',
    country: 'United States',
    countryFlag: '🇺🇸',
    domain: 'education',
    title: 'Universal Pre-K — federally funded for ages 3–4',
    summary: 'Establish federally funded, voluntary universal pre-kindergarten for all 3- and 4-year-olds, with quality standards and pay parity for educators.',
    content: `Only 44% of US 4-year-olds and 18% of 3-year-olds are enrolled in public preschool. Access is heavily stratified by income. This proposal:
- Creates a federal-state matching grant for universal pre-K (ages 3–4)
- Sets minimum quality standards (class size ≤15, certified lead teachers)
- Requires pay parity between pre-K and K–12 teachers
- Builds on and expands Head Start for income-eligible families

Research from Chetty et al. (NBER) on the Boston preschool program shows +8pp college enrollment and measurable lifetime earnings gains. The Perry Preschool RCT (Heckman, NBER) documents ROI of $7–12 per $1 invested over 30 years. The Abecedarian Project shows IQ gains and halved special education referrals.

The US currently spends 0.3% GDP on early childhood education vs. 0.6–0.8% OECD average. Closing this gap would cost an estimated $100–140B/year.`,
    status: 'draft',
    author: 'community',
    date: '2026-05-13',
    impactStatement: '~6.6 million children aged 3–4 would gain access. Largest gains for low-income and minority families.',
    populationAffected: '~6.6 million children (ages 3–4)',
    estimatedCost: '~$120B/year federal cost (net of state matching and long-run fiscal savings).',
    sources: [
      { label: 'Heckman et al. — The Perry Preschool Project: 40-Year Follow-Up (NBER)', year: 2016 },
      { label: 'Chetty et al. — The Effects of Pre-K on Children\'s Later Outcomes (NBER)', year: 2016 },
      { label: 'OECD Education at a Glance 2025 — Early Childhood Education and Care', year: 2025 },
    ],
    tags: ['pre-K', 'early childhood', 'education access', 'federal policy'],
  },

  // ── Environment ───────────────────────────────────────────────────────────
  {
    id: 'ENV-FR-002',
    country: 'France',
    countryFlag: '🇫🇷',
    domain: 'environment',
    title: 'Progressive carbon tax + citizen dividend',
    titleFr: 'Taxe carbone progressive + dividende citoyen',
    summary: 'Introduce a carbon tax rising from €75/tCO₂ (2027) to €200/tCO₂ (2035), with 100% of revenue redistributed equally to every adult resident.',
    content: `This proposal reintroduces the carbon tax (abandoned after Gilets Jaunes in 2018) as a fully revenue-neutral mechanism:

**Tax schedule:**
| Year | €/tCO₂ |
|------|--------|
| 2027 | 75 |
| 2029 | 120 |
| 2032 | 160 |
| 2035 | 200 |

**Revenue recycling:** 100% redistributed as an equal monthly dividend (~€42/month/adult at €120/tCO₂), making the policy progressive: 70% of households — the bottom 7 deciles — receive more in dividend than they pay in carbon tax (Goulder et al., NBER 2019).

Evidence: China's national ETS reduced covered emissions by 12.1% at cost-to-benefit ratio of 1:5 (Bai et al., NBER 2023). The IMF (2022) finds carbon taxes outperform regulations for cost efficiency. EU ETS allowances at €60–65/tCO₂ show industry response even at current low levels.`,
    status: 'draft',
    author: 'community',
    date: '2026-05-13',
    impactStatement: '~−25% French CO₂ emissions by 2035 vs baseline. 70% of households net positive after dividend.',
    populationAffected: '52 million adult residents (dividend); all economic actors (tax)',
    estimatedCost: 'Revenue: ~€55B/year at €120/tCO₂. 100% recycled — net public cost zero.',
    sources: [
      { label: 'NBER w25181 — Impacts of a Carbon Tax Across US Household Income Groups (Goulder et al.)', year: 2019 },
      { label: 'IMF Staff Climate Notes — Carbon Taxes or Emissions Trading Systems (2022)', year: 2022 },
      { label: 'NBER w31809 — China\'s Nationwide CO₂ Emissions Trading System (Bai et al.)', year: 2023 },
    ],
    tags: ['carbon tax', 'climate', 'dividend', 'fiscal policy'],
  },
  {
    id: 'ENV-US-001',
    country: 'United States',
    countryFlag: '🇺🇸',
    domain: 'environment',
    title: 'Federal carbon price and dividend — $65/ton rising to $200',
    summary: 'Enact a federal carbon price starting at $65/tCO₂ (2027), rising $15/year, with 100% of revenue returned as equal per-capita dividends.',
    content: `The US has no federal carbon price. This proposal establishes one at the point of production/import:

**Schedule:** $65/tCO₂ in 2027, rising by $15/year → $200/tCO₂ by 2037.

**Dividend:** 100% of revenue (~$500B/year by 2030) distributed as equal quarterly checks to all US residents. Estimated dividend: ~$1,200/adult/year.

**Border adjustment:** carbon border adjustment on imports from non-pricing countries (CBAM mechanism, modelled on EU approach).

The Social Cost of Carbon (Rennert et al., Nature 2022) estimates at $185/tCO₂ — the proposed schedule reaches this level by 2034. Energy Innovation Act modelling: −45% US GHG by 2035 vs 2005. Bottom 60% of households come out net positive (dividend > carbon cost).`,
    status: 'draft',
    author: 'community',
    date: '2026-05-13',
    impactStatement: '−45% US GHG emissions by 2035. 60% of households receive more in dividends than they pay.',
    populationAffected: '~260 million adult residents (dividend); all fossil fuel consumers (price)',
    estimatedCost: 'Revenue: $300–500B/year. 100% recycled — no net public cost.',
    sources: [
      { label: 'Rennert et al. — Comprehensive Evidence Implies Higher Social Cost of Carbon (Nature 2022)', year: 2022 },
      { label: 'NBER w25181 — Impacts of a Carbon Tax Across US Household Income Groups (Goulder et al.)', year: 2019 },
      { label: 'Energy Innovation and Carbon Dividend Act — Columbia SIPA Analysis (2023)', year: 2023 },
    ],
    tags: ['carbon price', 'climate', 'dividend', 'federal policy', 'net-zero'],
  },

  // ── Social ────────────────────────────────────────────────────────────────
  {
    id: 'SOC-FR-002',
    country: 'France',
    countryFlag: '🇫🇷',
    domain: 'social',
    title: 'National Housing First programme — 50,000 units by 2030',
    titleFr: 'Programme national Housing First — 50 000 logements d\'ici 2030',
    summary: 'Scale Housing First to 50,000 permanent supportive housing units by 2030, replacing conditional shelter access with unconditional stable housing for the chronically homeless.',
    content: `France counts ~330,000 people without stable housing (INSEE 2024), including ~30,000 in rough sleeping. The current approach (shelters, SAMU social) follows a "treatment first" model with poor permanent housing outcomes.

**Housing First** provides unconditional access to permanent housing immediately, with voluntary support services (mental health, addiction, employment) delivered in situ.

Evidence:
- Tsemberis et al. (2004, original Housing First RCT): 88% housing stability at 5 years vs 47% treatment-first
- At Home/Chez Soi (Canada, 2009–2013): 73% stable housing, −29% emergency room use, −40% hospitalisations
- Finnish "Y-Foundation" national rollout (2008–2019): rough sleeping reduced by 75% nationally
- European research (Pleace et al.): €1 spent on Housing First saves €0.5–1.8 in emergency services

**Proposal:** 50,000 units funded via a new national housing fund (50% state, 50% EPCI), requiring municipalities >50,000 inhabitants to implement local Housing First programmes.`,
    status: 'draft',
    author: 'community',
    date: '2026-05-13',
    impactStatement: 'Would permanently house ~50,000 chronically homeless people. Estimated net savings: €500M/year in emergency services.',
    populationAffected: '~50,000 people (chronically homeless target group)',
    estimatedCost: '€3B over 5 years (capital). Net negative after emergency service savings: −€500M/year.',
    sources: [
      { label: 'Tsemberis et al. — Housing First, Consumer Choice, and Harm Reduction (Psychiatr Serv, 2004)', year: 2004 },
      { label: 'Pleace et al. — The Cost of Homelessness and Housing First (European Journal of Homelessness 2019)', year: 2019 },
      { label: 'NBER w28069 — Stable Housing Reduces Homelessness and Long-Term Costs (2020)', year: 2020 },
    ],
    tags: ['housing', 'homelessness', 'Housing First', 'social policy'],
  },
  {
    id: 'SOC-FR-003',
    country: 'France',
    countryFlag: '🇫🇷',
    domain: 'social',
    title: 'Gender-equal parental leave — 6 months each, non-transferable',
    titleFr: 'Congé parental égalitaire — 6 mois chacun, non transférable',
    summary: 'Replace the current unequal parental leave system with 6 months of paid leave for each parent (80% salary), non-transferable, with a bonus month if both parents take full leave.',
    content: `France's current parental leave system: 16 weeks for mothers, 28 days for fathers (4 weeks since 2021). Only 1% of fathers take the full parental leave allowance (PAJE/PrePare).

**Proposal:**
- 6 months paid leave (80% salary, capped at 3× SMIC) for each parent — individually, non-transferable
- +1 bonus month each if both parents take the full 6 months → 7 months total
- Applies equally to single-parent families (total: 12 months)
- Phased in over 3 years to allow employer adaptation

**Research basis:**
- Goldin (Nobel 2023): the "child penalty" — the career cost of having children — accounts for 80% of the gender pay gap in Denmark. It falls on mothers almost exclusively.
- Andresen & Nix (IZA 2022): Norwegian gender-neutral leave reform reduced the maternal earnings penalty by 18% at 10 years post-birth.
- Johansson (2010): Swedish "daddy months" increased father take-up from 6% to 90%.
- Equivalent programmes in Iceland, Germany, Portugal show father take-up >70% when leave is non-transferable.`,
    status: 'draft',
    author: 'community',
    date: '2026-05-13',
    impactStatement: 'Reduces the gender pay gap by an estimated −8 to −12 pp over 10 years. Benefits ~750,000 families/year.',
    populationAffected: '~750,000 new parents per year',
    estimatedCost: '~€6B/year additional public cost (employer social contributions + state top-up).',
    sources: [
      { label: 'Goldin — Career and Family: Women\'s Century-Long Journey toward Equity (Nobel Lecture 2023)', year: 2023 },
      { label: 'Andresen & Nix — What Causes the Child Penalty? (IZA DP 15225)', year: 2022 },
      { label: 'Johansson — The Effect of Own and Spousal Parental Leave on Earnings (Econ J 2010)', year: 2010 },
    ],
    tags: ['parental leave', 'gender equality', 'pay gap', 'family policy'],
  },
  {
    id: 'SOC-US-001',
    country: 'United States',
    countryFlag: '🇺🇸',
    domain: 'social',
    title: 'Federal paid family and medical leave — 12 weeks at 90%',
    summary: 'Establish a federal paid family and medical leave programme guaranteeing 12 weeks at 90% wage replacement for all workers.',
    content: `The US is the only OECD country with no federal paid family or medical leave. Approximately 73% of US workers have no access to paid family leave through their employer.

**Proposal:**
- 12 weeks of paid leave for: new child (birth/adoption), serious personal illness, or care for a seriously ill family member
- 90% wage replacement (capped at median wage = ~$1,100/week)
- Funded via a 0.2% payroll tax (split employer/employee)
- Administered by Social Security Administration (modelled on California, New York, Washington state programmes)

Evidence from existing state programmes:
- California PFL (2004–): +10pp maternal employment at 1 year postpartum (Rossin-Slater et al., NBER 2011)
- Goldin (Nobel 2023): paid leave reduces the child earnings penalty when fathers take leave equally
- New Jersey, California, New York: no significant business harm; small businesses report reduced turnover costs`,
    status: 'draft',
    author: 'community',
    date: '2026-05-13',
    impactStatement: '~100 million workers currently without paid leave would gain access.',
    populationAffected: '~100 million workers without existing employer leave',
    estimatedCost: '~$20B/year (offset by 0.2% payroll tax — net public cost near zero).',
    sources: [
      { label: 'Rossin-Slater et al. — The Effects of Maternity Leave on Children\'s Birth and Infant Health Outcomes (NBER w16229)', year: 2011 },
      { label: 'Goldin — Career and Family (Nobel Lecture 2023)', year: 2023 },
      { label: 'IZA DP13990 — The Effects of Paid Family Leave (Cools, Markussen, Strøm)', year: 2021 },
    ],
    tags: ['paid leave', 'family policy', 'labour market', 'gender equality', 'federal policy'],
  },

  // ── Health ────────────────────────────────────────────────────────────────
  {
    id: 'HLT-FR-001',
    country: 'France',
    countryFlag: '🇫🇷',
    domain: 'health',
    title: 'Universal mental health coverage — psychologist reimbursed like GPs',
    titleFr: 'Remboursement universel de la santé mentale — psychologues remboursés comme les médecins',
    summary: 'Reimburse psychology consultations at 100% (Assurance Maladie + mutuelle) with no co-pay, and deploy 1 psychologist per 5,000 inhabitants in under-served areas.',
    content: `In France, psychologist sessions are reimbursed via the "MonPsy" scheme at €30–60/session — but only 8 sessions/year and only with GP referral. Private psychology sessions cost €60–120, making mental health care effectively inaccessible for lower-income households.

**Proposal:**
- Full reimbursement (100%) of all psychology consultations with registered clinical psychologists
- Remove the 8-session annual cap
- Create 5,000 salaried psychologist positions in under-served areas (medical deserts)
- Fund via a 0.15% increase in prélèvement social on capital income

**Evidence:**
- The Lancet Commission (Patel et al., 2018): mental disorders cause 32% of disability globally; only 30–40% receive any treatment in France
- Trautmann et al. (2016): mental illness costs European economies €798B/year (4% EU GDP), primarily via lost productivity — not treatment costs
- CBT and other evidence-based therapies are highly cost-effective: $800–$2,000 per DALY averted (WHO-CHOICE estimates)
- Current "MonPsy" scheme enrolled only 40,000 patients in its first year — far below the estimated 3 million who need access`,
    status: 'draft',
    author: 'community',
    date: '2026-05-13',
    impactStatement: '~3 million people currently without access to mental healthcare would gain affordable care.',
    populationAffected: '~3 million people needing mental health access',
    estimatedCost: '~€3.5B/year. Partially offset by reduced psychiatric hospitalisation and sick leave.',
    sources: [
      { label: 'Patel et al. — The Lancet Commission on Global Mental Health (2018)', year: 2018 },
      { label: 'Trautmann et al. — Economic Costs of Mental Disorders in Europe (2016)', year: 2016 },
      { label: 'WHO — Mental Health Action Plan 2013–2030 (2021)', year: 2021 },
    ],
    tags: ['mental health', 'healthcare access', 'psychology', 'reimbursement'],
  },
  {
    id: 'HLT-US-001',
    country: 'United States',
    countryFlag: '🇺🇸',
    domain: 'health',
    title: 'Medicare expansion — universal coverage for under-65s',
    summary: 'Extend Medicare to all uninsured and underinsured Americans under 65, creating a public option alongside private insurance.',
    content: `~26 million Americans remain uninsured despite the ACA (2024). An estimated 68,000 deaths per year are attributable to lack of health insurance (Woolhandler & Himmelstein, Lancet 2020).

**Proposal (public option model):**
- Create "Medicare Part E" — a public option open to any individual or employer
- Premiums set at cost (no profit), with subsidies for households <400% FPL
- Automatic enrollment for the uninsured at no premium (<200% FPL)
- Drug price negotiation for all Medicare parts (already partially enacted — IRA 2022 — but limited to 10 drugs; expand to full formulary)
- No cost-sharing for primary care, preventive services, mental health

**Evidence:**
- RAND (2021): US drug prices are 2.78× OECD average — negotiation alone saves $120–200B/year
- Himmelstein et al. (Lancet 2020): administrative overhead in US healthcare = $800B/year — 34.2% of total spending vs. 12.4% in Canada
- Finkelstein et al. (NBER 2019): Medicaid coverage reduces mortality by ~6% for newly covered adults
- Papanicolas et al. (JAMA 2018): US spends $11,100/capita vs $5,000–6,000 in comparable countries for worse outcomes on 10/11 metrics`,
    status: 'draft',
    author: 'community',
    date: '2026-05-13',
    impactStatement: '~26 million uninsured + ~45 million underinsured would gain adequate coverage. ~68,000 deaths/year prevented.',
    populationAffected: '~71 million uninsured or underinsured Americans',
    estimatedCost: 'Public option net cost: ~$800B/year gross, offset by premium revenue and drug savings. Net: ~$200–300B/year.',
    sources: [
      { label: 'Himmelstein et al. — Health Care Administrative Costs in US and Canada (Lancet 2020)', year: 2020 },
      { label: 'Papanicolas, Woskie, Jha — Health Care Spending in US and Other High-Income Countries (JAMA 2018)', year: 2018 },
      { label: 'NBER w25568 — Does Medicaid Save Lives? (Finkelstein et al.)', year: 2019 },
    ],
    tags: ['healthcare', 'Medicare', 'public option', 'insurance', 'federal policy'],
  },

  // ── Denmark 🇩🇰 ───────────────────────────────────────────────────────────
  {
    id: 'ECO-DK-001',
    country: 'Denmark',
    countryFlag: '🇩🇰',
    domain: 'economy',
    title: 'Flexicurity — the golden triangle: flexibility + security + training',
    titleFr: 'Flexicurité — le triangle d\'or : flexibilité + sécurité + formation',
    summary: 'Adopt the Danish flexicurity model: easy dismissal rules for employers, 90% wage unemployment benefits for 2 years, and intensive active labour market policies (ALMP) funded at 2% of GDP.',
    content: `The Danish "golden triangle" links three mutually reinforcing pillars — none works without the other two:

**1. Labour market flexibility:**
- 9-month trial period (vs. 2 months in France)
- Annual job turnover ~30% (vs. 10–15% in France/US)
- Dismissal without cause possible for employers with <10 employees

**2. Income security:**
- Unemployment benefit: 90% of last salary (capped at ~€2,500/month)
- Duration: up to 2 years
- Access: anyone who worked ≥52 weeks in the past 3 years

**3. Active Labour Market Policies (ALMP):**
- ALMP spending: 2.0% of GDP (vs. 0.3% in France, 0.1% in US)
- Mandatory training plan from month 3 of unemployment
- 9 weeks of funded training per year guaranteed to all unemployed workers
- 1 employment counsellor per 25 unemployed (vs. 1 per 200 in France)

Outcomes: unemployment 4.5% (2024), #1 job satisfaction in Europe, intergenerational income correlation 0.15 (vs. 0.45 in the US — Chetty et al., Science 2014).

Landersø & Heckman (NBER) nuance: much of Denmark's mobility advantage comes from wage compression (high minimum wages) rather than true mobility — the model raises the floor, not just redistributes.`,
    status: 'draft',
    author: 'community',
    date: '2026-05-13',
    impactStatement: 'Unemployment reduction −1.5 to −2 pp over 10 years. +25% annual job-to-job transitions.',
    populationAffected: 'All workers and employers (active labour market)',
    estimatedCost: '+€15B/year net (ALMP + improved unemployment), partially offset by lower long-term unemployment.',
    sources: [
      { label: 'Andersen & Svarer — Flexicurity: Labour Market Performance in Denmark (IZA DP 2532, 2007)', year: 2007 },
      { label: 'Landersø & Heckman — The Scandinavian Fantasy (NBER w20100)', year: 2017 },
      { label: 'OECD Employment Outlook — Flexicurity and Labour Market Performance', year: 2023 },
    ],
    tags: ['flexicurity', 'labour market', 'unemployment', 'training', 'nordic model'],
  },
  {
    id: 'EDU-DK-001',
    country: 'Denmark',
    countryFlag: '🇩🇰',
    domain: 'education',
    title: 'Universal student grant SU — €900/month for all, no means-testing',
    titleFr: 'Bourse étudiante universelle SU — 900 €/mois pour tous, sans conditions de ressources',
    summary: 'Provide every student in public higher education with a €900/month non-repayable grant, unconditional on parental income, funded by a 0.8% employer contribution on graduate salaries.',
    content: `The Danish **Statens Uddannelsesstøtte (SU)** is the world's most generous student grant system. It pays ~€900/month to all students regardless of their family's income.

**Key features:**
- Amount: ~€900/month (non-repayable)
- Conditions: none on parental income — based solely on the student's own earnings
- Duration: full study programme + 6 months
- Coverage: available to all students; those earning above a threshold receive a reduced amount

**Why unconditional?** The SU treats the student as an independent adult, not a family dependent. This eliminates:
- Non-take-up (zero means-testing forms to complete)
- Social stigma (everyone receives the same)
- Family pressure on study choice (students can choose any field regardless of income prospects)

**Results in Denmark:**
- Higher education completion rate: 50% (vs. 45% France, 40% OECD average)
- Income gap in graduation: smallest in Europe (OECD 2025)
- Students working >15h/week: 12% (vs. 27% in France — reduces academic outcomes)

**Cost:** ~€25B/year gross for 3 million students × €900/month × 9 months, offset by abolishing existing means-tested grants and APL + €10B employer contribution.`,
    status: 'draft',
    author: 'community',
    date: '2026-05-13',
    impactStatement: '~1.6 million students in France would receive equal support. Eliminates €0 grant non-take-up (currently ~30% of eligible students in France).',
    populationAffected: '~1.6 million students (all public higher education)',
    estimatedCost: 'Net ~€10B/year after abolishing existing fragmented grants and employer contribution.',
    sources: [
      { label: 'OECD Education at a Glance 2025 — Student support and financing', year: 2025 },
      { label: 'NBER w20847 — Effects of School Spending on Economic Outcomes (Jackson et al.)', year: 2016 },
      { label: 'NBER w25479 — Measuring Opportunity in US Higher Education (Chetty et al.)', year: 2020 },
    ],
    tags: ['student grants', 'higher education', 'universal', 'nordic model', 'access'],
  },
  {
    id: 'SOC-DK-001',
    country: 'Denmark',
    countryFlag: '🇩🇰',
    domain: 'social',
    title: '37-hour working week — legal norm with full productivity',
    titleFr: 'Semaine de 37 heures — norme légale nationale avec pleine productivité',
    summary: 'Enshrine a 37-hour working week as the legal standard, with full wage maintenance, building on the Danish model that has combined high productivity and workplace wellbeing since 1990.',
    content: `Since 1990, Denmark's standard working week has been **37 hours** — set by national collective agreement and enshrined in law in 1991. It is not a pilot — it is the reality of Danish work life for 35 years.

**Outcomes compared:**

| Indicator | Denmark (37h) | France (35h legal, ~39h actual) | OECD avg |
|-----------|--------------|--------------------------------|---------|
| Hours worked/year | 1,570 | 1,610 | 1,716 |
| Productivity/hour | $74 | $67 | $58 |
| Job satisfaction | 82% | 63% | 68% |
| Absenteeism | 5.6 days/year | 11.4 days/year | 9.2 days/year |

Denmark works **less** and produces **more per hour**. The mechanism: shorter weeks reduce fatigue, improve concentration, reduce presenteeism (working without producing), and dramatically cut absenteeism.

**Evidence from shorter-week experiments:**
- Iceland national trial (2015–2019, 2,500 workers): turnover −57%, productivity stable or up in 85% of organisations
- Microsoft Japan 4-day week: productivity +40%, electricity use −23%
- Lepinteur (IZA 2020): 35-hour introduction in France and Germany — wellbeing increased significantly for workers, no measurable productivity loss

**The Danish difference from the French 35h:**
The Danish 37h works because it was negotiated (not imposed), accompanied by management reform (objectives, not clock-in), and phased in over 5 years.`,
    status: 'draft',
    author: 'community',
    date: '2026-05-13',
    impactStatement: 'Absenteeism −3 days/year/worker → ~€30B/year savings. Job satisfaction +15 pp. Fertility effect: +0.1–0.2 children per woman.',
    populationAffected: 'All full-time workers (~20 million in France)',
    estimatedCost: 'Sector-specific transition costs. Offset by absenteeism reduction ~€30B/year and better mental health outcomes.',
    sources: [
      { label: 'Eurofound — Working Conditions in Europe (2023)', year: 2023 },
      { label: 'IZA DP 13985 — The Effects of Reducing Standard Working Hours (Lepinteur, 2020)', year: 2020 },
      { label: 'OECD Employment Outlook — Working time and work-life balance', year: 2024 },
    ],
    tags: ['working time', 'productivity', 'wellbeing', 'nordic model', '4-day week'],
  },

  // ── Governance ────────────────────────────────────────────────────────────
  {
    id: 'GOV-GLOBAL-002',
    country: 'Global',
    countryFlag: '🌐',
    domain: 'governance',
    title: 'Mandatory algorithmic transparency for public-sector AI',
    summary: 'Any AI or algorithmic system used in public administration decisions must be open-source auditable, with explanations provided to affected citizens.',
    content: `Governments worldwide are deploying AI systems for welfare eligibility, sentencing recommendations, school admissions, tax audits, and social scoring — without transparency or appeal rights. This proposal establishes binding global standards for algorithmic governance:

**Requirements for any AI/algorithmic system used in public decisions:**
1. Open publication of the model's purpose, data sources, and decision logic (not necessarily weights, but auditable logic)
2. Individual explanations: any citizen affected by an automated decision has the right to a human-readable explanation
3. Appeal mechanism: the right to request human review of any automated decision
4. Annual independent audit by certified algorithmic auditors
5. Public impact assessments before deployment (modelled on EU AI Act Annex III)

**Basis:**
- EU AI Act (2024): classifies high-risk AI (benefits, justice, education, employment) — requires transparency, explainability, human oversight
- OSF Algorithmic Accountability research (2021): algorithmic systems in public services produce systematic errors that disproportionately affect minorities and low-income groups
- France's Law for a Digital Republic (2016) already mandates algorithmic transparency for public decisions — but enforcement is weak`,
    status: 'draft',
    author: 'community',
    date: '2026-05-13',
    impactStatement: 'Would affect any government using AI in public decisions — estimated 60+ countries with significant AI deployment in public services.',
    populationAffected: 'Any citizen subject to automated public-sector decisions',
    estimatedCost: 'Compliance cost: ~0.5% of public AI procurement budgets. Avoids cost of discrimination lawsuits and policy failures.',
    sources: [
      { label: 'EU AI Act — Regulation 2024/1689 (European Parliament)', year: 2024 },
      { label: 'Reisman et al. — Algorithmic Impact Assessments (AI Now Institute 2018)', year: 2018 },
      { label: 'Diakopoulos — Accountability in Algorithmic Decision-Making (Commun ACM 2016)', year: 2016 },
    ],
    tags: ['AI governance', 'transparency', 'algorithmic accountability', 'digital rights'],
  },
]

export const DOMAIN_META: Record<Domain, { label: string; color: string; bg: string; icon: string; stripe: string; gradientFrom: string; gradientTo: string }> = {
  economy:     { label: 'Economy',     color: 'text-amber-700',   bg: 'bg-amber-50 border-amber-200',     icon: '📈', stripe: 'bg-amber-400',   gradientFrom: 'from-amber-400',   gradientTo: 'to-amber-300'   },
  education:   { label: 'Education',   color: 'text-purple-700',  bg: 'bg-purple-50 border-purple-200',   icon: '🎓', stripe: 'bg-purple-400',  gradientFrom: 'from-purple-400',  gradientTo: 'to-purple-300'  },
  environment: { label: 'Environment', color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200', icon: '🌱', stripe: 'bg-emerald-400', gradientFrom: 'from-emerald-400', gradientTo: 'to-emerald-300' },
  social:      { label: 'Social',      color: 'text-blue-700',    bg: 'bg-blue-50 border-blue-200',       icon: '🤝', stripe: 'bg-blue-400',    gradientFrom: 'from-blue-400',    gradientTo: 'to-blue-300'    },
  health:      { label: 'Health',      color: 'text-rose-700',    bg: 'bg-rose-50 border-rose-200',       icon: '🏥', stripe: 'bg-rose-400',    gradientFrom: 'from-rose-400',    gradientTo: 'to-rose-300'    },
  governance:  { label: 'Governance',  color: 'text-slate-700',   bg: 'bg-slate-50 border-slate-300',     icon: '🏛️', stripe: 'bg-slate-400',   gradientFrom: 'from-slate-400',   gradientTo: 'to-slate-300'   },
}

export const RESEARCH_STATS = {
  sources: 262,
  chunks: 4723,
  domains: 5,
}

export const STATUS_META: Record<Status, { label: string; color: string }> = {
  draft:     { label: 'Draft',      color: 'bg-slate-100 text-slate-600' },
  discussion:{ label: 'Discussion', color: 'bg-amber-100 text-amber-700' },
  vote:      { label: 'Open Vote',  color: 'bg-blue-100 text-blue-700' },
  adopted:   { label: 'Adopted',    color: 'bg-emerald-100 text-emerald-700' },
  rejected:  { label: 'Rejected',   color: 'bg-red-100 text-red-700' },
}
