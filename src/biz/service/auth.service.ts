import { Config, Inject, Provide } from '@midwayjs/core'
import { UserDTO } from '../dto/user.dto'
import { JwtService } from '@midwayjs/jwt'
import { Context } from '@midwayjs/koa'

@Provide()
export class AuthService {
  @Config('jwt')
  jwtConfig

  @Inject()
  jwtService: JwtService

  @Inject()
  ctx: Context

  async generateToken(user: UserDTO): Promise<string> {
    const payload = {
      id: user.id,
      ip: this.ctx.request.ip
    }
    return await this.jwtService.sign(payload, this.jwtConfig.secret)
  }
}
