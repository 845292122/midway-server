import { Provide } from '@midwayjs/core'
import { IPage } from '../../common/interface'
import { Prisma } from '@prisma/client'
import { prisma } from '../../common/prisma'
import { UserDTO } from './user.dto'
import { BizError } from '../../common/error'

@Provide()
export class UserService {
  /**
   * 分页查询用户
   * @param query 分页信息
   * @param username 用户名
   * @returns
   */
  async selectUserPage(query: IPage, name: string): Promise<IPage> {
    const condition: Prisma.UserWhereInput = {
      delFlag: 0
    }
    if (name) {
      condition.name = {
        startsWith: name
      }
    }

    const skipVal: number = (query.pageNo - 1) * query.pageSize
    const takeVal: number = query.pageSize
    const records = await prisma.user.findMany({
      where: condition,
      skip: skipVal,
      take: takeVal
    })

    const count = await prisma.user.count({
      where: condition
    })

    return {
      records,
      total: count,
      pageNo: query.pageNo,
      pageSize: query.pageSize
    }
  }

  /**
   * 查询用户信息
   * @param userId 用户ID
   * @returns
   */
  async selectUserInfo(userId: number): Promise<UserDTO> {
    return await prisma.user.findUnique({
      where: {
        id: userId,
        delFlag: 0
      }
    })
  }

  /**
   * 插入用户信息
   * @param userDTO 用户信息
   */
  async createUser(userDTO: UserDTO): Promise<void> {
    await prisma.user.create({
      data: userDTO
    })
  }

  /**
   * 更新用户信息
   * @param userDTO 用户信息
   */
  async updateUser(userDTO: UserDTO): Promise<void> {
    await prisma.user.update({
      where: {
        id: userDTO.id,
        delFlag: 0
      },
      data: userDTO
    })
  }

  /**
   * 删除用户
   * @param userId 用户ID
   */
  async deleteUser(userId: number): Promise<void> {
    await prisma.user.update({
      where: {
        id: userId,
        delFlag: 0
      },
      data: {
        delFlag: 1
      }
    })
  }

  /**
   * 验证用户名是否唯一
   * @param userDTO 用户信息
   */
  async verifyNameUnique(userDTO: UserDTO): Promise<void> {
    const condition: Prisma.UserWhereInput = {
      name: userDTO.name,
      delFlag: 0
    }

    if (userDTO.id) {
      condition.id = {
        not: userDTO.id
      }
    }

    const res = await prisma.user.findFirst({
      where: condition
    })

    if (res) throw new BizError('用户名已经存在')
  }

  /**
   * 验证租户手机号是否唯一
   * @param tenantDTO 租户信息
   */
  async verifyPhoneUnique(userDTO: UserDTO): Promise<void> {
    const condition: Prisma.TenantWhereInput = {
      phone: userDTO.phone,
      delFlag: 0
    }

    if (userDTO.id) {
      condition.id = {
        not: userDTO.id
      }
    }

    const res = await prisma.tenant.findFirst({
      where: condition
    })

    if (res) throw new BizError('手机号已经存在')
  }
}
