import { GraphQLScalarType, Kind } from 'graphql'
import { ObjectId } from 'mongodb'

export const ObjectIdScalar = new GraphQLScalarType({
  name: 'ObjectId',
  description: 'Mongo object id scalar type',
  parseValue(value: string): ObjectId {
    return new ObjectId(value) // value from the client input variables
  },
  serialize(value: ObjectId): string {
    return value.toHexString() // value sent to the client
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  parseLiteral(ast): ObjectId | null {
    if (ast.kind === Kind.STRING) {
      return new ObjectId(ast.value) // value from the client query
    }
    return null
  }
})

export const capitalize = (s: string): string => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}
