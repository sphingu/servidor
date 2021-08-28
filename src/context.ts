import { PrismaClient } from '@prisma/client'
import { $settings } from 'nexus-prisma'

import { db } from './db'

export interface Context {
  db: PrismaClient
}

export const context = {
  db,
}

$settings({
  prismaClientContextField: 'db', // <-- Tell Nexus Prisma
})
