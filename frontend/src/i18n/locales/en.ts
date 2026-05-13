import type { Translations } from './fr'

export const en: Translations = {
  lang: 'en',

  nav: {
    home: 'Home',
    proposals: 'Proposals',
    simulation: 'Simulation',
  },

  home: {
    hero_title: 'Democracy, Reinvented',
    hero_subtitle:
      'Explore science-backed political proposals, vote as a citizen, '
      + 'and simulate their impact on a virtual world of digital twins.',
    cta_proposals: 'Explore proposals',
    cta_simulate: 'Launch a simulation',
    stats_proposals: 'proposals',
    stats_countries: 'countries',
    stats_sources: 'scientific sources',
    stats_domains: 'domains',
    section_featured: 'Featured proposals',
    section_how: 'How it works',
    how_1_title: 'Science-backed proposals',
    how_1_body: 'Each policy is backed by hundreds of peer-reviewed papers and calibrated on real-world data.',
    how_2_title: 'Anonymous citizen vote',
    how_2_body: 'Express your support or opposition. Votes are stored anonymously via SHA-256.',
    how_3_title: 'ABM simulation',
    how_3_body: 'A Mesa 3 engine simulates economic, social and environmental impact on calibrated populations.',
    view_all: 'View all proposals',
  },

  proposals: {
    page_title: 'Policy proposals',
    page_subtitle:
      'Science-backed proposals, organised by country and domain.',
    search_placeholder: 'Search proposals…',
    filter_all: 'All',
    filter_country: 'Country',
    filter_domain: 'Domain',
    sort_label: 'Sort by',
    sort_recent: 'Most recent',
    sort_support: 'Most supported',
    sort_az: 'A → Z',
    results_count: (n: number) => `${n} proposal${n !== 1 ? 's' : ''} found`,
    no_results: 'No proposals match these filters.',
    sources_badge: (n: number) => `${n} sources`,
    vote_support: 'Support',
    vote_oppose: 'Oppose',
    votes_total: (n: number) => `${n.toLocaleString('en-US')} votes`,
  },

  domains: {
    economy: 'Economy',
    education: 'Education',
    environment: 'Environment',
    social: 'Social',
    health: 'Health',
    governance: 'Governance',
  },

  proposal_detail: {
    back: '← Back to proposals',
    tab_overview: 'Overview',
    tab_evidence: 'Evidence',
    tab_simulation: 'Simulation',
    vote_title: 'Your vote',
    vote_support: 'I support',
    vote_oppose: 'I oppose',
    vote_undo: 'Undo',
    support_pct: (p: number) => `${p}% support`,
    ask_placeholder: 'Ask a question about this proposal…',
    ask_button: 'Ask',
    sources_toggle_show: 'Show sources',
    sources_toggle_hide: 'Hide sources',
  },

  simulation: {
    page_title: 'Virtual World of Digital Twins',
    page_subtitle:
      'Simulate the impact of a policy on a realistic population — '
      + 'economically, socially, environmentally.',
    badge_phase: 'Phase 2 — Simulation',
    badge_tech: 'Mesa 3 · ABM',
    stat_countries: 'calibrated countries',
    stat_agents: 'max agents',
    stat_metrics: 'metrics',
    stat_engine: 'local LLM',

    launcher_title: 'Parameters',
    launcher_subtitle: 'Mesa 3 · Ollama · 11 calibrated countries',
    label_proposal: 'Proposal',
    label_horizon: 'Time horizon',
    label_population: 'Simulated population',
    label_scenario: 'Scenario',
    label_seed: 'Random seed',
    seed_random: 'Random seed',
    btn_run: 'Run simulation',
    btn_running: 'Simulating…',

    scenario_pessimistic: 'Pessimistic',
    scenario_baseline: 'Baseline',
    scenario_optimistic: 'Optimistic',
    scenario_hint_pessimistic: 'Positive effects ×0.7 — conservative calibration',
    scenario_hint_baseline: 'Effects calibrated on historical data',
    scenario_hint_optimistic: 'Positive effects ×1.3 — favourable calibration',

    agents_fast: 'fast',
    agents_recommended: 'recommended',
    agents_precise: 'precise',

    tab_economic: 'Economy',
    tab_environment: 'Environment',
    tab_society: 'Society',

    metric_gdp: 'GDP / agent',
    metric_gini: 'Gini',
    metric_employment: 'Employment',
    metric_poverty: 'Poverty',
    metric_wellbeing: 'Wellbeing',
    metric_carbon: 'Carbon footprint',
    metric_green: 'Green behaviour',
    metric_health: 'Health',
    metric_trust: 'Social trust',

    chart_without: 'Without policy',
    chart_with: 'With policy',

    decile_table_title: 'Impact by income decile (final year)',
    col_decile: 'Decile',
    col_income: 'Income',
    col_employment: 'Employment',
    col_wellbeing: 'Wellbeing',
    col_carbon: 'Carbon',

    ai_title: 'AI Analysis',
    ai_idle: 'Click "Interpret" to have the local Ollama model analyse the results.',
    ai_btn: '✨ Interpret results',
    ai_regenerate: 'Regenerate',
    ai_loading: 'Generating…',
    ai_error_prefix: 'Error:',

    ready_title: 'Ready to simulate',
    ready_subtitle: 'Choose a proposal, configure the parameters and run a simulation.',
    how_demo: 'Demographics',
    how_demo_detail: 'Profiles calibrated on WID.world, ILO, World Bank',
    how_llm: 'LLM parser',
    how_llm_detail: 'Ollama extracts numerical parameters from the proposal text',
    how_ab: 'A/B test',
    how_ab_detail: 'Control group vs treatment group in parallel',

    chart_yearly: 'Year-by-year evolution',
    chart_income: 'Mean monthly income (€)',
    chart_carbon_full: 'Carbon footprint (tCO₂/agent/yr)',
    vs_control: 'vs. control group',
    avg_score_01: 'score 0–1',
    years_suffix: (n: number) => `${n} year${n !== 1 ? 's' : ''}`,
    year_min: '1 year',
    year_max: '20 years',
    agents_per_run: 'agents/run',
    runs_label: 'runs',
    error_unknown: 'Unknown error',
    methodology_title: 'Methodology',
    methodology_env:
      'Carbon footprint calibrated on national averages (GCP 2024), '
      + 'scaled by income decile and sector (industry ×1.55, public sector ×0.80). '
      + 'Income gains trigger a rebound effect (+30% of the income gain).',
    sources_social_title: 'Social calibration sources',
    sources_social_body:
      'Health score: income + employment + age + system access (WHO 2024). '
      + 'Social trust: Hofstede collectivism index (World Values Survey).',
    mc_ci_title: 'Evolution with confidence intervals',
    mc_ci_note: (n: number) => `P5–P95 band over ${n} runs`,
    mc_interp_title: 'Statistical interpretation',
    mc_interp_body: (n: number) =>
      `The shaded band is the P5–P95 confidence interval — 90% of the ${n} simulations fall within it. `
      + 'Wide bands signal high stochasticity; narrow bands indicate robust results.',

    mc_title: 'Monte Carlo',
    mc_subtitle: 'Run N simulations with different seeds to visualise uncertainty ranges.',
    mc_runs: 'Number of runs',
    mc_btn: 'Run Monte Carlo',
    mc_running: 'Monte Carlo running…',
    mc_chart_mean: 'Mean',
    mc_chart_band: 'P5–P95 band',
    mc_summary_title: 'Result distribution (final year)',
    mc_mean: 'Mean',
    mc_std: 'Std dev',
    mc_p5: 'P5',
    mc_p95: 'P95',
  },

  errors: {
    api_offline: 'API unreachable — start the server with ./start.sh',
    generic: 'An error occurred.',
  },

  footer: {
    tagline: 'Open Source Political Program',
    license: 'MIT Licence',
    github: 'GitHub',
  },
}
