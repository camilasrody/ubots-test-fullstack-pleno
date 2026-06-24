import { useQuery } from '@tanstack/react-query'

import { useDashboardPreferences } from '@/contexts/dashboard-preferences-context'
import { getDashboardSnapshot } from '@/services/dashboard.service'

export const useDashboardQuery = () => {
  const { pollingInterval } = useDashboardPreferences()

  return useQuery({
    queryKey: ['dashboard'],
    queryFn: getDashboardSnapshot,
    refetchInterval: pollingInterval,
  })
}
