import { app } from './app.js'
import { env } from './config/env.js'
import { prisma } from './lib/prisma.js'
import { redis } from './lib/redis.js'
import { attendanceService } from './modules/attendance/attendance.service.js'

const bootstrap = async () => {
  await prisma.$connect()
  await redis.ping()
  await attendanceService.syncQueues()

  app.listen(env.PORT, () => {
    console.log(`api running on ${env.PORT}`)
  })
}

bootstrap().catch(async (error) => {
  console.error(error)
  await prisma.$disconnect()
  redis.disconnect()
  process.exit(1)
})
