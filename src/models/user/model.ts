import { getModelForClass } from '@typegoose/typegoose'

import { User } from './types'

export const UserModel = getModelForClass(User, {
  schemaOptions: { timestamps: true }
})
