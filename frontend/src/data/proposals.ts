export type Domain = 'economy' | 'education' | 'environment' | 'social' | 'health' | 'governance'
export type Status = 'draft' | 'discussion' | 'vote' | 'adopted' | 'rejected'

export interface Proposal {
  id: string
  country: string
  countryFlag: string
  domain: Domain
  title: string           // anglais (référence)
  titleFr?: string        // français
  titleDe?: string        // allemand
  summary: string         // anglais
  summaryFr?: string      // français
  summaryDe?: string      // allemand
  content: string          // anglais
  contentFr?: string       // français
  contentDe?: string       // allemand
  status: Status
  author: string
  date: string
  impactStatement: string
  populationAffected: string
  estimatedCost?: string
  sources: { label: string; year: number }[]
  tags: string[]
  historical?: boolean
  historicalOutcomes?: {
    period: string
    country_context: string
    gdp_impact: string
    employment_impact: string
    inequality_impact: string
    fiscal_impact: string
    key_finding: string
    sources: string[]
  }
}

export const PROPOSALS: Proposal[] = [
  {
    id: 'ECO-FR-001',
    country: 'France',
    countryFlag: '🇫🇷',
    domain: 'economy',
    title: 'Raise the minimum wage (SMIC) to €1,600 net',
    titleFr: 'Revalorisation du SMIC à 1 600 € net',
    titleDe: 'Erhöhung des Mindestlohns (SMIC) auf 1.600 € netto',
    summary: 'Increase the French minimum wage to €1,600 net per month, indexed to inflation +0.5% annually.',
    summaryFr: 'Porter le SMIC français à 1 600 € net par mois, indexé sur l\'inflation + 0,5 % annuellement.',
    summaryDe: 'Erhöhung des französischen Mindestlohns auf 1.600 € netto pro Monat, jährlich an die Inflation + 0,5 % angepasst.',
    content: `The current SMIC stands at approximately €1,400 net. This proposal raises it to €1,600 net (≈€2,000 gross), phased in over 18 months and indexed to CPI + 0.5% per year thereafter.\n\nA 10% increase in per-worker spending produces measurable gains in purchasing power and reduces in-work poverty. Peer-reviewed evidence from 72 studies (NBER 2024) finds a median employment elasticity of −0.13, meaning only 13% of potential earnings gains are offset by job losses.\n\nLow-margin sectors (retail, hospitality) would receive a 24-month transition subsidy equal to 50% of the wage increase cost per affected worker.`,
    contentFr: `Le SMIC actuel s'élève à environ 1 400 € net. Cette proposition le porte à 1 600 € net (≈ 2 000 € brut), avec une mise en œuvre progressive sur 18 mois et une indexation annuelle sur l'IPC + 0,5 % par la suite.

Une hausse de 10 % du coût par travailleur produit des gains mesurables de pouvoir d'achat et réduit la pauvreté au travail. La méta-analyse de 72 études (NBER 2024) identifie une élasticité médiane de l'emploi de −0,13, soit seulement 13 % des gains salariaux potentiels compensés par des pertes d'emploi.

Les secteurs à faibles marges (commerce de détail, hôtellerie) bénéficieront d'une subvention de transition de 24 mois couvrant 50 % de la hausse de coût salarial par travailleur concerné.`,
    contentDe: `Der aktuelle SMIC liegt bei etwa 1.400 € netto. Dieser Vorschlag erhöht ihn auf 1.600 € netto (≈ 2.000 € brutto), stufenweise über 18 Monate und anschließend jährlich an VPI + 0,5 % indexiert.

Eine Erhöhung der Arbeitskosten um 10 % bringt messbare Kaufkraftgewinne und reduziert Erwerbsarmut. Eine Meta-Analyse von 72 Studien (NBER 2024) ermittelt eine mittlere Beschäftigungselastizität von −0,13: Nur 13 % der potenziellen Lohngewinne werden durch Arbeitsplatzverluste kompensiert.

Niedrigmargige Sektoren (Einzelhandel, Gastronomie) erhalten eine 24-monatige Übergangsbeihilfe in Höhe von 50 % der Mehrkosten pro betroffener Arbeitnehmer.`,
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
    titleDe: 'Rente mit 62 Jahren mit garantierter Mindestrente von 1.200 €',
    summary: 'Maintain the legal retirement age at 62 and guarantee a minimum pension of €1,200 net per month for a full career.',
    summaryFr: 'Maintenir l\'âge légal de départ à la retraite à 62 ans et garantir une pension minimale de 1 200 € net pour une carrière complète.',
    summaryDe: 'Beibehaltung des gesetzlichen Rentenalters von 62 Jahren und Garantie einer Mindestrente von 1.200 € netto für eine vollständige Erwerbsbiografie.',
    content: `This proposal maintains the legal retirement age at 62 and introduces a guaranteed minimum pension of €1,200 net/month for workers with a full career (42 annuities), funded by a 0.5% additional contribution on incomes above €5,000/month.\n\nComparative research on Nordic welfare states shows that robust minimum pension floors significantly reduce old-age poverty without reducing labour market participation among prime-age workers (IZA 2017).`,
    contentFr: `Cette proposition maintient l'âge légal de départ à la retraite à 62 ans et instaure une pension minimale garantie de 1 200 € net/mois pour les travailleurs ayant effectué une carrière complète (42 annuités), financée par une cotisation supplémentaire de 0,5 % sur les revenus supérieurs à 5 000 €/mois.

Les recherches comparatives sur les États-providence nordiques montrent que des planchers de pension minimale robustes réduisent significativement la pauvreté des personnes âgées sans diminuer la participation au marché du travail des travailleurs en âge actif (IZA 2017).`,
    contentDe: `Dieser Vorschlag hält das gesetzliche Rentenalter bei 62 Jahren und führt eine garantierte Mindestrente von 1.200 € netto/Monat für Arbeitnehmer mit einer vollständigen Erwerbsbiografie (42 Beitragsjahre) ein, finanziert durch einen zusätzlichen Beitrag von 0,5 % auf Einkommen über 5.000 €/Monat.

Vergleichende Forschung zu nordischen Wohlfahrtsstaaten zeigt, dass robuste Mindestrentenböden die Altersarmut deutlich reduzieren, ohne die Arbeitsmarktbeteiligung der Personen im erwerbsfähigen Alter zu verringern (IZA 2017).`,
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
    titleDe: '100 % Erneuerbare Energie bis 2045',
    summary: 'Reach 100% renewable electricity in France by 2045 through a massive public investment plan of €50B over 10 years.',
    summaryFr: 'Atteindre 100 % d\'électricité renouvelable en France d\'ici 2045 grâce à un plan d\'investissement public de 50 milliards d\'euros sur 10 ans.',
    summaryDe: 'Bis 2045 eine 100-prozentige erneuerbare Stromversorgung in Frankreich durch ein öffentliches Investitionsprogramm von 50 Mrd. € über 10 Jahre erreichen.',
    content: `This proposal sets a binding target of 100% renewable electricity by 2045 (vs. the current ~25%), backed by:\n- Tripling offshore wind capacity by 2032\n- Doubling rooftop solar installations by 2030\n- €50B public investment envelope (2026–2036)\n- Reform of the electricity market to decouple renewable prices from gas\n\nNature Energy (2026) shows solar and wind are now cost-competitive with fossil fuels on a levelised cost basis. The UNEP Emissions Gap Report 2025 confirms current NDCs put France on a 2.6–2.8°C trajectory without accelerated action.`,
    contentFr: `Cette proposition fixe un objectif contraignant de 100 % d'électricité renouvelable d'ici 2045 (contre environ 25 % actuellement), soutenu par :
- Le triplement de la capacité éolienne offshore d'ici 2032
- Le doublement des installations solaires en toiture d'ici 2030
- Une enveloppe d'investissement public de 50 Md€ (2026–2036)
- Une réforme du marché de l'électricité pour découpler les prix des renouvelables du gaz

Nature Energy (2026) montre que le solaire et l'éolien sont désormais compétitifs par rapport aux énergies fossiles en coût nivelé. Le Rapport 2025 sur l'écart d'émissions du PNUE confirme que les NDC actuelles placent la France sur une trajectoire de 2,6 à 2,8 °C sans action accélérée.`,
    contentDe: `Dieser Vorschlag setzt ein verbindliches Ziel von 100 % erneuerbarem Strom bis 2045 (gegenüber aktuell ca. 25 %), unterstützt durch:
- Verdreifachung der Offshore-Windkapazität bis 2032
- Verdoppelung der Dachsolaranlagen bis 2030
- Öffentliche Investitionskapazität von 50 Mrd. € (2026–2036)
- Reform des Strommarktes zur Entkopplung erneuerbarer Preise vom Gas

Nature Energy (2026) zeigt, dass Solar- und Windenergie auf der Basis der nivellierten Kosten nun wettbewerbsfähig mit fossilen Brennstoffen sind. Der UNEP Emissions Gap Report 2025 bestätigt, dass die aktuellen NDCs Frankreich ohne beschleunigte Maßnahmen auf einen 2,6–2,8 °C-Pfad setzen.`,
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
    titleDe: 'Kostenfreies öffentliches Studium mit 600 €/Monat Stipendium',
    summary: 'Abolish public university registration fees and raise minimum student grants to €600/month for eligible households.',
    summaryFr: 'Supprimer les frais d\'inscription à l\'université publique et porter les bourses minimales à 600 €/mois pour les ménages éligibles.',
    summaryDe: 'Abschaffung der Studiengebühren an öffentlichen Universitäten und Erhöhung der Mindestzuschüsse auf 600 €/Monat für berechtigte Haushalte.',
    content: `France currently charges ~€170/year in registration fees for undergraduate students. This proposal abolishes all fees for public universities and raises the minimum bursary to €600/month (from ~€380) for households earning under €30,000/year.\n\nNBER research (Jackson, Johnson & Persico 2016) shows each 10% increase in education spending raises adult wages by 7.25% and reduces poverty by 3.67 percentage points. Chetty et al. (2020) documents that college access gaps by socioeconomic status are the primary driver of intergenerational mobility failure.`,
    contentFr: `La France facture actuellement environ 170 €/an de frais d'inscription aux étudiants en licence. Cette proposition supprime tous les frais dans les universités publiques et porte la bourse minimale à 600 €/mois (contre environ 380 €) pour les ménages dont les revenus sont inférieurs à 30 000 €/an.

Les recherches du NBER (Jackson, Johnson & Persico 2016) montrent que chaque hausse de 10 % des dépenses d'éducation augmente les salaires adultes de 7,25 % et réduit la pauvreté de 3,67 points de pourcentage. Chetty et al. (2020) documente que les inégalités d'accès à l'enseignement supérieur selon le statut socio-économique constituent le principal facteur d'échec de la mobilité intergénérationnelle.`,
    contentDe: `Frankreich erhebt derzeit ~170 €/Jahr an Einschreibegebühren für Bachelorstudierende. Dieser Vorschlag schafft alle Gebühren an öffentlichen Universitäten ab und erhöht das Mindeststipendium auf 600 €/Monat (von ~380 €) für Haushalte mit einem Einkommen unter 30.000 €/Jahr.

NBER-Forschung (Jackson, Johnson & Persico 2016) zeigt, dass jede 10-prozentige Erhöhung der Bildungsausgaben die Erwachsenenlöhne um 7,25 % steigert und die Armutsquote um 3,67 Prozentpunkte senkt. Chetty et al. (2020) dokumentiert, dass Zugangsungleichheiten im Hochschulbereich nach sozioökonomischem Status der wichtigste Treiber für intergenerationelle Mobilitätsmisserfolge sind.`,
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
    titleFr: 'Hausse du salaire minimum fédéral à 17 $/heure',
    titleDe: 'Erhöhung des föderalen Mindestlohns auf 17 $/Stunde',
    summary: 'Increase the federal minimum wage from $7.25 to $17/hour, phased in over 3 years, then indexed to CPI.',
    summaryFr: 'Augmenter le salaire minimum fédéral de 7,25 $ à 17 $/heure sur 3 ans, puis indexé sur l\'IPC.',
    summaryDe: 'Erhöhung des föderalen Mindestlohns von 7,25 $ auf 17 $/Stunde innerhalb von 3 Jahren, anschließend an den CPI gebunden.',
    content: `The US federal minimum wage has been frozen at $7.25/hour since 2009. This proposal raises it to $17/hour in three $3 steps (2027, 2028, 2029), then indexes it to the Consumer Price Index annually.\n\nA meta-analysis of 72 studies (NBER 2024) finds a median employment elasticity of −0.13 — only 13% of potential earnings gains are offset by job losses. CBO estimates range from −200k to +400k jobs. ~33 million workers would receive a direct raise.`,
    contentFr: `Le salaire minimum fédéral américain est gelé à 7,25 $/heure depuis 2009. Cette proposition le porte à 17 $/heure en trois étapes de 3 $ (2027, 2028, 2029), puis l'indexe annuellement sur l'indice des prix à la consommation.

Une méta-analyse de 72 études (NBER 2024) identifie une élasticité médiane de l'emploi de −0,13 — seulement 13 % des gains salariaux potentiels sont compensés par des pertes d'emploi. Les estimations du CBO varient entre −200 000 et +400 000 emplois. Environ 33 millions de travailleurs bénéficieraient d'une augmentation directe.`,
    contentDe: `Der föderale Mindestlohn in den USA ist seit 2009 bei 7,25 $/Stunde eingefroren. Dieser Vorschlag erhöht ihn in drei Schritten von je 3 $ (2027, 2028, 2029) auf 17 $/Stunde, danach jährlich an den Verbraucherpreisindex gebunden.

Eine Meta-Analyse von 72 Studien (NBER 2024) ergibt eine mittlere Beschäftigungselastizität von −0,13 — nur 13 % der potenziellen Lohngewinne werden durch Arbeitsplatzverluste kompensiert. CBO-Schätzungen reichen von −200.000 bis +400.000 Arbeitsplätzen. Etwa 33 Millionen Arbeitnehmer würden eine direkte Lohnerhöhung erhalten.`,
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
    titleFr: 'Obligation de logiciels gouvernementaux open source',
    titleDe: 'Open-Source-Pflicht für staatliche Software',
    summary: 'Any software developed with public funds must be published as open source within 90 days of deployment.',
    summaryFr: 'Tout logiciel développé avec des fonds publics doit être publié en open source dans les 90 jours suivant son déploiement.',
    summaryDe: 'Jede mit öffentlichen Mitteln entwickelte Software muss innerhalb von 90 Tagen nach Inbetriebnahme als Open Source veröffentlicht werden.',
    content: `Governments that commission software with public money should release it publicly. This proposal mandates:\n1. Open source release (OSI-approved license) within 90 days of deployment\n2. Public registry of all government software\n3. Open source procurement preference where functionally equivalent\n4. Exception: national security systems (annual independent audit)\n\nThe EU Commission estimates 15–25% savings on duplicated software development costs. Already partially adopted in Germany, France (Etalab), and Estonia.`,
    contentFr: `Les gouvernements qui commandent des logiciels avec des fonds publics devraient les rendre publics. Cette proposition impose :
1. La publication en open source (licence approuvée OSI) dans les 90 jours suivant le déploiement
2. Un registre public de tous les logiciels gouvernementaux
3. Une préférence d'achat pour l'open source lorsque fonctionnellement équivalent
4. Exception : systèmes de sécurité nationale (audit indépendant annuel)

La Commission européenne estime des économies de 15 à 25 % sur les coûts de développement logiciel dupliqués. Déjà partiellement adopté en Allemagne, en France (Etalab) et en Estonie.`,
    contentDe: `Regierungen, die Software mit öffentlichen Mitteln beauftragen, sollten diese öffentlich zugänglich machen. Dieser Vorschlag verpflichtet zu:
1. Open-Source-Veröffentlichung (OSI-zugelassene Lizenz) innerhalb von 90 Tagen nach Inbetriebnahme
2. Öffentlichem Register aller staatlichen Softwaresysteme
3. Bevorzugter Open-Source-Beschaffung, sofern funktional gleichwertig
4. Ausnahme: Systeme der nationalen Sicherheit (jährliche unabhängige Prüfung)

Die EU-Kommission schätzt Einsparungen von 15–25 % bei doppelten Softwareentwicklungskosten. Bereits teilweise in Deutschland, Frankreich (Etalab) und Estland umgesetzt.`,
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
    titleDe: 'Universelles Grundeinkommen — nationales Pilotprojekt (800 €/Monat)',
    summary: 'Launch a 3-year UBI pilot in 5 French regions: €800/month unconditionally for all adults aged 18–64, replacing existing means-tested minima.',
    summaryFr: 'Lancer un pilote de 3 ans dans 5 régions françaises : 800 €/mois sans condition pour tous les adultes de 18 à 64 ans, remplaçant les minima sociaux sous conditions de ressources.',
    summaryDe: 'Start eines 3-jährigen Pilotprojekts in 5 französischen Regionen: 800 €/Monat bedingungslos für alle Erwachsenen von 18 bis 64 Jahren, als Ersatz für bedarfsgeprüfte Sozialleistungen.',
    content: `This proposal launches a 3-year randomised controlled trial across 5 French departments (≈2 million people), providing €800/month unconditionally to all adults aged 18–64. Existing means-tested minima (RSA, AAH) are merged and replaced for participants.

Findings from the Finnish UBI experiment (2017–2018, NBER 2019), the Stockton SEED pilot (US, 2019–2021) and 16 global UBI pilots synthesised by the Stanford Basic Income Lab (2023) consistently show:
- No significant reduction in employment or labour supply (contrary to fears)
- Significant improvements in mental health, self-reported wellbeing, and economic security
- Increased job-search quality and part-time to full-time transitions
- No increase in alcohol or tobacco consumption

Cost estimate for national rollout (all adults 18–64): ~€340B/year gross, offset by abolition of means-tested benefits (~€60B) and new top marginal tax revenue.`,
    contentFr: `Cette proposition lance un essai contrôlé randomisé de 3 ans dans 5 départements français (≈ 2 millions de personnes), versant 800 €/mois inconditionnellement à tous les adultes de 18 à 64 ans. Les minima sociaux sous conditions de ressources existants (RSA, AAH) sont fusionnés et remplacés pour les participants.

Les résultats de l'expérimentation finlandaise du RSU (2017–2018, NBER 2019), du pilote Stockton SEED (États-Unis, 2019–2021) et de 16 pilotes mondiaux synthétisés par le Stanford Basic Income Lab (2023) montrent systématiquement :
- Aucune réduction significative de l'emploi ou de l'offre de travail (contrairement aux craintes)
- Des améliorations significatives de la santé mentale, du bien-être déclaré et de la sécurité économique
- Une meilleure qualité de recherche d'emploi et des transitions du temps partiel vers le temps plein
- Aucune augmentation de la consommation d'alcool ou de tabac

Estimation du coût d'un déploiement national (tous les adultes 18–64 ans) : environ 340 Md€/an brut, compensé par la suppression des minima sociaux sous conditions (~60 Md€) et de nouvelles recettes fiscales au taux marginal supérieur.`,
    contentDe: `Dieser Vorschlag startet einen 3-jährigen randomisierten kontrollierten Versuch in 5 französischen Departements (≈ 2 Millionen Menschen), der allen Erwachsenen von 18 bis 64 Jahren bedingungslos 800 €/Monat gewährt. Bestehende bedarfsgeprüfte Sozialleistungen (RSA, AAH) werden für Teilnehmende zusammengeführt und ersetzt.

Erkenntnisse aus dem finnischen BGE-Experiment (2017–2018, NBER 2019), dem Stockton-SEED-Pilotprojekt (USA, 2019–2021) und 16 globalen Pilotprojekten, die das Stanford Basic Income Lab (2023) zusammengefasst hat, zeigen durchgängig:
- Keine signifikante Verringerung der Beschäftigung oder des Arbeitsangebots (entgegen Befürchtungen)
- Deutliche Verbesserungen bei psychischer Gesundheit, Wohlbefinden und wirtschaftlicher Sicherheit
- Höhere Qualität der Jobsuche und Übergänge von Teilzeit zu Vollzeit
- Kein Anstieg des Alkohol- oder Tabakkonsums

Kostenschätzung für einen nationalen Rollout (alle Erwachsenen 18–64): ca. 340 Mrd. €/Jahr brutto, kompensiert durch Abschaffung bedarfsgeprüfter Leistungen (~60 Mrd. €) und neue Einnahmen aus dem Spitzensteuersatz.`,
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
    titleDe: 'Progressive Vermögenssteuer 2.0 — 1 % ab 5 Mio. €',
    summary: 'Reinstate and reform a progressive annual wealth tax: 0.5% above €2M, 1% above €5M, 1.5% above €50M — covering all assets including financial wealth.',
    summaryFr: 'Rétablir et réformer une taxe annuelle progressive sur le patrimoine : 0,5 % au-delà de 2 M€, 1 % au-delà de 5 M€, 1,5 % au-delà de 50 M€ — couvrant tous les actifs y compris financiers.',
    summaryDe: 'Wiedereinführung und Reform einer progressiven jährlichen Vermögenssteuer: 0,5 % über 2 Mio. €, 1 % über 5 Mio. €, 1,5 % über 50 Mio. € — alle Vermögenswerte einschließlich Finanzanlagen.',
    content: `France abolished the ISF (Impôt sur la Fortune) in 2018, replacing it with a real-estate-only IFI. This proposal reinstates and broadens it:

| Bracket | Rate |
|---------|------|
| €2M–€5M net assets | 0.5%/year |
| €5M–€50M net assets | 1.0%/year |
| >€50M net assets | 1.5%/year |

Coverage: all net assets including financial securities, business equity, real estate, and offshore holdings (anti-evasion clause with 15% penalty on undisclosed assets).

World Inequality Lab research (Saez & Zucman, 2019; WID.world 2022) documents that the top 1% of French households hold ~24% of total wealth. Danish and Swedish wealth tax studies (Jakobsen et al., QJE 2020) find capital flight elasticity of −0.17 per percentage point — manageable with international information exchange (CRS/FATCA frameworks now in place).`,
    contentFr: `La France a supprimé l'ISF (Impôt sur la Fortune) en 2018, le remplaçant par un IFI limité à l'immobilier. Cette proposition le rétablit et l'élargit :

| Tranche | Taux |
|---------|------|
| 2 M€–5 M€ d'actifs nets | 0,5 %/an |
| 5 M€–50 M€ d'actifs nets | 1,0 %/an |
| > 50 M€ d'actifs nets | 1,5 %/an |

Champ d'application : tous les actifs nets, y compris titres financiers, participations, immobilier et avoirs offshore (clause anti-évasion avec pénalité de 15 % sur les actifs non déclarés).

Les travaux du World Inequality Lab (Saez & Zucman, 2019 ; WID.world 2022) documentent que le 1 % des ménages français les plus aisés détient environ 24 % de la richesse totale. Les études sur les impôts sur la fortune danois et suédois (Jakobsen et al., QJE 2020) estiment une élasticité de la fuite des capitaux de −0,17 par point de pourcentage — gérable grâce aux échanges d'informations internationaux (dispositifs CRS/FATCA désormais en place).`,
    contentDe: `Frankreich hat die ISF (Impôt sur la Fortune) 2018 abgeschafft und durch eine rein immobilienbezogene IFI ersetzt. Dieser Vorschlag stellt sie wieder her und erweitert sie:

| Stufe | Satz |
|-------|------|
| 2 Mio. €–5 Mio. € Nettovermögen | 0,5 %/Jahr |
| 5 Mio. €–50 Mio. € Nettovermögen | 1,0 %/Jahr |
| > 50 Mio. € Nettovermögen | 1,5 %/Jahr |

Erfassung: alle Nettovermögenswerte einschließlich Wertpapiere, Unternehmensanteile, Immobilien und Offshore-Vermögen (Anti-Umgehungsklausel mit 15 % Strafzuschlag auf nicht gemeldete Vermögenswerte).

Forschung des World Inequality Lab (Saez & Zucman, 2019; WID.world 2022) dokumentiert, dass die reichsten 1 % der französischen Haushalte etwa 24 % des Gesamtvermögens halten. Dänische und schwedische Vermögenssteuerstudien (Jakobsen et al., QJE 2020) ermitteln eine Kapitalflucht-Elastizität von −0,17 pro Prozentpunkt — handhabbar mit internationalen Informationsaustauschrahmen (CRS/FATCA bereits in Kraft).`,
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
    titleDe: 'Universelle Vorschulbildung ab 2 Jahren — öffentlich und kostenlos',
    summary: 'Extend compulsory free public schooling to age 2, with certified early-childhood pedagogy and class sizes capped at 20 children.',
    summaryFr: 'Étendre la scolarisation obligatoire et gratuite à partir de 2 ans, avec une pédagogie petite enfance certifiée et des classes plafonnées à 20 enfants.',
    summaryDe: 'Ausweitung der kostenpflichtigen öffentlichen Schulpflicht auf das 2. Lebensjahr mit zertifizierter Frühpädagogik und einer maximalen Klassengröße von 20 Kindern.',
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
    contentFr: `La France garantit actuellement la scolarité obligatoire à partir de 3 ans. Cette proposition abaisse ce seuil à 2 ans, avec :
- Une prise en charge publique à temps plein (35h/semaine), gratuite
- Une certification pédagogique minimale pour tout le personnel (actuellement seulement 45 % sont des enseignants certifiés à 2–3 ans)
- Des effectifs plafonnés à 20 enfants par classe (actuellement 25–28 à 2 ans)
- Une mise en œuvre prioritaire dans les zones REP/REP+ (établissements défavorisés)

Base de données probantes :
- Le projet Perry Preschool (Michigan) : essai contrôlé randomisé montrant des effets durables 40 ans plus tard — emploi supérieur, criminalité réduite, revenus plus élevés (Heckman, NBER)
- Étude pré-maternelle de Boston (laboratoire Chetty) : accès universel à la pré-maternelle → +8 points de pourcentage d'inscription à l'université, −10 % de taux d'incarcération
- Attanasio et al. (2020, NBER w27698) : une stimulation précoce de haute qualité entre 12 et 24 mois génère une prime salariale de 25 % à 22 ans

Les rendements des investissements dans l'éducation de la petite enfance sont les plus élevés de toutes les dépenses éducatives : 7 à 12 $ pour 1 $ investi (Heckman, Science 2006).`,
    contentDe: `Frankreich garantiert derzeit Schulpflicht ab dem 3. Lebensjahr. Dieser Vorschlag senkt die Schwelle auf 2 Jahre ab, mit:
- Ganztägiger öffentlicher Betreuung (35h/Woche), kostenlos
- Mindestpädagogischer Qualifikation für alle Fachkräfte (derzeit nur 45 % zertifizierte Lehrkräfte bei 2–3-Jährigen)
- Klassengröße auf maximal 20 Kinder begrenzt (derzeit 25–28 bei 2-Jährigen)
- Vorrangiger Umsetzung in REP/REP+-Zonen (benachteiligte Schulen)

Evidenzbasis:
- Das Perry Preschool Project (Michigan): Randomisierte Studie mit lebenslangen Effekten nach 40 Jahren — höhere Beschäftigung, geringere Kriminalität, höhere Einkommen (Heckman, NBER)
- Boston-Vorschulstudie (Chetty-Labor): universeller Vorschulzugang → +8 Prozentpunkte Hochschuleinschreibung, −10 % Inhaftierungsrate
- Attanasio et al. (2020, NBER w27698): hochwertige Frühstimulation im Alter von 12–24 Monaten erzeugt eine Lohnprämie von 25 % mit 22 Jahren

Die Renditen von Investitionen in frühkindliche Bildung sind die höchsten aller Bildungsausgaben: 7–12 $ pro investiertem Dollar (Heckman, Science 2006).`,
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
    titleFr: 'Pré-maternelle universelle — financée au niveau fédéral pour les 3–4 ans',
    titleDe: 'Universelle Vorschule — bundesfinanziert für Kinder ab 3–4 Jahren',
    summary: 'Establish federally funded, voluntary universal pre-kindergarten for all 3- and 4-year-olds, with quality standards and pay parity for educators.',
    summaryFr: 'Mettre en place une pré-maternelle universelle et volontaire pour tous les enfants de 3 et 4 ans, financée par le fédéral, avec des normes de qualité et la parité salariale pour les éducateurs.',
    summaryDe: 'Einführung eines bundesfinanzierten, freiwilligen universellen Vorschulprogramms für alle 3- und 4-Jährigen mit Qualitätsstandards und Lohnparität für pädagogisches Fachpersonal.',
    content: `Only 44% of US 4-year-olds and 18% of 3-year-olds are enrolled in public preschool. Access is heavily stratified by income. This proposal:
- Creates a federal-state matching grant for universal pre-K (ages 3–4)
- Sets minimum quality standards (class size ≤15, certified lead teachers)
- Requires pay parity between pre-K and K–12 teachers
- Builds on and expands Head Start for income-eligible families

Research from Chetty et al. (NBER) on the Boston preschool program shows +8pp college enrollment and measurable lifetime earnings gains. The Perry Preschool RCT (Heckman, NBER) documents ROI of $7–12 per $1 invested over 30 years. The Abecedarian Project shows IQ gains and halved special education referrals.

The US currently spends 0.3% GDP on early childhood education vs. 0.6–0.8% OECD average. Closing this gap would cost an estimated $100–140B/year.`,
    contentFr: `Seulement 44 % des enfants américains de 4 ans et 18 % de ceux de 3 ans sont scolarisés dans une prématernelle publique. L'accès est fortement stratifié selon le revenu. Cette proposition :
- Crée une subvention fédérale-étatique pour la pré-maternelle universelle (3–4 ans)
- Fixe des normes de qualité minimales (effectif ≤ 15, enseignants principaux certifiés)
- Impose la parité salariale entre les enseignants de pré-maternelle et ceux du K–12
- S'appuie sur et élargit le programme Head Start pour les familles éligibles

Les recherches de Chetty et al. (NBER) sur le programme préscolaire de Boston montrent +8 points de pourcentage d'inscription à l'université et des gains de revenus à vie mesurables. L'essai contrôlé randomisé Perry Preschool (Heckman, NBER) documente un ROI de 7 à 12 $ par dollar investi sur 30 ans. Le projet Abecedarian montre des gains de QI et le nombre de signalements pour éducation spéciale divisé par deux.

Les États-Unis consacrent actuellement 0,3 % du PIB à l'éducation de la petite enfance contre 0,6–0,8 % en moyenne OCDE. Combler cet écart coûterait environ 100 à 140 Md$/an.`,
    contentDe: `Nur 44 % der US-amerikanischen 4-Jährigen und 18 % der 3-Jährigen sind in öffentlichen Vorschulen eingeschrieben. Der Zugang ist stark nach Einkommen stratifiziert. Dieser Vorschlag:
- Schafft einen föderalen-staatlichen Matching-Zuschuss für universelle Vorschule (Alter 3–4)
- Setzt Mindestqualitätsstandards (Klassengröße ≤15, zertifizierte Hauptlehrkräfte)
- Fordert Lohnparität zwischen Vorschul- und K-12-Lehrern
- Baut auf Head Start auf und erweitert es für einkommensschwache Familien

Forschung von Chetty et al. (NBER) zum Vorschulprogramm in Boston zeigt +8 pp Hochschuleinschreibung und messbare Einkommensgewinne im Lebensverlauf. Die Perry Preschool RCT (Heckman, NBER) dokumentiert einen ROI von 7–12 $ pro investiertem Dollar über 30 Jahre. Das Abecedarian-Projekt zeigt IQ-Gewinne und halbierte Sonderpädagogik-Überweisungen.

Die USA geben derzeit 0,3 % des BIP für frühkindliche Bildung aus, gegenüber 0,6–0,8 % OECD-Durchschnitt. Das Schließen dieser Lücke würde geschätzte 100–140 Mrd. $/Jahr kosten.`,
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
    titleDe: 'Progressive CO₂-Steuer + Bürgerdividende',
    summary: 'Introduce a carbon tax rising from €75/tCO₂ (2027) to €200/tCO₂ (2035), with 100% of revenue redistributed equally to every adult resident.',
    summaryFr: 'Instaurer une taxe carbone progressive de 75 €/tCO₂ (2027) à 200 €/tCO₂ (2035), dont 100 % des recettes sont redistribuées à parts égales à chaque adulte résident.',
    summaryDe: 'Einführung einer progressiven CO₂-Steuer von 75 €/tCO₂ (2027) bis 200 €/tCO₂ (2035), deren Einnahmen zu 100 % gleichmäßig an alle erwachsenen Einwohner ausgeschüttet werden.',
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
    contentFr: `Cette proposition réintroduit la taxe carbone (abandonnée après les Gilets Jaunes en 2018) comme mécanisme entièrement neutre sur le plan fiscal :

**Calendrier de la taxe :**
| Année | €/tCO₂ |
|-------|--------|
| 2027 | 75 |
| 2029 | 120 |
| 2032 | 160 |
| 2035 | 200 |

**Recyclage des recettes :** 100 % redistribués sous forme de dividende mensuel égal (≈ 42 €/mois/adulte à 120 €/tCO₂), rendant la politique progressive : 70 % des ménages — les 7 déciles inférieurs — reçoivent plus en dividende qu'ils ne paient de taxe carbone (Goulder et al., NBER 2019).

Données probantes : le système national d'échange de quotas d'émission chinois a réduit les émissions couvertes de 12,1 % avec un rapport coût-bénéfice de 1:5 (Bai et al., NBER 2023). Le FMI (2022) constate que les taxes carbone surpassent les réglementations en termes d'efficacité-coût. Les quotas du SEQE-UE à 60–65 €/tCO₂ montrent une réponse industrielle même aux niveaux actuels.`,
    contentDe: `Dieser Vorschlag führt die CO₂-Steuer (nach den Gelbwesten 2018 aufgegeben) als vollständig aufkommensneutralen Mechanismus wieder ein:

**Steuerplan:**
| Jahr | €/tCO₂ |
|------|--------|
| 2027 | 75 |
| 2029 | 120 |
| 2032 | 160 |
| 2035 | 200 |

**Einnahmenrecycling:** 100 % als gleiche monatliche Dividende zurückgegeben (~42 €/Monat/Erwachsener bei 120 €/tCO₂), was die Politik progressiv macht: 70 % der Haushalte — die unteren 7 Dezile — erhalten mehr Dividende als sie an CO₂-Steuer zahlen (Goulder et al., NBER 2019).

Belege: Chinas nationales Emissionshandelssystem reduzierte die erfassten Emissionen um 12,1 % bei einem Kosten-Nutzen-Verhältnis von 1:5 (Bai et al., NBER 2023). Der IWF (2022) stellt fest, dass CO₂-Steuern Regulierungen hinsichtlich Kosteneffizienz übertreffen. EU-ETS-Zertifikate bei 60–65 €/tCO₂ zeigen industrielle Reaktionen selbst auf dem aktuellen Niveau.`,
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
    titleFr: 'Prix carbone fédéral et dividende — 65 $/tonne montant à 200 $',
    titleDe: 'Föderaler CO₂-Preis und Dividende — 65 $/Tonne steigend auf 200 $',
    summary: 'Enact a federal carbon price starting at $65/tCO₂ (2027), rising $15/year, with 100% of revenue returned as equal per-capita dividends.',
    summaryFr: 'Instaurer un prix carbone fédéral de 65 $/tCO₂ en 2027, augmentant de 15 $/an, avec 100 % des recettes redistribuées comme dividende égal par habitant.',
    summaryDe: 'Einführung eines föderalen CO₂-Preises von 65 $/tCO₂ (2027), jährlich um 15 $ steigend, mit 100 % der Einnahmen als gleiche Pro-Kopf-Dividende zurückgezahlt.',
    content: `The US has no federal carbon price. This proposal establishes one at the point of production/import:

**Schedule:** $65/tCO₂ in 2027, rising by $15/year → $200/tCO₂ by 2037.

**Dividend:** 100% of revenue (~$500B/year by 2030) distributed as equal quarterly checks to all US residents. Estimated dividend: ~$1,200/adult/year.

**Border adjustment:** carbon border adjustment on imports from non-pricing countries (CBAM mechanism, modelled on EU approach).

The Social Cost of Carbon (Rennert et al., Nature 2022) estimates at $185/tCO₂ — the proposed schedule reaches this level by 2034. Energy Innovation Act modelling: −45% US GHG by 2035 vs 2005. Bottom 60% of households come out net positive (dividend > carbon cost).`,
    contentFr: `Les États-Unis n'ont pas de prix carbone fédéral. Cette proposition en établit un au point de production/importation :

**Calendrier :** 65 $/tCO₂ en 2027, augmentant de 15 $/an → 200 $/tCO₂ d'ici 2037.

**Dividende :** 100 % des recettes (~500 Md$/an d'ici 2030) distribuées sous forme de chèques trimestriels égaux à tous les résidents américains. Dividende estimé : ~1 200 $/adulte/an.

**Ajustement aux frontières :** mécanisme d'ajustement carbone aux frontières sur les importations en provenance de pays sans prix carbone (mécanisme MACF, calqué sur l'approche européenne).

Le coût social du carbone (Rennert et al., Nature 2022) est estimé à 185 $/tCO₂ — le calendrier proposé atteint ce niveau d'ici 2034. Modélisation du Energy Innovation Act : −45 % des émissions de GES américaines d'ici 2035 par rapport à 2005. Les 60 % des ménages les plus modestes s'en sortent nettement positifs (dividende > coût carbone).`,
    contentDe: `Die USA haben keinen föderalen CO₂-Preis. Dieser Vorschlag legt einen am Produktions-/Importpunkt fest:

**Zeitplan:** 65 $/tCO₂ im Jahr 2027, jährlich um 15 $ steigend → 200 $/tCO₂ bis 2037.

**Dividende:** 100 % der Einnahmen (~500 Mrd. $/Jahr bis 2030) als gleichmäßige vierteljährliche Schecks an alle US-Einwohner. Geschätzte Dividende: ~1.200 $/Erwachsener/Jahr.

**Grenzausgleich:** CO₂-Grenzausgleichsmechanismus auf Importe aus Ländern ohne CO₂-Bepreisung (CBAM-Mechanismus, nach EU-Vorbild).

Die Sozialen Kosten des Kohlenstoffs (Rennert et al., Nature 2022) werden auf 185 $/tCO₂ geschätzt — der vorgeschlagene Zeitplan erreicht dieses Niveau bis 2034. Modellierung des Energy Innovation Act: −45 % der US-Treibhausgasemissionen bis 2035 gegenüber 2005. Die unteren 60 % der Haushalte kommen netto positiv heraus (Dividende > CO₂-Kosten).`,
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
    titleDe: 'Nationales Housing-First-Programm — 50.000 Wohnungen bis 2030',
    summary: 'Scale Housing First to 50,000 permanent supportive housing units by 2030, replacing conditional shelter access with unconditional stable housing for the chronically homeless.',
    summaryFr: 'Déployer le Housing First à hauteur de 50 000 logements pérennes d\'ici 2030, remplaçant l\'accès conditionnel aux hébergements d\'urgence par un logement stable et inconditionnel pour les sans-abri chroniques.',
    summaryDe: 'Ausbau von Housing First auf 50.000 dauerhafte Sozialwohnungen bis 2030, um den konditionalen Zugang zu Notunterkünften durch bedingungslose stabile Unterkünfte für chronisch Obdachlose zu ersetzen.',
    content: `France counts ~330,000 people without stable housing (INSEE 2024), including ~30,000 in rough sleeping. The current approach (shelters, SAMU social) follows a "treatment first" model with poor permanent housing outcomes.

**Housing First** provides unconditional access to permanent housing immediately, with voluntary support services (mental health, addiction, employment) delivered in situ.

Evidence:
- Tsemberis et al. (2004, original Housing First RCT): 88% housing stability at 5 years vs 47% treatment-first
- At Home/Chez Soi (Canada, 2009–2013): 73% stable housing, −29% emergency room use, −40% hospitalisations
- Finnish "Y-Foundation" national rollout (2008–2019): rough sleeping reduced by 75% nationally
- European research (Pleace et al.): €1 spent on Housing First saves €0.5–1.8 in emergency services

**Proposal:** 50,000 units funded via a new national housing fund (50% state, 50% EPCI), requiring municipalities >50,000 inhabitants to implement local Housing First programmes.`,
    contentFr: `La France compte environ 330 000 personnes sans logement stable (INSEE 2024), dont environ 30 000 à la rue. L'approche actuelle (hébergements d'urgence, SAMU social) suit un modèle « traitement d'abord » aux résultats médiocres en matière de relogement pérenne.

**Le Housing First** offre un accès inconditionnel et immédiat à un logement permanent, avec des services d'accompagnement volontaires (santé mentale, addictions, emploi) dispensés sur place.

Données probantes :
- Tsemberis et al. (2004, essai contrôlé randomisé fondateur du Housing First) : 88 % de stabilité résidentielle à 5 ans contre 47 % avec le modèle « traitement d'abord »
- At Home/Chez Soi (Canada, 2009–2013) : 73 % de logement stable, −29 % de recours aux urgences, −40 % d'hospitalisations
- Déploiement national de la Fondation Y en Finlande (2008–2019) : le sans-abrisme de rue réduit de 75 % à l'échelle nationale
- Recherches européennes (Pleace et al.) : 1 € dépensé en Housing First économise 0,5 à 1,8 € en services d'urgence

**Proposition :** 50 000 logements financés via un nouveau fonds national du logement (50 % État, 50 % EPCI), exigeant des communes de plus de 50 000 habitants la mise en œuvre de programmes locaux de Housing First.`,
    contentDe: `Frankreich zählt etwa 330.000 Menschen ohne stabiles Wohnen (INSEE 2024), darunter etwa 30.000 Obdachlose auf der Straße. Der derzeitige Ansatz (Notunterkünfte, SAMU social) folgt einem „Treatment First"-Modell mit schlechten dauerhaften Wohnungsergebnissen.

**Housing First** bietet sofortigen, bedingungslosen Zugang zu dauerhaftem Wohnraum mit freiwilligen Begleitdiensten (psychische Gesundheit, Sucht, Beschäftigung) vor Ort.

Belege:
- Tsemberis et al. (2004, ursprüngliche Housing-First-RCT): 88 % Wohnungsstabilität nach 5 Jahren vs. 47 % beim „Treatment First"-Ansatz
- At Home/Chez Soi (Kanada, 2009–2013): 73 % stabiles Wohnen, −29 % Notaufnahmebesuche, −40 % Krankenhausaufenthalte
- Nationales Rollout der finnischen Y-Stiftung (2008–2019): Obdachlosigkeit auf der Straße um 75 % national reduziert
- Europäische Forschung (Pleace et al.): 1 € für Housing First spart 0,5–1,8 € in Notfalldiensten

**Vorschlag:** 50.000 Wohneinheiten, finanziert über einen neuen nationalen Wohnungsfonds (50 % Staat, 50 % EPCI), mit Pflicht für Gemeinden über 50.000 Einwohner zur Umsetzung lokaler Housing-First-Programme.`,
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
    titleDe: 'Gleichgestellter Elternurlaub — 6 Monate pro Elternteil, nicht übertragbar',
    summary: 'Replace the current unequal parental leave system with 6 months of paid leave for each parent (80% salary), non-transferable, with a bonus month if both parents take full leave.',
    summaryFr: 'Remplacer le système actuel inégalitaire par 6 mois de congé payé pour chaque parent (80 % du salaire), non transférable, avec un mois bonus si les deux parents prennent la totalité de leur congé.',
    summaryDe: 'Ersatz des bestehenden ungleichen Elternurlaubssystems durch 6 Monate bezahlten Urlaub für jeden Elternteil (80 % Gehalt), nicht übertragbar, mit einem Bonusmonat wenn beide Elternteile den vollen Urlaub nehmen.',
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
    contentFr: `Le système français actuel de congé parental : 16 semaines pour les mères, 28 jours pour les pères (4 semaines depuis 2021). Seulement 1 % des pères prennent la totalité de l'allocation parentale (PAJE/PreParE).

**Proposition :**
- 6 mois de congé payé (80 % du salaire, plafonné à 3× le SMIC) pour chaque parent — individuellement, non transférable
- +1 mois bonus chacun si les deux parents prennent leurs 6 mois complets → 7 mois au total
- S'applique également aux familles monoparentales (total : 12 mois)
- Mise en œuvre progressive sur 3 ans pour permettre l'adaptation des employeurs

**Base scientifique :**
- Goldin (Prix Nobel 2023) : la « pénalité enfant » — le coût de carrière lié aux enfants — explique 80 % de l'écart de rémunération entre les sexes au Danemark. Elle pèse presque exclusivement sur les mères.
- Andresen & Nix (IZA 2022) : la réforme norvégienne du congé parental neutre sur le plan du genre a réduit la pénalité salariale maternelle de 18 % à 10 ans après la naissance.
- Johansson (2010) : les « mois papa » suédois ont fait passer le taux de prise par les pères de 6 % à 90 %.
- Des programmes équivalents en Islande, en Allemagne et au Portugal montrent un taux de prise par les pères > 70 % lorsque le congé est non transférable.`,
    contentDe: `Das aktuelle französische Elterntimesystem: 16 Wochen für Mütter, 28 Tage für Väter (4 Wochen seit 2021). Nur 1 % der Väter nehmen den vollen Elterngeldbezug (PAJE/PreParE) in Anspruch.

**Vorschlag:**
- 6 Monate bezahlter Urlaub (80 % Gehalt, gedeckelt bei 3× SMIC) pro Elternteil — individuell, nicht übertragbar
- +1 Bonusmonat pro Person, wenn beide Elternteile die vollen 6 Monate nehmen → 7 Monate insgesamt
- Gilt gleichermaßen für Alleinerziehende (gesamt: 12 Monate)
- Schrittweise Einführung über 3 Jahre zur Ermöglichung der Arbeitgeberanpassung

**Wissenschaftliche Grundlage:**
- Goldin (Nobelpreis 2023): die „Kinderstrafe" — die Karrierekosten durch Kinder — erklärt 80 % des Lohngefälles zwischen den Geschlechtern in Dänemark. Sie lastet fast ausschließlich auf Müttern.
- Andresen & Nix (IZA 2022): Norwegens geschlechtsneutralen Elterlurlaubsreform reduzierte die mütterliche Lohneinbuße nach 10 Jahren um 18 %.
- Johansson (2010): Schwedische „Papamonate" steigerten die väterliche Inanspruchnahme von 6 % auf 90 %.
- Vergleichbare Programme in Island, Deutschland und Portugal zeigen eine väterliche Inanspruchnahme von > 70 % bei nicht übertragbarem Urlaub.`,
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
    titleFr: 'Congé familial et médical fédéral payé — 12 semaines à 90 %',
    titleDe: 'Bundesweiter bezahlter Familien- und Krankenurlaub — 12 Wochen zu 90 %',
    summary: 'Establish a federal paid family and medical leave programme guaranteeing 12 weeks at 90% wage replacement for all workers.',
    summaryFr: 'Instaurer un programme fédéral de congé familial et médical payé garantissant 12 semaines à 90 % de remplacement salarial pour tous les travailleurs.',
    summaryDe: 'Einführung eines bundesweiten bezahlten Familien- und Krankenurlaubsprogramms mit 12 Wochen und 90 % Lohnersatz für alle Arbeitnehmer.',
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
    contentFr: `Les États-Unis sont le seul pays de l'OCDE sans congé familial ou médical payé au niveau fédéral. Environ 73 % des travailleurs américains n'ont pas accès à un congé familial payé via leur employeur.

**Proposition :**
- 12 semaines de congé payé pour : nouveau-né (naissance/adoption), maladie personnelle grave ou soins à un membre de la famille gravement malade
- Remplacement salarial à 90 % (plafonné au salaire médian = ~1 100 $/semaine)
- Financé par une cotisation salariale de 0,2 % (partagée entre employeur et employé)
- Administré par la Sécurité sociale (calqué sur les programmes des États de Californie, New York et Washington)

Données issues des programmes étatiques existants :
- Californie PFL (depuis 2004) : +10 points de pourcentage d'emploi maternel à 1 an post-partum (Rossin-Slater et al., NBER 2011)
- Goldin (Prix Nobel 2023) : le congé payé réduit la pénalité salariale liée aux enfants lorsque les pères prennent un congé à parts égales
- New Jersey, Californie, New York : aucun préjudice significatif pour les entreprises ; les petites entreprises rapportent une réduction des coûts de rotation du personnel`,
    contentDe: `Die USA sind das einzige OECD-Land ohne bezahlten Familien- oder Krankheitsurlaub auf Bundesebene. Etwa 73 % der US-Arbeitnehmer haben keinen Zugang zu bezahltem Familienurlaub über ihren Arbeitgeber.

**Vorschlag:**
- 12 Wochen bezahlter Urlaub für: Neugeborenes (Geburt/Adoption), schwere persönliche Krankheit oder Pflege eines schwer erkrankten Familienmitglieds
- 90 % Lohnersatz (gedeckelt beim Medianlohn = ~1.100 $/Woche)
- Finanziert durch eine 0,2 %-Lohnsteuer (zwischen Arbeitgeber und Arbeitnehmer aufgeteilt)
- Verwaltet von der Sozialversicherungsbehörde (nach dem Vorbild der Programme in Kalifornien, New York und Washington State)

Belege aus bestehenden Staatsprogrammen:
- Kalifornien PFL (seit 2004): +10 pp mütterliche Erwerbsbeteiligung 1 Jahr nach der Geburt (Rossin-Slater et al., NBER 2011)
- Goldin (Nobelpreis 2023): bezahlter Urlaub reduziert die Kinderstrafe bei gleicher Elternzeit
- New Jersey, Kalifornien, New York: kein signifikanter Geschäftsschaden; kleine Unternehmen berichten von reduzierten Fluktuationskosten`,
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
    titleDe: 'Universelle psychische Gesundheitsversorgung — Psychologen wie Hausärzte erstattet',
    summary: 'Reimburse psychology consultations at 100% (Assurance Maladie + mutuelle) with no co-pay, and deploy 1 psychologist per 5,000 inhabitants in under-served areas.',
    summaryFr: 'Rembourser les consultations de psychologie à 100 % (Assurance Maladie + mutuelle) sans reste à charge, et déployer 1 psychologue pour 5 000 habitants dans les zones sous-dotées.',
    summaryDe: 'Erstattung von Psychologenkonsultationen zu 100 % (ohne Eigenanteil) und Einsatz von 1 Psychologen pro 5.000 Einwohner in unterversorgten Gebieten.',
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
    contentFr: `En France, les séances de psychologie sont remboursées via le dispositif « MonPsy » à 30–60 €/séance — mais seulement 8 séances/an et sur prescription médicale. Les séances en cabinet libéral coûtent 60–120 €, rendant la prise en charge de la santé mentale effectivement inaccessible aux ménages à revenus modestes.

**Proposition :**
- Remboursement intégral (100 %) de toutes les consultations de psychologie chez les psychologues cliniciens agréés
- Suppression du plafond annuel de 8 séances
- Création de 5 000 postes de psychologues salariés dans les zones sous-dotées (déserts médicaux)
- Financement par une augmentation de 0,15 % du prélèvement social sur les revenus du capital

**Données probantes :**
- La Commission Lancet (Patel et al., 2018) : les troubles mentaux causent 32 % du handicap mondial ; seulement 30 à 40 % des personnes concernées bénéficient d'un traitement en France
- Trautmann et al. (2016) : les maladies mentales coûtent 798 Md€/an aux économies européennes (4 % du PIB de l'UE), principalement via la perte de productivité — et non les coûts de traitement
- Les thérapies cognitivo-comportementales et autres thérapies fondées sur les preuves sont très coût-efficaces : 800–2 000 $/DALY évité (estimations WHO-CHOICE)
- Le dispositif « MonPsy » actuel n'a inscrit que 40 000 patients lors de sa première année — bien en deçà des 3 millions estimés ayant besoin d'un accès`,
    contentDe: `In Frankreich werden Psychologenstunden über das „MonPsy"-Programm zu 30–60 €/Sitzung erstattet — aber nur 8 Sitzungen/Jahr und nur mit hausärztlicher Überweisung. Private Psychologensitzungen kosten 60–120 €, was psychische Gesundheitsversorgung für einkommensschwächere Haushalte faktisch unzugänglich macht.

**Vorschlag:**
- Vollständige Erstattung (100 %) aller Psychologenkonsultationen bei zugelassenen klinischen Psychologen
- Abschaffung der jährlichen 8-Sitzungen-Obergrenze
- Schaffung von 5.000 angestellten Psychologenstellen in unterversorgten Gebieten (medizinische Wüsten)
- Finanzierung durch einen Anstieg von 0,15 % beim prélèvement social auf Kapitalerträge

**Belege:**
- Die Lancet-Kommission (Patel et al., 2018): psychische Störungen verursachen 32 % der globalen Behinderung; nur 30–40 % erhalten in Frankreich eine Behandlung
- Trautmann et al. (2016): psychische Erkrankungen kosten europäische Volkswirtschaften 798 Mrd. €/Jahr (4 % EU-BIP), primär durch Produktivitätsverlust — nicht durch Behandlungskosten
- Kognitive Verhaltenstherapie und andere evidenzbasierte Therapien sind hochgradig kosteneffizient: 800–2.000 $/DALY vermieden (WHO-CHOICE-Schätzungen)
- Das aktuelle „MonPsy"-Programm erfasste im ersten Jahr nur 40.000 Patienten — weit unter den geschätzten 3 Millionen mit Zugangsbedarfen`,
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
    titleFr: 'Extension de Medicare — couverture universelle pour les moins de 65 ans',
    titleDe: 'Medicare-Erweiterung — universelle Krankenversicherung für unter 65-Jährige',
    summary: 'Extend Medicare to all uninsured and underinsured Americans under 65, creating a public option alongside private insurance.',
    summaryFr: 'Étendre Medicare à tous les Américains non assurés ou sous-assurés de moins de 65 ans, en créant une option publique aux côtés de l\'assurance privée.',
    summaryDe: 'Ausweitung von Medicare auf alle nicht- oder unterversicherten Amerikaner unter 65 Jahren durch eine öffentliche Option neben der privaten Krankenversicherung.',
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
    contentFr: `Environ 26 millions d'Américains restent non assurés malgré l'ACA (2024). On estime que 68 000 décès par an sont attribuables à l'absence d'assurance maladie (Woolhandler & Himmelstein, Lancet 2020).

**Proposition (modèle option publique) :**
- Créer « Medicare Partie E » — une option publique ouverte à tout individu ou employeur
- Primes fixées au coût (sans profit), avec des subventions pour les ménages < 400 % du seuil fédéral de pauvreté
- Inscription automatique pour les non-assurés sans prime (< 200 % du seuil fédéral de pauvreté)
- Négociation des prix des médicaments pour toutes les parties de Medicare (déjà partiellement adoptée — IRA 2022 — mais limitée à 10 médicaments ; étendre au formulaire complet)
- Sans participation aux frais pour les soins primaires, les services préventifs et la santé mentale

**Données probantes :**
- RAND (2021) : les prix des médicaments américains sont 2,78 fois la moyenne OCDE — la négociation seule économise 120 à 200 Md$/an
- Himmelstein et al. (Lancet 2020) : les frais administratifs dans le système de santé américain = 800 Md$/an — 34,2 % des dépenses totales contre 12,4 % au Canada
- Finkelstein et al. (NBER 2019) : la couverture Medicaid réduit la mortalité d'environ 6 % pour les adultes nouvellement couverts
- Papanicolas et al. (JAMA 2018) : les États-Unis dépensent 11 100 $/habitant contre 5 000–6 000 $ dans des pays comparables pour des résultats inférieurs sur 10/11 indicateurs`,
    contentDe: `~26 Millionen Amerikaner bleiben trotz ACA unversichert (2024). Geschätzte 68.000 Todesfälle jährlich sind auf fehlende Krankenversicherung zurückzuführen (Woolhandler & Himmelstein, Lancet 2020).

**Vorschlag (Public-Option-Modell):**
- Schaffung von „Medicare Teil E" — eine öffentliche Option, die für jede Einzelperson oder jeden Arbeitgeber offen steht
- Beiträge zum Selbstkostenpreis (kein Gewinn), mit Zuschüssen für Haushalte < 400 % der Bundesarmutsgrenze
- Automatische Einschreibung für Nicht-Versicherte ohne Prämie (< 200 % der Bundesarmutsgrenze)
- Medikamentenpreisverhandlungen für alle Medicare-Teile (bereits teilweise eingeführt — IRA 2022 — aber auf 10 Medikamente beschränkt; auf das vollständige Arzneimittelverzeichnis ausweiten)
- Keine Kostenbeteiligung für Primärversorgung, Vorsorgeuntersuchungen, psychische Gesundheit

**Belege:**
- RAND (2021): US-Medikamentenpreise sind 2,78× OECD-Durchschnitt — Verhandlungen allein sparen 120–200 Mrd. $/Jahr
- Himmelstein et al. (Lancet 2020): Verwaltungsaufwand im US-Gesundheitswesen = 800 Mrd. $/Jahr — 34,2 % der Gesamtausgaben vs. 12,4 % in Kanada
- Finkelstein et al. (NBER 2019): Medicaid-Deckung reduziert die Sterblichkeit neu versicherter Erwachsener um ~6 %
- Papanicolas et al. (JAMA 2018): USA geben 11.100 $/Kopf aus vs. 5.000–6.000 $ in vergleichbaren Ländern bei schlechteren Ergebnissen bei 10 von 11 Indikatoren`,
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
    titleDe: 'Flexicurity — das goldene Dreieck: Flexibilität + Sicherheit + Weiterbildung',
    summary: 'Adopt the Danish flexicurity model: easy dismissal rules for employers, 90% wage unemployment benefits for 2 years, and intensive active labour market policies (ALMP) funded at 2% of GDP.',
    summaryFr: 'Adopter le modèle danois de flexicurité : règles d\'embauche/licenciement souples, indemnités chômage à 90 % du salaire pendant 2 ans, et politiques actives du marché du travail financées à 2 % du PIB.',
    summaryDe: 'Einführung des dänischen Flexicurity-Modells: flexible Entlassungsregeln für Arbeitgeber, Arbeitslosengeld in Höhe von 90 % des letzten Gehalts für 2 Jahre und intensive aktive Arbeitsmarktpolitik (ALMP) mit 2 % des BIP.',
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
    contentFr: `Le « triangle d'or » danois relie trois piliers qui se renforcent mutuellement — aucun ne fonctionne sans les deux autres :

**1. Flexibilité du marché du travail :**
- Période d'essai de 9 mois (contre 2 mois en France)
- Rotation annuelle des emplois ~30 % (contre 10–15 % en France/aux États-Unis)
- Licenciement sans motif possible pour les employeurs de moins de 10 salariés

**2. Sécurité des revenus :**
- Allocation chômage : 90 % du dernier salaire (plafonnée à ~2 500 €/mois)
- Durée : jusqu'à 2 ans
- Accès : toute personne ayant travaillé ≥ 52 semaines au cours des 3 dernières années

**3. Politiques actives du marché du travail (PAMT) :**
- Dépenses PAMT : 2,0 % du PIB (contre 0,3 % en France, 0,1 % aux États-Unis)
- Plan de formation obligatoire dès le 3e mois de chômage
- 9 semaines de formation financée par an garanties à tous les chômeurs
- 1 conseiller emploi pour 25 chômeurs (contre 1 pour 200 en France)

Résultats : chômage à 4,5 % (2024), 1ère satisfaction au travail en Europe, corrélation de revenus intergénérationnelle de 0,15 (contre 0,45 aux États-Unis — Chetty et al., Science 2014).

Nuance de Landersø & Heckman (NBER) : une grande partie de l'avantage danois en matière de mobilité provient de la compression salariale (salaires minimums élevés) plutôt que d'une véritable mobilité — le modèle élève le plancher, il ne redistribue pas seulement.`,
    contentDe: `Das dänische „goldene Dreieck" verbindet drei sich gegenseitig verstärkende Säulen — keine funktioniert ohne die beiden anderen:

**1. Arbeitsmarktflexibilität:**
- 9-monatige Probezeit (vs. 2 Monate in Frankreich)
- Jährliche Jobfluktuation ~30 % (vs. 10–15 % in Frankreich/USA)
- Kündigung ohne Grund für Arbeitgeber mit < 10 Mitarbeitern möglich

**2. Einkommenssicherheit:**
- Arbeitslosengeld: 90 % des letzten Gehalts (gedeckelt bei ~2.500 €/Monat)
- Dauer: bis zu 2 Jahre
- Zugang: jeder, der ≥ 52 Wochen in den letzten 3 Jahren gearbeitet hat

**3. Aktive Arbeitsmarktpolitik (ALMP):**
- ALMP-Ausgaben: 2,0 % des BIP (vs. 0,3 % in Frankreich, 0,1 % in den USA)
- Verpflichtender Trainingsplan ab dem 3. Monat der Arbeitslosigkeit
- 9 Wochen finanzierter Weiterbildung pro Jahr für alle Arbeitslosen garantiert
- 1 Beschäftigungsberater pro 25 Arbeitslose (vs. 1 pro 200 in Frankreich)

Ergebnisse: Arbeitslosigkeit 4,5 % (2024), Platz 1 bei der Arbeitszufriedenheit in Europa, intergenerationelle Einkommenskorrelation 0,15 (vs. 0,45 in den USA — Chetty et al., Science 2014).

Nuance von Landersø & Heckman (NBER): Ein Großteil des dänischen Mobilitätsvorteils kommt aus der Lohnkompression (hohe Mindestlöhne) und nicht aus echter Mobilität — das Modell hebt den Boden an, es redistributiert nicht nur.`,
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
    titleDe: 'Universelles Studierenden-Stipendium SU — 900 €/Monat für alle, ohne Einkommensprüfung',
    summary: 'Provide every student in public higher education with a €900/month non-repayable grant, unconditional on parental income, funded by a 0.8% employer contribution on graduate salaries.',
    summaryFr: 'Accorder à chaque étudiant dans l\'enseignement supérieur public une bourse de 900 €/mois non remboursable, sans condition de revenus parentaux, financée par une contribution employeur de 0,8 % sur les salaires des diplômés.',
    summaryDe: 'Gewährung einer monatlichen Nicht-Rückzahlbaren Studienbeihilfe von 900 € für alle Studierenden an öffentlichen Hochschulen, unabhängig vom Elterneinkommen, finanziert durch einen Arbeitgeberbeitrag von 0,8 % auf Absolventengehälter.',
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
    contentFr: `Le **Statens Uddannelsesstøtte (SU)** danois est le système de bourses étudiantes le plus généreux au monde. Il verse environ 900 €/mois à tous les étudiants, indépendamment du revenu familial.

**Caractéristiques principales :**
- Montant : ~900 €/mois (non remboursable)
- Conditions : aucune sur le revenu parental — basée uniquement sur les revenus propres de l'étudiant
- Durée : programme d'études complet + 6 mois
- Couverture : accessible à tous les étudiants ; ceux qui gagnent au-dessus d'un seuil reçoivent un montant réduit

**Pourquoi inconditionnelle ?** Le SU traite l'étudiant comme un adulte indépendant, non comme une charge familiale. Cela élimine :
- Le non-recours (aucun formulaire de ressources à remplir)
- La stigmatisation sociale (tout le monde reçoit la même chose)
- La pression familiale sur le choix des études (les étudiants peuvent choisir n'importe quelle filière indépendamment des perspectives de revenus)

**Résultats au Danemark :**
- Taux d'achèvement des études supérieures : 50 % (contre 45 % en France, 40 % en moyenne OCDE)
- Écart de revenus à l'obtention du diplôme : le plus faible d'Europe (OCDE 2025)
- Étudiants travaillant > 15h/semaine : 12 % (contre 27 % en France — réduit les résultats académiques)

**Coût :** ~25 Md€/an brut pour 3 millions d'étudiants × 900 €/mois × 9 mois, compensé par la suppression des bourses sous conditions existantes et de l'APL + contribution employeur de 10 Md€.`,
    contentDe: `Das dänische **Statens Uddannelsesstøtte (SU)** ist das weltweit großzügigste Studierenden-Stipendiensystem. Es zahlt ~900 €/Monat an alle Studierenden unabhängig vom Familieneinkommen.

**Hauptmerkmale:**
- Betrag: ~900 €/Monat (nicht rückzahlbar)
- Bedingungen: keine am Elterneinkommen — ausschließlich auf dem eigenen Einkommen der Studierenden basierend
- Dauer: vollständiges Studienprogramm + 6 Monate
- Abdeckung: für alle Studierenden verfügbar; wer über einem Schwellenwert verdient, erhält einen reduzierten Betrag

**Warum bedingungslos?** Das SU behandelt Studierende als unabhängige Erwachsene, nicht als Familienabhängige. Dies beseitigt:
- Nicht-Inanspruchnahme (keine Bedürftigkeitsprüfungsformulare auszufüllen)
- Soziales Stigma (alle erhalten dasselbe)
- Familiendruck bei der Studienfachwahl (Studierende können jedes Fach wählen, unabhängig von Einkommensaussichten)

**Ergebnisse in Dänemark:**
- Hochschulabschlussquote: 50 % (vs. 45 % Frankreich, 40 % OECD-Durchschnitt)
- Einkommenslücke beim Abschluss: kleinste in Europa (OECD 2025)
- Studierende, die > 15h/Woche arbeiten: 12 % (vs. 27 % in Frankreich — beeinträchtigt Studienleistungen)

**Kosten:** ~25 Mrd. €/Jahr brutto für 3 Millionen Studierende × 900 €/Monat × 9 Monate, kompensiert durch Abschaffung bestehender bedarfsgeprüfter Zuschüsse und APL + 10 Mrd. € Arbeitgeberbeitrag.`,
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
    titleDe: '37-Stunden-Arbeitswoche — gesetzliche Norm mit voller Lohnfortzahlung',
    summary: 'Enshrine a 37-hour working week as the legal standard, with full wage maintenance, building on the Danish model that has combined high productivity and workplace wellbeing since 1990.',
    summaryFr: 'Consacrer la semaine de 37 heures comme norme légale, avec maintien intégral du salaire, en s\'appuyant sur le modèle danois qui allie haute productivité et bien-être au travail depuis 1990.',
    summaryDe: 'Verankerung der 37-Stunden-Arbeitswoche als gesetzlichen Standard mit vollem Lohnerhalt, aufbauend auf dem dänischen Modell, das seit 1990 hohe Produktivität mit Wohlbefinden am Arbeitsplatz verbindet.',
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
    contentFr: `Depuis 1990, la semaine de travail standard au Danemark est de **37 heures** — fixée par accord collectif national et consacrée par la loi en 1991. Ce n'est pas un pilote — c'est la réalité de la vie au travail danoise depuis 35 ans.

**Comparaison des résultats :**

| Indicateur | Danemark (37h) | France (35h légal, ~39h réel) | Moy. OCDE |
|------------|---------------|------------------------------|-----------|
| Heures travaillées/an | 1 570 | 1 610 | 1 716 |
| Productivité/heure | 74 $ | 67 $ | 58 $ |
| Satisfaction au travail | 82 % | 63 % | 68 % |
| Absentéisme | 5,6 jours/an | 11,4 jours/an | 9,2 jours/an |

Le Danemark travaille **moins** et produit **plus par heure**. Le mécanisme : les semaines plus courtes réduisent la fatigue, améliorent la concentration, réduisent le présentéisme (travailler sans produire) et diminuent fortement l'absentéisme.

**Données issues d'expériences de semaines plus courtes :**
- Essai national islandais (2015–2019, 2 500 travailleurs) : turnover −57 %, productivité stable ou en hausse dans 85 % des organisations
- Semaine de 4 jours de Microsoft Japon : productivité +40 %, consommation électrique −23 %
- Lepinteur (IZA 2020) : introduction des 35 heures en France et en Allemagne — bien-être significativement accru pour les travailleurs, aucune perte de productivité mesurable

**La différence danoise par rapport aux 35h françaises :**
La semaine de 37h danoise fonctionne parce qu'elle a été négociée (et non imposée), accompagnée d'une réforme du management (objectifs, pas pointage) et mise en œuvre progressivement sur 5 ans.`,
    contentDe: `Seit 1990 beträgt die dänische Standardarbeitswoche **37 Stunden** — durch nationalen Tarifvertrag festgelegt und 1991 gesetzlich verankert. Es ist kein Pilotprojekt — es ist die Realität des dänischen Arbeitslebens seit 35 Jahren.

**Ergebnisvergleich:**

| Indikator | Dänemark (37h) | Frankreich (35h legal, ~39h real) | OECD-Durchschnitt |
|-----------|---------------|-----------------------------------|-------------------|
| Jahresarbeitsstunden | 1.570 | 1.610 | 1.716 |
| Produktivität/Stunde | 74 $ | 67 $ | 58 $ |
| Arbeitszufriedenheit | 82 % | 63 % | 68 % |
| Fehlzeiten | 5,6 Tage/Jahr | 11,4 Tage/Jahr | 9,2 Tage/Jahr |

Dänemark arbeitet **weniger** und produziert **mehr pro Stunde**. Der Mechanismus: Kürzere Wochen reduzieren Erschöpfung, verbessern die Konzentration, verringern Präsentismus (Arbeiten ohne zu produzieren) und senken Fehlzeiten drastisch.

**Belege aus Kurzarbeitswochenexperimenten:**
- Nationaler Versuch Island (2015–2019, 2.500 Arbeitnehmer): Fluktuation −57 %, Produktivität in 85 % der Organisationen stabil oder gestiegen
- Microsoft Japan 4-Tage-Woche: Produktivität +40 %, Stromverbrauch −23 %
- Lepinteur (IZA 2020): Einführung der 35-Stunden-Woche in Frankreich und Deutschland — Wohlbefinden der Arbeitnehmer deutlich gesteigert, kein messbarer Produktivitätsverlust

**Der dänische Unterschied zu den französischen 35h:**
Die dänischen 37h funktionieren, weil sie ausgehandelt (nicht auferlegt) wurden, von einer Managementreform (Ziele, nicht Stempeluhr) begleitet und über 5 Jahre schrittweise eingeführt wurden.`,
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
    titleDe: 'Kurzarbeit universell — automatische Kurzarbeit in Konjunkturabschwüngen',
    summary: 'Make short-time work (Kurzarbeit) automatically available to all firms facing ≥20% activity loss, with 80% wage coverage by the State for up to 24 months.',
    summaryFr: 'Rendre le chômage partiel (Kurzarbeit) automatiquement accessible à toutes les entreprises confrontées à une perte d\'activité ≥ 20 %, avec 80 % de couverture salariale par l\'État pendant 24 mois maximum.',
    summaryDe: 'Automatische Verfügbarkeit von Kurzarbeit für alle Betriebe mit einem Aktivitätsverlust von mindestens 20 %, mit staatlicher Lohndeckung von 80 % für bis zu 24 Monate.',
    content: `Germany's Kurzarbeit (short-time work) is the most effective anti-unemployment mechanism ever documented at scale. Instead of laying off workers, firms reduce hours; the State covers 60–67% of lost wages.

**COVID-19 proof:** In April 2020, 6 million German workers were in Kurzarbeit (18% of the workforce). Unemployment rose only 0.7 points — vs +14 points in the US. Estimated 2.2 million jobs saved.

**Mechanics:**
- Trigger: employer request + union agreement or 70% of affected workers
- Coverage: 60–67% of lost wages (67% with children), full social contributions
- Duration: up to 24 months, extendable

**Evidence:** Cahuc & Carcillo (IZA 2011): Kurzarbeit reduced unemployment by 0.5–1pp per GDP point lost in countries using it. Hijzen & Martin (OECD 2013): countries with generous short-time work had shorter recessions. ROI: €1 spent saves €1.2–1.8 in future unemployment costs.`,
    contentFr: `La Kurzarbeit allemande (chômage partiel) est le mécanisme de lutte contre le chômage le plus efficace jamais documenté à grande échelle. Au lieu de licencier des travailleurs, les entreprises réduisent les heures ; l'État couvre 60 à 67 % des salaires perdus.

**Preuve par la COVID-19 :** En avril 2020, 6 millions de travailleurs allemands étaient en Kurzarbeit (18 % de la main-d'œuvre). Le chômage n'a augmenté que de 0,7 point — contre +14 points aux États-Unis. Environ 2,2 millions d'emplois sauvés.

**Mécanisme :**
- Déclenchement : demande de l'employeur + accord syndical ou 70 % des travailleurs concernés
- Couverture : 60 à 67 % des salaires perdus (67 % avec enfants), cotisations sociales intégrales
- Durée : jusqu'à 24 mois, prolongeable

**Données probantes :** Cahuc & Carcillo (IZA 2011) : la Kurzarbeit a réduit le chômage de 0,5 à 1 point par point de PIB perdu dans les pays qui l'appliquent. Hijzen & Martin (OCDE 2013) : les pays dotés d'un chômage partiel généreux ont connu des récessions plus courtes. ROI : 1 € dépensé économise 1,2 à 1,8 € en futurs coûts d'assurance chômage.`,
    contentDe: `Deutschlands Kurzarbeit ist der wirksamste Anti-Arbeitslosigkeitsmechanismus, der je in großem Maßstab dokumentiert wurde. Anstatt Arbeitnehmer zu entlassen, reduzieren Betriebe die Stunden; der Staat deckt 60–67 % der entgangenen Löhne.

**COVID-19-Beweis:** Im April 2020 waren 6 Millionen deutsche Arbeitnehmer in Kurzarbeit (18 % der Belegschaft). Die Arbeitslosigkeit stieg nur um 0,7 Punkte — vs. +14 Punkte in den USA. Geschätzte 2,2 Millionen Arbeitsplätze gerettet.

**Mechanismus:**
- Auslöser: Arbeitgeberantrag + Betriebsvereinbarung oder 70 % der betroffenen Arbeitnehmer
- Abdeckung: 60–67 % der entgangenen Löhne (67 % mit Kindern), vollständige Sozialversicherungsbeiträge
- Dauer: bis zu 24 Monate, verlängerbar

**Belege:** Cahuc & Carcillo (IZA 2011): Kurzarbeit reduzierte die Arbeitslosigkeit in Anwenderländern um 0,5–1 pp pro verlorenem BIP-Punkt. Hijzen & Martin (OECD 2013): Länder mit großzügiger Kurzarbeit hatten kürzere Rezessionen. ROI: 1 € ausgegeben spart 1,2–1,8 € an künftigen Arbeitslosigkeitskosten.`,
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
    titleDe: 'Elterngeld Plus — 28 Monate Elternzeit mit 4 nicht übertragbaren Monaten pro Elternteil',
    summary: 'Extend Elterngeld Plus to 28 shared months with 4 non-transferable bonus months per parent, at 70% wage replacement — to close Germany\'s persistent gender pay gap.',
    summaryFr: 'Étendre l\'Elterngeld Plus à 28 mois partagés avec 4 mois non transférables par parent, à 70 % de remplacement salarial — pour combler l\'écart de rémunération persistant entre hommes et femmes en Allemagne.',
    summaryDe: 'Ausbau des Elterngeld Plus auf 28 gemeinsame Monate mit 4 nicht übertragbaren Monaten pro Elternteil bei 70 % Lohnersatz — zur Schließung des anhaltenden Lohngefälles zwischen Frauen und Männern in Deutschland.',
    content: `Germany's parental leave system (Elterngeld) provides 14 months per parent at 65% wage replacement — but fathers take only 3.7 months on average. The gender pay gap remains 18%.

**Proposed reform:**
- Total: 28 shared months (up from 24)
- 4 months per parent: non-transferable (use it or lose it)
- Rate: 70% of salary (up from 65%) for earnings <€2,000/month
- Simultaneous bonus: +2 months each if both parents take leave at the same time

**Science:** Goldin (Nobel 2023): the "child penalty" accounts for 80% of the German gender pay gap. Each month of leave taken by the father reduces the mother's long-term earnings penalty by 2–3% (Andresen & Nix, IZA 2022). Swedish daddy months (1995) raised father take-up from 6% to 90%.`,
    contentFr: `Le système allemand de congé parental (Elterngeld) offre 14 mois par parent à 65 % de remplacement salarial — mais les pères ne prennent en moyenne que 3,7 mois. L'écart de rémunération entre hommes et femmes reste à 18 %.

**Réforme proposée :**
- Total : 28 mois partagés (contre 24 actuellement)
- 4 mois par parent : non transférables (à prendre ou à perdre)
- Taux : 70 % du salaire (contre 65 %) pour les revenus < 2 000 €/mois
- Bonus simultané : +2 mois chacun si les deux parents prennent leur congé en même temps

**Science :** Goldin (Prix Nobel 2023) : la « pénalité enfant » explique 80 % de l'écart de rémunération entre hommes et femmes en Allemagne. Chaque mois de congé pris par le père réduit la pénalité salariale maternelle à long terme de 2 à 3 % (Andresen & Nix, IZA 2022). Les mois papa suédois (1995) ont fait passer le taux de prise par les pères de 6 % à 90 %.`,
    contentDe: `Deutschlands Elterngeldsystem bietet 14 Monate pro Elternteil bei 65 % Lohnersatz — doch Väter nehmen im Durchschnitt nur 3,7 Monate. Das Lohngefälle zwischen Frauen und Männern verbleibt bei 18 %.

**Geplante Reform:**
- Gesamt: 28 gemeinsame Monate (erhöht von 24)
- 4 Monate pro Elternteil: nicht übertragbar (nutzen oder verlieren)
- Satz: 70 % des Gehalts (erhöht von 65 %) für Verdienste < 2.000 €/Monat
- Gleichzeitigkeitsbonus: +2 Monate pro Person, wenn beide Elternteile gleichzeitig in Elternzeit gehen

**Wissenschaft:** Goldin (Nobelpreis 2023): die „Kinderstrafe" erklärt 80 % des deutschen Lohngefälles. Jeder vom Vater genommene Elterngeldmonat reduziert die langfristige Lohneinbuße der Mutter um 2–3 % (Andresen & Nix, IZA 2022). Schwedische Papamonate (1995) steigerten die väterliche Inanspruchnahme von 6 % auf 90 %.`,
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
    titleDe: 'Energiewende 2.0 — 100 % Erneuerbare bis 2040, Kohleausstieg 2030',
    summary: 'Accelerate Germany\'s energy transition: raise the renewable target to 100% by 2040 (vs 80% by 2030), bring forward the coal exit to 2030, and invest €100bn in grids and storage.',
    summaryFr: 'Accélérer la transition énergétique allemande : porter l\'objectif d\'énergies renouvelables à 100 % d\'ici 2040 (contre 80 % d\'ici 2030), avancer la sortie du charbon à 2030 et investir 100 Md€ dans les réseaux et le stockage.',
    summaryDe: 'Beschleunigung der deutschen Energiewende: Anhebung des Erneuerbaren-Ziels auf 100 % bis 2040 (statt 80 % bis 2030), vorgezogener Kohleausstieg 2030 und 100 Mrd. € Investitionen in Netze und Speicher.',
    content: `Germany pioneered the Energiewende (energy transition) in 2000. By 2024, ~62% of electricity is renewable. But the nuclear phase-out (2023) created a temporary gap covered by coal.

**Proposal:**
- 100% renewable electricity by 2040 (current target: 100% by 2045)
- Coal exit: 2030 (current: 2038)
- €100bn investment over 10 years: grids (€40bn), storage/hydrogen (€30bn), offshore wind (€30bn)
- Electricity market reform: decouple renewable prices from gas benchmark

Way et al. (Nature 2025): solar costs continue falling 15–20%/year through 2030. UNEP 2025: current NDCs put the world at +2.6–2.8°C. Germany at 62% renewable — 100% is achievable with targeted investment.`,
    contentFr: `L'Allemagne a été pionnière de l'Energiewende (transition énergétique) en 2000. En 2024, environ 62 % de l'électricité est renouvelable. Mais la sortie du nucléaire (2023) a créé un déficit temporaire comblé par le charbon.

**Proposition :**
- 100 % d'électricité renouvelable d'ici 2040 (objectif actuel : 100 % d'ici 2045)
- Sortie du charbon : 2030 (actuellement : 2038)
- 100 Md€ d'investissement sur 10 ans : réseaux (40 Md€), stockage/hydrogène (30 Md€), éolien offshore (30 Md€)
- Réforme du marché de l'électricité : découpler les prix des renouvelables du prix de référence du gaz

Way et al. (Nature 2025) : les coûts du solaire continuent de baisser de 15 à 20 %/an jusqu'en 2030. PNUE 2025 : les NDC actuelles placent le monde à +2,6–2,8 °C. L'Allemagne à 62 % de renouvelables — 100 % est réalisable avec des investissements ciblés.`,
    contentDe: `Deutschland war 2000 Vorreiter der Energiewende. Bis 2024 sind ~62 % des Stroms erneuerbar. Doch der Atomausstieg (2023) schuf eine vorübergehende Lücke, die durch Kohle gedeckt wird.

**Vorschlag:**
- 100 % erneuerbarer Strom bis 2040 (aktuelles Ziel: 100 % bis 2045)
- Kohleausstieg: 2030 (derzeit: 2038)
- 100 Mrd. € Investitionen über 10 Jahre: Netze (40 Mrd. €), Speicher/Wasserstoff (30 Mrd. €), Offshore-Wind (30 Mrd. €)
- Strommarktreform: Entkopplung erneuerbarer Preise vom Gasbenchmark

Way et al. (Nature 2025): Solarkosten sinken bis 2030 weiterhin um 15–20 %/Jahr. UNEP 2025: Aktuelle NDCs setzen die Welt auf einen +2,6–2,8 °C-Pfad. Deutschland bei 62 % erneuerbar — 100 % ist mit gezielten Investitionen erreichbar.`,
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
    titleDe: 'Duale Ausbildung — das Berufsausbildungssystem verallgemeinern',
    summary: 'Adopt and scale Germany\'s dual vocational training system: 3 days per week in a company + 2 days in vocational school, with nationally certified qualifications for all 16–25 year-olds.',
    summaryFr: 'Adopter et déployer le système de formation professionnelle dual allemand : 3 jours par semaine en entreprise + 2 jours en école professionnelle, avec des qualifications certifiées nationalement pour les 16–25 ans.',
    summaryDe: 'Einführung und Ausweitung des deutschen dualen Berufsausbildungssystems: 3 Tage pro Woche im Betrieb + 2 Tage in der Berufsschule, mit national anerkannten Abschlüssen für alle 16–25-Jährigen.',
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
    contentFr: `Le système dual allemand forme 1,3 million d'apprentis par an dans 325 métiers certifiés — du coiffeur au spécialiste en cybersécurité.

**Structure :**
- 3 jours/semaine en entreprise (formation pratique, rémunérée : 700–1 200 €/mois)
- 2 jours/semaine en Berufsschule (formation théorique, gratuite)
- Durée : 2 à 3,5 ans
- Certification reconnue au niveau national

**Résultats :**
- Chômage des jeunes (15–24 ans) : 5,8 % en Allemagne contre 19,7 % en France et 19,1 % aux États-Unis (2024)
- 65 % des apprentis sont embauchés par l'entreprise qui les a formés
- Salaire à 5 ans : équivalent à 85 % des diplômés de licence pour les filières techniques

**Pourquoi ça marche :** Les employeurs conçoivent les référentiels de compétences avec l'État. Les apprentis sont rémunérés — pas d'endettement. Aucune hiérarchie académique/professionnelle : c'est un choix positif, pas un repli.`,
    contentDe: `Deutschlands duales System bildet 1,3 Millionen Auszubildende pro Jahr in 325 zertifizierten Berufen aus — vom Friseur bis zum Cybersicherheitsspezialisten.

**Struktur:**
- 3 Tage/Woche im Betrieb (praktische Ausbildung, bezahlt: 700–1.200 €/Monat)
- 2 Tage/Woche in der Berufsschule (theoretisch, kostenlos)
- Dauer: 2–3,5 Jahre
- National anerkanntes Zertifikat

**Ergebnisse:**
- Jugendarbeitslosigkeit (15–24 Jahre): 5,8 % in Deutschland vs. 19,7 % in Frankreich vs. 19,1 % in den USA (2024)
- 65 % der Auszubildenden werden von ihrer Ausbildungsfirma übernommen
- Gehalt nach 5 Jahren: entspricht 85 % der Bachelorabsolventen in technischen Berufen

**Warum es funktioniert:** Arbeitgeber gestalten die Kompetenzrahmen gemeinsam mit dem Staat. Auszubildende werden bezahlt — keine Schulden. Keine akademisch/berufliche Hierarchie: Es ist eine positive Wahl, kein Rückfall.`,
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
    titleDe: 'Papa-Monate — 3 nicht übertragbare Elternurlaubsmonate pro Elternteil',
    summary: 'Sweden\'s earmarked parental leave months raised father take-up from 6% to 90% between 1995 and 2024 — reducing the gender pay gap by 6pp over 25 years. This model should be universally adopted.',
    summaryFr: 'Les mois de congé parental réservés en Suède ont fait passer le taux de prise par les pères de 6 % à 90 % entre 1995 et 2024, réduisant l\'écart de rémunération entre les sexes de 6 points sur 25 ans. Ce modèle devrait être adopté universellement.',
    summaryDe: 'Schwedische reservierte Elternurlaubsmonate steigerten die Inanspruchnahme durch Väter von 6 % auf 90 % zwischen 1995 und 2024, was den Lohnunterschied zwischen Frauen und Männern über 25 Jahre um 6 Prozentpunkte verringerte. Dieses Modell sollte universell übernommen werden.',
    content: `Sweden introduced "daddy months" (non-transferable parental leave for fathers) in 1995 — the first country in the world. The results after 30 years are unambiguous.

**Evolution:**
- 1995: 1 daddy month → father take-up: 38%
- 2002: 2 months → father take-up: 60%
- 2016: 3 months → father take-up: **90% (2024)**

**Mechanism (Johansson, Economic Journal 2010):** each month of leave taken by the father increases the mother's long-term earnings by 6.7%. By taking leave, the father signals to employers that both parents are caregivers — reducing statistical discrimination against mothers.

**Goldin (Nobel 2023):** "greedy jobs" pay a premium for 24/7 availability. Paternity leave breaks this mechanism by distributing the "availability penalty" between both parents.

**Requirements for success:** non-transferability (use it or lose it), high replacement rate (≥80%), legal protection against workplace retaliation.`,
    contentFr: `La Suède a introduit les « mois papa » (congé parental non transférable pour les pères) en 1995 — première au monde. Les résultats après 30 ans sont sans équivoque.

**Évolution :**
- 1995 : 1 mois papa → taux de prise par les pères : 38 %
- 2002 : 2 mois → taux de prise : 60 %
- 2016 : 3 mois → taux de prise : **90 % (2024)**

**Mécanisme (Johansson, Economic Journal 2010) :** chaque mois de congé pris par le père augmente les revenus à long terme de la mère de 6,7 %. En prenant un congé, le père signale aux employeurs que les deux parents sont des aidants — ce qui réduit la discrimination statistique envers les mères.

**Goldin (Prix Nobel 2023) :** les « emplois gourmands » paient une prime pour une disponibilité 24h/24. Le congé paternité brise ce mécanisme en distribuant la « pénalité de disponibilité » entre les deux parents.

**Conditions de réussite :** non-transférabilité (à prendre ou à perdre), taux de remplacement élevé (≥ 80 %), protection légale contre les représailles professionnelles.`,
    contentDe: `Schweden führte 1995 „Papamonate" (nicht übertragbarer Elternurlaub für Väter) ein — als erstes Land der Welt. Die Ergebnisse nach 30 Jahren sind eindeutig.

**Entwicklung:**
- 1995: 1 Papamonat → väterliche Inanspruchnahme: 38 %
- 2002: 2 Monate → Inanspruchnahme: 60 %
- 2016: 3 Monate → Inanspruchnahme: **90 % (2024)**

**Mechanismus (Johansson, Economic Journal 2010):** Jeder vom Vater genommene Urlaubsmonat erhöht das langfristige Einkommen der Mutter um 6,7 %. Indem der Vater Urlaub nimmt, signalisiert er Arbeitgebern, dass beide Elternteile Betreuer sind — was statistische Diskriminierung gegen Mütter reduziert.

**Goldin (Nobelpreis 2023):** „Gierige Jobs" zahlen eine Prämie für 24/7-Verfügbarkeit. Vaterschaftsurlaub bricht diesen Mechanismus, indem er die „Verfügbarkeitsstrafe" auf beide Elternteile verteilt.

**Erfolgsvoraussetzungen:** Nicht-Übertragbarkeit (nutzen oder verlieren), hoher Ersatzsatz (≥ 80 %), rechtlicher Schutz vor Vergeltungsmaßnahmen am Arbeitsplatz.`,
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
    titleDe: 'Schulwahlreform — Regulierung von Bildungsgutscheinen zur Vermeidung von Segregation',
    summary: 'Sweden introduced universal school vouchers in 1992 — first country in the world. 30 years of data show modest performance gains but significant segregation increase. This proposal adds equity safeguards while preserving choice.',
    summaryFr: 'La Suède a introduit des chèques scolaires universels en 1992 — première au monde. 30 ans de données montrent des gains de performance modestes mais une augmentation significative de la ségrégation. Cette proposition ajoute des protections équitables tout en préservant le choix.',
    summaryDe: 'Schweden führte 1992 universelle Bildungsgutscheine ein — als erstes Land weltweit. 30 Jahre Daten zeigen bescheidene Leistungsgewinne, aber eine erhebliche Zunahme der Segregation. Dieser Vorschlag fügt Gerechtigkeitssicherungen hinzu und erhält gleichzeitig die Wahlfreiheit.',
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
    contentFr: `Le chèque scolaire universel suédois (skolpeng, 1992) permet à chaque élève d'orienter les financements publics vers n'importe quelle école — publique ou à but lucratif. Résultats après 30 ans :

**Gains :**
- Effet de concurrence : +0,1 écart-type de performances (Böhlmark & Lindahl, NBER 2016)
- Diversité pédagogique : écoles Montessori, Waldorf et spécialisées ont prospéré

**Problèmes :**
- Ségrégation socioéconomique : +15 % entre établissements (1992–2016)
- 20 écoles privées fermées abandonnant 10 000 élèves (2010–2020)
- PISA : la Suède est passée de la 4e (1995) à la 15e place (2015), en partie attribué à la ségrégation

**Garanties proposées :**
1. Quota social de 30 % : chaque école à chèque doit scolariser ≥ 30 % d'élèves défavorisés
2. Interdiction de distribution des bénéfices : les excédents doivent être réinvestis dans l'école
3. Préavis de fermeture de 3 ans avec plan de transfert d'élèves garanti
4. Transparence totale : publication mensuelle des résultats, de la fréquentation et de la composition sociale`,
    contentDe: `Schwedens universeller Schulbildungsgutschein (skolpeng, 1992) ermöglicht es jedem Schüler, öffentliche Mittel an jede Schule — öffentlich oder gewinnorientiert — zu lenken. Ergebnisse nach 30 Jahren:

**Gewinne:**
- Wettbewerbseffekt: +0,1 Standardabweichung Leistung (Böhlmark & Lindahl, NBER 2016)
- Pädagogische Vielfalt: Montessori-, Waldorf- und Spezialschulen florierten

**Probleme:**
- Sozioökonomische Segregation: +15 % zwischen Schulen (1992–2016)
- 20 Privatschulen geschlossen, 10.000 Schüler verlassen (2010–2020)
- PISA: Schweden fiel von Platz 4 (1995) auf Platz 15 (2015), teilweise der Segregation zugeschrieben

**Vorgeschlagene Sicherheitsvorkehrungen:**
1. 30%-Sozialquote: jede Gutscheinschule muss ≥ 30 % benachteiligte Schüler einschreiben
2. Keine Gewinnausschüttung: Überschüsse müssen in der Schule reinvestiert werden
3. 3-jährige Schließungsankündigung mit garantiertem Schülertransferplan
4. Volle Transparenz: monatliche Veröffentlichung von Ergebnissen, Anwesenheit und sozialer Zusammensetzung`,
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
    titleDe: 'Rehn-Meidner neu gedacht — zentralisierte Lohnverhandlungen zur Ungleichheitsreduzierung',
    summary: 'Restore centralised wage bargaining between national confederations, setting annual wage growth norms that compress inequality before redistribution — Sweden\'s unique model for combining equality and productivity.',
    summaryFr: 'Restaurer la négociation salariale centralisée entre confédérations nationales, fixant des normes annuelles de croissance salariale qui compriment les inégalités avant redistribution — le modèle unique suédois combinant égalité et productivité.',
    summaryDe: 'Wiederherstellung zentralisierter Lohnverhandlungen zwischen nationalen Verbänden, die jährliche Lohnwachstumsnormen festlegen, die Ungleichheit vor der Umverteilung verringern — Schwedens einzigartiges Modell zur Verbindung von Gleichheit und Produktivität.',
    content: `Sweden\'s Rehn-Meidner model (1950s) set uniform wage increases across sectors regardless of firm productivity. Highly productive firms kept the surplus as profit; less productive firms were forced to restructure. The result: wage compression AND creative destruction.

**Current state:** Sweden\'s wage compression has partially unwound since the 1990s decentralisation, but it remains the most egalitarian salaried society in the world:
- D9/D1 ratio (top/bottom decile wages): 2.1 in Sweden vs 3.1 in France vs 4.9 in US
- 90% of Swedish workers covered by collective agreements (vs 8% in France)

**Proposed reform:**
1. National wage growth norm: annual confederation-level agreement (LO+SAF equivalent)
2. Sectoral floor: no sector can receive less than inflation
3. Relative cap: executive increases ≤ 3× worker increases in the same company

Landersø & Heckman (NBER): Nordic mobility advantage comes from **wage compression** (high minimum wages), not true intergenerational mobility. This model reduces poverty by raising the floor — not just redistribution.`,
    contentFr: `Le modèle Rehn-Meidner suédois (années 1950) fixait des hausses salariales uniformes dans tous les secteurs, indépendamment de la productivité des entreprises. Les entreprises très productives conservaient l'excédent en profit ; les moins productives étaient contraintes de se restructurer. Résultat : compression salariale ET destruction créatrice.

**État actuel :** La compression salariale suédoise s'est partiellement relâchée depuis la décentralisation des années 1990, mais la Suède reste la société salariée la plus égalitaire au monde :
- Rapport D9/D1 (salaires déciles supérieur/inférieur) : 2,1 en Suède contre 3,1 en France et 4,9 aux États-Unis
- 90 % des travailleurs suédois couverts par des accords collectifs (contre 8 % en France)

**Réforme proposée :**
1. Norme nationale de croissance salariale : accord annuel au niveau des confédérations (équivalent LO+SAF)
2. Plancher sectoriel : aucun secteur ne peut recevoir moins que l'inflation
3. Plafond relatif : les hausses des cadres dirigeants ≤ 3× les hausses des travailleurs dans la même entreprise

Landersø & Heckman (NBER) : l'avantage nordique en matière de mobilité provient de la **compression salariale** (salaires minimums élevés), et non d'une véritable mobilité intergénérationnelle. Ce modèle réduit la pauvreté en élevant le plancher — pas seulement par la redistribution.`,
    contentDe: `Schwedens Rehn-Meidner-Modell (1950er Jahre) setzte einheitliche Lohnerhöhungen über alle Sektoren hinweg, unabhängig von der Firmenproduktivität. Hochproduktive Unternehmen behielten den Überschuss als Gewinn; weniger produktive Unternehmen wurden zur Restrukturierung gezwungen. Das Ergebnis: Lohnkompression UND kreative Zerstörung.

**Aktueller Zustand:** Schwedens Lohnkompression hat sich seit der Dezentralisierung der 1990er Jahre teilweise aufgelöst, bleibt aber die egalitärste Lohngesellschaft der Welt:
- D9/D1-Verhältnis (obere/untere Dezillöhne): 2,1 in Schweden vs. 3,1 in Frankreich vs. 4,9 in den USA
- 90 % der schwedischen Arbeitnehmer durch Tarifverträge abgedeckt (vs. 8 % in Frankreich)

**Geplante Reform:**
1. Nationale Lohnwachstumsnorm: jährliche Konfederationsabkommen (LO+SAF-Äquivalent)
2. Sektoraler Boden: kein Sektor kann weniger als die Inflation erhalten
3. Relative Obergrenze: Führungskräftesteigerungen ≤ 3× Arbeitnehmersteigerungen im selben Unternehmen

Landersø & Heckman (NBER): Der nordische Mobilitätsvorteil stammt aus der **Lohnkompression** (hohe Mindestlöhne), nicht aus echter intergenerationeller Mobilität. Dieses Modell reduziert Armut durch Anhebung des Bodens — nicht nur durch Umverteilung.`,
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
    titleDe: 'Staatsfonds — Verwaltung natürlicher Ressourcen für zukünftige Generationen',
    summary: 'Create a national sovereign wealth fund financed by natural resource revenues, managed independently of the government, with withdrawals capped at 4% of capital per year — Norway\'s model now worth $1.4 trillion.',
    summaryFr: 'Créer un fonds souverain national financé par les revenus des ressources naturelles, géré indépendamment du gouvernement, avec des retraits plafonnés à 4 % du capital par an — le modèle norvégien valant désormais 1 400 milliards de dollars.',
    summaryDe: 'Schaffung eines nationalen Staatsfonds, der aus Einnahmen natürlicher Ressourcen finanziert wird, unabhängig von der Regierung verwaltet wird, mit Entnahmen von maximal 4 % des Kapitals pro Jahr — Norwegens Modell mit einem Wert von 1,4 Billionen Dollar.',
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
    contentFr: `Le Fonds de pension gouvernemental mondial (GPFG) de Norvège est le plus grand fonds souverain au monde : 1 400 milliards de dollars (2024) — soit 260 000 $ par Norvégien.

**Règle d'or :** l'État ne peut dépenser que les intérêts (règle des 4 %/an), jamais le capital. En 2024 : environ 50 Md$/an d'intérêts → couvre 20 % du budget fédéral sans toucher au capital.

**Gouvernance :**
- Géré par la Norges Bank Investment Management (NBIM) — indépendante du gouvernement
- Investi uniquement hors de Norvège (évite la « maladie hollandaise » — malédiction des ressources naturelles)
- Exclut le charbon, les armes nucléaires et les violateurs des droits humains
- Transparence publique annuelle totale sur chaque investissement

**Applicable universellement :**
- Financement : revenus des ressources naturelles, excédents budgétaires, redevances sur les données numériques des GAFAM, ou fraction d'impôt sur la fortune
- Règle : 100 % des revenus des ressources naturelles → fonds ; retraits plafonnés à 4 %/an
- Gouvernance indépendante avec audit public annuel

Après 30 ans, un fonds recevant 2 % du PIB/an atteint ~60 % du PIB en capital.`,
    contentDe: `Norwegens Government Pension Fund Global (GPFG) ist der weltweit größte Staatsfonds: 1,4 Billionen Dollar (2024) — 260.000 $ pro Norweger.

**Goldene Regel:** Der Staat kann nur die Zinsen ausgeben (4 %-Jahresregel), niemals das Kapital. Im Jahr 2024: ~50 Mrd. $/Jahr Zinsen → deckt 20 % des Bundeshaushalts, ohne das Kapital anzutasten.

**Governance:**
- Verwaltet von der Norges Bank Investment Management (NBIM) — unabhängig von der Regierung
- Nur außerhalb Norwegens investiert (vermeidet „Holländische Krankheit" — Ressourcenfluch)
- Schließt Kohle, Kernwaffen und Menschenrechtsverletzter aus
- Vollständige jährliche öffentliche Transparenz bei jeder Investition

**Universell anwendbar:**
- Finanzierung durch: natürliche Ressourceneinnahmen, Haushaltsüberschüsse, digitale Datentantiemen auf GAFAM oder einen Vermögenssteueranteil
- Regel: 100 % der Ressourceneinnahmen → Fonds; Entnahmen auf 4 %/Jahr gedeckelt
- Unabhängige Governance mit öffentlicher Jahresprüfung

Nach 30 Jahren baut ein Fonds, der 2 % des BIP/Jahr erhält, ein Kapital von ~60 % des BIP auf.`,
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
    titleDe: 'E-Auto-Elektrifizierung — 90 % der Neuzulassungen elektrisch bis 2030',
    summary: 'Norway achieved 90% EV market share in 2024 through cumulative incentives worth €12,000–15,000 per EV. This replicable policy model eliminates new fossil fuel vehicle sales without a legal ban.',
    summaryFr: 'La Norvège a atteint 90 % de parts de marché pour les VE en 2024 grâce à des incitations cumulées valant 12 000 à 15 000 € par VE. Ce modèle reproductible élimine les nouvelles ventes de véhicules fossiles sans interdiction légale.',
    summaryDe: 'Norwegen erreichte 2024 einen E-Auto-Marktanteil von 90 % durch kumulierte Anreize im Wert von 12.000 bis 15.000 € pro E-Fahrzeug. Dieses replizierbare Politikmodell beseitigt neue Verkäufe von Verbrennungsfahrzeugen ohne gesetzliches Verbot.',
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
    contentFr: `En 2024, **90 % des nouvelles voitures vendues en Norvège sont entièrement électriques** — résultat de 30 ans d'incitations cohérentes et cumulatives.

**Incitations norvégiennes (empilées depuis 1990) :**
| Incitation | Valeur |
|------------|--------|
| Exonération de TVA (25 %) | −7 000 € sur une voiture à 30 000 € |
| Exonération de taxe d'immatriculation | −5 000–15 000 € |
| Accès aux voies de bus | +20 min/jour économisées en ville |
| Réduction des tarifs ferry (50 %) | −500 €/an pour les usagers côtiers |
| Bornes de recharge publiques subventionnées | −200 €/an |

Résultat : le coût total de possession d'un VE est inférieur à celui d'un véhicule essence équivalent en Norvège depuis 2016.

**Modèle de financement :** La Norvège a utilisé les revenus de son fonds pétrolier pour financer la transition électrique — une ironie délibérée. Pour les pays sans fonds pétrolier : étendre le système bonus-malus (le malus sur les véhicules thermiques finance les bonus VE) + affecter les recettes de la taxe carbone.

**Résultats mesurés :**
- Émissions des transports : −35 % depuis 2015
- Qualité de l'air (Oslo) : −60 % de particules fines depuis 2015
- Économies sur les importations de carburant : ~3 Md€/an`,
    contentDe: `Im Jahr 2024 sind **90 % der in Norwegen verkauften Neuwagen vollständig elektrisch** — das Ergebnis von 30 Jahren konsequenter, kumulativer Anreize.

**Norwegische Anreize (seit 1990 aufeinander aufbauend):**
| Anreiz | Wert |
|--------|------|
| MwSt.-Befreiung (25 %) | −7.000 € bei einem 30.000 €-Auto |
| Befreiung von der Kfz-Steuer | −5.000–15.000 € |
| Zugang zu Busspuren | +20 Min./Tag in Städten gespart |
| Ermäßigte Fährpreise (50 %) | −500 €/Jahr für Küstennutzer |
| Subventioniertes öffentliches Laden | −200 €/Jahr |

Ergebnis: Gesamtbetriebskosten eines E-Fahrzeugs < gleichwertiges Benzinfahrzeug in Norwegen seit 2016.

**Finanzierungsmodell:** Norwegen nutzte Ölfondseinnahmen zur Finanzierung der E-Fahrzeug-Transition — eine bewusste Ironie. Für Länder ohne Ölfonds: Bonus-Malus-System ausweiten (Malus auf Verbrenner finanziert E-Fahrzeug-Boni) + CO₂-Steuereinnahmen zuweisen.

**Gemessene Ergebnisse:**
- Verkehrsemissionen: −35 % seit 2015
- Luftqualität (Oslo): −60 % Feinstaub seit 2015
- Kraftstoffimporteinsparungen: ~3 Mrd. €/Jahr`,
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
    titleDe: 'Norwegischer Elternurlaub — 49 Wochen zu 100 % mit 15 nicht übertragbaren Wochen pro Elternteil',
    summary: 'Norway offers 49 weeks of parental leave at 100% salary (or 59 weeks at 80%), with 15 weeks non-transferable per parent. Father take-up: 75%. Maternal earnings penalty: reduced by 18% over 10 years.',
    summaryFr: 'La Norvège offre 49 semaines de congé parental à 100 % du salaire (ou 59 semaines à 80 %), avec 15 semaines non transférables par parent. Taux de prise par les pères : 75 %. Pénalité salariale maternelle : réduite de 18 % sur 10 ans.',
    summaryDe: 'Norwegen bietet 49 Wochen Elternurlaub bei 100 % Gehalt (oder 59 Wochen bei 80 %), mit 15 nicht übertragbaren Wochen pro Elternteil. Väterliche Inanspruchnahme: 75 %. Lohneinbußen für Mütter: über 10 Jahre um 18 % verringert.',
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
    contentFr: `Structure du congé parental norvégien :
- **49 semaines à 100 %** OU 59 semaines à 80 % du salaire
- 15 semaines réservées à chaque parent (non transférables)
- 19 semaines flexibles entre les parents
- Plafond : 6× le revenu de base national (~100 000 €/an)

**Résultats :**
- Taux de prise par les pères : 75 % prennent la totalité des 15 semaines réservées
- Durée moyenne du congé paternel : 14,2 semaines (2022)
- Pénalité salariale maternelle à 5 ans : −22 % (contre −35 % sans quota parental)

Cools, Markussen & Strøm (IZA 2021) : la réforme des « mois papa » norvégiens → revenus des mères +5–8 % à 5 ans post-naissance par mois de congé pris par le père. L'effet provient d'un retour au travail plus rapide de la mère ET de la normalisation du signal envoyé aux employeurs.

**Conditions minimales pour la réplication :**
- Total ≥ 35 semaines
- Taux de remplacement ≥ 80 %
- Part non transférable ≥ 8 semaines par parent
- Protection légale pendant 6 mois après le congé`,
    contentDe: `Norwegens Elternurlaubsstruktur:
- **49 Wochen zu 100 %** ODER 59 Wochen zu 80 % Gehalt
- 15 Wochen pro Elternteil reserviert (nicht übertragbar)
- 19 Wochen flexibel zwischen den Eltern
- Deckelung: 6× nationales Basiseinkommen (~100.000 €/Jahr)

**Ergebnisse:**
- Väterliche Inanspruchnahme: 75 % nehmen alle 15 reservierten Wochen
- Durchschnittliche väterliche Urlaubsdauer: 14,2 Wochen (2022)
- Mütterliche Lohneinbuße nach 5 Jahren: −22 % (vs. −35 % ohne Elternquote)

Cools, Markussen & Strøm (IZA 2021): Norwegische „Papamonate"-Reform → Müttereinnahmen +5–8 % bei 5 Jahren nach der Geburt pro vom Vater genommenem Urlaubsmonat. Der Effekt stammt aus schnellerer Rückkehr der Mutter zur Arbeit UND Normalisierung des Arbeitgebersignals.

**Mindestbedingungen für die Replikation:**
- Gesamt ≥ 35 Wochen
- Ersatzsatz ≥ 80 %
- Nicht übertragbarer Anteil ≥ 8 Wochen pro Elternteil
- Rechtlicher Schutz für 6 Monate nach dem Urlaub`,
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
    titleDe: 'Finnisches Bildungsmodell — Chancengleichheit, Lehrerautonomie, keine standardisierten Tests vor 16',
    summary: 'Finland maintains one of the world\'s most equitable education systems without standardised testing before 16, through highly selective teacher training, equal funding, and a curiosity-centred pedagogy.',
    summaryFr: 'La Finlande maintient l\'un des systèmes éducatifs les plus équitables au monde sans tests standardisés avant 16 ans, grâce à une formation enseignante très sélective, un financement équitable et une pédagogie centrée sur la curiosité.',
    summaryDe: 'Finnland unterhält eines der gerechtesten Bildungssysteme der Welt ohne standardisierte Tests vor dem 16. Lebensjahr, durch hochselektive Lehrerausbildung, gleichmäßige Finanzierung und eine neugierigkeitszentrierte Pädagogik.',
    content: `Finland has resisted the global wave of standardised testing and school competition ("GERM — Global Education Reform Movement") and maintained top PISA rankings for 20 years.

**Core principles:**
1. **Ultra-selective teacher training:** only 10% of applicants accepted. Master\'s degree required at all levels, including primary. Teacher salary: +25% vs national median.
2. **No standardised tests before 16:** formative assessment only. No student ranking, no grade repetition before secondary.
3. **Equal funding:** schools in disadvantaged areas receive MORE, not less. Inter-school performance gap: smallest in OECD.
4. **Teacher autonomy:** teachers design their own curricula within a broad national framework. No surprise inspections.

**PISA results:** Finland fell from #1 (2003) to #9 (2022) — but remains #1 in equity. The gap between the best and worst performing 10% of students is the smallest in the world.

**Pasi Sahlberg\'s lesson:** competition between schools does not improve average results — it increases inequality.`,
    contentFr: `La Finlande a résisté à la vague mondiale des tests standardisés et de la concurrence scolaire (« GERM — Mouvement mondial de réforme de l'éducation ») et a maintenu ses classements PISA au sommet pendant 20 ans.

**Principes fondamentaux :**
1. **Formation des enseignants ultra-sélective :** seulement 10 % des candidats admis. Master requis à tous les niveaux, y compris en primaire. Salaire des enseignants : +25 % par rapport à la médiane nationale.
2. **Aucun test standardisé avant 16 ans :** évaluation formative uniquement. Pas de classement d'élèves, pas de redoublement avant le secondaire.
3. **Financement équitable :** les établissements en zones défavorisées reçoivent PLUS, pas moins. Écart de performance inter-établissements : le plus faible de l'OCDE.
4. **Autonomie des enseignants :** les enseignants conçoivent leurs propres programmes dans le cadre d'un référentiel national large. Aucune inspection surprise.

**Résultats PISA :** La Finlande est passée de la 1ère place (2003) à la 9e (2022) — mais reste 1ère en matière d'équité. L'écart entre les 10 % d'élèves les plus performants et les moins performants est le plus faible au monde.

**La leçon de Pasi Sahlberg :** la concurrence entre établissements n'améliore pas les résultats moyens — elle accroît les inégalités.`,
    contentDe: `Finnland hat der globalen Welle standardisierter Tests und Schulwettbewerbs („GERM — Global Education Reform Movement") widerstanden und 20 Jahre lang PISA-Spitzenplätze gehalten.

**Kernprinzipien:**
1. **Hochselektive Lehrerausbildung:** nur 10 % der Bewerber angenommen. Masterabschluss an allen Stufen, einschließlich Grundschule, erforderlich. Lehrergehalt: +25 % vs. nationaler Median.
2. **Keine standardisierten Tests vor 16:** nur formative Beurteilung. Kein Schülerranking, keine Klassenwiederholung vor der Sekundarstufe.
3. **Gerechte Finanzierung:** Schulen in benachteiligten Gebieten erhalten MEHR, nicht weniger. Leistungsunterschied zwischen Schulen: kleinster in der OECD.
4. **Lehrerautonomie:** Lehrer gestalten ihre eigenen Lehrpläne innerhalb eines breiten nationalen Rahmens. Keine Überraschungsinspektionen.

**PISA-Ergebnisse:** Finnland fiel von Platz 1 (2003) auf Platz 9 (2022) — bleibt aber Platz 1 in der Bildungsgerechtigkeit. Die Lücke zwischen den leistungsstärksten und schwächsten 10 % der Schüler ist die kleinste der Welt.

**Pasi Sahlbergs Lektion:** Wettbewerb zwischen Schulen verbessert nicht die Durchschnittsergebnisse — er erhöht die Ungleichheit.`,
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
    titleDe: 'UBI — Lehren aus Finnlands nationalem Experiment 2017–2018 und Ausrollungsvorschlag',
    summary: 'Finland ran Europe\'s only rigorous national UBI experiment (2017–2018): 2,000 people received €560/month unconditionally for 2 years. Results: no employment reduction, significant wellbeing gains. This proposal scales the model.',
    summaryFr: 'La Finlande a mené la seule expérimentation nationale rigoureuse d\'UBI en Europe (2017–2018) : 2 000 personnes ont reçu 560 €/mois sans condition pendant 2 ans. Résultats : pas de réduction de l\'emploi, gains significatifs de bien-être. Cette proposition déploie le modèle.',
    summaryDe: 'Finnland führte Europas einziges rigoroses nationales UBI-Experiment durch (2017–2018): 2.000 Personen erhielten 2 Jahre lang bedingungslos 560 €/Monat. Ergebnisse: keine Beschäftigungsreduktion, signifikante Wohlbefindenssteigerungen. Dieser Vorschlag skaliert das Modell.',
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
    contentFr: `**L'expérimentation (Kangas et al., Kela 2019) :**
- 2 000 chômeurs finlandais ont reçu 560 €/mois sans condition pendant 2 ans
- Groupe de contrôle : 173 000 chômeurs comparables non participants

**Résultats à 2 ans :**
| Indicateur | Groupe RSU | Contrôle | Différence |
|------------|-----------|---------|------------|
| Emploi (jours travaillés) | 78 | 73 | **+6 jours (+8 %)** |
| Bien-être subjectif (0–10) | 7,3 | 6,8 | **+0,5 (+7 %)** |
| Confiance dans les institutions | 6,1 | 5,6 | **+0,5 (+9 %)** |
| Stress financier | 27 % | 35 % | **−8 pp** |
| Symptômes dépressifs | 12 % | 16 % | **−4 pp** |

**Résultat clé :** Le RSU n'a pas réduit l'emploi — il l'a légèrement augmenté, surtout chez les travailleurs indépendants et les personnes en formation.

**Limites :** montant trop faible (560 € < loyer médian d'Helsinki 900 €), seuls les chômeurs testés (pas universel), durée de 2 ans trop courte pour des effets de carrière.

**Proposition de déploiement :** 800 €/mois pour tous les adultes de 18 à 65 ans, financé par la fusion des prestations conditionnelles + hausse progressive de l'impôt sur le revenu au-dessus de 5 000 €/mois. Coût net : ~15 % du PIB.`,
    contentDe: `**Das Experiment (Kangas et al., Kela 2019):**
- 2.000 arbeitslose Finnen erhielten 2 Jahre lang bedingungslos 560 €/Monat
- Kontrollgruppe: 173.000 vergleichbare arbeitslose Nicht-Teilnehmer

**Ergebnisse nach 2 Jahren:**
| Indikator | BGE-Gruppe | Kontrolle | Differenz |
|-----------|-----------|---------|-----------|
| Beschäftigung (Arbeitstage) | 78 | 73 | **+6 Tage (+8 %)** |
| Subjektives Wohlbefinden (0–10) | 7,3 | 6,8 | **+0,5 (+7 %)** |
| Vertrauen in Institutionen | 6,1 | 5,6 | **+0,5 (+9 %)** |
| Finanzieller Stress | 27 % | 35 % | **−8 pp** |
| Depressionssymptome | 12 % | 16 % | **−4 pp** |

**Haupterkenntnis:** BGE reduzierte die Beschäftigung nicht — sie erhöhte sie leicht, besonders bei Selbständigen und in der Ausbildung.

**Einschränkungen:** Betrag zu niedrig (560 € < Helsinkier Medianmiete 900 €), nur Arbeitslose getestet (nicht universal), 2-Jahres-Dauer zu kurz für Karriereeffekte.

**Skalierungsvorschlag:** 800 €/Monat für alle Erwachsenen 18–65, finanziert durch Zusammenführung bedingter Leistungen + progressive Einkommensteuersteigerung über 5.000 €/Monat. Nettokosten: ~15 % des BIP.`,
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
    titleDe: 'Nationales Housing First — Finnland hat chronische Obdachlosigkeit nahezu beseitigt',
    summary: 'Finland is the only EU country to have virtually eliminated chronic homelessness through a national Housing First programme (PAAVO 2008–2019). Rough sleeping fell 85%. Net savings: €1.6 per €1 invested.',
    summaryFr: 'La Finlande est le seul pays de l\'UE à avoir quasiment éliminé le sans-abrisme chronique grâce à un programme national Housing First (PAAVO 2008–2019). Le nombre de sans-abri a chuté de 85 %. Économies nettes : 1,6 € pour 1 € investi.',
    summaryDe: 'Finnland ist das einzige EU-Land, das chronische Obdachlosigkeit durch ein nationales Housing-First-Programm (PAAVO 2008–2019) nahezu beseitigt hat. Obdachlosigkeit sank um 85 %. Nettoeinsparungen: 1,6 € pro investiertem Euro.',
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
    contentFr: `Le programme national finlandais Housing First (PAAVO I & II, 2008–2019) :

| Indicateur | 2008 | 2020 | 2024 |
|------------|------|------|------|
| Sans-abri de longue durée | 3 600 | 900 | < 500 |
| Personnes à la rue (Helsinki) | ~600/nuit | ~80/nuit | ~30/nuit |
| Maintien dans le logement à 5 ans | — | 71 % | 74 % |
| Coût par personne logée | — | 14 000 €/an | 13 500 €/an |
| Coût par sans-abri (urgence) | — | 38 000 €/an | 41 000 €/an |

**Économies nettes : chaque euro investi économise 1,6 à 2,8 € en services d'urgence (Pleace et al., 2019)**

**Facteurs clés de succès :**
1. Engagement politique unanime de tous les partis (2008)
2. Fondation Y (à but non lucratif) gérant 17 000 logements sociaux en location
3. Aucune condition préalable — le logement est fourni immédiatement, quelle que soit l'addiction ou l'état de santé mentale
4. Services volontaires sur place (infirmiers, travailleurs sociaux, conseillers emploi dans le bâtiment)
5. Évaluation indépendante à chaque phase avec ajustements

**Finlande vs France :** 330 000 sans-abri en France (INSEE 2024) contre 3 600 en Finlande en 2008 pour une population similaire. Le système français repose encore sur des hébergements d'urgence conditionnels (115) — plus coûteux et moins efficaces.`,
    contentDe: `Finnlands nationales Housing-First-Programm (PAAVO I & II, 2008–2019):

| Indikator | 2008 | 2020 | 2024 |
|-----------|------|------|------|
| Langzeitobdachlose | 3.600 | 900 | < 500 |
| Straßenobdachlose (Helsinki) | ~600/Nacht | ~80/Nacht | ~30/Nacht |
| Wohnerhalt nach 5 Jahren | — | 71 % | 74 % |
| Kosten/untergebrachte Person | — | 14.000 €/Jahr | 13.500 €/Jahr |
| Kosten/obdachlose Person (Notfall) | — | 38.000 €/Jahr | 41.000 €/Jahr |

**Nettoeinsparungen: Jeder investierte Euro spart 1,6–2,8 € in Notfalldiensten (Pleace et al., 2019)**

**Erfolgsfaktoren:**
1. Einstimmiges politisches Engagement aller Parteien (2008)
2. Y-Stiftung (gemeinnützig) verwaltet 17.000 Sozialmietwohnungen
3. Keine Vorbedingungen — Wohnraum wird sofort bereitgestellt, unabhängig von Sucht oder psychischer Gesundheit
4. Freiwillige Vor-Ort-Dienste (Krankenpfleger, Sozialarbeiter, Berufsberater im Gebäude)
5. Unabhängige Evaluation in jeder Phase mit Anpassung

**Finnland vs. Frankreich:** 330.000 Obdachlose in Frankreich (INSEE 2024) vs. 3.600 in Finnland im Jahr 2008 bei ähnlicher Bevölkerung. Das französische System setzt noch auf bedingte Notunterkünfte (115) — teurer und weniger effektiv.`,
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
    titleDe: 'Universelle Pharmakopflege — nationale Verschreibungspflichtversicherung',
    summary: 'Canada has universal healthcare (Medicare) but no drug coverage. 1 in 5 Canadians can\'t afford their medications. A national pharmacare programme would cover all essentials, save C$15bn/year via negotiation, and prevent ~60,000 hospitalisations annually.',
    summaryFr: 'Le Canada dispose d\'une assurance maladie universelle (Medicare) mais pas de couverture médicaments. 1 Canadien sur 5 ne peut pas se payer ses médicaments. Un programme national d\'assurance médicaments couvrirait tous les essentiels, économiserait 15 Md CAD/an grâce aux négociations et préviendrait ~60 000 hospitalisations par an.',
    summaryDe: 'Kanada verfügt über eine universelle Krankenversicherung (Medicare), aber keine Medikamentendeckung. 1 von 5 Kanadiern kann sich seine Medikamente nicht leisten. Ein nationales Pharmaprogramm würde alle wesentlichen Medikamente abdecken, 15 Mrd. CAD/Jahr durch Verhandlungen einsparen und ~60.000 Krankenhausaufenthalte jährlich verhindern.',
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
    contentFr: `Le Canada est le seul pays doté d'un système de santé universel qui ne couvre pas les médicaments sur ordonnance. Conséquences :
- 1 Canadien sur 5 ne fait pas exécuter ses ordonnances pour des raisons financières
- Le Canada paye 30 % moins que les États-Unis mais 40 % plus qu'en Australie ou en France pour les mêmes médicaments
- Dépenses totales en médicaments : 33 Md CAD/an, dont 44 % à la charge des patients ou des assureurs privés

**Proposition (adoptée en principe dans le budget 2024) :**
1. Couverture universelle de tous les médicaments inscrits à la liste nationale (LNMED)
2. Sans participation aux frais pour les médicaments essentiels (diabète, cardiovasculaire, santé mentale)
3. Négociation nationale des prix — le gouvernement fédéral négocie au nom de l'ensemble des 38 millions de Canadiens
4. Remplace 13 régimes provinciaux fragmentés

**Économies :** 15 Md CAD/an via la négociation collective (Commission Hoskins 2019 — conforme aux références de prix internationaux RAND 2021).

**Données probantes (RAND 2021) :** Les prix américains des médicaments sont 2,78 fois la moyenne OCDE. Le Canada paye 30 % moins que les États-Unis mais encore 40 % plus que les comparateurs — la négociation groupée comblerait cet écart. Himmelstein (Lancet 2020) : la simplification administrative dans les systèmes à payeur unique économise 30 à 50 % des frais administratifs actuels.`,
    contentDe: `Kanada ist das einzige Land mit einem universellen Gesundheitssystem, das keine Rezeptmedikamente abdeckt. Konsequenzen:
- 1 von 5 Kanadiern löst aus finanziellen Gründen seine Rezepte nicht ein
- Kanada zahlt 30 % weniger als die USA, aber 40 % mehr als Australien oder Frankreich für dieselben Medikamente
- Gesamtmedikamentenausgaben: 33 Mrd. CAD/Jahr, davon 44 % von Patienten oder privaten Versicherungen bezahlt

**Vorschlag (im Haushalt 2024 grundsätzlich verabschiedet):**
1. Universelle Abdeckung aller Medikamente im nationalen Arzneimittelverzeichnis (LNMED)
2. Keine Eigenbeteiligung bei Grundmedikamenten (Diabetes, Herz-Kreislauf, psychische Gesundheit)
3. Nationale Preisverhandlung — Bundesregierung verhandelt im Namen aller 38 Millionen Kanadier
4. Ersetzt 13 fragmentierte Provinzdrogenprogramme

**Einsparungen:** 15 Mrd. CAD/Jahr durch Sammelverhandlung (Hoskins-Kommission 2019 — konsistent mit RAND 2021 internationalen Medikamentenpreisbenchmarks).

**Belege (RAND 2021):** US-Medikamentenpreise sind 2,78× OECD-Durchschnitt. Kanada zahlt 30 % weniger als die USA, aber immer noch 40 % mehr als Vergleichsländer — Sammelverhandlung würde diese Lücke schließen. Himmelstein (Lancet 2020): Verwaltungsvereinfachung in Einzahler-Systemen spart 30–50 % der aktuellen Verwaltungskosten.`,
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
    titleDe: 'CO₂-Steuer + Klimaschutzanreiz — Kanadas aufkommensneutrales Modell in der Praxis',
    summary: 'Canada\'s federal carbon price (C$80/tonne in 2024, rising to C$170 in 2030) with a direct household rebate is the world\'s largest operational carbon pricing system with redistribution. 80% of households receive more in rebate than they pay.',
    summaryFr: 'Le prix carbone fédéral du Canada (80 CAD/tonne en 2024, passant à 170 CAD en 2030) avec un remboursement direct aux ménages est le plus grand système opérationnel de tarification carbone avec redistribution au monde. 80 % des ménages reçoivent plus en remboursement qu\'ils ne paient.',
    summaryDe: 'Kanadas föderaler CO₂-Preis (80 CAD/Tonne 2024, steigend auf 170 CAD 2030) mit direkter Haushaltsvergütung ist das weltweit größte operative CO₂-Preissystem mit Umverteilung. 80 % der Haushalte erhalten mehr Vergütung als sie zahlen.',
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
    contentFr: `Le système canadien de tarification du carbone (depuis 2019) est le seul grand système opérationnel de prix carbone avec redistribution directe aux ménages :

**Calendrier des prix :**
- 2024 : 80 CAD/tonne CO₂
- 2025 : 95 CAD/tonne
- 2030 : 170 CAD/tonne

**Remise incitative pour l'action climatique :**
- 100 % des recettes de la redevance sur les combustibles fossiles redistribuées trimestriellement aux ménages
- 2024 (famille ontarienne de 4 personnes) : ~1 800 CAD/an
- Bonus rural : +10 % pour les ménages en zone non urbaine
- Aucune demande nécessaire — paiement trimestriel automatique

**Résultat distributif :** 80 % des ménages reçoivent plus en remboursement qu'ils ne paient de taxe carbone.

**Impact mesuré (2019–2024) :**
- Émissions dans les provinces couvertes : −5 % vs provinces non couvertes
- Aucun effet récessionnel mesuré
- 44 % des Canadiens soutiennent la taxe carbone (malgré une campagne d'opposition intense)

C'est la preuve de concept opérationnelle pour ENV-FR-002 et ENV-US-001.`,
    contentDe: `Kanadas CO₂-Preissystem (seit 2019) ist das einzige groß angelegte, voll operative CO₂-Preissystem mit direkter Umverteilung an Haushalte:

**Preisplan:**
- 2024: 80 CAD/Tonne CO₂
- 2025: 95 CAD/Tonne
- 2030: 170 CAD/Tonne

**Climate Action Incentive-Rückerstattung:**
- 100 % der Einnahmen aus der Brennstoffabgabe vierteljährlich an Haushalte umverteilt
- 2024 (Ontario-Familie mit 4 Personen): ~1.800 CAD/Jahr
- Ländlicher Bonus: +10 % für nicht-städtische Haushalte
- Keine Antragstellung nötig — automatische vierteljährliche Zahlung

**Verteilungsergebnis:** 80 % der Haushalte erhalten mehr Rückerstattung als sie an CO₂-Steuer zahlen.

**Gemessene Auswirkungen (2019–2024):**
- Emissionen in erfassten Provinzen: −5 % vs. nicht erfasste Provinzen
- Kein gemessener Rezessionseffekt
- 44 % der Kanadier unterstützen die CO₂-Steuer (trotz intensiver Oppositionskampagne)

Dies ist der operative Proof-of-Concept für ENV-FR-002 und ENV-US-001.`,
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
    titleDe: 'Kinderbetreuung für 10 CAD/Tag — Quebecs Modell wird national',
    summary: 'Quebec\'s C$10/day childcare programme (CPE, since 1997) increased maternal employment by +7.5pp and generates C$1.05 in tax revenue for every C$1 invested. The federal government is now scaling it across Canada.',
    summaryFr: 'Le programme de garderies à 10 CAD/jour du Québec (CPE, depuis 1997) a augmenté l\'emploi maternel de 7,5 points et génère 1,05 CAD de recettes fiscales pour chaque CAD investi. Le gouvernement fédéral le déploie maintenant à l\'échelle nationale.',
    summaryDe: 'Quebecs Kinderbetreuungsprogramm für 10 CAD/Tag (CPE, seit 1997) steigerte die Müttererwerbstätigkeit um 7,5 Prozentpunkte und generiert 1,05 CAD Steuereinnahmen pro investiertem CAD. Die Bundesregierung skaliert es nun landesweit.',
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
    contentFr: `Les Centres de la Petite Enfance (CPE) du Québec proposent une garde réglementée à 10,90 CAD/jour pour les enfants de 0 à 5 ans.

**Résultats sur 25 ans :**
| Indicateur | Résultat |
|------------|---------|
| Emploi maternel | +7,5 pp vs reste du Canada |
| Effet PIB du Québec | +2,2 % (modèle EGC) |
| ROI fiscal | 1,05 CAD retourné pour 1 CAD investi |
| Performance académique à 6 ans | +0,3 ET langue, +0,2 ET mathématiques |
| Criminalité masculine (suivi 20 ans) | −15 % pour les garçons fréquentant un CPE |

**Autofinancement :** l'emploi maternel supplémentaire génère des recettes fiscales couvrant 80 % du coût de la subvention.

**Extension fédérale (2021–2025) :**
- 30 Md CAD sur 5 ans
- Objectif : 10 CAD/jour dans toutes les provinces d'ici 2026
- 250 000 nouvelles places de garde

**Base de données probantes :** Mêmes recherches que ECO-FR-002 (investissement dans la petite enfance) — Perry Preschool (Heckman), Boston Pre-K (Chetty), Attanasio (NBER) — appliquées à l'échelle nationale avec 25 ans de données de résultats.`,
    contentDe: `Quebecs Centres de la Petite Enfance (CPE) bieten geregelte Kinderbetreuung für 10,90 CAD/Tag für Kinder von 0–5 Jahren an.

**25-Jahres-Ergebnisse:**
| Indikator | Ergebnis |
|-----------|---------|
| Mütterliche Erwerbstätigkeit | +7,5 pp vs. Rest Kanadas |
| Quebec-BIP-Effekt | +2,2 % (CGE-Modell) |
| Fiskalischer ROI | 1,05 CAD zurück pro investiertem CAD |
| Schulleistungen mit 6 Jahren | +0,3 SD Sprache, +0,2 SD Mathematik |
| Männliche Kriminalität (20-Jahres-Follow-up) | −15 % für CPE-besuchende Jungen |

**Selbstfinanzierung:** Die zusätzliche mütterliche Erwerbstätigkeit generiert Einkommensteuern, die 80 % der Subventionskosten decken.

**Bundesweite Ausweitung (2021–2025):**
- 30 Mrd. CAD über 5 Jahre
- Ziel: 10 CAD/Tag in allen Provinzen bis 2026
- 250.000 neue Kinderbetreuungsplätze

**Evidenzbasis:** Dieselbe Forschung wie ECO-FR-002 (frühkindliche Investitionen) — Perry Preschool (Heckman), Boston Pre-K (Chetty), Attanasio (NBER) — auf nationaler Ebene mit 25 Jahren Ergebnisdaten angewendet.`,
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
    titleDe: 'NHS-Erneuerung — 40 Mrd. £ zur Beseitigung der 7,6 Millionen-Warteliste',
    summary: 'The NHS waiting list reached a record 7.6 million in 2024. This proposal commits £40bn over 5 years: 50,000 new nurses, 10,000 GPs, elimination of the backlog by 2030, and mental health funding raised to 10% of NHS spending.',
    summaryFr: 'La liste d\'attente du NHS a atteint un record de 7,6 millions en 2024. Cette proposition engage 40 Md£ sur 5 ans : 50 000 nouvelles infirmières, 10 000 médecins généralistes, élimination des arriérés d\'ici 2030 et financement de la santé mentale porté à 10 % des dépenses du NHS.',
    summaryDe: 'Die NHS-Warteliste erreichte 2024 einen Rekord von 7,6 Millionen. Dieser Vorschlag verpflichtet 40 Mrd. £ über 5 Jahre: 50.000 neue Krankenpfleger, 10.000 Hausärzte, Beseitigung des Rückstands bis 2030 und Erhöhung der psychischen Gesundheitsfinanzierung auf 10 % der NHS-Ausgaben.',
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
    contentFr: `Le NHS (67 millions de personnes couvertes) est en crise structurelle après une décennie de sous-financement :

| Indicateur | 2010 | 2024 |
|------------|------|------|
| Liste d'attente | 2,4 M | **7,6 M** |
| Délai ambulance (critique) | 8 min | **28 min** |
| Attente santé mentale (CAMHS) | 4 semaines | **18 semaines** |
| Médecins généralistes pour 100 000 | 65 | **54** |

**Proposition (plan sur 5 ans) :**
1. Recruter 50 000 infirmiers + 10 000 médecins généralistes + 10 000 praticiens en santé mentale
2. 100 centres de diagnostic communautaires
3. Santé mentale : de 7 % à 10 % du budget du NHS — parité de considération
4. Prévention : de 0,5 % à 1 % du budget du NHS

**Financement :** 8 Md£/an supplémentaires. Source : économies de productivité du NHS + prélèvement sur les effectifs des prestataires privés.

**Données probantes :** Le Royaume-Uni dépense 3 800 £/habitant contre 5 400 £ en France. L'écart n'est pas structurel — le NHS à payeur unique dispose des frais administratifs les plus bas au monde (12 % contre 34 % aux États-Unis). C'est un problème de ressources. L'élimination des listes d'attente économise 7 Md£/an en productivité perdue par des travailleurs dans l'incapacité de travailler pendant l'attente.`,
    contentDe: `Das NHS (67 Millionen Versicherte) befindet sich nach einem Jahrzehnt der Unterfinanzierung in einer strukturellen Krise:

| Indikator | 2010 | 2024 |
|-----------|------|------|
| Warteliste | 2,4 Mio. | **7,6 Mio.** |
| Krankenwagen-Reaktionszeit (kritisch) | 8 Min. | **28 Min.** |
| Wartezeit psychische Gesundheit (CAMHS) | 4 Wochen | **18 Wochen** |
| Hausärzte pro 100.000 | 65 | **54** |

**Vorschlag (5-Jahres-Plan):**
1. Rekrutierung von 50.000 Krankenpflegern + 10.000 Hausärzten + 10.000 psychischen Gesundheitspraktikern
2. 100 kommunale Diagnosezentren
3. Psychische Gesundheit: von 7 % auf 10 % des NHS-Budgets — Gleichstellung
4. Prävention: von 0,5 % auf 1 % des NHS-Budgets

**Finanzierung:** 8 Mrd. £/Jahr zusätzlich. Quelle: NHS-Produktivitätseinsparungen + NHS-Personalabgabe auf private Anbieter.

**Belege:** Das UK gibt 3.800 £/Kopf aus vs. 5.400 £ in Frankreich. Die Lücke ist nicht strukturell — der Einzahler-NHS hat die niedrigsten Verwaltungskosten weltweit (12 % vs. 34 % in den USA). Es ist ein Ressourcenproblem. Die Eliminierung der Warteliste spart 7 Mrd. £/Jahr an verlorenem Produktivitätsverlust durch wartende Arbeitnehmer.`,
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
    titleDe: 'Sozialer Wohnungsbaunotfall — 300.000 neue Wohnungen pro Jahr, davon 90.000 Sozialmiete',
    summary: 'England\'s housing crisis: 1.3M households on social housing waiting lists, 112,000 families in temporary accommodation, house prices at 9× median earnings in London. This proposal builds 300,000 homes/year with land reform to fund it.',
    summaryFr: 'La crise du logement en Angleterre : 1,3 million de ménages sur les listes d\'attente de logements sociaux, 112 000 familles en hébergement temporaire, prix de l\'immobilier à 9 fois le salaire médian à Londres. Cette proposition construit 300 000 logements/an avec une réforme foncière pour la financer.',
    summaryDe: 'Englands Wohnungskrise: 1,3 Millionen Haushalte auf Sozialwohnungswartelisten, 112.000 Familien in Notunterkünften, Hauspreise bei 9-fachem Medianlohn in London. Dieser Vorschlag baut 300.000 Häuser/Jahr mit einer Landreform zur Finanzierung.',
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
    contentFr: `L'Angleterre construit 8 000 logements sociaux par an — contre plus de 100 000 dans les années 1970. Le Right to Buy (1980) a vendu 2 millions de logements sociaux sans en exiger le remplacement.

**Indicateurs de crise (2024) :**
- Liste d'attente pour logement social : 1,3 million de ménages
- Familles en hébergement temporaire : 112 000 (record)
- Prix moyen immobilier londonien / salaire médian : 9×
- Locataires en proportion des ménages : 37 % (contre 11 % en 1980)

**Objectif de 300 000 logements/an (dont) :**
- 90 000 à loyer social (50–60 % du marché)
- 60 000 à loyer abordable (80 % du marché)
- 150 000 au prix du marché via les obligations d'urbanisme

**Mécanismes clés :**
1. **Réforme foncière :** acquisition obligatoire à la valeur d'usage existante → économise 50 Md£ en coûts fonciers par million de logements
2. **Construction directe par les collectivités locales :** restaurer les pouvoirs d'emprunt des autorités locales
3. **Obligation de 40 % de logements abordables** sur tous les grands projets privés
4. **Gel du Right to Buy :** remplacement 1 pour 1 requis dans le même arrondissement
5. **Intégration Housing First :** 10 000 unités pour les sans-abri chroniques dans l'objectif de logements sociaux`,
    contentDe: `England baut 8.000 Sozialwohnungen/Jahr — gegenüber über 100.000 in den 1970er Jahren. Das Right to Buy (1980) verkaufte 2 Millionen Sozialwohnungen, ohne Ersatz zu fordern.

**Krisenmetriken (2024):**
- Sozialwohnungswarteliste: 1,3 Mio. Haushalte
- Familien in Notunterkünften: 112.000 (Rekord)
- Durchschnittlicher Londoner Hauspreis / Medianlohn: 9×
- Mieter als Anteil der Haushalte: 37 % (von 11 % im Jahr 1980)

**300.000 Wohnungen/Jahr-Ziel (davon):**
- 90.000 Sozialmiete (50–60 % des Marktes)
- 60.000 erschwingliche Miete (80 % des Marktes)
- 150.000 Marktpreis über Planungsauflagen

**Schlüsselmechanismen:**
1. **Landreform:** Zwangserwerb zum bestehenden Nutzungswert → spart 50 Mrd. £ Landkosten pro Million Häuser
2. **Direkte Gemeindelieferung:** Wiederherstellung der Kreditaufnahmebefugnisse lokaler Behörden
3. **40%-Affordable-Planungsanforderung** bei allen großen privaten Entwicklungen
4. **Right-to-Buy-Einfrierung:** 1-für-1-Ersatz im gleichen Bezirk erforderlich
5. **Housing-First-Integration:** 10.000 Einheiten für chronisch Obdachlose innerhalb des Sozialmietziel`,
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
    titleDe: 'Nationaler Mindestlohn auf 15 £/Stunde, an den Medianlohn gekoppelt',
    summary: 'Raise the UK National Living Wage from £11.44/hour to £15/hour by 2027 — indexed to 2/3 of median earnings thereafter. The UK\'s own track record: a 76% increase since 2016 with zero measurable unemployment impact.',
    summaryFr: 'Porter le salaire minimum national britannique de 11,44 £/h à 15 £/h d\'ici 2027 — indexé sur les 2/3 du salaire médian ensuite. Le bilan du Royaume-Uni : une hausse de 76 % depuis 2016 sans impact mesurable sur l\'emploi.',
    summaryDe: 'Erhöhung des britischen National Living Wage von 11,44 £/Stunde auf 15 £/Stunde bis 2027 — danach an 2/3 des Medianlohns gebunden. Britische Erfolgsgeschichte: 76 % Anstieg seit 2016 ohne messbaren Beschäftigungseffekt.',
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
    contentFr: `Le salaire minimum national britannique (NLW) est passé de 6,50 £ (2016) à 11,44 £ (2024) — une hausse de 76 % en 8 ans. L'évaluation propre de la Commission des bas salaires : aucun effet mesurable sur l'emploi.

**Proposition :**
- 12,50 £ (2025) → 13,50 £ (2026) → **15,00 £ (2027)**
- Différentiels de taux pour les jeunes supprimés : même taux pour tous les ≥ 18 ans
- Indexé sur les 2/3 du salaire médian par la suite
- Contrôle : quadrupler les équipes d'inspection HMRC (800 → 3 200)

**Données probantes (Cengiz et al., NBER 2024 — méta-analyse de 72 études) :**
- Élasticité médiane de l'emploi : −0,13 (seulement 13 centimes par livre sterling de gain compensés par des pertes d'emploi)
- Royaume-Uni spécifiquement : 8 ans d'antécédents de grandes hausses sans effets négatifs sur l'emploi — les données probantes les plus solides au monde

**Travailleurs directement concernés :** ~4,5 millions gagnant moins de 15 £/heure
**Gain médian :** +4 200 £/an
**Économies sur les prestations publiques :** −2 à 3 Md£/an (réduction des demandes de Crédit universel pour la pauvreté au travail)`,
    contentDe: `Der britische National Living Wage (NLW) stieg von 6,50 £ (2016) auf 11,44 £ (2024) — ein Anstieg von 76 % in 8 Jahren. Eigene Bewertung der Low Pay Commission: kein messbarer Beschäftigungseffekt.

**Vorschlag:**
- 12,50 £ (2025) → 13,50 £ (2026) → **15,00 £ (2027)**
- Jugendlohndifferenziale abgeschafft: gleicher Satz für alle ≥18 Jahre
- Danach an 2/3 des Medianlohns gebunden
- Durchsetzung: Verdoppelung der HMRC-Inspektionsteams (800 → 3.200)

**Belege (Cengiz et al., NBER 2024 — 72-Studien-Meta-Analyse):**
- Mittlere Beschäftigungselastizität: −0,13 (nur 13 Cent pro Pfund Gewinn durch Arbeitsplatzverluste kompensiert)
- UK speziell: 8-jährige Erfolgsbilanz großer Erhöhungen ohne Beschäftigungsschaden — stärkste Realweltevidenz weltweit

**Direkt betroffene Arbeitnehmer:** ~4,5 Millionen, die weniger als 15 £/Stunde verdienen
**Medianer Gewinn:** +4.200 £/Jahr
**Öffentliche Leistungseinsparungen:** −2–3 Mrd. £/Jahr (reduzierte Universal-Credit-Ansprüche für Erwerbsarmut)`,
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
    titleDe: 'Arbeitsreform — Überstundengrenze 45h/Monat und nationales Karoshi-Präventionsprogramm',
    summary: 'Japan\'s 2018 law capped overtime at 100h/month — still 2× the EU limit. This proposal reduces it to 45h, enforces it criminally, and creates a national karoshi prevention programme. Japan has 10,000+ documented work-related deaths per year.',
    summaryFr: 'La loi japonaise de 2018 plafonne les heures supplémentaires à 100h/mois — encore 2 fois la limite de l\'UE. Cette proposition la réduit à 45h, l\'applique pénalement et crée un programme national de prévention du karoshi. Le Japon compte plus de 10 000 morts liées au travail documentées par an.',
    summaryDe: 'Japans Gesetz von 2018 begrenzte Überstunden auf 100h/Monat — immer noch 2-mal das EU-Limit. Dieser Vorschlag reduziert es auf 45h, setzt es strafrechtlich durch und schafft ein nationales Karoshi-Präventionsprogramm. Japan hat über 10.000 dokumentierte arbeitsbezogene Todesfälle pro Jahr.',
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
    contentFr: `Le **karoshi** (mort par surmenage) est documenté et quantifié au Japon :
- Plus de 10 000 décès par karoshi officiellement reconnus par an (ministère du Travail 2023)
- Estimation réelle : 30 000–50 000/an (Nippon Medical Journal 2021)
- 22 % des salariés japonais travaillent > 60 heures/semaine

**La Loi de réforme du mode de travail de 2018** était insuffisante : elle plafonnait les heures supplémentaires à 100h/mois (= 60h/semaine au total) — encore plus du double de la directive européenne sur le temps de travail.

**Proposition :**
1. **Plafonnement des heures supplémentaires à 45h/mois maximum** (= 56h/semaine au total, réalisable en 5 ans)
2. **Application pénale :** peine d'emprisonnement jusqu'à 1 an pour les dirigeants qui dépassent sciemment le plafond
3. **Droit à la déconnexion :** droit légal de ne pas répondre aux communications professionnelles en dehors des heures de travail (modèle français, 2016)
4. **Seuil karoshi :** indemnisation automatique pour les maladies liées aux heures supplémentaires au-dessus de 60h/mois (actuellement 80h)
5. **Pilote de semaine de 4 jours :** 100 organisations du secteur public (modèle islandais 2015–2019)

Le Japon a un PIB/heure 25 % inférieur à celui de l'Allemagne malgré 30 % d'heures travaillées en plus — travailler moins ne réduirait pas la production.`,
    contentDe: `**Karoshi** (Tod durch Überarbeitung) ist in Japan dokumentiert und quantifiziert:
- Über 10.000 offiziell anerkannte Karoshi-Todesfälle/Jahr (Arbeitsministerium 2023)
- Realschätzung: 30.000–50.000/Jahr (Nippon Medical Journal 2021)
- 22 % der japanischen Angestellten arbeiten > 60 Stunden/Woche

**Das Arbeitsreformgesetz 2018** war unzureichend: Es begrenzte Überstunden auf 100h/Monat (= 60h/Woche gesamt) — immer noch mehr als das Doppelte der EU-Arbeitszeitrichtlinie.

**Vorschlag:**
1. **Überstundenbegrenzung: maximal 45h/Monat** (= 56h/Woche gesamt, in 5 Jahren erreichbar)
2. **Strafrechtliche Durchsetzung:** Freiheitsstrafe bis zu 1 Jahr für Direktoren, die wissentlich die Grenze überschreiten
3. **Recht auf Abschalten:** gesetzliches Recht, außerhalb der Arbeitszeit nicht auf berufliche Kommunikation zu antworten (Frankreich-Modell, 2016)
4. **Karoshi-Schwelle:** automatische Entschädigung für überstundenbezogene Erkrankungen über 60h/Monat (derzeit 80h)
5. **4-Tage-Woche-Pilot:** 100 Behörden im öffentlichen Sektor (Island-Modell 2015–2019)

Japan hat ein um 25 % niedrigeres BIP/Stunde als Deutschland, obwohl es 30 % mehr Stunden arbeitet — weniger zu arbeiten würde die Produktion nicht reduzieren.`,
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
    titleDe: 'Womenomics 3.0 — Lohngleichstellungsgesetz und universelle Kinderbetreuung bis 2030',
    summary: 'Japan ranks 118th on gender equality (WEF 2024). A 21% gender pay gap, 13% women on boards, and 380,000 children on childcare waiting lists. Mandatory pay transparency, equal parental leave, and universal childcare would add +2–3% to GDP.',
    summaryFr: 'Le Japon se classe au 118e rang pour l\'égalité des sexes (WEF 2024). Écart de rémunération de 21 %, 13 % de femmes au conseil d\'administration et 380 000 enfants sur liste d\'attente pour la garde. La transparence salariale obligatoire, le congé parental égalitaire et la garde universelle ajouteraient +2 à +3 % au PIB.',
    summaryDe: 'Japan belegt Rang 118 bei der Geschlechtergleichstellung (WEF 2024). Lohngefälle von 21 %, 13 % Frauen in Vorständen und 380.000 Kinder auf Kinderbetreuungs-Wartelisten. Obligatorische Lohntransparenz, gleicher Elternurlaub und universelle Kinderbetreuung würden +2 bis +3 % zum BIP hinzufügen.',
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
    contentFr: `L'inégalité de genre au Japon coûte à l'économie 40 000 milliards de yens (270 Md$) en capacité productive non réalisée (McKinsey/FMI).

| Indicateur | Japon | Moy. OCDE |
|------------|-------|-----------|
| Écart de rémunération hommes-femmes | 21,3 % | 11,9 % |
| Taux d'activité féminin | 53 % | 65 % |
| Sièges en conseil d'administration (femmes) | 13 % | 28 % |
| Prise du congé parental par les pères | 14 % | 42 % |
| Enfants sur liste d'attente crèche | 380 000 | ~0 (nordique) |

**Proposition (Womenomics 3.0) :**
1. **Transparence salariale (2025) :** les entreprises de plus de 100 salariés publient leur écart de rémunération. Écart > 10 % → plan de réduction requis. Entreprises non conformes de plus de 500 salariés exclues des marchés publics.
2. **Garde universelle (2026–2030) :** éliminer les 380 000 places en liste d'attente. 500 000 nouvelles places agréées. Plafonnement à 5 000 ¥/mois (contre 30 000–60 000 ¥ à Tokyo).
3. **Réforme du congé parental :** 12 semaines non transférables par parent. Pénalité employeur de 10 M¥ pour découragement du congé.
4. **Quotas dans les conseils d'administration (2027) :** 30 % de femmes dans les conseils des sociétés cotées (la France a atteint 44 % en 7 ans via la loi Copé-Zimmermann).

Goldin (Prix Nobel 2023) : la « pénalité enfant » japonaise explique 65 % de l'écart total de revenus entre femmes et hommes. La disponibilité des modes de garde est le principal prédicteur du retour au travail de la mère.`,
    contentDe: `Japans Geschlechterungleichheit kostet die Wirtschaft 40 Billionen Yen (270 Mrd. $) an unrealisierter produktiver Kapazität (McKinsey/IWF).

| Indikator | Japan | OECD-Durchschnitt |
|-----------|-------|-------------------|
| Lohngefälle zwischen Frauen und Männern | 21,3 % | 11,9 % |
| Weibliche Erwerbsbeteiligung | 53 % | 65 % |
| Vorstandssitze in Unternehmen (Frauen) | 13 % | 28 % |
| Väterliche Inanspruchnahme Elternzeit | 14 % | 42 % |
| Kinder auf Kinderbetreuungs-Wartelisten | 380.000 | ~0 (nordisch) |

**Vorschlag (Womenomics 3.0):**
1. **Lohntransparenz (2025):** Unternehmen >100 Mitarbeiter veröffentlichen Lohngefälle. Lücke >10 % → Schließungsplan erforderlich. Nicht konforme Unternehmen >500 Mitarbeiter von öffentlichen Aufträgen ausgeschlossen.
2. **Universelle Kinderbetreuung (2026–2030):** 380.000 Wartelistenplätze eliminieren. 500.000 neue lizenzierte Plätze. Deckelung bei 5.000 ¥/Monat (vs. 30.000–60.000 ¥ in Tokio).
3. **Elternzeitreform:** 12 Wochen nicht übertragbar pro Elternteil. Arbeitgeberstrafzahlung von 10 Mio. ¥ für Entmutigung zur Elternzeit.
4. **Vorstandsquoten (2027):** 30 % Frauen in Vorständen börsennotierter Unternehmen (Frankreich erreichte 44 % in 7 Jahren via Copé-Zimmermann).

Goldin (Nobelpreis 2023): Japans „Kinderstrafe" erklärt 65 % der gesamten weiblich/männlichen Einkommenslücke. Die Verfügbarkeit von Kinderbetreuung ist der größte Einzelprädiktor für die Rückkehr von Müttern zur Arbeit.`,
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
    titleDe: 'Silbergesellschaft — Altenpflegereform für 30 % der Bevölkerung über 65 bis 2030',
    summary: 'By 2030, 30% of Japan\'s population will be over 65 — the highest ratio in history. This proposal reforms Japan\'s Long-Term Care Insurance (LTCI) to guarantee dignity at home, reduce institutionalisation, and support 6 million family caregivers.',
    summaryFr: 'D\'ici 2030, 30 % de la population japonaise aura plus de 65 ans — le ratio le plus élevé de l\'histoire. Cette proposition réforme l\'assurance soins de longue durée (LTCI) du Japon pour garantir la dignité à domicile, réduire l\'institutionnalisation et soutenir 6 millions d\'aidants familiaux.',
    summaryDe: 'Bis 2030 werden 30 % der japanischen Bevölkerung über 65 Jahre alt sein — der höchste Anteil in der Geschichte. Dieser Vorschlag reformiert Japans Pflegeversicherung (LTCI), um Würde zu Hause zu gewährleisten, Institutionalisierung zu reduzieren und 6 Millionen Familienpflegekräfte zu unterstützen.',
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
    contentFr: `Le Japon fait face à un défi démographique sans précédent : 29 % de la population a plus de 65 ans en 2024 → 38 % d'ici 2050.

**Crise de l'assurance soins de longue durée (LTCI) :**
- 6 millions d'aidants informels (en majorité des femmes)
- 100 000 personnes/an quittent le marché du travail pour devenir aidants (« kaigo rishoku »)
- Soins institutionnels : 3 à 5 M¥/an — inabordables pour la plupart des familles
- Pénurie d'aides-soignants : 1,2 million disponibles contre 1,6 million nécessaires d'ici 2025

**Proposition :**
1. **Mandat Home First :** la filière par défaut est les soins à domicile. Financement de 30 000 nouveaux centres de soins communautaires avec services médicaux et sociaux intégrés.
2. **Soutien aux aidants :** congé aidant payé de 12 semaines/an à 80 % du salaire (actuellement 5 jours non rémunérés). 1 000 centres de « répit » pour un soulagement temporaire des soins (1 à 4 semaines).
3. **Réforme salariale :** revalorisation des salaires des aides-soignants de 240 000 à 310 000 ¥/mois. Visa simplifié pour les aides-soignants étrangers.
4. **Technologie :** fonds de 1 000 milliards de yens sur 5 ans pour le déploiement de la robotique de soins (le Japon est le leader mondial).

Les soins à domicile coûtent 30 à 50 % moins que les soins institutionnels et sont préférés par 85 % des patients âgés.`,
    contentDe: `Japan steht vor einer beispiellosen demografischen Herausforderung: 29 % der Bevölkerung > 65 Jahre im Jahr 2024 → 38 % bis 2050.

**LTCI-Krise:**
- 6 Millionen informelle Pflegepersonen (meist Frauen)
- 100.000 Menschen/Jahr verlassen die Beschäftigung, um Pflegepersonen zu werden („kaigo rishoku")
- Stationäre Pflege: 3–5 Mio. ¥/Jahr — für die meisten Familien unerschwinglich
- Pflegekräftemangel: 1,2 Mio. verfügbar vs. 1,6 Mio. bis 2025 benötigt

**Vorschlag:**
1. **Home-First-Mandat:** Standardpfad ist häusliche Pflege. Finanzierung von 30.000 neuen Gemeinschaftspflegezentren mit integrierten medizinischen und sozialen Diensten.
2. **Pflegepersonenunterstützung:** bezahlter Pflegeurlaub 12 Wochen/Jahr bei 80 % Gehalt (derzeit 5 Tage unbezahlt). 1.000 „Entlastungszentren" für vorübergehende Pflegeentlastung (1–4 Wochen).
3. **Lohnreform:** Erhöhung der Pflegekräftelöhne von 240.000 auf 310.000 ¥/Monat. Vereinfachtes Visum für ausländische Pflegekräfte.
4. **Technologie:** 1 Billion ¥ 5-Jahres-Fonds für den Einsatz von Pflegerobotern (Japan ist Weltführer).

Häusliche Pflege kostet 30–50 % weniger als stationäre Pflege und wird von 85 % der älteren Patienten bevorzugt.`,
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
    titleFr: 'Transparence algorithmique obligatoire pour l\'IA du secteur public',
    titleDe: 'Pflicht zur algorithmischen Transparenz bei KI im öffentlichen Sektor',
    summary: 'Any AI or algorithmic system used in public administration decisions must be open-source auditable, with explanations provided to affected citizens.',
    summaryFr: 'Tout système d\'IA ou algorithmique utilisé dans les décisions de l\'administration publique doit être auditable en open source, avec des explications fournies aux citoyens concernés.',
    summaryDe: 'Jedes KI- oder algorithmische System, das in Entscheidungen der öffentlichen Verwaltung eingesetzt wird, muss Open-Source-überprüfbar sein, mit Erklärungen für betroffene Bürger.',
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
    contentFr: `Les gouvernements du monde entier déploient des systèmes d'IA pour l'éligibilité aux aides sociales, les recommandations de peine, les admissions scolaires, les contrôles fiscaux et la notation sociale — sans transparence ni droits de recours. Cette proposition établit des normes mondiales contraignantes pour la gouvernance algorithmique :

**Exigences pour tout système d'IA/algorithmique utilisé dans les décisions publiques :**
1. Publication ouverte de l'objectif du modèle, des sources de données et de la logique décisionnelle (pas nécessairement les poids, mais une logique auditable)
2. Explications individuelles : tout citoyen affecté par une décision automatisée a le droit à une explication compréhensible par l'être humain
3. Mécanisme de recours : le droit de demander un examen humain de toute décision automatisée
4. Audit indépendant annuel par des auditeurs algorithmiques certifiés
5. Études d'impact publiques avant le déploiement (calquées sur l'Annexe III du Règlement sur l'IA de l'UE)

**Fondements :**
- Règlement sur l'IA de l'UE (2024) : classe l'IA à haut risque (aides sociales, justice, éducation, emploi) — exige transparence, explicabilité et supervision humaine
- Recherches OSF sur la responsabilité algorithmique (2021) : les systèmes algorithmiques dans les services publics produisent des erreurs systématiques affectant de manière disproportionnée les minorités et les groupes à faibles revenus
- La Loi pour une République numérique française (2016) impose déjà la transparence algorithmique pour les décisions publiques — mais l'application est faible`,
    contentDe: `Regierungen weltweit setzen KI-Systeme für Sozialleistungsberechtigung, Strafempfehlungen, Schulzulassungen, Steuerprüfungen und soziale Bewertung ein — ohne Transparenz oder Rechtsbehelfe. Dieser Vorschlag etabliert verbindliche globale Standards für algorithmische Governance:

**Anforderungen an jedes KI-/algorithmische System in öffentlichen Entscheidungen:**
1. Offene Veröffentlichung des Modellzwecks, der Datenquellen und der Entscheidungslogik (nicht notwendigerweise Gewichte, aber prüfbare Logik)
2. Individuelle Erklärungen: jeder von einer automatisierten Entscheidung betroffene Bürger hat das Recht auf eine menschenlesbare Erklärung
3. Rechtsbehelfsmechanismus: das Recht, eine menschliche Überprüfung jeder automatisierten Entscheidung zu beantragen
4. Jährliche unabhängige Prüfung durch zertifizierte algorithmische Prüfer
5. Öffentliche Folgenabschätzungen vor dem Einsatz (nach EU-KI-Gesetz Anhang III modelliert)

**Grundlage:**
- EU-KI-Gesetz (2024): klassifiziert Hochrisiko-KI (Sozialleistungen, Justiz, Bildung, Beschäftigung) — erfordert Transparenz, Erklärbarkeit, menschliche Aufsicht
- OSF Algorithmische Rechenschaftspflicht-Forschung (2021): algorithmische Systeme in öffentlichen Diensten produzieren systematische Fehler, die Minderheiten und einkommensschwache Gruppen unverhältnismäßig stark betreffen
- Frankreichs Gesetz für eine digitale Republik (2016) verpflichtet bereits zur algorithmischen Transparenz bei öffentlichen Entscheidungen — aber die Durchsetzung ist schwach`,
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

  // ─── HISTORICAL PROPOSALS ────────────────────────────────────────────────────
  {
    id: 'ECO-US-HIST-001',
    country: 'United States',
    countryFlag: '🇺🇸',
    domain: 'economy',
    title: 'Tax Cuts and Jobs Act — TCJA 2017 (Trump)',
    titleFr: 'Loi de réduction des impôts et de l\'emploi — TCJA 2017',
    titleDe: 'Steuersenkungs- und Beschäftigungsgesetz — TCJA 2017 (Trump)',
    summary: 'Permanent reduction of the corporate tax rate from 35% to 21%, temporary individual tax cuts (top rate 39.6%→37%), doubling of the standard deduction, repatriation tax holiday for overseas profits.',
    summaryFr: 'Réduction permanente du taux d\'imposition des sociétés de 35 % à 21 %, réductions fiscales temporaires pour les particuliers (taux supérieur 39,6 %→37 %), doublement de la déduction standard, congé fiscal pour le rapatriement des bénéfices étrangers.',
    summaryDe: 'Dauerhafte Senkung des Körperschaftsteuersatzes von 35 % auf 21 %, vorübergehende Einkommensteuersenkungen (Höchstsatz 39,6 %→37 %), Verdoppelung des Standardabzugs, Steuerferien für Repatriierung von Auslandsgewinnen.',
    content: `Enacted December 2017, the TCJA was the largest corporate tax reform since 1986. Key provisions: corporate rate permanently cut 35%→21% (OECD average 23%); standard deduction doubled to $24,000/couple; estate tax exemption doubled to $22M/couple; 20% deduction for pass-through income.\n\nDocumented outcomes (CBO 2018, JCT 2019, Tax Policy Center 2019): GDP growth accelerated +0.7pp above pre-reform baseline in 2018; corporate investment surged +9% in Q1 2018 but mean-reverted by 2019; S&P 500 +35% (2017–2018). Distributional impact: top 1% received 83% of benefits in year 1 (Tax Policy Center); Gini coefficient increased +0.017. Federal deficit increased by an estimated $1.9T over 10 years (CBO). R&D spending by large corporations +6.4% in 2018 (NSF).`,
    contentFr: `Promulguée en décembre 2017, la TCJA est la plus grande réforme fiscale des entreprises depuis 1986. Principales dispositions : taux d'imposition des sociétés réduit définitivement de 35 % à 21 % (moyenne OCDE 23 %) ; déduction standard doublée à 24 000 $/couple ; exemption des droits de succession doublée à 22 M$/couple ; déduction de 20 % pour les revenus des sociétés de personnes.

Résultats documentés (CBO 2018, JCT 2019, Tax Policy Center 2019) : la croissance du PIB s'est accélérée de +0,7 point au-dessus de la référence pré-réforme en 2018 ; l'investissement des entreprises a bondi de +9 % au T1 2018, mais est revenu à la moyenne d'ici 2019 ; S&P 500 +35 % (2017–2018). Impact distributif : le 1 % supérieur a reçu 83 % des avantages la première année (Tax Policy Center) ; le coefficient de Gini a augmenté de +0,017. Le déficit fédéral a augmenté d'environ 1 900 milliards de dollars sur 10 ans (CBO). Les dépenses en R&D des grandes entreprises ont augmenté de +6,4 % en 2018 (NSF).`,
    contentDe: `Im Dezember 2017 verabschiedet, war der TCJA die größte Unternehmenssteuerreform seit 1986. Hauptbestimmungen: Körperschaftsteuersatz dauerhaft von 35 % auf 21 % gesenkt (OECD-Durchschnitt 23 %); Standardabzug auf 24.000 $/Paar verdoppelt; Erbschaftsteuerbefreiung auf 22 Mio. $/Paar verdoppelt; 20 % Abzug für Durchlaufeinkommen.

Dokumentierte Ergebnisse (CBO 2018, JCT 2019, Tax Policy Center 2019): BIP-Wachstum beschleunigte sich 2018 um +0,7 pp über der Vorform-Baseline; Unternehmensinvestitionen stiegen im Q1 2018 um +9 %, kehrten aber bis 2019 zum Mittelwert zurück; S&P 500 +35 % (2017–2018). Verteilungswirkung: Das oberste 1 % erhielt 83 % der Vorteile im ersten Jahr (Tax Policy Center); Gini-Koeffizient stieg um +0,017. Bundesdefizit erhöhte sich um geschätzte 1,9 Bio. $ über 10 Jahre (CBO). F&E-Ausgaben großer Unternehmen +6,4 % im Jahr 2018 (NSF).`,
    status: 'adopted',
    author: 'historical',
    date: '2017-12-22',
    impactStatement: 'Affects all 330M Americans; most benefits concentrated at top income quintile.',
    populationAffected: '330 million Americans',
    estimatedCost: 'Federal deficit +$1.9T over 10 years (CBO 2018)',
    sources: [
      { label: 'CBO — The Budget and Economic Outlook 2018–2028', year: 2018 },
      { label: 'Tax Policy Center — Distributional Analysis of TCJA', year: 2019 },
      { label: 'JCT — Macroeconomic Analysis of TCJA', year: 2019 },
      { label: 'NSF — Business R&D and Innovation Survey', year: 2019 },
    ],
    tags: ['tax reform', 'corporate tax', 'inequality', 'USA', 'Trump', 'historical'],
    historical: true,
    historicalOutcomes: {
      period: '2017–2020',
      country_context: 'USA, PIB $21T, 330M habitants',
      gdp_impact: '+0.7pp croissance 2018 vs baseline; +$275B PIB réel (CBO)',
      employment_impact: 'Chômage 4.1%→3.5% (2017–2019) mais tendance déjà en cours',
      inequality_impact: 'Gini revenus +0.017; top 1% = 83% des gains fiscaux (TPC 2019)',
      fiscal_impact: 'Déficit fédéral +$1.9T sur 10 ans; dette/PIB 77%→98%',
      key_finding: 'Croissance court terme réelle mais bénéfices très concentrés au sommet et soutenus par de la dette.',
      sources: [
        'CBO Budget Outlook 2018',
        'Tax Policy Center Distributional Analysis 2019',
        'JCT Macroeconomic Analysis 2019',
      ],
    },
  },
  {
    id: 'GOV-US-HIST-001',
    country: 'United States',
    countryFlag: '🇺🇸',
    domain: 'governance',
    title: 'NYC Budget Deficit Elimination — Eric Adams 2023',
    titleFr: 'Élimination du déficit budgétaire de New York — Eric Adams 2023',
    titleDe: 'NYC-Haushaltsdefizitbeseitigung — Eric Adams 2023',
    summary: 'Mayor Eric Adams implemented a "Program to Eliminate the Gap" (PEG) requiring 5–15% cuts across city agencies, hiring freezes, and cost controls on migrant services, eliminating a projected $7 billion deficit within roughly 100 days of measures.',
    summaryFr: 'Le maire Eric Adams a mis en place un programme d\'élimination du déficit (PEG) exigeant des coupes de 5 à 15 % dans toutes les agences municipales, des gels d\'embauche et des contrôles des coûts des services aux migrants, éliminant un déficit projeté de 7 milliards de dollars en environ 100 jours.',
    summaryDe: 'Bürgermeister Eric Adams implementierte ein „Program to Eliminate the Gap" (PEG) mit 5–15 % Kürzungen in allen Stadtbehörden, Einstellungsstopps und Kostenkontrolle bei Migrantendiensten, was das projizierte 7-Milliarden-Dollar-Defizit in etwa 100 Tagen beseitigte.',
    content: `In fall 2023, New York City faced a $7 billion structural deficit for FY2025, driven by migrant housing costs ($5.6B), rising wages, and post-COVID spending. Mayor Eric Adams launched a two-phase Program to Eliminate the Gap (PEG): Phase 1 (Nov 2023): mandatory 5% cut in all agency budgets; Phase 2 (Jan 2024): additional cuts targeting 3 largest expenditure categories.\n\nResults (NYC Office of Management and Budget, 2024): projected FY2025 gap reduced from $7.1B to $1.7B within 90 days of implementation. Savings of $5.4B achieved through: agency efficiency savings $2.8B, migrant cost management $1.9B, debt restructuring $0.7B. No major service eliminations or tax increases. NYC maintained AA+ bond rating (Fitch 2024). Critics: cuts affected youth programs, libraries, CUNY, police. IBO analysis found $1.2B of "savings" were accounting shifts rather than structural improvements.`,
    contentFr: `À l'automne 2023, New York City faisait face à un déficit structurel de 7 milliards de dollars pour l'exercice 2025, principalement dû aux coûts d'hébergement des migrants (5,6 Md$), à la hausse des salaires et aux dépenses post-COVID. Le maire Eric Adams a lancé un programme en deux phases d'élimination du déficit (PEG) : Phase 1 (nov. 2023) : coupes obligatoires de 5 % dans tous les budgets des agences ; Phase 2 (janv. 2024) : coupes supplémentaires ciblant les 3 plus grandes catégories de dépenses.

Résultats (Bureau de la gestion et du budget de NYC, 2024) : le déficit projeté pour 2025 a été réduit de 7,1 Md$ à 1,7 Md$ en 90 jours de mise en œuvre. Économies de 5,4 Md$ réalisées via : économies d'efficacité des agences 2,8 Md$, gestion des coûts migrants 1,9 Md$, restructuration de la dette 0,7 Md$. Aucune suppression majeure de services ni hausse d'impôts. New York a maintenu sa note AA+ (Fitch 2024). Critiques : les coupes ont touché les programmes jeunesse, bibliothèques, CUNY, police. L'analyse du Bureau budgétaire indépendant a relevé que 1,2 Md$ d'« économies » étaient des glissements comptables plutôt que des améliorations structurelles.`,
    contentDe: `Im Herbst 2023 sah sich New York City einem strukturellen Defizit von 7 Milliarden Dollar für das Haushaltsjahr 2025 gegenüber, getrieben durch Migrantenunterkunftskosten (5,6 Mrd. $), steigende Löhne und Post-COVID-Ausgaben. Bürgermeister Eric Adams startete ein zweiphasiges Program to Eliminate the Gap (PEG): Phase 1 (Nov. 2023): Pflichteinsparungen von 5 % in allen Behördenbudgets; Phase 2 (Jan. 2024): Zusatzkürzungen bei den 3 größten Ausgabenkategorien.

Ergebnisse (NYC Office of Management and Budget, 2024): Projiziertes FY2025-Defizit innerhalb von 90 Tagen von 7,1 Mrd. $ auf 1,7 Mrd. $ reduziert. Einsparungen von 5,4 Mrd. $ durch: Behördeneffizienzersparnisse 2,8 Mrd. $, Migrantenkostenmanagement 1,9 Mrd. $, Umschuldung 0,7 Mrd. $. Keine größeren Serviceabschaffungen oder Steuererhöhungen. NYC behielt AA+-Anleiherating (Fitch 2024). Kritiker: Kürzungen betrafen Jugendprogramme, Bibliotheken, CUNY, Polizei. IBO-Analyse fand, dass 1,2 Mrd. $ der „Einsparungen" buchhalterische Verschiebungen statt strukturelle Verbesserungen waren.`,
    status: 'adopted',
    author: 'historical',
    date: '2023-11-15',
    impactStatement: 'Affects 8.3 million New Yorkers; most impacted: youth services, immigrants, CUNY students.',
    populationAffected: '8.3 million New Yorkers',
    estimatedCost: '$5.4B in agency cuts + efficiency savings (NYC OMB 2024)',
    sources: [
      { label: 'NYC Office of Management and Budget — Adopted Budget FY2024', year: 2024 },
      { label: 'NYC Independent Budget Office — PEG Analysis', year: 2024 },
      { label: 'Fitch Ratings — New York City Credit Review', year: 2024 },
    ],
    tags: ['budget', 'austerity', 'NYC', 'USA', 'Adams', 'fiscal', 'historical'],
    historical: true,
    historicalOutcomes: {
      period: '2023–2024',
      country_context: 'New York City, budget $110B, 8.3M habitants',
      gdp_impact: 'Économie locale stable; aucune récession induite',
      employment_impact: 'Gel des embauches municipal; réduction de 3,000 postes vacants',
      inequality_impact: 'Coupes disproportionnées dans services sociaux (bibliothèques, CUNY)',
      fiscal_impact: 'Déficit $7.1B → $1.7B en 90 jours; rating AA+ maintenu',
      key_finding: 'Réduction rapide du déficit sans hausse d\'impôts, au prix de coupes dans services aux plus vulnérables.',
      sources: [
        'NYC OMB Adopted Budget FY2024',
        'NYC Independent Budget Office Analysis 2024',
      ],
    },
  },
  {
    id: 'ECO-DE-HIST-001',
    country: 'Germany',
    countryFlag: '🇩🇪',
    domain: 'economy',
    title: 'Hartz IV Labor Market Reforms — Schröder 2003',
    titleFr: 'Réformes Hartz IV du marché du travail — Schröder 2003',
    titleDe: 'Hartz-IV-Arbeitsmarktreformen — Schröder 2003',
    summary: 'Package of four labor market reforms (Hartz I–IV): creation of temporary employment agencies (PSA), merged unemployment and welfare into Arbeitslosengeld II (ALG II, €374/month), mandatory job-seeking requirements with sanctions, and liberalisation of temporary work.',
    summaryFr: 'Ensemble de quatre réformes du marché du travail (Hartz I–IV) : création d\'agences de travail temporaire (PSA), fusion du chômage et de l\'aide sociale en Arbeitslosengeld II (ALG II, 374 €/mois), obligation de chercher un emploi sous peine de sanctions, libéralisation du travail temporaire.',
    summaryDe: 'Paket von vier Arbeitsmarktreformen (Hartz I–IV): Schaffung von Zeitarbeitsfirmen (PSA), Zusammenlegung von Arbeitslosen- und Sozialhilfe zum Arbeitslosengeld II (ALG II, 374 €/Monat), Pflicht zur Arbeitssuche mit Sanktionen, Liberalisierung der Zeitarbeit.',
    content: `Chancellor Gerhard Schröder's "Agenda 2010" included the Hartz Commission recommendations implemented 2003–2005. Hartz IV merged traditional unemployment benefit (ALG) with social welfare into a single "Arbeitslosengeld II" (ALG II) of €374/month — drastically cutting long-term unemployment benefits. Mandatory activation: refusal of reasonable job offer = 30% benefit cut. Temporary work agencies (PSA) created.\n\nDocumented outcomes: German unemployment fell from 11.3% (2005) to 5.5% (2007) to 3.1% (2019). But: precarious mini-jobs (€450/month) expanded from 4M→7.5M by 2010 (Bundesagentur). Poverty rate increased from 12.2% to 15.5% (Destatis 2015). Wages stagnated: German real wage growth 1995–2012 averaged 0.1%/year vs EU average 0.8%. The "German job miracle" attributed partly to Hartz, partly to global boom, export strength, and coordinated wage moderation (IAB 2012). Contributed to growing intra-EU imbalances (Dustmann et al. 2014, NBER).`,
    contentFr: `L'« Agenda 2010 » du chancelier Gerhard Schröder incluait les recommandations de la Commission Hartz mises en œuvre entre 2003 et 2005. Hartz IV a fusionné l'allocation chômage traditionnelle (ALG) avec l'aide sociale en un seul « Arbeitslosengeld II » (ALG II) de 374 €/mois — réduisant drastiquement les prestations chômage de longue durée. Activation obligatoire : refus d'une offre d'emploi raisonnable = réduction des allocations de 30 %. Création d'agences de travail temporaire (PSA).

Résultats documentés : le chômage allemand est passé de 11,3 % (2005) à 5,5 % (2007) puis à 3,1 % (2019). Mais : les mini-emplois précaires (450 €/mois) ont augmenté de 4 à 7,5 millions d'ici 2010 (Bundesagentur). Le taux de pauvreté est passé de 12,2 % à 15,5 % (Destatis 2015). Les salaires ont stagné : la croissance réelle des salaires allemands de 1995 à 2012 a été en moyenne de 0,1 %/an contre 0,8 % pour la moyenne européenne. Le « miracle de l'emploi allemand » est attribué en partie à Hartz, en partie au boom mondial, à la force des exportations et à la modération salariale coordonnée (IAB 2012). A contribué aux déséquilibres intra-UE croissants (Dustmann et al. 2014, NBER).`,
    contentDe: `Bundeskanzler Gerhard Schröders „Agenda 2010" umfasste die 2003–2005 umgesetzten Empfehlungen der Hartz-Kommission. Hartz IV fusionierte das traditionelle Arbeitslosengeld (ALG) mit der Sozialhilfe zu einem einzigen „Arbeitslosengeld II" (ALG II) von 374 €/Monat — was Langzeitarbeitslosigkeitsleistungen drastisch kürzte. Pflichtaktivierung: Ablehnung eines zumutbaren Stellenangebots = 30 % Leistungskürzung. Zeitarbeitsfirmen (PSA) wurden geschaffen.

Dokumentierte Ergebnisse: Die deutsche Arbeitslosigkeit fiel von 11,3 % (2005) auf 5,5 % (2007) auf 3,1 % (2019). Aber: Prekäre Minijobs (450 €/Monat) stiegen von 4 Mio. auf 7,5 Mio. bis 2010 (Bundesagentur). Armutsrate stieg von 12,2 % auf 15,5 % (Destatis 2015). Löhne stagnierten: deutsches Reallohnwachstum 1995–2012 durchschnittlich 0,1 %/Jahr vs. EU-Durchschnitt 0,8 %. Das „deutsche Jobwunder" wird teils Hartz, teils dem globalen Boom, der Exportstärke und koordinierter Lohnmoderation (IAB 2012) zugeschrieben. Trug zu wachsenden intra-EU-Ungleichgewichten bei (Dustmann et al. 2014, NBER).`,
    status: 'adopted',
    author: 'historical',
    date: '2003-01-01',
    impactStatement: 'Affected 5 million long-term unemployed; reshaped German labor market.',
    populationAffected: '5M long-term unemployed + 40M workers',
    estimatedCost: 'Budget savings ~€8B/year; social cost: increased poverty',
    sources: [
      { label: 'IAB — Five Years of Hartz IV Reform: An Evaluation', year: 2010 },
      { label: 'Dustmann et al. — From Sick Man to Champion: Germany\'s Resurgent Economy', year: 2014 },
      { label: 'OECD Employment Outlook — Germany', year: 2013 },
      { label: 'Destatis — Armutsgefährdungsquote Deutschland', year: 2015 },
    ],
    tags: ['labor reform', 'unemployment', 'Germany', 'austerity', 'Schröder', 'historical'],
    historical: true,
    historicalOutcomes: {
      period: '2003–2010',
      country_context: 'Allemagne, chômage 11.3%, 82M habitants',
      gdp_impact: 'Croissance PIB 2007: +3.4%; compétitivité exportations ++',
      employment_impact: 'Chômage 11.3%→5.5% (2007); mais +3.5M mini-jobs précaires',
      inequality_impact: 'Gini +0.04; taux pauvreté 12.2%→15.5%; salaires réels stagnants',
      fiscal_impact: 'Économies sociales €8B/an; budget consolidé',
      key_finding: 'Réduction spectaculaire du chômage au prix d\'une montée de la précarité et des inégalités.',
      sources: [
        'IAB Five Years of Hartz IV 2010',
        'Dustmann et al. NBER 2014',
        'Destatis Armutsgefährdung 2015',
      ],
    },
  },
  {
    id: 'ECO-DK-HIST-001',
    country: 'Denmark',
    countryFlag: '🇩🇰',
    domain: 'economy',
    title: 'Danish Flexicurity Reform — 1994 Labour Market Reform',
    titleFr: 'Réforme flexicurité danoise — Réforme du marché du travail 1994',
    titleDe: 'Dänische Flexicurity-Reform — Arbeitsmarktreform 1994',
    summary: 'The "Golden Triangle": flexible dismissal rights for employers + generous unemployment benefits (90% of prior wage, up to 4 years) + active labour market policy (ALMP) with mandatory retraining. Denmark avoided the unemployment-poverty trap that plagued continental Europe.',
    summaryFr: 'Le « Triangle d\'or » : droits de licenciement souples pour les employeurs + allocations chômage généreuses (90 % du salaire précédent, jusqu\'à 4 ans) + politique active du marché du travail (ALMP) avec reconversion obligatoire. Le Danemark a évité le piège chômage-pauvreté qui a frappé l\'Europe continentale.',
    summaryDe: 'Das „Goldene Dreieck": flexible Entlassungsrechte für Arbeitgeber + großzügige Arbeitslosenleistungen (90 % des Vorgehalts, bis zu 4 Jahre) + aktive Arbeitsmarktpolitik (ALMP) mit Pflicht zur Umschulung. Dänemark vermied die Arbeitslosigkeits-Armuts-Falle, die Kontinentaleuropa plagte.',
    content: `Denmark's 1994 labour market reform created the "flexicurity" model: (1) Flexibility: employers can hire and fire without cause (easy mobility); (2) Security: unemployed receive 90% of prior wage for up to 4 years (ceiling €2,100/month); (3) Activity: mandatory participation in ALMP after 6 months — retraining, subsidised work, job placement.\n\nDocumented outcomes: Danish unemployment fell from 12.4% (1993) to 4.3% (2000). Long-term unemployment share fell from 34% to 13%. OECD (2004) identified Denmark as the top model for reconciling labour market flexibility with security. Job mobility: Danish workers change employer every 2.5 years on average vs 7.5 in France. Employee satisfaction +15pp (European Working Conditions Survey). Public cost: ~4.5% GDP on ALMP (world's highest). Key constraint: replicability requires strong fiscal capacity and high social trust.`,
    contentFr: `La réforme du marché du travail danois de 1994 a créé le modèle de « flexicurité » : (1) Flexibilité : les employeurs peuvent embaucher et licencier sans motif (mobilité facile) ; (2) Sécurité : les chômeurs reçoivent 90 % de leur salaire précédent pendant 4 ans maximum (plafond de 2 100 €/mois) ; (3) Activité : participation obligatoire aux politiques actives du marché du travail après 6 mois — reconversion, travail subventionné, placement.

Résultats documentés : le chômage danois est passé de 12,4 % (1993) à 4,3 % (2000). La part du chômage de longue durée est passée de 34 % à 13 %. L'OCDE (2004) a identifié le Danemark comme le principal modèle pour concilier flexibilité du marché du travail et sécurité. Mobilité professionnelle : les travailleurs danois changent d'employeur tous les 2,5 ans en moyenne contre 7,5 en France. Satisfaction des employés +15 points (Enquête européenne sur les conditions de travail). Coût public : ~4,5 % du PIB pour les PAMT (le plus élevé au monde). Contrainte clé : la reproductibilité requiert une forte capacité fiscale et une haute confiance sociale.`,
    contentDe: `Dänemarks Arbeitsmarktreform von 1994 schuf das „Flexicurity"-Modell: (1) Flexibilität: Arbeitgeber können ohne Grund einstellen und entlassen (einfache Mobilität); (2) Sicherheit: Arbeitslose erhalten 90 % des Vorgehalts für bis zu 4 Jahre (Deckelung 2.100 €/Monat); (3) Aktivität: Pflichtbeteiligung an ALMP nach 6 Monaten — Umschulung, subventionierte Arbeit, Stellenvermittlung.

Dokumentierte Ergebnisse: Dänische Arbeitslosigkeit fiel von 12,4 % (1993) auf 4,3 % (2000). Langzeitarbeitslosigkeitsanteil fiel von 34 % auf 13 %. OECD (2004) identifizierte Dänemark als Topmodell für die Vereinbarung von Arbeitsmarktflexibilität und Sicherheit. Jobmobilität: Dänische Arbeitnehmer wechseln alle 2,5 Jahre den Arbeitgeber im Durchschnitt vs. 7,5 in Frankreich. Arbeitnehmerzufriedenheit +15 pp (Europäische Arbeitsbedingungserhebung). Öffentliche Kosten: ~4,5 % BIP für ALMP (weltweit höchste). Hauptbeschränkung: Replizierbarkeit erfordert starke Fiskalkapazität und hohes soziales Vertrauen.`,
    status: 'adopted',
    author: 'historical',
    date: '1994-01-01',
    impactStatement: 'Transformed the Danish labor market; became the global reference model for flexicurity.',
    populationAffected: '5.8 million Danes',
    estimatedCost: '4.5% of GDP annually on active labour market policies',
    sources: [
      { label: 'OECD — Employment Outlook 2004: Reassessing the OECD Jobs Strategy', year: 2004 },
      { label: 'Madsen — The Danish Model of Flexicurity: A Paradise — with some serpents', year: 2004 },
      { label: 'European Foundation for the Improvement of Living Conditions — Flexicurity', year: 2007 },
    ],
    tags: ['flexicurity', 'labor market', 'unemployment', 'Denmark', 'Nordic', 'historical'],
    historical: true,
    historicalOutcomes: {
      period: '1994–2005',
      country_context: 'Danemark, chômage 12.4%, 5.8M habitants',
      gdp_impact: 'Croissance moyenne +2.8%/an 1994–2000; productivité +1.9%/an',
      employment_impact: 'Chômage 12.4%→4.3%; chômage longue durée 34%→13%',
      inequality_impact: 'Gini stable (0.28); Danemark reste parmi les plus égalitaires',
      fiscal_impact: 'Coût ALMP 4.5% PIB; mais économies assurance chômage compensent partiellement',
      key_finding: 'Le modèle le plus étudié au monde pour concilier flexibilité économique et sécurité sociale.',
      sources: [
        'OECD Employment Outlook 2004',
        'Madsen Flexicurity 2004',
      ],
    },
  },
  {
    id: 'ENV-SE-HIST-001',
    country: 'Sweden',
    countryFlag: '🇸🇪',
    domain: 'environment',
    title: 'Swedish Carbon Tax — World\'s First Carbon Price 1991',
    titleFr: 'Taxe carbone suédoise — Première taxe carbone mondiale 1991',
    titleDe: 'Schwedische CO₂-Steuer — Weltweit erster Kohlenstoffpreis 1991',
    summary: 'Sweden introduced the world\'s first carbon tax in 1991 at SEK 250/tCO₂ (≈€25), gradually raised to SEK 1,370/tCO₂ (≈€130) by 2023 — the world\'s highest carbon price. Revenues are recycled through income tax reductions.',
    summaryFr: 'La Suède a introduit la première taxe carbone mondiale en 1991 à 250 SEK/tCO₂ (≈ 25 €), progressivement portée à 1 370 SEK/tCO₂ (≈ 130 €) d\'ici 2023 — le prix carbone le plus élevé au monde. Les recettes sont recyclées via des réductions d\'impôt sur le revenu.',
    summaryDe: 'Schweden führte 1991 die weltweit erste CO₂-Steuer bei 250 SEK/tCO₂ (≈25 €) ein, schrittweise auf 1.370 SEK/tCO₂ (≈130 €) bis 2023 erhöht — der weltweit höchste CO₂-Preis. Die Einnahmen werden durch Einkommensteuersenkungen zurückgeführt.',
    content: `Sweden enacted a carbon tax (koldioxidskatt) in 1991 alongside a major tax reform that reduced income taxes — revenue-neutral design. The initial rate of SEK 250/tCO₂ (€25) was progressively increased: SEK 640 (2005), SEK 1,050 (2012), SEK 1,370 (2023, ≈€130/tCO₂). Industry rates discounted at 60% to maintain competitiveness (later removed for most sectors).\n\nDocumented outcomes (Statistics Sweden, IVL, Riksbank): Swedish GDP grew +75% in real terms from 1990 to 2020. Territorial GHG emissions fell 33% from 1990 baseline. Road transport emissions −25% since 1990. District heating sector: 90% of fossil fuels replaced by biomass and waste. Energy intensity of GDP fell 35%. Sweden met its 2020 EU climate target 10 years early. No measurable competitiveness loss vs OECD peers (World Bank 2022). Rebound: consumption-based emissions grew due to imports.`,
    contentFr: `La Suède a instauré une taxe carbone (koldioxidskatt) en 1991 parallèlement à une réforme fiscale majeure réduisant l'impôt sur le revenu — conception neutre pour les finances publiques. Le taux initial de 250 SEK/tCO₂ (25 €) a été progressivement relevé : 640 SEK (2005), 1 050 SEK (2012), 1 370 SEK (2023, ≈ 130 €/tCO₂). Les taux industriels ont bénéficié d'un abattement de 60 % pour maintenir la compétitivité (supprimé ultérieurement pour la plupart des secteurs).

Résultats documentés (Statistics Sweden, IVL, Riksbank) : le PIB suédois a augmenté de +75 % en termes réels de 1990 à 2020. Les émissions de GES territoriales ont chuté de 33 % par rapport à la référence de 1990. Émissions des transports routiers −25 % depuis 1990. Secteur du chauffage urbain : 90 % des combustibles fossiles remplacés par de la biomasse et des déchets. L'intensité énergétique du PIB a baissé de 35 %. La Suède a atteint son objectif climatique européen 2020 avec 10 ans d'avance. Aucune perte de compétitivité mesurable par rapport aux pairs de l'OCDE (Banque mondiale 2022). Rebond : les émissions basées sur la consommation ont augmenté en raison des importations.`,
    contentDe: `Schweden erließ 1991 eine CO₂-Steuer (koldioxidskatt) neben einer großen Steuerreform, die die Einkommenssteuern senkte — aufkommensneutrales Design. Der anfängliche Satz von 250 SEK/tCO₂ (25 €) wurde schrittweise erhöht: 640 SEK (2005), 1.050 SEK (2012), 1.370 SEK (2023, ≈130 €/tCO₂). Industriesätze mit 60 % Rabatt zur Wettbewerbsfähigkeit (später für die meisten Sektoren entfernt).

Dokumentierte Ergebnisse (Statistics Sweden, IVL, Riksbank): Schwedisches BIP wuchs real um +75 % von 1990 bis 2020. Territoriale Treibhausgasemissionen fielen um 33 % gegenüber dem Basisjahr 1990. Straßenverkehrsemissionen −25 % seit 1990. Fernwärmesektor: 90 % der fossilen Brennstoffe durch Biomasse und Abfall ersetzt. Energieintensität des BIP sank um 35 %. Schweden erreichte sein EU-Klimaziel 2020 10 Jahre früher. Kein messbarer Wettbewerbsverlust gegenüber OECD-Peers (Weltbank 2022). Rebound: konsumbasierte Emissionen stiegen durch Importe.`,
    status: 'adopted',
    author: 'historical',
    date: '1991-01-01',
    impactStatement: '10 million Swedes; global reference for carbon pricing design.',
    populationAffected: '10 million Swedes',
    estimatedCost: '~SEK 40B/year revenue (~0.9% GDP); recycled in income tax cuts',
    sources: [
      { label: 'Statistics Sweden — Greenhouse Gas Emissions 1990–2022', year: 2023 },
      { label: 'World Bank — State and Trends of Carbon Pricing 2023', year: 2023 },
      { label: 'IVL Swedish Environmental Research Institute — Carbon Tax Evaluation', year: 2019 },
    ],
    tags: ['carbon tax', 'climate', 'Sweden', 'carbon pricing', 'revenue-neutral', 'historical'],
    historical: true,
    historicalOutcomes: {
      period: '1991–2022',
      country_context: 'Suède, 10M hab., économie exportatrice, haute R&D',
      gdp_impact: 'PIB réel +75% entre 1990 et 2020; aucune perte de compétitivité mesurable',
      employment_impact: 'Emplois "verts" +85 000; restructuration sector énergie',
      inequality_impact: 'Effet régressif partiellement compensé par baisses d\'impôt sur le revenu',
      fiscal_impact: 'Recettes SEK 40B/an; budget consolidé; double dividende confirmé',
      key_finding: 'Preuve empirique que croissance économique et décarbonation sont compatibles sur 30 ans.',
      sources: [
        'Statistics Sweden GHG 2023',
        'World Bank Carbon Pricing 2023',
        'IVL Carbon Tax Evaluation 2019',
      ],
    },
  },
  {
    id: 'HLT-US-HIST-001',
    country: 'United States',
    countryFlag: '🇺🇸',
    domain: 'health',
    title: 'Affordable Care Act (ACA) — Obamacare 2010',
    titleFr: 'Loi sur les soins abordables (ACA) — Obamacare 2010',
    titleDe: 'Affordable Care Act (ACA) — Obamacare 2010',
    summary: 'Expanded Medicaid to all adults below 138% FPL, created insurance marketplaces with subsidies, banned pre-existing condition exclusions, allowed children to stay on parents\' insurance until 26, mandated minimum benefit standards. 20 million Americans gained coverage.',
    summaryFr: 'Extension de Medicaid à tous les adultes en dessous de 138 % du seuil fédéral de pauvreté, création de marchés d\'assurance avec subventions, interdiction des exclusions pour maladies préexistantes, autorisation de rester sur l\'assurance parentale jusqu\'à 26 ans, normes minimales de prestations obligatoires. 20 millions d\'Américains ont obtenu une couverture.',
    summaryDe: 'Ausweitung von Medicaid auf alle Erwachsenen unterhalb von 138 % der Bundesarmutsgrenze, Schaffung von Versicherungsmärkten mit Subventionen, Verbot von Ausschlüssen bei Vorerkrankungen, Berechtigung von Kindern bis 26 Jahren in der Elternversicherung, Mindestleistungsstandards. 20 Millionen Amerikaner erhielten Krankenversicherung.',
    content: `The ACA, signed March 2010, was the most significant US health reform since Medicare (1965). Key provisions: Medicaid expansion to 138% FPL (later voluntary by state, 38 states adopted by 2023); insurance exchanges with income-scaled subsidies; individual mandate (penalty eliminated 2019); employer mandate (50+ FTE); guaranteed issue (no pre-existing condition exclusions); essential health benefits; preventive care at no cost.\n\nDocumented outcomes (Commonwealth Fund, NEJM, Health Affairs, CBO): Uninsured rate fell from 16.0% (2010) to 8.8% (2016) — 20 million newly insured. Medicaid expansion states: −4.3% mortality among near-elderly (Sommers et al. NEJM 2012). Uncompensated care costs −$35B/year. Insurance company administrative spending required ≤20% (medical loss ratio). Healthcare cost growth slowed to +4.2%/year vs +6.1% pre-ACA. CBO: originally projected budget-neutral over 10 years. Gini of health access: significantly reduced.`,
    contentFr: `L'ACA, promulguée en mars 2010, est la réforme de santé américaine la plus significative depuis Medicare (1965). Principales dispositions : extension de Medicaid à 138 % du seuil fédéral de pauvreté (ultérieurement facultative par État, 38 États l'ont adoptée en 2023) ; marchés d'assurance avec subventions proportionnelles au revenu ; obligation individuelle (pénalité supprimée en 2019) ; obligation employeur (≥ 50 ETP) ; émission garantie (aucune exclusion pour conditions préexistantes) ; prestations de santé essentielles ; soins préventifs gratuits.

Résultats documentés (Commonwealth Fund, NEJM, Health Affairs, CBO) : le taux de non-assurés est passé de 16,0 % (2010) à 8,8 % (2016) — 20 millions de nouveaux assurés. États ayant élargi Medicaid : −4,3 % de mortalité chez les quasi-âgés (Sommers et al. NEJM 2012). Coûts de soins non compensés −35 Md$/an. Dépenses administratives des compagnies d'assurance requises ≤ 20 % (taux de perte médicale). Croissance des coûts de santé ralentie à +4,2 %/an contre +6,1 % avant l'ACA. CBO : projetait initialement une neutralité budgétaire sur 10 ans. Indice de Gini d'accès aux soins : significativement réduit.`,
    contentDe: `Die ACA, unterzeichnet im März 2010, war die bedeutendste US-Gesundheitsreform seit Medicare (1965). Hauptbestimmungen: Medicaid-Ausweitung auf 138 % der Bundesarmutsgrenze (später freiwillig pro Bundesstaat, 38 Staaten adoptierten bis 2023); Versicherungsbörsen mit einkommensgeprüften Zuschüssen; individuelle Mandate (Strafzahlung 2019 abgeschafft); Arbeitgebermandat (≥50 Vollzeitäquivalente); garantierte Ausstellung (keine Ausschlüsse bei Vorerkrankungen); wesentliche Gesundheitsleistungen; Vorsorge ohne Kosten.

Dokumentierte Ergebnisse (Commonwealth Fund, NEJM, Health Affairs, CBO): Nicht-Versicherungsrate fiel von 16,0 % (2010) auf 8,8 % (2016) — 20 Millionen neu Versicherte. Medicaid-Erweiterungsstaaten: −4,3 % Sterblichkeit bei Senioren nahe dem Rentenalter (Sommers et al. NEJM 2012). Unentgeltliche Pflegekosten −35 Mrd. $/Jahr. Verwaltungsausgaben der Versicherungsunternehmen auf ≤ 20 % begrenzt (Medical-Loss-Ratio). Gesundheitskostenwachstum auf +4,2 %/Jahr verlangsamt vs. +6,1 % vor ACA. CBO: ursprünglich haushaltsneutral über 10 Jahre projiziert. Gini des Gesundheitszugangs: deutlich reduziert.`,
    status: 'adopted',
    author: 'historical',
    date: '2010-03-23',
    impactStatement: '20 million newly insured; mortality reductions in expansion states.',
    populationAffected: '20 million newly insured; 330 million affected by insurance rules',
    estimatedCost: 'Originally CBO-projected budget-neutral; net $940B cost/10yr, offset by taxes',
    sources: [
      { label: 'Sommers et al. — Mortality and Access to Care among Adults after State Medicaid Expansions, NEJM', year: 2012 },
      { label: 'Commonwealth Fund — ACA Coverage Gains and Losses', year: 2020 },
      { label: 'CBO — Estimates for the Insurance Coverage Provisions of the ACA', year: 2015 },
    ],
    tags: ['healthcare', 'Medicaid', 'ACA', 'Obama', 'USA', 'universal coverage', 'historical'],
    historical: true,
    historicalOutcomes: {
      period: '2010–2020',
      country_context: 'USA, 16% non-assurés avant réforme, 330M habitants',
      gdp_impact: 'Croissance des coûts santé ralentie; productivité travail +légère',
      employment_impact: 'Débat: mobilité professionnelle +3% (libération du "job lock")',
      inequality_impact: 'Inégalité accès santé réduite; −4.3% mortalité dans États Medicaid',
      fiscal_impact: 'Coût brut $940B/10 ans; soins non compensés −$35B/an',
      key_finding: '20 millions d\'assurés supplémentaires avec réduction mesurable de la mortalité dans les États participants.',
      sources: [
        'Sommers et al. NEJM 2012',
        'Commonwealth Fund 2020',
        'CBO Coverage Provisions 2015',
      ],
    },
  },
  {
    id: 'ECO-FR-HIST-001',
    country: 'France',
    countryFlag: '🇫🇷',
    domain: 'economy',
    title: 'Loi Aubry — 35 heures hebdomadaires 1998',
    titleFr: 'Loi Aubry — Réduction du temps de travail à 35 heures 1998',
    titleDe: 'Loi Aubry — 35-Stunden-Arbeitswoche 1998',
    summary: 'Reduction of the legal work week from 39 to 35 hours (Loi Aubry I & II, 1998–2000), aiming to create jobs through work-sharing, with employer exemptions from social charges to limit cost impact.',
    summaryFr: 'Réduction de la semaine légale de travail de 39 à 35 heures (Loi Aubry I & II, 1998–2000), visant à créer des emplois par le partage du travail, avec des exonérations de charges sociales patronales pour limiter l\'impact sur les coûts.',
    summaryDe: 'Verkürzung der gesetzlichen Arbeitswoche von 39 auf 35 Stunden (Loi Aubry I & II, 1998–2000), mit dem Ziel der Arbeitsplatzbeschaffung durch Arbeitszeitverkürzung, mit Arbeitgeberbefreiungen von Sozialabgaben zur Kostenbegrenzung.',
    content: `The Aubry Laws reduced the legal work week from 39 to 35 hours in two phases: Loi Aubry I (June 1998) — voluntary with strong financial incentives; Loi Aubry II (Jan 2000) — mandatory for firms with 20+ employees, extended to SMEs by 2002.\n\nDocumented outcomes (DARES, INSEE, Askenazy 2013): Employment effect: DARES estimated 350,000 jobs created in 1999–2002 (contested: Crépon & Kramarz 2002 found −5% employment for workers at 39h). Hours worked fell 4.8% on average. Wages: most workers maintained monthly pay despite fewer hours → unit labour costs increased +2.8%. Productivity: hourly productivity +3.5% (partly mechanical). Company surveys: 50% of firms reported increased employee satisfaction; 45% reported logistical difficulties. Overtime: surged to compensate (+18% by 2003). Modified repeatedly: 2003 Fillon law created "overtime premium" workaround. France still has Europe's lowest annual hours (1,510 vs OECD avg 1,752).`,
    contentFr: `Les lois Aubry ont réduit la semaine de travail légale de 39 à 35 heures en deux phases : Loi Aubry I (juin 1998) — volontaire avec de fortes incitations financières ; Loi Aubry II (janvier 2000) — obligatoire pour les entreprises de 20 salariés et plus, étendue aux PME en 2002.

Résultats documentés (DARES, INSEE, Askenazy 2013) : Effet emploi : la DARES a estimé 350 000 emplois créés en 1999–2002 (contesté : Crépon & Kramarz 2002 ont trouvé −5 % d'emploi pour les travailleurs à 39h). Les heures travaillées ont chuté de 4,8 % en moyenne. Salaires : la plupart des travailleurs ont maintenu leur salaire mensuel malgré moins d'heures → les coûts unitaires du travail ont augmenté de +2,8 %. Productivité : productivité horaire +3,5 % (en partie mécanique). Enquêtes d'entreprises : 50 % des entreprises ont signalé une augmentation de la satisfaction des salariés ; 45 % ont signalé des difficultés logistiques. Heures supplémentaires : ont bondi pour compenser (+18 % en 2003). Modifiée à plusieurs reprises : la loi Fillon de 2003 a créé un contournement via les « heures supplémentaires majorées ». La France a toujours les heures annuelles les plus faibles d'Europe (1 510 contre 1 752 en moyenne OCDE).`,
    contentDe: `Die Aubry-Gesetze reduzierten die gesetzliche Arbeitswoche von 39 auf 35 Stunden in zwei Phasen: Loi Aubry I (Juni 1998) — freiwillig mit starken finanziellen Anreizen; Loi Aubry II (Jan. 2000) — verpflichtend für Unternehmen mit 20+ Mitarbeitern, bis 2002 auf KMU ausgedehnt.

Dokumentierte Ergebnisse (DARES, INSEE, Askenazy 2013): Beschäftigungseffekt: DARES schätzte 350.000 geschaffene Arbeitsplätze 1999–2002 (umstritten: Crépon & Kramarz 2002 fanden −5 % Beschäftigung für 39-Stunden-Arbeitnehmer). Geleistete Stunden fielen im Durchschnitt um 4,8 %. Löhne: Die meisten Arbeitnehmer behielten trotz weniger Stunden ihr monatliches Gehalt → Lohnstückkosten stiegen um +2,8 %. Produktivität: Stundenproduktivität +3,5 % (teilweise mechanisch). Unternehmensumfragen: 50 % der Unternehmen meldeten gestiegene Mitarbeiterzufriedenheit; 45 % meldeten logistische Schwierigkeiten. Überstunden: Stiegen zur Kompensation (+18 % bis 2003). Mehrfach modifiziert: Fillon-Gesetz 2003 schuf „Überstundenprämie"-Umgehung. Frankreich hat immer noch Europas niedrigste Jahresarbeitsstunden (1.510 vs. OECD-Durchschnitt 1.752).`,
    status: 'adopted',
    author: 'historical',
    date: '1998-06-01',
    impactStatement: 'Concerne 15 millions de salariés français; modèle mondial de réduction du temps de travail.',
    populationAffected: '15 millions de salariés',
    estimatedCost: 'Allégements sociaux ~€12B/an; gains de productivité partiels',
    sources: [
      { label: 'DARES — Évaluation des effets des 35 heures sur l\'emploi', year: 2002 },
      { label: 'Askenazy P. — Les Désordres du travail: Enquête sur le nouveau productivisme', year: 2013 },
      { label: 'Crépon & Kramarz — Employed 40 Hours or Not Employed 39: Lessons from the 1982 Workweek Reduction in France', year: 2002 },
    ],
    tags: ['work week', '35 hours', 'employment', 'France', 'Aubry', 'historical'],
    historical: true,
    historicalOutcomes: {
      period: '1998–2005',
      country_context: 'France, 10% chômage, 15M salariés concernés',
      gdp_impact: 'Croissance 2000: +3.7%; difficile d\'isoler effet 35h du cycle',
      employment_impact: '+350 000 emplois (DARES) — chiffre contesté; temps partiel ++',
      inequality_impact: 'Effet redistributif positif (plus de loisir pour bas salaires)',
      fiscal_impact: 'Allégements patronaux €12B/an; coût budgétaire net €3–5B/an',
      key_finding: 'Création d\'emplois modeste mais mesurable; hausse de la productivité horaire; effets ambigus sur les PME.',
      sources: [
        'DARES Évaluation 35h 2002',
        'Crépon & Kramarz Journal of Political Economy 2002',
      ],
    },
  },
  {
    id: 'ECO-FI-HIST-001',
    country: 'Finland',
    countryFlag: '🇫🇮',
    domain: 'economy',
    title: 'Universal Basic Income Pilot — Finland 2017–2018',
    titleFr: 'Expérimentation du revenu universel de base — Finlande 2017–2018',
    titleDe: 'Grundeinkommenspilot — Finnland 2017–2018',
    summary: 'Finland randomly selected 2,000 unemployed citizens aged 25–58 to receive €560/month unconditionally for 2 years, replacing existing unemployment benefits, with no job-seeking requirements. Control group: 173,000 unemployed on standard benefits.',
    summaryFr: 'La Finlande a sélectionné aléatoirement 2 000 chômeurs âgés de 25 à 58 ans pour recevoir 560 €/mois sans condition pendant 2 ans, remplaçant les allocations chômage existantes, sans obligation de recherche d\'emploi. Groupe de contrôle : 173 000 chômeurs sous régime ordinaire.',
    summaryDe: 'Finnland wählte zufällig 2.000 Arbeitslose im Alter von 25 bis 58 Jahren aus, die 2 Jahre lang bedingungslos 560 €/Monat erhielten, als Ersatz für bestehende Arbeitslosenleistungen, ohne Stellensuchpflicht. Kontrollgruppe: 173.000 Arbeitslose unter Standardleistungen.',
    content: `The Finnish government (Ministry of Social Affairs and Health) conducted the world's most rigorous RCT of basic income: 2,000 randomly selected unemployed Finns received €560/month unconditionally for 2 years. Control group: 173,000 unemployed receiving standard unemployment benefits (Kela 2020).\n\nDocumented outcomes (Kela 2020, Kangas et al.): Employment: basic income recipients worked +6 days more in year 2 vs control (+7.9% employment). Wellbeing: satisfaction with life +2.7 points (10-point scale); trust in institutions +12%. Mental health: GHQ-12 score improved significantly. Trust in parliament +27%, in police +20%. Poverty: no increase despite reduced conditionality. Financial security: 55% felt secure vs 46% in control. Limitations: only unemployed (not universal); 2 years (too short for long-term effects); no fiscal sustainability test. Estimated full-program cost: €11B/year (6% Finnish GDP).`,
    contentFr: `Le gouvernement finlandais (ministère des Affaires sociales et de la Santé) a mené l'essai contrôlé randomisé le plus rigoureux au monde sur le revenu universel de base : 2 000 chômeurs finlandais sélectionnés aléatoirement ont reçu 560 €/mois sans condition pendant 2 ans. Groupe de contrôle : 173 000 chômeurs bénéficiant des allocations chômage standard (Kela 2020).

Résultats documentés (Kela 2020, Kangas et al.) : Emploi : les bénéficiaires du revenu universel ont travaillé +6 jours de plus en 2e année par rapport au groupe contrôle (+7,9 % d'emploi). Bien-être : satisfaction à l'égard de la vie +2,7 points (échelle de 10) ; confiance dans les institutions +12 %. Santé mentale : score GHQ-12 significativement amélioré. Confiance dans le parlement +27 %, dans la police +20 %. Pauvreté : aucune augmentation malgré la réduction des conditions. Sécurité financière : 55 % se sentaient en sécurité contre 46 % dans le groupe contrôle. Limites : uniquement les chômeurs (pas universel) ; 2 ans (trop court pour les effets à long terme) ; aucun test de viabilité fiscale. Coût estimé du programme complet : 11 Md€/an (6 % du PIB finlandais).`,
    contentDe: `Die finnische Regierung (Ministerium für Soziales und Gesundheit) führte die weltweit strengste RCT für ein Grundeinkommen durch: 2.000 zufällig ausgewählte arbeitslose Finnen erhielten 2 Jahre lang bedingungslos 560 €/Monat. Kontrollgruppe: 173.000 Arbeitslose, die Standard-Arbeitslosenleistungen erhielten (Kela 2020).

Dokumentierte Ergebnisse (Kela 2020, Kangas et al.): Beschäftigung: Grundeinkommensempfänger arbeiteten im 2. Jahr +6 Tage mehr vs. Kontrolle (+7,9 % Beschäftigung). Wohlbefinden: Lebenszufriedenheit +2,7 Punkte (10-Punkte-Skala); Vertrauen in Institutionen +12 %. Psychische Gesundheit: GHQ-12-Score deutlich verbessert. Vertrauen ins Parlament +27 %, in die Polizei +20 %. Armut: kein Anstieg trotz reduzierter Konditionalität. Finanzielle Sicherheit: 55 % fühlten sich sicher vs. 46 % in der Kontrolle. Einschränkungen: nur Arbeitslose (nicht universal); 2 Jahre (zu kurz für Langzeiteffekte); kein Fiskalhaltigkeitstest. Geschätzte Vollprogrammkosten: 11 Mrd. €/Jahr (6 % des finnischen BIP).`,
    status: 'adopted',
    author: 'historical',
    date: '2017-01-01',
    impactStatement: 'Preuve RCT que le revenu universel améliore le bien-être et l\'emploi pour les chômeurs.',
    populationAffected: '2,000 participants (pilote); 5.5M Finlandais si généralisé',
    estimatedCost: 'Pilote: €13.4M; Programme complet estimé: €11B/an (6% PIB)',
    sources: [
      { label: 'Kela — Perustulokokeilun tulokset (Basic Income Experiment Results)', year: 2020 },
      { label: 'Kangas et al. — The Basic Income Experiment 2017–2018 in Finland', year: 2020 },
      { label: 'NBER w27195 — The Labor Market Impacts of Universal and Permanent Cash Transfers', year: 2020 },
    ],
    tags: ['basic income', 'UBI', 'Finland', 'welfare', 'RCT', 'historical'],
    historical: true,
    historicalOutcomes: {
      period: '2017–2018',
      country_context: 'Finlande, 2000 participants chômeurs, RCT randomisé',
      gdp_impact: 'Non mesurable (pilote trop court)',
      employment_impact: '+6 jours travaillés/an (+7.9%) vs groupe contrôle',
      inequality_impact: 'Bien-être +2.7/10; santé mentale améliorée; pas d\'augmentation pauvreté',
      fiscal_impact: 'Pilote €13.4M; programme complet nécessiterait 6% du PIB finlandais',
      key_finding: 'La meilleure étude RCT mondiale sur l\'UBI: améliore bien-être et légèrement l\'emploi pour les chômeurs.',
      sources: [
        'Kela Basic Income Experiment 2020',
        'Kangas et al. 2020',
      ],
    },
  },
  {
    id: 'ECO-US-HIST-002',
    country: 'United States',
    countryFlag: '🇺🇸',
    domain: 'economy',
    title: 'Economic Recovery Tax Act — Reaganomics 1981',
    titleFr: 'Loi de rétablissement économique par la fiscalité — Reaganomics 1981',
    titleDe: 'Economic Recovery Tax Act — Reaganomics 1981',
    summary: 'Largest US income tax cut to date: top marginal rate 70%→50% (1981), then 28% (1986). Deregulation of financial, energy, and transport sectors. Tight monetary policy (Volcker Fed). Military spending +40%. Social spending cuts.',
    summaryFr: 'La plus grande réduction d\'impôts sur le revenu américain à ce jour : taux marginal supérieur de 70 % à 50 % (1981), puis 28 % (1986). Déréglementation des secteurs financier, énergétique et des transports. Politique monétaire restrictive (Fed Volcker). Dépenses militaires +40 %. Coupes dans les dépenses sociales.',
    summaryDe: 'Größte US-Einkommensteuersenkung bis dato: Spitzenmarginalsteuersatz 70 %→50 % (1981), dann 28 % (1986). Deregulierung der Finanz-, Energie- und Transportbranche. Restriktive Geldpolitik (Volcker Fed). Militärausgaben +40 %. Sozialausgabenkürzungen.',
    content: `Reagan's Economic Recovery Tax Act (ERTA 1981) cut the top marginal income tax rate from 70% to 50%, with further reductions in the Tax Reform Act of 1986 (top rate 28%). Corporate tax rate: 48%→34%. Capital gains: 28%→20%. Concurrent: Volcker's Fed raised rates to 20% (1981), breaking double-digit inflation. Deregulation: airlines, trucking, banking, savings & loans. Military spending: +40% real 1980–1985.\n\nDocumented outcomes (CBO, Federal Reserve, NBER): Inflation fell from 13.5% (1980) to 3.2% (1983) — primarily monetary policy credit. GDP growth: sharp recession 1981–82 (−2.9%), then strong recovery +7.2% in 1983. Unemployment peaked at 10.8% (1982), fell to 5.4% by 1989. Income inequality: Gini +0.04 (1980–1990), largest decade increase in post-war history. Top 1% income share: 9%→15% (1980–1990). Federal deficit tripled as % of GDP despite growth: 2.7%→5.9%. Long-run effect: labour productivity growth did not accelerate. Keynesians attribute recovery to deficit spending; supply-siders to incentive effects.`,
    contentFr: `La loi fiscale de rétablissement économique (ERTA 1981) de Reagan a réduit le taux marginal supérieur d'imposition sur le revenu de 70 % à 50 %, avec de nouvelles réductions dans le Tax Reform Act de 1986 (taux supérieur de 28 %). Taux d'imposition des sociétés : 48 %→34 %. Plus-values : 28 %→20 %. Parallèlement : la Fed de Volcker a relevé les taux à 20 % (1981), brisant l'inflation à deux chiffres. Déréglementation : aviation, transport routier, banques, caisses d'épargne. Dépenses militaires : +40 % en termes réels 1980–1985.

Résultats documentés (CBO, Réserve fédérale, NBER) : L'inflation est passée de 13,5 % (1980) à 3,2 % (1983) — principalement attribuable à la politique monétaire. Croissance du PIB : récession sévère 1981–82 (−2,9 %), puis forte reprise +7,2 % en 1983. Le chômage a culminé à 10,8 % (1982), pour tomber à 5,4 % en 1989. Inégalités de revenus : Gini +0,04 (1980–1990), la plus forte hausse décennale de l'histoire d'après-guerre. Part des revenus du 1 % supérieur : 9 %→15 % (1980–1990). Le déficit fédéral a triplé en % du PIB malgré la croissance : 2,7 %→5,9 %. Effet à long terme : la croissance de la productivité du travail ne s'est pas accélérée. Les keynésiens attribuent la reprise aux dépenses déficitaires ; les partisans de l'offre, aux effets d'incitation.`,
    contentDe: `Reagans Economic Recovery Tax Act (ERTA 1981) senkte den Spitzensteuersatz von 70 % auf 50 %, mit weiteren Senkungen im Tax Reform Act von 1986 (Spitzensatz 28 %). Körperschaftsteuersatz: 48 %→34 %. Kapitalgewinne: 28 %→20 %. Gleichzeitig: Volckers Fed erhöhte die Zinsen auf 20 % (1981) und brach die zweistellige Inflation. Deregulierung: Fluggesellschaften, Lkw-Transport, Banken, Spar- und Kreditinstitute. Militärausgaben: +40 % real 1980–1985.

Dokumentierte Ergebnisse (CBO, Federal Reserve, NBER): Inflation fiel von 13,5 % (1980) auf 3,2 % (1983) — primär Geldpolitik zugeschrieben. BIP-Wachstum: scharfe Rezession 1981–82 (−2,9 %), dann starke Erholung +7,2 % im Jahr 1983. Arbeitslosigkeit erreichte 10,8 % (1982), fiel auf 5,4 % bis 1989. Einkommensungleichheit: Gini +0,04 (1980–1990), größter Jahrzehntsanstieg in der Nachkriegsgeschichte. Anteil des Top-1-%-Einkommens: 9 %→15 % (1980–1990). Bundesdefizit verdreifachte sich trotz Wachstum als % des BIP: 2,7 %→5,9 %. Langfristiger Effekt: Arbeitsproduktivitätswachstum beschleunigte sich nicht. Keynesianisten führen Erholung auf Defizitausgaben zurück; Angebotsökonomen auf Anreizeffekte.`,
    status: 'adopted',
    author: 'historical',
    date: '1981-08-13',
    impactStatement: 'Starting point of modern American inequality; cornerstone of supply-side economics debate.',
    populationAffected: '225 million Americans',
    estimatedCost: 'Tax cuts cost $750B over 5 years; deficit tripled as % of GDP',
    sources: [
      { label: 'CBO — The Economic and Budget Outlook 1982–1987', year: 1982 },
      { label: 'Piketty & Saez — Income Inequality in the United States 1913–1998', year: 2003 },
      { label: 'Atkinson, Piketty, Saez — Top Incomes in the Long Run of History, JEL', year: 2011 },
    ],
    tags: ['supply-side', 'tax cuts', 'Reagan', 'inequality', 'USA', 'deregulation', 'historical'],
    historical: true,
    historicalOutcomes: {
      period: '1981–1990',
      country_context: 'USA, inflation 13.5%, chômage 7.5%, dette croissante',
      gdp_impact: 'Récession −2.9% (1982) puis reprise +7.2% (1983); croissance décennie: +3.1%/an',
      employment_impact: 'Chômage 7.5%→10.8% (1982) → 5.4% (1989)',
      inequality_impact: 'Gini +0.04 (1980–90); top 1% part revenus 9%→15%; plus forte hausse inégalités post-guerre',
      fiscal_impact: 'Déficit 2.7%→5.9% PIB; dette publique doublée en termes réels',
      key_finding: 'Croissance robuste mais au prix d\'une envolée des inégalités et d\'un doublement de la dette publique.',
      sources: [
        'CBO Economic Outlook 1982',
        'Piketty & Saez JEL 2003',
        'Atkinson Piketty Saez 2011',
      ],
    },
  },
  {
    id: 'ECO-NO-HIST-001',
    country: 'Norway',
    countryFlag: '🇳🇴',
    domain: 'economy',
    title: 'Government Pension Fund Global — Norwegian Oil Fund 1990',
    titleFr: 'Fonds de pension gouvernemental mondial — Fonds pétrolier norvégien 1990',
    titleDe: 'Staatlicher Pensionsfonds Global — Norwegischer Ölfonds 1990',
    summary: 'Norway deposits all oil revenues above 3% real return into the Government Pension Fund Global (GPFG), avoiding Dutch Disease, funding future generations. By 2024: $1.7 trillion AUM — world\'s largest sovereign wealth fund, covering 20% of Norway\'s projected pension liabilities.',
    summaryFr: 'La Norvège dépose tous les revenus pétroliers au-delà d\'un rendement réel de 3 % dans le Fonds de pension gouvernemental mondial (GPFG), évitant la maladie hollandaise et finançant les générations futures. En 2024 : 1 700 milliards de dollars d\'actifs — le plus grand fonds souverain mondial, couvrant 20 % des engagements de retraite projetés de la Norvège.',
    summaryDe: 'Norwegen legt alle Öleinnahmen über 3 % Realrendite in den Government Pension Fund Global (GPFG) ein, vermeidet Holländische Krankheit und finanziert künftige Generationen. 2024: 1,7 Billionen Dollar verwaltete Vermögen — weltweit größter Staatsfonds, der 20 % der projizierten Rentenverbindlichkeiten Norwegens abdeckt.',
    content: `Norway began accumulating oil revenues in the GPFG (initially "Petroleum Fund") in 1990. The "fiscal rule": only 3% of the fund (expected real return) may be spent annually — preventing inflationary overheating. Fund invests exclusively abroad (no domestic investment) to avoid crowding out. Governance: managed by Norges Bank Investment Management (NBIM) with strict ethical guidelines (excludes weapons, tobacco, companies violating human rights).\n\nDocumented outcomes (NBIM 2024, IMF 2013, NOU 2022): Fund reached $1.7T by 2024 (≈$300,000/Norwegian). Annual return avg 5.9% (1998–2023). Dutch Disease: avoided — Norway maintained manufacturing share vs peers. Inflation: kept below 2.5% despite massive oil wealth (fiscal rule). Gini: Norway remains among world's most equal (0.263) despite resource wealth that typically increases inequality. GDP per capita: world's highest (PPP). Long-term public finances: fund covers 20% of projected pension deficit for 2060. One weakness: intergenerational equity — current Norwegians benefit more than future ones.`,
    contentFr: `La Norvège a commencé à accumuler des revenus pétroliers dans le GPFG (initialement « Fonds pétrolier ») en 1990. La « règle budgétaire » : seulement 3 % du fonds (rendement réel attendu) peuvent être dépensés annuellement — prévenant la surchauffe inflationniste. Le fonds investit exclusivement à l'étranger (pas d'investissement national) pour éviter l'éviction. Gouvernance : géré par la Norges Bank Investment Management (NBIM) avec des directives éthiques strictes (exclut les armes, le tabac, les entreprises violant les droits humains).

Résultats documentés (NBIM 2024, FMI 2013, NOU 2022) : Le fonds a atteint 1 700 milliards de dollars en 2024 (≈ 300 000 $/Norvégien). Rendement annuel moyen de 5,9 % (1998–2023). Maladie hollandaise : évitée — la Norvège a maintenu sa part de production manufacturière par rapport à ses pairs. Inflation : maintenue en dessous de 2,5 % malgré l'immense richesse pétrolière (règle budgétaire). Gini : la Norvège reste parmi les pays les plus égalitaires au monde (0,263) malgré les ressources qui augmentent généralement les inégalités. PIB par habitant : le plus élevé au monde (PPA). Finances publiques à long terme : le fonds couvre 20 % du déficit de pension projeté pour 2060. Un point faible : l'équité intergénérationnelle — les Norvégiens actuels bénéficient plus que les générations futures.`,
    contentDe: `Norwegen begann 1990 mit der Akkumulation von Öleinnahmen im GPFG (zunächst „Petroleum Fund"). Die „Fiskalregel": Nur 3 % des Fonds (erwartete Realrendite) dürfen jährlich ausgegeben werden — was inflationäre Überhitzung verhindert. Der Fonds investiert ausschließlich im Ausland (keine inländischen Investitionen), um Verdrängung zu vermeiden. Governance: Verwaltet von der Norges Bank Investment Management (NBIM) mit strengen ethischen Richtlinien (schließt Waffen, Tabak, Menschenrechtsverletzter aus).

Dokumentierte Ergebnisse (NBIM 2024, IWF 2013, NOU 2022): Fonds erreichte 2024 1,7 Billionen $ (≈300.000 $/Norweger). Durchschnittliche Jahresrendite 5,9 % (1998–2023). Holländische Krankheit: vermieden — Norwegen behielt seinen Fertigungsanteil gegenüber Peers. Inflation: trotz massivem Ölreichtum unter 2,5 % gehalten (Fiskalregel). Gini: Norwegen bleibt trotz Rohstoffreichtum, der typischerweise Ungleichheit erhöht, unter den gleichmäßigsten Ländern der Welt (0,263). BIP pro Kopf: weltweit höchstes (KKP). Langfristige Staatsfinanzen: Fonds deckt 20 % des projizierten Rentendefizits für 2060. Eine Schwäche: intergenerationelle Gerechtigkeit — heutige Norweger profitieren mehr als zukünftige.`,
    status: 'adopted',
    author: 'historical',
    date: '1990-01-01',
    impactStatement: '$1.7 trillion fonds souverain; modèle mondial de gestion des ressources naturelles.',
    populationAffected: '5.4 million Norwegians + future generations',
    estimatedCost: 'Financement: totalité des revenus pétroliers > 3% rendement réel',
    sources: [
      { label: 'Norges Bank Investment Management — Annual Report 2023', year: 2024 },
      { label: 'IMF — Norway: Selected Issues, WP/13/229', year: 2013 },
      { label: 'NOU 2022:3 — Fondet i en ny tid (The Fund in a New Era)', year: 2022 },
    ],
    tags: ['sovereign wealth fund', 'oil', 'Norway', 'Dutch Disease', 'fiscal rule', 'historical'],
    historical: true,
    historicalOutcomes: {
      period: '1990–2024',
      country_context: 'Norvège, 5.4M hab., ressources pétrolières 25% PIB',
      gdp_impact: 'PIB/hab. parmi les plus élevés au monde; croissance 2.8%/an moyenne',
      employment_impact: 'Chômage parmi les plus bas: 3.5%; secteur public solide',
      inequality_impact: 'Gini 0.263 — aucune "malédiction des ressources"; égalité maintenue',
      fiscal_impact: '$1.7T d\'actifs = couverture 20% déficit pension 2060; règle fiscale 3% maintenue',
      key_finding: 'Preuve qu\'un fonds souverain bien géré permet de transformer une ressource éphémère en richesse intergénérationnelle durable.',
      sources: [
        'NBIM Annual Report 2024',
        'IMF Norway WP/13/229',
        'NOU 2022:3',
      ],
    },
  },
  {
    id: 'ECO-GLOBAL-HIST-001',
    country: 'Global',
    countryFlag: '🌍',
    domain: 'economy',
    title: 'Rogernomics — New Zealand Structural Adjustment 1984–1993',
    titleFr: 'Rogernomics — Ajustement structurel de Nouvelle-Zélande 1984–1993',
    titleDe: 'Rogernomics — Neuseeländische Strukturanpassung 1984–1993',
    summary: 'Most comprehensive OECD liberalisation: floating exchange rate, GST flat tax 10%, removal of all agricultural subsidies and tariffs, privatisation of state enterprises, deregulation of labour market, independence of central bank — all within 10 years.',
    summaryFr: 'Libéralisation OCDE la plus complète : taux de change flottant, TVA plate à 10 %, suppression de toutes les subventions agricoles et droits de douane, privatisation des entreprises d\'État, déréglementation du marché du travail, indépendance de la banque centrale — le tout en 10 ans.',
    summaryDe: 'Umfassendste OECD-Liberalisierung: freier Wechselkurs, einheitliche GST von 10 %, Abschaffung aller Agrarsubventionen und Zölle, Privatisierung staatlicher Unternehmen, Deregulierung des Arbeitsmarkts, Zentralbankunabhängigkeit — alles innerhalb von 10 Jahren.',
    content: `New Zealand Finance Minister Roger Douglas implemented radical market liberalisation 1984–1993: (1) Macrostabilisation: exchange rate floated (NZD/USD doubled); inflation target 0–2% for RBNZ (world's first); (2) Trade: all tariffs and agricultural subsidies abolished (farming subsidies fell from 30% to 2% of farm income); (3) Privatisation: Air NZ, Telecom, BNZ, NZ Steel, NZ Post sold; (4) Labour: Employment Contracts Act 1991 — ended award wages, enterprise bargaining; (5) Tax: top income tax 66%→33%; flat GST 10%.\n\nDocumented outcomes: GDP growth accelerated: +2.9% avg 1993–2000 vs +0.8% 1980–1993. Inflation: 18% (1987) → 1.3% (1992) — monetary policy primary driver. Unemployment: 4%→11% (1991 peak) before recovering to 6% (1996). Income inequality: biggest Gini increase in OECD history +0.10 in one decade (Gini 0.26→0.36). Agriculture: survived without subsidies and grew output +22%. Farmer suicide rates increased significantly (1991–93). The "New Zealand experiment" cited by both free-market advocates (growth, inflation control) and critics (inequality spike, social costs).`,
    contentFr: `Le ministre des Finances néo-zélandais Roger Douglas a mis en œuvre une libéralisation radicale du marché entre 1984 et 1993 : (1) Macrostabilisation : taux de change flottant (NZD/USD doublé) ; cible d'inflation de 0 à 2 % pour la RBNZ (première au monde) ; (2) Commerce : tous les droits de douane et subventions agricoles supprimés (les subventions agricoles sont passées de 30 % à 2 % des revenus agricoles) ; (3) Privatisations : Air NZ, Telecom, BNZ, NZ Steel, NZ Post vendues ; (4) Travail : Employment Contracts Act 1991 — fin des salaires conventionnels, négociation d'entreprise ; (5) Fiscalité : taux marginal supérieur de l'impôt sur le revenu de 66 % à 33 % ; TVA uniforme de 10 %.

Résultats documentés : La croissance du PIB s'est accélérée : +2,9 % en moyenne 1993–2000 contre +0,8 % en 1980–1993. Inflation : 18 % (1987) → 1,3 % (1992) — principalement attribuable à la politique monétaire. Chômage : 4 % → 11 % (pic de 1991) avant de remonter à 6 % (1996). Inégalités de revenus : la plus forte hausse du Gini dans l'histoire de l'OCDE, +0,10 en une décennie (Gini 0,26 → 0,36). Agriculture : a survécu sans subventions et a augmenté sa production de +22 %. Les taux de suicide des agriculteurs ont significativement augmenté (1991–93). L'« expérience néo-zélandaise » est citée tant par les défenseurs du libre marché (croissance, maîtrise de l'inflation) que par les critiques (pic d'inégalités, coûts sociaux).`,
    contentDe: `Neuseelands Finanzminister Roger Douglas implementierte 1984–1993 eine radikale Marktliberalisierung: (1) Makrostabilisierung: Wechselkurs freigegeben (NZD/USD verdoppelt); Inflationsziel 0–2 % für RBNZ (weltweit erstes); (2) Handel: Alle Zölle und Agrarsubventionen abgeschafft (Agrarsubventionen fielen von 30 % auf 2 % des Landwirtschaftseinkommens); (3) Privatisierung: Air NZ, Telecom, BNZ, NZ Steel, NZ Post verkauft; (4) Arbeit: Employment Contracts Act 1991 — beendete Tariflöhne, Unternehmenstarifverhandlungen; (5) Steuer: Spitzensteuersatz 66 %→33 %; einheitliche GST 10 %.

Dokumentierte Ergebnisse: BIP-Wachstum beschleunigte sich: +2,9 % durchschnittlich 1993–2000 vs. +0,8 % 1980–1993. Inflation: 18 % (1987) → 1,3 % (1992) — Geldpolitik primärer Treiber. Arbeitslosigkeit: 4 %→11 % (Peak 1991) vor Erholung auf 6 % (1996). Einkommensungleichheit: Größter Gini-Anstieg in der OECD-Geschichte +0,10 in einem Jahrzehnt (Gini 0,26→0,36). Landwirtschaft: überlebte ohne Subventionen und steigerte die Produktion um +22 %. Selbstmordrate bei Bauern stieg signifikant (1991–93). Das „Neuseeland-Experiment" wird sowohl von Befürwortern des freien Marktes (Wachstum, Inflationskontrolle) als auch von Kritikern (Ungleichheitsanstieg, soziale Kosten) angeführt.`,
    status: 'adopted',
    author: 'historical',
    date: '1984-07-14',
    impactStatement: 'Référence mondiale du débat libéralisation vs protection sociale.',
    populationAffected: '3.5 million New Zealanders',
    estimatedCost: 'Social cost: Gini +0.10; fiscal gain: privatisations NZ$9B',
    sources: [
      { label: 'Easton B. — The Commercialisation of New Zealand', year: 1997 },
      { label: 'OECD — Economic Surveys: New Zealand', year: 1994 },
      { label: 'Atkinson & Leigh — Understanding the Distribution of Top Incomes in Five Anglo-Saxon Countries', year: 2007 },
    ],
    tags: ['liberalisation', 'privatisation', 'New Zealand', 'inequality', 'Rogernomics', 'historical'],
    historical: true,
    historicalOutcomes: {
      period: '1984–2000',
      country_context: 'Nouvelle-Zélande, 3.5M hab., économie protégée',
      gdp_impact: 'Croissance +0.8%/an (1980–93) → +2.9%/an (1993–2000)',
      employment_impact: 'Chômage 4%→11% (1991) → 6% (1996); précarité ++',
      inequality_impact: 'Gini +0.10 en une décennie: plus forte hausse OCDE; pauvreté enfants 10%→29%',
      fiscal_impact: 'Recettes privatisations NZ$9B; déficit réduit de 9%→−1% PIB',
      key_finding: 'Modèle libéral ayant produit une croissance et une stabilité macroéconomique, au prix de la plus forte hausse des inégalités de l\'OCDE.',
      sources: [
        'OECD Economic Survey NZ 1994',
        'Atkinson & Leigh 2007',
        'Easton Commercialisation 1997',
      ],
    },
  },
  {
    id: 'EDU-GLOBAL-HIST-001',
    country: 'Global',
    countryFlag: '🌍',
    domain: 'education',
    title: 'SkillsFuture Singapore — Lifelong Learning Credit 2015',
    titleFr: 'SkillsFuture Singapour — Crédit formation tout au long de la vie 2015',
    titleDe: 'SkillsFuture Singapur — Lebenslanges Lernkreditkonto 2015',
    summary: 'Every Singaporean citizen aged 25+ receives SGD 500 (~€345) in a personal SkillsFuture Credit account, usable for any approved training program. Top-up of SGD 500 for mid-career workers (40–60). Accompanied by subsidised courses at Institute of Technical Education, Polytechnics, Universities (up to 90% subsidy).',
    summaryFr: 'Chaque citoyen singapourien de 25 ans et plus reçoit 500 SGD (~345 €) sur un compte personnel SkillsFuture, utilisable pour tout programme de formation approuvé. Recharge de 500 SGD pour les travailleurs en milieu de carrière (40–60 ans). Accompagné de cours subventionnés jusqu\'à 90 % dans les ITE, Polytechniques et Universités.',
    summaryDe: 'Jeder singapurische Bürger ab 25 Jahren erhält 500 SGD (~345 €) auf einem persönlichen SkillsFuture-Kreditkonto, nutzbar für jedes genehmigte Weiterbildungsprogramm. Aufstockung um 500 SGD für Arbeitnehmer in der Mitte ihrer Karriere (40–60). Begleitet durch subventionierte Kurse (bis 90 %) an ITE, Polytechnics und Universitäten.',
    content: `Singapore's SkillsFuture initiative (launched Jan 2016) is the world's most systematic lifelong learning policy: universal credit SGD 500 (~€345) deposited in personal accounts for all citizens 25+; top-up SGD 500 for workers 40–60 (2020); over 12,000 approved courses across 14 sectors; Ministry of Education funds 70–90% of course fees for subsidised slots.\n\nDocumented outcomes (MTI Singapore 2022, OECD Skills Outlook 2019): Uptake: 640,000 Singaporeans used the credit by 2021 (24% of eligible). Re-employment: workers who completed mid-career training: +12% wage premium (MOM 2019). Productivity: labour productivity growth +3.8%/year 2016–2019. Innovation: World Economic Forum Innovation Index: Singapore ranked 8th globally (2020). PISA 2022: Singapore top globally in maths, science, and reading for 15th consecutive year. Limitation: 76% of credit used by university graduates (regressive uptake); manual workers underrepresented.`,
    contentFr: `L'initiative SkillsFuture de Singapour (lancée en janvier 2016) est la politique d'apprentissage tout au long de la vie la plus systématique au monde : crédit universel de 500 SGD (≈ 345 €) déposé sur des comptes personnels pour tous les citoyens de 25 ans et plus ; recharge de 500 SGD pour les travailleurs de 40 à 60 ans (2020) ; plus de 12 000 cours approuvés dans 14 secteurs ; le ministère de l'Éducation finance 70 à 90 % des frais de cours pour les places subventionnées.

Résultats documentés (MTI Singapour 2022, Perspectives des compétences OCDE 2019) : Utilisation : 640 000 Singapouriens avaient utilisé le crédit en 2021 (24 % des éligibles). Réemploi : les travailleurs ayant suivi une formation en milieu de carrière : prime salariale de +12 % (MOM 2019). Productivité : croissance de la productivité du travail +3,8 %/an 2016–2019. Innovation : Indice d'innovation du Forum économique mondial : Singapour classé 8e mondial (2020). PISA 2022 : Singapour au sommet mondial en mathématiques, sciences et lecture pour la 15e année consécutive. Limite : 76 % du crédit utilisé par les diplômés universitaires (utilisation régressive) ; travailleurs manuels sous-représentés.`,
    contentDe: `Singapurs SkillsFuture-Initiative (gestartet Januar 2016) ist die systematischste lebenslange Lernpolitik der Welt: universelles Guthaben von 500 SGD (~345 €) auf persönliche Konten für alle Bürger 25+ eingezahlt; Aufstockung um 500 SGD für Arbeitnehmer 40–60 (2020); über 12.000 genehmigte Kurse in 14 Sektoren; Bildungsministerium finanziert 70–90 % der Kursgebühren für subventionierte Plätze.

Dokumentierte Ergebnisse (MTI Singapur 2022, OECD Skills Outlook 2019): Inanspruchnahme: 640.000 Singapurer nutzten das Guthaben bis 2021 (24 % der Berechtigten). Wiederbeschäftigung: Arbeitnehmer, die Mid-Career-Schulungen abschlossen: +12 % Lohnprämie (MOM 2019). Produktivität: Arbeitsproduktivitätswachstum +3,8 %/Jahr 2016–2019. Innovation: World Economic Forum Innovation Index: Singapur global auf Platz 8 (2020). PISA 2022: Singapur global an der Spitze in Mathematik, Naturwissenschaften und Lesen zum 15. Mal in Folge. Einschränkung: 76 % des Guthabens von Hochschulabsolventen genutzt (regressiver Uptake); Handarbeiter unterrepräsentiert.`,
    status: 'adopted',
    author: 'historical',
    date: '2015-11-01',
    impactStatement: 'Référence mondiale pour la formation professionnelle continue universelle.',
    populationAffected: '2.7 million Singaporeans aged 25+',
    estimatedCost: 'SGD 1B/year (~€680M); 0.3% GDP Singapore',
    sources: [
      { label: 'Ministry of Trade and Industry Singapore — SkillsFuture Evaluation Report', year: 2022 },
      { label: 'OECD — Skills Outlook 2019: Thriving in a Digital World', year: 2019 },
      { label: 'World Economic Forum — Global Innovation Index 2022', year: 2022 },
    ],
    tags: ['education', 'lifelong learning', 'Singapore', 'skills', 'SkillsFuture', 'historical'],
    historical: true,
    historicalOutcomes: {
      period: '2016–2022',
      country_context: 'Singapour, 5.9M hab., économie ouverte très qualifiée',
      gdp_impact: 'Productivité travail +3.8%/an 2016–2019',
      employment_impact: 'Formation mid-carrière: +12% prime salariale; chômage <3%',
      inequality_impact: 'Usage crédit concentré sur diplômés (76%); effets régressifs partiels',
      fiscal_impact: 'Coût SGD 1B/an (0.3% PIB); retour sur investissement: +10% productivité estimé',
      key_finding: 'Modèle mondial de formation continue universelle — efficace sur la productivité mais adoption insuffisante chez les travailleurs peu qualifiés.',
      sources: [
        'MTI Singapore SkillsFuture 2022',
        'OECD Skills Outlook 2019',
      ],
    },
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
