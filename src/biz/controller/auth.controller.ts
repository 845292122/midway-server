import { Post, Controller, Inject } from '@midwayjs/core'
import { LocalPassportMiddleware } from '../../common/middleware/local.middleware'
import { Context } from '@midwayjs/koa'

@Controller('/auth')
export class AuthController {
  @Inject()
  ctx: Context

  @Post('/login', { middleware: [LocalPassportMiddleware] })
  async localPassport() {
    // TODO 根据实际业务处理，例如生成token并返回
    console.log('local user: ', this.ctx.state.user)
    return this.ctx.state.user
  }
}
