/* eslint-disable @typescript-eslint/no-explicit-any */
// load the global Cypress types
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../support/index.d.ts" />

import {
  createTransaction,
  deleteTransaction,
  getAllTransactions,
  getMonthlyTransactions,
  getTransaction,
  getTransactionInfo,
  sampleTransactions,
  sampleUsers,
} from './transactionHelpers'
import { createUser, deleteUser, getAllUser, sampleUser } from './userHelpers'

context('Test User Entity', async () => {
  it('should clear existing data', async () => {
    cy.log('Clear transactions data')
    const transactions = await getAllTransactions()

    if (transactions.length !== 0) {
      cy.log('Deleting all existing transactions', transactions.length)
      await Promise.all(
        transactions.map(async (transaction: any) => {
          await deleteTransaction(transaction.id)
        }),
      )
    }

    cy.log('Clear users data')
    const users = await getAllUser()
    if (users.length !== 0) {
      cy.log('Deleting all existing users', users.length)
      await Promise.all(users.map(async (user) => await deleteUser(user.id)))
    }
  })

  it('should create two users to be used for transaction', async () => {
    await Promise.all(
      sampleUsers.map(async (user) => {
        const createdUser = await createUser(
          user.name as string,
          user.email as string,
        )
        user.id = createdUser.id
      }),
    )
  })

  it('should create transactions', async () => {
    sampleTransactions[0].payerId = sampleUsers[0].id
    sampleTransactions[0].ownedUserIds = [
      sampleUsers[0].id as number,
      sampleUsers[1].id as number,
    ]
    sampleTransactions[1].payerId = sampleUsers[1].id
    sampleTransactions[1].ownedUserIds = [
      sampleUsers[0].id as number,
      sampleUsers[1].id as number,
    ]

    sampleTransactions[2].payerId = sampleUsers[1].id
    sampleTransactions[2].ownedUserIds = [
      sampleUsers[0].id as number,
      sampleUsers[1].id as number,
    ]

    sampleTransactions[3].payerId = sampleUsers[1].id
    sampleTransactions[3].ownedUserIds = [sampleUsers[0].id as number]

    await Promise.all(
      sampleTransactions.map(async (transaction) => {
        const createdTransaction = await createTransaction(transaction)
        transaction.id = createdTransaction.id
      }),
    )
  })

  it('should fetch all transactions', async () => {
    const transactions = await getAllTransactions()

    expect(transactions).to.be.deep.equal(
      sampleTransactions.map(getTransactionInfo),
    )
  })

  it('should fetch single transaction', async () => {
    await Promise.all(
      sampleTransactions.map(async (transaction) => {
        const transactionInfo = await getTransaction(transaction.id as number)
        expect(transactionInfo).to.be.deep.equal(
          getTransactionInfo(transaction),
        )
      }),
    )
  })

  it('should monthly transactions', async () => {
    const monthlyTransactions = await getMonthlyTransactions()
    expect(monthlyTransactions).to.be.deep.equal([
      { month: 10, year: 2021, count: 1 },
      { month: 11, year: 2020, count: 1 },
      { month: 5, year: 2020, count: 2 },
    ])
  })
})
