import { Rule, RuleType } from '@midwayjs/validate'

// * 登录信息
export class LoginInfo {
  @Rule(RuleType.string().required().error(new Error('手机号不能为空')))
  phone: string
  @Rule(RuleType.string().required().error(new Error('密码不能为空')))
  password: string
}
