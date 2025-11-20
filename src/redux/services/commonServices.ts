import axiosInstance from '../../utils/axiosConfig'
import { AxiosResponse } from 'axios'
import { Category, Team, TransactionTypeOption, ApiResponse } from '../../types'

// Public API base for external selects. Try VITE_PUBLIC_API_URL, then VITE_API_URL from .env, otherwise fallback.
// Ensure we never call replace on undefined: fall back to empty string when env vars are missing.
const PUBLIC_API = (
  (import.meta.env.VITE_PUBLIC_API_URL as string) ||
  (import.meta.env.VITE_API_URL as string) ||
  ''
).replace(/\/+$/, '')

const publicUrl = (path: string) => `${PUBLIC_API}/${path.replace(/^\/+/, '')}`

export const commonServices = {
  // Existing admin endpoints
  getListCategory: (): Promise<AxiosResponse<ApiResponse<Category[]>>> =>
    axiosInstance.get('Category/Admin/GetListCategory'),
  getListTeam: (
    categoryId?: string | number,
  ): Promise<AxiosResponse<ApiResponse<Team[]>>> =>
    axiosInstance.get('Team/Admin/GetListTeam', { params: { categoryId } }),
  getListTransactionType: (): Promise<
    AxiosResponse<ApiResponse<TransactionTypeOption[]>>
  > => axiosInstance.get('Transaction/GetTransactionType'),

  // Public endpoints for selects (use centralized PUBLIC_API)
  getAllBangCap: (): Promise<AxiosResponse<any>> =>
    axiosInstance.get(publicUrl('BangCap/GetAllBangCap')),
  getChucDanh: (): Promise<AxiosResponse<any>> =>
    axiosInstance.get(publicUrl('ChucDanh/GetAllChucDanh')),
  getTinh: (): Promise<AxiosResponse<any>> =>
    axiosInstance.get(publicUrl('TinhTP/GetAllTinhTP')),
  getPhuongXaByTinh: (idTinh: number | string): Promise<AxiosResponse<any>> =>
    axiosInstance.get(
      `${publicUrl('PhuongXa/GetPhuongXaByIdTinh')}?idTinh=${encodeURIComponent(String(idTinh))}`,
    ),

  getAllKhoaPhongSuDung: (): Promise<AxiosResponse<any>> =>
    axiosInstance.get(publicUrl('KhoaPhong/GetAllKhoaPhongSuDung')),
  getKhoByIdKhoaPhong: (
    idKhoaPhong: number | string,
  ): Promise<AxiosResponse<any>> =>
    axiosInstance.get(
      `${publicUrl('KhoKhoaPhong/GetKhoByIdKhoaPhong')}?idKhoaPhong=${encodeURIComponent(
        String(idKhoaPhong),
      )}`,
    ),
  getAllNhomNguoiDung: (): Promise<AxiosResponse<any>> =>
    axiosInstance.get(publicUrl('NhomNguoiDung/GetAllNhomNguoiDung')),
  getChuyenKhoa: (): Promise<AxiosResponse<any>> =>
    axiosInstance.get(publicUrl('ChuyenKhoa/GetAllChuyenKhoa')),
  getAllDichVuNhom: (): Promise<AxiosResponse<any>> =>
    axiosInstance.get(publicUrl('DichVuNhom/GetAllDichVuNhom')),
}

export default commonServices
