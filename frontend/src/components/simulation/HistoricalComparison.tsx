import type { Proposal } from '../../data/proposals'
import { useLanguage } from '../../i18n'

interface SimSummary {
  gdp_delta_pct: number
  gini_delta: number
  employment_delta: number
  poverty_delta: number
  wellbeing_delta: number
  health_delta: number
  carbon_delta_pct: number
  wealth_gini_delta: number
  fiscal_balance_delta: number
  innovation_delta: number
}

interface Props {
  proposal: Proposal
  summary: SimSummary
}

function sign(v: number) { return v >= 0 ? '+' : '' }
function pp(v: number, decimals = 2) { return `${sign(v)}${(v).toFixed(decimals)} pp` }
function pct(v: number) { return `${sign(v)}${v.toFixed(2)}%` }

export default function HistoricalComparison({ proposal, summary: s }: Props) {
  const { t } = useLanguage()
  const ho = proposal.historicalOutcomes
  if (!ho) return null

  const modelRows = [
    { label: 'PIB / GDP',    value: pct(s.gdp_delta_pct) },
    { label: 'Gini revenus', value: sign(s.gini_delta) + s.gini_delta.toFixed(3) },
    { label: 'Emploi',       value: pp(s.employment_delta * 100) },
    { label: 'Pauvreté',     value: pp(s.poverty_delta * 100) },
    { label: 'Bien-être',    value: pp(s.wellbeing_delta * 100) },
    { label: 'Santé',        value: pp(s.health_delta * 100) },
  ]

  const realRows = [
    { label: 'PIB / GDP',    value: ho.gdp_impact },
    { label: 'Emploi',       value: ho.employment_impact },
    { label: 'Inégalités',   value: ho.inequality_impact },
    { label: 'Fiscal',       value: ho.fiscal_impact },
  ]

  return (
    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 overflow-hidden mb-5">

      {/* Header */}
      <div className="px-5 py-3 bg-emerald-100 border-b border-emerald-200 flex items-center justify-between gap-3 flex-wrap">
        <h3 className="text-sm font-bold text-emerald-800 flex items-center gap-1.5">
          ⚖️ {t.simulation.hist_compare_title}
        </h3>
        <div className="flex flex-wrap gap-1.5 text-[10px]">
          <span className="bg-emerald-200 text-emerald-800 px-2 py-0.5 rounded-full font-medium">
            {t.simulation.hist_period} : {ho.period}
          </span>
          <span className="bg-white text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
            {ho.country_context}
          </span>
        </div>
      </div>

      <div className="p-4 space-y-4">

        {/* Side-by-side comparison */}
        <div className="grid grid-cols-2 gap-3">

          {/* Model */}
          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3">
            <div className="text-[10px] font-bold text-indigo-600 uppercase tracking-wide mb-2">
              {t.simulation.hist_model_label}
            </div>
            <div className="space-y-1.5">
              {modelRows.map(r => (
                <div key={r.label} className="flex items-center justify-between gap-2">
                  <span className="text-[10px] text-slate-500 whitespace-nowrap">{r.label}</span>
                  <span className="text-[10px] font-bold text-slate-800 tabular-nums">{r.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reality */}
          <div className="bg-emerald-100 border border-emerald-200 rounded-xl p-3">
            <div className="text-[10px] font-bold text-emerald-700 uppercase tracking-wide mb-2">
              {t.simulation.hist_reality_label}
            </div>
            <div className="space-y-1.5">
              {realRows.map(r => (
                <div key={r.label} className="flex items-start justify-between gap-2">
                  <span className="text-[10px] text-emerald-700 whitespace-nowrap shrink-0">{r.label}</span>
                  <span className="text-[10px] font-semibold text-slate-700 text-right leading-tight">{r.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key finding */}
        <div className="bg-white border border-emerald-200 rounded-xl p-3">
          <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wide">
            {t.simulation.hist_synthesis} —{' '}
          </span>
          <span className="text-xs text-slate-700 leading-relaxed">{ho.key_finding}</span>
        </div>

        {/* Sources + disclaimer */}
        <div className="flex flex-col gap-1">
          <p className="text-[10px] text-emerald-600">
            Sources : {ho.sources.join(' · ')}
          </p>
          <p className="text-[10px] text-slate-400 italic">
            ℹ️ {t.simulation.hist_disclaimer}
          </p>
        </div>
      </div>
    </div>
  )
}
