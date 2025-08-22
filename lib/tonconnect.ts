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

// Создание экземпляра TonConnect SDK только на клиенте
let tonConnect: any = null

export function getTonConnect() {
  if (typeof window === 'undefined') {
    return null
  }
  
  if (!tonConnect) {
    const { TonConnect } = require('@tonconnect/sdk')
    tonConnect = new TonConnect({
      manifestUrl: getTonConnectManifestUrl()
    })
  }
  
  return tonConnect
}
