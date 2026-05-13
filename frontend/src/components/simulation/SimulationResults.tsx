import { useState, useEffect, useRef } from 'react'
import TimelineChart from './TimelineChart'
import { API_BASE } from '../../config'
import { useLanguage } from '../../i18n'

const API = API_BASE

/* ── Types ─────────────────────────────────────────────────────────────────── */

interface SeriesPoint {
  year: number
  gdp_control: number; gdp_policy: number; gdp_delta_pct: number
  gini_control: number; gini_policy: number; gini_delta: number
  employment_control: number; employment_policy: number; employment_delta: number
  poverty_control: number; poverty_policy: number; poverty_delta: number
  carbon_control: number; carbon_policy: number; carbon_delta_pct: number
  green_control: number; green_policy: number; green_delta: number
  wellbeing_control: number; wellbeing_policy: number; wellbeing_delta: number
  trust_control: number; trust_policy: number; trust_delta: number
  education_control: number; education_policy: number; education_delta: number
  health_control: number; health_policy: number; health_delta: number
  governance_control: number; governance_policy: number; governance_delta: number
}

interface SimResults {
  meta: {
    proposal_id: string; title: string; country: string
    n_agents: number; horizon_years: number
    scenario?: string; poverty_line_eur?: number
  }
  summary: {
    gdp_delta_pct: number; gini_delta: number
    employment_delta: number; poverty_delta: number
    wellbeing_delta: number; carbon_delta_pct: number
    green_delta: number; health_delta: number
    education_delta: number; governance_delta: number
    trust_delta: number; effect_description: string
  }
  series: SeriesPoint[]
  demographics: Record<string, {
    n: number; mean_income: number; employment_rate: number
    mean_wellbeing: number; mean_carbon: number
    mean_health: number; mean_education?: number; mean_governance?: number
  }>
}

/* ── Delta chip ─────────────────────────────────────────────────────────────── */

function DeltaChip({
  value, unit = '', positiveGood = true, size = 'md',
}: {
  value: number; unit?: string; positiveGood?: boolean; size?: 'sm' | 'md' | 'lg'
}) {
  const good = positiveGood ? value >= 0 : value <= 0
  const sign = value >= 0 ? '+' : ''
  const cls  = good
    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
    : 'bg-rose-50 text-rose-700 border-rose-200'
  const sz = size === 'lg' ? 'text-2xl font-bold px-3 py-1'
           : size === 'sm' ? 'text-xs px-2 py-0.5'
           : 'text-base font-semibold px-2.5 py-0.5'
  return (
    <span className={`inline-block rounded-full border ${cls} ${sz} tabular-nums`}>
      {sign}{value.toFixed(size === 'lg' ? 2 : 3)}{unit}
    </span>
  )
}

/* ── AI Interpretation ─────────────────────────────────────────────────────── */

