import { describe, expect, it } from 'vitest'

import { pickAvailableAgent } from './agent-capacity.js'

describe('pickAvailableAgent', () => {
  it('returns the agent with the smallest active load within capacity', () => {
    const result = pickAvailableAgent(
      [
        { id: '1', activeAttendances: 3 },
        { id: '2', activeAttendances: 1 },
        { id: '3', activeAttendances: 2 },
      ],
      3
    )

    expect(result?.id).toBe('2')
  })

  it('returns null when every agent is at capacity', () => {
    const result = pickAvailableAgent(
      [
        { id: '1', activeAttendances: 3 },
        { id: '2', activeAttendances: 3 },
      ],
      3
    )

    expect(result).toBeNull()
  })
})
