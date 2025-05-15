import { Provide } from '@midwayjs/core'
import { IPage } from '../../common/core/interface'
import { AccountDTO } from './account.dto'
import { Prisma } from '@prisma/client'
import { prisma } from '../../prisma'
import { convertPageParam } from '../../common/utils'

@Provide()
export class AccountService {
  // * 分页查询账户
  async queryAccountPage(
    { page, pageSize }: IPage,
    contact: string,
    storeName: string,
    status: number,
    isPremium: number
  ): Promise<IPage<AccountDTO>> {
    const condition: Prisma.AccountWhereInput = {
      contact: contact ? { startsWith: contact } : undefined,
      storeName: storeName ? { startsWith: storeName } : undefined,
      status: status ?? undefined,
      isPremium,
      delFlag: 0
    }

    const [total, records] = await Promise.all([
      prisma.account.count({ where: condition }),
      prisma.account.findMany({
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

  // * 查询账户信息
  async queryAccountInfo(id: number): Promise<AccountDTO> {
    return await prisma.account.findUnique({ where: { id, delFlag: 0 } })
  }

  // * 创建账户
  async addAccount(account: AccountDTO) {
    await prisma.account.create({
      data: account
    })
  }

  // * 更新账户
  async modifyAccount(account: AccountDTO) {
    await prisma.account.update({
      where: { id: account.id, delFlag: 0 },
      data: account
    })
  }

  // * 删除账户
  async removeAccount(id: number) {
    await prisma.account.update({
      where: { id, delFlag: 0 },
      data: {
        delFlag: 1
      }
    })
  }
}
