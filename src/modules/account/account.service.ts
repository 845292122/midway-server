import { Provide } from '@midwayjs/core'
import { IPage } from '../../common/interface'
import { Repository } from 'typeorm'
import { Account } from './account.entity'
import { InjectEntityModel } from '@midwayjs/typeorm'
import { convertPageParam } from '../../utils'

@Provide()
export class AccountService {
  @InjectEntityModel(Account)
  accountModel: Repository<Account>

  /**
   * 分页查询用户
   *
   * 此函数根据提供的查询参数和公司名称，从数据库中分页查询用户信息它首先转换分页参数，
   * 然后根据公司名称（可选）查询数据库，最后返回分页格式的数据
   *
   * @param query 分页查询参数，包括页码和每页大小
   * @param company 公司名称，用于筛选查询结果，可选
   * @returns 返回一个Promise，解析为分页查询结果，包括页码、每页大小、总记录数和记录列表
   */
  async selectUserPage(query: IPage, company?: string): Promise<IPage> {
    const { pageNo, pageSize } = query

    const pageParam = convertPageParam(pageNo, pageSize)
    const [records, count] = await this.accountModel.findAndCount({
      where: {
        company: company ?? undefined
      },
      ...pageParam
    })

    return {
      pageNo,
      pageSize,
      total: count,
      records
    }
  }
}
