import Badge from '@/components/atoms/badge'
import Button from '@/components/atoms/button'
import Card from '@/components/atoms/card'
import { type Attendance } from '@/types/api'
import {
  statusAccentClass,
  statusLabels,
  teamAccentClass,
  teamLabels,
} from '@/utils/team'

type AttendanceFeedProps = {
  attendances: Attendance[]
  isCompleting: boolean
  onComplete: (attendanceId: string) => Promise<unknown>
}

const AttendanceFeed = ({
  attendances,
  isCompleting,
  onComplete,
}: AttendanceFeedProps) => {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
            Fluxo
          </p>
          <h3 className="mt-2 text-2xl text-[var(--foreground)]">
            Atendimentos recentes
          </h3>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {attendances.map((attendance) => (
          <article
            key={attendance.id}
            className="rounded-sm border border-[var(--border)] bg-[var(--surface-strong)] p-4"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className={teamAccentClass[attendance.team]}>
                    {teamLabels[attendance.team]}
                  </Badge>
                  <Badge className={statusAccentClass[attendance.status]}>
                    {statusLabels[attendance.status]}
                  </Badge>
                </div>

                <div>
                  <h4 className="text-base text-[var(--foreground)]">
                    {attendance.customerName}
                  </h4>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    {attendance.subject}
                  </p>
                </div>

                <div className="grid gap-1 text-sm text-[var(--muted)]">
                  <p>
                    Agente:{' '}
                    {attendance.assignedAgent?.name ?? 'Aguardando atribuicao'}
                  </p>
                  <p>
                    Criado em:{' '}
                    {new Date(attendance.createdAt).toLocaleString('pt-BR')}
                  </p>
                </div>
              </div>

              {attendance.status === 'ACTIVE' ? (
                <Button
                  variant="secondary"
                  disabled={isCompleting}
                  onClick={() => onComplete(attendance.id)}
                >
                  Concluir atendimento
                </Button>
              ) : null}
            </div>
          </article>
        ))}

        {attendances.length === 0 ? (
          <div className="rounded-sm border border-dashed border-[var(--border)] p-6 text-sm text-[var(--muted)]">
            Nenhum atendimento encontrado para o filtro atual.
          </div>
        ) : null}
      </div>
    </Card>
  )
}

export default AttendanceFeed
