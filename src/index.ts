import express from 'express'
import bodyParser from 'body-parser'

import connectDatabase from './db'
import { getGraphQLServer } from './graphql-server'

getGraphQLServer().then((graphQLServer) => {
  connectDatabase()

  const app: express.Application = express()

  app.use(bodyParser.json())

  graphQLServer.applyMiddleware({ app, path: '/g' })

  app.listen(3000, function () {
    console.log(
      `🚀 Servidor app ready at http://localhost:3000${graphQLServer.graphqlPath}`
    )
  })
})
