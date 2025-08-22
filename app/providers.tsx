'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TonConnectUIProvider, THEME } from '@tonconnect/ui-react'
import { useState } from 'react'
import { getTonConnectManifestUrl } from '@/lib/tonconnect'

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
      manifestUrl={getTonConnectManifestUrl()}
      uiPreferences={{
        theme: THEME.DARK
      }}
    >
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </TonConnectUIProvider>
  )
}
