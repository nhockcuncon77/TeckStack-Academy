/**
 * API base URL for production (e.g. Vercel frontend calling deployed Node API).
 * In dev, leave unset so requests use relative /api and Vite proxy.
 */
export const apiBase = import.meta.env.VITE_API_URL || ''
