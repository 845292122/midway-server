import { Provide } from '@midwayjs/core'
import { Like, Repository } from 'typeorm'
import { TenantEntity } from '../entity/tenant.entity'
import { InjectEntityModel } from '@midwayjs/typeorm'
import { IPage } from '../../common/core/interface'
import { convertPageParam } from '../../common/utils'
import { TenantDTO } from '../dto/tenant.dto'

@Provide()
export class TenantService {
  @InjectEntityModel(TenantEntity)
  tenantModel: Repository<TenantEntity>

  // * 查询租户分页
  async queryTenantPage(pageParam: IPage, companyName: string, isPremium: boolean): Promise<IPage<TenantEntity>> {
    const { page, pageSize } = pageParam

    const pageObj = convertPageParam(page, pageSize)
    const [records, total] = await this.tenantModel.findAndCount({
      where: {
        companyName: companyName ? Like(`%${companyName}%`) : undefined,
        isPremium
      },
      ...pageObj
    })

    return {
      ...pageParam,
      total,
      records
    }
  }

  // * 查询租户信息
  async queryTenantInfo(id: number): Promise<TenantDTO> {
    return await this.tenantModel.findOneBy({ id })
  }

  // * 创建租户
  async createTenant(tenant: TenantDTO) {
    await this.tenantModel.insert(tenant)
  }

  // * 更新租户
  async modifyTenant(tenant: TenantDTO) {
    await this.tenantModel.update(tenant.id, tenant)
  }

  // * 删除租户
  async removeTenant(id: number) {
    await this.tenantModel.softDelete(id)
  }
}
