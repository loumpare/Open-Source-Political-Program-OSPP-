import MonteCarloChart from './MonteCarloChart'
import { useLanguage } from '../../i18n'

interface StatBand {
  mean: number
  std: number
  p5: number
  p95: number
  values: number[]
}

interface McSeries {
  year: number
  [key: string]: number | { mean: number; std: number; p5: number; p95: number }
}

interface McResults {
  meta: {
    proposal_id: string
    title: string
    country: string
    n_agents: number
    horizon_years: number
    n_runs: number
    scenario?: string
  }
  summary: Record<string, StatBand>
  series: McSeries[]
}

interface Props {
  results: McResults
}

function extractBand(
  series: McSeries[],
  key: string
): Array<{ year: number; mean: number; p5: number; p95: number }> {
  return series.map(s => {
    const v = s[key] as { mean: number; p5: number; p95: number } | undefined
    return {
      year: s.year as number,
      mean: v?.mean ?? 0,
      p5:   v?.p5   ?? 0,
      p95:  v?.p95  ?? 0,
    }
  })
}

function MiniDistribution({ values, color = '#6366f1' }: { values: number[]; color?: string }) {
  if (!values?.length) return null
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1
  const BINS = 8
  const bins = Array(BINS).fill(0)
  values.forEach(v => {
    const i = Math.min(Math.floor(((v - min) / range) * BINS), BINS - 1)
    bins[i]++
  })
  const maxBin = Math.max(...bins)
  return (
    <div className="flex items-end gap-0.5 h-8">
      {bins.map((b, i) => (
        <div
          key={i}
          className="flex-1 rounded-t-sm transition-all"
          style={{
            height: `${(b / maxBin) * 100}%`,
            backgroundColor: color,
            opacity: 0.3 + (b / maxBin) * 0.7,
          }}
        />
      ))}
    </div>
  )
}

export default function MonteCarloResults({ results }: Props) {
  const { t } = useLanguage()
  const { meta, summary, series } = results

  const scenarioBadge: Record<string, string> = {
    optimistic:  'bg-emerald-50 text-emerald-700 border-emerald-200',
    baseline:    'bg-slate-50 text-slate-600 border-slate-200',
    pessimistic: 'bg-rose-50 text-rose-700 border-rose-200',
  }
  const sc = meta.scenario ?? 'baseline'

  const KEY_METRICS = [
    { key: 'gdp_delta_pct',    label: t.simulation.metric_gdp,        unit: '%',    color: '#6366f1', good: true  },
    { key: 'gini_delta',       label: t.simulation.metric_gini,       unit: '',     color: '#f59e0b', good: false },
    { key: 'employment_delta', label: t.simulation.metric_employment,  unit: ' pp',  color: '#10b981', good: true  },
    { key: 'carbon_delta_pct', label: t.simulation.metric_carbon,     unit: '%',    color: '#34d399', good: false },
    { key: 'health_delta',     label: t.simulation.metric_health,     unit: ' pp',  color: '#3b82f6', good: true  },
    { key: 'trust_delta',      label: t.simulation.metric_trust,      unit: ' pp',  color: '#8b5cf6', good: true  },
  ]

  const CHART_METRICS = [
    { key: 'gdp_delta_pct',   label: t.simulation.metric_gdp,       color: '#6366f1', fmt: (v: number) => `${v.toFixed(1)}%` },
    { key: 'gini_delta',      label: t.simulation.metric_gini,      color: '#f59e0b', fmt: (v: number) => v.toFixed(3) },
    { key: 'carbon_delta_pct',label: t.simulation.metric_carbon,    color: '#10b981', fmt: (v: number) => `${v.toFixed(1)}%` },
    { key: 'health_delta',    label: t.simulation.metric_health,    color: '#3b82f6', fmt: (v: number) => `${(v * 100).toFixed(1)} pp` },
  ]

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-indigo-900 text-white rounded-2xl p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg font-bold">🎲 Monte Carlo</span>
              <span className="text-xs bg-white/10 border border-white/20 rounded-full px-2 py-0.5">
                {meta.n_runs} runs · {meta.n_agents.toLocaleString()} agents/run
              </span>
            </div>
            <p className="text-indigo-200 text-sm">{meta.title}</p>
            <p className="text-indigo-300 text-xs mt-0.5">
              {meta.country.toUpperCase()} · {meta.horizon_years} ans
            </p>
          </div>
          <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${scenarioBadge[sc]}`}>
            {sc}
          </span>
        </div>
      </div>

      {/* Summary distribution cards */}
      <div>
        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
          {t.simulation.mc_summary_title}
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {KEY_METRICS.map(km => {
            const stat = summary[km.key]
            if (!stat) return null
            const scale = km.unit === ' pp' ? 100 : 1
            const mean = stat.mean * scale
            const std  = stat.std  * scale
            const p5   = stat.p5   * scale
            const p95  = stat.p95  * scale
            const good = km.good ? mean >= 0 : mean <= 0
            return (
              <div key={km.key}
                className="bg-white rounded-xl border border-slate-200 p-3 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">{km.label}</span>
                  <span className={`text-sm font-bold tabular-nums ${good ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {mean >= 0 ? '+' : ''}{mean.toFixed(2)}{km.unit}
                  </span>
                </div>
                <MiniDistribution values={stat.values.map(v => v * scale)} color={km.color} />
                <div className="grid grid-cols-4 gap-1 text-xs text-slate-400">
                  <div>
                    <div className="font-medium text-slate-600">{t.simulation.mc_p5}</div>
                    <div className="tabular-nums">{p5.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="font-medium text-slate-600">{t.simulation.mc_mean}</div>
                    <div className="tabular-nums">{mean.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="font-medium text-slate-600">{t.simulation.mc_p95}</div>
                    <div className="tabular-nums">{p95.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="font-medium text-slate-600">σ</div>
                    <div className="tabular-nums">{std.toFixed(2)}</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Uncertainty band charts */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-5">
        <div className="flex items-center gap-2">
          <h4 className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
            Évolution temporelle avec intervalles de confiance
          </h4>
          <span className="text-xs text-slate-400">
            — bande P5–P95 sur {meta.n_runs} runs
          </span>
        </div>
        {CHART_METRICS.map(cm => {
          const band = extractBand(series, cm.key)
          return (
            <MonteCarloChart
              key={cm.key}
              data={band}
              label={cm.label}
              color={cm.color}
              formatY={cm.fmt}
            />
          )
        })}
      </div>

      {/* Convergence note */}
      <div className="bg-slate-50 rounded-xl border border-slate-100 p-4 text-xs text-slate-600">
        <p className="font-medium text-slate-700 mb-1">Interprétation statistique</p>
        <p>
          La bande colorée représente l'intervalle de confiance P5–P95 — 90 % des
          {meta.n_runs} simulations tombent dans cette zone.
          La ligne centrale est la médiane des moyennes.
          Des bandes larges indiquent une forte sensibilité aux conditions initiales
          (stochasticité élevée) ; des bandes étroites indiquent des résultats robustes.
        </p>
      </div>
    </div>
  )
}
