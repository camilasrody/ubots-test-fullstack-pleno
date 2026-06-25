import { describe, expect, it } from 'vitest'

import { createAttendanceSchema } from '@/types/api'

describe('createAttendanceSchema', () => {
  it('accepts valid front form values', () => {
    const result = createAttendanceSchema.safeParse({
      customerName: 'Maria Silva',
      subject: 'Cartao bloqueado',
    })

    expect(result.success).toBe(true)
  })

  it('rejects short front form values', () => {
    const result = createAttendanceSchema.safeParse({
      customerName: 'M',
      subject: 'Oi',
    })

    expect(result.success).toBe(false)

    if (result.success) {
      throw new Error('expected validation to fail')
    }

    expect(result.error.issues.map((issue) => issue.message)).toEqual([
      'Informe um nome com pelo menos 2 caracteres',
      'Informe um assunto com pelo menos 3 caracteres',
    ])
  })
})
