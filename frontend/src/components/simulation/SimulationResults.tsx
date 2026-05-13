import { useState, useEffect, useRef } from 'react'
import TimelineChart from './TimelineChart'

const API = 'http://127.0.0.1:8001'

/* ── Types ─────────────────────────────────────────────────────────────────── */

interface SeriesPoint {
  year: number
  gdp_control: number; gdp_policy: number
  gini_control: number; gini_policy: number
  employment_control: number; employment_policy: number
  poverty_control: number; poverty_policy: number
  wellbeing_control: number; wellbeing_policy: number
  carbon_control: number; carbon_policy: number
  green_control: number; green_policy: number
  health_control: number; health_policy: number
  trust_control: number; trust_policy: number
}

interface SimResults {
  meta: {
    proposal_id: string; title: string; country: string
    n_agents: number; horizon_years: number; scenario?: string
  }
  summary: {
    gdp_delta_pct: number; gini_delta: number
    employment_delta: number; poverty_delta: number
    wellbeing_delta: number; carbon_delta_pct: number
    green_delta: number; health_delta: number
    trust_delta: number; effect_description: string
  }
  series: SeriesPoint[]
  demographics: Record<string, {
    n: number; mean_income: number; employment_rate: number
    mean_wellbeing: number; mean_carbon: number
    mean_health: number; mean_trust: number
  }>
}

/* ── Small helpers ─────────────────────────────────────────────────────────── */

