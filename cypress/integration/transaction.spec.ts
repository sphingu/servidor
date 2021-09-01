/* eslint-disable @typescript-eslint/no-explicit-any */
// load the global Cypress types
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../support/index.d.ts" />

import Queries from 'cypress/support/graphql-queries'

const users = [
  {
    id: 0,
    name: 'sumit',
    email: 'sphingu@gmail.com',
  },
  {
    id: 0,
    name: 'bhavik',
    email: 'bhavik@gmail.com',
  },
]
const transactions = [
  {
    id: 0,
    name: 'Bill 1',
    amount: 100,
    payerId: 0,
    ownedUserIds: [0],
    date: new Date(),
  },
  {
    id: 0,
    name: 'Bill 2',
    amount: 50,
    payerId: 0,
    ownedUserIds: [0],
    date: new Date(),
  },
]

const getTransactionInfo = (transaction: any) => {
  return {
    id: transaction.id,
    name: transaction.name,
    amount: transaction.amount,
    date: transaction.date.toJSON(),
    payerId: transaction.payerId,
    payer: users.find((user) => user.id === transaction.payerId),
    ownedUsers: transaction.ownedUserIds.map((id: number) =>
      users.find((user) => user.id === id),
    ),
    month: transaction.date.getMonth() + 1,
    year: transaction.date.getFullYear(),
  }
}
context('Test User Entity', () => {
  it('should clear existing data', () => {
    cy.log('Clear transactions data')
    cy.requestAPI(Queries.Transaction.getAll).then((res: any) => {
      if (res.body.data.transactions.length !== 0) {
        cy.log(
          'Deleting all existing transactions',
          res.body.data.transactions.length,
        )
        res.body.data.transactions.forEach((transaction: any) => {
          cy.requestAPI(Queries.Transaction.remove(transaction.id)).then(
            (res: any) => {
              expect(res.body.data.deleteTransaction.id).to.be.equal(
                transaction.id,
              )
            },
          )
        })
      }
    })

    cy.log('Clear users data')
    cy.requestAPI(Queries.User.getAll).then((res: any) => {
      if (res.body.data.users.length !== 0) {
        cy.log('Deleting all existing users', res.body.data.users.length)
        res.body.data.users.forEach((user: any) => {
          cy.requestAPI(Queries.User.remove(user.id)).then((res: any) => {
            expect(res.body.data.deleteUser.id).to.be.equal(user.id)
          })
        })
      }
    })
  })

  it('should two users to be used for transaction', () => {
    users.forEach((user) => {
      cy.requestAPI(Queries.User.create(user.name, user.email)).then(
        (res: any) => {
          user.id = res.body.data.createUser.id
          expect(res.body.data.createUser).to.be.deep.equal(user)
        },
      )
    })
  })

  it('should create transactions', () => {
    transactions[0].payerId = users[0].id
    transactions[0].ownedUserIds = [users[0].id, users[1].id]
    transactions[1].payerId = users[1].id
    transactions[1].ownedUserIds = [users[0].id, users[1].id]

    transactions.forEach((transaction) => {
      cy.requestAPI(
        Queries.Transaction.create(
          transaction.name,
          transaction.amount,
          transaction.payerId,
          transaction.ownedUserIds,
          transaction.date,
        ),
      ).then((res: any) => {
        transaction.id = res.body.data.createTransaction.id
        expect(res.body.data.createTransaction).to.be.deep.equal(
          getTransactionInfo(transaction),
        )
      })
    })
  })

  it('should fetch all transactions', () => {
    cy.requestAPI(Queries.Transaction.getAll).then((res: any) => {
      expect(res.body.data.transactions).to.be.deep.equal(
        transactions.map(getTransactionInfo),
      )
    })
  })

  it('should fetch single transaction', () => {
    transactions.forEach((transaction) => {
      cy.requestAPI(Queries.Transaction.getById(transaction.id)).then(
        (res: any) => {
          expect(res.body.data.transaction).to.be.deep.equal(
            getTransactionInfo(transaction),
          )
        },
      )
    })
  })
})
