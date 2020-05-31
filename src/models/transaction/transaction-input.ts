import { ObjectId } from 'mongodb'
import { InputType, Field, Int } from 'type-graphql'
import { Validate, IsInt, IsDate, Min, Max } from 'class-validator'

import { Transaction } from './transaction'
import { AlphaNumericWithSpace } from 'helpers/validation'
import { User } from 'models/user'

@InputType()
export class TransactionInput implements Partial<Transaction> {
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

  @Field(() => ObjectId)
  payer: User

  @Field(() => [ObjectId])
  paidFor: User[]
}
