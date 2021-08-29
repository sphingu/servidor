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

export const Transactions = queryField((t) => {
  // Transaction List
  t.list.field('transactions', {
    type: Transaction,
    resolve(_, __, ctx) {
      return ctx.db.transaction.findMany()
    },
  })

  // Transaction by ID
  t.field('transaction', {
    type: Transaction,
    args: {
      id: nonNull(intArg()),
    },
    resolve(_, args, ctx) {
      return ctx.db.transaction.findUnique({
        where: { id: args.id },
      })
    },
  })
})

export const CreateTransaction = mutationField('createTransaction', {
  type: Transaction,
  args: {
    name: nonNull(stringArg()),
    amount: nonNull(intArg()),
    payerId: nonNull(intArg()),
    ownedUserIds: nonNull(list(nonNull(intArg()))),
    date: nonNull(dateTimeArg({ type: 'DateTime' })),
  },
  resolve(_, args, ctx) {
    const ownedUserIds = args.ownedUserIds.map((val: number) => ({ id: val }))
    const month = args.date.getUTCMonth() + 1
    const year = args.date.getUTCFullYear()

    return ctx.db.transaction.create({
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
    id: nonNull(intArg()),
    name: stringArg(),
    amount: intArg(),
    payerId: intArg(),
    ownedUserIds: list(nonNull(intArg())),
    date: dateTimeArg({ type: 'DateTime' }),
  },
  resolve(_, args, ctx) {
    const user = {
      ownedUsers: args.ownedUserIds?.length
        ? {
            set: [],
            connect: args.ownedUserIds.map((val: number) => ({ id: val })),
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

    return ctx.db.transaction.update({
      where: { id: args.id },
      data: user,
    })
  },
})

export const DeleteTransaction = mutationField('deleteTransaction', {
  type: Transaction,
  args: {
    id: nonNull(intArg()),
  },
  resolve(_, args, ctx) {
    return ctx.db.transaction.delete({
      where: {
        id: args.id,
      },
    })
  },
})
