import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { ObjectId } from 'mongodb'
import { GraphQLSchema } from 'graphql'

import { UserResolver } from './resolvers'
import { ObjectIdScalar } from './helpers'

const getSchema = async (): Promise<GraphQLSchema> => {
  return await buildSchema({
    resolvers: [UserResolver],
    scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
    dateScalarMode: 'timestamp'
  })
}

export const getGraphQLServer = async (): Promise<ApolloServer> => {
  const schema = await getSchema()

  const server = new ApolloServer({ schema })

  return server
}
