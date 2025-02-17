import { IMiddleware, Middleware } from '@midwayjs/core';
import { Context, NextFunction } from '@midwayjs/koa';

/**
 * 统一返回结果中间件
 */
@Middleware()
export class ResultMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      const result = await next();
      if (result === null) {
        ctx.status = 200;
      }
      return {
        code: 200,
        data: result,
      };
    };
  }
}
