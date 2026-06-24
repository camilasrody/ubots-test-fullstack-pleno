import cors from 'cors'
import express from 'express'

import { attendanceRoutes } from './modules/attendance/attendance.routes.js'
import { dashboardRoutes } from './modules/dashboard/dashboard.routes.js'
import { errorMiddleware } from './shared/middlewares/error.middleware.js'

export const app = express()

app.use(cors())
app.use(express.json())

app.get('/health', (_request, response) => {
  response.json({ status: 'ok' })
})

app.use('/api/attendances', attendanceRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use(errorMiddleware)
