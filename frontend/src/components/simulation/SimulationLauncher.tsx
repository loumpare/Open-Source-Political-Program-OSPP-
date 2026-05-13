import { useState } from 'react'
import { PROPOSALS } from '../../data/proposals'
import { API_BASE } from '../../config'

const COUNTRY_CODES: Record<string, string> = {
  France: 'fr', 'United States': 'us', Denmark: 'dk', Germany: 'de',
  Sweden: 'se', Norway: 'no', Finland: 'fi', Canada: 'ca',
  'United Kingdom': 'gb', Japan: 'jp', Global: 'global',
}

const SCENARIOS = [
  { id: 'pessimistic', label: 'Pessimiste', color: 'text-rose-600', bg: 'bg-rose-50 border-rose-300' },
  { id: 'baseline',   label: 'Baseline',   color: 'text-slate-700', bg: 'bg-white border-slate-300' },
  { id: 'optimistic', label: 'Optimiste',  color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-300' },
]

interface LaunchParams {
  proposalId: string; nAgents: number; years: number; scenario: string; seed: number
}

interface Props {
  onResults: (r: unknown, params: LaunchParams) => void
  onLoading: (v: boolean) => void
}

export default function SimulationLauncher({ onResults, onLoading }: Props) {
  const [proposalId, setProposalId] = useState(PROPOSALS[0].id)
  const [nAgents, setNAgents]       = useState(5_000)
  const [years, setYears]           = useState(5)
  const [scenario, setScenario]     = useState('baseline')
  const [seed, setSeed]             = useState(42)
  const [running, setRunning]       = useState(false)
  const [error, setError]           = useState('')

  const selected = PROPOSALS.find(p => p.id === proposalId) ?? PROPOSALS[0]
  const countryCode = COUNTRY_CODES[selected.country] ?? 'global'

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
      const params: LaunchParams = { proposalId, nAgents, years, scenario, seed }
      onResults(await res.json(), params)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'API inaccessible — lancez le serveur')
      onResults(null, { proposalId, nAgents, years, scenario, seed })
    } finally {
      setRunning(false); onLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-5">
      <div>
        <h2 className="text-lg font-bold text-slate-800">Paramètres</h2>
        <p className="text-xs text-slate-400 mt-0.5">Mesa 3 · Ollama · 11 pays calibrés</p>
      </div>

      {/* Proposal */}
      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
          Proposition
        </label>
        <select
          className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white
                     focus:outline-none focus:ring-2 focus:ring-indigo-400 text-slate-700"
          value={proposalId}
          onChange={e => setProposalId(e.target.value)}
        >
          {PROPOSALS.map(p => (
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
            Horizon temporel
          </label>
          <span className="text-sm font-bold text-indigo-600">{years} ans</span>
        </div>
        <input
          type="range" min={1} max={20} step={1} value={years}
          onChange={e => setYears(Number(e.target.value))}
          className="w-full accent-indigo-600 h-1.5 rounded cursor-pointer"
        />
        <div className="flex justify-between text-xs text-slate-400 mt-0.5">
          <span>1 an</span><span>10</span><span>20 ans</span>
        </div>
      </div>

      {/* Agents */}
      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
          Population simulée
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {[
            [1_000,  '1 000\nrapide'],
            [5_000,  '5 000\nrecommandé'],
            [10_000, '10 000\nprécis'],
          ].map(([val, lbl]) => (
            <button
              key={val}
              onClick={() => setNAgents(val as number)}
              className={`py-2 text-xs rounded-lg border transition-all whitespace-pre-line leading-tight
                ${nAgents === val
                  ? 'bg-indigo-600 text-white border-indigo-600 font-semibold'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300'}`}
            >
              {lbl}
            </button>
          ))}
        </div>
      </div>

      {/* Scenario */}
      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
          Scénario
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {SCENARIOS.map(s => (
            <button
              key={s.id}
              onClick={() => setScenario(s.id)}
              className={`py-2 text-xs rounded-lg border transition-all font-medium
                ${scenario === s.id ? s.bg + ' ' + s.color : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'}`}
            >
              {s.label}
            </button>
          ))}
        </div>
        <p className="text-xs text-slate-400 mt-1.5">
          {scenario === 'optimistic' && 'Effets positifs ×1.3 — calibrage favorable'}
          {scenario === 'baseline'   && 'Effets calibrés sur données historiques'}
          {scenario === 'pessimistic' && 'Effets positifs ×0.7 — calibrage conservateur'}
        </p>
      </div>

      {/* Seed */}
      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
          Graine aléatoire
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
            title="Graine aléatoire"
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

      <button
        onClick={launch} disabled={running}
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
            Simulation en cours…
          </>
        ) : '▶ Lancer la simulation'}
      </button>
    </div>
  )
}
