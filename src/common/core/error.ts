import { HttpStatus, MidwayHttpError } from '@midwayjs/core'

/**
 * 业务异常
 */
export class BizError extends MidwayHttpError {
  constructor(msg: string) {
    super(msg, HttpStatus.BAD_REQUEST)
  }
}

export class UnauthorizedError extends MidwayHttpError {
  constructor(msg: string) {
    super(msg, HttpStatus.UNAUTHORIZED)
  }
}

export class ForbiddenError extends MidwayHttpError {
  constructor(msg: string) {
    super(msg, HttpStatus.FORBIDDEN)
  }
}
