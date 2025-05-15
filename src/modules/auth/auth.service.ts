import { Config, Inject, Provide } from '@midwayjs/core'
import { JwtService } from '@midwayjs/jwt'
import { Context } from '@midwayjs/koa'
import { AccountDTO } from '../account/account.dto'

@Provide()
export class AuthService {
  @Config('jwt')
  jwtConfig

  @Inject()
  jwtService: JwtService

  @Inject()
  ctx: Context

  async generateToken(user: AccountDTO): Promise<string> {
    const payload = {
      id: user.id,
      ip: this.ctx.request.ip
    }
    return await this.jwtService.sign(payload, this.jwtConfig.secret)
  }
}
