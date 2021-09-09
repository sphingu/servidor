/* eslint-disable @typescript-eslint/no-explicit-any */
// load the global Cypress types
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../support/index.d.ts" />

import {
  sampleUserForUpdate,
  sampleUser,
  getAllUser,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from './userHelpers'

context('Test User Entity', async () => {
  it('should clear existing data', async () => {
    const users = await getAllUser()
    if (users.length !== 0) {
      cy.log('Deleting all existing users', users.length)
      await Promise.all(users.map(async (user) => await deleteUser(user.id)))
    }
  })

  it('should create user', async () => {
    const user = await createUser(
      sampleUser.name as string,
      sampleUser.email as string,
    )

    sampleUser.id = user.id
    sampleUserForUpdate.id = user.id
  })

  it('should fetch all users', async () => {
    const users = await getAllUser()
    expect(users).to.be.deep.equal([sampleUser])
  })

  it('should fetch single user', async () => {
    const user = await getUser(sampleUser.id as number)
    expect(user).to.be.deep.equal(sampleUser)
  })

  it('should update user', async () => {
    const user = await updateUser(
      sampleUserForUpdate.id as number,
      sampleUserForUpdate.name,
      sampleUserForUpdate.email as string,
    )

    expect(user).to.be.deep.equal(sampleUserForUpdate)
  })

  it('should fetch all users after update', async () => {
    const users = await getAllUser()
    expect(users).to.be.deep.equal([sampleUserForUpdate])
  })

  it('should fetch single user after update', async () => {
    const user = await getUser(sampleUserForUpdate.id as number)
    expect(user).to.be.deep.equal(sampleUserForUpdate)
  })

  it('should delete user', async () => {
    const user = await deleteUser(sampleUserForUpdate.id as number)
    expect(user).to.be.deep.equal(sampleUserForUpdate)
  })

  it('should return empty user list after delete', async () => {
    const users = await getAllUser()
    expect(users).to.be.deep.equal([])
  })

  it('should return null for fetching deleted user', async () => {
    const user = await getUser(sampleUserForUpdate.id as number)
    expect(user).to.be.null
  })
})
