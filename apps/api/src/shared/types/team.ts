import { type Team } from '@prisma/client'

export const TEAM_SUBJECTS: Record<Team, string[]> = {
  CARDS: ['cartao', 'cartão', 'cartoes', 'cartões'],
  LOANS: ['emprestimo', 'empréstimo', 'emprestimos', 'empréstimos'],
  OTHER: [],
}

export const TEAM_CAPACITY = 3
