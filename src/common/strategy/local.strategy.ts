import { CustomStrategy, PassportStrategy } from '@midwayjs/passport'
import { Strategy, IStrategyOptions } from 'passport-local'
import { Repository } from 'typeorm'
import { InjectEntityModel } from '@midwayjs/typeorm'
import { Account } from '../../biz/entity/account.entity'
import * as bcrypt from 'bcrypt'

@CustomStrategy()
export class LocalStrategy extends PassportStrategy(Strategy) {
  @InjectEntityModel(Account)
  accountModel: Repository<Account>

  // 策略的验证
  async validate(username, password) {
    const user = await this.accountModel.findOneBy({ phone: username })
    if (!user) {
      throw new Error('用户不存在 ' + username)
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new Error('密码错误 ' + username)
    }

    return user
  }

  // 当前策略的构造器参数
  getStrategyOptions(): IStrategyOptions {
    return {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: false,
      session: false
    }
  }
}
