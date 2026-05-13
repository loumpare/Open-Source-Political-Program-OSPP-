/**
 * Central API base URL.
 * - Local dev (.env.local): VITE_API_URL=http://127.0.0.1:8001
 * - Docker (nginx proxy):   VITE_API_URL=/api   (set at build time)
 */
export const API_BASE = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8001'
