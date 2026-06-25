import request from 'supertest'
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('../../src/modules/attendance/attendance.service.js', () => ({
  attendanceService: {
    create: vi.fn(),
    complete: vi.fn(),
    listRecent: vi.fn(),
    syncQueues: vi.fn(),
  },
}))

import { app } from '../../src/app.js'
import { attendanceService } from '../../src/modules/attendance/attendance.service.js'

describe('attendance routes integration', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('sanitizes the payload before delegating create to the service', async () => {
    vi.mocked(attendanceService.create).mockResolvedValue({
      id: 'attendance-1',
      customerName: 'scriptMaria/script',
      subject: 'Problema com cartao',
      team: 'CARDS',
      status: 'ACTIVE',
      assignedAgent: null,
    } as never)

    const response = await request(app).post('/api/attendances').send({
      customerName: '<script>Maria</script>',
      subject: 'Problema com cartao',
    })

    expect(response.status).toBe(201)
    expect(attendanceService.create).toHaveBeenCalledWith({
      customerName: 'scriptMaria/script',
      subject: 'Problema com cartao',
    })
  })
})
