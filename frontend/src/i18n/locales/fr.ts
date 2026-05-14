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
    metric_education: 'Score éducation',
    metric_governance: 'Confiance institutionnelle',
    metric_wealth_gini: 'Gini patrimonial',
    metric_mortality: 'Risque mortalité',
    metric_gender_equality: 'Égalité des genres',
    metric_discrimination: 'Score anti-discrimination',
    metric_social_mobility: 'Mobilité sociale',
    chart_wealth_gini: 'Gini patrimonial (héritage, capital)',
    chart_mortality: 'Risque mortalité (‰/an)',
    chart_gender_equality: 'Indice égalité des genres (%)',
    chart_discrimination: 'Score anti-discrimination (%)',
    chart_social_mobility: 'Mobilité sociale intergénérationnelle (%)',
    wealth_gini_note_title: 'Gini revenus vs Gini patrimoine',
    wealth_gini_note_body: "Le Gini revenus mesure l'inégalité salariale. Le Gini patrimoine mesure la concentration des actifs — toujours plus élevé (France ≈ 0,65 vs 0,29 pour les revenus). La taxe sur la fortune réduit principalement le Gini patrimonial. Sources : Piketty (2014), Crédit Suisse Global Wealth Report 2023.",
    tab_education: 'Éducation',
    tab_governance: 'Gouvernance',

    chart_without: 'Sans politique',
    chart_with: 'Avec politique',

    decile_table_title: 'Impact par décile de revenus (année finale)',
    col_decile: 'Décile',
    col_income: 'Revenu',
    col_employment: 'Emploi',
    col_wellbeing: 'Bien-être',
    col_carbon: 'Carbone',
    col_education: 'Éducation',
    col_governance: 'Gouvernance',
    poverty_line_note: (n: number) => `Seuil de pauvreté absolu : ${n.toLocaleString('fr-FR')} €/mois`,

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

    // chart axis labels
    chart_yearly: 'Évolution temporelle',
    chart_income: 'Revenu mensuel moyen (€)',
    chart_carbon_full: "Empreinte carbone (tCO₂/agent/an)",
    vs_control: 'vs groupe contrôle',
    avg_score_01: 'score 0–1',
    years_suffix: (n: number) => `${n} an${n > 1 ? 's' : ''}`,
    year_min: '1 an',
    year_max: '20 ans',
    agents_per_run: 'agents/run',
    runs_label: 'runs',
    error_unknown: 'Erreur inconnue',

    // methodology notes
    methodology_title: 'Méthode de calcul',
    methodology_env:
      "Empreinte carbone calibrée sur les moyennes nationales (GCP 2024), "
      + "modulée par décile de revenus et secteur (industrie ×1.55, services publics ×0.80). "
      + "Les hausses de revenus induisent un effet rebond (+30 % du gain).",
    sources_social_title: 'Sources des calibrations sociales',
    sources_social_body:
      "Score de santé : revenu + emploi + âge + accessibilité du système (OMS 2024). "
      + "Confiance sociale : index de collectivisme de Hofstede (World Values Survey).",
    // Monte Carlo extras
    mc_ci_title: 'Évolution avec intervalles de confiance',
    mc_ci_note: (n: number) => `bande P5–P95 sur ${n} runs`,
    mc_interp_title: 'Interprétation statistique',
    mc_interp_body: (n: number) =>
      `La bande colorée représente l'intervalle P5–P95 — 90 % des ${n} simulations tombent dans cette zone. `
      + "Des bandes larges signalent une forte stochasticité ; des bandes étroites indiquent des résultats robustes.",

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
