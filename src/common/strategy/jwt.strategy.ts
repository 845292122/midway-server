import { CustomStrategy, PassportStrategy } from '@midwayjs/passport'
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt'
import { Config } from '@midwayjs/core'

@CustomStrategy()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  @Config('jwt')
  jwtConfig

  async validate(payload) {
    // TODO jwt验证
    return payload
  }

  getStrategyOptions(): StrategyOptions {
    return {
      secretOrKey: this.jwtConfig.secret,
      passReqToCallback: true,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }
  }
}
