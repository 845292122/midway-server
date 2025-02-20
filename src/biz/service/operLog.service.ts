import { Provide } from '@midwayjs/core'
import { InjectEntityModel } from '@midwayjs/typeorm'
import { OperLogEntity } from '../entity/operLog.entity'
import { Like, Repository } from 'typeorm'
import { IPage } from '../../common/core/interface'
import { convertPageParam } from '../../common/utils'

@Provide()
export class OperLogService {
  @InjectEntityModel(OperLogEntity)
  operLogModel: Repository<OperLogEntity>

  // * 查询日志分页
  async queryOperLogPage(pageParam: IPage, operName: string): Promise<IPage<OperLogEntity>> {
    const { page, pageSize } = pageParam
    const pageObj = convertPageParam(page, pageSize)

    const [records, total] = await this.operLogModel.findAndCount({
      where: {
        operName: operName ? Like(`%${operName}%`) : undefined
      },
      ...pageObj
    })

    return {
      ...pageParam,
      total,
      records
    }
  }
}
