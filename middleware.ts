import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Простая проверка для API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    // Можно добавить базовую валидацию здесь
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/api/:path*',
  ],
}
