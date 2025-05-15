import { Post, Controller, Inject, Get } from '@midwayjs/core'
import { LocalPassportMiddleware } from '../../common/middleware/local.middleware'
import { Context } from '@midwayjs/koa'
import { AuthService } from './auth.service'
import { JwtPassportMiddleware } from '../../common/middleware/jwt.middleware'
import { AccountService } from '../account/account.service'

@Controller('/auth')
export class AuthController {
  @Inject()
  ctx: Context

  @Inject()
  authService: AuthService

  @Inject()
  accountService: AccountService

  @Post('/login', { middleware: [LocalPassportMiddleware] })
  async login() {
    return await this.authService.generateToken(this.ctx.state.user)
  }

  @Get('/info', { middleware: [JwtPassportMiddleware] })
  async getAuthInfo() {
    const { id } = this.ctx.state.user
    const accountInfo = await this.accountService.queryAccountInfo(id)
    return accountInfo
  }
}
