import { Post, Controller, Inject } from '@midwayjs/core'
import { LocalPassportMiddleware } from '../middleware/local.middleware'
import { Context } from '@midwayjs/koa' // 引入 Context 类型

@Controller('/')
export class AuthController {
  @Inject()
  ctx: Context // 注入 Context 实例

  @Post('/passport/local', { middleware: [LocalPassportMiddleware] })
  async localPassport() {
    // TODO 根据实际业务处理，例如生成token并返回
    console.log('local user: ', this.ctx.state.user)
    return this.ctx.state.user
  }
}
