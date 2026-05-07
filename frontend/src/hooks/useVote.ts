import { useState } from 'react'

type Vote = 1 | -1 | 0

interface VoteState {
  support: number
  oppose: number
  userVote: Vote
}

const VOTES_KEY = 'ospp_votes_v2'
const TOKEN_KEY = 'ospp_voter_token'

/**
 * Returns a persistent anonymous voter token for this device.
 * Generated once, stored in localStorage, never tied to any identity.
 * The backend hashes it with the proposal ID before storing, so even
 * a full DB dump cannot link a token back to a user.
 */
function getVoterToken(): string {
  let token = localStorage.getItem(TOKEN_KEY)
  if (!token) {
    // crypto.randomUUID() is available in all modern browsers
    token = typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2) + Date.now().toString(36)
    localStorage.setItem(TOKEN_KEY, token)
  }
  return token
}

function loadVotes(): Record<string, VoteState> {
  try {
    return JSON.parse(localStorage.getItem(VOTES_KEY) || '{}')
  } catch {
    return {}
  }
}

const SEED_VOTES: Record<string, { support: number; oppose: number }> = {
  'ECO-FR-001':     { support: 847,  oppose: 203 },
  'SOC-FR-001':     { support: 612,  oppose: 318 },
  'ENV-FR-001':     { support: 934,  oppose: 142 },
  'EDU-FR-001':     { support: 721,  oppose: 89  },
  'ECO-US-001':     { support: 1204, oppose: 387 },
  'GOV-GLOBAL-001': { support: 502,  oppose: 61  },
}

const API_BASE = import.meta.env.VITE_API_URL || ''

async function submitVoteToApi(proposalId: string, support: 1 | -1): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/api/propositions/${proposalId}/vote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ voter_token: getVoterToken(), support }),
    })
    return res.ok
  } catch {
    return false   // API unavailable — fall back to localStorage only
  }
}

export function useVote(proposalId: string) {
  const [state, setState] = useState<VoteState>(() => {
    const stored = loadVotes()
    const seed = SEED_VOTES[proposalId] ?? { support: 0, oppose: 0 }
    const local = stored[proposalId]
    return {
      support: seed.support + (local?.userVote === 1 ? 1 : 0),
      oppose:  seed.oppose  + (local?.userVote === -1 ? 1 : 0),
      userVote: (local?.userVote ?? 0) as Vote,
    }
  })

  const vote = async (v: 1 | -1) => {
    const isUndo = state.userVote === v
    const newVote: Vote = isUndo ? 0 : v

    const deltaSupport = (newVote === 1 ? 1 : 0) - (state.userVote === 1 ? 1 : 0)
    const deltaOppose  = (newVote === -1 ? 1 : 0) - (state.userVote === -1 ? 1 : 0)

    const next: VoteState = {
      support:  state.support + deltaSupport,
      oppose:   state.oppose  + deltaOppose,
      userVote: newVote,
    }

    // Optimistic update immediately
    setState(next)

    // Persist locally (UI state only — not the source of truth)
    const stored = loadVotes()
    stored[proposalId] = next
    localStorage.setItem(VOTES_KEY, JSON.stringify(stored))

    // Submit to API asynchronously (no-op if backend unavailable)
    if (newVote !== 0) {
      submitVoteToApi(proposalId, newVote)
    }
  }

  const total = state.support + state.oppose
  const supportPct = total > 0 ? Math.round((state.support / total) * 100) : 50

  return { ...state, total, supportPct, vote }
}
