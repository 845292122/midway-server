import { CustomStrategy, PassportStrategy } from '@midwayjs/passport'
import { Strategy, IStrategyOptions } from 'passport-local'
import { Repository } from 'typeorm'
import { InjectEntityModel } from '@midwayjs/typeorm'
import * as bcrypt from 'bcrypt'
import { UserEntity } from '../../biz/entity/user.entity'

@CustomStrategy()
export class LocalStrategy extends PassportStrategy(Strategy) {
  @InjectEntityModel(UserEntity)
  userModel: Repository<UserEntity>

  // 策略的验证
  async validate(username, password) {
    const user = await this.userModel.findOneBy({ username })
    if (!user) {
      throw new Error('用户不存在 ' + username)
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new Error('密码错误 ' + username)
    }

    return user
  }

  // 当前策略的构造器参数
  getStrategyOptions(): IStrategyOptions {
    return {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: false,
      session: false
    }
  }
}
