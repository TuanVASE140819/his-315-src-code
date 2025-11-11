export interface PartnerItem {
  iddoitac: number
  madoitac: string
  tendoitac: string
  diachi?: string | null
  idtinh?: number | null
  idphuong?: number | null
  dienthoai?: string | null
  masothue?: string | null
  email?: string | null
  website?: string | null
  tenviettat?: string | null
}

export interface PartnerPagedResponse {
  totalCount: number
  totalPages: number
  pageNumber: number
  data: PartnerItem[]
}
