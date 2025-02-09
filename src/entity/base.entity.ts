import { Column, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm'

export abstract class BaseEntity {
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date

  @DeleteDateColumn({ comment: '逻辑删除, 有值就代表删除了' })
  deletedAt?: Date

  @Column({ unsigned: true, comment: '创建人 -> userID' })
  createBy: number

  @Column({ unsigned: true, comment: '更新人 -> userID' })
  updateBy: number
}
