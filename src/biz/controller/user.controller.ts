import { Body, Controller, Get, Inject, Param, Post, Query } from '@midwayjs/core'
import { UserService } from '../service/user.service'
import { IPage } from '../../common/core/interface'
import { ParseIntPipe } from '@midwayjs/validate'
import { UserDTO } from '../dto/user.dto'

@Controller('/user')
export class UserController {
  @Inject()
  userService: UserService

  @Get('/page', { summary: '用户分页' })
  async page(
    @Query('nickname') nickname?: string,
    @Query('status') status?: number,
    @Query('page', [ParseIntPipe]) page: number = 1,
    @Query('pageSize', [ParseIntPipe]) pageSize: number = 10
  ): Promise<IPage> {
    return await this.userService.queryUserPage({ page, pageSize }, nickname, status)
  }

  @Get('/:id', { summary: '用户详情' })
  async info(@Param('id', [ParseIntPipe]) id: number): Promise<UserDTO> {
    return await this.userService.queryUserInfo(id)
  }

  @Post('/create', { summary: '创建用户' })
  async create(@Body() user: UserDTO) {
    await this.userService.verifyPhoneUnique(user)
    await this.userService.verifyUserCount(user.tenantID)
    await this.userService.createUser(user)
  }

  @Post('/modify', { summary: '修改用户' })
  async modify(@Body() user: UserDTO) {
    await this.userService.verifyPhoneUnique(user)
    await this.userService.modifyUser(user)
  }

  @Post('/remove/:id', { summary: '删除账户' })
  async remove(@Param('id', [ParseIntPipe]) id: number) {
    await this.userService.removeUser(id)
  }
}
