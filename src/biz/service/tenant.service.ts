import { Provide } from '@midwayjs/core'
import { IPage } from '../../common/core/interface'
import { convertPageParam } from '../../common/utils'
import { TenantDTO } from '../dto/tenant.dto'
import { prisma } from '../../prisma'
import { Prisma } from '@prisma/client'

@Provide()
export class TenantService {
  // * 查询租户分页
  async queryTenantPage(
    { page, pageSize }: IPage,
    contactName: string,
    companyName: string,
    status: number,
    isPremium: number
  ): Promise<IPage<TenantDTO>> {
    const condition: Prisma.TenantWhereInput = {
      companyName: companyName ? { startsWith: companyName } : undefined,
      contactName: contactName ? { startsWith: contactName } : undefined,
      status: status ?? undefined,
      isPremium,
      delFlag: 0
    }

    const [total, records] = await Promise.all([
      prisma.tenant.count({ where: condition }),
      prisma.tenant.findMany({
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

  // * 查询租户信息
  async queryTenantInfo(id: number): Promise<TenantDTO> {
    return await prisma.tenant.findUnique({ where: { id, delFlag: 0 } })
  }

  // * 创建租户
  async createTenant(tenant: TenantDTO) {
    await prisma.tenant.create({
      data: tenant
    })
  }

  // * 更新租户
  async modifyTenant(tenant: TenantDTO) {
    await prisma.tenant.update({
      where: { id: tenant.id },
      data: tenant
    })
  }

  // * 删除租户
  async removeTenant(id: number) {
    await prisma.tenant.update({
      where: { id, delFlag: 0 },
      data: {
        delFlag: 1
      }
    })
  }

  // * 查询租户列表
  async queryTenantList() {
    return await prisma.tenant.findMany({
      where: {
        delFlag: 0
      },
      select: {
        id: true,
        companyName: true,
        isPremium: true
      }
    })
  }
}
