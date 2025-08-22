import { NextResponse } from 'next/server'
import { getTonConnectBaseUrl } from '@/lib/tonconnect'

export async function GET() {
  const baseUrl = getTonConnectBaseUrl()
  
  const manifest = {
    url: baseUrl,
    name: "Telegram Mini App",
    iconUrl: `${baseUrl}/sticker.svg`,
    termsOfUseUrl: `${baseUrl}/terms`,
    privacyPolicyUrl: `${baseUrl}/privacy`
  }

  return NextResponse.json(manifest, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
