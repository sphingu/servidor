import { User as UserSchema } from 'nexus-prisma'
import {
  intArg,
  nonNull,
  objectType,
  queryField,
  stringArg,
  mutationField,
} from 'nexus'

export const User = objectType({
  name: UserSchema.$name,
  description: UserSchema.$description,
  definition(t) {
    t.field(UserSchema.id)
    t.field(UserSchema.name)
    t.field(UserSchema.email)
  },
})

export const Users = queryField((t) => {
  // User List
  t.list.field('users', {
    type: User,
    resolve(_, __, ctx) {
      return ctx.db.user.findMany()
    },
  })

  // User by ID
  t.field('user', {
    type: User,
    args: {
      id: nonNull(intArg()),
    },
    resolve(_, args, ctx) {
      return ctx.db.user.findUnique({
        where: { id: args.id },
      })
    },
  })
})

export const CreateUser = mutationField('createUser', {
  type: User,
  args: {
    name: nonNull(stringArg()),
    email: stringArg(),
  },
  resolve(_, args, ctx) {
    const user = {
      email: args.email,
      name: args.name,
    }

    return ctx.db.user.create({ data: user })
  },
})

export const UpdateUser = mutationField('updateUser', {
  type: User,
  args: {
    id: nonNull(intArg()),
    name: stringArg(),
    email: stringArg(),
  },
  resolve(_, args, ctx) {
    const data = {
      name: args.name || undefined,
      email: args.email || undefined,
    }

    return ctx.db.user.update({
      where: { id: args.id },
      data,
    })
  },
})

export const DeleteUser = mutationField('deleteUser', {
  type: User,
  args: {
    id: nonNull(intArg()),
  },
  resolve(_, args, ctx) {
    return ctx.db.user.delete({
      where: {
        id: args.id,
      },
    })
  },
})
