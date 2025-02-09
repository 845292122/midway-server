import { Inject, Middleware, httpError } from '@midwayjs/core';
import { JwtService } from '@midwayjs/jwt';
import { Context, NextFunction } from '@midwayjs/koa';

@Middleware()
export class JwtMiddleware {
  @Inject()
  ctx: Context;

  @Inject()
  jwtService: JwtService;

  public static getName(): string {
    return 'jwt';
  }

  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      if (!ctx.headers['authorization']) {
        throw new httpError.UnauthorizedError();
      }
      const token = ctx.get('authorization').trim();
      try {
        //jwt.verify方法验证token是否有效
        await this.jwtService.verify(token, {
          complete: true,
        });
        const { aid, isa, jwtIp }: any = this.jwtService.decodeSync(token);
        ctx.state.authInfo = { aid, isa, jwtIp };
        const reqIp = ctx.request.ip;
        if (reqIp !== jwtIp) {
          ctx.logger.info('请求ip!=jwtIp');
          throw new httpError.UnauthorizedError();
        }
      } catch (error) {
        ctx.logger.info('token过期: ', error);
        throw new httpError.UnauthorizedError();
      }
      await next();
    };
  }

  // 配置忽略鉴权的路由地址
  public match(ctx: Context): boolean {
    const ignore = ctx.path.indexOf('/auth/login') !== -1;
    return !ignore;
  }
}
