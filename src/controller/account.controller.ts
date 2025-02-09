import { Body, Controller, Get, Inject, Param, Post, Query } from '@midwayjs/core'
import { AccountService } from '../service/account.service'
import { IPage } from '../common/interface'
import { ParseIntPipe } from '@midwayjs/validate'
import { AccountDTO } from '../dto/account.dto'

@Controller('/account')
export class AccountController {
  @Inject()
  accountService: AccountService

  @Get('/page', { summary: '账户分页' })
  async page(
    @Query('company') company: string,
    @Query('pageNo', [ParseIntPipe]) pageNo: number,
    @Query('pageSize', [ParseIntPipe]) pageSize: number
  ): Promise<IPage> {
    return await this.accountService.getAccountPage({ pageNo, pageSize }, company)
  }

  @Get('/:id', { summary: '账户详情' })
  async info(@Param('id', [ParseIntPipe]) id: number): Promise<AccountDTO> {
    return await this.accountService.getAccountInfo(id)
  }

  @Post('/create', { summary: '创建账户' })
  async create(@Body() account: AccountDTO): Promise<void> {
    await this.accountService.verifyPhoneUnique(account)
    await this.accountService.createAccount(account)
  }

  @Post('/modify', { summary: '修改账户' })
  async modify(@Body() account: AccountDTO): Promise<void> {
    await this.accountService.verifyPhoneUnique(account)
    await this.accountService.modifyAccount(account)
  }

  @Post('/remove/:id', { summary: '删除账户' })
  async remove(@Param('id', [ParseIntPipe]) id: number): Promise<void> {
    await this.accountService.removeAccount(id)
  }
}
