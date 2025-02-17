import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { UserEntity } from './user.entity'

@Entity('perm')
export class PermEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number

  @Column({ unsigned: true })
  ownerId: number

  @Column({ type: 'tinyint' })
  ownerType: number

  @Column()
  perm: string

  @Column({ length: 64 })
  key: string

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date

  @ManyToOne(() => UserEntity, user => user.perms)
  user: UserEntity
}
