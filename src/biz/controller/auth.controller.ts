import { Post, Controller, Inject, Get } from '@midwayjs/core'
import { LocalPassportMiddleware } from '../../common/middleware/local.middleware'
import { Context } from '@midwayjs/koa'
import { AuthService } from '../service/auth.service'
import { JwtPassportMiddleware } from '../../common/middleware/jwt.middleware'
import { UserService } from '../service/user.service'
import { PermService } from '../service/perm.service'
import { Constant } from '../../common/core/constant'

@Controller('/auth')
export class AuthController {
  @Inject()
  ctx: Context

  @Inject()
  authService: AuthService

  @Inject()
  userService: UserService

  @Inject()
  permService: PermService

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

  @Get('/permission', { middleware: [JwtPassportMiddleware] })
  async getAuthPermission() {
    const { id } = this.ctx.state.user
    return await this.permService.getPerms(id, Constant.Perm.OWNER_TYPE.USER)
  }
}
