// Types for DichVu (Service) module

export interface DichVu {
  id: number
  maDichVu: string
  tenDichVu: string
  moTa: string
  gia: number
  donvi?: string
  raw?: any
}

export interface DichVuFormValues {
  maDichVu: string
  tenDichVu: string
  moTa?: string
  gia: number
  donvi?: string
  nhomDichVu?: number | null
  ghiChu?: string
  tenVietTat?: string
  tienGuiMau?: number
  tienChietKhau?: number
  tienGiaCong?: number
  tienVanChuyen?: number
  giaVon?: number
  chuyenKhoa?: number | null
  bhyt?: boolean | number
}

export interface ModalEditDichVuState {
  show: boolean
  data: DichVu | Record<string, never>
}
