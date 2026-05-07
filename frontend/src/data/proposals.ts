export type Domain = 'economy' | 'education' | 'environment' | 'social'
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
    domain: 'economy',
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
]

export const DOMAIN_META: Record<Domain, { label: string; color: string; bg: string; icon: string }> = {
  economy:     { label: 'Economy',     color: 'text-amber-700',   bg: 'bg-amber-50 border-amber-200',   icon: '📈' },
  education:   { label: 'Education',   color: 'text-purple-700',  bg: 'bg-purple-50 border-purple-200', icon: '🎓' },
  environment: { label: 'Environment', color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200', icon: '🌱' },
  social:      { label: 'Social',      color: 'text-blue-700',    bg: 'bg-blue-50 border-blue-200',     icon: '🤝' },
}

export const STATUS_META: Record<Status, { label: string; color: string }> = {
  draft:     { label: 'Draft',      color: 'bg-slate-100 text-slate-600' },
  discussion:{ label: 'Discussion', color: 'bg-amber-100 text-amber-700' },
  vote:      { label: 'Open Vote',  color: 'bg-blue-100 text-blue-700' },
  adopted:   { label: 'Adopted',    color: 'bg-emerald-100 text-emerald-700' },
  rejected:  { label: 'Rejected',   color: 'bg-red-100 text-red-700' },
}
