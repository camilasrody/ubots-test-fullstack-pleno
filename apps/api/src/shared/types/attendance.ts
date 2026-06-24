import { type AttendanceStatus, type Team } from '@prisma/client'

export type AttendanceWithAgent = {
  id: string
  customerName: string
  subject: string
  team: Team
  status: AttendanceStatus
  queuedAt: Date | null
  startedAt: Date | null
  completedAt: Date | null
  createdAt: Date
  updatedAt: Date
  assignedAgent: {
    id: string
    name: string
    team: Team
  } | null
}
