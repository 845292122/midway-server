export interface TenantDTO {
  id: number
  name?: string | null
  contact?: string | null
  phone?: string | null
  company?: string | null
  licenseNumber?: string | null
  address?: string | null
  remark?: string | null
  isTrial?: number | null
  trialStartDate?: Date | null
  trialEndDate?: Date | null
  startDate?: Date | null
  endDate?: Date | null
  accountCount?: number | null
  status?: number | null
  delFlag: number
  createdAt: Date
  updatedAt: Date
}
