import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

import { CreateUserInput, UpdateUserInput } from '../inputs'
import { User } from '../models'

@Resolver((of) => User)
export class UserResolver {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  @Query(() => [User], { nullable: true })
  users() {
    return this.userRepository.find()
  }

  @Mutation(() => User)
  async createUser(@Arg('data') data: CreateUserInput) {
    const user = this.userRepository.create(data)

    await this.userRepository.save(user)

    return user
  }

  @Mutation(() => User)
  async updateUser(@Arg('id') id: string, @Arg('data') data: UpdateUserInput) {
    const user = await this.userRepository.findOne({ where: { id } })
    if (!user) {
      throw new Error('User not found!')
    }

    Object.assign(user, data)

    await this.userRepository.save(user)
    return user
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg('id') id: string) {
    const user = await this.userRepository.findOne({ where: { id } })
    if (!user) {
      throw new Error('User not found!')
    }

    await this.userRepository.softDelete(user)
    return true
  }
}
