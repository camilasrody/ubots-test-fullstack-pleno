import StatCard from '@/components/molecules/stat-card'
import { type DashboardSnapshot } from '@/types/api'

type SummaryGridProps = {
  summary: DashboardSnapshot['summary']
}

const SummaryGrid = ({ summary }: SummaryGridProps) => {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        label="Ativos"
        value={String(summary.active)}
        detail="Atendimentos em andamento agora"
      />
      <StatCard
        label="Fila"
        value={String(summary.queued)}
        detail="Demandas aguardando atendimento"
      />
      <StatCard
        label="Concluidos hoje"
        value={String(summary.completedToday)}
        detail="Volume finalizado no dia"
      />
      <StatCard
        label="Atendentes"
        value={String(summary.agentsOnline)}
        detail="Base habilitada para operacao"
      />
    </section>
  )
}

export default SummaryGrid
