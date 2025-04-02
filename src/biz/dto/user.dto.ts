import { Rule, RuleType } from '@midwayjs/validate'
import { BizError } from '../../common/core/error'

export class UserDTO {
  @Rule(RuleType.number().optional())
  id?: number

  @Rule(RuleType.number().required().error(new BizError('租户ID不能为空')))
  tenantID: number

  @Rule(RuleType.string().optional())
  password: string

  @Rule(RuleType.string().required().error(new BizError('手机号不能为空')))
  phone: string

  @Rule(RuleType.string().required().error(new BizError('昵称不能为空')))
  nickname: string

  @Rule(RuleType.number().optional())
  isPlatformAdmin?: number

  @Rule(RuleType.number().optional())
  isMaster?: number

  @Rule(RuleType.number().optional())
  dataScope?: number

  @Rule(RuleType.string().optional())
  email?: string

  @Rule(RuleType.string().optional())
  avatar?: string

  @Rule(RuleType.number().optional())
  status?: number

  @Rule(RuleType.string().optional())
  loginIp?: string

  @Rule(RuleType.date().optional())
  loginDate?: Date

  @Rule(RuleType.string().optional())
  remark?: string
}
