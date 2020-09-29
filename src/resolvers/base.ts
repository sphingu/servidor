import { ObjectId } from 'mongodb'
import { ClassType, Resolver, Query, Arg, Mutation } from 'type-graphql'

import { IBaseRepository } from 'repositories/types'
import { capitalize } from 'helpers'

export interface IBaseResolver<T> {
  getById(id: ObjectId): Promise<T | null>
  getAll(): Promise<T[]>
  delete(id: ObjectId): Promise<T | null>
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function createBaseResolver<T extends ClassType>(
  suffix: string,
  objectTypeCls: T
) {
  suffix = capitalize(suffix)

  @Resolver({ isAbstract: true })
  abstract class BaseResolver<T> implements IBaseResolver<T> {
    constructor(protected readonly _repo: IBaseRepository<T>) {}

    //#region Queries
    @Query(() => objectTypeCls, {
      nullable: true,
      name: `get${suffix}`
    })
    async getById(@Arg('id', () => ObjectId) id: ObjectId): Promise<T | null> {
      const user = await this._repo.getById(id)
      return user
    }

    @Query(() => [objectTypeCls], { nullable: true, name: `getAll${suffix}` })
    async getAll(): Promise<T[]> {
      return await this._repo.getAll()
    }

    @Mutation(() => objectTypeCls, { nullable: true, name: `delete${suffix}` })
    async delete(@Arg('id') id: ObjectId): Promise<T | null> {
      return await this._repo.delete(id)
    }
    //#endregion
  }

  return BaseResolver
}
