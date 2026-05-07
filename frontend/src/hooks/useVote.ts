import { useState, useEffect } from 'react'

type Vote = 1 | -1 | 0

interface VoteState {
  support: number
  oppose: number
  userVote: Vote
}

const STORAGE_KEY = 'ospp_votes'

function loadVotes(): Record<string, VoteState> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
  } catch {
    return {}
  }
}

const INITIAL_VOTES: Record<string, { support: number; oppose: number }> = {
  'ECO-FR-001': { support: 847, oppose: 203 },
  'SOC-FR-001': { support: 612, oppose: 318 },
  'ENV-FR-001': { support: 934, oppose: 142 },
  'EDU-FR-001': { support: 721, oppose: 89 },
  'ECO-US-001': { support: 1204, oppose: 387 },
  'GOV-GLOBAL-001': { support: 502, oppose: 61 },
}

export function useVote(proposalId: string) {
  const [state, setState] = useState<VoteState>(() => {
    const stored = loadVotes()
    const initial = INITIAL_VOTES[proposalId] ?? { support: 0, oppose: 0 }
    return {
      support: initial.support + (stored[proposalId]?.support ?? 0),
      oppose: initial.oppose + (stored[proposalId]?.oppose ?? 0),
      userVote: (stored[proposalId]?.userVote ?? 0) as Vote,
    }
  })

  const vote = (v: 1 | -1) => {
    setState(prev => {
      const isUndo = prev.userVote === v
      const newVote: Vote = isUndo ? 0 : v

      const deltaSupport =
        (newVote === 1 ? 1 : 0) - (prev.userVote === 1 ? 1 : 0)
      const deltaOppose =
        (newVote === -1 ? 1 : 0) - (prev.userVote === -1 ? 1 : 0)

      const next: VoteState = {
        support: prev.support + deltaSupport,
        oppose: prev.oppose + deltaOppose,
        userVote: newVote,
      }

      const stored = loadVotes()
      stored[proposalId] = next
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stored))
      return next
    })
  }

  const total = state.support + state.oppose
  const supportPct = total > 0 ? Math.round((state.support / total) * 100) : 50

  return { ...state, total, supportPct, vote }
}
