import { startTransition, useDeferredValue, useState } from 'react'

import { useDashboardPreferences } from '@/contexts/dashboard-preferences-context'
import { useAttendanceActions } from '@/hooks/use-attendance-actions'
import { useDashboardQuery } from '@/hooks/use-dashboard-query'
import { createAttendanceSchema, type CreateAttendanceInput } from '@/types/api'
import { useDashboardFiltersStore } from '@/stores/dashboard-filters.store'

const defaultFormValues: CreateAttendanceInput = {
  customerName: '',
  subject: '',
}

export const useDashboardViewModel = () => {
  const dashboardQuery = useDashboardQuery()
  const { createMutation, completeMutation } = useAttendanceActions()
  const { pollingInterval, setPollingInterval } = useDashboardPreferences()
  const { selectedTeam, setSelectedTeam } = useDashboardFiltersStore()
  const [formValues, setFormValues] =
    useState<CreateAttendanceInput>(defaultFormValues)
  const [formError, setFormError] = useState<string | null>(null)
  const [isDialogOpen, setDialogOpen] = useState(false)
  const deferredSelectedTeam = useDeferredValue(selectedTeam)

  const snapshot = dashboardQuery.data
  const filteredAgents =
    deferredSelectedTeam === 'ALL'
      ? (snapshot?.agents ?? [])
      : (snapshot?.agents ?? []).filter(
          (agent) => agent.team === deferredSelectedTeam
        )

  const filteredTeams =
    deferredSelectedTeam === 'ALL'
      ? (snapshot?.teams ?? [])
      : (snapshot?.teams ?? []).filter(
          (team) => team.team === deferredSelectedTeam
        )

  const filteredAttendances =
    deferredSelectedTeam === 'ALL'
      ? (snapshot?.recentAttendances ?? [])
      : (snapshot?.recentAttendances ?? []).filter(
          (attendance) => attendance.team === deferredSelectedTeam
        )

  const updateField = (field: keyof CreateAttendanceInput, value: string) => {
    setFormValues((current) => ({ ...current, [field]: value }))
    setFormError(null)
  }

  const submitAttendance = async () => {
    const parsed = createAttendanceSchema.safeParse(formValues)

    if (!parsed.success) {
      setFormError(parsed.error.issues[0]?.message ?? 'Dados invalidos')
      return
    }

    await createMutation.mutateAsync(parsed.data)

    startTransition(() => {
      setFormValues(defaultFormValues)
      setDialogOpen(false)
      setFormError(null)
    })
  }

  const selectTeam = (team: typeof selectedTeam) => {
    startTransition(() => {
      setSelectedTeam(team)
    })
  }

  return {
    summary: snapshot?.summary,
    teams: filteredTeams,
    agents: filteredAgents,
    attendances: filteredAttendances,
    isLoading: dashboardQuery.isLoading,
    isRefreshing: dashboardQuery.isRefetching,
    selectedTeam,
    selectTeam,
    pollingInterval,
    setPollingInterval,
    formValues,
    formError,
    updateField,
    submitAttendance,
    completeAttendance: completeMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isCompleting: completeMutation.isPending,
    mutationError:
      createMutation.error?.message ?? completeMutation.error?.message ?? null,
    isDialogOpen,
    setDialogOpen,
  }
}
