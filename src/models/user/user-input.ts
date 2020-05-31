import { InputType, Field } from 'type-graphql'
import { Length, Validate } from 'class-validator'

import { User } from './user'
import { AlphaWithSpace } from 'helpers/validation'

@InputType()
export class UserInput implements Partial<User> {
  @Field({ nullable: true })
  @Length(3, 50)
  @Validate(AlphaWithSpace)
  name?: string

  @Field({ nullable: true })
  @Length(3, 255)
  @Validate(AlphaWithSpace)
  description?: string
}
