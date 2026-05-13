import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { PROPOSALS, DOMAIN_META, RESEARCH_STATS, Domain } from '../data/proposals'
import ProposalCard from '../components/proposal/ProposalCard'

const COUNTRIES = ['All', ...Array.from(new Set(PROPOSALS.map(p => p.country))).sort()]
const DOMAINS: { key: string; label: string }[] = [
  { key: 'all', label: 'All domains' },
  ...Object.entries(DOMAIN_META).map(([k, v]) => ({ key: k, label: `${v.icon} ${v.label}` })),
]

export default function Proposals() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const [country, setCountry] = useState('All')

  const domainParam = searchParams.get('domain') ?? 'all'

  const setDomain = (d: string) => {
    if (d === 'all') setSearchParams({})
    else setSearchParams({ domain: d })
  }

  const filtered = useMemo(() => {
    return PROPOSALS.filter(p => {
      if (domainParam !== 'all' && p.domain !== domainParam) return false
      if (country !== 'All' && p.country !== country) return false
      if (query) {
        const q = query.toLowerCase()
        return (
          p.title.toLowerCase().includes(q) ||
          p.summary.toLowerCase().includes(q) ||
          p.tags.some(t => t.toLowerCase().includes(q))
        )
      }
      return true
    })
  }, [domainParam, country, query])

  return (
    <div className="pt-16 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="py-12">
        <h1 className="text-4xl font-black text-slate-900 mb-3">Proposals</h1>
        <p className="text-slate-500 text-lg">
          {PROPOSALS.length} open-source policy proposals backed by {RESEARCH_STATS.sources} peer-reviewed sources.
        </p>
      </div>

      {/* Search + filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search proposals, topics, tags…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-colors"
          />
          {query && (
            <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700">
              <X size={14} />
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={15} className="text-slate-400" />
          <select
            value={country}
            onChange={e => setCountry(e.target.value)}
            className="py-2.5 px-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
          >
            {COUNTRIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Domain tabs */}
      <div className="flex gap-2 flex-wrap mb-8">
        {DOMAINS.map(d => (
          <button
            key={d.key}
            onClick={() => setDomain(d.key)}
            className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
              domainParam === d.key
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="mb-4 text-sm text-slate-400">
        {filtered.length} proposal{filtered.length !== 1 ? 's' : ''}
        {query && ` matching "${query}"`}
      </div>

      <AnimatePresence mode="popLayout">
        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center text-slate-400"
          >
            <p className="text-lg font-medium mb-2">No proposals found</p>
            <p className="text-sm">Try adjusting your filters or search term.</p>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-20"
          >
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ delay: i * 0.04 }}
              >
                <ProposalCard proposal={p} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
