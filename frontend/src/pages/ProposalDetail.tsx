import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, Users, Calendar, GitPullRequest, Tag } from 'lucide-react'
import { motion } from 'framer-motion'
import { PROPOSALS, DOMAIN_META, STATUS_META } from '../data/proposals'
import VoteWidget from '../components/proposal/VoteWidget'
import EvidencePanel from '../components/proposal/EvidencePanel'

export default function ProposalDetail() {
  const { id } = useParams<{ id: string }>()
  const proposal = PROPOSALS.find(p => p.id === id)

  if (!proposal) return <Navigate to="/proposals" replace />

  const domain = DOMAIN_META[proposal.domain]
  const status = STATUS_META[proposal.status]

  const domainStripe =
    proposal.domain === 'economy' ? 'from-amber-400 to-amber-300' :
    proposal.domain === 'education' ? 'from-purple-400 to-purple-300' :
    proposal.domain === 'environment' ? 'from-emerald-400 to-emerald-300' :
    'from-blue-400 to-blue-300'

  return (
    <div className="pt-16">
      {/* Domain gradient header */}
      <div className={`h-1.5 bg-gradient-to-r ${domainStripe}`} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* Back */}
        <Link
          to="/proposals"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          All proposals
        </Link>

        <div className="grid lg:grid-cols-[1fr_320px] gap-10">
          {/* Main content */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Meta chips */}
            <div className="flex flex-wrap gap-2 mb-5">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${domain.bg} ${domain.color}`}>
                {domain.icon} {domain.label}
              </span>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${status.color}`}>
                {status.label}
              </span>
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                {proposal.countryFlag} {proposal.country}
              </span>
            </div>

            {/* ID + title */}
            <p className="text-xs font-mono text-slate-400 mb-2">{proposal.id}</p>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 text-balance leading-tight mb-6">
              {proposal.title}
            </h1>

            {/* Summary box */}
            <div className={`rounded-2xl border p-5 mb-8 ${domain.bg}`}>
              <p className={`font-semibold text-sm mb-1 ${domain.color}`}>Summary</p>
              <p className="text-slate-700 text-sm leading-relaxed">{proposal.summary}</p>
            </div>

            {/* Full content */}
            <div className="prose prose-slate prose-sm max-w-none mb-10">
              {proposal.content.split('\n').map((para, i) =>
                para.trim() ? (
                  <p key={i} className="text-slate-700 leading-relaxed mb-4 whitespace-pre-wrap">
                    {para}
                  </p>
                ) : null
              )}
            </div>

            {/* Impact stats */}
            <div className="grid sm:grid-cols-3 gap-4 mb-10">
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <Users size={16} className="text-slate-400 mb-2" />
                <p className="text-xs text-slate-400 mb-1">Population affected</p>
                <p className="font-bold text-slate-900 text-sm">{proposal.populationAffected}</p>
              </div>
              {proposal.estimatedCost && (
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <span className="text-base mb-2 block">💰</span>
                  <p className="text-xs text-slate-400 mb-1">Estimated cost</p>
                  <p className="font-bold text-slate-900 text-sm">{proposal.estimatedCost}</p>
                </div>
              )}
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <Calendar size={16} className="text-slate-400 mb-2" />
                <p className="text-xs text-slate-400 mb-1">Proposed</p>
                <p className="font-bold text-slate-900 text-sm">{proposal.date}</p>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-10">
              {proposal.tags.map(t => (
                <span key={t} className="inline-flex items-center gap-1 text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
                  <Tag size={10} />
                  {t}
                </span>
              ))}
            </div>

            {/* Contribute CTA */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <p className="font-semibold text-slate-900 mb-1">Improve this proposal</p>
                <p className="text-sm text-slate-500">
                  Found a better source? Spotted an error? Open a Pull Request on GitHub — your contribution is tracked.
                </p>
              </div>
              <a
                href={`https://github.com/loumpare/Open-Source-Political-Program-OSPP-/tree/main/propositions`}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-xl hover:bg-slate-700 transition-colors"
              >
                <GitPullRequest size={14} />
                Open on GitHub
              </a>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="space-y-5"
          >
            <VoteWidget proposalId={proposal.id} />
            <EvidencePanel proposal={proposal} />

            {/* Impact statement */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Key impact</p>
              <p className="text-sm text-slate-700 leading-relaxed">{proposal.impactStatement}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
