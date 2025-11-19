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
  tenphuongxa?: string | null
  tentinh?: string | null
}

export interface PartnerPagedResponse {
  totalCount: number
  totalPages: number
  pageNumber: number
  data: PartnerItem[]
}

// UI representation of Partner
export interface PartnerUI {
  id: number
  maDoiTac: string
  maDoiTac_New: string
  tenVietTat: string
  tenDoiTac: string
  diaChi: string
  tenPhuongXa: string
  tenTinhTP: string
  dienThoai: string
  maSoThue: string
  email: string
  website: string
}

export interface PartnerFormValues {
  maDoiTac: string
  tenDoiTac: string
  tenVietTat?: string
  diaChi?: string
  dienThoai?: string
  diDong?: string
  maSoThue?: string
  email?: string
  website?: string
  tinh?: number | null
  phuong?: number | null
  fax?: string
  nguoiLienHe?: string
  ghiChu?: string
  taiKhoanNganHang?: string
  nganHang?: string
  tenTaiKhoan?: string
}

export interface ModalEditPartnerState {
  show: boolean
  data: PartnerUI | Record<string, never>
}
