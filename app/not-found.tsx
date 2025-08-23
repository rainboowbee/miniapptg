import type { Metadata, Viewport } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Страница не найдена - Telegram Mini App',
  description: 'Запрашиваемая страница не найдена',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function NotFound() {
  return (
    <div className="min-h-screen relative stars-bg flex items-center justify-center p-4">
      <div className="text-center relative z-20 max-w-md">
        <div className="w-24 h-24 mx-auto mb-6 bg-red-500/20 rounded-full flex items-center justify-center border border-red-500/30">
          <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        
        <h1 className="text-4xl font-bold text-white mb-4 animate-fade-in font-doto">
          404
        </h1>
        
        <h2 className="text-2xl font-semibold text-white mb-4 animate-fade-in font-doto" style={{ animationDelay: '0.1s' }}>
          Страница не найдена
        </h2>
        
        <p className="text-gray-300 mb-8 animate-fade-in font-doto" style={{ animationDelay: '0.2s' }}>
          Запрашиваемая страница не существует или была перемещена.
        </p>
        
        <Link 
          href="/"
          className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 animate-fade-in font-doto"
          style={{ animationDelay: '0.3s' }}
        >
          Вернуться на главную
        </Link>
      </div>
    </div>
  )
}
