import { Rule, RuleType } from '@midwayjs/validate'
import { BizError } from '../../common/core/error'

export class UserDTO {
  id?: number

  tenantID: number

  @Rule(RuleType.string().required().error(new BizError('用户名不能为空')))
  username: string
  password: string

  @Rule(RuleType.string().required().error(new BizError('昵称不能为空')))
  nickname: string
  isPlatformAdmin?: number
  isMaster?: number
  dataScope?: number
  email?: string
  phone?: string
  avatar?: string
  status?: number
  loginIp?: string
  loginDate?: Date
  remark?: string
}
