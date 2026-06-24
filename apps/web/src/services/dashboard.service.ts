import { dashboardSnapshotSchema } from '@/types/api'

import { request } from './api-client'

export const getDashboardSnapshot = () => {
  return request('/api/dashboard', dashboardSnapshotSchema)
}
