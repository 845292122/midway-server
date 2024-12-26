import { Catch, HttpStatus } from '@midwayjs/core';
import {
  ForbiddenError,
  UnauthorizedError,
} from '@midwayjs/core/dist/error/http';
import { Context } from '@midwayjs/koa';

@Catch()
export class DefaultErrorFilter {
  async catch(err: Error, ctx: Context) {
    // 所有的未分类错误会到这里
    ctx.logger.warn('系统异常: ' + err.message);
    let errCode: number = HttpStatus.INTERNAL_SERVER_ERROR;
    if (err instanceof UnauthorizedError) {
      errCode = err.status;
    }
    if (err instanceof ForbiddenError) {
      errCode = err.status;
    }
    return {
      code: errCode,
      msg: err.message,
    };
  }
}
