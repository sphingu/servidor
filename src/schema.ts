import { gql, makeExecutableSchema } from 'apollo-server'

// import types from './types.gql'
import resolvers from './resolvers'

const typeDefs = gql`
  type Event {
    id: ID!
    createdAt: String!
    title: String!
    description: String!
    price: Int!
    spaces: Int!
    duration: Float!
    date: String!
  }

  type Query {
    allUsers: [User!]!
    listEvents: [Event!]!
  }
`

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

export default schema
