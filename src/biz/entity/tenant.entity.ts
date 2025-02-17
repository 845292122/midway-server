import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { BaseEntity } from './base.entity'
import { UserEntity } from './user.entity'

@Entity('tenant')
export class TenantEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true, comment: '主键' })
  id: number

  @Column({ length: 50, comment: '联系人名称' })
  contactName: string

  @Column({ length: 20, comment: '联系人电话' })
  contactPhone: string

  @Column({ length: 100, comment: '企业名称' })
  companyName: string

  @Column({ length: 50, comment: '统一社会信用代码' })
  licenseNumber: string

  @Column({ length: 200, comment: '地址' })
  address: string

  @Column({ length: 255, comment: '企业简介' })
  intro: string

  @Column({ length: 255, comment: '域名' })
  domain: string

  @Column({ length: 255, comment: '备注' })
  remark: string

  @Column({ type: 'tinyint', comment: '用户数量, 最大127, -1为无限制' })
  userCount: number

  @Column({ type: 'timestamp', comment: '试用开始时间' })
  trialStartDate: Date

  @Column({ type: 'timestamp', comment: '试用结束时间' })
  trialEndDate: Date

  @Column({ type: 'timestamp', comment: '使用开始时间' })
  startDate: Date

  @Column({ type: 'timestamp', comment: '使用结束时间' })
  endDate: Date

  @Column({ type: 'tinyint', comment: '状态: 未使用; 试用中; 试用结束; 试用中; 到期;' })
  status: number

  @Column({ type: 'tinyint', width: 1, comment: '是否是premium租户' })
  isPremium: boolean

  @OneToMany(() => UserEntity, user => user.tenant)
  users: UserEntity[]
}
