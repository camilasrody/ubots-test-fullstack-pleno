import DashboardPage from '@/components/pages/dashboard-page'
import { useDashboardViewModel } from '@/hooks/use-dashboard-view-model'

const DashboardScreen = () => {
  const viewModel = useDashboardViewModel()

  if (!viewModel.summary) {
    return (
      <DashboardPage
        summary={{ active: 0, queued: 0, completedToday: 0, agentsOnline: 0 }}
        teams={[]}
        agents={[]}
        attendances={[]}
        isLoading={viewModel.isLoading}
        isRefreshing={viewModel.isRefreshing}
        selectedTeam={viewModel.selectedTeam}
        onSelectTeam={viewModel.selectTeam}
        pollingInterval={viewModel.pollingInterval}
        onPollingChange={viewModel.setPollingInterval}
        formValues={viewModel.formValues}
        formError={viewModel.formError}
        mutationError={viewModel.mutationError}
        isDialogOpen={viewModel.isDialogOpen}
        onDialogOpenChange={viewModel.setDialogOpen}
        onFormChange={viewModel.updateField}
        onSubmitAttendance={viewModel.submitAttendance}
        onCompleteAttendance={viewModel.completeAttendance}
        isCreating={viewModel.isCreating}
        isCompleting={viewModel.isCompleting}
      />
    )
  }

  return (
    <DashboardPage
      summary={viewModel.summary}
      teams={viewModel.teams}
      agents={viewModel.agents}
      attendances={viewModel.attendances}
      isLoading={viewModel.isLoading}
      isRefreshing={viewModel.isRefreshing}
      selectedTeam={viewModel.selectedTeam}
      onSelectTeam={viewModel.selectTeam}
      pollingInterval={viewModel.pollingInterval}
      onPollingChange={viewModel.setPollingInterval}
      formValues={viewModel.formValues}
      formError={viewModel.formError}
      mutationError={viewModel.mutationError}
      isDialogOpen={viewModel.isDialogOpen}
      onDialogOpenChange={viewModel.setDialogOpen}
      onFormChange={viewModel.updateField}
      onSubmitAttendance={viewModel.submitAttendance}
      onCompleteAttendance={viewModel.completeAttendance}
      isCreating={viewModel.isCreating}
      isCompleting={viewModel.isCompleting}
    />
  )
}

export default DashboardScreen
