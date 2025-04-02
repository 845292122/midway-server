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
  @Rule(RuleType.string().optional())
  licenseNumber: string
  @Rule(RuleType.string().optional())
  address: string
  @Rule(RuleType.string().optional())
  domain: string
  @Rule(RuleType.string().optional())
  remark: string
  @Rule(RuleType.number().optional())
  userCount: number
  @Rule(RuleType.date().optional())
  trialStartDate: Date
  @Rule(RuleType.date().optional())
  trialEndDate: Date
  @Rule(RuleType.date().optional())
  startDate: Date
  @Rule(RuleType.date().optional())
  endDate: Date
  @Rule(RuleType.number().optional())
  status: number
  @Rule(RuleType.number().optional())
  isPremium: number
}
