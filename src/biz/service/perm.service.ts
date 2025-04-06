import { Provide } from '@midwayjs/core'
import { prisma } from '../../prisma'

@Provide()
export class PermService {
  // * 分配权限
  async assignPerms(ownerId: number, ownerType: number, perms: string[]) {
    await prisma.perm.upsert({
      where: {
        ownerId_ownerType: {
          ownerId,
          ownerType
        }
      },
      create: {
        ownerId,
        ownerType,
        perms
      },
      update: {
        perms
      }
    })
  }

  // * 获取权限
  async getPerms(ownerId: number, ownerType: number) {
    return await prisma.perm.findFirst({
      where: {
        ownerId,
        ownerType
      },
      select: {
        perms: true,
        ownerId: true,
        ownerType: true
      }
    })
  }
}
