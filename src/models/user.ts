import { getModelForClass, prop } from '@typegoose/typegoose'

export class User {
  @prop({ required: true })
  name!: string

  @prop({ required: true })
  description!: string
}

export default getModelForClass(User)
