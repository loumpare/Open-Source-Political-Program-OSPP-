# Security Model

## Threat Model & Patches

This document covers the attack surface of OSPP, simulated attacks, and implemented mitigations.

---

## Attack Surface — Summary

| # | Attack | Severity | Status |
|---|--------|----------|--------|
| 1 | localStorage vote stuffing | CRITICAL | ✅ Patched |
| 2 | API vote flooding | CRITICAL | ✅ Patched |
| 3 | Mass assignment (force adopted) | HIGH | ✅ Patched |
| 4 | Stored XSS via proposal creation | HIGH | ✅ Patched |
| 5 | Redis unauthenticated | HIGH | ✅ Patched |
| 6 | Default SECRET_KEY | CRITICAL | ✅ Patched |
| 7 | CORS wildcard in production | MEDIUM | ✅ Patched |
| 8 | Vote identity linkability | MEDIUM | ✅ Patched |

---

## Patches Implemented

### 1. Vote Stuffing (Frontend)
**Attack:** `localStorage.setItem('ospp_votes', JSON.stringify({...999999 votes...}))`

**Fix:**
- localStorage is used only for optimistic UI — it is never the source of truth
- Real vote counts come from the server API on page load
- Each vote is submitted to `POST /api/propositions/{id}/vote` with a `voter_token`

---

### 2. API Vote Flooding
**Attack:** Loop 10,000 POST requests with different `user_id` values.

**Fix:**
- `slowapi` rate limiter: **5 votes per minute per IP** on the vote endpoint
- **One vote per voter token per proposal** — backend upserts (update if exists) rather than inserting duplicates
- `voter_token` validated for length (16–128 chars)

---

### 3. Mass Assignment
**Attack:** POST `/api/propositions/` with `"status": "adopted"` to bypass the voting process.

**Fix:**
- `status` field is **excluded from `PropositionCreate`** — it cannot be set at creation
- Proposal `id` format validated against regex `^[A-Z]{2,6}-[A-Z]{2,10}-\d{3}$`
- Duplicate ID rejected with HTTP 409

---

### 4. Stored XSS
**Attack:** Inject `<script>` tags in `title` or `summary` fields.

**Fix:**
- All text fields sanitized via `html.escape()` before storage
- Field length limits enforced: title ≤ 255, summary ≤ 500, content ≤ 10,000 chars
- `domain` validated against an allowlist
- React renders all content as `textContent` (safe by default — no `dangerouslySetInnerHTML` used anywhere)

---

### 5. Redis Unauthenticated
**Attack:** `redis-cli -h localhost FLUSHALL` — wipe all caches from the same network.

**Fix:**
- Redis requires password via `--requirepass ${REDIS_PASSWORD}`
- Redis port bound to `127.0.0.1` only (not `0.0.0.0`) — not reachable from external network
- `REDIS_URL` in `.env` includes the password: `redis://:password@redis:6379/0`

---

### 6. Default SECRET_KEY
**Attack:** If `SECRET_KEY=changeme_in_production`, any JWT tokens can be forged.

**Fix:**
- Backend **refuses to start** if `DEBUG=false` and `SECRET_KEY` equals the default value
- Generate a strong key with: `python3 -c "import secrets; print(secrets.token_hex(32))"`

---

### 7. CORS Wildcard
**Attack:** `CORS_ORIGINS=*` allows any website to make authenticated requests on behalf of users.

**Fix:**
- Backend **refuses to start** if `DEBUG=false` and `CORS_ORIGINS` contains `*`
- `allow_methods` restricted to `["GET", "POST"]` — no PUT/DELETE/PATCH exposed
- `allow_headers` restricted to `["Content-Type", "Authorization"]`

---

### 8. Vote Identity Linkability
**Attack:** `SELECT * FROM proposition_votes WHERE user_id = 'alice@example.com'` — vote history is traceable.

**Fix (anonymization model):**

```
Client                         Server                        Database
  │                               │                              │
  ├─ voter_token (UUID, local) ──►│                              │
  │                               ├─ SHA256(token + proposal_id)─►│ voter_hash stored
  │                               │  raw token NEVER stored       │
```

- Client generates a random UUID (`crypto.randomUUID()`) stored in localStorage
- Server computes `SHA256(voter_token + ":" + proposal_id)` — this is what's stored
- **One-way**: even with full DB access, you cannot recover who voted for what
- **Per-proposal isolation**: the same token produces a different hash for each proposal, preventing cross-proposal vote correlation

---

## Security Headers (all responses)

| Header | Value |
|--------|-------|
| X-Content-Type-Options | nosniff |
| X-Frame-Options | DENY |
| X-XSS-Protection | 1; mode=block |
| Referrer-Policy | strict-origin-when-cross-origin |
| Strict-Transport-Security | max-age=63072000 (production only) |

---

## Production Checklist

- [ ] `SECRET_KEY` set to a strong random value (≥32 hex chars)
- [ ] `DEBUG=false`
- [ ] `CORS_ORIGINS` set to your exact domain (e.g. `https://openpolicy.example.com`)
- [ ] `REDIS_PASSWORD` set to a strong value
- [ ] `POSTGRES_PASSWORD` changed from `ospp_dev`
- [ ] API docs disabled (automatic when `DEBUG=false`)
- [ ] HTTPS / TLS termination at reverse proxy (nginx/Caddy)
- [ ] Rate limiting tuned for expected traffic

## Dependency Vulnerabilities

- **esbuild ≤0.24.2** (moderate): Vite dev server allows cross-origin requests. **Only affects development.** Not present in production build. Track: https://github.com/advisories/GHSA-67mh-4wv8-2f99

## Reporting

To report a vulnerability, open a private GitHub Security Advisory at:
`https://github.com/loumpare/Open-Source-Political-Program-OSPP-/security/advisories`
