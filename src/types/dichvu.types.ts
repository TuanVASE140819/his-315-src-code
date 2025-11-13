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
}

export interface ModalEditDichVuState {
  show: boolean
  data: DichVu | Record<string, never>
}
