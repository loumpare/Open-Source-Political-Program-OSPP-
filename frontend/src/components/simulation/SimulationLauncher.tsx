import { useState } from 'react'
import { PROPOSALS } from '../../data/proposals'

const COUNTRY_CODES: Record<string, string> = {
  France: 'fr',
  'United States': 'us',
  Denmark: 'dk',
  Germany: 'de',
  Sweden: 'se',
  Norway: 'no',
  Finland: 'fi',
  Canada: 'ca',
  'United Kingdom': 'gb',
  Japan: 'jp',
  Global: 'global',
}

const AGENT_OPTIONS = [
  { label: '1 000 (fast)', value: 1_000 },
  { label: '5 000 (recommended)', value: 5_000 },
  { label: '10 000 (precise)', value: 10_000 },
]

interface Props {
  onResults: (r: unknown) => void
  onLoading: (v: boolean) => void
}

export default function SimulationLauncher({ onResults, onLoading }: Props) {
  const [proposalId, setProposalId] = useState(PROPOSALS[0].id)
  const [nAgents, setNAgents] = useState(5_000)
  const [running, setRunning] = useState(false)
  const [error, setError] = useState('')

  const selected = PROPOSALS.find(p => p.id === proposalId) ?? PROPOSALS[0]
  const countryCode = COUNTRY_CODES[selected.country] ?? 'global'

  async function launch() {
    setRunning(true)
    setError('')
    onLoading(true)
    try {
      const res = await fetch('http://127.0.0.1:8001/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          proposal_id: selected.id,
          title: selected.title,
          country: countryCode,
          domain: selected.domain,
          body: selected.summary,
          n_agents: nAgents,
          seed: 42,
        }),
      })
      if (!res.ok) {
        const msg = await res.text()
        throw new Error(msg || `HTTP ${res.status}`)
      }
      onResults(await res.json())
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : 'Could not reach the API — is it running?'
      )
      onResults(null)
    } finally {
      setRunning(false)
      onLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-800">Policy Simulator</h2>
        <p className="text-sm text-slate-500 mt-1">
          Agent-based simulation — Mesa 3 · Ollama · 11 calibrated countries
        </p>
      </div>

      {/* Proposal picker */}
      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
          Policy proposal
        </label>
        <select
          className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white
                     focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={proposalId}
          onChange={e => setProposalId(e.target.value)}
        >
          {PROPOSALS.map(p => (
            <option key={p.id} value={p.id}>
              [{p.id}] {p.title}
            </option>
          ))}
        </select>

        {selected && (
          <div className="mt-2 flex items-center gap-2">
            <span className="text-base">{selected.countryFlag}</span>
            <span className="text-sm text-slate-600">{selected.country}</span>
            <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
              {selected.domain}
            </span>
          </div>
        )}
      </div>

      {/* Agent count */}
      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
          Population size
        </label>
        <div className="flex gap-2">
          {AGENT_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => setNAgents(opt.value)}
              className={`flex-1 py-2 text-xs rounded-lg border transition-colors ${
                nAgents === opt.value
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Info box */}
      <div className="bg-slate-50 rounded-lg p-3 text-xs text-slate-600 space-y-1">
        <p>Each run spawns a <strong>control</strong> group (no policy) and a
          <strong> treatment</strong> group (with policy) to isolate the causal effect.</p>
        <p>Parameters are extracted from the proposal text via Ollama (local LLM).</p>
      </div>

      {error && (
        <div className="bg-rose-50 border border-rose-200 rounded-lg px-3 py-2 text-sm text-rose-700">
          {error}
        </div>
      )}

      <button
        onClick={launch}
        disabled={running}
        className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold
                   hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-60
                   transition-colors flex items-center justify-center gap-2"
      >
        {running ? (
          <>
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"
                className="opacity-25" />
              <path fill="currentColor" className="opacity-75"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            Running simulation…
          </>
        ) : (
          '▶ Run simulation'
        )}
      </button>
    </div>
  )
}
