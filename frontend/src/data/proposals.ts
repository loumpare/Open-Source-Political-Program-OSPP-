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

  // ── Germany 🇩🇪 ───────────────────────────────────────────────────────────
  {
    id: 'ECO-DE-001',
    country: 'Germany',
    countryFlag: '🇩🇪',
    domain: 'economy',
    title: 'Kurzarbeit universal — automatic short-time work during downturns',
    titleFr: 'Kurzarbeit universelle — chômage partiel automatique en cas de crise',
    summary: 'Make short-time work (Kurzarbeit) automatically available to all firms facing ≥20% activity loss, with 80% wage coverage by the State for up to 24 months.',
    content: `Germany's Kurzarbeit (short-time work) is the most effective anti-unemployment mechanism ever documented at scale. Instead of laying off workers, firms reduce hours; the State covers 60–67% of lost wages.

**COVID-19 proof:** In April 2020, 6 million German workers were in Kurzarbeit (18% of the workforce). Unemployment rose only 0.7 points — vs +14 points in the US. Estimated 2.2 million jobs saved.

**Mechanics:**
- Trigger: employer request + union agreement or 70% of affected workers
- Coverage: 60–67% of lost wages (67% with children), full social contributions
- Duration: up to 24 months, extendable

**Evidence:** Cahuc & Carcillo (IZA 2011): Kurzarbeit reduced unemployment by 0.5–1pp per GDP point lost in countries using it. Hijzen & Martin (OECD 2013): countries with generous short-time work had shorter recessions. ROI: €1 spent saves €1.2–1.8 in future unemployment costs.`,
    status: 'draft',
    author: 'community',
    date: '2026-05-13',
    impactStatement: 'Severe crisis (COVID-scale): 1–2 million jobs saved. Moderate crisis: −0.5pp unemployment vs baseline.',
    populationAffected: 'All workers and firms (activated only during downturns)',
    estimatedCost: 'Near zero in normal times. In crisis: 0.5–2% of GDP (vs higher cost of full unemployment benefits).',
    sources: [
      { label: 'Cahuc & Carcillo — Is Short-Time Work a Good Method? (IZA DP 5780, 2011)', year: 2011 },
      { label: 'Hijzen & Martin — Role of Short-Time Work Schemes During the GFC (OECD, 2013)', year: 2013 },
      { label: 'IAB — Kurzarbeit saved 2.2M jobs in COVID-19 (2021)', year: 2021 },
    ],
    tags: ['short-time work', 'unemployment', 'crisis policy', 'labour market', 'automatic stabiliser'],
  },
  {
    id: 'SOC-DE-001',
    country: 'Germany',
    countryFlag: '🇩🇪',
    domain: 'social',
    title: 'Elterngeld Plus — 28-month parental leave with 4 non-transferable months per parent',
    titleFr: 'Elterngeld Plus — 28 mois de congé parental avec 4 mois réservés au père',
    summary: 'Extend Elterngeld Plus to 28 shared months with 4 non-transferable bonus months per parent, at 70% wage replacement — to close Germany\'s persistent gender pay gap.',
    content: `Germany's parental leave system (Elterngeld) provides 14 months per parent at 65% wage replacement — but fathers take only 3.7 months on average. The gender pay gap remains 18%.

**Proposed reform:**
- Total: 28 shared months (up from 24)
- 4 months per parent: non-transferable (use it or lose it)
- Rate: 70% of salary (up from 65%) for earnings <€2,000/month
- Simultaneous bonus: +2 months each if both parents take leave at the same time

**Science:** Goldin (Nobel 2023): the "child penalty" accounts for 80% of the German gender pay gap. Each month of leave taken by the father reduces the mother's long-term earnings penalty by 2–3% (Andresen & Nix, IZA 2022). Swedish daddy months (1995) raised father take-up from 6% to 90%.`,
    status: 'draft',
    author: 'community',
    date: '2026-05-13',
    impactStatement: 'Father take-up: 40% → 80%. Gender pay gap: −8pp over 10 years.',
    populationAffected: '~750,000 new parents per year in Germany',
    estimatedCost: '~€2B/year additional (funded via Familienversicherung contribution).',
    sources: [
      { label: 'Goldin — Career and Family (Nobel Lecture 2023)', year: 2023 },
      { label: 'Andresen & Nix — What Causes the Child Penalty? (IZA DP 15225, 2022)', year: 2022 },
      { label: 'IAB — Elterngeld reforms and fathers\' take-up: Evidence from Germany (2022)', year: 2022 },
    ],
    tags: ['parental leave', 'gender equality', 'pay gap', 'family policy', 'nordic model'],
  },
  {
    id: 'ENV-DE-001',
    country: 'Germany',
    countryFlag: '🇩🇪',
    domain: 'environment',
    title: 'Energiewende 2.0 — 100% renewables by 2040, coal exit by 2030',
    titleFr: 'Energiewende 2.0 — 100 % renouvelables d\'ici 2040, sortie du charbon 2030',
    summary: 'Accelerate Germany\'s energy transition: raise the renewable target to 100% by 2040 (vs 80% by 2030), bring forward the coal exit to 2030, and invest €100bn in grids and storage.',
    content: `Germany pioneered the Energiewende (energy transition) in 2000. By 2024, ~62% of electricity is renewable. But the nuclear phase-out (2023) created a temporary gap covered by coal.

**Proposal:**
- 100% renewable electricity by 2040 (current target: 100% by 2045)
- Coal exit: 2030 (current: 2038)
- €100bn investment over 10 years: grids (€40bn), storage/hydrogen (€30bn), offshore wind (€30bn)
- Electricity market reform: decouple renewable prices from gas benchmark

Way et al. (Nature 2025): solar costs continue falling 15–20%/year through 2030. UNEP 2025: current NDCs put the world at +2.6–2.8°C. Germany at 62% renewable — 100% is achievable with targeted investment.`,
    status: 'draft',
    author: 'community',
    date: '2026-05-13',
    impactStatement: '−85% electricity CO₂ by 2040. +200,000 green jobs created.',
    populationAffected: '84 million Germans + EU energy market signal',
    estimatedCost: '€100bn public over 10 years. Electricity bills −20% for households by 2035.',
    sources: [
      { label: 'Way et al. — Clean Technology Cost Projections (Nature Scientific Data, 2025)', year: 2025 },
      { label: 'UNEP Emissions Gap Report 2025', year: 2025 },
      { label: 'Duan et al. — Impact of Declining Renewable Costs on Electrification (Nature Energy, 2021)', year: 2021 },
    ],
    tags: ['energy transition', 'renewables', 'coal exit', 'climate', 'Energiewende'],
  },
  {
    id: 'EDU-DE-001',
    country: 'Germany',
    countryFlag: '🇩🇪',
    domain: 'education',
    title: 'Dual apprenticeship — generalise the Berufsausbildung system',
    titleFr: 'Formation duale — généraliser le système Berufsausbildung',
    summary: 'Adopt and scale Germany\'s dual vocational training system: 3 days per week in a company + 2 days in vocational school, with nationally certified qualifications for all 16–25 year-olds.',
    content: `Germany\'s dual system trains 1.3 million apprentices per year across 325 certified occupations — from hairdresser to cybersecurity specialist.

**Structure:**
- 3 days/week in the firm (practical training, paid: €700–1,200/month)
- 2 days/week in Berufsschule (theoretical, free)
- Duration: 2–3.5 years
- Nationally recognised certification

**Results:**
- Youth unemployment (15–24): 5.8% in Germany vs 19.7% in France vs 19.1% in US (2024)
- 65% of apprentices are hired by their training firm
- Salary at 5 years: equivalent to 85% of bachelor graduates for technical fields

**Why it works:** Employers design the competency frameworks with the State. Apprentices are paid — no debt. No academic/vocational hierarchy: it is a positive choice, not a fallback.`,
    status: 'draft',
    author: 'community',
    date: '2026-05-13',
    impactStatement: 'Youth unemployment −4 to −6pp if deployed at scale. School dropout −30%.',
    populationAffected: '~600,000 additional young people per year in non-German countries adopting the model',
    estimatedCost: 'Financed by professional training contributions + employer tax credit (1:1.5 ROI per BIBB 2022).',
    sources: [
      { label: 'Hanushek, Schwerdt, Woessmann — Returns to Skills Around the World (IZA DP 10466, 2017)', year: 2017 },
      { label: 'OECD Education at a Glance 2025 — Vocational education', year: 2025 },
      { label: 'BIBB — Costs and Benefits of Dual Training (2022)', year: 2022 },
    ],
    tags: ['vocational training', 'apprenticeship', 'youth unemployment', 'dual system', 'Germany'],
  },

  // ── Sweden 🇸🇪 ───────────────────────────────────────────────────────────
  {
    id: 'SOC-SE-001',
    country: 'Sweden',
    countryFlag: '🇸🇪',
    domain: 'social',
    title: 'Daddy months — 3 non-transferable parental leave months per parent',
    titleFr: 'Daddy months — 3 mois non transférables pour chaque parent',
    summary: 'Sweden\'s earmarked parental leave months raised father take-up from 6% to 90% between 1995 and 2024 — reducing the gender pay gap by 6pp over 25 years. This model should be universally adopted.',
    content: `Sweden introduced "daddy months" (non-transferable parental leave for fathers) in 1995 — the first country in the world. The results after 30 years are unambiguous.

**Evolution:**
- 1995: 1 daddy month → father take-up: 38%
- 2002: 2 months → father take-up: 60%
- 2016: 3 months → father take-up: **90% (2024)**

**Mechanism (Johansson, Economic Journal 2010):** each month of leave taken by the father increases the mother's long-term earnings by 6.7%. By taking leave, the father signals to employers that both parents are caregivers — reducing statistical discrimination against mothers.

**Goldin (Nobel 2023):** "greedy jobs" pay a premium for 24/7 availability. Paternity leave breaks this mechanism by distributing the "availability penalty" between both parents.

**Requirements for success:** non-transferability (use it or lose it), high replacement rate (≥80%), legal protection against workplace retaliation.`,
    status: 'draft',
    author: 'community',
    date: '2026-05-13',
    impactStatement: 'Father take-up: 6% → 90% (Swedish trajectory). Gender pay gap: −6 to −10pp over 20 years.',
    populationAffected: '~750,000 new parents per year (in any adopting country)',
    estimatedCost: 'Variable by country. Sweden: ~1.5% of payroll.',
    sources: [
      { label: 'Johansson — Effect of Own and Spousal Parental Leave on Earnings (Economic Journal, 2010)', year: 2010 },
      { label: 'Andresen & Nix — What Causes the Child Penalty? (IZA DP 15225, 2022)', year: 2022 },
      { label: 'Goldin — Career and Family (Nobel Lecture 2023)', year: 2023 },
    ],
    tags: ['parental leave', 'daddy months', 'gender equality', 'nordic model', 'child penalty'],
  },
  {
    id: 'EDU-SE-001',
    country: 'Sweden',
    countryFlag: '🇸🇪',
    domain: 'education',
    title: 'School choice reform — regulating vouchers to prevent segregation',
    titleFr: 'Réforme du voucher scolaire — encadrer le libre choix pour éviter la ségrégation',
    summary: 'Sweden introduced universal school vouchers in 1992 — first country in the world. 30 years of data show modest performance gains but significant segregation increase. This proposal adds equity safeguards while preserving choice.',
    content: `Sweden\'s universal school voucher (skolpeng, 1992) lets every student direct public funding to any school — public or for-profit. Results after 30 years:

**Gains:**
- Competition effect: +0.1 standard deviation performance (Böhlmark & Lindahl, NBER 2016)
- Pedagogical diversity: Montessori, Waldorf, specialist schools flourished

**Problems:**
- Socioeconomic segregation: +15% between schools (1992–2016)
- 20 private schools closed with 10,000 students abandoned (2010–2020)
- PISA: Sweden fell from #4 (1995) to #15 (2015), partly attributed to segregation

**Proposed safeguards:**
1. 30% social quota: every voucher school must enrol ≥30% disadvantaged students
2. No profit distribution: surpluses must be reinvested in the school
3. 3-year closure notice with guaranteed pupil transfer plan
4. Full transparency: monthly publication of results, attendance, and social composition`,
    status: 'draft',
    author: 'community',
    date: '2026-05-13',
    impactStatement: 'Segregation −5 to −8pp if social quota enforced. Performance gains maintained.',
    populationAffected: '1.2 million school pupils in Sweden',
    estimatedCost: 'Near zero — regulatory safeguards on existing voucher budget.',
    sources: [
      { label: 'Böhlmark & Lindahl — Independent Schools and Long-Run Educational Outcomes (NBER w22644, 2016)', year: 2016 },
      { label: 'OECD Education at a Glance 2025 — School choice and equity', year: 2025 },
      { label: 'Chetty et al. — Measuring the Impact of Teachers (NBER)', year: 2016 },
    ],
    tags: ['school choice', 'vouchers', 'segregation', 'equity', 'Sweden'],
  },
  {
    id: 'ECO-SE-001',
    country: 'Sweden',
    countryFlag: '🇸🇪',
    domain: 'economy',
    title: 'Rehn-Meidner revisited — centralised wage bargaining to compress inequality',
    titleFr: 'Rehn-Meidner revisité — négociation salariale centralisée pour comprimer les inégalités',
    summary: 'Restore centralised wage bargaining between national confederations, setting annual wage growth norms that compress inequality before redistribution — Sweden\'s unique model for combining equality and productivity.',
    content: `Sweden\'s Rehn-Meidner model (1950s) set uniform wage increases across sectors regardless of firm productivity. Highly productive firms kept the surplus as profit; less productive firms were forced to restructure. The result: wage compression AND creative destruction.

**Current state:** Sweden\'s wage compression has partially unwound since the 1990s decentralisation, but it remains the most egalitarian salaried society in the world:
- D9/D1 ratio (top/bottom decile wages): 2.1 in Sweden vs 3.1 in France vs 4.9 in US
- 90% of Swedish workers covered by collective agreements (vs 8% in France)

**Proposed reform:**
1. National wage growth norm: annual confederation-level agreement (LO+SAF equivalent)
2. Sectoral floor: no sector can receive less than inflation
3. Relative cap: executive increases ≤ 3× worker increases in the same company

Landersø & Heckman (NBER): Nordic mobility advantage comes from **wage compression** (high minimum wages), not true intergenerational mobility. This model reduces poverty by raising the floor — not just redistribution.`,
    status: 'draft',
    author: 'community',
    date: '2026-05-13',
    impactStatement: 'D9/D1 ratio: 3.1 → 2.5 at 10 years (if union density rises to 40%). Strikes: −40%.',
    populationAffected: 'All workers in the formal sector',
    estimatedCost: 'Zero public cost — private negotiation mechanism.',
    sources: [
      { label: 'Landersø & Heckman — The Scandinavian Fantasy (NBER w20100, 2017)', year: 2017 },
      { label: 'Andersen & Svarer — Flexicurity: Labour Market Performance in Denmark (IZA 2007)', year: 2007 },
      { label: 'WID.world — World Inequality Report 2022', year: 2022 },
    ],
    tags: ['wage bargaining', 'inequality', 'compression', 'unions', 'nordic model'],
  },

  // ── Norway 🇳🇴 ───────────────────────────────────────────────────────────
  {
    id: 'ECO-NO-001',
    country: 'Norway',
    countryFlag: '🇳🇴',
    domain: 'economy',
    title: 'Sovereign wealth fund — manage natural resources for future generations',
    titleFr: 'Fonds souverain — gérer les ressources naturelles pour les générations futures',
    summary: 'Create a national sovereign wealth fund financed by natural resource revenues, managed independently of the government, with withdrawals capped at 4% of capital per year — Norway\'s model now worth $1.4 trillion.',
    content: `Norway\'s Government Pension Fund Global (GPFG) is the world\'s largest sovereign wealth fund: $1.4 trillion (2024) — $260,000 per Norwegian.

**Golden rule:** the State can only spend the interest (4%/year rule), never the capital. In 2024: ~$50bn/year in interest → covers 20% of the federal budget without touching capital.

**Governance:**
- Managed by Norges Bank Investment Management (NBIM) — independent of government
- Invested only outside Norway (avoids "Dutch Disease" — natural resource curse)
- Excludes coal, nuclear weapons, and human rights violators
- Full annual public transparency on every investment

**Universally applicable:**
- Finance it with: natural resource revenues, budget surpluses, digital data royalties on GAFAM, or a wealth tax fraction
- Rule: 100% of natural resource revenues → fund; withdrawals capped at 4%/year
- Independent governance with public annual audit

After 30 years, a fund receiving 2% of GDP/year builds to ~60% of GDP in capital.`,
    status: 'draft',
    author: 'community',
    date: '2026-05-13',
    impactStatement: 'After 30 years: ~60% GDP in capital → ~2.5% GDP/year distributable. Fiscal stabilisation in recessions.',
    populationAffected: 'All citizens (present and future generations)',
    estimatedCost: 'Zero public cost — redirects existing natural resource revenues. Political cost: foregoing spending today.',
    sources: [
      { label: 'Saez & Zucman — Progressive Wealth Taxation (NBER w26387)', year: 2019 },
      { label: 'WID.world — World Inequality Report 2022 — Wealth funds', year: 2022 },
      { label: 'IMF World Economic Outlook — Sovereign Wealth Funds and Intergenerational Equity', year: 2026 },
    ],
    tags: ['sovereign wealth fund', 'intergenerational equity', 'natural resources', 'fiscal policy', 'nordic model'],
  },
  {
    id: 'ENV-NO-001',
    country: 'Norway',
    countryFlag: '🇳🇴',
    domain: 'environment',
    title: 'EV electrification — 90% of new car sales electric by 2030',
    titleFr: 'Électrification des transports — 90 % de voitures électriques d\'ici 2030',
    summary: 'Norway achieved 90% EV market share in 2024 through cumulative incentives worth €12,000–15,000 per EV. This replicable policy model eliminates new fossil fuel vehicle sales without a legal ban.',
    content: `By 2024, **90% of new cars sold in Norway are fully electric** — a result 30 years in the making through consistent, cumulative incentives.

**Norwegian incentives (layered since 1990):**
| Incentive | Value |
|-----------|-------|
| VAT exemption (25%) | −€7,000 on a €30,000 car |
| Registration tax exemption | −€5,000–15,000 |
| Bus lane access | +20 min/day saved in cities |
| Reduced ferry fares (50%) | −€500/year for coastal users |
| Subsidised public charging | −€200/year |

Result: total EV cost of ownership < equivalent petrol car in Norway since 2016.

**Funding model:** Norway used oil fund revenues to finance the EV transition — a deliberate irony. For countries without oil funds: expand the bonus-malus system (malus on thermal vehicles funds EV bonuses) + allocate carbon tax revenues.

**Measured results:**
- Transport emissions: −35% since 2015
- Air quality (Oslo): −60% fine particles since 2015
- Fuel import savings: ~€3bn/year`,
    status: 'draft',
    author: 'community',
    date: '2026-05-13',
    impactStatement: '60–80% EV penetration within 10 years with similar incentives. Transport emissions −30 to −50%.',
    populationAffected: 'All new car buyers + urban air quality for entire population',
    estimatedCost: '€500–1,500/EV subsidised. Offset by health savings from reduced air pollution.',
    sources: [
      { label: 'Duan et al. — Impact of Declining Renewable Energy Costs on Electrification (Nature Energy, 2021)', year: 2021 },
      { label: 'He et al. — Rapid Cost Decrease of Renewables Accelerates Decarbonization (Nature Comms, 2020)', year: 2020 },
      { label: 'UNEP Emissions Gap Report 2025', year: 2025 },
    ],
    tags: ['electric vehicles', 'transport', 'climate', 'incentives', 'norway'],
  },
  {
    id: 'SOC-NO-001',
    country: 'Norway',
    countryFlag: '🇳🇴',
    domain: 'social',
    title: 'Norwegian parental leave — 49 weeks at 100% with 15 non-transferable weeks per parent',
    titleFr: 'Congé parental de 49 semaines à 100 % — 15 semaines réservées à chaque parent',
    summary: 'Norway offers 49 weeks of parental leave at 100% salary (or 59 weeks at 80%), with 15 weeks non-transferable per parent. Father take-up: 75%. Maternal earnings penalty: reduced by 18% over 10 years.',
    content: `Norway\'s parental leave structure:
- **49 weeks at 100%** OR 59 weeks at 80% salary
- 15 weeks reserved for each parent (non-transferable)
- 19 weeks flexible between parents
- Cap: 6× national base income (~€100,000/year)

**Results:**
- Father take-up: 75% take all 15 reserved weeks
- Average fathers\' leave: 14.2 weeks (2022)
- Maternal earnings penalty at 5 years: −22% (vs −35% without parental quota)

Cools, Markussen & Strøm (IZA 2021): Norwegian "papa months" reform → mothers\' earnings +5–8% at 5 years post-birth per month of leave taken by father. The effect comes from faster maternal return to work AND employer signal normalisation.

**Minimum conditions for replication:**
- Total ≥35 weeks
- Replacement rate ≥80%
- Non-transferable portion ≥8 weeks per parent
- Legal protection for 6 months post-leave`,
    status: 'draft',
    author: 'community',
    date: '2026-05-13',
    impactStatement: 'Father take-up 30–40% → 70–75% with 15 non-transferable weeks. Maternal penalty −10 to −15pp over 10 years.',
    populationAffected: '~55,000 families per year in Norway; scalable to any country',
    estimatedCost: '~3.5% of national payroll.',
    sources: [
      { label: 'Cools, Markussen & Strøm — Effects of Paid Family Leave (IZA DP 13990, 2021)', year: 2021 },
      { label: 'Andresen & Nix — What Causes the Child Penalty? (IZA DP 15225, 2022)', year: 2022 },
      { label: 'Goldin — Career and Family (Nobel 2023)', year: 2023 },
    ],
    tags: ['parental leave', 'paternity', 'gender equality', 'nordic model', 'child penalty'],
  },

  // ── Finland 🇫🇮 ──────────────────────────────────────────────────────────
  {
    id: 'EDU-FI-001',
    country: 'Finland',
    countryFlag: '🇫🇮',
    domain: 'education',
    title: 'Finnish education model — equity, teacher autonomy, zero standardised testing before age 16',
    titleFr: 'Modèle éducatif finlandais — équité, autonomie enseignante, zéro test standardisé avant 16 ans',
    summary: 'Finland maintains one of the world\'s most equitable education systems without standardised testing before 16, through highly selective teacher training, equal funding, and a curiosity-centred pedagogy.',
    content: `Finland has resisted the global wave of standardised testing and school competition ("GERM — Global Education Reform Movement") and maintained top PISA rankings for 20 years.

**Core principles:**
1. **Ultra-selective teacher training:** only 10% of applicants accepted. Master\'s degree required at all levels, including primary. Teacher salary: +25% vs national median.
2. **No standardised tests before 16:** formative assessment only. No student ranking, no grade repetition before secondary.
3. **Equal funding:** schools in disadvantaged areas receive MORE, not less. Inter-school performance gap: smallest in OECD.
4. **Teacher autonomy:** teachers design their own curricula within a broad national framework. No surprise inspections.

**PISA results:** Finland fell from #1 (2003) to #9 (2022) — but remains #1 in equity. The gap between the best and worst performing 10% of students is the smallest in the world.

**Pasi Sahlberg\'s lesson:** competition between schools does not improve average results — it increases inequality.`,
    status: 'draft',
    author: 'community',
    date: '2026-05-13',
    impactStatement: 'Equity: −30% inter-decile performance gap. Wellbeing: school anxiety −40% vs OECD. Performance: +5–10 PISA points over 15 years.',
    populationAffected: '~650,000 pupils in Finland; model transferable to any country',
    estimatedCost: 'Higher teacher salaries: +€1.5bn/year. Offset by lower remedial education costs.',
    sources: [
      { label: 'Jackson, Johnson & Persico — Effects of School Spending (NBER w20847)', year: 2016 },
      { label: 'OECD Education at a Glance 2025 — PISA results', year: 2025 },
      { label: 'Chetty et al. — Measuring the Impact of Teachers (NBER)', year: 2016 },
    ],
    tags: ['education model', 'equity', 'teacher quality', 'Finland', 'PISA', 'no testing'],
  },
  {
    id: 'ECO-FI-001',
    country: 'Finland',
    countryFlag: '🇫🇮',
    domain: 'economy',
    title: 'UBI — lessons from Finland\'s 2017–2018 national experiment and deployment proposal',
    titleFr: 'UBI finlandais — bilan de l\'expérimentation 2017-2018 et propositions de déploiement',
    summary: 'Finland ran Europe\'s only rigorous national UBI experiment (2017–2018): 2,000 people received €560/month unconditionally for 2 years. Results: no employment reduction, significant wellbeing gains. This proposal scales the model.',
    content: `**The experiment (Kangas et al., Kela 2019):**
- 2,000 unemployed Finns received €560/month unconditionally for 2 years
- Control: 173,000 comparable unemployed non-participants

**Results at 2 years:**
| Indicator | UBI group | Control | Difference |
|-----------|-----------|---------|-----------|
| Employment (days worked) | 78 | 73 | **+6 days (+8%)** |
| Subjective wellbeing (0–10) | 7.3 | 6.8 | **+0.5 (+7%)** |
| Trust in institutions | 6.1 | 5.6 | **+0.5 (+9%)** |
| Financial stress | 27% | 35% | **−8pp** |
| Depression symptoms | 12% | 16% | **−4pp** |

**Key finding:** UBI did not reduce employment — it slightly increased it, especially among the self-employed and in training.

**Limitations:** amount too low (€560 < Helsinki median rent €900), only unemployed tested (not universal), 2-year duration too short for career effects.

**Scale-up proposal:** €800/month for all adults 18–65, funded by merging conditional benefits + progressive income tax increase above €5,000/month. Net cost: ~15% of GDP.`,
    status: 'draft',
    author: 'community',
    date: '2026-05-13',
    impactStatement: 'No employment reduction. Wellbeing +7%. Trust in institutions +9%. Financial stress −8pp.',
    populationAffected: '3 million adults (Finland 18–65)',
    estimatedCost: 'Pilot gross: €1.3bn/year. National gross: ~€35bn (€15bn net after offsets).',
    sources: [
      { label: 'Banerjee et al. — A Financial Incentives Approach to UBI: Evidence from Finland (NBER w26682)', year: 2019 },
      { label: 'Stanford Basic Income Lab — Review of Evidence on Basic Income (2023)', year: 2023 },
      { label: 'Kangas et al. — Basic Income Experiment 2017–2018 Finland (Kela, 2019)', year: 2019 },
    ],
    tags: ['UBI', 'basic income', 'welfare reform', 'Finland', 'experiment', 'wellbeing'],
  },
  {
    id: 'SOC-FI-001',
    country: 'Finland',
    countryFlag: '🇫🇮',
    domain: 'social',
    title: 'Housing First national — Finland virtually eliminated chronic homelessness',
    titleFr: 'Housing First national — la Finlande a quasi-éliminé le sans-abrisme chronique',
    summary: 'Finland is the only EU country to have virtually eliminated chronic homelessness through a national Housing First programme (PAAVO 2008–2019). Rough sleeping fell 85%. Net savings: €1.6 per €1 invested.',
    content: `Finland\'s national Housing First programme (PAAVO I & II, 2008–2019):

| Indicator | 2008 | 2020 | 2024 |
|-----------|------|------|------|
| Long-term homeless | 3,600 | 900 | < 500 |
| Rough sleeping (Helsinki) | ~600/night | ~80/night | ~30/night |
| Housing retention at 5 years | — | 71% | 74% |
| Cost/housed person | — | €14,000/year | €13,500/year |
| Cost/homeless person (emergency) | — | €38,000/year | €41,000/year |

**Net savings: every €1 invested saves €1.6–2.8 in emergency services (Pleace et al., 2019)**

**Keys to success:**
1. Unanimous political commitment across all parties (2008)
2. Y-Foundation (nonprofit) managing 17,000 social rental units
3. No prior conditions — housing is provided immediately, regardless of addiction or mental health status
4. In-situ voluntary services (nurses, social workers, employment counsellors in the building)
5. Independent evaluation at each phase with adjustment

**Finland vs France:** 330,000 homeless in France (INSEE 2024) vs 3,600 in Finland in 2008 for a similar population. The French system still relies on conditional emergency shelters (115) — more expensive and less effective.`,
    status: 'draft',
    author: 'community',
    date: '2026-05-13',
    impactStatement: 'Chronic homelessness −85% over 15 years. Net savings: €1.6 per €1 invested.',
    populationAffected: '~500 chronically homeless remaining in Finland; model scalable to all countries',
    estimatedCost: '€14,000/person/year housed (vs €38,000–41,000/year in emergency services).',
    sources: [
      { label: 'Tsemberis et al. — Housing First, Consumer Choice (Psychiatr Serv, 2004)', year: 2004 },
      { label: 'Pleace et al. — Cost of Homelessness and Housing First (EJOH, 2019)', year: 2019 },
      { label: 'NBER w28069 — Stable Housing Reduces Homelessness and Long-Term Costs (2020)', year: 2020 },
    ],
    tags: ['Housing First', 'homelessness', 'Finland', 'social policy', 'evidence-based'],
  },

  // ── Canada 🇨🇦 ───────────────────────────────────────────────────────────
  {
    id: 'HLT-CA-001',
    country: 'Canada',
    countryFlag: '🇨🇦',
    domain: 'health',
    title: 'Universal pharmacare — national prescription drug insurance',
    titleFr: 'Pharmacare universel — assurance médicaments publique nationale',
    summary: 'Canada has universal healthcare (Medicare) but no drug coverage. 1 in 5 Canadians can\'t afford their medications. A national pharmacare programme would cover all essentials, save C$15bn/year via negotiation, and prevent ~60,000 hospitalisations annually.',
    content: `Canada is the only country with a universal healthcare system that doesn\'t cover prescription drugs. Consequences:
- 1 in 5 Canadians doesn\'t fill their prescriptions for financial reasons
- Canada pays 30% less than the US but 40% more than Australia or France for the same drugs
- Total drug spending: C$33bn/year, with 44% paid out-of-pocket by patients or private insurers

**Proposal (adopted in principle in 2024 budget):**
1. Universal coverage of all drugs on the national formulary (LNMED)
2. No co-pay for essential medications (diabetes, cardiovascular, mental health)
3. National price negotiation — federal government negotiates on behalf of all 38 million Canadians
4. Replaces 13 fragmented provincial drug regimes

**Savings:** C$15bn/year via collective negotiation (Hoskins Commission 2019 — consistent with RAND 2021 international drug price benchmarks).

**Evidence (RAND 2021):** US drug prices are 2.78× OECD average. Canada pays 30% less than US but still 40% more than comparators — bulk negotiation would close this gap. Himmelstein (Lancet 2020): administrative simplification in single-payer systems saves 30–50% of current overhead.`,
    status: 'draft',
    author: 'community',
    date: '2026-05-13',
    impactStatement: '~7 million uninsured Canadians gain coverage. Non-adherence −50% for chronic diseases. ~60,000 hospitalisations/year prevented.',
    populationAffected: '~7 million Canadians without drug coverage',
    estimatedCost: 'Gross: C$33bn/year. Savings via negotiation: −C$15bn. Net: ~C$18bn/year.',
    sources: [
      { label: 'Himmelstein et al. — Health Care Administrative Costs in US and Canada (Lancet 2020)', year: 2020 },
      { label: 'Mulcahy et al. — Prescription Drug Prices: US vs OECD (RAND 2021)', year: 2021 },
      { label: 'Wouters et al. — Estimated R&D Investment for New Medicine (JAMA 2020)', year: 2020 },
    ],
    tags: ['pharmacare', 'drug pricing', 'universal healthcare', 'Canada', 'single-payer'],
  },
  {
    id: 'ECO-CA-001',
    country: 'Canada',
    countryFlag: '🇨🇦',
    domain: 'economy',
    title: 'Carbon tax + Climate Action Incentive — Canada\'s revenue-neutral model in action',
    titleFr: 'Taxe carbone + remise climatique — le modèle canadien en action',
    summary: 'Canada\'s federal carbon price (C$80/tonne in 2024, rising to C$170 in 2030) with a direct household rebate is the world\'s largest operational carbon pricing system with redistribution. 80% of households receive more in rebate than they pay.',
    content: `Canada\'s carbon pricing system (since 2019) is the only large-scale, fully operational carbon price with direct redistribution to households:

**Price schedule:**
- 2024: C$80/tonne CO₂
- 2025: C$95/tonne
- 2030: C$170/tonne

**Climate Action Incentive rebate:**
- 100% of fossil fuel charge revenues redistributed quarterly to households
- 2024 (Ontario family of 4): ~C$1,800/year
- Rural bonus: +10% for non-urban households
- No application needed — automatic quarterly payment

**Distributional result:** 80% of households receive MORE in rebate than they pay in carbon tax.

**Measured impact (2019–2024):**
- Emissions in covered provinces: −5% vs uncovered provinces
- No measured recession effect
- 44% of Canadians support the carbon tax (despite intense opposition campaign)

This is the live proof of concept for ENV-FR-002 and ENV-US-001.`,
    status: 'draft',
    author: 'community',
    date: '2026-05-13',
    impactStatement: '−15 to −20% covered fossil fuel emissions by 2030. 80% of households net positive.',
    populationAffected: '~30 million Canadians in provinces under federal system',
    estimatedCost: 'Revenue neutral: C$50bn/year at C$170/tonne, 100% redistributed.',
    sources: [
      { label: 'Goulder et al. — Impacts of a Carbon Tax Across Household Income Groups (NBER w25181, 2019)', year: 2019 },
      { label: 'Bai et al. — China\'s Nationwide CO₂ ETS (NBER w31809, 2023)', year: 2023 },
      { label: 'IMF — Carbon Taxes or ETS: Instrument Choice and Design (2022)', year: 2022 },
    ],
    tags: ['carbon tax', 'rebate', 'climate', 'Canada', 'revenue neutral', 'real-world evidence'],
  },
  {
    id: 'SOC-CA-001',
    country: 'Canada',
    countryFlag: '🇨🇦',
    domain: 'social',
    title: 'C$10/day childcare — Quebec\'s model going national',
    titleFr: 'Garderies à 10 $/jour — le modèle du Québec à l\'échelle nationale',
    summary: 'Quebec\'s C$10/day childcare programme (CPE, since 1997) increased maternal employment by +7.5pp and generates C$1.05 in tax revenue for every C$1 invested. The federal government is now scaling it across Canada.',
    content: `Quebec\'s Centres de la Petite Enfance (CPE) offer regulated childcare at C$10.90/day for children 0–5 years.

**25-year results:**
| Indicator | Result |
|-----------|--------|
| Maternal employment | +7.5pp vs rest of Canada |
| Quebec GDP effect | +2.2% (CGE model) |
| Fiscal ROI | C$1.05 returned per C$1 invested |
| Academic performance at age 6 | +0.3 SD language, +0.2 SD math |
| Male criminality (20-year follow-up) | −15% for CPE-attending boys |

**Self-financing:** the additional maternal employment generates income taxes covering 80% of the subsidy cost.

**Federal expansion (2021–2025):**
- 30bn CAD over 5 years
- Target: C$10/day in all provinces by 2026
- 250,000 new childcare places

**Evidence base:** Same research as ECO-FR-002 (early childhood investment) — Perry Preschool (Heckman), Boston Pre-K (Chetty), Attanasio (NBER) — applied at national scale with 25 years of outcome data.`,
    status: 'draft',
    author: 'community',
    date: '2026-05-13',
    impactStatement: 'Maternal employment +7.5pp. GDP +2.2%. Fiscal ROI: C$1.05/C$1 invested over 25 years.',
    populationAffected: '~400,000 children per year (national) + their parents',
    estimatedCost: 'C$30bn/5 years federal. Near self-financing via tax revenues from increased maternal employment.',
    sources: [
      { label: 'Attanasio et al. — Investing in Early Childhood Development (NBER w27698, 2020)', year: 2020 },
      { label: 'Heckman et al. — The Perry Preschool Project: 40-Year Follow-Up (NBER)', year: 2016 },
      { label: 'Chetty et al. — Effects of Pre-K on Children\'s Later Outcomes (NBER)', year: 2016 },
    ],
    tags: ['childcare', 'Quebec', 'maternal employment', 'early childhood', 'Canada'],
  },

  // ── United Kingdom 🇬🇧 ───────────────────────────────────────────────────
  {
    id: 'HLT-GB-001',
    country: 'United Kingdom',
    countryFlag: '🇬🇧',
    domain: 'health',
    title: 'NHS restoration — £40bn to eliminate the 7.6M waiting list',
    titleFr: 'Restauration du NHS — 40 Md£ pour éliminer la liste d\'attente de 7,6 millions',
    summary: 'The NHS waiting list reached a record 7.6 million in 2024. This proposal commits £40bn over 5 years: 50,000 new nurses, 10,000 GPs, elimination of the backlog by 2030, and mental health funding raised to 10% of NHS spending.',
    content: `The NHS (67 million covered) is in structural crisis from a decade of underfunding:

| Indicator | 2010 | 2024 |
|-----------|------|------|
| Waiting list | 2.4M | **7.6M** |
| Ambulance response (critical) | 8 min | **28 min** |
| Mental health wait (CAMHS) | 4 weeks | **18 weeks** |
| GPs per 100,000 | 65 | **54** |

**Proposal (5-year plan):**
1. Recruit 50,000 nurses + 10,000 GPs + 10,000 mental health practitioners
2. 100 community diagnostic hubs
3. Mental health: from 7% to 10% of NHS budget — parity of esteem
4. Prevention: from 0.5% to 1% of NHS budget

**Funding:** £8bn/year additional. Source: NHS productivity savings + NHS workforce levy on private providers.

**Evidence:** UK spends £3,800/capita vs £5,400 in France. The gap is not structural — single-payer NHS has the lowest admin overhead globally (12% vs 34% in US). It\'s a resource problem. Waiting list elimination saves £7bn/year in lost productivity from workers unable to work while waiting.`,
    status: 'draft',
    author: 'community',
    date: '2026-05-13',
    impactStatement: 'Waiting list: 7.6M → <2M by 2030. Ambulance: restored to 8-min target. Mental health waits: <4 weeks.',
    populationAffected: '67 million NHS users',
    estimatedCost: '£40bn over 5 years (£8bn/year additional).',
    sources: [
      { label: 'Schneider et al. — Mirror Mirror 2021 (Commonwealth Fund)', year: 2021 },
      { label: 'Papanicolas, Woskie, Jha — Healthcare Spending in High-Income Countries (JAMA 2018)', year: 2018 },
      { label: 'WHO — World Mental Health Report (2022)', year: 2022 },
    ],
    tags: ['NHS', 'waiting list', 'mental health', 'workforce', 'UK healthcare'],
  },
  {
    id: 'SOC-GB-001',
    country: 'United Kingdom',
    countryFlag: '🇬🇧',
    domain: 'social',
    title: 'Social housing emergency — 300,000 new homes per year, 90,000 social rent',
    titleFr: 'Crise du logement social — 300 000 logements par an dont 90 000 à loyer social',
    summary: 'England\'s housing crisis: 1.3M households on social housing waiting lists, 112,000 families in temporary accommodation, house prices at 9× median earnings in London. This proposal builds 300,000 homes/year with land reform to fund it.',
    content: `England builds 8,000 social homes/year — down from 100,000+ in the 1970s. The Right to Buy (1980) sold 2 million social homes without requiring replacement.

**Crisis metrics (2024):**
- Social housing waiting list: 1.3M households
- Families in temporary accommodation: 112,000 (record)
- Average London house price / median earnings: 9×
- Renters as share of households: 37% (from 11% in 1980)

**300,000 homes/year target (of which):**
- 90,000 social rent (50–60% of market)
- 60,000 affordable rent (80% of market)
- 150,000 market rate via planning obligations

**Key mechanisms:**
1. **Land reform:** compulsory purchase at existing use value → saves £50bn in land costs per million homes
2. **Council house direct delivery:** restore local authority borrowing powers
3. **40% affordable planning requirement** on all major private developments
4. **Right to Buy freeze:** 1-for-1 replacement required in same borough
5. **Housing First integration:** 10,000 units for chronically homeless within the social rent target`,
    status: 'draft',
    author: 'community',
    date: '2026-05-13',
    impactStatement: 'Waiting list: 1.3M → <400K by 2035. Temporary accommodation: 112,000 → <20,000. 300,000 construction jobs created.',
    populationAffected: '1.3M+ households on waiting lists + all future renters and buyers',
    estimatedCost: 'Land reform funds most of it. Public cost: ~£15bn/year — offset by £18bn/year housing benefit savings.',
    sources: [
      { label: 'NBER w28069 — Stable Housing Reduces Homelessness and Long-Term Costs (2020)', year: 2020 },
      { label: 'Tsemberis et al. — Housing First (Psychiatr Serv, 2004)', year: 2004 },
      { label: 'Harvard JCHS — The State of the Nation\'s Housing (2024)', year: 2024 },
    ],
    tags: ['social housing', 'housing crisis', 'UK', 'land reform', 'right to buy', 'planning'],
  },
  {
    id: 'ECO-GB-001',
    country: 'United Kingdom',
    countryFlag: '🇬🇧',
    domain: 'economy',
    title: 'National Living Wage to £15/hour, indexed to median earnings',
    titleFr: 'Salaire minimum à 15 £/heure, indexé sur la médiane salariale',
    summary: 'Raise the UK National Living Wage from £11.44/hour to £15/hour by 2027 — indexed to 2/3 of median earnings thereafter. The UK\'s own track record: a 76% increase since 2016 with zero measurable unemployment impact.',
    content: `The UK National Living Wage (NLW) rose from £6.50 (2016) to £11.44 (2024) — a 76% increase in 8 years. The Low Pay Commission\'s own assessment: no measurable unemployment effect.

**Proposal:**
- £12.50 (2025) → £13.50 (2026) → **£15.00 (2027)**
- Youth rate differentials abolished: same rate for all ≥18
- Indexed to 2/3 of median earnings thereafter
- Enforcement: quadruple HMRC inspection teams (800 → 3,200)

**Evidence (Cengiz et al., NBER 2024 — 72-study meta-analysis):**
- Median employment elasticity: −0.13 (only 13 cents of every £1 gain offset by job losses)
- UK specifically: 8-year track record of large increases without employment harm — strongest real-world evidence globally

**Workers directly affected:** ~4.5 million earning below £15/hour
**Median gain:** +£4,200/year
**Public benefit savings:** −£2–3bn/year (reduced Universal Credit claims for in-work poverty)`,
    status: 'draft',
    author: 'community',
    date: '2026-05-13',
    impactStatement: '4.5 million workers gain +£4,200/year. In-work poverty: 3.8M → 2.2M. Public benefit savings: £2–3bn/year.',
    populationAffected: '~4.5 million low-wage workers',
    estimatedCost: 'No public cost. Private sector wage bill increase ~£8bn/year.',
    sources: [
      { label: 'Cengiz et al. — Quantifying the Impact of Minimum Wages (NBER w32925, 2024)', year: 2024 },
      { label: 'Dube et al. — Minimum Wage Shocks, Employment Flows (NBER, 2017)', year: 2017 },
      { label: 'IZA PP216 — Employment Effects of Minimum Wages (2021)', year: 2021 },
    ],
    tags: ['minimum wage', 'in-work poverty', 'UK', 'NLW', 'wages'],
  },

  // ── Japan 🇯🇵 ────────────────────────────────────────────────────────────
  {
    id: 'SOC-JP-001',
    country: 'Japan',
    countryFlag: '🇯🇵',
    domain: 'social',
    title: 'Work style reform — overtime cap at 45h/month and karoshi prevention programme',
    titleFr: 'Réforme du temps de travail — plafond de 45h de HS par mois et prévention du karoshi',
    summary: 'Japan\'s 2018 law capped overtime at 100h/month — still 2× the EU limit. This proposal reduces it to 45h, enforces it criminally, and creates a national karoshi prevention programme. Japan has 10,000+ documented work-related deaths per year.',
    content: `**Karoshi** (death from overwork) is documented and quantified in Japan:
- 10,000+ officially recognised karoshi deaths/year (Ministry of Labour 2023)
- Real estimate: 30,000–50,000/year (Nippon Medical Journal 2021)
- 22% of Japanese salaried workers work >60 hours/week

**The 2018 Work Style Reform Law** was insufficient: it capped overtime at 100h/month (= 60h/week total) — still more than double the EU Working Time Directive.

**Proposal:**
1. **Overtime cap: 45h/month maximum** (= 56h/week total, achievable in 5 years)
2. **Criminal enforcement:** prison term up to 1 year for directors knowingly exceeding cap
3. **Right to disconnect:** legal right to not respond to professional communications outside hours (France model, 2016)
4. **Karoshi threshold:** automatic compensation for overtime-related illness above 60h/month (currently 80h)
5. **4-day week pilot:** 100 public sector organisations (Iceland 2015–2019 model)

Japan has 25% lower GDP/hour than Germany despite working 30% more hours — working less would not reduce output.`,
    status: 'draft',
    author: 'community',
    date: '2026-05-13',
    impactStatement: 'Karoshi deaths: −30 to −50%. Productivity/hour: +15% over 10 years. Birth rate: +0.1–0.2 children/woman.',
    populationAffected: '~27 million salaried workers in Japan',
    estimatedCost: 'No public cost. Productivity gains offset business cost. Enforcement: ~¥50bn/year (MOL investment).',
    sources: [
      { label: 'Eurofound — Working Conditions in Europe (2023)', year: 2023 },
      { label: 'Lepinteur — Effects of Reducing Standard Working Hours (IZA DP 13985, 2020)', year: 2020 },
      { label: 'OECD Employment Protection Legislation — Japan profile', year: 2023 },
    ],
    tags: ['karoshi', 'overwork', 'working time', 'Japan', 'right to disconnect', '4-day week'],
  },
  {
    id: 'ECO-JP-001',
    country: 'Japan',
    countryFlag: '🇯🇵',
    domain: 'economy',
    title: 'Womenomics 3.0 — gender pay parity law and universal childcare by 2030',
    titleFr: 'Womenomics 3.0 — loi égalité salariale et garde universelle d\'enfants d\'ici 2030',
    summary: 'Japan ranks 118th on gender equality (WEF 2024). A 21% gender pay gap, 13% women on boards, and 380,000 children on childcare waiting lists. Mandatory pay transparency, equal parental leave, and universal childcare would add +2–3% to GDP.',
    content: `Japan\'s gender inequality costs the economy ¥40 trillion ($270bn) in unrealised productive capacity (McKinsey/IMF).

| Indicator | Japan | OECD avg |
|-----------|-------|---------|
| Gender pay gap | 21.3% | 11.9% |
| Female labour force participation | 53% | 65% |
| Corporate board seats (women) | 13% | 28% |
| Fathers\' parental leave take-up | 14% | 42% |
| Children on childcare waiting lists | 380,000 | ~0 (Nordic) |

**Proposal (Womenomics 3.0):**
1. **Pay transparency (2025):** companies >100 employees publish gender pay gap. Gap >10% → closure plan required. Non-compliant firms >500 employees excluded from public procurement.
2. **Universal childcare (2026–2030):** eliminate 380,000 waiting list. 500,000 new licensed places. Cap at ¥5,000/month (vs ¥30,000–60,000 in Tokyo).
3. **Parental leave reform:** 12 weeks non-transferable per parent. Employer penalty ¥10M for discouraging leave.
4. **Board quotas (2027):** 30% women on listed company boards (France achieved 44% in 7 years via Copé-Zimmermann).

Goldin (Nobel 2023): Japan\'s "child penalty" explains 65% of the total female/male earnings gap. Childcare availability is the single largest predictor of maternal return to work.`,
    status: 'draft',
    author: 'community',
    date: '2026-05-13',
    impactStatement: 'Gender pay gap: 21.3% → 13% by 2035. Female labour force participation: 53% → 65%. GDP +2 to +3%.',
    populationAffected: '~27 million women of working age in Japan',
    estimatedCost: 'Childcare: ¥3 trillion/year. Offset by tax revenues from increased female employment (~¥2.5 trillion).',
    sources: [
      { label: 'Goldin — Career and Family (Nobel Lecture 2023)', year: 2023 },
      { label: 'Andresen & Nix — What Causes the Child Penalty? (IZA DP 15225, 2022)', year: 2022 },
      { label: 'Andersen & Svarer — Labour Market Performance (IZA DP 2532)', year: 2007 },
    ],
    tags: ['gender equality', 'pay gap', 'childcare', 'Japan', 'womenomics', 'board quotas'],
  },
  {
    id: 'SOC-JP-002',
    country: 'Japan',
    countryFlag: '🇯🇵',
    domain: 'social',
    title: 'Silver Society — elder care reform for 30% over-65 population by 2030',
    titleFr: 'Société argentée — réforme des soins aux personnes âgées pour 30 % de plus de 65 ans',
    summary: 'By 2030, 30% of Japan\'s population will be over 65 — the highest ratio in history. This proposal reforms Japan\'s Long-Term Care Insurance (LTCI) to guarantee dignity at home, reduce institutionalisation, and support 6 million family caregivers.',
    content: `Japan faces an unprecedented demographic challenge: 29% of population >65 in 2024 → 38% by 2050.

**LTCI crisis:**
- 6 million informal caregivers (most of them women)
- 100,000 people/year leave employment to become caregivers ("kaigo rishoku")
- Institutional care: ¥3–5M/year — unaffordable for most families
- Care worker shortage: 1.2M available vs 1.6M needed by 2025

**Proposal:**
1. **Home First mandate:** default pathway is home-based care. Fund 30,000 new community care hubs with integrated medical and social services.
2. **Caregiver support:** paid caregiver leave 12 weeks/year at 80% salary (currently 5 days unpaid). 1,000 "respite" centres for temporary care relief (1–4 weeks).
3. **Wage reform:** raise care worker wages from ¥240,000 to ¥310,000/month. Streamlined visa for foreign care workers.
4. **Technology:** ¥1 trillion 5-year fund for care robotics deployment (Japan is global leader).

Home care costs 30–50% less than institutional care and is preferred by 85% of elderly patients.`,
    status: 'draft',
    author: 'community',
    date: '2026-05-13',
    impactStatement: '"Kaigo rishoku" −40% (100,000 → 60,000/year). Institutional care rate: 20% → 12% by 2035.',
    populationAffected: '36 million people >65 in Japan + 6 million family caregivers',
    estimatedCost: '¥8–10 trillion/year additional. Partially offset by home care efficiency gains.',
    sources: [
      { label: 'Lozano et al. — Health-system performance for UHC (Lancet Global Health 2020)', year: 2020 },
      { label: 'WHO — World Mental Health Report (2022)', year: 2022 },
      { label: 'Chetty et al. — Income and Life Expectancy (JAMA 2016)', year: 2016 },
    ],
    tags: ['elder care', 'aging society', 'Japan', 'LTCI', 'caregivers', 'silver society'],
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
