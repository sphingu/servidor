import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql'

import { Transaction, User } from '../models'
import { CreateTransactionInput } from '../inputs'

@Resolver((of) => Transaction)
export class TransactionResolver {
  @Query(() => [Transaction], { nullable: true })
  transactions() {
    return Transaction.find()
  }

  @Mutation(() => Transaction)
  async createTransaction(
    @Arg('payerId') payerId: string,
    @Arg('data') data: CreateTransactionInput,
  ) {
    const transaction = Transaction.create({ ...data, payerId } as Transaction)
    await transaction.save()
    return transaction
  }

  @FieldResolver()
  async payer(@Root() payer: User): Promise<User> {
    return (await User.findOne({ where: { id: payer.id } }))!
  }
}
