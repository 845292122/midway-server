import { CustomStrategy, PassportStrategy } from '@midwayjs/passport'
import { Strategy, IStrategyOptions } from 'passport-local'
import * as bcrypt from 'bcrypt'
import { prisma } from '../../prisma'

@CustomStrategy()
export class LocalStrategy extends PassportStrategy(Strategy) {
  // 策略的验证
  async validate(username, password) {
    const user = await prisma.user.findFirst({ where: { delFlag: 0, username } })
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
