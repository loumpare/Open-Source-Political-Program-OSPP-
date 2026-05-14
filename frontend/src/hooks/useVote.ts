import { useState, useEffect, useCallback } from 'react'
import { API_BASE } from '../config'
import { signVote } from '../lib/crypto'

type Vote = 1 | -1 | 0

interface VoteState {
  support:    number
  oppose:     number
  total:      number
  supportPct: number
  userVote:   Vote
  loading:    boolean
  cryptoError: boolean
}

const API = API_BASE

// Fallback seed counts when the API is offline
const SEEDS: Record<string, { support: number; oppose: number }> = {
  'ECO-FR-001':     { support: 847,  oppose: 203 },
  'SOC-FR-001':     { support: 612,  oppose: 318 },
  'ENV-FR-001':     { support: 934,  oppose: 142 },
  'EDU-FR-001':     { support: 721,  oppose: 89  },
  'ECO-US-001':     { support: 1204, oppose: 387 },
  'GOV-GLOBAL-001': { support: 502,  oppose: 61  },
  'ECO-DK-001':     { support: 388,  oppose: 72  },
  'EDU-DK-001':     { support: 291,  oppose: 44  },
  'SOC-DK-001':     { support: 443,  oppose: 118 },
  'ECO-DE-001':     { support: 519,  oppose: 143 },
  'ENV-DE-001':     { support: 612,  oppose: 201 },
  'SOC-SE-001':     { support: 734,  oppose: 88  },
  'ECO-NO-001':     { support: 289,  oppose: 41  },
  'ENV-NO-001':     { support: 821,  oppose: 134 },
  'EDU-FI-001':     { support: 677,  oppose: 92  },
  'ECO-FI-001':     { support: 534,  oppose: 287 },
  'SOC-FI-001':     { support: 498,  oppose: 33  },
  'HLT-CA-001':     { support: 891,  oppose: 102 },
  'ECO-CA-001':     { support: 643,  oppose: 228 },
  'HLT-GB-001':     { support: 1102, oppose: 344 },
  'SOC-GB-001':     { support: 788,  oppose: 267 },
}

const USER_VOTE_KEY = 'ospp_user_votes_v4'

function getSavedVote(id: string): Vote {
  try {
    return (JSON.parse(localStorage.getItem(USER_VOTE_KEY) || '{}')[id] ?? 0) as Vote
  } catch { return 0 }
}

function saveVote(id: string, v: Vote) {
  try {
    const all = JSON.parse(localStorage.getItem(USER_VOTE_KEY) || '{}')
    all[id] = v
    localStorage.setItem(USER_VOTE_KEY, JSON.stringify(all))
  } catch {}
}

function makePct(s: number, o: number) {
  const t = s + o
  return t > 0 ? Math.round(s / t * 100) : 50
}

function fallback(id: string, userVote: Vote): Omit<VoteState, 'loading' | 'cryptoError'> {
  const seed = SEEDS[id] ?? { support: 0, oppose: 0 }
  const s = seed.support + (userVote === 1  ? 1 : 0)
  const o = seed.oppose  + (userVote === -1 ? 1 : 0)
  return { support: s, oppose: o, total: s + o, supportPct: makePct(s, o), userVote }
}

export function useVote(proposalId: string) {
  const [state, setState] = useState<VoteState>(() => ({
    ...fallback(proposalId, getSavedVote(proposalId)),
    loading: true,
    cryptoError: false,
  }))

  useEffect(() => {
    let alive = true
    fetch(`${API}/votes/${proposalId}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (!alive || !data) return
        setState(prev => ({
          support:     data.support,
          oppose:      data.oppose,
          total:       data.total,
          supportPct:  data.support_pct,
          userVote:    prev.userVote,
          loading:     false,
          cryptoError: prev.cryptoError,
        }))
      })
      .catch(() => { if (alive) setState(prev => ({ ...prev, loading: false })) })
    return () => { alive = false }
  }, [proposalId])

  const vote = useCallback(async (v: 1 | -1) => {
    const isUndo   = state.userVote === v
    const newVote: Vote = isUndo ? 0 : v

    // Optimistic update
    const prev = state
    const ds = (newVote === 1  ? 1 : 0) - (prev.userVote === 1  ? 1 : 0)
    const do_ = (newVote === -1 ? 1 : 0) - (prev.userVote === -1 ? 1 : 0)
    const s = prev.support + ds
    const o = prev.oppose  + do_
    setState({ support: s, oppose: o, total: s + o,
               supportPct: makePct(s, o), userVote: newVote,
               loading: false, cryptoError: false })
    saveVote(proposalId, newVote)

    // Sign and submit
    try {
      const signed = await signVote(proposalId, newVote)
      const res = await fetch(`${API}/votes/${proposalId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...signed, value: newVote }),
      })
      if (res.ok) {
        const data = await res.json()
        setState(prev2 => ({
          support:     data.support,
          oppose:      data.oppose,
          total:       data.total,
          supportPct:  data.support_pct,
          userVote:    prev2.userVote,
          loading:     false,
          cryptoError: false,
        }))
      }
    } catch (err) {
      const name = err instanceof Error ? err.name : ''
      const msg  = err instanceof Error ? err.message : ''
      // Web Crypto unavailable (non-HTTPS, old browser, or IndexedDB blocked)
      const isCryptoErr =
        name === 'NotSupportedError' ||
        name === 'SecurityError' ||
        name === 'InvalidStateError' ||
        msg.includes('subtle') ||
        msg.includes('IndexedDB') ||
        msg.includes('crypto')
      if (isCryptoErr) {
        setState(prev2 => ({ ...prev2, cryptoError: true }))
      }
      // Network error or server 4xx/5xx: optimistic update stays (will sync on reload)
    }
  }, [proposalId, state])

  return { ...state, vote }
}
