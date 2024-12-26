// permission.controller.ts
import { Body, Controller, Get, Inject, Param, Post, Query } from '@midwayjs/core'
import { PermissionService } from './permission.service'
import { IPage } from '../../common/interface'
import { ParseIntPipe } from '@midwayjs/validate'
import { PermissionDTO } from './permission.dto'
import { BizError } from '../../error/biz.error'

/**
 * 权限控制器
 */
@Controller('/permission')
export class PermissionController {
  @Inject()
  permissionService: PermissionService

  @Get('/page', { summary: '分页查询权限' })
  async getPermissionPage(
    @Query('name') name: string,
    @Query('pageNo', [ParseIntPipe]) pageNo: number,
    @Query('pageSize', [ParseIntPipe]) pageSize: number
  ): Promise<IPage> {
    return await this.permissionService.selectPermissionPage({ pageNo, pageSize }, name)
  }

  @Get('/:permissionId', { summary: '获取权限信息' })
  async getPermissionInfo(@Param('permissionId', [ParseIntPipe]) permissionId: number): Promise<PermissionDTO> {
    return await this.permissionService.selectPermissionInfo(permissionId)
  }

  @Post('/add', { summary: '创建权限' })
  async addPermission(@Body() permission: PermissionDTO): Promise<void> {
    if (!permission.permission) throw new BizError('权限名称不能为空')
    await this.permissionService.createPermission(permission)
  }

  @Post('/modify', { summary: '修改权限' })
  async modifyPermission(@Body() permission: PermissionDTO): Promise<void> {
    if (!permission.permission) throw new BizError('权限名称不能为空')
    await this.permissionService.updatePermission(permission)
  }

  @Post('/remove/:permissionId', { summary: '删除权限' })
  async removePermission(@Param('permissionId', [ParseIntPipe]) permissionId: number): Promise<void> {
    await this.permissionService.deletePermission(permissionId)
  }
}
