import {
  attendanceSchema,
  createAttendanceSchema,
  type CreateAttendanceInput,
} from '@/types/api'

import { request } from './api-client'

export const createAttendance = (input: CreateAttendanceInput) => {
  return request('/api/attendances', attendanceSchema, {
    method: 'POST',
    body: createAttendanceSchema.parse(input),
  })
}

export const completeAttendance = (attendanceId: string) => {
  return request(
    `/api/attendances/${attendanceId}/complete`,
    attendanceSchema,
    {
      method: 'POST',
    }
  )
}
