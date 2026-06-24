import { app } from './app.js'
import { env } from './config/env.js'
import { prisma } from './lib/prisma.js'
import queueClient from './lib/queue.js'
import { attendanceService } from './modules/attendance/attendance.service.js'

const bootstrap = async () => {
  await prisma.$connect()
  await queueClient.ping()
  await attendanceService.syncQueues()

  app.listen(env.PORT, () => {
    console.log(`api running on ${env.PORT}`)
  })
}

bootstrap().catch(async (error) => {
  console.error(error)
  await prisma.$disconnect()
  queueClient.disconnect()
  process.exit(1)
})
