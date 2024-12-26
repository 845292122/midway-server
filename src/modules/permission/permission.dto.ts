export interface PermissionDTO {
  id: number;
  parentId?: number | null;
  tenantId?: number | null;
  permission?: string | null;
  status?: number | null;
  delFlag: number;
  createBy?: string | null;
  updateBy?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}
