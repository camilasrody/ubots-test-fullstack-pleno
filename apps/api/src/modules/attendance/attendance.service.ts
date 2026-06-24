import { AttendanceStatus, Team, type Prisma } from '@prisma/client'

import { HttpError } from '../../lib/http-error.js'
import { prisma } from '../../lib/prisma.js'
import { redis } from '../../lib/redis.js'
import { TEAM_CAPACITY } from '../../shared/types/team.js'
import { pickAvailableAgent } from '../../shared/utils/agent-capacity.js'
import {
  getLockKey,
  getQueueKey,
  resolveTeamBySubject,
} from '../../shared/utils/team.js'

type CreateAttendanceInput = {
  customerName: string
  subject: string
}

const attendanceInclude = {
  assignedAgent: {
    select: {
      id: true,
      name: true,
      team: true,
    },
  },
} satisfies Prisma.AttendanceInclude

class AttendanceService {
  async create(input: CreateAttendanceInput) {
    const team = resolveTeamBySubject(input.subject)
    const availableAgent = await this.findAvailableAgent(team)

    if (!availableAgent) {
      const queuedAttendance = await prisma.attendance.create({
        data: {
          customerName: input.customerName,
          subject: input.subject,
          team,
          status: AttendanceStatus.QUEUED,
          queuedAt: new Date(),
        },
        include: attendanceInclude,
      })

      await redis.rpush(getQueueKey(team), queuedAttendance.id)

      return queuedAttendance
    }

    return prisma.attendance.create({
      data: {
        customerName: input.customerName,
        subject: input.subject,
        team,
        status: AttendanceStatus.ACTIVE,
        assignedAgentId: availableAgent.id,
        startedAt: new Date(),
      },
      include: attendanceInclude,
    })
  }

  async complete(attendanceId: string) {
    const attendance = await prisma.attendance.findUnique({
      where: { id: attendanceId },
      include: attendanceInclude,
    })

    if (!attendance) {
      throw new HttpError(404, 'Attendance not found')
    }

    if (attendance.status !== AttendanceStatus.ACTIVE) {
      throw new HttpError(409, 'Only active attendances can be completed')
    }

    const completedAttendance = await prisma.attendance.update({
      where: { id: attendanceId },
      data: {
        status: AttendanceStatus.COMPLETED,
        completedAt: new Date(),
      },
      include: attendanceInclude,
    })

    await this.dispatchQueuedAttendances(attendance.team)

    return completedAttendance
  }

  async listRecent() {
    return prisma.attendance.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
      include: attendanceInclude,
    })
  }

  async syncQueues() {
    const queuedAttendances = await prisma.attendance.findMany({
      where: { status: AttendanceStatus.QUEUED },
      orderBy: { createdAt: 'asc' },
      select: {
        id: true,
        team: true,
      },
    })

    const queueKeys = [Team.CARDS, Team.LOANS, Team.OTHER].map((team) =>
      getQueueKey(team)
    )

    await Promise.all(queueKeys.map((key) => redis.del(key)))

    for (const attendance of queuedAttendances) {
      await redis.rpush(getQueueKey(attendance.team), attendance.id)
    }
  }

  async dispatchQueuedAttendances(team: Team) {
    const lockKey = getLockKey(team)
    const lockValue = `${Date.now()}`
    const lockGranted = await redis.set(lockKey, lockValue, 'PX', 5000, 'NX')

    if (!lockGranted) {
      return
    }

    try {
      while (true) {
        const availableAgent = await this.findAvailableAgent(team)

        if (!availableAgent) {
          return
        }

        const attendanceId = await redis.lpop(getQueueKey(team))

        if (!attendanceId) {
          return
        }

        const queuedAttendance = await prisma.attendance.findUnique({
          where: { id: attendanceId },
          select: {
            id: true,
            status: true,
          },
        })

        if (
          !queuedAttendance ||
          queuedAttendance.status !== AttendanceStatus.QUEUED
        ) {
          continue
        }

        await prisma.attendance.update({
          where: { id: attendanceId },
          data: {
            status: AttendanceStatus.ACTIVE,
            assignedAgentId: availableAgent.id,
            startedAt: new Date(),
          },
        })
      }
    } finally {
      const currentLockValue = await redis.get(lockKey)

      if (currentLockValue === lockValue) {
        await redis.del(lockKey)
      }
    }
  }

  private async findAvailableAgent(team: Team) {
    const agents = await prisma.agent.findMany({
      where: { team },
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
    })

    const availableAgent = pickAvailableAgent(
      agents.map((agent: (typeof agents)[number]) => ({
        id: agent.id,
        name: agent.name,
        team: agent.team,
        activeAttendances: agent._count.attendances,
      })),
      TEAM_CAPACITY
    )

    return availableAgent
  }
}

export const attendanceService = new AttendanceService()
