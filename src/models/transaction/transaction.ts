import { ObjectType, Field, Int } from 'type-graphql'
import {
  prop as Property,
  arrayProp as ArrayProperty,
  Ref
} from '@typegoose/typegoose'

import { User } from 'models/user'
import { Base } from 'models/types'

@ObjectType()
export class Transaction extends Base {
  @Field()
  @Property({
    required: true,
    trim: true
  })
  name: string

  @Field(() => Int)
  @Property({ required: true })
  amount: number

  @Field()
  @Property({ required: true })
  date: Date

  @Field(() => User)
  @Property({ ref: User, required: true })
  payer: Ref<User>

  @Field(() => [User])
  @ArrayProperty({ ref: User, required: true })
  paidFor: Ref<User[]>
}
