import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  completeAttendance,
  createAttendance,
} from '@/services/attendance.service'

export const useAttendanceActions = () => {
  const queryClient = useQueryClient()

  const invalidateDashboard = async () => {
    await queryClient.invalidateQueries({ queryKey: ['dashboard'] })
  }

  const createMutation = useMutation({
    mutationFn: createAttendance,
    onSuccess: invalidateDashboard,
  })

  const completeMutation = useMutation({
    mutationFn: completeAttendance,
    onSuccess: invalidateDashboard,
  })

  return {
    createMutation,
    completeMutation,
  }
}
