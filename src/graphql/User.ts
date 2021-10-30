import { User as UserSchema } from 'nexus-prisma'
import {
  nonNull,
  objectType,
  queryField,
  stringArg,
  mutationField,
} from 'nexus'
import { Context } from 'src/context'

export const User = objectType({
  name: UserSchema.$name,
  description: UserSchema.$description,
  definition(t) {
    t.field(UserSchema.id)
    t.field(UserSchema.firstName)
    t.field(UserSchema.lastName)
    t.field(UserSchema.googleId)
    t.field(UserSchema.email)
  },
})

export const Users = queryField((t) => {
  // User List
  t.list.field('users', {
    type: User,
    resolve(_, __, ctx: Context) {
      return ctx.prisma.user.findMany()
    },
  })

  // User by ID
  t.field('user', {
    type: User,
    args: {
      id: nonNull(stringArg()),
    },
    resolve(_, args, ctx: Context) {
      return ctx.prisma.user.findUnique({
        where: { id: args.id },
      })
    },
  })
})

export const CreateUser = mutationField('createUser', {
  type: User,
  args: {
    firstName: stringArg(),
    lastName: stringArg(),
    email: nonNull(stringArg()),
  },
  resolve(_, args, ctx: Context) {
    return ctx.prisma.user.create({
      data: {
        email: args.email,
        firstName: args.firstName,
        lastName: args.lastName,
      },
    })
  },
})

export const UpdateUser = mutationField('updateUser', {
  type: User,
  args: {
    id: nonNull(stringArg()),
    firstName: stringArg(),
    lastName: stringArg(),
    email: stringArg(),
  },
  resolve(_, args, ctx: Context) {
    const data = {
      firstName: args.firstName || undefined,
      lastName: args.lastName || undefined,
      email: args.email || undefined,
    }

    return ctx.prisma.user.update({
      where: { id: args.id },
      data,
    })
  },
})

export const DeleteUser = mutationField('deleteUser', {
  type: User,
  args: {
    id: nonNull(stringArg()),
  },
  resolve(_, args, ctx: Context) {
    return ctx.prisma.user.delete({
      where: {
        id: args.id,
      },
    })
  },
})
