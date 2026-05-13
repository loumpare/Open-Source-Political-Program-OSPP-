import { useState } from 'react'
import SimulationLauncher from '../components/simulation/SimulationLauncher'
import SimulationResults from '../components/simulation/SimulationResults'
import MonteCarloResults from '../components/simulation/MonteCarloResults'
import { PROPOSALS } from '../data/proposals'
import { API_BASE } from '../config'
import { useLanguage, type LangCode } from '../i18n'

const COUNTRY_CODES: Record<string, string> = {
  France: 'fr', 'United States': 'us', Denmark: 'dk', Germany: 'de',
  Sweden: 'se', Norway: 'no', Finland: 'fi', Canada: 'ca',
  'United Kingdom': 'gb', Japan: 'jp', Global: 'global',
}

type Mode = 'single' | 'montecarlo'

export default function Simulations() {
  const { t } = useLanguage()
  const [results, setResults]   = useState<unknown>(null)
  const [mcResults, setMcResults] = useState<unknown>(null)
  const [loading, setLoading]   = useState(false)
  const [mode, setMode]         = useState<Mode>('single')
  const [mcRuns, setMcRuns]     = useState(10)
  const [mcError, setMcError]   = useState('')
  const [mcLoading, setMcLoading] = useState(false)

  // Shared params for Monte Carlo — reuse what SimulationLauncher last submitted
  const [lastParams, setLastParams] = useState<{
    proposalId: string; nAgents: number; years: number; scenario: string; seed: number
  } | null>(null)

  function handleResults(r: unknown, params?: typeof lastParams) {
    setResults(r)
    setMcResults(null)
    if (params) setLastParams(params)
  }

  async function runMonteCarlo() {
    if (!lastParams) return
    const selected = PROPOSALS.find(p => p.id === lastParams.proposalId) ?? PROPOSALS[0]
    setMcLoading(true); setMcError('')
    try {
      const res = await fetch(`${API_BASE}/simulate/montecarlo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          proposal_id:   selected.id,
          title:         selected.title,
          country:       COUNTRY_CODES[selected.country] ?? 'global',
          domain:        selected.domain,
          body:          selected.summary,
          n_agents:      lastParams.nAgents,
          n_runs:        mcRuns,
          horizon_years: lastParams.years,
          scenario:      lastParams.scenario,
        }),
      })
      if (!res.ok) throw new Error(await res.text() || `HTTP ${res.status}`)
      setMcResults(await res.json())
    } catch (e) {
      setMcError(e instanceof Error ? e.message : t.errors.generic)
    } finally {
      setMcLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">

      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 text-white">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 80%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        />
        <div className="relative max-w-5xl mx-auto px-6 py-12">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-xs font-medium bg-white/10 border border-white/20 rounded-full px-3 py-1">
              {t.simulation.badge_phase}
            </span>
            <span className="text-xs font-medium bg-indigo-400/20 border border-indigo-400/30 rounded-full px-3 py-1">
              {t.simulation.badge_tech}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-3">
            {t.simulation.page_title}
          </h1>
          <p className="text-indigo-200 text-sm md:text-base max-w-2xl leading-relaxed">
            {t.simulation.page_subtitle}
          </p>
          <div className="flex flex-wrap gap-6 mt-6">
            {[
              { label: t.simulation.stat_countries, value: '11' },
              { label: t.simulation.stat_agents,    value: '50 000' },
              { label: t.simulation.stat_metrics,   value: '9' },
              { label: t.simulation.stat_engine,    value: 'LLM' },
            ].map(s => (
              <div key={s.label}>
                <div className="text-2xl font-bold text-white">{s.value}</div>
                <div className="text-xs text-indigo-300">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

          {/* Left: launcher */}
          <div className="lg:col-span-1 lg:sticky lg:top-20 space-y-4">
            <SimulationLauncher
              onResults={(r, params) => handleResults(r, params)}
              onLoading={setLoading}
            />

            {/* Monte Carlo panel — visible after a simulation ran */}
            {results !== null && (
              <div className="bg-white rounded-2xl border border-indigo-200 shadow-sm p-5 space-y-4">
                <div>
                  <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                    🎲 {t.simulation.mc_title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {t.simulation.mc_subtitle}
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      {t.simulation.mc_runs}
                    </label>
                    <span className="text-sm font-bold text-indigo-600">{mcRuns}</span>
                  </div>
                  <input
                    type="range" min={3} max={30} step={1} value={mcRuns}
                    onChange={e => setMcRuns(Number(e.target.value))}
                    className="w-full accent-indigo-600 h-1.5 rounded cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-0.5">
                    <span>3</span><span>15</span><span>30</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    ~{Math.round(mcRuns * 0.7)}s · {(lastParams?.nAgents ?? 0) * mcRuns / 1000}k agents total
                  </p>
                </div>

                {mcError && (
                  <p className="text-xs text-rose-600 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">
                    {mcError}
                  </p>
                )}

                <button
                  onClick={runMonteCarlo}
                  disabled={mcLoading || !lastParams}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold
                             hover:bg-indigo-700 disabled:opacity-60 transition-colors
                             flex items-center justify-center gap-2"
                >
                  {mcLoading ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"/>
                        <path fill="currentColor" className="opacity-75" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                      </svg>
                      {t.simulation.mc_running}
                    </>
                  ) : t.simulation.mc_btn}
                </button>
              </div>
            )}
          </div>

          {/* Right: results */}
          <div className="lg:col-span-2">
            {/* Mode toggle — only show when we have both results */}
            {results !== null && mcResults !== null && (
              <div className="flex gap-1 bg-slate-100 rounded-xl p-1 mb-5">
                {(['single', 'montecarlo'] as Mode[]).map(m => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
                      mode === m
                        ? 'bg-white text-indigo-700 shadow-sm'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {m === 'single' ? '📊 Simulation unique' : `🎲 Monte Carlo (${mcRuns} runs)`}
                  </button>
                ))}
              </div>
            )}

            {/* Loading spinner */}
            {(loading || mcLoading) && (
              <div className="flex flex-col items-center justify-center h-80 gap-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full border-4 border-indigo-100"/>
                  <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"/>
                </div>
                <div className="text-center">
                  <p className="text-slate-700 font-medium">
                    {mcLoading ? `${t.simulation.mc_running} (${mcRuns} runs)` : t.simulation.btn_running}
                  </p>
                  <p className="text-slate-400 text-sm mt-1">Mesa 3 · agents économiques + sociaux</p>
                </div>
              </div>
            )}

            {/* Empty state */}
            {!loading && !mcLoading && results === null && (
              <div className="flex flex-col items-center justify-center h-80 gap-4 text-center">
                <div className="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center text-3xl">
                  🧪
                </div>
                <div>
                  <p className="text-slate-700 font-semibold">{t.simulation.ready_title}</p>
                  <p className="text-slate-400 text-sm mt-1 max-w-xs">{t.simulation.ready_subtitle}</p>
                </div>
                <div className="mt-2 grid grid-cols-3 gap-3 text-left w-full max-w-md">
                  {[
                    { icon: '📊', t2: t.simulation.how_demo, d: t.simulation.how_demo_detail },
                    { icon: '🤖', t2: t.simulation.how_llm,  d: t.simulation.how_llm_detail  },
                    { icon: '⚖️', t2: t.simulation.how_ab,   d: t.simulation.how_ab_detail   },
                  ].map(c => (
                    <div key={c.t2} className="bg-white rounded-xl border border-slate-200 p-3">
                      <div className="text-xl mb-1">{c.icon}</div>
                      <div className="text-xs font-semibold text-slate-700">{c.t2}</div>
                      <div className="text-xs text-slate-400 mt-0.5 leading-tight">{c.d}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Single simulation results */}
            {!loading && !mcLoading && results !== null && mode === 'single' && (
              <SimulationResults
                results={results as Parameters<typeof SimulationResults>[0]['results']}
              />
            )}

            {/* Monte Carlo results */}
            {!loading && !mcLoading && mcResults !== null && mode === 'montecarlo' && (
              <MonteCarloResults
                results={mcResults as Parameters<typeof MonteCarloResults>[0]['results']}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
