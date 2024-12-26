import { HttpStatus, MidwayHttpError } from '@midwayjs/core'

/**
 * 业务异常
 */
export class BizError extends MidwayHttpError {
  constructor(msg: string) {
    super(msg, HttpStatus.BAD_REQUEST)
  }
}
