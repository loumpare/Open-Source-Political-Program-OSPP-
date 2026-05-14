import { ThumbsUp, ThumbsDown } from 'lucide-react'
import { useVote } from '../../hooks/useVote'

interface Props { proposalId: string }

export default function VoteWidget({ proposalId }: Props) {
  const { support, oppose, total, supportPct, userVote, vote, cryptoError } = useVote(proposalId)

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-5">
      <h3 className="font-semibold text-slate-900">Community vote</h3>

      {/* Bar */}
      <div>
        <div className="flex justify-between text-sm mb-2">
          <span className="font-semibold text-emerald-600">{supportPct}% support</span>
          <span className="text-slate-400">{total.toLocaleString()} votes</span>
        </div>
        <div className="h-3 rounded-full bg-red-100 overflow-hidden">
          <div
            className="h-full bg-emerald-400 rounded-full transition-all duration-500"
            style={{ width: `${supportPct}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-slate-400 mt-1.5">
          <span>{support.toLocaleString()} for</span>
          <span>{oppose.toLocaleString()} against</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => vote(1)}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium text-sm transition-all ${
            userVote === 1
              ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-100'
              : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
          }`}
        >
          <ThumbsUp size={16} />
          Support
        </button>
        <button
          onClick={() => vote(-1)}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium text-sm transition-all ${
            userVote === -1
              ? 'bg-red-500 text-white shadow-lg shadow-red-100'
              : 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
          }`}
        >
          <ThumbsDown size={16} />
          Oppose
        </button>
      </div>

      {userVote !== 0 && (
        <p className="text-center text-xs text-slate-400">
          Click again to undo your vote
        </p>
      )}

      {cryptoError && (
        <p className="text-center text-xs text-amber-600 bg-amber-50 rounded-lg px-2 py-1">
          HTTPS required for cryptographic votes
        </p>
      )}

      <p className="text-xs text-slate-400 text-center pt-1">
        No account needed · Cryptographic · Anonymous
      </p>
    </div>
  )
}
