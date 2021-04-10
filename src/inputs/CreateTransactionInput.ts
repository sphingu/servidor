import { InputType, Field, Int } from 'type-graphql'
import { Validate, IsInt, IsDate, Min, Max } from 'class-validator'
import { User } from '../models'
import { AlphaNumericWithSpace } from '../helpers/validation'

@InputType()
export class CreateTransactionInput {
  @Field()
  @Validate(AlphaNumericWithSpace)
  name?: string

  @Field(() => Int)
  @IsInt()
  @Min(1)
  @Max(500000)
  amount?: number

  @Field()
  @IsDate()
  date?: Date

  // @Field(() => String)
  // payerId: string

  // @Field(() => [Int])
  // paidFor: User[]
}
