import { RouteConfig } from '../types/route'
import Dashboard from '../pages/Dashboard'
import Account from '../components/layouts/Account/Account'
import Game from '../components/layouts/Game/Game'
import Team from '../components/layouts/Team/Team'
import Customer from '../components/layouts/Customer/Customer'
import NhanVien from '../pages/HeThong/NhanVien/index'
import NguoiDung from '../pages/HeThong/NguoiDung/index'
import Doitac from '../components/layouts/Doitac/Doitac'
import DichVu from '../components/layouts/DichVu/DichVu'
import NhapKho from '../pages/ThuMuaKho/NhapKho'
import ChuyenKho from '../pages/ThuMuaKho/ChuyenKho'
import PhongKham from '../components/layouts/PhongKham/index'

export const route: RouteConfig[] = [
  {
    index: true,
    path: '/',
    Component: Dashboard,
    isAuth: true,
    redirectPath: '/login',
  },
  {
    path: '/nguoidung/taikhoan',
    Component: Account,
    isLayout: true,
    isAuth: true,
    redirectPath: '/login',
  },
  {
    path: '/nguoidung/khachhang',
    Component: Customer,
    isLayout: true,
    isAuth: true,
    redirectPath: '/login',
  },
  {
    path: '/dudoan/trandau',
    Component: Game,
    isLayout: true,
    isAuth: true,
    redirectPath: '/login',
  },
  {
    path: '/danhmuc/doithidau',
    Component: Team,
    isLayout: true,
    isAuth: true,
    redirectPath: '/login',
  },
  {
    path: '/danhmuc/doitac',
    Component: Doitac,
    isLayout: true,
    isAuth: true,
    redirectPath: '/login',
  },
  {
    path: '/danhmuc/dichvu',
    Component: DichVu,
    isLayout: true,
    isAuth: true,
    redirectPath: '/login',
  },
  {
    path: '/danhmuc/phongkham',
    Component: PhongKham,
    isLayout: true,
    isAuth: true,
    redirectPath: '/login',
  },
  {
    path: '/thumuakho/nhapkho',
    Component: NhapKho,
    isLayout: true,
    isAuth: true,
    redirectPath: '/login',
  },
  {
    path: '/thumuakho/chuyenkho',
    Component: ChuyenKho,
    isLayout: true,
    isAuth: true,
    redirectPath: '/login',
  },
  {
    path: '/hethong/nhanvien',
    Component: NhanVien,
    isLayout: true,
    isAuth: true,
    redirectPath: '/login',
  },
  {
    path: '/hethong/nguoidung',
    Component: NguoiDung,
    isLayout: true,
    isAuth: true,
    redirectPath: '/login',
  },
]
