/**
 * page分页
 */
export interface IPage<T = any> {
  page: number
  pageSize: number
  total?: number
  records?: Array<T>
}

/**
 * 认证信息
 */
export interface ILogin {
  phone: string
  password: string
}
