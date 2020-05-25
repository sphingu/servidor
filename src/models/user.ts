import { ObjectId } from 'mongodb'
import { ObjectType, Field } from 'type-graphql'
import { getModelForClass, prop as Property } from '@typegoose/typegoose'

@ObjectType()
export class User {
  @Field()
  readonly _id: ObjectId

  @Field()
  @Property({ required: true })
  name: string

  @Field({ nullable: true })
  @Property()
  description?: string
}

export const UserModel = getModelForClass(User)
