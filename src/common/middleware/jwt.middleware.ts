import { ILogger, Inject, Logger, Middleware, httpError } from '@midwayjs/core'
import { Context, NextFunction } from '@midwayjs/koa'
import { JwtService } from '@midwayjs/jwt'

@Middleware()
export class JwtMiddleware {
  @Inject()
  jwtService: JwtService

  @Logger()
  logger: ILogger

  public static getName(): string {
    return 'jwt'
  }

  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      // 判断下有没有校验信息
      if (!ctx.headers['authorization']) {
        throw new httpError.UnauthorizedError()
      }
      // 从 header 上获取校验信息
      const parts = ctx.get('authorization').trim().split(' ')

      if (parts.length !== 2) {
        throw new httpError.UnauthorizedError()
      }

      const [scheme, token] = parts

      if (/^Bearer$/i.test(scheme)) {
        try {
          //jwt.verify方法验证token是否有效
          const payload = await this.jwtService.verify(token)

          // 判断 payload 是否为对象且包含 ip 属性
          if (typeof payload === 'object' && payload !== null && 'ip' in payload) {
            if (!payload.ip || payload.ip !== ctx.ip) {
              this.logger.info('token 验证失败')
              throw new httpError.UnauthorizedError()
            }
          } else {
            this.logger.info('token 验证失败')
            throw new httpError.UnauthorizedError()
          }

          // 挂载载荷信息
          ctx.state.user = payload
        } catch (error) {
          this.logger.info('token 验证失败')
          throw new httpError.UnauthorizedError()
        }
        await next()
      }
    }
  }

  // 配置忽略鉴权的路由地址
  public match(ctx: Context): boolean {
    const ignore = ctx.path.indexOf('/auth/login') !== -1
    return !ignore
  }
}