function DeltaChip({ value, unit = '', positiveGood = true, size = 'md' }: {
  value: number; unit?: string; positiveGood?: boolean; size?: 'sm' | 'md' | 'lg'
}) {
  const good = positiveGood ? value >= 0 : value <= 0
  const sign = value >= 0 ? '+' : ''
  const cls = good
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
  const [text, setText]     = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const abortRef            = useRef<(() => void) | null>(null)

  useEffect(() => {
    return () => { abortRef.current?.() }
  }, [])

  async function runInterpretation() {
    setText(''); setStatus('loading')
    let done = false

    try {
      const res = await fetch(`${API}/simulate/interpret`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ summary: results.summary, meta: results.meta }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      const reader = res.body!.getReader()
      const decoder = new TextDecoder()
      abortRef.current = () => { done = true; reader.cancel() }

      while (!done) {
        const { value, done: streamDone } = await reader.read()
        if (streamDone) break
        const chunk = decoder.decode(value)
        for (const line of chunk.split('\n')) {
          if (!line.startsWith('data:')) continue
          try {
            const obj = JSON.parse(line.slice(5).trim())
            if (obj.type === 'text')  setText(t => t + obj.text)
            if (obj.type === 'error') { setStatus('error'); setText(obj.message); return }
            if (obj.type === 'done')  { setStatus('done'); return }
          } catch { /* partial line */ }
        }
      }
      setStatus('done')
    } catch (e) {
      setStatus('error')
      setText(e instanceof Error ? e.message : 'Erreur inconnue')
    }
  }

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
            </svg>
          </div>
          <h4 className="font-semibold text-indigo-900">Analyse IA</h4>
          <span className="text-xs bg-white text-indigo-600 border border-indigo-200 rounded-full px-2 py-0.5">
            Ollama · {import.meta.env.VITE_OLLAMA_MODEL ?? 'qwen2.5:7b'}
          </span>
        </div>
        {status === 'idle' && (
          <button
            onClick={runInterpretation}
            className="text-xs bg-indigo-600 text-white px-4 py-2 rounded-lg
                       hover:bg-indigo-700 transition-colors font-medium"
          >
            ✨ Interpréter les résultats
          </button>
        )}
        {status === 'done' && (
          <button
            onClick={() => { setText(''); setStatus('idle') }}
            className="text-xs text-indigo-600 hover:text-indigo-800 underline"
          >
            Régénérer
          </button>
        )}
      </div>

      {status === 'idle' && (
        <p className="text-sm text-indigo-700/70 italic">
          Cliquez sur « Interpréter » pour que le modèle local Ollama analyse
          les résultats et génère un rapport narratif.
        </p>
      )}

      {status === 'loading' && !text && (
        <div className="flex items-center gap-2 text-sm text-indigo-700">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25"/>
            <path fill="currentColor" className="opacity-75" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
          </svg>
          Génération en cours…
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

      {status === 'error' && (
        <p className="text-sm text-rose-600">{text}</p>
      )}
    </div>
  )
}

/* ── Tab icons ─────────────────────────────────────────────────────────────── */

const TAB_ICONS = {
  economic:    '📈',
  environment: '🌱',
  society:     '🤝',
}

/* ── Main component ────────────────────────────────────────────────────────── */

export default function SimulationResults({ results }: { results: SimResults }) {
  const [tab, setTab] = useState<'economic' | 'environment' | 'society'>('economic')
  const { meta, summary, series } = results

  const scenarioLabel: Record<string, string> = {
    optimistic: 'Optimiste', baseline: 'Baseline', pessimistic: 'Pessimiste',
  }
  const scenarioBadge: Record<string, string> = {
    optimistic: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    baseline:   'bg-slate-50 text-slate-600 border-slate-200',
    pessimistic:'bg-rose-50 text-rose-700 border-rose-200',
  }

  const sc = meta.scenario ?? 'baseline'

  // Build typed data arrays
  const mk = (ctrl: keyof SeriesPoint, pol: keyof SeriesPoint, scale = 1) =>
    series.map(s => ({
      year: s.year,
      control: (s[ctrl] as number) * scale,
      policy:  (s[pol]  as number) * scale,
    }))

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="font-bold text-slate-800 text-base leading-snug">{meta.title}</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {meta.country.toUpperCase()} · {meta.n_agents.toLocaleString('fr-FR')} agents
              · {meta.horizon_years} ans
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

      {/* KPI summary row */}
      <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
        {[
          { label: 'PIB/agent',  value: summary.gdp_delta_pct,       unit: '%',    good: true  },
          { label: 'Gini',       value: summary.gini_delta,           unit: '',     good: false },
          { label: 'Emploi',     value: summary.employment_delta*100, unit: ' pp',  good: true  },
          { label: 'Carbone',    value: summary.carbon_delta_pct,     unit: '%',    good: false },
          { label: 'Santé',      value: summary.health_delta*100,     unit: ' pp',  good: true  },
        ].map(k => (
          <div key={k.label}
            className="bg-white rounded-xl border border-slate-200 p-3 text-center shadow-sm"
          >
            <div className="text-xs text-slate-500 mb-1.5">{k.label}</div>
            <DeltaChip value={k.value} unit={k.unit} positiveGood={k.good} size="md" />
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex border-b border-slate-100">
          {(['economic', 'environment', 'society'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-3 text-sm font-medium transition-colors gap-1.5
                flex items-center justify-center
                ${tab === t
                  ? 'text-indigo-700 border-b-2 border-indigo-500 bg-indigo-50/50'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
            >
              <span>{TAB_ICONS[t]}</span>
              <span className="capitalize">
                {t === 'economic' ? 'Économie' : t === 'environment' ? 'Environnement' : 'Société'}
              </span>
            </button>
          ))}
        </div>

        <div className="p-5 space-y-5">
          {/* ── Economic tab ── */}
          {tab === 'economic' && <>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 rounded-xl p-3">
                <div className="text-xs text-slate-500 mb-0.5">PIB/agent final</div>
                <DeltaChip value={summary.gdp_delta_pct} unit="%" positiveGood size="lg" />
              </div>
              <div className="bg-slate-50 rounded-xl p-3">
                <div className="text-xs text-slate-500 mb-0.5">Gini final</div>
                <DeltaChip value={summary.gini_delta} positiveGood={false} size="lg" />
              </div>
              <div className="bg-slate-50 rounded-xl p-3">
                <div className="text-xs text-slate-500 mb-0.5">Taux d'emploi</div>
                <DeltaChip value={summary.employment_delta*100} unit=" pp" positiveGood size="lg" />
              </div>
              <div className="bg-slate-50 rounded-xl p-3">
                <div className="text-xs text-slate-500 mb-0.5">Taux de pauvreté</div>
                <DeltaChip value={summary.poverty_delta*100} unit=" pp" positiveGood={false} size="lg" />
              </div>
            </div>

            <TimelineChart data={mk('gdp_control','gdp_policy')}
              label="Revenu mensuel moyen (€)" color="#6366f1"
              formatY={v => `${Math.round(v)}€`} />
            <TimelineChart data={mk('gini_control','gini_policy')}
              label="Coefficient de Gini" color="#f59e0b"
              formatY={v => v.toFixed(3)} />
            <TimelineChart data={mk('employment_control','employment_policy', 100)}
              label="Taux d'emploi (%)" color="#10b981"
              formatY={v => `${v.toFixed(1)}%`} />
            <TimelineChart data={mk('poverty_control','poverty_policy', 100)}
              label="Taux de pauvreté (%)" color="#f43f5e"
              formatY={v => `${v.toFixed(1)}%`} />

            {/* Decile table */}
            <div>
              <h5 className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">
                Impact par décile de revenus (groupe traitement, année finale)
              </h5>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="text-slate-400 border-b border-slate-100">
                      <th className="pb-1.5 pr-3">Décile</th>
                      <th className="pb-1.5 pr-3 text-right">Revenu</th>
                      <th className="pb-1.5 pr-3 text-right">Emploi</th>
                      <th className="pb-1.5 pr-3 text-right">Bien-être</th>
                      <th className="pb-1.5 text-right">Carbone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(results.demographics).map(([dec, d]) => (
                      <tr key={dec} className="border-b border-slate-50 hover:bg-slate-50">
                        <td className="py-1 pr-3 font-medium text-slate-700">D{+dec + 1}</td>
                        <td className="py-1 pr-3 text-right tabular-nums">
                          {d.mean_income.toLocaleString('fr-FR', { maximumFractionDigits: 0 })}€
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

          {/* ── Environment tab ── */}
          {tab === 'environment' && <>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-emerald-50 rounded-xl p-3">
                <div className="text-xs text-emerald-700 mb-0.5">Empreinte carbone</div>
                <DeltaChip value={summary.carbon_delta_pct} unit="%" positiveGood={false} size="lg" />
                <p className="text-xs text-emerald-600 mt-1">vs groupe contrôle</p>
              </div>
              <div className="bg-emerald-50 rounded-xl p-3">
                <div className="text-xs text-emerald-700 mb-0.5">Comportements verts</div>
                <DeltaChip value={summary.green_delta*100} unit=" pp" positiveGood size="lg" />
                <p className="text-xs text-emerald-600 mt-1">score moyen 0–100</p>
              </div>
            </div>

            <TimelineChart data={mk('carbon_control','carbon_policy')}
              label="Empreinte carbone (tCO₂/agent/an)" color="#10b981"
              formatY={v => `${v.toFixed(2)} t`} />
            <TimelineChart data={mk('green_control','green_policy', 100)}
              label="Score comportements verts (%)" color="#34d399"
              formatY={v => `${v.toFixed(1)}%`} />

            <div className="bg-slate-50 rounded-xl p-4 text-xs text-slate-600 space-y-1.5">
              <p className="font-medium text-slate-700">Méthode de calcul</p>
              <p>L'empreinte carbone individuelle est calibrée sur les moyennes nationales
              (source : Our World in Data / GCP 2024) et modulée par le décile de revenus
              (courbe de Kuznets) et le secteur d'activité (industrie ×1.55, services publics ×0.80).</p>
              <p>Les politiques environnementales réduisent directement le carbone via le paramètre
              <code className="bg-white px-1 rounded">gini_delta</code> extrait par Ollama.
              Les hausses de revenus induisent un effet rebond (+30 % du gain d'income).</p>
            </div>
          </>}

          {/* ── Society tab ── */}
          {tab === 'society' && <>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-xl p-3">
                <div className="text-xs text-blue-700 mb-0.5">Score de santé</div>
                <DeltaChip value={summary.health_delta*100} unit=" pp" positiveGood size="lg" />
                <p className="text-xs text-blue-600 mt-1">indice composite 0–100</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-3">
                <div className="text-xs text-blue-700 mb-0.5">Confiance sociale</div>
                <DeltaChip value={summary.trust_delta*100} unit=" pp" positiveGood size="lg" />
                <p className="text-xs text-blue-600 mt-1">collectivisme calibré par pays</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-3 col-span-2">
                <div className="text-xs text-blue-700 mb-0.5">Bien-être subjectif</div>
                <DeltaChip value={summary.wellbeing_delta*100} unit=" pp" positiveGood size="lg" />
              </div>
            </div>

            <TimelineChart data={mk('health_control','health_policy', 100)}
              label="Score de santé (%)" color="#3b82f6"
              formatY={v => `${v.toFixed(1)}%`} />
            <TimelineChart data={mk('trust_control','trust_policy', 100)}
              label="Confiance sociale (%)" color="#8b5cf6"
              formatY={v => `${v.toFixed(1)}%`} />
            <TimelineChart data={mk('wellbeing_control','wellbeing_policy', 100)}
              label="Bien-être subjectif (%)" color="#06b6d4"
              formatY={v => `${v.toFixed(1)}%`} />

            <div className="bg-slate-50 rounded-xl p-4 text-xs text-slate-600 space-y-1.5">
              <p className="font-medium text-slate-700">Sources des calibrations sociales</p>
              <p>Score de santé : revenu + emploi + âge + accessibilité du système de santé
              (OMS 2024 — index pondéré par pays). Confiance sociale : index de collectivisme
              de Hofstede (World Values Survey) avec biais emploi/inégalité.</p>
            </div>
          </>}
        </div>
      </div>

      {/* AI interpretation */}
      <AIInterpretation results={results} />
    </div>
  )
}
