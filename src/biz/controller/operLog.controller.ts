import { Controller, Inject, Query } from '@midwayjs/core'
import { OperLogService } from '../service/operLog.service'
import { IPage } from '../../common/core/interface'
import { ParseIntPipe } from '@midwayjs/validate'

@Controller('/operLog')
export class OperLogController {
  @Inject()
  operLogService: OperLogService

  async page(
    @Query('operName') operName: string,
    @Query('pageNo', [ParseIntPipe]) pageNo: number,
    @Query('pageSize', [ParseIntPipe]) pageSize: number
  ): Promise<IPage> {
    return await this.operLogService.queryOperLogPage({ pageNo, pageSize }, operName)
  }
}
