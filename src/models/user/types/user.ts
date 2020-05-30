import { ObjectType, Field } from 'type-graphql'
import { prop as Property } from '@typegoose/typegoose'

import { Base } from 'models/types'

@ObjectType()
export class User extends Base {
  @Field()
  @Property({
    unique: true,
    required: true,
    lowercase: true,
    trim: true
    // validate: {
    //   validator: (): boolean => true,
    //   message: 'validation error message'
    // }
  })
  name: string

  @Field({ nullable: true })
  @Property({ trim: true })
  description?: string
}
