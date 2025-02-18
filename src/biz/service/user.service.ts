import { Provide } from '@midwayjs/core'
import { InjectEntityModel } from '@midwayjs/typeorm'
import { UserEntity } from '../entity/user.entity'
import { Like, Repository } from 'typeorm'
import { IPage } from '../../common/core/interface'
import { convertPageParam } from '../../common/utils'
import { UserDTO } from '../dto/user.dto'
import { BizError } from '../../common/core/error'

@Provide()
export class UserService {
  @InjectEntityModel(UserEntity)
  userModel: Repository<UserEntity>

  // * 查询用户分页
  async queryUserPage(
    pageParam: IPage,
    username: string,
    nickname: string,
    status: number
  ): Promise<IPage<UserEntity>> {
    const { pageNo, pageSize } = pageParam
    const pageObj = convertPageParam(pageNo, pageSize)

    const [records, total] = await this.userModel.findAndCount({
      where: {
        username: username ? Like(`%${username}%`) : undefined,
        nickname: nickname ? Like(`%${nickname}%`) : undefined,
        status
      },
      ...pageObj
    })

    return {
      ...pageParam,
      total,
      records
    }
  }

  // * 查询用户详情
  async queryUserInfo(id: number): Promise<UserDTO> {
    return await this.userModel.findOneBy({ id })
  }

  // * 创建用户
  async createUser(user: UserDTO) {
    await this.userModel.insert(user)
  }

  // * 更新用户
  async modifyUser(user: UserDTO) {
    await this.userModel.update(user.id, user)
  }

  // * 删除账户
  async removeUser(id: number) {
    await this.userModel.softDelete(id)
  }

  // * 验证手机号是否唯一
  async verifyPhoneUnique(user: UserDTO) {
    const exist = await this.userModel.exists({
      where: {
        phone: user.phone,
        id: user.id ?? undefined
      }
    })
    if (exist) throw new BizError('手机号已存在')
  }
}
