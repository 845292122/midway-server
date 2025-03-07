export class OperLogDTO {
  id: number
  tenantID?: number
  userID?: number
  type?: number
  method?: string
  operName?: string
  operParam?: string
  operResult?: string
  status?: number
  errorMsg?: string
  operTime?: Date
  costTime?: bigint
}
