import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://miniapptg-bay.vercel.app' 
    : 'http://localhost:3000'

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
