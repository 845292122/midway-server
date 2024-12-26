import { Catch, MidwayHttpError } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { BizError } from '../error/biz.error';

@Catch(BizError)
export class BizErrorFilter {
  async catch(err: MidwayHttpError, ctx: Context) {
    ctx.logger.info('业务请求异常: ' + err.message);
    return {
      code: err.status,
      msg: err.message,
    };
  }
}
