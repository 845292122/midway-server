import { Provide } from '@midwayjs/core'
import { IPage } from '../../common/core/interface'
import { convertPageParam } from '../../common/utils'
import { UserDTO } from '../dto/user.dto'
import { BizError } from '../../common/core/error'
import { prisma } from '../../prisma'
import { Prisma } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import { Constant } from '../../common/core/constant'

@Provide()
export class UserService {
  // * 查询用户分页
  async queryUserPage({ page, pageSize }: IPage, nickname: string, status: number): Promise<IPage<UserDTO>> {
    const condition: Prisma.UserWhereInput = {
      delFlag: 0,
      nickname: nickname ? { startsWith: nickname } : undefined,
      status: status !== undefined ? Number(status) : undefined
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
    return await prisma.user.findUnique({
      where: { id, delFlag: 0 },
      select: {
        id: true,
        tenantID: true,
        nickname: true,
        email: true,
        dataScope: true,
        phone: true,
        status: true,
        isMaster: true,
        isPlatformAdmin: true
      }
    })
  }

  // * 创建用户
  async createUser(user: UserDTO) {
    user.password = await bcrypt.hash(Constant.Auth.INIT_PWD, Constant.Auth.SALT_ROUNDS)
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

  async verifyUserCount(tenantID: number) {
    const tenantInfo = await prisma.tenant.findUnique({
      where: {
        id: tenantID,
        delFlag: 0,
        status: {
          in: [1, 3]
        }
      }
    })
    if (!tenantInfo) throw new BizError('租户不存在或已失效')

    const existUserCount = await prisma.user.count({
      where: {
        tenantID,
        delFlag: 0
      }
    })

    if (existUserCount >= tenantInfo.userCount) throw new BizError('租户用户数量已达上限')
  }
}
