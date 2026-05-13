import { useState } from 'react'
import SimulationLauncher from '../components/simulation/SimulationLauncher'
import SimulationResults from '../components/simulation/SimulationResults'

export default function Simulations() {
  const [results, setResults] = useState<unknown>(null)
  const [loading, setLoading] = useState(false)

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
      {/* Hero */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-slate-800">
          Virtual World Simulation
        </h1>
        <p className="text-slate-500 max-w-xl mx-auto text-sm leading-relaxed">
          Run agent-based simulations to see how a realistic population of
          digital twins would react to a policy proposal — economically,
          socially and behaviourally — over 5 to 10 years.
        </p>
        <div className="flex items-center justify-center gap-4 pt-2 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
            Mesa 3 ABM
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-indigo-400 inline-block" />
            Ollama LLM
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
            11 countries calibrated
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left column — launcher */}
        <div className="lg:col-span-1">
          <SimulationLauncher onResults={setResults} onLoading={setLoading} />
        </div>

        {/* Right column — results */}
        <div className="lg:col-span-2">
          {loading && (
            <div className="flex flex-col items-center justify-center h-72 text-slate-400 gap-3">
              <svg className="animate-spin h-8 w-8 text-indigo-500"
                viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor"
                  strokeWidth="3" className="opacity-25" />
                <path fill="currentColor" className="opacity-75"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              <p className="text-sm">Simulating population dynamics…</p>
            </div>
          )}

          {!loading && results === null && (
            <div className="flex flex-col items-center justify-center h-72 text-slate-300 gap-3">
              <svg className="w-16 h-16" fill="none" stroke="currentColor"
                viewBox="0 0 24 24" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002
                     2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10
                     m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2
                     a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <p className="text-sm text-slate-400">
                Select a proposal and run a simulation to see results here.
              </p>
            </div>
          )}

          {!loading && results !== null && (
            <SimulationResults
              results={
                results as Parameters<
                  typeof SimulationResults
                >[0]['results']
              }
            />
          )}
        </div>
      </div>

      {/* Architecture note */}
      <div className="bg-slate-50 rounded-2xl border border-slate-100 p-5">
        <h3 className="text-sm font-semibold text-slate-700 mb-2">
          How the simulation works
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600">
          <div>
            <div className="font-medium text-slate-700 mb-1">
              Tier 1 — Mass agents
            </div>
            <p>
              Up to 50,000 rule-based agents calibrated on country demographics
              (WID.world, ILO, World Bank). Fast deterministic economic dynamics.
            </p>
          </div>
          <div>
            <div className="font-medium text-slate-700 mb-1">
              Tier 2 — Policy parser
            </div>
            <p>
              Ollama (qwen2.5:7b) extracts numerical parameters from the proposal
              text: fiscal transfers, employment elasticity, income multipliers,
              target demographics.
            </p>
          </div>
          <div>
            <div className="font-medium text-slate-700 mb-1">
              Tier 3 — A/B comparison
            </div>
            <p>
              Control group (no policy) runs alongside the treatment group.
              Metrics: GDP/capita, Gini coefficient, employment rate, wellbeing.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
