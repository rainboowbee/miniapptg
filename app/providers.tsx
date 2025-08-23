'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { getTonConnectManifestUrl } from '@/lib/tonconnect'
import { TonConnectUIProvider, THEME } from '@tonconnect/ui-react'

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // 5 минут
            gcTime: 10 * 60 * 1000, // 10 минут
            retry: 1,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
          },
          mutations: {
            retry: 1,
          },
        },
      })
  )

  return (
    <TonConnectUIProvider
      manifestUrl={getTonConnectManifestUrl()}
      uiPreferences={{ theme: THEME.DARK }}
    >
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </TonConnectUIProvider>
  )
}
