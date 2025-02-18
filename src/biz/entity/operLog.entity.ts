import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('oper_log')
export class OperLogEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number

  @Column({ type: 'tinyint', default: 0 })
  type: number

  @Column()
  method: string

  @Column()
  operName: string

  @Column({ type: 'text' })
  operParam: string

  @Column({ type: 'text' })
  operResult: string

  @Column({ type: 'tinyint', default: 0 })
  status: number

  @Column({ type: 'text' })
  errorMsg: string

  @CreateDateColumn({ type: 'timestamp' })
  operTime: Date

  @Column({ type: 'bigint', unsigned: true })
  costTime: number
}
