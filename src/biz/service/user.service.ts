import { Provide } from '@midwayjs/core'
import { IPage } from '../../common/core/interface'
import { convertPageParam } from '../../common/utils'
import { UserDTO } from '../dto/user.dto'
import { BizError } from '../../common/core/error'
import { prisma } from '../../prisma'
import { Prisma } from '@prisma/client'

@Provide()
export class UserService {
  // * 查询用户分页
  async queryUserPage(
    { page, pageSize }: IPage,
    username: string,
    nickname: string,
    status: number
  ): Promise<IPage<UserDTO>> {
    const condition: Prisma.UserWhereInput = {
      delFlag: 0,
      username: username ? { startsWith: username } : undefined,
      nickname: nickname ? { startsWith: nickname } : undefined,
      status
    }

    const [total, records] = await Promise.all([
      prisma.user.count({
        where: condition
      }),
      prisma.user.findMany({
        where: condition,
        ...convertPageParam(page, pageSize)
      })
    ])

    return {
      page,
      pageSize,
      total,
      records
    }
  }

  // * 查询用户详情
  async queryUserInfo(id: number): Promise<UserDTO> {
    return await prisma.user.findUnique({ where: { id, delFlag: 0 } })
  }

  // * 创建用户
  async createUser(user: UserDTO) {
    return await prisma.user.create({ data: user })
  }

  // * 更新用户
  async modifyUser(user: UserDTO) {
    return await prisma.user.update({
      where: { id: user.id, delFlag: 0 },
      data: user
    })
  }

  // * 删除账户
  async removeUser(id: number) {
    return await prisma.user.update({
      where: { id, delFlag: 0 },
      data: { delFlag: 1 }
    })
  }

  // * 验证手机号是否唯一
  async verifyPhoneUnique(user: UserDTO) {
    const condition: Prisma.UserWhereInput = {
      phone: user.phone,
      delFlag: 0
    }

    if (user.id) {
      condition.id = {
        not: user.id
      }
    }

    const res = await prisma.user.findFirst({
      where: condition
    })

    if (res) throw new BizError('用户名已经存在')
  }

  // * 验证用户名是否唯一
  async verifyNameNameUnique(user: UserDTO) {
    const condition: Prisma.UserWhereInput = {
      username: user.username,
      delFlag: 0
    }

    if (user.id) {
      condition.id = {
        not: user.id
      }
    }

    const res = await prisma.user.findFirst({
      where: condition
    })

    if (res) throw new BizError('用户名已经存在')
  }
}