function AIInterpretation({ results }: { results: SimResults }) {
  const { t } = useLanguage()
  const [text, setText]     = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const abortRef            = useRef<(() => void) | null>(null)

  useEffect(() => { return () => { abortRef.current?.() } }, [])

  async function run() {
    setText(''); setStatus('loading')
    let done = false
    try {
      const res = await fetch(`${API}/simulate/interpret`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ summary: results.summary, meta: results.meta }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const reader  = res.body!.getReader()
      const decoder = new TextDecoder()
      abortRef.current = () => { done = true; reader.cancel() }
      while (!done) {
        const { value, done: sd } = await reader.read()
        if (sd) break
        for (const line of decoder.decode(value).split('\n')) {
          if (!line.startsWith('data:')) continue
          try {
            const obj = JSON.parse(line.slice(5).trim())
            if (obj.type === 'text')  setText(p => p + obj.text)
            if (obj.type === 'error') { setStatus('error'); setText(obj.message); return }
            if (obj.type === 'done')  { setStatus('done'); return }
          } catch { /* partial */ }
        }
      }
      setStatus('done')
    } catch (e) {
      setStatus('error')
      setText(e instanceof Error ? e.message : t.simulation.error_unknown)
    }
  }

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs">✦</div>
          <h4 className="font-semibold text-indigo-900">{t.simulation.ai_title}</h4>
          <span className="text-xs bg-white text-indigo-600 border border-indigo-200 rounded-full px-2 py-0.5">
            Ollama · qwen2.5:7b
          </span>
        </div>
        {status === 'idle' && (
          <button onClick={run}
            className="text-xs bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 font-medium">
            {t.simulation.ai_btn}
          </button>
        )}
        {status === 'done' && (
          <button onClick={() => { setText(''); setStatus('idle') }}
            className="text-xs text-indigo-600 hover:text-indigo-800 underline">
            {t.simulation.ai_regenerate}
          </button>
        )}
      </div>
      {status === 'idle' && (
        <p className="text-sm text-indigo-700/70 italic">{t.simulation.ai_idle}</p>
      )}
      {status === 'loading' && !text && (
        <div className="flex items-center gap-2 text-sm text-indigo-700">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25"/>
            <path fill="currentColor" className="opacity-75" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
          </svg>
          {t.simulation.ai_loading}
        </div>
      )}
      {(status === 'loading' || status === 'done') && text && (
        <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
          {text}
          {status === 'loading' && (
            <span className="inline-block w-0.5 h-4 bg-indigo-500 animate-pulse ml-0.5 align-middle"/>
          )}
        </div>
      )}
      {status === 'error' && <p className="text-sm text-rose-600">{text}</p>}
    </div>
  )
}

/* ── Main ───────────────────────────────────────────────────────────────────── */

type Tab = 'economic' | 'education' | 'environment' | 'society' | 'governance'

