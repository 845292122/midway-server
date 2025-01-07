// role.controller.ts
import { Body, Controller, Get, Inject, Param, Post, Query } from '@midwayjs/core'
import { RoleService } from './role.service'
import { IPage } from '../../common/interface'
import { ParseIntPipe } from '@midwayjs/validate'
import { RoleDTO } from './role.dto'
import { BizError } from '../../common/error'

/**
 * 角色控制器
 */
@Controller('/role')
export class RoleController {
  @Inject()
  roleService: RoleService

  @Get('/page', { summary: '分页查询角色' })
  async getRolePage(
    @Query('name') name: string,
    @Query('pageNo', [ParseIntPipe]) pageNo: number,
    @Query('pageSize', [ParseIntPipe]) pageSize: number
  ): Promise<IPage> {
    return await this.roleService.selectRolePage({ pageNo, pageSize }, name)
  }

  @Get('/:roleId', { summary: '获取角色信息' })
  async getRoleInfo(@Param('roleId', [ParseIntPipe]) roleId: number): Promise<RoleDTO> {
    return await this.roleService.selectRoleInfo(roleId)
  }

  @Post('/add', { summary: '创建角色' })
  async addRole(@Body() role: RoleDTO): Promise<void> {
    if (!role.name) throw new BizError('角色名称不能为空')
    await this.roleService.verifyNameUnique(role)
    await this.roleService.createRole(role)
  }

  @Post('/modify', { summary: '修改角色' })
  async modifyRole(@Body() role: RoleDTO): Promise<void> {
    if (!role.name) throw new BizError('角色名称不能为空')
    await this.roleService.verifyNameUnique(role)
    await this.roleService.updateRole(role)
  }

  @Post('/remove/:roleId', { summary: '删除角色' })
  async removeRole(@Param('roleId', [ParseIntPipe]) roleId: number): Promise<void> {
    await this.roleService.deleteRole(roleId)
  }
}
