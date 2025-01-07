// user.controller.ts
import { Body, Controller, Get, Inject, Param, Post, Query } from '@midwayjs/core'
import { UserService } from './user.service'
import { IPage } from '../../common/interface'
import { ParseIntPipe } from '@midwayjs/validate'
import { UserDTO } from './user.dto'
import { BizError } from '../../common/error'

/**
 * 用户控制器
 */
@Controller('/user')
export class UserController {
  @Inject()
  userService: UserService

  @Get('/page', { summary: '分页查询用户' })
  async getUserPage(
    @Query('username') username: string,
    @Query('pageNo', [ParseIntPipe]) pageNo: number,
    @Query('pageSize', [ParseIntPipe]) pageSize: number
  ): Promise<IPage> {
    return await this.userService.selectUserPage({ pageNo, pageSize }, username)
  }

  @Get('/:userId', { summary: '获取用户信息' })
  async getUserInfo(@Param('userId', [ParseIntPipe]) userId: number): Promise<UserDTO> {
    return await this.userService.selectUserInfo(userId)
  }

  @Post('/add', { summary: '创建用户' })
  async addUser(@Body() user: UserDTO): Promise<void> {
    if (!user.name) throw new BizError('用户名不能为空')
    await this.userService.verifyNameUnique(user)
    await this.userService.createUser(user)
  }

  @Post('/modify', { summary: '修改用户' })
  async modifyUser(@Body() user: UserDTO): Promise<void> {
    if (!user.name) throw new BizError('用户名不能为空')
    await this.userService.verifyNameUnique(user)
    await this.userService.updateUser(user)
  }

  @Post('/remove/:userId', { summary: '删除用户' })
  async removeUser(@Param('userId', [ParseIntPipe]) userId: number): Promise<void> {
    await this.userService.deleteUser(userId)
  }
}
