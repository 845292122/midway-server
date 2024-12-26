import { Guard, IGuard, Inject } from '@midwayjs/core';
import { JwtService } from '@midwayjs/jwt';
import { Context } from '@midwayjs/koa';

@Guard()
export class AdminGuard implements IGuard<Context> {
  @Inject()
  jwtService: JwtService;

  /**
   * canActivate 方法用于在请求中验证是否可以访问后续的方法，当返回 true 时，后续的方法会被执行，当 canActivate 返回 false 时，会抛出 403 错误码。
   * @param context Context
   * @param supplierClz
   * @param methodName
   */
  async canActivate(
    context: Context,
    supplierClz,
    methodName: string
  ): Promise<boolean> {
    const authInfo = context.state?.authInfo;
    return authInfo?.isa === 1;
  }
}
