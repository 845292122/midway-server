export interface RoleDTO {
  id: number;
  tenantId?: number | null;
  name?: string | null;
  status?: number | null;
  delFlag: number;
  createBy?: string | null;
  updateBy?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}