export default function SimulationResults({ results }: { results: SimResults }) {
  const { t } = useLanguage()
  const [tab, setTab] = useState<Tab>('economic')
  const { meta, summary, series } = results

  const scenarioLabel: Record<string, string> = {
    optimistic:  t.simulation.scenario_optimistic,
    baseline:    t.simulation.scenario_baseline,
    pessimistic: t.simulation.scenario_pessimistic,
  }
  const scenarioBadge: Record<string, string> = {
    optimistic:  'bg-emerald-50 text-emerald-700 border-emerald-200',
    baseline:    'bg-slate-50 text-slate-600 border-slate-200',
    pessimistic: 'bg-rose-50 text-rose-700 border-rose-200',
  }

  const TABS: { id: Tab; icon: string; label: string }[] = [
    { id: 'economic',     icon: '📈', label: t.simulation.tab_economic },
    { id: 'education',    icon: '🎓', label: t.simulation.tab_education },
    { id: 'environment',  icon: '🌱', label: t.simulation.tab_environment },
    { id: 'society',      icon: '🤝', label: t.simulation.tab_society },
    { id: 'governance',   icon: '🏛', label: t.simulation.tab_governance },
  ]

  const sc = meta.scenario ?? 'baseline'

  const mk = (ctrl: keyof SeriesPoint, pol: keyof SeriesPoint, scale = 1) =>
    series.map(s => ({
      year:    s.year,
      control: (s[ctrl] as number) * scale,
      policy:  (s[pol]  as number) * scale,
    }))

  // Top-level KPI bar (one per domain)
  const KPI = [
    { label: t.simulation.metric_gdp,        v: summary.gdp_delta_pct,       u: '%',   g: true  },
    { label: t.simulation.metric_education,   v: summary.education_delta*100,  u: ' pp', g: true  },
    { label: t.simulation.metric_carbon,      v: summary.carbon_delta_pct,    u: '%',   g: false },
    { label: t.simulation.metric_wellbeing,   v: summary.wellbeing_delta*100, u: ' pp', g: true  },
    { label: t.simulation.metric_health,      v: summary.health_delta*100,    u: ' pp', g: true  },
    { label: t.simulation.metric_governance,  v: summary.governance_delta*100,u: ' pp', g: true  },
  ]

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="font-bold text-slate-800 text-base leading-snug">{meta.title}</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {meta.country.toUpperCase()} · {meta.n_agents.toLocaleString()} agents
              · {t.simulation.years_suffix(meta.horizon_years)}
              {meta.poverty_line_eur && (
                <span className="ml-2 text-slate-400">
                  · {t.simulation.poverty_line_note(meta.poverty_line_eur)}
                </span>
              )}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${scenarioBadge[sc]}`}>
              {scenarioLabel[sc]}
            </span>
            <span className="text-xs bg-indigo-50 text-indigo-700 border border-indigo-200 px-2.5 py-1 rounded-full">
              {meta.proposal_id}
            </span>
          </div>
        </div>
        {summary.effect_description && (
          <p className="mt-3 text-xs text-slate-500 italic border-l-2 border-indigo-200 pl-3">
            {summary.effect_description}
          </p>
        )}
      </div>

      {/* 6-domain KPI bar */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
        {KPI.map(k => (
          <button key={k.label}
            onClick={() => {
              // map KPI to matching tab
              if (k.label === t.simulation.metric_gdp) setTab('economic')
              else if (k.label === t.simulation.metric_education) setTab('education')
              else if (k.label === t.simulation.metric_carbon) setTab('environment')
              else if (k.label === t.simulation.metric_wellbeing) setTab('society')
              else if (k.label === t.simulation.metric_health) setTab('society')
              else if (k.label === t.simulation.metric_governance) setTab('governance')
            }}
            className="bg-white rounded-xl border border-slate-200 p-3 text-center shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="text-xs text-slate-500 mb-1.5 truncate">{k.label}</div>
            <DeltaChip value={k.v} unit={k.u} positiveGood={k.g} size="md" />
          </button>
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Tab bar */}
        <div className="flex border-b border-slate-100 overflow-x-auto">
          {TABS.map(tb => (
            <button key={tb.id} onClick={() => setTab(tb.id)}
              className={`flex-1 min-w-0 py-2.5 text-xs font-medium transition-colors
                flex items-center justify-center gap-1 px-2
                ${tab === tb.id
                  ? 'text-indigo-700 border-b-2 border-indigo-500 bg-indigo-50/50'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
            >
              <span>{tb.icon}</span>
              <span className="hidden sm:inline truncate">{tb.label}</span>
            </button>
          ))}
        </div>

        <div className="p-5 space-y-5">

          {/* ── 📈 Économie ── */}
          {tab === 'economic' && <>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: t.simulation.metric_gdp,        v: summary.gdp_delta_pct,         u: '%',   g: true  },
                { label: t.simulation.metric_gini,       v: summary.gini_delta,             u: '',    g: false },
                { label: t.simulation.metric_employment, v: summary.employment_delta*100,   u: ' pp', g: true  },
                { label: t.simulation.metric_poverty,    v: summary.poverty_delta*100,      u: ' pp', g: false },
              ].map(k => (
                <div key={k.label} className="bg-slate-50 rounded-xl p-3">
                  <div className="text-xs text-slate-500 mb-0.5">{k.label}</div>
                  <DeltaChip value={k.v} unit={k.u} positiveGood={k.g} size="lg" />
                </div>
              ))}
            </div>
            <TimelineChart data={mk('gdp_control','gdp_policy')}
              label={t.simulation.chart_income} color="#6366f1"
              formatY={v => `${Math.round(v)}€`} />
            <TimelineChart data={mk('gini_control','gini_policy')}
              label={t.simulation.metric_gini} color="#f59e0b"
              formatY={v => v.toFixed(3)} />
            <TimelineChart data={mk('employment_control','employment_policy',100)}
              label={`${t.simulation.metric_employment} (%)`} color="#10b981"
              formatY={v => `${v.toFixed(1)}%`} />
            <TimelineChart data={mk('poverty_control','poverty_policy',100)}
              label={`${t.simulation.metric_poverty} (%)`} color="#f43f5e"
              formatY={v => `${v.toFixed(1)}%`} />
            {/* Decile table */}
            <div>
              <h5 className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">
                {t.simulation.decile_table_title}
              </h5>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="text-slate-400 border-b border-slate-100">
                      <th className="pb-1.5 pr-3">{t.simulation.col_decile}</th>
                      <th className="pb-1.5 pr-3 text-right">{t.simulation.col_income}</th>
                      <th className="pb-1.5 pr-3 text-right">{t.simulation.col_employment}</th>
                      <th className="pb-1.5 pr-3 text-right">{t.simulation.col_wellbeing}</th>
                      <th className="pb-1.5 text-right">{t.simulation.col_carbon}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(results.demographics).map(([dec, d]) => (
                      <tr key={dec} className="border-b border-slate-50 hover:bg-slate-50">
                        <td className="py-1 pr-3 font-medium text-slate-700">D{+dec + 1}</td>
                        <td className="py-1 pr-3 text-right tabular-nums">
                          {d.mean_income.toLocaleString(undefined, {maximumFractionDigits: 0})}€
                        </td>
                        <td className="py-1 pr-3 text-right tabular-nums">
                          {(d.employment_rate * 100).toFixed(1)}%
                        </td>
                        <td className="py-1 pr-3 text-right tabular-nums">
                          {(d.mean_wellbeing * 100).toFixed(1)}%
                        </td>
                        <td className="py-1 text-right tabular-nums">
                          {d.mean_carbon.toFixed(1)} t
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>}

          {/* ── 🎓 Éducation ── */}
          {tab === 'education' && <>
            <div className="grid grid-cols-1 gap-3">
              <div className="bg-amber-50 rounded-xl p-4">
                <div className="text-xs text-amber-700 mb-1">{t.simulation.metric_education}</div>
                <DeltaChip value={summary.education_delta*100} unit=" pp" positiveGood size="lg" />
                <p className="text-xs text-amber-600 mt-1.5">
                  {t.simulation.avg_score_01} — {t.simulation.vs_control}
                </p>
              </div>
            </div>
            <TimelineChart data={mk('education_control','education_policy',100)}
              label={`${t.simulation.metric_education} (%)`} color="#f59e0b"
              formatY={v => `${v.toFixed(1)}%`} />
            {/* Decile education table */}
            {Object.values(results.demographics).some(d => d.mean_education != null) && (
              <div>
                <h5 className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">
                  {t.simulation.col_education} — {t.simulation.decile_table_title}
                </h5>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="text-slate-400 border-b border-slate-100">
                        <th className="pb-1.5 pr-3">{t.simulation.col_decile}</th>
                        <th className="pb-1.5 pr-3 text-right">{t.simulation.col_income}</th>
                        <th className="pb-1.5 text-right">{t.simulation.col_education}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(results.demographics).map(([dec, d]) => (
                        <tr key={dec} className="border-b border-slate-50 hover:bg-slate-50">
                          <td className="py-1 pr-3 font-medium text-slate-700">D{+dec + 1}</td>
                          <td className="py-1 pr-3 text-right tabular-nums">
                            {d.mean_income.toLocaleString(undefined, {maximumFractionDigits: 0})}€
                          </td>
                          <td className="py-1 text-right tabular-nums">
                            {d.mean_education != null
                              ? `${(d.mean_education * 100).toFixed(1)}%`
                              : '—'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            <div className="bg-slate-50 rounded-xl p-4 text-xs text-slate-600 space-y-1">
              <p className="font-medium text-slate-700">{t.simulation.methodology_title}</p>
              <p>Mincer equation: +3–8% income per additional year of schooling (OECD EAG 2024).
                 UNESCO HDI composite: literacy rate × enrolment × years of schooling.</p>
            </div>
          </>}

          {/* ── 🌱 Environnement ── */}
          {tab === 'environment' && <>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-emerald-50 rounded-xl p-3">
                <div className="text-xs text-emerald-700 mb-0.5">{t.simulation.metric_carbon}</div>
                <DeltaChip value={summary.carbon_delta_pct} unit="%" positiveGood={false} size="lg" />
                <p className="text-xs text-emerald-600 mt-1">{t.simulation.vs_control}</p>
              </div>
              <div className="bg-emerald-50 rounded-xl p-3">
                <div className="text-xs text-emerald-700 mb-0.5">{t.simulation.metric_green}</div>
                <DeltaChip value={summary.green_delta*100} unit=" pp" positiveGood size="lg" />
                <p className="text-xs text-emerald-600 mt-1">{t.simulation.avg_score_01}</p>
              </div>
            </div>
            <TimelineChart data={mk('carbon_control','carbon_policy')}
              label={t.simulation.chart_carbon_full} color="#10b981"
              formatY={v => `${v.toFixed(2)} t`} />
            <TimelineChart data={mk('green_control','green_policy',100)}
              label={`${t.simulation.metric_green} (%)`} color="#34d399"
              formatY={v => `${v.toFixed(1)}%`} />
            <div className="bg-slate-50 rounded-xl p-4 text-xs text-slate-600 space-y-1">
              <p className="font-medium text-slate-700">{t.simulation.methodology_title}</p>
              <p>{t.simulation.methodology_env}</p>
            </div>
          </>}

          {/* ── 🤝 Société & Santé ── */}
          {tab === 'society' && <>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: t.simulation.metric_wellbeing, v: summary.wellbeing_delta*100, g: true  },
                { label: t.simulation.metric_trust,     v: summary.trust_delta*100,     g: true  },
                { label: t.simulation.metric_health,    v: summary.health_delta*100,    g: true  },
                { label: t.simulation.metric_poverty,   v: summary.poverty_delta*100,   g: false },
              ].map(k => (
                <div key={k.label} className="bg-blue-50 rounded-xl p-3">
                  <div className="text-xs text-blue-700 mb-0.5">{k.label}</div>
                  <DeltaChip value={k.v} unit=" pp" positiveGood={k.g} size="lg" />
                </div>
              ))}
            </div>
            <TimelineChart data={mk('wellbeing_control','wellbeing_policy',100)}
              label={`${t.simulation.metric_wellbeing} (%)`} color="#06b6d4"
              formatY={v => `${v.toFixed(1)}%`} />
            <TimelineChart data={mk('health_control','health_policy',100)}
              label={`${t.simulation.metric_health} (%)`} color="#3b82f6"
              formatY={v => `${v.toFixed(1)}%`} />
            <TimelineChart data={mk('trust_control','trust_policy',100)}
              label={`${t.simulation.metric_trust} (%)`} color="#8b5cf6"
              formatY={v => `${v.toFixed(1)}%`} />
            <div className="bg-slate-50 rounded-xl p-4 text-xs text-slate-600 space-y-1">
              <p className="font-medium text-slate-700">{t.simulation.sources_social_title}</p>
              <p>{t.simulation.sources_social_body}</p>
            </div>
          </>}

          {/* ── 🏛 Gouvernance ── */}
          {tab === 'governance' && <>
            <div className="grid grid-cols-1 gap-3">
              <div className="bg-violet-50 rounded-xl p-4">
                <div className="text-xs text-violet-700 mb-1">{t.simulation.metric_governance}</div>
                <DeltaChip value={summary.governance_delta*100} unit=" pp" positiveGood size="lg" />
                <p className="text-xs text-violet-600 mt-1.5">
                  Helliwell et al. (2018) — {t.simulation.vs_control}
                </p>
              </div>
            </div>
            <TimelineChart data={mk('governance_control','governance_policy',100)}
              label={`${t.simulation.metric_governance} (%)`} color="#7c3aed"
              formatY={v => `${v.toFixed(1)}%`} />
            <div className="bg-slate-50 rounded-xl p-4 text-xs text-slate-600 space-y-1">
              <p className="font-medium text-slate-700">{t.simulation.methodology_title}</p>
              <p>Helliwell et al. (2018): trust in institutions correlated with collectivism
                 (Hofstede) and inequality (Gini). OECD Government at a Glance 2023:
                 direct policy effects on institutional legitimacy.
                 World Values Survey calibration per country.</p>
            </div>
          </>}
        </div>
      </div>

      {/* AI interpretation */}
      <AIInterpretation results={results} />
    </div>
  )
}
