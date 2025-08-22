import { TonConnect } from '@tonconnect/sdk'

/**
 * Утилита для TON Connect
 */

export function getTonConnectManifestUrl(): string {
  if (process.env.NODE_ENV === 'production') {
    return 'https://miniapptg-bay.vercel.app/tonconnect-manifest.json'
  }
  return '/api/tonconnect-manifest'
}

export function getTonConnectBaseUrl(): string {
  if (process.env.NODE_ENV === 'production') {
    return 'https://miniapptg-bay.vercel.app'
  }
  return 'http://localhost:3000'
}

// Создание экземпляра TonConnect SDK
export const tonConnect = new TonConnect({
  manifestUrl: getTonConnectManifestUrl()
})
