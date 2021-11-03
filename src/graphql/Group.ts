import { Group as GroupSchema } from 'nexus-prisma'
import {
  booleanArg,
  list,
  mutationField,
  nonNull,
  objectType,
  queryField,
  stringArg,
} from 'nexus'
import { Context } from 'src/context'

export const Group = objectType({
  name: GroupSchema.$name,
  description: GroupSchema.$description,
  definition(t) {
    t.field(GroupSchema.id)
    t.field(GroupSchema.name)
    t.field(GroupSchema.isMonthlySettle)
    t.field(GroupSchema.users)
  },
})

export const Groups = queryField((t) => {
  // Group List
  t.list.field('groups', {
    type: Group,
    resolve(_, __, ctx: Context) {
      return ctx.prisma.group.findMany()
    },
  })

  // Group by ID
  t.field('group', {
    type: Group,
    args: {
      id: nonNull(stringArg()),
    },
    resolve(_, args, ctx: Context) {
      return ctx.prisma.group.findUnique({
        where: { id: args.id },
      })
    },
  })
})

export const CreateGroup = mutationField('createGroup', {
  type: Group,
  args: {
    name: nonNull(stringArg()),
    isMonthlySettle: booleanArg(),
    userIds: nonNull(list(nonNull(stringArg()))),
  },
  resolve(_, args, ctx: Context) {
    return ctx.prisma.group.create({
      data: {
        name: args.name,
        isMonthlySettle: args.isMonthlySettle,
        users: {
          connect: args.userIds.map((val: string) => ({ id: val })),
        },
      },
    })
  },
})

export const UpdateGroup = mutationField('updateGroup', {
  type: Group,
  args: {
    id: nonNull(stringArg()),
    name: stringArg(),
    isMonthlySettle: booleanArg(),
    userIds: list(nonNull(stringArg())),
  },
  resolve(_, args, ctx: Context) {
    const group = {
      name: args.name || undefined,
      isMonthlySettle:
        args.isMonthlySettle === false
          ? false
          : args.isMonthlySettle || undefined,
      users: args.userIds?.length
        ? {
            set: [],
            connect: args.userIds.map((val: string) => ({ id: val })),
          }
        : undefined,
    }

    return ctx.prisma.group.update({
      where: { id: args.id },
      data: group,
    })
  },
})

export const DeleteGroup = mutationField('deleteGroup', {
  type: Group,
  args: {
    id: nonNull(stringArg()),
  },
  resolve(_, args, ctx: Context) {
    return ctx.prisma.group.delete({
      where: {
        id: args.id,
      },
    })
  },
})
