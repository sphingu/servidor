import { ObjectId } from 'mongodb'
import {
  AnyParamConstructor,
  DocumentType,
  ReturnModelType
} from '@typegoose/typegoose/lib/types'
import { UpdateQuery, FilterQuery } from 'mongoose'
import { IBaseRepository } from './types'
import { Base } from 'models/types'
import { sleep } from 'helpers'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class BaseRepository<T extends Base> implements IBaseRepository<T> {
  constructor(
    private readonly _model: ReturnModelType<AnyParamConstructor<T>>
  ) {}

  async getAll(): Promise<T[]> {
    await sleep()
    const records = await this._model.find()
    return records
  }

  async filter(query: FilterQuery<DocumentType<T>>): Promise<T[]> {
    await sleep()
    const results = await this._model.find(query)
    return results
  }

  async getById(id: ObjectId): Promise<T | null> {
    await sleep()
    const record = await this._model.findById(id)
    return record?.toJSON()
  }

  async create(data: Record<string, unknown>): Promise<T> {
    await sleep()
    const record = await this._model.create(data)

    record.save()

    return record.toJSON()
  }

  async update(id: ObjectId, data: UpdateQuery<T>): Promise<T | null> {
    await sleep()
    const record = await this._model.findByIdAndUpdate(id, data, {
      new: true,
      omitUndefined: true
    })
    return record?.toJSON()
  }

  async delete(id: ObjectId): Promise<T | null> {
    await sleep()
    const record = await this._model.findByIdAndDelete(id)
    return record?.toJSON()
  }
}
