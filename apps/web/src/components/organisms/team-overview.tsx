import Badge from '@/components/atoms/badge'
import Card from '@/components/atoms/card'
import { type DashboardSnapshot } from '@/types/api'
import { teamAccentClass, teamLabels } from '@/utils/team'

type TeamOverviewProps = {
  teams: DashboardSnapshot['teams']
}

const TeamOverview = ({ teams }: TeamOverviewProps) => {
  return (
    <section className="grid gap-4 lg:grid-cols-3">
      {teams.map((team) => (
        <Card key={team.team} className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                Time
              </p>
              <h3 className="mt-2 text-xl text-[var(--foreground)]">
                {teamLabels[team.team]}
              </h3>
            </div>
            <Badge className={teamAccentClass[team.team]}>{team.team}</Badge>
          </div>

          <dl className="mt-5 grid grid-cols-3 gap-3 text-sm">
            <div>
              <dt className="text-[var(--muted)]">Ativos</dt>
              <dd className="mt-1 text-lg text-[var(--foreground)]">
                {team.active}
              </dd>
            </div>
            <div>
              <dt className="text-[var(--muted)]">Fila</dt>
              <dd className="mt-1 text-lg text-[var(--foreground)]">
                {team.queued}
              </dd>
            </div>
            <div>
              <dt className="text-[var(--muted)]">Agentes</dt>
              <dd className="mt-1 text-lg text-[var(--foreground)]">
                {team.agents}
              </dd>
            </div>
          </dl>
        </Card>
      ))}
    </section>
  )
}

export default TeamOverview
