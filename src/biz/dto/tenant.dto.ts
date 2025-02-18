import { Rule, RuleType } from '@midwayjs/validate'
import { BizError } from '../../common/core/error'

export class TenantDTO {
  id: number
  @Rule(RuleType.string().required().error(new BizError('联系人名称不能为空')))
  contactName: string
  @Rule(RuleType.string().required().error(new BizError('联系人电话不能为空')))
  contactPhone: string
  @Rule(RuleType.string().required().error(new BizError('企业名称不能为空')))
  companyName: string
  licenseNumber: string
  address: string
  intro: string
  domain: string
  remark: string
  userCount: number
  trialStartDate: Date
  trialEndDate: Date
  startDate: Date
  endDate: Date
  status: number
  isPremium: boolean
}
