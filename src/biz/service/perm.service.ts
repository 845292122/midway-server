import { Provide } from '@midwayjs/core'
import { Repository } from 'typeorm'
import { Perm } from '../entity/perm.entity'
import { InjectEntityModel } from '@midwayjs/typeorm'
import { PermDTO } from '../dto/perm.dto'
import { BizError } from '../../common/core/error'

@Provide()
export class PermService {
  @InjectEntityModel(Perm)
  permModel: Repository<Perm>

  // * 权限列表
  async getPermList(): Promise<PermDTO[]> {
    return await this.permModel.find()
  }

  // * 获取权限详细信息
  async getPermInfo(id: number): Promise<PermDTO> {
    return await this.permModel.findOne({
      where: {
        id
      }
    })
  }

  // * 创建权限
  async createPerm(perm: PermDTO): Promise<void> {
    await this.permModel.save(perm)
  }

  // * 修改权限
  async modifyPerm(perm: PermDTO): Promise<void> {
    await this.permModel.update(perm.id, perm)
  }

  // * 删除权限
  async removePerm(id: number): Promise<void> {
    await this.permModel.softRemove({
      id
    })
  }

  // * 验证key是否重复
  async verifyPermKeyUnique(perm: PermDTO): Promise<void> {
    const count = await this.permModel.countBy({
      key: perm.key,
      id: perm.id ?? undefined
    })
    if (count > 0) {
      throw new BizError('权限key重复')
    }
  }

  // * 验证是否存在下级权限
  async checkParentPerm(id: number): Promise<boolean> {
    return await this.permModel.exists({
      where: {
        pId: id
      }
    })
  }
}
