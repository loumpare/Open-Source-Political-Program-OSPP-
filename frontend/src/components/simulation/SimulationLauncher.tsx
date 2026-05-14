import { useState, useMemo } from 'react'
import { PROPOSALS } from '../../data/proposals'
import { API_BASE } from '../../config'
import { useLanguage } from '../../i18n'

const COUNTRY_CODES: Record<string, string> = {
  France: 'fr', 'United States': 'us', Denmark: 'dk', Germany: 'de',
  Sweden: 'se', Norway: 'no', Finland: 'fi', Canada: 'ca',
  'United Kingdom': 'gb', Japan: 'jp', Global: 'global',
}

const SCENARIO_STYLES = {
  pessimistic: { color: 'text-rose-600',    bg: 'bg-rose-50 border-rose-300'    },
  baseline:    { color: 'text-slate-700',   bg: 'bg-white border-slate-300'     },
  optimistic:  { color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-300' },
}

// All unique countries extracted from proposals
const ALL_COUNTRIES = Array.from(
  new Map(PROPOSALS.map(p => [p.country, p.countryFlag])).entries()
).map(([country, flag]) => ({ country, flag }))

interface LaunchParams {
  proposalId: string; nAgents: number; years: number; scenario: string; seed: number
}

interface Props {
  onResults: (r: unknown, params: LaunchParams) => void
  onLoading: (v: boolean) => void
  /** Called whenever the selected country changes — used by parent for the globe */
  onCountryChange?: (flag: string, name: string) => void
}

export default function SimulationLauncher({ onResults, onLoading, onCountryChange }: Props) {
  const { t } = useLanguage()

  const [selectedCountry, setSelectedCountry] = useState<string>('')
  const [proposalId, setProposalId]           = useState(PROPOSALS[0].id)
  const [nAgents, setNAgents]                 = useState(10_000)
  const [years, setYears]                     = useState(5)
  const [scenario, setScenario]               = useState('baseline')
  const [seed, setSeed]                       = useState(42)
  const [running, setRunning]                 = useState(false)
  const [error, setError]                     = useState('')

  // Filter proposals by selected country
  const filteredProposals = useMemo(() => {
    if (!selectedCountry) return PROPOSALS
    return PROPOSALS.filter(p => p.country === selectedCountry)
  }, [selectedCountry])

  const hasProposals = filteredProposals.length > 0
  const selected = filteredProposals.find(p => p.id === proposalId)
    ?? filteredProposals[0]
    ?? PROPOSALS[0]

  const countryCode = COUNTRY_CODES[selected.country] ?? 'global'

  function pickCountry(country: string, flag: string) {
    setSelectedCountry(country)
    // Auto-select first proposal of that country
    const first = PROPOSALS.find(p => p.country === country)
    if (first) setProposalId(first.id)
    onCountryChange?.(flag, country)
  }

  function clearCountry() {
    setSelectedCountry('')
    onCountryChange?.('', '')
  }

  const SCENARIOS = [
    { id: 'pessimistic', label: t.simulation.scenario_pessimistic },
    { id: 'baseline',    label: t.simulation.scenario_baseline    },
    { id: 'optimistic',  label: t.simulation.scenario_optimistic  },
  ] as const

  const AGENT_OPTIONS = [
    { val: 1_000,  label: `1 000\n${t.simulation.agents_fast}`        },
    { val: 5_000,  label: `5 000\n${t.simulation.agents_recommended}` },
    { val: 10_000, label: `10 000\n${t.simulation.agents_precise}`    },
  ]

  const SCENARIO_HINT: Record<string, string> = {
    optimistic:  t.simulation.scenario_hint_optimistic,
    baseline:    t.simulation.scenario_hint_baseline,
    pessimistic: t.simulation.scenario_hint_pessimistic,
  }

  async function launch() {
    setRunning(true); setError(''); onLoading(true)
    try {
      const res = await fetch(`${API_BASE}/simulate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          proposal_id:   selected.id,
          title:         selected.title,
          country:       countryCode,
          domain:        selected.domain,
          body:          selected.summary,
          n_agents:      nAgents,
          seed,
          horizon_years: years,
          scenario,
        }),
      })
      if (!res.ok) throw new Error(await res.text() || `HTTP ${res.status}`)
      const params: LaunchParams = { proposalId: selected.id, nAgents, years, scenario, seed }
      onResults(await res.json(), params)
    } catch (e) {
      setError(e instanceof Error ? e.message : t.errors.api_offline)
      onResults(null, { proposalId: selected.id, nAgents, years, scenario, seed })
    } finally {
      setRunning(false); onLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-5">
      <div>
        <h2 className="text-lg font-bold text-slate-800">{t.simulation.launcher_title}</h2>
        <p className="text-xs text-slate-400 mt-0.5">{t.simulation.launcher_subtitle}</p>
      </div>

      {/* Country selector */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
            Country
          </label>
          {selectedCountry && (
            <button
              onClick={clearCountry}
              className="text-xs text-indigo-500 hover:text-indigo-700"
            >
              All countries ×
            </button>
          )}
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {ALL_COUNTRIES.map(({ country, flag }) => (
            <button
              key={country}
              onClick={() => pickCountry(country, flag)}
              title={country}
              className={`flex flex-col items-center gap-0.5 py-2 rounded-xl border text-xs
                          transition-all font-medium
                ${selectedCountry === country
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-md scale-105'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300 hover:bg-indigo-50'
                }`}
            >
              <span className="text-lg leading-none">{flag}</span>
              <span className="text-[10px] leading-tight truncate w-full text-center px-0.5">
                {country === 'United States' ? 'USA'
                  : country === 'United Kingdom' ? 'UK'
                  : country}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Proposal */}
      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
          {t.simulation.label_proposal}
        </label>
        <select
          className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white
                     focus:outline-none focus:ring-2 focus:ring-indigo-400 text-slate-700"
          value={selected.id}
          onChange={e => setProposalId(e.target.value)}
        >
          {filteredProposals.map(p => (
            <option key={p.id} value={p.id}>[{p.id}] {p.title}</option>
          ))}
        </select>
        {selected && (
          <div className="mt-1.5 flex items-center gap-1.5 text-xs text-slate-500">
            <span>{selected.countryFlag}</span>
            <span>{selected.country}</span>
            <span className="text-slate-300">·</span>
            <span className="capitalize">{selected.domain}</span>
          </div>
        )}
      </div>

      {/* Years */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
            {t.simulation.label_horizon}
          </label>
          <span className="text-sm font-bold text-indigo-600">
            {t.simulation.years_suffix(years)}
          </span>
        </div>
        <input
          type="range" min={1} max={20} step={1} value={years}
          onChange={e => setYears(Number(e.target.value))}
          className="w-full accent-indigo-600 h-1.5 rounded cursor-pointer"
        />
        <div className="flex justify-between text-xs text-slate-400 mt-0.5">
          <span>{t.simulation.year_min}</span>
          <span>10</span>
          <span>{t.simulation.year_max}</span>
        </div>
      </div>

      {/* Agents */}
      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
          {t.simulation.label_population}
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {AGENT_OPTIONS.map(opt => (
            <button
              key={opt.val}
              onClick={() => setNAgents(opt.val)}
              className={`py-2 text-xs rounded-lg border transition-all whitespace-pre-line leading-tight
                ${nAgents === opt.val
                  ? 'bg-indigo-600 text-white border-indigo-600 font-semibold'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300'}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Scenario */}
      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
          {t.simulation.label_scenario}
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {SCENARIOS.map(s => {
            const style = SCENARIO_STYLES[s.id as keyof typeof SCENARIO_STYLES]
            return (
              <button
                key={s.id}
                onClick={() => setScenario(s.id)}
                className={`py-2 text-xs rounded-lg border transition-all font-medium
                  ${scenario === s.id
                    ? `${style.bg} ${style.color}`
                    : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'}`}
              >
                {s.label}
              </button>
            )
          })}
        </div>
        <p className="text-xs text-slate-400 mt-1.5">{SCENARIO_HINT[scenario]}</p>
      </div>

      {/* Seed */}
      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
          {t.simulation.label_seed}
        </label>
        <div className="flex gap-2">
          <input
            type="number" value={seed} min={0} max={99999}
            onChange={e => setSeed(Number(e.target.value))}
            className="flex-1 border border-slate-200 rounded-lg px-3 py-1.5 text-sm
                       focus:outline-none focus:ring-2 focus:ring-indigo-400 tabular-nums"
          />
          <button
            onClick={() => setSeed(Math.floor(Math.random() * 99999))}
            className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg
                       hover:bg-slate-50 text-slate-500"
            title={t.simulation.seed_random}
          >
            🎲
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-rose-50 border border-rose-200 rounded-lg px-3 py-2 text-xs text-rose-700">
          {error}
        </div>
      )}

      {!hasProposals && selectedCountry && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-xs text-amber-700">
          No proposals available for {selectedCountry} yet.
        </div>
      )}

      <button
        onClick={launch} disabled={running || !hasProposals}
        className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold
                   hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-60
                   transition-colors flex items-center justify-center gap-2 text-sm"
      >
        {running ? (
          <>
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"/>
              <path fill="currentColor" className="opacity-75" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
            </svg>
            {t.simulation.btn_running}
          </>
        ) : `▶ ${t.simulation.btn_run}`}
      </button>
    </div>
  )
}
