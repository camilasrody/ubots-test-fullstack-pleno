import { AttendanceStatus, Team } from '@prisma/client'

import { prisma } from '../../lib/prisma.js'

class DashboardService {
  async getSnapshot() {
    const [
      agents,
      activeByTeam,
      queuedByTeam,
      completedToday,
      recentAttendances,
    ] = await Promise.all([
      prisma.agent.findMany({
        orderBy: [{ team: 'asc' }, { name: 'asc' }],
        select: {
          id: true,
          name: true,
          team: true,
          _count: {
            select: {
              attendances: {
                where: {
                  status: AttendanceStatus.ACTIVE,
                },
              },
            },
          },
        },
      }),
      prisma.attendance.groupBy({
        by: ['team'],
        where: { status: AttendanceStatus.ACTIVE },
        _count: { _all: true },
      }),
      prisma.attendance.groupBy({
        by: ['team'],
        where: { status: AttendanceStatus.QUEUED },
        _count: { _all: true },
      }),
      prisma.attendance.count({
        where: {
          status: AttendanceStatus.COMPLETED,
          completedAt: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
          },
        },
      }),
      prisma.attendance.findMany({
        orderBy: { createdAt: 'desc' },
        take: 10,
        include: {
          assignedAgent: {
            select: {
              id: true,
              name: true,
              team: true,
            },
          },
        },
      }),
    ])

    const teamOrder = [Team.CARDS, Team.LOANS, Team.OTHER]

    return {
      summary: {
        active: activeByTeam.reduce(
          (total: number, item) => total + item._count._all,
          0
        ),
        queued: queuedByTeam.reduce(
          (total: number, item) => total + item._count._all,
          0
        ),
        completedToday,
        agentsOnline: agents.length,
      },
      teams: teamOrder.map((team) => ({
        team,
        active:
          activeByTeam.find((item) => item.team === team)?._count._all ?? 0,
        queued:
          queuedByTeam.find((item) => item.team === team)?._count._all ?? 0,
        agents: agents.filter((agent) => agent.team === team).length,
      })),
      agents: agents.map((agent) => ({
        id: agent.id,
        name: agent.name,
        team: agent.team,
        activeAttendances: agent._count.attendances,
        capacityLeft: Math.max(0, 3 - agent._count.attendances),
      })),
      recentAttendances,
    }
  }
}

export const dashboardService = new DashboardService()
