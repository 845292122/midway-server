import { Provide } from '@midwayjs/core'
import { IPage } from '../../common/interface'
import { Prisma } from '@prisma/client'
import { prisma } from '../../common/prisma'
import { RoleDTO } from './role.dto'
import { BizError } from '../../common/error'

@Provide()
export class RoleService {
  /**
   * 分页查询角色
   * @param query 分页信息
   * @param name 角色名称
   * @returns
   */
  async selectRolePage(query: IPage, name: string): Promise<IPage> {
    const condition: Prisma.RoleWhereInput = {
      delFlag: 0
    }
    if (name) {
      condition.name = {
        startsWith: name
      }
    }

    const skipVal: number = (query.pageNo - 1) * query.pageSize
    const takeVal: number = query.pageSize
    const records = await prisma.role.findMany({
      where: condition,
      skip: skipVal,
      take: takeVal
    })

    const count = await prisma.role.count({
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
   * 查询角色信息
   * @param roleId 角色ID
   * @returns
   */
  async selectRoleInfo(roleId: number): Promise<RoleDTO> {
    return await prisma.role.findUnique({
      where: {
        id: roleId,
        delFlag: 0
      }
    })
  }

  /**
   * 插入角色信息
   * @param roleDTO 角色信息
   */
  async createRole(roleDTO: RoleDTO): Promise<void> {
    await prisma.role.create({
      data: roleDTO
    })
  }

  /**
   * 更新角色信息
   * @param roleDTO 角色信息
   */
  async updateRole(roleDTO: RoleDTO): Promise<void> {
    await prisma.role.update({
      where: {
        id: roleDTO.id,
        delFlag: 0
      },
      data: roleDTO
    })
  }

  /**
   * 删除角色
   * @param roleId 角色ID
   */
  async deleteRole(roleId: number): Promise<void> {
    await prisma.role.update({
      where: {
        id: roleId,
        delFlag: 0
      },
      data: {
        delFlag: 1
      }
    })
  }

  /**
   * 验证角色名称是否唯一
   * @param roleDTO 角色信息
   */
  async verifyNameUnique(roleDTO: RoleDTO): Promise<void> {
    const condition: Prisma.RoleWhereInput = {
      name: roleDTO.name,
      delFlag: 0
    }

    if (roleDTO.id) {
      condition.id = {
        not: roleDTO.id
      }
    }

    const res = await prisma.role.findFirst({
      where: condition
    })

    if (res) throw new BizError('角色名称已经存在')
  }
}
