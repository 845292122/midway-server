import { Provide } from '@midwayjs/core'
import { IPage } from '../../common/core/interface'
import { Repository } from 'typeorm'
import { Account } from '../entity/account.entity'
import { InjectEntityModel } from '@midwayjs/typeorm'
import { convertPageParam } from '../../common/utils'
import { AccountDTO } from '../dto/account.dto'
import { BizError } from '../../common/core/error'

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
  async getAccountPage(query: IPage, company?: string): Promise<IPage> {
    const { pageNo, pageSize } = query

    const pageParam = convertPageParam(pageNo, pageSize)
    const [records, total] = await this.accountModel.findAndCount({
      where: {
        company: company ?? undefined
      },
      ...pageParam
    })

    return {
      pageNo,
      pageSize,
      total,
      records
    }
  }

  /**
   * 根据账户ID异步获取账户信息
   *
   * @param id 要查询的账户的ID，是一个唯一的数字标识符
   * @returns 返回一个Promise对象，解析为accountDTO类型的对象，包含所查询的账户信息
   */
  async getAccountInfo(id: number): Promise<AccountDTO> {
    return await this.accountModel.findOne({
      where: {
        id
      }
    })
  }

  /**
   * 异步创建账户方法
   *
   * 本方法接收一个账户数据传输对象（AccountDTO），并将其保存到账户模型中
   * 主要用于通过API接收账户创建请求，并执行账户创建操作
   *
   * @param account 账户数据传输对象，包含创建账户所需的信息
   * @returns 无返回值，账户创建操作成功不返回任何内容
   */
  async createAccount(account: AccountDTO): Promise<void> {
    await this.accountModel.save(account)
  }

  /**
   * 异步修改账户信息
   *
   * 此函数通过接收一个AccountDTO对象来更新账户信息它调用accountModel的update方法
   * 来执行实际的更新操作这个设计确保了账户信息的更新是异步的，提高了程序的效率
   * 和响应性
   *
   * @param account AccountDTO类型的账户数据传输对象，包含了需要更新的账户信息
   * @returns Promise<void> 此函数不返回任何值，仅执行更新操作
   */
  async modifyAccount(account: AccountDTO): Promise<void> {
    await this.accountModel.update(account.id, account)
  }

  /**
   * 删除账户
   */
  async removeAccount(id: number): Promise<void> {
    await this.accountModel.softRemove({ id })
  }

  /**
   * 验证账户手机号是否唯一
   */
  async verifyPhoneUnique(account: AccountDTO): Promise<void> {
    const exists = await this.accountModel.exists({
      where: {
        phone: account.phone,
        id: account.id ?? undefined
      }
    })
    if (exists) {
      throw new BizError('手机号已存在')
    }
  }
}
