import { Body, Controller, Get, Inject, Param, Post } from '@midwayjs/core'
import { PermService } from '../service/perm.service'
import { PermDTO } from '../dto/perm.dto'
import { ParseIntPipe } from '@midwayjs/validate'
import { BizError } from '../../common/core/error'

@Controller('/perm')
export class PermController {
  @Inject()
  permService: PermService

  @Get('/list', { summary: '获取权限列表' })
  async list(): Promise<PermDTO[]> {
    return this.permService.getPermList()
  }

  @Get('/:id', { summary: '获取权限详情' })
  async info(@Param('id', [ParseIntPipe]) id: number): Promise<PermDTO> {
    return await this.permService.getPermInfo(id)
  }

  @Post('/create', { summary: '创建权限' })
  async create(@Body() perm: PermDTO): Promise<void> {
    await this.permService.verifyPermKeyUnique(perm)
    await this.permService.createPerm(perm)
  }

  @Post('/modify', { summary: '修改权限' })
  async modify(@Body() perm: PermDTO): Promise<void> {
    await this.permService.verifyPermKeyUnique(perm)
    await this.permService.modifyPerm(perm)
  }

  @Post('/remove/:id', { summary: '删除权限' })
  async remove(@Param('id', [ParseIntPipe]) id: number): Promise<void> {
    const exist = await this.permService.checkParentPerm(id)
    if (exist) {
      throw new BizError('该权限下存在子权限，无法删除')
    }

    await this.permService.removePerm(id)
  }
}
