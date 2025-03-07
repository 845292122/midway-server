import { Provide } from '@midwayjs/core'
import { IPage } from '../../common/core/interface'
import { convertPageParam } from '../../common/utils'
import { prisma } from '../../prisma'
import { OperLogDTO } from '../dto/operLog.dto'

@Provide()
export class OperLogService {
  // * 查询日志分页
  async queryOperLogPage({ page, pageSize }: IPage, operName: string): Promise<IPage<OperLogDTO>> {
    const condition = {
      operName: operName ? { startsWith: operName } : undefined
    }

    const [total, records] = await Promise.all([
      prisma.operLog.count({
        where: condition
      }),
      prisma.operLog.findMany({
        where: condition,
        ...convertPageParam(page, pageSize)
      })
    ])

    return {
      page,
      pageSize,
      total,
      records
    }
  }
}
