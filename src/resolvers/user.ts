import { ObjectId } from 'mongodb'
import { Arg, Resolver, Mutation } from 'type-graphql'

import { User, UserInput } from 'models/user'
import { UserRepository } from 'repositories'
import { createBaseResolver } from './base'

const UserBaseResolver = createBaseResolver('user', User)

@Resolver(() => User)
export class UserResolver extends UserBaseResolver<User> {
  constructor() {
    super(new UserRepository())
  }

  @Mutation(() => User, { nullable: true })
  async createUser(@Arg('data') data: UserInput): Promise<User> {
    return await this._repo.create(data as Record<string, unknown>)
  }

  @Mutation(() => User, { nullable: true })
  async updateUser(
    @Arg('id') id: ObjectId,
    @Arg('data') data: UserInput
  ): Promise<User | null> {
    return await this._repo.update(id, data as Record<string, unknown>)
  }
}
