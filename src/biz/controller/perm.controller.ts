import { Controller, Inject } from '@midwayjs/core'
import { PermService } from '../service/perm.service'

@Controller('/perm')
export class PermController {
  @Inject()
  permService: PermService
}
