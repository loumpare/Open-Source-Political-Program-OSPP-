export const fr = {
  lang: 'fr',

  nav: {
    home: 'Accueil',
    proposals: 'Propositions',
    simulation: 'Simulation',
  },

  home: {
    hero_title: 'La démocratie, réinventée',
    hero_subtitle:
      "Explorez des propositions politiques fondées sur la science, votez en citoyen, "
      + "et simulez leur impact sur un monde virtuel de jumeaux numériques.",
    cta_proposals: 'Explorer les propositions',
    cta_simulate: 'Lancer une simulation',
    stats_proposals: 'propositions',
    stats_countries: 'pays',
    stats_sources: 'sources scientifiques',
    stats_domains: 'domaines',
    section_featured: 'Propositions en vedette',
    section_how: 'Comment ça marche',
    how_1_title: 'Propositions fondées sur la science',
    how_1_body: "Chaque politique est adossée à des centaines d'articles peer-reviewed et calibrée sur des données réelles.",
    how_2_title: 'Vote citoyen anonyme',
    how_2_body: 'Exprimez votre soutien ou votre opposition. Les votes sont stockés de façon anonyme via SHA-256.',
    how_3_title: 'Simulation ABM',
    how_3_body: "Un moteur Mesa 3 simule l'impact économique, social et environnemental sur des populations calibrées.",
    view_all: 'Voir toutes les propositions',
  },

  proposals: {
    page_title: 'Propositions politiques',
    page_subtitle:
      'Propositions ancrées dans la recherche scientifique, classées par pays et domaine.',
    search_placeholder: 'Rechercher une proposition…',
    filter_all: 'Tous',
    filter_country: 'Pays',
    filter_domain: 'Domaine',
    sort_label: 'Trier par',
    sort_recent: 'Plus récent',
    sort_support: 'Plus soutenu',
    sort_az: 'A → Z',
    results_count: (n: number) => `${n} proposition${n > 1 ? 's' : ''} trouvée${n > 1 ? 's' : ''}`,
    no_results: 'Aucune proposition ne correspond à ces filtres.',
    sources_badge: (n: number) => `${n} sources`,
    vote_support: 'Soutenir',
    vote_oppose: 'Opposer',
    votes_total: (n: number) => `${n.toLocaleString('fr-FR')} votes`,
  },

  domains: {
    economy: 'Économie',
    education: 'Éducation',
    environment: 'Environnement',
    social: 'Social',
    health: 'Santé',
    governance: 'Gouvernance',
  },

  proposal_detail: {
    back: '← Retour aux propositions',
    tab_overview: "Vue d'ensemble",
    tab_evidence: 'Preuves',
    tab_simulation: 'Simulation',
    vote_title: 'Votre vote',
    vote_support: 'Je soutiens',
    vote_oppose: "Je m'oppose",
    vote_undo: 'Annuler',
    support_pct: (p: number) => `${p}% de soutien`,
    ask_placeholder: 'Posez une question sur cette proposition…',
    ask_button: 'Demander',
    sources_toggle_show: 'Afficher les sources',
    sources_toggle_hide: 'Masquer les sources',
  },

  simulation: {
    page_title: 'Monde Virtuel de Jumeaux Numériques',
    page_subtitle:
      "Simulez l'impact d'une politique sur une population réaliste — "
      + 'économiquement, socialement, environnementalement.',
    badge_phase: 'Phase 2 — Simulation',
    badge_tech: 'Mesa 3 · ABM',
    stat_countries: 'pays calibrés',
    stat_agents: 'agents max',
    stat_metrics: 'métriques',
    stat_engine: 'LLM local',

    launcher_title: 'Paramètres',
    launcher_subtitle: 'Mesa 3 · Ollama · 11 pays calibrés',
    label_proposal: 'Proposition',
    label_horizon: 'Horizon temporel',
    label_population: 'Population simulée',
    label_scenario: 'Scénario',
    label_seed: 'Graine aléatoire',
    seed_random: 'Graine aléatoire',
    btn_run: 'Lancer la simulation',
    btn_running: 'Simulation en cours…',

    scenario_pessimistic: 'Pessimiste',
    scenario_baseline: 'Baseline',
    scenario_optimistic: 'Optimiste',
    scenario_hint_pessimistic: 'Effets positifs ×0.7 — calibrage conservateur',
    scenario_hint_baseline: 'Effets calibrés sur données historiques',
    scenario_hint_optimistic: 'Effets positifs ×1.3 — calibrage favorable',

    agents_fast: 'rapide',
    agents_recommended: 'recommandé',
    agents_precise: 'précis',

    tab_economic: 'Économie',
    tab_environment: 'Environnement',
    tab_society: 'Société',

    metric_gdp: 'PIB / agent',
    metric_gini: 'Gini',
    metric_employment: 'Emploi',
    metric_poverty: 'Pauvreté',
    metric_wellbeing: 'Bien-être',
    metric_carbon: 'Empreinte carbone',
    metric_green: 'Comportements verts',
    metric_health: 'Santé',
    metric_trust: 'Confiance sociale',

    chart_without: 'Sans politique',
    chart_with: 'Avec politique',

    decile_table_title: 'Impact par décile de revenus (année finale)',
    col_decile: 'Décile',
    col_income: 'Revenu',
    col_employment: 'Emploi',
    col_wellbeing: 'Bien-être',
    col_carbon: 'Carbone',

    ai_title: 'Analyse IA',
    ai_idle: "Cliquez sur « Interpréter » pour que le modèle local Ollama analyse les résultats.",
    ai_btn: '✨ Interpréter les résultats',
    ai_regenerate: 'Régénérer',
    ai_loading: 'Génération en cours…',
    ai_error_prefix: 'Erreur :',

    ready_title: 'Prêt à simuler',
    ready_subtitle: 'Choisissez une proposition, configurez les paramètres et lancez une simulation.',
    how_demo: 'Démographie',
    how_demo_detail: 'Profils calibrés sur WID.world, ILO, Banque Mondiale',
    how_llm: 'LLM parser',
    how_llm_detail: 'Ollama extrait les paramètres numériques du texte de la proposition',
    how_ab: 'Test A/B',
    how_ab_detail: 'Groupe contrôle vs traitement en parallèle',

    mc_title: 'Monte Carlo',
    mc_subtitle: "Lancez N simulations avec des graines différentes pour visualiser les plages d'incertitude.",
    mc_runs: 'Nombre de simulations',
    mc_btn: 'Lancer le Monte Carlo',
    mc_running: 'Monte Carlo en cours…',
    mc_chart_mean: 'Moyenne',
    mc_chart_band: 'Intervalle P5–P95',
    mc_summary_title: 'Distribution des résultats (année finale)',
    mc_mean: 'Moyenne',
    mc_std: 'Écart-type',
    mc_p5: 'P5',
    mc_p95: 'P95',
  },

  errors: {
    api_offline: 'API inaccessible — lancez le serveur avec ./start.sh',
    generic: 'Une erreur est survenue.',
  },

  footer: {
    tagline: 'Open Source Political Program',
    license: 'Licence MIT',
    github: 'GitHub',
  },
} as const

export type Translations = typeof fr
