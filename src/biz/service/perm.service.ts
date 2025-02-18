import { Provide } from '@midwayjs/core'
import { Repository } from 'typeorm'
import { PermEntity } from '../entity/perm.entity'
import { InjectEntityModel } from '@midwayjs/typeorm'

@Provide()
export class PermService {
  @InjectEntityModel(PermEntity)
  permModel: Repository<PermEntity>
}
