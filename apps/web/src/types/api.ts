import { z } from 'zod'

export const teamSchema = z.enum(['CARDS', 'LOANS', 'OTHER'])
export const attendanceStatusSchema = z.enum(['QUEUED', 'ACTIVE', 'COMPLETED'])

export const agentSchema = z.object({
  id: z.string(),
  name: z.string(),
  team: teamSchema,
  activeAttendances: z.number(),
  capacityLeft: z.number(),
})

export const attendanceSchema = z.object({
  id: z.string(),
  customerName: z.string(),
  subject: z.string(),
  team: teamSchema,
  status: attendanceStatusSchema,
  queuedAt: z.string().datetime().nullable(),
  startedAt: z.string().datetime().nullable(),
  completedAt: z.string().datetime().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  assignedAgent: z
    .object({
      id: z.string(),
      name: z.string(),
      team: teamSchema,
    })
    .nullable(),
})

export const dashboardSnapshotSchema = z.object({
  summary: z.object({
    active: z.number(),
    queued: z.number(),
    completedToday: z.number(),
    agentsOnline: z.number(),
  }),
  teams: z.array(
    z.object({
      team: teamSchema,
      active: z.number(),
      queued: z.number(),
      agents: z.number(),
    })
  ),
  agents: z.array(agentSchema),
  recentAttendances: z.array(attendanceSchema),
})

export const createAttendanceSchema = z.object({
  customerName: z
    .string()
    .trim()
    .min(2, 'Informe um nome com pelo menos 2 caracteres'),
  subject: z
    .string()
    .trim()
    .min(3, 'Informe um assunto com pelo menos 3 caracteres'),
})

export type Team = z.infer<typeof teamSchema>
export type AttendanceStatus = z.infer<typeof attendanceStatusSchema>
export type Agent = z.infer<typeof agentSchema>
export type Attendance = z.infer<typeof attendanceSchema>
export type DashboardSnapshot = z.infer<typeof dashboardSnapshotSchema>
export type CreateAttendanceInput = z.infer<typeof createAttendanceSchema>
