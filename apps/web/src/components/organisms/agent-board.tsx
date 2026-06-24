import Badge from '@/components/atoms/badge'
import Card from '@/components/atoms/card'
import { type Agent } from '@/types/api'
import { teamAccentClass, teamLabels } from '@/utils/team'

type AgentBoardProps = {
  agents: Agent[]
}

const AgentBoard = ({ agents }: AgentBoardProps) => {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
            Atendentes
          </p>
          <h3 className="mt-2 text-2xl text-[var(--foreground)]">
            Capacidade por agente
          </h3>
        </div>
        <p className="text-sm text-[var(--muted)]">
          Maximo de 3 atendimentos simultaneos
        </p>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {agents.map((agent) => (
          <article
            key={agent.id}
            className="rounded-sm border border-[var(--border)] bg-[var(--surface-strong)] p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h4 className="text-base text-[var(--foreground)]">
                  {agent.name}
                </h4>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  {teamLabels[agent.team]}
                </p>
              </div>
              <Badge className={teamAccentClass[agent.team]}>
                {agent.team}
              </Badge>
            </div>

            <div className="mt-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                  Em atendimento
                </p>
                <p className="mt-2 text-3xl text-[var(--foreground)]">
                  {agent.activeAttendances}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                  Livre
                </p>
                <p className="mt-2 text-xl text-[var(--foreground)]">
                  {agent.capacityLeft}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Card>
  )
}

export default AgentBoard
