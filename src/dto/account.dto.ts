import { Rule, RuleType } from '@midwayjs/validate'
import { BizError } from '../common/error'

export class AccountDTO {
  id: number

  @Rule(RuleType.string().required().error(new BizError('联系人不能为空')))
  contact: string

  @Rule(RuleType.string().required().error(new BizError('手机号不能为空')))
  phone: string
  password: string
  licenseNumber: string
  address: string
  bizType: number
  remark: string
  isAdmin: boolean
  trialStartDate: Date
  trialEndDate: Date
  startDate: Date
  endDate: Date
  status: number
  createdAt: Date
  updatedAt: Date
}
