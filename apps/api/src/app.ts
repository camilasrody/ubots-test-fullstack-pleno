import cors from 'cors'
import express from 'express'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'

import { attendanceRoutes } from './modules/attendance/attendance.routes.js'
import { env } from './config/env.js'
import { dashboardRoutes } from './modules/dashboard/dashboard.routes.js'
import { errorMiddleware } from './shared/middlewares/error.middleware.js'

export const app = express()

app.disable('x-powered-by')

app.use(
  helmet({
    crossOriginResourcePolicy: false,
    contentSecurityPolicy: false,
  })
)

app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = env.ALLOWED_ORIGINS.split(',').map((item) =>
        item.trim()
      )

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
        return
      }

      callback(new Error('Origin not allowed by CORS'))
    },
  })
)

app.use(
  rateLimit({
    windowMs: 60 * 1000,
    limit: 120,
    standardHeaders: true,
    legacyHeaders: false,
  })
)

app.use(express.json({ limit: '16kb' }))

app.get('/health', (_request, response) => {
  response.json({ status: 'ok' })
})

app.use('/api/attendances', attendanceRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use(errorMiddleware)
