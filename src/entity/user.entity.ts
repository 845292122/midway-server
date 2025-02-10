import { Column, PrimaryGeneratedColumn } from 'typeorm'
import { BaseEntity } from './base.entity'

export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true, comment: '主键' })
  id: number

  @Column({ length: 50, comment: '用户名' })
  username: string

  @Column({ length: 255, comment: '密码' })
  password: string

  @Column({ length: 100, comment: '昵称' })
  nickname: string

  @Column({ type: 'tinyint', comment: '是否平台管理员, 1: 是; 0: 否', default: 0 })
  isPlatformAdmin: boolean

  @Column({ length: 50, comment: '邮箱' })
  email: string

  @Column({ length: 20, comment: '手机号' })
  phone: string

  @Column({ type: 'tinyint', comment: '性别, 1: 男; 2: 女', default: 1 })
  gender: number

  @Column({ length: 255, comment: '头像' })
  avatar: string

  @Column({ type: 'tinyint', comment: '状态, 1: 正常; 2: 禁用', default: 1 })
  status: number

  @Column({ length: 255, comment: '最后登录IP' })
  loginIp: string

  @Column({ type: 'datetime', comment: '最后登录时间' })
  loginDate: Date

  @Column({ length: 255, comment: '备注' })
  remark: string
}
