import { type Request, type Response } from 'express'

import { attendanceService } from './attendance.service.js'

class AttendanceController {
  async create(request: Request, response: Response) {
    const attendance = await attendanceService.create(request.body)
    return response.status(201).json(attendance)
  }

  async complete(request: Request, response: Response) {
    const attendanceId = Array.isArray(request.params.id)
      ? request.params.id[0]
      : request.params.id
    const attendance = await attendanceService.complete(attendanceId)
    return response.json(attendance)
  }

  async listRecent(_request: Request, response: Response) {
    const attendances = await attendanceService.listRecent()
    return response.json(attendances)
  }
}

export const attendanceController = new AttendanceController()
