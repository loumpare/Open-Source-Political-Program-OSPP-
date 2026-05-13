import { useState } from 'react'
import SimulationLauncher from '../components/simulation/SimulationLauncher'
import SimulationResults from '../components/simulation/SimulationResults'

export default function Simulations() {
  const [results, setResults] = useState<unknown>(null)
  const [loading, setLoading] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">

      {/* Hero banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 text-white">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 80%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        />
        <div className="relative max-w-5xl mx-auto px-6 py-12">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-xs font-medium bg-white/10 border border-white/20 rounded-full px-3 py-1">
              Phase 2 — Simulation
            </span>
            <span className="text-xs font-medium bg-indigo-400/20 border border-indigo-400/30 rounded-full px-3 py-1">
              Mesa 3 · ABM
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-3">
            Monde Virtuel de Jumeaux Numériques
          </h1>
          <p className="text-indigo-200 text-sm md:text-base max-w-2xl leading-relaxed">
            Simulez l'impact d'une politique publique sur une population réaliste de citoyens —
            économiquement, socialement, environnementalement — sur 1 à 20 ans.
            Chaque agent est calibré sur des données démographiques réelles.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap gap-6 mt-6">
            {[
              { label: 'pays calibrés', value: '11' },
              { label: 'agents max', value: '50 000' },
              { label: 'métriques', value: '9' },
              { label: 'moteur', value: 'LLM local' },
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
          <div className="lg:col-span-1 lg:sticky lg:top-20">
            <SimulationLauncher onResults={setResults} onLoading={setLoading} />
          </div>

          {/* Right: results */}
          <div className="lg:col-span-2">
            {loading && (
              <div className="flex flex-col items-center justify-center h-80 gap-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full border-4 border-indigo-100"/>
                  <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"/>
                </div>
                <div className="text-center">
                  <p className="text-slate-700 font-medium">Simulation en cours…</p>
                  <p className="text-slate-400 text-sm mt-1">Mesa 3 · agents économiques + sociaux</p>
                </div>
              </div>
            )}

            {!loading && results === null && (
              <div className="flex flex-col items-center justify-center h-80 gap-4 text-center">
                <div className="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center text-3xl">
                  🧪
                </div>
                <div>
                  <p className="text-slate-700 font-semibold">Prêt à simuler</p>
                  <p className="text-slate-400 text-sm mt-1 max-w-xs">
                    Choisissez une proposition, configurez les paramètres
                    et lancez une simulation.
                  </p>
                </div>
                {/* How it works */}
                <div className="mt-2 grid grid-cols-3 gap-3 text-left w-full max-w-md">
                  {[
                    { icon: '📊', t: 'Démographie', d: 'Profils calibrés sur WID.world, ILO, Banque Mondiale' },
                    { icon: '🤖', t: 'LLM parser', d: 'Ollama extrait les paramètres numériques du texte' },
                    { icon: '⚖️', t: 'A/B test', d: 'Groupe contrôle vs traitement en parallèle' },
                  ].map(c => (
                    <div key={c.t} className="bg-white rounded-xl border border-slate-200 p-3">
                      <div className="text-xl mb-1">{c.icon}</div>
                      <div className="text-xs font-semibold text-slate-700">{c.t}</div>
                      <div className="text-xs text-slate-400 mt-0.5 leading-tight">{c.d}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!loading && results !== null && (
              <SimulationResults
                results={
                  results as Parameters<typeof SimulationResults>[0]['results']
                }
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
