import { BaseRepository } from './base'
import { User } from 'models/user'
import { getModelForClass } from '@typegoose/typegoose'

export class UserRepository extends BaseRepository<User> {
  constructor() {
    const model = getModelForClass(User, {
      schemaOptions: { timestamps: true }
    })

    super(model)
  }
}
