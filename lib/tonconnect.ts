/**
 * Утилита для TON Connect
 */

export function getTonConnectManifestUrl(): string {
  // В продакшене используем абсолютный URL
  if (process.env.NODE_ENV === 'production') {
    return 'https://miniapptg-bay.vercel.app/tonconnect-manifest.json'
  }
  
  // В разработке используем локальный API роут
  return '/api/tonconnect-manifest'
}

export function getTonConnectBaseUrl(): string {
  if (process.env.NODE_ENV === 'production') {
    return 'https://miniapptg-bay.vercel.app'
  }
  
  return 'http://localhost:3000'
}
