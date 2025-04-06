import { Rule, RuleType } from '@midwayjs/validate'
import { BizError } from '../../common/core/error'

export class TenantDTO {
  @Rule(RuleType.number().optional())
  id?: number

  @Rule(RuleType.string().required().error(new BizError('请输入联系人姓名')))
  contactName: string

  @Rule(RuleType.string().required().error(new BizError('请输入联系人手机号')))
  contactPhone: string

  @Rule(RuleType.string().required().error(new BizError('请输入公司名称')))
  companyName: string

  @Rule(RuleType.string().optional().empty(null))
  licenseNumber: string

  @Rule(RuleType.string().optional().empty(null))
  address: string

  @Rule(RuleType.string().optional().empty(null))
  domain: string

  @Rule(RuleType.string().optional().empty(null))
  remark: string

  @Rule(RuleType.number().optional().empty(null))
  userCount: number

  @Rule(RuleType.date().optional().empty(null))
  trialStartDate: Date

  @Rule(RuleType.date().optional().empty(null))
  trialEndDate: Date

  @Rule(RuleType.date().optional().empty(null))
  startDate: Date

  @Rule(RuleType.date().optional().empty(null))
  endDate: Date

  @Rule(RuleType.number().optional().empty(null))
  status: number

  @Rule(RuleType.number().optional().empty(null))
  isPremium: number
}
