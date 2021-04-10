import 'reflect-metadata'

import { ApolloServer } from 'apollo-server'
import { Container } from 'typedi'
import * as TypeORM from 'typeorm'
import * as TypeGraphQL from 'type-graphql'
import { UserResolver } from './resolvers'

TypeORM.useContainer(Container)

async function main() {
  try {
    const connection = await TypeORM.createConnection()

    // seed database ???

    const schema = await TypeGraphQL.buildSchema({
      resolvers: [UserResolver],
      container: Container,
      emitSchemaFile: true,
    })

    // Context ??
    const server = new ApolloServer({
      schema,
    })

    const { url } = await server.listen(4000)
    console.log(`Server is running, GraphQL Playground available at ${url}`)
  } catch (error) {
    console.log(error)
  }
}

main()
