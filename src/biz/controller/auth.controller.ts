import { Post, Controller, Inject, Get } from '@midwayjs/core'
import { LocalPassportMiddleware } from '../../common/middleware/local.middleware'
import { Context } from '@midwayjs/koa'
import { AuthService } from '../service/auth.service'
import { JwtPassportMiddleware } from '../../common/middleware/jwt.middleware'
import { UserService } from '../service/user.service'

@Controller('/auth')
export class AuthController {
  @Inject()
  ctx: Context

  @Inject()
  authService: AuthService

  @Inject()
  userService: UserService

  @Post('/login', { middleware: [LocalPassportMiddleware] })
  async login() {
    return await this.authService.generateToken(this.ctx.state.user)
  }

  @Get('/info', { middleware: [JwtPassportMiddleware] })
  async getAuthInfo() {
    const { id } = this.ctx.state.user
    const userInfo = await this.userService.queryUserInfo(id)
    return userInfo
  }
}
