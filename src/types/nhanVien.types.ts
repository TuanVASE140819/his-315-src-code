export interface NhanVien {
  id?: number
  manv: string
  tennv: string
  gioitinh?: string
  ngaysinh?: string
  dienthoai?: string
  chucdanhviettat?: string
  tenchucdanh?: string
  thoiviec?: boolean
  diachi?: string
  bangcap?: string
  tenmaychamcong?: string
  tinhthanh?: string
  phuongxa?: string
}

export interface CreateNhanVienPayload {
  manv: string
  tennv: string
  ngaysinh?: string
  gioitinh?: string
  dienthoai?: string
  chucdanhviettat?: string
  tenchucdanh?: string
  bangcap?: string
  tenmaychamcong?: string
  thoiviec?: boolean
  diachi?: string
  // Address fields (both old and new keys supported)
  tinh?: string
  phuong?: string
  tinhthanh?: string
  phuongxa?: string
  phongbanId?: string | number
}

export default NhanVien
