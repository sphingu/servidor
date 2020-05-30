import { ObjectId } from 'mongodb'
import { Arg, Query, Resolver, Mutation } from 'type-graphql'

import { UserModel } from './model'
import { ObjectIdScalar } from '../../helpers'

import { User, UserInput } from './types'

@Resolver(() => User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  async user(@Arg('_id', () => ObjectIdScalar) _id: ObjectId): Promise<User> {
    const user = await UserModel.findById(_id)

    return user?.toJSON()
  }

  @Query(() => [User], { nullable: true })
  async users(): Promise<User[]> {
    return await UserModel.find()
  }

  @Mutation(() => User, { nullable: true })
  async createUser(
    @Arg('data') { name, description }: UserInput
  ): Promise<User> {
    const user = (
      await UserModel.create({
        name,
        description
      })
    ).save()
    return user
  }

  @Mutation(() => User, { nullable: true })
  async updateUser(
    @Arg('id') id: string,
    @Arg('data') { name, description }: UserInput
  ): Promise<User> {
    const user = await UserModel.findByIdAndUpdate(
      id,
      { name, description },
      { new: true, omitUndefined: true }
    )
    return user?.toJSON()
  }

  @Mutation(() => User, { nullable: true })
  async deleteUser(@Arg('_id') _id: string): Promise<User> {
    const user = await UserModel.findByIdAndDelete(_id)

    return user?.toJSON()
  }
}
