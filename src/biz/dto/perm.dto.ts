import { Rule, RuleType } from '@midwayjs/validate'
import { BizError } from '../../common/core/error'

export class PermDTO {
  @Rule(RuleType.number().optional())
  id?: number

  @Rule(RuleType.number().optional())
  ownerId: number

  @Rule(RuleType.number().required().error(new BizError('ownerType不能为空')))
  ownerType?: number

  @Rule(RuleType.array().items(RuleType.string()).required().error(new BizError('perm不能为空')))
  perm: string[]
}
