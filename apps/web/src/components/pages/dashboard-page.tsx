import * as Select from '@radix-ui/react-select'

import Badge from '@/components/atoms/badge'
import Card from '@/components/atoms/card'
import TeamFilterField from '@/components/molecules/team-filter'
import AgentBoard from '@/components/organisms/agent-board'
import AttendanceFeed from '@/components/organisms/attendance-feed'
import CreateAttendanceDialog from '@/components/organisms/create-attendance-dialog'
import SummaryGrid from '@/components/organisms/summary-grid'
import TeamOverview from '@/components/organisms/team-overview'
import { type CreateAttendanceInput, type DashboardSnapshot } from '@/types/api'
import {
  pollingIntervals,
  type TeamFilter as TeamFilterType,
} from '@/utils/team'

type DashboardPageProps = {
  summary: DashboardSnapshot['summary']
  teams: DashboardSnapshot['teams']
  agents: DashboardSnapshot['agents']
  attendances: DashboardSnapshot['recentAttendances']
  isLoading: boolean
  isRefreshing: boolean
  selectedTeam: TeamFilterType
  onSelectTeam: (value: TeamFilterType) => void
  pollingInterval: number
  onPollingChange: (value: number) => void
  formValues: CreateAttendanceInput
  formError: string | null
  mutationError: string | null
  isDialogOpen: boolean
  onDialogOpenChange: (open: boolean) => void
  onFormChange: (field: keyof CreateAttendanceInput, value: string) => void
  onSubmitAttendance: () => Promise<void>
  onCompleteAttendance: (attendanceId: string) => Promise<unknown>
  isCreating: boolean
  isCompleting: boolean
}

const DashboardPage = ({
  summary,
  teams,
  agents,
  attendances,
  isLoading,
  isRefreshing,
  selectedTeam,
  onSelectTeam,
  pollingInterval,
  onPollingChange,
  formValues,
  formError,
  mutationError,
  isDialogOpen,
  onDialogOpenChange,
  onFormChange,
  onSubmitAttendance,
  onCompleteAttendance,
  isCreating,
  isCompleting,
}: DashboardPageProps) => {
  if (isLoading) {
    return (
      <main className="mx-auto min-h-screen w-full max-w-7xl px-4 py-10 md:px-6">
        <Card className="flex min-h-[320px] items-center justify-center p-8 text-sm text-[var(--muted)]">
          Carregando dashboard...
        </Card>
      </main>
    )
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-4 py-6 md:px-6 md:py-10">
      <section className="rounded-sm border border-[var(--border)] bg-[var(--surface)] px-5 py-6 shadow-[var(--shadow)] backdrop-blur md:px-8 md:py-8">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-3xl">
            <Badge variant="accent">FlowPay monitoramento</Badge>
            <h1
              className="mt-4 text-4xl leading-none text-[var(--color-foreground)] md:text-6xl"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Distribuicao viva de atendimentos
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--color-muted)] md:text-base">
              Gestao em tempo real dos times de Cartoes, Emprestimos e Outros
              Assuntos, com capacidade maxima por agente e fila automatica por
              equipe.
            </p>
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <TeamFilterField value={selectedTeam} onChange={onSelectTeam} />

            <Select.Root
              value={String(pollingInterval)}
              onValueChange={(value: string) => onPollingChange(Number(value))}
            >
              <Select.Trigger className="inline-flex h-11 min-w-32 items-center justify-between rounded-sm border border-[var(--color-border)] bg-[var(--color-surface-strong)] px-3 text-sm text-[var(--color-foreground)] outline-none">
                <Select.Value />
              </Select.Trigger>
              <Select.Portal>
                <Select.Content className="overflow-hidden rounded-sm border border-[var(--color-border)] bg-[var(--color-surface-strong)] shadow-[var(--shadow-panel)] backdrop-blur">
                  <Select.Viewport className="p-1">
                    {pollingIntervals.map((option) => (
                      <Select.Item
                        key={option.value}
                        value={String(option.value)}
                        className="cursor-pointer rounded-sm px-3 py-2 text-sm text-[var(--color-foreground)] outline-none data-[highlighted]:bg-[var(--color-accent-soft)]"
                      >
                        <Select.ItemText>
                          Atualizacao {option.label}
                        </Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>

            <CreateAttendanceDialog
              isOpen={isDialogOpen}
              onOpenChange={onDialogOpenChange}
              values={formValues}
              error={formError ?? mutationError}
              isSubmitting={isCreating}
              onChange={onFormChange}
              onSubmit={onSubmitAttendance}
            />
          </div>
        </div>

        <div className="mt-5 flex items-center gap-3 text-sm text-[var(--color-muted)]">
          <span>
            {isRefreshing ? 'Atualizando dados...' : 'Dados sincronizados'}
          </span>
        </div>
      </section>

      <div className="mt-6 space-y-6">
        <SummaryGrid summary={summary} />
        <TeamOverview teams={teams} />

        <section className="grid gap-6 xl:grid-cols-[1.25fr_0.95fr]">
          <AgentBoard agents={agents} />
          <AttendanceFeed
            attendances={attendances}
            isCompleting={isCompleting}
            onComplete={onCompleteAttendance}
          />
        </section>
      </div>
    </main>
  )
}

export default DashboardPage
