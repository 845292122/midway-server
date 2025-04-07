import { Rule, RuleType } from '@midwayjs/validate'
import { BizError } from '../../common/core/error'

export class UserDTO {
  @Rule(RuleType.number().optional().empty(null))
  id: number

  @Rule(RuleType.number().required().error(new BizError('租户ID不能为空')))
  tenantID?: number

  @Rule(RuleType.string().optional().empty(null))
  password?: string

  @Rule(RuleType.string().required().error(new BizError('手机号不能为空')))
  phone: string

  @Rule(RuleType.string().required().error(new BizError('昵称不能为空')))
  nickname: string

  @Rule(RuleType.number().optional().empty(null))
  isPlatformAdmin?: number

  @Rule(RuleType.number().optional().empty(null))
  isMaster?: number

  @Rule(RuleType.number().optional().empty(null))
  dataScope?: number

  @Rule(RuleType.string().optional().empty(null))
  email?: string

  @Rule(RuleType.string().optional().empty(null))
  avatar?: string

  @Rule(RuleType.number().optional().empty(null))
  status?: number

  @Rule(RuleType.string().optional().empty(null))
  loginIp?: string

  @Rule(RuleType.date().optional().empty(null))
  loginDate?: Date

  @Rule(RuleType.string().optional().empty(null))
  remark?: string
}
