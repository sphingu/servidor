import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { ObjectId } from 'mongodb'
import { GraphQLSchema } from 'graphql'

import { ObjectIdScalar } from './helpers'
import { UserResolver, TransactionResolver } from 'resolvers'

const getSchema = async (): Promise<GraphQLSchema> => {
  return await buildSchema({
    resolvers: [UserResolver, TransactionResolver],
    scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
    dateScalarMode: 'timestamp'
  })
}

export const getGraphQLServer = async (): Promise<ApolloServer> => {
  const schema = await getSchema()

  const server = new ApolloServer({
    schema,
    introspection: true,
    engine: false,
    tracing: true
  })

  return server
}
