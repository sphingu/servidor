import { ObjectId } from 'mongodb'
import { FilterQuery, UpdateQuery } from 'mongoose'
import { DocumentType } from '@typegoose/typegoose'

export interface IBaseRepository<T> {
  getAll(): Promise<T[]>
  filter(query: FilterQuery<DocumentType<T>>): Promise<T[]>
  getById(id: ObjectId): Promise<T | null>
  create(data: Record<string, unknown>): Promise<T>
  update(id: ObjectId, data: UpdateQuery<T>): Promise<T | null>
  delete(id: ObjectId): Promise<T | null>
}
