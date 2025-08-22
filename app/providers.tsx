'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TonConnectUIProvider } from '@tonconnect/ui-react'
import { useState } from 'react'

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 минута
        retry: 1,
      },
    },
  }))

  return (
    <TonConnectUIProvider 
      manifestUrl="/tonconnect-manifest.json"
      uiPreferences={{
        theme: 'dark',
        colorsSet: {
          [':root']: {
            '--tc-background-primary': 'rgba(0, 0, 0, 0.8)',
            '--tc-background-secondary': 'rgba(255, 255, 255, 0.1)',
            '--tc-text-primary': '#ffffff',
            '--tc-text-secondary': '#9ca3af',
            '--tc-border-primary': 'rgba(255, 255, 255, 0.2)',
          }
        }
      }}
    >
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </TonConnectUIProvider>
  )
}
