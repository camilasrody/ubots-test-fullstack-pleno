import 'dotenv/config'

import { PrismaClient, Team } from '@prisma/client'

const prisma = new PrismaClient()

const agents = [
  { name: 'Ana Cartoes', team: Team.CARDS },
  { name: 'Bruno Cartoes', team: Team.CARDS },
  { name: 'Carla Cartoes', team: Team.CARDS },
  { name: 'Diego Emprestimos', team: Team.LOANS },
  { name: 'Erica Emprestimos', team: Team.LOANS },
  { name: 'Fabio Emprestimos', team: Team.LOANS },
  { name: 'Gabi Outros', team: Team.OTHER },
  { name: 'Heitor Outros', team: Team.OTHER },
  { name: 'Iara Outros', team: Team.OTHER },
]

const seed = async () => {
  await prisma.attendance.deleteMany()
  await prisma.agent.deleteMany()

  await prisma.agent.createMany({ data: agents })
}

seed()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
