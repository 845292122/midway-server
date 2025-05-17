import { Post, Controller, Inject, Get, Body, Logger, ILogger } from '@midwayjs/core'
import { Context } from '@midwayjs/koa'
import { AuthService } from './auth.service'
import { AccountService } from '../account/account.service'
import { LoginInfo } from './auth.schema'

@Controller('/auth')
export class AuthController {
  @Inject()
  ctx: Context

  @Logger()
  logger: ILogger

  @Inject()
  authService: AuthService

  @Inject()
  accountService: AccountService

  @Post('/login', { summary: '登录' })
  async login(@Body() loginInfo: LoginInfo) {
    return await this.authService.generateToken(loginInfo)
  }

  @Get('/info')
  async getAuthInfo() {
    const { id } = this.ctx.state.user
    const accountInfo = await this.accountService.queryAccountInfo(id)
    return accountInfo
  }
}
