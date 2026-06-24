import { z } from 'zod'

export const createAttendanceSchema = z.object({
  customerName: z.string().trim().min(2).max(120),
  subject: z.string().trim().min(3).max(160),
})

export const completeAttendanceParamsSchema = z.object({
  id: z.string().min(1),
})
