import { Provide } from '@midwayjs/core'
import { IPage } from '../../common/interface'
import { Prisma } from '@prisma/client'
import { prisma } from '../../common/prisma'
import { TenantDTO } from './tenant.dto'
import { BizError } from '../../error/biz.error'

@Provide()
export class TenantService {
  /**
   * 分页查询租户
   * @param query 分页信息
   * @param name 租户名称
   * @returns
   */
  async selectTenantPage(query: IPage, name: string): Promise<IPage> {
    const condition: Prisma.TenantWhereInput = {
      delFlag: 0
    }
    if (name) {
      condition.name = {
        startsWith: name
      }
    }

    const skipVal: number = (query.pageNo - 1) * query.pageSize
    const takeVal: number = query.pageSize
    const records = await prisma.tenant.findMany({
      where: condition,
      skip: skipVal,
      take: takeVal
    })

    const count = await prisma.tenant.count({
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
   * 查询租户信息
   * @param tenantId 租户ID
   * @returns
   */
  async selectTenantInfo(tenantId: number): Promise<TenantDTO> {
    return await prisma.tenant.findUnique({
      where: {
        id: tenantId,
        delFlag: 0
      }
    })
  }

  /**
   * 插入租户信息
   * @param tenantDTO 租户信息
   */
  async createTenant(tenantDTO: TenantDTO): Promise<void> {
    await prisma.tenant.create({
      data: tenantDTO
    })
  }

  /**
   * 更新账户信息
   * @param tenantDTO 租户信息
   */
  async updateTenant(tenantDTO: TenantDTO): Promise<void> {
    await prisma.tenant.update({
      where: {
        id: tenantDTO.id,
        delFlag: 0
      },
      data: tenantDTO
    })
  }

  /**
   * 删除租户
   * @param tenantId 租户ID
   */
  async deleteTenant(tenantId: number): Promise<void> {
    await prisma.tenant.update({
      where: {
        id: tenantId,
        delFlag: 0
      },
      data: {
        delFlag: 1
      }
    })
  }

  /**
   * 验证租户手机号是否唯一
   * @param tenantDTO 租户信息
   */
  async verifyPhoneUnique(tenantDTO: TenantDTO): Promise<void> {
    const condition: Prisma.TenantWhereInput = {
      phone: tenantDTO.phone,
      delFlag: 0
    }

    if (tenantDTO.id) {
      condition.id = {
        not: tenantDTO.id
      }
    }

    const res = await prisma.tenant.findFirst({
      where: condition
    })

    if (res) throw new BizError('手机号已经存在')
  }
}
