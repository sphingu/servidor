import './env'
import express from 'express'
import bodyParser from 'body-parser'

import connectDatabase from './db'
import { getGraphQLServer } from './graphql-server'

getGraphQLServer().then((graphQLServer) => {
  connectDatabase()

  const app: express.Application = express()

  app.use(bodyParser.json())

  graphQLServer.applyMiddleware({ app })

  app.listen(process.env.PORT, function () {
    console.log(
      `🚀 Servidor app ready at http://localhost:${process.env.PORT}${graphQLServer.graphqlPath}`
    )
  })
})
