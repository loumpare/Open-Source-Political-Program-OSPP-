import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Users, FlaskConical, Globe2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { PROPOSALS, DOMAIN_META } from '../data/proposals'
import ProposalCard from '../components/proposal/ProposalCard'

const STATS = [
  { icon: BookOpen,     value: '208',    label: 'Peer-reviewed sources' },
  { icon: FlaskConical, value: '3,660',  label: 'Indexed research chunks' },
  { icon: Users,        value: '6',      label: 'Active proposals' },
  { icon: Globe2,       value: '3',      label: 'Countries covered' },
]

const DOMAINS = Object.entries(DOMAIN_META).map(([key, val]) => ({
  key,
  ...val,
  count: PROPOSALS.filter(p => p.domain === key).length,
}))

export default function Home() {
  const featured = PROPOSALS.slice(0, 3)

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            Open source · Science-backed · No lobbyists
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight text-balance mb-6">
            Political proposals
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-slate-400">
              grounded in evidence.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg text-slate-500 leading-relaxed mb-10">
            Every proposal on this platform is backed by peer-reviewed research.
            Read the science, vote, and help improve each proposal directly on GitHub.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/proposals"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-700 transition-colors"
            >
              Explore proposals
              <ArrowRight size={16} />
            </Link>
            <a
              href="https://github.com/loumpare/Open-Source-Political-Program-OSPP-"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-slate-700 font-semibold rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors"
            >
              View on GitHub
            </a>
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="border-y border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className="flex flex-col items-center text-center"
              >
                <s.icon size={20} className="text-slate-400 mb-2" />
                <span className="text-3xl font-black text-slate-900">{s.value}</span>
                <span className="text-sm text-slate-500 mt-1">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Domains */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">Browse by domain</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {DOMAINS.map(d => (
            <Link
              key={d.key}
              to={`/proposals?domain=${d.key}`}
              className={`p-5 rounded-2xl border ${d.bg} hover:shadow-md transition-all group`}
            >
              <span className="text-3xl mb-3 block">{d.icon}</span>
              <p className={`font-bold ${d.color} text-sm`}>{d.label}</p>
              <p className="text-xs text-slate-500 mt-1">
                {d.count} proposal{d.count !== 1 ? 's' : ''}
              </p>
              <ArrowRight
                size={14}
                className={`mt-3 ${d.color} opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all`}
              />
            </Link>
          ))}
        </div>
      </section>

      {/* Featured proposals */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Featured proposals</h2>
          <Link
            to="/proposals"
            className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {featured.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
            >
              <ProposalCard proposal={p} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="rounded-3xl bg-slate-900 text-white p-10 md:p-14 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-black mb-3">Help improve these proposals.</h2>
            <p className="text-slate-400 leading-relaxed">
              Every proposal is a living document. Cite a study, fix a number, or open a debate on GitHub — your contribution is tracked and credited.
            </p>
          </div>
          <a
            href="https://github.com/loumpare/Open-Source-Political-Program-OSPP-"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-6 py-3.5 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-100 transition-colors"
          >
            Contribute on GitHub →
          </a>
        </div>
      </section>
    </div>
  )
}
