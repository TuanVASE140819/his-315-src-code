// User & Authentication Types
export interface User {
  id: number
  email: string
  username: string
  fullName: string
  isAdmin: boolean
  role: string
  avatar?: string
  createdAt?: string
  updatedAt?: string
  idNv?: number
  tenNhanVien?: string
  tenNhom?: string
}

export interface DangNhap {
  idDangNhap: number
  idNguoiDung: number
  thoiGianDangNhap: string | null
  dangXuat: string | null
  ip: string | null
  ghiChu: string | null
  idPK: number | null
  idCaLamViec: number | null
  idChiNhanh: number | null
  idDevice: string | null
}

export interface LoginResponse {
  token: string
  taiKhoan: string
  idNv: number
  tenNhanVien: string
  tenNhom: string
  dangNhap: DangNhap
}

export interface Company {
  idct: number
  tenct: string
  diachi?: string
  masothue?: string
}

export interface Department {
  idKhoaPhong: number
  tenKhoaPhong: string
  maKhoaPhong?: string
  idCongTy?: number
}

export interface LoginCredentials {
  username: string
  password: string
  menuThaoTac?: string
  idKhoaPhong?: number | null
}

export interface ChangePasswordPayload {
  oldPassword: string
  newPassword: string
}

export interface AuthResponse {
  accessToken: string
  refreshToken: string
  user?: User
}
