import { readFileSync } from 'node:fs'
import { createServer as createHttpsServer } from 'node:https'

import { app } from './app.js'
import { env } from './config/env.js'
import { prisma } from './lib/prisma.js'
import queueClient from './lib/queue.js'
import { attendanceService } from './modules/attendance/attendance.service.js'

const createServer = () => {
  if (!env.HTTPS_ENABLED) {
    return app.listen(env.PORT, () => {
      console.log(`api running on ${env.PORT}`)
    })
  }

  if (!env.HTTPS_CERT_PATH || !env.HTTPS_KEY_PATH) {
    throw new Error(
      'HTTPS_CERT_PATH and HTTPS_KEY_PATH are required when HTTPS is enabled'
    )
  }

  const httpsServer = createHttpsServer(
    {
      cert: readFileSync(env.HTTPS_CERT_PATH),
      key: readFileSync(env.HTTPS_KEY_PATH),
    },
    app
  )

  return httpsServer.listen(env.PORT, () => {
    console.log(`api running with https on ${env.PORT}`)
  })
}

const bootstrap = async () => {
  await prisma.$connect()
  await queueClient.ping()
  await attendanceService.syncQueues()

  createServer()
}

bootstrap().catch(async (error) => {
  console.error(error)
  await prisma.$disconnect()
  queueClient.disconnect()
  process.exit(1)
})
