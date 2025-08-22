import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Обработка CORS для TON Connect
  if (request.nextUrl.pathname.startsWith('/api/tonconnect-manifest')) {
    const response = NextResponse.next()
    
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type')
    
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/api/tonconnect-manifest/:path*',
}
