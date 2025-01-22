import { Controller, Get, Inject, Query } from '@midwayjs/core'
import { AccountService } from './account.service'
import { IPage } from '../../common/interface'
import { ParseIntPipe } from '@midwayjs/validate'

@Controller('/account')
export class AccountController {
  @Inject()
  accountService: AccountService

  @Get('/page', { summary: '账户分页' })
  async getAccountPage(
    @Query('company') company: string,
    @Query('pageNo', [ParseIntPipe]) pageNo: number,
    @Query('pageSize', [ParseIntPipe]) pageSize: number
  ): Promise<IPage> {
    return await this.accountService.selectUserPage({ pageNo, pageSize }, company)
  }
}
