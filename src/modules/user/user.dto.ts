export interface UserDTO {
  id: number
  tenantId?: number
  roleId?: number
  name?: string
  phone?: string
  password?: string
  status?: number
  delFlag: number
  createdAt: Date
  updatedAt: Date
}
