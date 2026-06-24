import { Team } from '@prisma/client'
import { describe, expect, it } from 'vitest'

import { resolveTeamBySubject } from './team.js'

describe('resolveTeamBySubject', () => {
  it('routes card subjects to cards team', () => {
    expect(resolveTeamBySubject('Problema com cartão virtual')).toBe(Team.CARDS)
  })

  it('routes loan subjects to loans team', () => {
    expect(resolveTeamBySubject('Contratação de empréstimo pessoal')).toBe(
      Team.LOANS
    )
  })

  it('routes unknown subjects to other team', () => {
    expect(resolveTeamBySubject('Atualizacao cadastral')).toBe(Team.OTHER)
  })
})
