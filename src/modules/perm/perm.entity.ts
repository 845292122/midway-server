import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Account } from '../account/account.entity'

@Entity('perm')
export class Perm {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number

  @Column({ unsigned: true })
  pId: number

  @Column({ length: 64 })
  key: string

  @Column()
  description: string

  @Column({ type: 'tinyint', default: 1 })
  status: number

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt?: Date

  @ManyToOne(type => Account, account => account.perms)
  account: Account
}
