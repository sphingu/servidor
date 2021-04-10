import { Field, ID, ObjectType } from 'type-graphql'
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { Base } from './Base'

@Entity()
@ObjectType()
export class User extends Base {
  @Field(() => String)
  @Column()
  name: string
}
