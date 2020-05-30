import { InputType, Field } from 'type-graphql'
import { Length } from 'class-validator'

import { User } from './user'

@InputType()
export class UserInput implements Partial<User> {
  @Field({ nullable: true })
  @Length(1, 50)
  name?: string

  @Field({ nullable: true })
  @Length(1, 255)
  description?: string
}
