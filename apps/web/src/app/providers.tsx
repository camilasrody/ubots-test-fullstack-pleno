import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { type PropsWithChildren } from 'react'

import queryClient from '@/app/query-client'
import DashboardPreferencesProvider from '@/contexts/dashboard-preferences-context'

const AppProviders = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      <DashboardPreferencesProvider>{children}</DashboardPreferencesProvider>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
    </QueryClientProvider>
  )
}

export default AppProviders
