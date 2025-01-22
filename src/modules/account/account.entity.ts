import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Perm } from '../perm/perm.entity'

@Entity('account')
export class Account {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number

  @Column({ length: 50 })
  contact: string

  @Column({ length: 50 })
  phone: string

  @Column({ length: 255 })
  company: string

  @Column({ length: 255 })
  password: string

  @Column({ length: 50 })
  licenseNumber: string

  @Column({ length: 255 })
  address: string

  @Column({ type: 'tinyint' })
  bizType: number

  @Column({ length: 1000 })
  remark: string

  @Column({ type: 'tinyint', default: 0 })
  isAdmin: boolean

  @Column({ type: 'timestamp' })
  trialStartDate: Date

  @Column({ type: 'timestamp' })
  trialEndDate: Date

  @Column({ type: 'timestamp' })
  startDate: Date

  @Column({ type: 'timestamp' })
  endDate: Date

  @Column({ type: 'tinyint' })
  status: number

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt?: Date

  @OneToMany(type => Perm, perm => perm.account)
  perms: Perm[]
}
