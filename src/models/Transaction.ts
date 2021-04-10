import { Field, Float, ObjectType } from 'type-graphql'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm'
import { RelationColumn } from '../helpers'
import { User, Base } from './index'

@Entity()
@ObjectType()
export class Transaction extends Base {
  @Field(() => String)
  @Column()
  name: string

  @Field(() => Float)
  @Column()
  amount: number

  @Field(() => Date)
  @Column()
  date: Date

  @Field(() => User)
  @ManyToOne((type) => User)
  @JoinColumn()
  payer: User

  @RelationColumn()
  payerId: string

  // @OneToMany((type) => User)
  // @JoinColumn()
  // @Field()
  // paidFor: User[]
}
