import { PrismaClient } from '@prisma/client'
import { ApolloError } from 'apollo-server-express'

export const prisma = new PrismaClient()

export interface Context {
  user: Express.User
  prisma: PrismaClient
}

export const createContext = ({ req }: { req: Express.Request }): Context => {
  if (!req.user) throw new ApolloError('User not authenticated', 'UNAUTHORIZED')

  return {
    user: req.user,
    prisma,
  }
}
