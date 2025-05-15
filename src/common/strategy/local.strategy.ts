import { CustomStrategy, PassportStrategy } from '@midwayjs/passport'
import { Strategy, IStrategyOptions } from 'passport-local'
import * as bcrypt from 'bcrypt'
import { prisma } from '../../prisma'
import { ILogger } from '@midwayjs/logger'
import { Logger } from '@midwayjs/core'

@CustomStrategy()
export class LocalStrategy extends PassportStrategy(Strategy) {
  @Logger()
  logger: ILogger

  // 策略的验证
  async validate(phone, password) {
    const account = await prisma.account.findFirst({ where: { delFlag: 0, phone } })

    if (!account) {
      this.logger.warn('账号不存在')
      throw new Error('账号或密码不正确' + phone)
    }
    if (!(await bcrypt.compare(password, account.password))) {
      this.logger.warn('密码不正确')
      throw new Error('账号或密码不正确')
    }
    if (account.status === 0) {
      this.logger.warn('用户被禁用 ' + account.phone)
      throw new Error('用户被禁用 ' + account.phone)
    }

    return {
      id: account.id
    }
  }

  // 当前策略的构造器参数
  getStrategyOptions(): IStrategyOptions {
    return {
      usernameField: 'phone',
      passwordField: 'password',
      passReqToCallback: false,
      session: false
    }
  }
}
