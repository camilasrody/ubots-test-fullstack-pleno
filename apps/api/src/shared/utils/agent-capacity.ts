export type AgentLoad = {
  id: string
  activeAttendances: number
}

export const pickAvailableAgent = <T extends AgentLoad>(
  agents: T[],
  capacity: number
) => {
  return (
    agents
      .filter((agent) => agent.activeAttendances < capacity)
      .sort(
        (left, right) => left.activeAttendances - right.activeAttendances
      )[0] ?? null
  )
}
