import { Config, ILogger, Inject, Logger, Provide } from '@midwayjs/core'
import { JwtService } from '@midwayjs/jwt'
import { Context } from '@midwayjs/koa'
import { LoginInfo } from './auth.schema'
import { prisma } from '../../prisma'
import * as bcrypt from 'bcrypt'

@Provide()
export class AuthService {
  @Config('jwt')
  jwtConfig

  @Inject()
  jwtService: JwtService

  @Inject()
  ctx: Context

  @Logger()
  logger: ILogger

  async generateToken(loginInfo: LoginInfo): Promise<string> {
    const { phone, password } = loginInfo

    const account = await prisma.account.findFirst({ where: { delFlag: 0, phone } })

    if (!account) {
      this.logger.warn('账户不存在:' + phone)
      throw new Error('账号或密码不正确')
    }

    if (account.status === 0) {
      this.logger.warn('账户被禁用:' + account.phone)
      throw new Error('账户被禁用')
    }

    if (!(await bcrypt.compare(password, account.password))) {
      this.logger.warn('密码不正确:' + phone)
      throw new Error('账号或密码不正确')
    }

    const payload = {
      id: account.id,
      ip: this.ctx.request.ip,
      isAdmin: account.isPlatformAdmin
    }
    return await this.jwtService.sign(payload, this.jwtConfig.secret)
  }
}
