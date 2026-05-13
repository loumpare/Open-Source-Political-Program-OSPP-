import type { Translations } from './fr'

export const de: Translations = {
  lang: 'de',

  nav: {
    home: 'Startseite',
    proposals: 'Vorschläge',
    simulation: 'Simulation',
  },

  home: {
    hero_title: 'Demokratie, neu gedacht',
    hero_subtitle:
      'Entdecken Sie wissenschaftlich fundierte Politikvorschläge, stimmen Sie als Bürger ab '
      + 'und simulieren Sie deren Auswirkungen auf eine virtuelle Welt digitaler Zwillinge.',
    cta_proposals: 'Vorschläge erkunden',
    cta_simulate: 'Simulation starten',
    stats_proposals: 'Vorschläge',
    stats_countries: 'Länder',
    stats_sources: 'wissenschaftliche Quellen',
    stats_domains: 'Bereiche',
    section_featured: 'Ausgewählte Vorschläge',
    section_how: 'So funktioniert es',
    how_1_title: 'Wissenschaftlich fundierte Vorschläge',
    how_1_body: 'Jede Maßnahme wird durch Hunderte von Fachartikeln gestützt und anhand realer Daten kalibriert.',
    how_2_title: 'Anonyme Bürgerabstimmung',
    how_2_body: 'Äußern Sie Ihre Unterstützung oder Ablehnung. Stimmen werden anonym per SHA-256 gespeichert.',
    how_3_title: 'ABM-Simulation',
    how_3_body: 'Ein Mesa-3-Engine simuliert wirtschaftliche, soziale und ökologische Auswirkungen auf kalibrierte Bevölkerungen.',
    view_all: 'Alle Vorschläge anzeigen',
  },

  proposals: {
    page_title: 'Politische Vorschläge',
    page_subtitle:
      'Wissenschaftlich fundierte Vorschläge, geordnet nach Land und Bereich.',
    search_placeholder: 'Vorschläge suchen…',
    filter_all: 'Alle',
    filter_country: 'Land',
    filter_domain: 'Bereich',
    sort_label: 'Sortieren nach',
    sort_recent: 'Neueste',
    sort_support: 'Meiste Unterstützung',
    sort_az: 'A → Z',
    results_count: (n: number) => `${n} Vorschlag${n !== 1 ? 'schläge' : ''} gefunden`,
    no_results: 'Keine Vorschläge entsprechen diesen Filtern.',
    sources_badge: (n: number) => `${n} Quellen`,
    vote_support: 'Unterstützen',
    vote_oppose: 'Ablehnen',
    votes_total: (n: number) => `${n.toLocaleString('de-DE')} Stimmen`,
  },

  domains: {
    economy: 'Wirtschaft',
    education: 'Bildung',
    environment: 'Umwelt',
    social: 'Soziales',
    health: 'Gesundheit',
    governance: 'Governance',
  },

  proposal_detail: {
    back: '← Zurück zu den Vorschlägen',
    tab_overview: 'Übersicht',
    tab_evidence: 'Belege',
    tab_simulation: 'Simulation',
    vote_title: 'Ihre Stimme',
    vote_support: 'Ich unterstütze',
    vote_oppose: 'Ich lehne ab',
    vote_undo: 'Rückgängig',
    support_pct: (p: number) => `${p}% Zustimmung`,
    ask_placeholder: 'Stellen Sie eine Frage zu diesem Vorschlag…',
    ask_button: 'Fragen',
    sources_toggle_show: 'Quellen anzeigen',
    sources_toggle_hide: 'Quellen ausblenden',
  },

  simulation: {
    page_title: 'Virtuelle Welt der digitalen Zwillinge',
    page_subtitle:
      'Simulieren Sie die Auswirkungen einer Maßnahme auf eine realistische Bevölkerung — '
      + 'wirtschaftlich, sozial und ökologisch.',
    badge_phase: 'Phase 2 — Simulation',
    badge_tech: 'Mesa 3 · ABM',
    stat_countries: 'kalibrierte Länder',
    stat_agents: 'max. Agenten',
    stat_metrics: 'Metriken',
    stat_engine: 'Lokales LLM',

    launcher_title: 'Parameter',
    launcher_subtitle: 'Mesa 3 · Ollama · 11 kalibrierte Länder',
    label_proposal: 'Vorschlag',
    label_horizon: 'Zeithorizont',
    label_population: 'Simulierte Bevölkerung',
    label_scenario: 'Szenario',
    label_seed: 'Zufallssaat',
    seed_random: 'Zufällige Saat',
    btn_run: 'Simulation starten',
    btn_running: 'Simuliert…',

    scenario_pessimistic: 'Pessimistisch',
    scenario_baseline: 'Baseline',
    scenario_optimistic: 'Optimistisch',
    scenario_hint_pessimistic: 'Positive Effekte ×0.7 — konservative Kalibrierung',
    scenario_hint_baseline: 'Auf historischen Daten kalibrierte Effekte',
    scenario_hint_optimistic: 'Positive Effekte ×1.3 — günstige Kalibrierung',

    agents_fast: 'schnell',
    agents_recommended: 'empfohlen',
    agents_precise: 'präzise',

    tab_economic: 'Wirtschaft',
    tab_environment: 'Umwelt',
    tab_society: 'Gesellschaft',

    metric_gdp: 'BIP / Agent',
    metric_gini: 'Gini',
    metric_employment: 'Beschäftigung',
    metric_poverty: 'Armut',
    metric_wellbeing: 'Wohlbefinden',
    metric_carbon: 'CO₂-Fußabdruck',
    metric_green: 'Grünes Verhalten',
    metric_health: 'Gesundheit',
    metric_trust: 'Soziales Vertrauen',

    chart_without: 'Ohne Maßnahme',
    chart_with: 'Mit Maßnahme',

    decile_table_title: 'Auswirkung nach Einkommensdezil (letztes Jahr)',
    col_decile: 'Dezil',
    col_income: 'Einkommen',
    col_employment: 'Beschäftigung',
    col_wellbeing: 'Wohlbefinden',
    col_carbon: 'CO₂',

    ai_title: 'KI-Analyse',
    ai_idle: 'Klicken Sie auf „Interpretieren", damit das lokale Ollama-Modell die Ergebnisse analysiert.',
    ai_btn: '✨ Ergebnisse interpretieren',
    ai_regenerate: 'Neu generieren',
    ai_loading: 'Wird generiert…',
    ai_error_prefix: 'Fehler:',

    ready_title: 'Bereit zur Simulation',
    ready_subtitle: 'Wählen Sie einen Vorschlag, konfigurieren Sie die Parameter und starten Sie eine Simulation.',
    how_demo: 'Demografie',
    how_demo_detail: 'Profile kalibriert auf WID.world, ILO, Weltbank',
    how_llm: 'LLM-Parser',
    how_llm_detail: 'Ollama extrahiert numerische Parameter aus dem Vorschlagstext',
    how_ab: 'A/B-Test',
    how_ab_detail: 'Kontrollgruppe vs. Behandlungsgruppe parallel',

    mc_title: 'Monte Carlo',
    mc_subtitle: 'Führen Sie N Simulationen mit verschiedenen Saaten aus, um Unsicherheitsbereiche zu visualisieren.',
    mc_runs: 'Anzahl der Durchläufe',
    mc_btn: 'Monte Carlo starten',
    mc_running: 'Monte Carlo läuft…',
    mc_chart_mean: 'Mittelwert',
    mc_chart_band: 'P5–P95-Band',
    mc_summary_title: 'Ergebnisverteilung (letztes Jahr)',
    mc_mean: 'Mittelwert',
    mc_std: 'Standardabw.',
    mc_p5: 'P5',
    mc_p95: 'P95',
  },

  errors: {
    api_offline: 'API nicht erreichbar — starten Sie den Server mit ./start.sh',
    generic: 'Ein Fehler ist aufgetreten.',
  },

  footer: {
    tagline: 'Open Source Political Program',
    license: 'MIT-Lizenz',
    github: 'GitHub',
  },
}
