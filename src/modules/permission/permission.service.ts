import { Provide } from '@midwayjs/core'
import { IPage } from '../../common/interface'
import { Prisma } from '@prisma/client'
import { prisma } from '../../common/prisma'
import { PermissionDTO } from './permission.dto'
import { BizError } from '../../common/error'

@Provide()
export class PermissionService {
  /**
   * 分页查询权限
   * @param query 分页信息
   * @param name 权限名称
   * @returns
   */
  async selectPermissionPage(query: IPage, permission: string): Promise<IPage> {
    const condition: Prisma.PermissionWhereInput = {
      delFlag: 0
    }
    if (permission) {
      condition.permission = {
        startsWith: permission
      }
    }

    const skipVal: number = (query.pageNo - 1) * query.pageSize
    const takeVal: number = query.pageSize
    const records = await prisma.permission.findMany({
      where: condition,
      skip: skipVal,
      take: takeVal
    })

    const count = await prisma.permission.count({
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
   * 查询权限信息
   * @param permissionId 权限ID
   * @returns
   */
  async selectPermissionInfo(permissionId: number): Promise<PermissionDTO> {
    return await prisma.permission.findUnique({
      where: {
        id: permissionId,
        delFlag: 0
      }
    })
  }

  /**
   * 插入权限信息
   * @param permissionDTO 权限信息
   */
  async createPermission(permissionDTO: PermissionDTO): Promise<void> {
    await prisma.permission.create({
      data: permissionDTO
    })
  }

  /**
   * 更新权限信息
   * @param permissionDTO 权限信息
   */
  async updatePermission(permissionDTO: PermissionDTO): Promise<void> {
    await prisma.permission.update({
      where: {
        id: permissionDTO.id,
        delFlag: 0
      },
      data: permissionDTO
    })
  }

  /**
   * 删除权限
   * @param permissionId 权限ID
   */
  async deletePermission(permissionId: number): Promise<void> {
    await prisma.permission.update({
      where: {
        id: permissionId,
        delFlag: 0
      },
      data: {
        delFlag: 1
      }
    })
  }

  /**
   * 验证权限名称是否唯一
   * @param permissionDTO 权限信息
   */
  async verifyPermissionUnique(permissionDTO: PermissionDTO): Promise<void> {
    const condition: Prisma.PermissionWhereInput = {
      permission: permissionDTO.permission,
      delFlag: 0
    }

    if (permissionDTO.id) {
      condition.id = {
        not: permissionDTO.id
      }
    }

    const res = await prisma.permission.findFirst({
      where: condition
    })

    if (res) throw new BizError('权限名称已经存在')
  }
}
