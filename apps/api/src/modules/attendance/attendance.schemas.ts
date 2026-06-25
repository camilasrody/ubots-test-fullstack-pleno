import { z } from 'zod'

import sanitizeText from '../../shared/utils/sanitize-text.js'

export const createAttendanceSchema = z.object({
  customerName: z
    .string()
    .trim()
    .transform(sanitizeText)
    .pipe(z.string().min(2).max(120)),
  subject: z
    .string()
    .trim()
    .transform(sanitizeText)
    .pipe(z.string().min(3).max(160)),
})

export const completeAttendanceParamsSchema = z.object({
  id: z.string().min(1),
})
