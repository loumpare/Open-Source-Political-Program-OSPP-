import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { PROPOSALS, DOMAIN_META, RESEARCH_STATS } from '../data/proposals'
import ProposalCard from '../components/proposal/ProposalCard'
import { useLanguage } from '../i18n'

const COUNTRIES_RAW = Array.from(new Set(PROPOSALS.map(p => p.country))).sort()

export default function Proposals() {
  const { t } = useLanguage()
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery]   = useState('')
  const [country, setCountry] = useState('All')

  const domainParam = searchParams.get('domain') ?? 'all'

  const DOMAINS = [
    { key: 'all', label: t.proposals.filter_all },
    ...Object.entries(DOMAIN_META).map(([k, v]) => ({
      key: k,
      label: `${v.icon} ${t.domains[k as keyof typeof t.domains] ?? v.label}`,
    })),
  ]

  const COUNTRIES = [t.proposals.filter_all, ...COUNTRIES_RAW]

  const setDomain = (d: string) => {
    if (d === 'all') setSearchParams({})
    else setSearchParams({ domain: d })
  }

  const filtered = useMemo(() => {
    return PROPOSALS.filter(p => {
      if (domainParam !== 'all' && p.domain !== domainParam) return false
      if (country !== t.proposals.filter_all && p.country !== country) return false
      if (query) {
        const q = query.toLowerCase()
        return (
          p.title.toLowerCase().includes(q) ||
          p.summary.toLowerCase().includes(q) ||
          p.tags.some(tag => tag.toLowerCase().includes(q))
        )
      }
      return true
    })
  }, [domainParam, country, query, t])

  return (
    <div className="pt-16 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="py-12">
        <h1 className="text-4xl font-black text-slate-900 mb-3">
          {t.proposals.page_title}
        </h1>
        <p className="text-slate-500 text-lg">
          {PROPOSALS.length} {t.home.stats_proposals} · {RESEARCH_STATS.sources} {t.home.stats_sources}
        </p>
      </div>

      {/* Search + country filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder={t.proposals.search_placeholder}
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white
                       text-sm text-slate-900 placeholder-slate-400
                       focus:outline-none focus:ring-2 focus:ring-slate-900/10
                       focus:border-slate-400 transition-colors"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
            >
              <X size={14} />
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={15} className="text-slate-400" />
          <select
            value={country}
            onChange={e => setCountry(e.target.value)}
            className="py-2.5 px-3 rounded-xl border border-slate-200 bg-white
                       text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
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

      {/* Results count */}
      <div className="mb-4 text-sm text-slate-400">
        {t.proposals.results_count(filtered.length)}
        {query && ` — "${query}"`}
      </div>

      <AnimatePresence mode="popLayout">
        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center text-slate-400"
          >
            <p className="text-lg font-medium mb-2">{t.proposals.no_results}</p>
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
