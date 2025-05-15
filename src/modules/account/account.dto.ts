import { Rule, RuleType } from '@midwayjs/validate'
import { BizError } from '../../common/core/error'

// 账户实体
export class AccountDTO {
  @Rule(RuleType.number().optional().empty(null))
  id?: number

  @Rule(RuleType.string().required().error(new BizError('手机号不能为空')))
  phone?: string

  @Rule(RuleType.string().optional().empty(null))
  password?: string

  @Rule(RuleType.string().optional().empty(null))
  contact?: string

  @Rule(RuleType.string().optional().empty(null))
  storeName?: string

  @Rule(RuleType.string().optional().empty(null))
  licenseNumber?: string

  @Rule(RuleType.string().optional().empty(null))
  address?: string

  @Rule(RuleType.string().optional().empty(null))
  domain?: string

  @Rule(RuleType.number().default(0))
  isPlatformAdmin?: number

  @Rule(RuleType.string().optional().empty(null))
  email?: string

  @Rule(RuleType.number().default(0))
  status?: number

  @Rule(RuleType.date().optional().empty(null))
  trialStartDate?: Date

  @Rule(RuleType.date().optional().empty(null))
  trialEndDate?: Date

  @Rule(RuleType.date().optional().empty(null))
  startDate?: Date

  @Rule(RuleType.date().optional().empty(null))
  endDate?: Date

  @Rule(RuleType.string().optional().empty(null))
  loginIP?: string

  @Rule(RuleType.date().optional().empty(null))
  loginDate?: Date

  @Rule(RuleType.string().optional().empty(null))
  remark?: string

  @Rule(RuleType.number().default(0))
  isPremium?: number

  @Rule(RuleType.date().optional().empty(null))
  createdAt?: Date

  @Rule(RuleType.date().optional().empty(null))
  updatedAt?: Date
}
