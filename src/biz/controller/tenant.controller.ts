import { Body, Controller, Get, Inject, Param, Post, Query } from '@midwayjs/core'
import { TenantService } from '../service/tenant.service'
import { IPage } from '../../common/core/interface'
import { ParseIntPipe } from '@midwayjs/validate'
import { TenantDTO } from '../dto/tenant.dto'

@Controller('/tenant')
export class TenantController {
  @Inject()
  tenantService: TenantService

  @Get('/page', { summary: '租户分页' })
  async page(
    @Query('page', [ParseIntPipe]) page: number = 1,
    @Query('pageSize', [ParseIntPipe]) pageSize: number = 10,
    @Query('companyName') companyName?: string,
    @Query('isPremium') isPremium?: number
  ): Promise<IPage> {
    return await this.tenantService.queryTenantPage({ page, pageSize }, companyName, Number(isPremium))
  }

  @Get('/:id', { summary: '租户详情' })
  async info(@Param('id', [ParseIntPipe]) id: number): Promise<TenantDTO> {
    return await this.tenantService.queryTenantInfo(id)
  }

  @Post('/create', { summary: '创建租户' })
  async create(@Body() tenant: TenantDTO) {
    await this.tenantService.createTenant(tenant)
  }

  @Post('/modify', { summary: '修改租户' })
  async modify(@Body() tenant: TenantDTO) {
    await this.tenantService.modifyTenant(tenant)
  }

  @Post('/remove/:id', { summary: '删除租户' })
  async remove(@Param('id', [ParseIntPipe]) id: number) {
    await this.tenantService.removeTenant(id)
  }

  // TODO list接口
}
