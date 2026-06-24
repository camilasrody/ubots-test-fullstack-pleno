import { type Request, type Response } from 'express'

import { dashboardService } from './dashboard.service.js'

class DashboardController {
  async getSnapshot(_request: Request, response: Response) {
    const snapshot = await dashboardService.getSnapshot()
    return response.json(snapshot)
  }
}

export const dashboardController = new DashboardController()
