import { ObjectId } from 'mongodb'
import { Arg, Query, Resolver, Mutation } from 'type-graphql'
import { DocumentType } from '@typegoose/typegoose'

import { User, UserModel } from '../models'
import { ObjectIdScalar } from '../helpers'
import { UserInput } from './types'

@Resolver(() => User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  async user(
    @Arg('_id', () => ObjectIdScalar) _id: ObjectId
  ): Promise<DocumentType<User> | null> {
    const user = await UserModel.findById(_id)
    return user
  }

  @Query(() => [User], { nullable: true })
  async users(): Promise<User[]> {
    return await UserModel.find()
  }

  @Mutation(() => User)
  async createUser(
    @Arg('data') { name, description }: UserInput
  ): Promise<Partial<User>> {
    const user = (
      await UserModel.create({
        name,
        description
      })
    ).save()
    return user as Partial<User>
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg('_id') _id: string): Promise<boolean> {
    await UserModel.deleteOne({ _id: _id })
    return true
  }
}
