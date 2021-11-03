import { Transaction as TransactionSchema } from 'nexus-prisma'

import {
  intArg,
  nonNull,
  objectType,
  queryField,
  stringArg,
  mutationField,
  list,
} from 'nexus'

import { dateTimeArg } from './helpers'
import { Context } from 'src/context'

export const Transaction = objectType({
  name: TransactionSchema.$name,
  description: TransactionSchema.$description,
  definition(t) {
    t.field(TransactionSchema.id)
    t.field(TransactionSchema.name)
    t.field(TransactionSchema.amount)

    t.field(TransactionSchema.payerId)
    t.field(TransactionSchema.payer)
    t.field(TransactionSchema.ownedUsers)

    t.field(TransactionSchema.date)
    t.field(TransactionSchema.month)
    t.field(TransactionSchema.year)
  },
})

export const MonthTransactions = objectType({
  name: 'MonthTransactions',
  definition(t) {
    t.int('month')
    t.int('year')
    t.int('count')
    t.int('sum')
  },
})

export const Transactions = queryField((t) => {
  // Transaction List
  t.list.field('transactions', {
    type: Transaction,
    resolve(_, __, ctx: Context) {
      return ctx.prisma.transaction.findMany()
    },
  })

  // Transaction by ID
  t.field('transaction', {
    type: Transaction,
    args: {
      id: nonNull(stringArg()),
    },
    resolve(_, args, ctx: Context) {
      return ctx.prisma.transaction.findUnique({
        where: { id: args.id },
      })
    },
  })

  // Transaction count by Month-Year
  t.list.field('monthlyTransactions', {
    type: MonthTransactions,
    resolve(_, __, ctx: Context) {
      return ctx.prisma.transaction
        .groupBy({
          by: ['month', 'year'],
          orderBy: [{ year: 'desc' }, { month: 'desc' }],
          _count: true,
          _sum: {
            amount: true,
          },
        })
        .then((list) =>
          list.map((item) => ({
            year: item.year,
            month: item.month,
            count: item._count,
            sum: item._sum.amount,
          })),
        )
    },
  })
})

export const CreateTransaction = mutationField('createTransaction', {
  type: Transaction,
  args: {
    name: nonNull(stringArg()),
    amount: nonNull(intArg()),
    payerId: nonNull(stringArg()),
    ownedUserIds: nonNull(list(nonNull(stringArg()))),
    date: nonNull(dateTimeArg({ type: 'DateTime' })),
  },
  resolve(_, args, ctx: Context) {
    const ownedUserIds = args.ownedUserIds.map((val: string) => ({ id: val }))
    const month = args.date.getUTCMonth() + 1
    const year = args.date.getUTCFullYear()

    return ctx.prisma.transaction.create({
      data: {
        name: args.name,
        amount: args.amount,
        payer: {
          connect: { id: args.payerId },
        },
        ownedUsers: {
          connect: ownedUserIds,
        },
        date: args.date,
        month: month,
        year: year,
      },
    })
  },
})

export const UpdateTransaction = mutationField('updateTransaction', {
  type: Transaction,
  args: {
    id: nonNull(stringArg()),
    name: stringArg(),
    amount: intArg(),
    payerId: stringArg(),
    ownedUserIds: list(nonNull(stringArg())),
    date: dateTimeArg({ type: 'DateTime' }),
  },
  resolve(_, args, ctx: Context) {
    const transaction = {
      ownedUsers: args.ownedUserIds?.length
        ? {
            set: [],
            connect: args.ownedUserIds.map((val: string) => ({ id: val })),
          }
        : undefined,
      name: args.name || undefined,
      amount: args.amount || undefined,
      payer: args.payerId
        ? {
            connect: { id: args.payerId },
          }
        : undefined,
      date: args.date || undefined,
      month: args.date ? args.date.getUTCMonth() + 1 : undefined,
      year: args.date ? args.date.getUTCFullYear() : undefined,
    }

    return ctx.prisma.transaction.update({
      where: { id: args.id },
      data: transaction,
    })
  },
})

export const DeleteTransaction = mutationField('deleteTransaction', {
  type: Transaction,
  args: {
    id: nonNull(stringArg()),
  },
  resolve(_, args, ctx: Context) {
    return ctx.prisma.transaction.delete({
      where: {
        id: args.id,
      },
    })
  },
})
