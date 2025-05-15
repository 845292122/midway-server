import { CustomStrategy, PassportStrategy } from '@midwayjs/passport'
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt'
import { Config } from '@midwayjs/core'
import { UnauthorizedError } from '../core/error'

@CustomStrategy()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  @Config('jwt')
  jwtConfig

  async validate(req, payload) {
    const { ip } = payload
    if (ip !== req.ip) {
      throw new UnauthorizedError('无效的Token')
    }
    return payload
  }

  getStrategyOptions(): StrategyOptions {
    return {
      secretOrKey: this.jwtConfig.secret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true
    }
  }
}
