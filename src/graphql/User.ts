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
    // t.field(UserSchema.googleId)
    t.field(UserSchema.imageUrl)
    t.field(UserSchema.email)
    t.field(UserSchema.groups)
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
  // Current User
  t.field('currentUser', {
    type: User,
    resolve(_, __, ctx: Context) {
      return ctx.prisma.user.findUnique({
        where: { id: ctx.user.id },
      })
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

// TODO: make this CRUD of user role wise
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CreateUser = mutationField('createUser', {
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const UpdateUser = mutationField('updateUser', {
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DeleteUser = mutationField('deleteUser', {
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
