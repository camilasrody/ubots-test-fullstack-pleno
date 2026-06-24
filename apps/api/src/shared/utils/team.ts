import { Team } from '@prisma/client'

import { TEAM_SUBJECTS } from '../types/team.js'

const normalize = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[^\w\s]/g, '')
    .toLowerCase()

export const resolveTeamBySubject = (subject: string) => {
  const normalizedSubject = normalize(subject)

  if (
    TEAM_SUBJECTS.CARDS.some((keyword: string) =>
      normalizedSubject.includes(normalize(keyword))
    )
  ) {
    return Team.CARDS
  }

  if (
    TEAM_SUBJECTS.LOANS.some((keyword: string) =>
      normalizedSubject.includes(normalize(keyword))
    )
  ) {
    return Team.LOANS
  }

  return Team.OTHER
}

export const getQueueKey = (team: Team) => `queue:${team}`

export const getLockKey = (team: Team) => `lock:${team}`
