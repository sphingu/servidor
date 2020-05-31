import { ObjectId } from 'mongodb'
import {
  Arg,
  Query,
  Resolver,
  Mutation,
  FieldResolver,
  Root
} from 'type-graphql'

import { Transaction, TransactionInput } from 'models/transaction'
import { User } from 'models/user'
import { UserRepository, TransactionRepository } from 'repositories'
import { createBaseResolver } from './base'

const TransactionBaseResolver = createBaseResolver('transaction', Transaction)

@Resolver(Transaction)
export class TransactionResolver extends TransactionBaseResolver<Transaction> {
  private readonly _userRepo: UserRepository
  constructor() {
    super(new TransactionRepository())
    this._userRepo = new UserRepository()
  }

  @Mutation(() => Transaction, { nullable: true })
  async createTransaction(
    @Arg('data') data: TransactionInput
  ): Promise<Transaction> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return await this._repo.create(data as any)
  }

  @Mutation(() => Transaction, { nullable: true })
  async updateTransaction(
    @Arg('id') id: ObjectId,
    @Arg('data') data: TransactionInput
  ): Promise<Transaction | null> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return await this._repo.update(id, data as any)
  }

  @FieldResolver(() => User)
  async payer(@Root('_doc') transaction: Transaction): Promise<User | null> {
    return await this._userRepo.getById(transaction.payer as ObjectId)
  }

  @FieldResolver(() => [User])
  async paidFor(@Root('_doc') transaction: Transaction): Promise<User[]> {
    return await this._userRepo.filter({ _id: { $in: transaction.paidFor } })
  }
}
