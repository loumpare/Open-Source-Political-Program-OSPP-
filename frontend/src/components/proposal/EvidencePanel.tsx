import { BookOpen, ExternalLink } from 'lucide-react'
import { Proposal, DOMAIN_META } from '../../data/proposals'

interface Props { proposal: Proposal }

export default function EvidencePanel({ proposal }: Props) {
  const meta = DOMAIN_META[proposal.domain]

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
      <div className="flex items-center gap-2">
        <BookOpen size={16} className="text-slate-400" />
        <h3 className="font-semibold text-slate-900">Scientific sources</h3>
        <span className="ml-auto text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
          {proposal.sources.length} references
        </span>
      </div>

      <p className="text-xs text-slate-500">
        This proposal is grounded in peer-reviewed research. All sources are publicly available.
      </p>

      <ul className="space-y-3">
        {proposal.sources.map((s, i) => (
          <li key={i} className={`flex gap-3 p-3 rounded-xl border ${meta.bg}`}>
            <span className={`mt-0.5 font-mono text-xs font-bold ${meta.color} shrink-0`}>
              [{i + 1}]
            </span>
            <div>
              <p className={`text-xs font-medium ${meta.color}`}>{s.label}</p>
              <p className="text-xs text-slate-400 mt-0.5">{s.year}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="pt-2 border-t border-slate-100">
        <p className="text-xs text-slate-400 mb-2">Full research catalog (208 sources across 4 domains):</p>
        <a
          href="https://github.com/loumpare/Open-Source-Political-Program-OSPP-/tree/main/research"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ExternalLink size={12} />
          Browse on GitHub
        </a>
      </div>
    </div>
  )
}
