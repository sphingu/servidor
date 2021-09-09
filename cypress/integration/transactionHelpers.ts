import Queries from 'cypress/support/graphql-queries'

import { User, Transaction } from '.prisma/client'
import { sampleUser, sampleUserForUpdate } from './userHelpers'

type MonthlyTransaction = {
  month: number
  year: number
  count: number
}
type TransactionType = Partial<Transaction> & {
  ownedUserIds: number[]
}

type TransactionDbType = Partial<Omit<Transaction, 'date'>> & {
  date: string
  payer: Partial<User> | undefined
  ownedUsers: (Partial<User> | undefined)[]
}

export const sampleUsers: Partial<User>[] = [sampleUser, sampleUserForUpdate]

export const sampleTransactions: TransactionType[] = [
  {
    id: 0,
    name: 'Bill 1',
    amount: 100,
    payerId: 0,
    ownedUserIds: [0],
    date: new Date('5/5/2020'),
  },
  {
    id: 0,
    name: 'Bill 2',
    amount: 50,
    payerId: 0,
    ownedUserIds: [0],
    date: new Date('5/5/2020'),
  },
  {
    id: 0,
    name: 'Bill 4',
    amount: 50,
    payerId: 0,
    ownedUserIds: [0],
    date: new Date('10/10/2021'),
  },
  {
    id: 0,
    name: 'Bill 4',
    amount: 50,
    payerId: 0,
    ownedUserIds: [0],
    date: new Date('11/10/2020'),
  },
]

export const getTransactionInfo = (
  transaction: TransactionType,
): TransactionDbType => {
  return {
    id: transaction.id,
    name: transaction.name,
    amount: transaction.amount,
    date: (transaction.date as Date).toJSON(),
    payerId: transaction.payerId,
    payer: sampleUsers.find((user) => user.id === transaction.payerId),
    ownedUsers: transaction.ownedUserIds.map((id: number) =>
      sampleUsers.find((user) => user.id === id),
    ),
    month: (transaction.date as Date).getMonth() + 1,
    year: (transaction.date as Date).getFullYear(),
  }
}

export const getMonthlyTransactions = async (): Promise<MonthlyTransaction> => {
  const res = await cy.requestAPI(Queries.Transaction.monthly).promisify()
  return res.body.data.monthlyTransactions
}

export const getAllTransactions = async (): Promise<TransactionDbType[]> => {
  const res = await cy.requestAPI(Queries.Transaction.getAll).promisify()
  return res.body.data.transactions
}

export const getTransaction = async (
  id: number,
): Promise<TransactionDbType> => {
  const res = await cy.requestAPI(Queries.Transaction.getById(id)).promisify()

  expect(res.body.data.transaction.id).to.be.equal(id)

  return res.body.data.transaction
}

export const deleteTransaction = async (
  id: number,
): Promise<TransactionDbType> => {
  const res = await cy.requestAPI(Queries.Transaction.remove(id)).promisify()

  expect(res.body.data.deleteTransaction.id).to.be.equal(id)

  return res.body.data.deleteTransaction
}

export const createTransaction = async (
  transaction: TransactionType,
): Promise<TransactionDbType> => {
  const res = await cy
    .requestAPI(
      Queries.Transaction.create(
        transaction.name as string,
        transaction.amount as number,
        transaction.payerId as number,
        transaction.ownedUserIds as number[],
        transaction.date as Date,
      ),
    )
    .promisify()

  expect(res.body.data.createTransaction).to.be.deep.equal({
    ...getTransactionInfo(transaction),
    id: res.body.data.createTransaction.id,
  })

  return res.body.data.createTransaction
}

export const updateTransaction = async (
  transaction: TransactionType,
): Promise<TransactionDbType> => {
  const res = await cy
    .requestAPI(
      Queries.Transaction.update(
        transaction.id as number,
        transaction.name as string,
        transaction.amount as number,
        transaction.payerId as number,
        transaction.ownedUserIds as number[],
        transaction.date as Date,
      ),
    )
    .promisify()

  expect(res.body.data.updateTransaction).to.be.deep.equal({
    ...getTransactionInfo(transaction),
  })

  return res.body.data.updateTransaction
}
