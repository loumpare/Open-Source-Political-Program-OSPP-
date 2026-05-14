/**
 * ECDSA keypair management via Web Crypto API + IndexedDB.
 * The private key is non-extractable and never leaves the browser.
 */

const DB_NAME    = 'ospp_crypto'
const STORE_NAME = 'keys'
const KEY_ID     = 'voter_keypair'

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1)
    req.onupgradeneeded = () => req.result.createObjectStore(STORE_NAME)
    req.onsuccess = () => resolve(req.result)
    req.onerror   = () => reject(req.error)
  })
}

function idbGet(db: IDBDatabase, key: string): Promise<CryptoKeyPair | undefined> {
  return new Promise((resolve, reject) => {
    const req = db.transaction(STORE_NAME).objectStore(STORE_NAME).get(key)
    req.onsuccess = () => resolve(req.result as CryptoKeyPair | undefined)
    req.onerror   = () => reject(req.error)
  })
}

function idbPut(db: IDBDatabase, key: string, value: CryptoKeyPair): Promise<void> {
  return new Promise((resolve, reject) => {
    const req = db
      .transaction(STORE_NAME, 'readwrite')
      .objectStore(STORE_NAME)
      .put(value, key)
    req.onsuccess = () => resolve()
    req.onerror   = () => reject(req.error)
  })
}

async function getOrCreateKeypair(): Promise<CryptoKeyPair> {
  const db     = await openDB()
  const stored = await idbGet(db, KEY_ID)
  if (stored) return stored

  const keypair = await crypto.subtle.generateKey(
    { name: 'ECDSA', namedCurve: 'P-256' },
    false,              // private key is NON-EXTRACTABLE — never leaves the browser
    ['sign', 'verify'],
  )
  await idbPut(db, KEY_ID, keypair)
  return keypair
}

export interface SignedVote {
  public_key_jwk: JsonWebKey
  signature:      string   // standard base64
  timestamp:      number   // ms since epoch
}

/**
 * Sign a vote with the browser's persistent ECDSA private key.
 * Message format: "<proposalId>:<value>:<timestamp>"
 */
export async function signVote(proposalId: string, value: number): Promise<SignedVote> {
  const keypair   = await getOrCreateKeypair()
  const timestamp = Date.now()
  const message   = new TextEncoder().encode(`${proposalId}:${value}:${timestamp}`)

  const sigBuffer = await crypto.subtle.sign(
    { name: 'ECDSA', hash: { name: 'SHA-256' } },
    keypair.privateKey,
    message,
  )

  // Convert ArrayBuffer → standard base64
  const bytes  = new Uint8Array(sigBuffer)
  let binary   = ''
  for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i])

  return {
    public_key_jwk: await crypto.subtle.exportKey('jwk', keypair.publicKey),
    signature:      btoa(binary),
    timestamp,
  }
}
