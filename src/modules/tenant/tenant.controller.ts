import { Body, Controller, Get, Inject, Param, Post, Query } from '@midwayjs/core'
import { TenantService } from './tenant.service'
import { IPage } from '../../common/interface'
import { ParseIntPipe } from '@midwayjs/validate'
import { TenantDTO } from './tenant.dto'
import { BizError } from '../../common/error'

/**
 * 租户控制器
 */
@Controller('/tenant')
export class TenantController {
  @Inject()
  tenantService: TenantService

  @Get('/page', { summary: '分页查询租户' })
  async getTenantPage(
    @Query('name') name: string,
    @Query('pageNo', [ParseIntPipe]) pageNo: number,
    @Query('pageSize', [ParseIntPipe]) pageSize: number
  ): Promise<IPage> {
    return await this.tenantService.selectTenantPage({ pageNo, pageSize }, name)
  }

  @Get('/:tenantId', { summary: '获取租户信息' })
  async getTenantInfo(@Param('tenantId', [ParseIntPipe]) tenantId: number): Promise<TenantDTO> {
    return await this.tenantService.selectTenantInfo(tenantId)
  }

  @Post('/add', { summary: '创建租户' })
  async addTenant(@Body() tenant: TenantDTO): Promise<void> {
    if (!tenant.phone) throw new BizError('手机号不能为空')
    await this.tenantService.verifyPhoneUnique(tenant)
    await this.tenantService.createTenant(tenant)
  }

  @Post('/modify', { summary: '修改租户' })
  async modifyTenant(@Body() tenant: TenantDTO): Promise<void> {
    if (!tenant.phone) throw new BizError('手机号不能为空')
    await this.tenantService.verifyPhoneUnique(tenant)
    await this.tenantService.updateTenant(tenant)
  }

  @Post('/remove/:tenantId', { summary: '删除租户' })
  async removeTenant(@Param('tenantId', [ParseIntPipe]) tenantId: number): Promise<void> {
    await this.tenantService.deleteTenant(tenantId)
  }
}
