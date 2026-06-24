import { Router } from 'express'

import { validateRequest } from '../../shared/middlewares/validate-request.js'
import { attendanceController } from './attendance.controller.js'
import {
  completeAttendanceParamsSchema,
  createAttendanceSchema,
} from './attendance.schemas.js'

export const attendanceRoutes = Router()

attendanceRoutes.get('/', (request, response) =>
  attendanceController.listRecent(request, response)
)
attendanceRoutes.post(
  '/',
  validateRequest({ body: createAttendanceSchema }),
  (request, response) => attendanceController.create(request, response)
)
attendanceRoutes.post(
  '/:id/complete',
  validateRequest({ params: completeAttendanceParamsSchema }),
  (request, response) => attendanceController.complete(request, response)
)
