import { User as UserSchema } from 'nexus-prisma'

import {
  extendType,
  intArg,
  nonNull,
  objectType,
  queryField,
  stringArg,
  queryType,
} from 'nexus'

export const User = objectType({
  name: UserSchema.$name,
  description: UserSchema.$description,
  definition(t) {
    t.field(UserSchema.id)
    t.field(UserSchema.email)
    t.field(UserSchema.name)
  },
})

export const UsersQuery = queryField((t) =>
  t.nonNull.list.field('users', {
    type: 'User',
    resolve(_, __, ctx) {
      return ctx.db.user.findMany()
    },
  }),
)

export const UserQuery = queryField((t) =>
  t.field('user', {
    type: 'User',
    args: {
      id: nonNull(intArg()),
    },
    resolve(_, args, ctx) {
      return ctx.db.user.findUnique({
        where: { id: args.id },
      })
    },
  }),
)

export const UserMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createUser', {
      type: 'User',
      args: {
        email: nonNull(stringArg()),
        name: nonNull(stringArg()),
      },
      resolve(_, args, ctx) {
        const user = {
          email: args.email,
          name: args.name,
        }

        return ctx.db.user.create({ data: user })
      },
    })
  },
})
