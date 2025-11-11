import { RouteConfig } from '../types/route'
import Dashboard from '../pages/Dashboard'
import Account from '../components/layouts/Account/Account'
import Game from '../components/layouts/Game/Game'
import Team from '../components/layouts/Team/Team'
import Customer from '../components/layouts/Customer/Customer'
import NhanVien from '../pages/HeThong/NhanVien/index.jsx'
import Doitac from '../components/layouts/Doitac/Doitac'

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
    path: '/hethong/nhanvien',
    Component: NhanVien,
    isLayout: true,
    isAuth: true,
    redirectPath: '/login',
  },
]
