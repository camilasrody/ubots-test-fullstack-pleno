import { create } from 'zustand'

import { type TeamFilter } from '@/utils/team'

type DashboardFiltersState = {
  selectedTeam: TeamFilter
  setSelectedTeam: (team: TeamFilter) => void
}

export const useDashboardFiltersStore = create<DashboardFiltersState>(
  (set) => ({
    selectedTeam: 'ALL',
    setSelectedTeam: (selectedTeam) => set({ selectedTeam }),
  })
)
