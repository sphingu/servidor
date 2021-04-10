import { Field, ID, Int, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm'

@Entity()
@ObjectType()
export abstract class Base extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date

  // @DeleteDateColumn()
  // @Field(() => Date, { nullable: true })
  // deletedAt?: Date

  @Field(() => Int)
  @VersionColumn()
  version: number
}
