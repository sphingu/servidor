import { ApolloServer } from 'apollo-server'
import { schema } from './schema'
import { context } from './context'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'

export const server = new ApolloServer({
  schema,
  context,
  // TODO: make it conditional for production
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
})
