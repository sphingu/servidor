import { User as UserSchema } from 'nexus-prisma'

import { extendType, nonNull, objectType, stringArg } from 'nexus'

export const User = objectType({
  name: UserSchema.$name,

  definition(t) {
    t.field(UserSchema.id.name, UserSchema.id)
    t.field(UserSchema.email.name, UserSchema.email)
    t.field(UserSchema.id.name, UserSchema.name)
  },
})

export const UserQuery = extendType({
  type: 'Query',
  definition(t) {
    return t.nonNull.list.field('users', {
      type: 'User',
      resolve(_, __, ctx) {
        return ctx.db.user.findMany()
      },
    })
  },
})

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
