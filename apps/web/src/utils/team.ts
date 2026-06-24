import { type AttendanceStatus, type Team } from '@/types/api'

export type TeamFilter = 'ALL' | Team

export const teamLabels: Record<Team, string> = {
  CARDS: 'Cartoes',
  LOANS: 'Emprestimos',
  OTHER: 'Outros assuntos',
}

export const statusLabels: Record<AttendanceStatus, string> = {
  ACTIVE: 'Em atendimento',
  COMPLETED: 'Concluido',
  QUEUED: 'Na fila',
}

export const teamAccentClass: Record<Team, string> = {
  CARDS: 'text-[var(--accent)] bg-[var(--accent-soft)]',
  LOANS:
    'text-[var(--success)] bg-[color:color-mix(in_oklab,var(--success)_18%,transparent)]',
  OTHER:
    'text-[var(--warning)] bg-[color:color-mix(in_oklab,var(--warning)_18%,transparent)]',
}

export const statusAccentClass: Record<AttendanceStatus, string> = {
  ACTIVE:
    'text-[var(--success)] bg-[color:color-mix(in_oklab,var(--success)_18%,transparent)]',
  COMPLETED:
    'text-[var(--muted)] bg-[color:color-mix(in_oklab,var(--foreground)_8%,transparent)]',
  QUEUED:
    'text-[var(--warning)] bg-[color:color-mix(in_oklab,var(--warning)_18%,transparent)]',
}

export const pollingIntervals = [
  { label: '2s', value: 2000 },
  { label: '4s', value: 4000 },
  { label: '8s', value: 8000 },
]
