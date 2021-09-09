import Queries from 'cypress/support/graphql-queries'
import { User } from '.prisma/client'

export const sampleUser: Partial<User> = {
  id: 0,
  name: 'sumit',
  email: 'sphingu@gmail.com',
}
export const sampleUserForUpdate: Partial<User> = {
  id: 0,
  name: 'bhavik',
  email: 'bhavik@gmail.com',
}

export const getAllUser = async (): Promise<User[]> => {
  const res = await cy.requestAPI(Queries.User.getAll).promisify()
  return res.body.data.users
}

export const getUser = async (userId: number): Promise<User> => {
  const res = await cy.requestAPI(Queries.User.getById(userId)).promisify()
  return res.body.data.user
}

export const deleteUser = async (userId: number): Promise<User> => {
  const res = await cy.requestAPI(Queries.User.remove(userId)).promisify()

  expect(res.body.data.deleteUser.id).to.be.equal(userId)

  return res.body.data.deleteUser
}

export const createUser = async (
  name: string,
  email?: string,
): Promise<User> => {
  const res = await cy.requestAPI(Queries.User.create(name, email)).promisify()

  expect(res.body.data.createUser.name).to.be.equal(name)
  expect(res.body.data.createUser.email).to.be.equal(email)

  return res.body.data.createUser
}
export const updateUser = async (
  id: number,
  name?: string,
  email?: string,
): Promise<User> => {
  const res = await cy
    .requestAPI(Queries.User.update(id, name, email))
    .promisify()

  expect(res.body.data.updateUser.id).to.be.equal(id)
  expect(res.body.data.updateUser.name).to.be.equal(name)
  expect(res.body.data.updateUser.email).to.be.equal(email)

  return res.body.data.updateUser
}
