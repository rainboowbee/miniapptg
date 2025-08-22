import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Telegram Mini App',
  description: 'Современное приложение для Telegram с Next.js 14',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head>
        {/* Telegram Web App Script */}
        <script src="https://telegram.org/js/telegram-web-app.js" />
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Doto:wght@400;500;600;700&display=swap"
          as="style"
          onLoad="this.onload=null;this.rel='stylesheet'"
        />
        <noscript>
          <link
            href="https://fonts.googleapis.com/css2?family=Doto:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
        </noscript>
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
