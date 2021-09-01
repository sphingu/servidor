/* eslint-disable @typescript-eslint/no-explicit-any */
// load the global Cypress types
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../support/index.d.ts" />

import Queries from 'cypress/support/graphql-queries'

const user = {
  id: 0,
  name: 'sumit',
  email: 'sphingu@gmail.com',
}
const updateUser = {
  id: 0,
  name: 'bhavik',
  email: 'bhavik@gmail.com',
}

context('Test User Entity', () => {
  it('should clear existing data', () => {
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

  it('should create user', () => {
    cy.requestAPI(Queries.User.create(user.name, user.email)).then(
      (res: any) => {
        expect(res.body.data.createUser.name).to.be.equal(user.name)
        expect(res.body.data.createUser.email).to.be.equal(user.email)
        user.id = res.body.data.createUser.id
        updateUser.id = res.body.data.createUser.id
      },
    )
  })

  it('should fetch all users', () => {
    cy.requestAPI(Queries.User.getAll).then((res: any) => {
      expect(res.body.data.users).to.be.deep.equal([user])
    })
  })

  it('should fetch single user', () => {
    cy.requestAPI(Queries.User.getById(user.id)).then((res: any) => {
      expect(res.body.data.user).to.be.deep.equal(user)
    })
  })

  it('should update user', () => {
    cy.requestAPI(
      Queries.User.update(updateUser.id, updateUser.name, updateUser.email),
    ).then((res: any) => {
      expect(res.body.data.updateUser).to.be.deep.equal(updateUser)
    })
  })

  it('should fetch all users after update', () => {
    cy.requestAPI(Queries.User.getAll).then((res: any) => {
      expect(res.body.data.users).to.be.deep.equal([updateUser])
    })
  })

  it('should fetch single user after update', () => {
    cy.requestAPI(Queries.User.getById(updateUser.id)).then((res: any) => {
      expect(res.body.data.user).to.be.deep.equal(updateUser)
    })
  })

  it('should delete user', () => {
    cy.requestAPI(Queries.User.remove(updateUser.id)).then((res: any) => {
      expect(res.body.data.deleteUser).to.be.deep.equal(updateUser)
    })
  })

  it('should return empty user list after delete', () => {
    cy.requestAPI(Queries.User.getAll).then((res: any) => {
      expect(res.body.data.users.length).to.be.equal(0)
    })
  })

  it('should return null for fetching deleted user', () => {
    cy.requestAPI(Queries.User.getById(updateUser.id)).then((res: any) => {
      expect(res.body.data.user).to.be.null
    })
  })
})
