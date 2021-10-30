import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'

import { schema } from './schema'
import { createContext } from './context'

export const createServer = async (): Promise<ApolloServer> => {
  const server = new ApolloServer({
    schema,
    context: createContext,
    // TODO: make it conditional for production
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground({
        settings: { 'request.credentials': 'same-origin' },
      }),
    ],
  })

  await server.start()

  return server
}
