import { ObjectId } from 'mongodb'
import { ObjectType, Field } from 'type-graphql'

// @pre<Base>('save', function (next) {
//   if (!this.createdOn || this.isNew) {
//     this.createdOn = this.updatedOn = new Date()
//   } else {
//     this.updatedOn = new Date()
//   }
//   next()
// })

@ObjectType()
export abstract class Base {
  @Field()
  _id?: ObjectId

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}
