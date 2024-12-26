/**
 * page分页
 */
export interface IPage {
  pageNo: number;
  pageSize: number;
  total?: number;
  records?: any;
}

/**
 * 认证信息
 */
export interface ILogin {
  phone: string;
  password: string;
}
