import { Length } from 'class-validator'
import { Field, InputType } from 'type-graphql'

import { User } from '../../models'

@InputType()
export class UserInput implements Partial<User> {
  @Field()
  @Length(1, 50)
  name: string

  @Field({ nullable: true })
  @Length(1, 255)
  description?: string
}
