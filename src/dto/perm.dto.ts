import { Rule, RuleType } from '@midwayjs/validate'
import { BizError } from '../common/error'

export class PermDTO {
  id: number
  pId: number

  @Rule(RuleType.string().required().error(new BizError('权限key不能为空')))
  key: string

  @Rule(RuleType.string().required().error(new BizError('权限描述不能为空')))
  description: string
  status: number
  createdAt: Date
  updatedAt: Date
}
