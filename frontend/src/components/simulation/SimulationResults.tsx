import TimelineChart from './TimelineChart'

interface SeriesPoint {
  year: number
  gdp_control: number
  gdp_policy: number
  gini_control: number
  gini_policy: number
  employment_control: number
  employment_policy: number
  wellbeing_control: number
  wellbeing_policy: number
}

interface SimResults {
  meta: {
    proposal_id: string
    title: string
    country: string
    n_agents: number
    horizon_years: number
  }
  summary: {
    gdp_delta_pct: number
    gini_delta: number
    employment_delta: number
    wellbeing_delta: number
    effect_description: string
  }
  series: SeriesPoint[]
  demographics: Record<string, {
    n: number
    mean_income: number
    employment_rate: number
    mean_wellbeing: number
  }>
}

interface Props {
  results: SimResults
}

function DeltaBadge({ value, unit = '' }: { value: number; unit?: string }) {
  const pos = value >= 0
  const sign = pos ? '+' : ''
  return (
    <span className={`font-semibold ${pos ? 'text-emerald-600' : 'text-rose-600'}`}>
      {sign}{value.toFixed(2)}{unit}
    </span>
  )
}

export default function SimulationResults({ results }: Props) {
  const { meta, summary, series } = results

  const gdpData = series.map(s => ({
    year: s.year,
    control: s.gdp_control,
    policy: s.gdp_policy,
  }))

  const giniData = series.map(s => ({
    year: s.year,
    control: s.gini_control,
    policy: s.gini_policy,
  }))

  const empData = series.map(s => ({
    year: s.year,
    control: s.employment_control * 100,
    policy: s.employment_policy * 100,
  }))

  const wbData = series.map(s => ({
    year: s.year,
    control: s.wellbeing_control * 100,
    policy: s.wellbeing_policy * 100,
  }))

  return (
    <div className="space-y-6">
      {/* Summary header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold text-slate-800 text-lg">{meta.title}</h3>
            <p className="text-sm text-slate-500 mt-0.5">
              {meta.country.toUpperCase()} · {meta.n_agents.toLocaleString()} agents
              · {meta.horizon_years} years simulated
            </p>
          </div>
          <span className="text-xs bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full font-medium">
            {meta.proposal_id}
          </span>
        </div>
        {summary.effect_description && (
          <p className="text-sm text-slate-600 italic border-l-2 border-indigo-200 pl-3">
            {summary.effect_description}
          </p>
        )}
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          {
            label: 'GDP / capita',
            value: <DeltaBadge value={summary.gdp_delta_pct} unit="%" />,
            sub: 'vs. control group',
          },
          {
            label: 'Gini coefficient',
            value: <DeltaBadge value={summary.gini_delta} />,
            sub: 'negative = more equal',
          },
          {
            label: 'Employment rate',
            value: <DeltaBadge value={summary.employment_delta * 100} unit=" pp" />,
            sub: 'percentage points',
          },
          {
            label: 'Wellbeing index',
            value: <DeltaBadge value={summary.wellbeing_delta * 100} unit=" pp" />,
            sub: 'composite score',
          },
        ].map(kpi => (
          <div key={kpi.label}
            className="bg-white rounded-xl border border-slate-200 p-4 text-center"
          >
            <div className="text-xs text-slate-500 mb-1">{kpi.label}</div>
            <div className="text-2xl">{kpi.value}</div>
            <div className="text-xs text-slate-400 mt-1">{kpi.sub}</div>
          </div>
        ))}
      </div>

      {/* Time-series charts */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
        <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
          Year-by-year evolution
        </h4>

        <TimelineChart
          data={gdpData}
          label="Monthly income / agent (€)"
          unit="€"
          color="#6366f1"
          formatY={v => `${Math.round(v)}€`}
        />

        <TimelineChart
          data={giniData}
          label="Gini coefficient"
          color="#f59e0b"
          formatY={v => v.toFixed(3)}
        />

        <TimelineChart
          data={empData}
          label="Employment rate (%)"
          unit="%"
          color="#10b981"
          formatY={v => `${v.toFixed(1)}%`}
        />

        <TimelineChart
          data={wbData}
          label="Wellbeing index (%)"
          unit="%"
          color="#3b82f6"
          formatY={v => `${v.toFixed(1)}%`}
        />
      </div>

      {/* Demographics breakdown */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-4">
          Impact by income decile (policy group, final year)
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-xs text-slate-500 border-b border-slate-100">
                <th className="pb-2 pr-4">Decile</th>
                <th className="pb-2 pr-4 text-right">Mean income</th>
                <th className="pb-2 pr-4 text-right">Employment</th>
                <th className="pb-2 text-right">Wellbeing</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(results.demographics).map(([dec, d]) => (
                <tr key={dec} className="border-b border-slate-50 hover:bg-slate-50">
                  <td className="py-1.5 pr-4 font-medium">D{parseInt(dec) + 1}</td>
                  <td className="py-1.5 pr-4 text-right tabular-nums">
                    {d.mean_income.toLocaleString('fr-FR', {
                      style: 'currency', currency: 'EUR', maximumFractionDigits: 0,
                    })}
                  </td>
                  <td className="py-1.5 pr-4 text-right tabular-nums">
                    {(d.employment_rate * 100).toFixed(1)}%
                  </td>
                  <td className="py-1.5 text-right tabular-nums">
                    {(d.mean_wellbeing * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
