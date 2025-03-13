import Dashboard from '../pages/Dashboard'
import Account from '../components/layouts/Account/Account'
import League from '../components/layouts/League/League'

export const route = [
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
    path: '/dudoan/giaidau',
    Component: League,
    isLayout: true,
    isAuth: true,
    redirectPath: '/login',
  },
]
