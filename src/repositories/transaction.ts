import { BaseRepository } from './base'
import { Transaction } from 'models/transaction'
import { getModelForClass } from '@typegoose/typegoose'

export class TransactionRepository extends BaseRepository<Transaction> {
  constructor() {
    const model = getModelForClass(Transaction, {
      schemaOptions: { timestamps: true }
    })

    super(model)
  }
}
