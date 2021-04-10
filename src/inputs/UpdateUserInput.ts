import { Length, Validate } from 'class-validator'
import { Field, InputType } from 'type-graphql'

import { AlphaWithSpace } from '../helpers/validation'

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  @Length(3, 50)
  @Validate(AlphaWithSpace)
  name?: string
}
