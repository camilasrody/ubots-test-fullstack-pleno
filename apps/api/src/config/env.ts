import 'dotenv/config'

import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string().min(1),
  REDIS_URL: z.string().min(1).optional(),
  QUEUE_PROVIDER: z.enum(['redis', 'memory']).default('redis'),
  ALLOWED_ORIGINS: z.string().default('http://localhost:5173'),
})

export const env = envSchema.parse(process.env)
