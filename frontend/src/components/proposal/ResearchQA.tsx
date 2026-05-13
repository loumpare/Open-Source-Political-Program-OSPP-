import { useState, useRef, useEffect } from 'react'
import { Send, BookOpen, Loader2, AlertCircle, ChevronDown, ChevronUp, FlaskConical } from 'lucide-react'
import { Proposal, DOMAIN_META } from '../../data/proposals'

const RAG_URL = 'http://127.0.0.1:8001/ask'

interface Source {
  rank: number
  title: string
  authors: string
  year: string
  subdomain: string
  score: number
}

interface ResearchQAProps {
  proposal: Proposal
}

export default function ResearchQA({ proposal }: ResearchQAProps) {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [sources, setSources] = useState<Source[]>([])
  const [status, setStatus] = useState<'idle' | 'loading' | 'streaming' | 'done' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [showSources, setShowSources] = useState(false)
  const abortRef = useRef<AbortController | null>(null)
  const answerRef = useRef<HTMLDivElement>(null)
  const domain = DOMAIN_META[proposal.domain]

  useEffect(() => {
    if (answerRef.current && status === 'streaming') {
      answerRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [answer, status])

  const ask = async () => {
    const q = question.trim()
    if (!q || status === 'loading' || status === 'streaming') return

    setAnswer('')
    setSources([])
    setStatus('loading')
    setErrorMsg('')
    setShowSources(false)

    abortRef.current?.abort()
    abortRef.current = new AbortController()

    try {
      const res = await fetch(RAG_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: q,
          domain: proposal.domain,
          proposal_id: proposal.id,
          proposal_title: proposal.title,
          proposal_summary: proposal.summary,
        }),
        signal: abortRef.current.signal,
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({ detail: 'Server error' }))
        throw new Error(err.detail ?? `HTTP ${res.status}`)
      }

      setStatus('streaming')

      const reader = res.body!.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() ?? ''

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          try {
            const evt = JSON.parse(line.slice(6))
            if (evt.type === 'sources') {
              setSources(evt.sources)
            } else if (evt.type === 'text') {
              setAnswer(prev => prev + evt.text)
            } else if (evt.type === 'error') {
              setErrorMsg(evt.message)
              setStatus('error')
            } else if (evt.type === 'done') {
              setStatus('done')
            }
          } catch {}
        }
      }

      if (status !== 'error') setStatus('done')
    } catch (e: any) {
      if (e.name === 'AbortError') return
      setErrorMsg(
        e.message.includes('fetch') || e.message.includes('Failed')
          ? 'Research API not running. Start it with: source .venv/bin/activate && python research/api.py'
          : e.message
      )
      setStatus('error')
    }
  }

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      ask()
    }
  }

  const reset = () => {
    abortRef.current?.abort()
    setStatus('idle')
    setAnswer('')
    setSources([])
    setErrorMsg('')
    setQuestion('')
  }

  const isActive = status === 'loading' || status === 'streaming'

  return (
    <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
      {/* Header */}
      <div className={`px-5 py-4 flex items-center gap-3 border-b border-slate-100 ${domain.bg}`}>
        <FlaskConical size={16} className={domain.color} />
        <div>
          <p className={`text-sm font-semibold ${domain.color}`}>Ask the research</p>
          <p className="text-xs text-slate-500">4,827 peer-reviewed chunks · claude-haiku</p>
        </div>
      </div>

      <div className="p-5 space-y-4">
        {/* Suggested questions */}
        {status === 'idle' && (
          <div className="flex flex-wrap gap-2">
            {[
              'What does the research say about the main risks?',
              'What is the measured impact on employment?',
              'How much does it cost compared to alternatives?',
              'Which countries have tried this?',
            ].map(q => (
              <button
                key={q}
                onClick={() => { setQuestion(q); }}
                className="text-xs px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors text-left"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={question}
            onChange={e => setQuestion(e.target.value)}
            onKeyDown={onKey}
            placeholder="Ask a question about the evidence…"
            disabled={isActive}
            className="flex-1 text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:bg-white transition-all disabled:opacity-50"
          />
          {isActive ? (
            <button
              onClick={reset}
              className="shrink-0 px-3 py-2.5 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
              title="Stop"
            >
              <Loader2 size={16} className="animate-spin" />
            </button>
          ) : (
            <button
              onClick={ask}
              disabled={!question.trim()}
              className={`shrink-0 px-3 py-2.5 rounded-xl transition-colors ${
                question.trim()
                  ? 'bg-slate-900 text-white hover:bg-slate-700'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
              title="Send (Enter)"
            >
              <Send size={16} />
            </button>
          )}
        </div>

        {/* Loading state */}
        {status === 'loading' && (
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Loader2 size={12} className="animate-spin" />
            Searching 4,827 research chunks…
          </div>
        )}

        {/* Error */}
        {status === 'error' && (
          <div className="rounded-xl bg-red-50 border border-red-200 p-3 flex gap-2">
            <AlertCircle size={14} className="text-red-500 shrink-0 mt-0.5" />
            <p className="text-xs text-red-700 leading-relaxed">{errorMsg}</p>
          </div>
        )}

        {/* Answer */}
        {(status === 'streaming' || status === 'done') && answer && (
          <div ref={answerRef} className="space-y-3">
            {/* Sources toggle */}
            {sources.length > 0 && (
              <button
                onClick={() => setShowSources(s => !s)}
                className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition-colors"
              >
                <BookOpen size={11} />
                {sources.length} sources retrieved
                {showSources ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
              </button>
            )}

            {/* Sources list */}
            {showSources && sources.length > 0 && (
              <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                {sources.map(s => (
                  <div key={s.rank} className="flex items-start gap-2">
                    <span className="shrink-0 text-xs font-mono text-slate-400 w-5">[{s.rank}]</span>
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-slate-700 leading-snug line-clamp-1">{s.title}</p>
                      <p className="text-xs text-slate-400">
                        {s.authors ? `${s.authors}, ` : ''}{s.year}
                        {' · '}
                        <span className={`font-medium ${s.score > 0.6 ? 'text-emerald-600' : s.score > 0.4 ? 'text-amber-600' : 'text-slate-400'}`}>
                          {Math.round(s.score * 100)}% match
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Answer text */}
            <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
              {answer}
              {status === 'streaming' && (
                <span className="inline-block w-0.5 h-3.5 bg-slate-400 ml-0.5 animate-pulse align-middle" />
              )}
            </div>

            {/* Reset */}
            {status === 'done' && (
              <button
                onClick={reset}
                className="text-xs text-slate-400 hover:text-slate-700 transition-colors"
              >
                Ask another question
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
