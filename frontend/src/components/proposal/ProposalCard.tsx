import { Link } from 'react-router-dom'
import { Users, BookOpen, ArrowRight } from 'lucide-react'
import { Proposal, DOMAIN_META, STATUS_META } from '../../data/proposals'
import { useVote } from '../../hooks/useVote'

interface Props { proposal: Proposal }

export default function ProposalCard({ proposal }: Props) {
  const domain = DOMAIN_META[proposal.domain]
  const status = STATUS_META[proposal.status]
  const { supportPct, total } = useVote(proposal.id)

  return (
    <Link
      to={`/proposals/${proposal.id}`}
      className="group block rounded-2xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-lg hover:shadow-slate-100 transition-all duration-200 overflow-hidden"
    >
      {/* Domain stripe */}
      <div className={`h-1 w-full ${domain.stripe}`} />

      <div className="p-5 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${domain.bg} ${domain.color}`}>
              {domain.icon} {domain.label}
            </span>
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${status.color}`}>
              {status.label}
            </span>
          </div>
          <span className="text-lg shrink-0" title={proposal.country}>
            {proposal.countryFlag}
          </span>
        </div>

        {/* Title */}
        <div>
          <p className="text-xs font-mono text-slate-400 mb-1">{proposal.id}</p>
          <h3 className="font-semibold text-slate-900 text-balance leading-snug group-hover:text-slate-700 transition-colors">
            {proposal.title}
          </h3>
        </div>

        {/* Summary */}
        <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
          {proposal.summary}
        </p>

        {/* Vote bar */}
        <div>
          <div className="flex justify-between text-xs mb-1.5">
            <span className="font-medium text-emerald-600">{supportPct}% support</span>
            <span className="text-slate-400">{total.toLocaleString()} votes</span>
          </div>
          <div className="h-2 rounded-full bg-red-100 overflow-hidden">
            <div
              className="h-full bg-emerald-400 rounded-full transition-all duration-700"
              style={{ width: `${supportPct}%` }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Users size={11} />
              {proposal.populationAffected}
            </span>
            <span className="flex items-center gap-1">
              <BookOpen size={11} />
              {proposal.sources.length} sources
            </span>
          </div>
          <span className="flex items-center gap-1 text-xs font-medium text-slate-400 group-hover:text-slate-900 transition-colors">
            Read <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  )
}
