import { useState, useRef, useEffect } from 'react'
import type { Proposal } from '../../data/proposals'
import { useLanguage } from '../../i18n'
import { API_BASE } from '../../config'

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
  mortality_delta: number
}

interface SimMeta {
  title: string
  country: string
  horizon_years: number
  n_agents: number
  scenario?: string
}

interface Props {
  proposal: Proposal
  summary:  SimSummary
  meta:     SimMeta
}

function sign(v: number) { return v >= 0 ? '+' : '' }
function fmt(v: number, unit = '', decimals = 2) {
  return `${sign(v)}${v.toFixed(decimals)}${unit}`
}

/* ── Streaming AI conclusion ────────────────────────────────────────────────── */

function AIConclusion({ proposal, summary, meta }: Props) {
  const { t, lang }       = useLanguage()
  const [text, setText]   = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const abortRef          = useRef<(() => void) | null>(null)

  useEffect(() => { return () => abortRef.current?.() }, [])

  async function run() {
    setText(''); setStatus('loading')
    let done = false
    try {
      const res = await fetch(`${API_BASE}/simulate/interpret/historical`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          summary,
          meta,
          historical_outcomes: proposal.historicalOutcomes,
          lang,
        }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const reader  = res.body!.getReader()
      const decoder = new TextDecoder()
      abortRef.current = () => { done = true; reader.cancel() }
      while (!done) {
        const { value, done: sd } = await reader.read()
        if (sd) break
        for (const line of decoder.decode(value).split('\n')) {
          if (!line.startsWith('data:')) continue
          try {
            const obj = JSON.parse(line.slice(5).trim())
            if (obj.type === 'text')  setText(p => p + obj.text)
            if (obj.type === 'error') { setStatus('error'); setText(obj.message); return }
            if (obj.type === 'done')  { setStatus('done'); return }
          } catch { /* partial chunk */ }
        }
      }
      setStatus('done')
    } catch (e) {
      setStatus('error')
      setText(e instanceof Error ? e.message : t.errors.generic)
    }
  }

  return (
    <div className="bg-white border border-emerald-200 rounded-xl p-3 space-y-2">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wide flex items-center gap-1">
          <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[8px]">✦</span>
          {t.simulation.ai_title} — Simulation vs Réalité
        </span>
        {status === 'idle' && (
          <button onClick={run}
            className="text-[10px] bg-emerald-600 text-white px-2.5 py-1 rounded-lg hover:bg-emerald-700 font-semibold">
            {t.simulation.ai_btn}
          </button>
        )}
        {status === 'done' && (
          <button onClick={() => { setText(''); setStatus('idle') }}
            className="text-[10px] text-emerald-600 hover:underline">
            {t.simulation.ai_regenerate}
          </button>
        )}
      </div>

      {status === 'idle' && (
        <p className="text-[10px] text-slate-400 italic">{t.simulation.ai_idle}</p>
      )}
      {status === 'loading' && !text && (
        <p className="text-[10px] text-slate-400 animate-pulse">{t.simulation.ai_loading}</p>
      )}
      {(status === 'loading' || status === 'done') && text && (
        <div className="text-xs text-slate-700 leading-relaxed whitespace-pre-wrap">
          {text}
          {status === 'loading' && (
            <span className="inline-block w-0.5 h-3 bg-emerald-500 animate-pulse ml-0.5 align-middle" />
          )}
        </div>
      )}
      {status === 'error' && (
        <p className="text-[10px] text-rose-600">{t.simulation.ai_error_prefix} {text}</p>
      )}
    </div>
  )
}

/* ── Main comparison panel ──────────────────────────────────────────────────── */

export default function HistoricalComparison({ proposal, summary: s, meta }: Props) {
  const { t } = useLanguage()
  const ho    = proposal.historicalOutcomes
  if (!ho) return null

  const modelRows = [
    { label: 'PIB / GDP',    value: fmt(s.gdp_delta_pct, '%') },
    { label: 'Gini revenus', value: fmt(s.gini_delta, '', 3) },
    { label: 'Emploi',       value: fmt(s.employment_delta * 100, ' pp') },
    { label: 'Pauvreté',     value: fmt(s.poverty_delta * 100, ' pp') },
    { label: 'Bien-être',    value: fmt(s.wellbeing_delta * 100, ' pp') },
    { label: 'Santé',        value: fmt(s.health_delta * 100, ' pp') },
  ]

  const realRows = [
    { label: 'PIB / GDP',  value: ho.gdp_impact },
    { label: 'Emploi',     value: ho.employment_impact },
    { label: 'Inégalités', value: ho.inequality_impact },
    { label: 'Fiscal',     value: ho.fiscal_impact },
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

      <div className="p-4 space-y-3">

        {/* Side-by-side */}
        <div className="grid grid-cols-2 gap-3">
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

          <div className="bg-emerald-100 border border-emerald-200 rounded-xl p-3">
            <div className="text-[10px] font-bold text-emerald-700 uppercase tracking-wide mb-2">
              {t.simulation.hist_reality_label}
            </div>
            <div className="space-y-1.5">
              {realRows.map(r => (
                <div key={r.label} className="flex items-start gap-2">
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

        {/* AI conclusion */}
        <AIConclusion proposal={proposal} summary={s} meta={meta} />

        {/* Sources + disclaimer */}
        <div className="space-y-0.5">
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
