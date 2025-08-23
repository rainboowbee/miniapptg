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

  // Логируем только API запросы
  if (request.nextUrl.pathname.startsWith('/api/')) {
    console.log(`[${new Date().toISOString()}] ${request.method} ${request.nextUrl.pathname}`)
    
    // Логируем заголовки для отладки
    const userAgent = request.headers.get('user-agent')
    const referer = request.headers.get('referer')
    
    if (userAgent) {
      console.log(`User-Agent: ${userAgent}`)
    }
    if (referer) {
      console.log(`Referer: ${referer}`)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
