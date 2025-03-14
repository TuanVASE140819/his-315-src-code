import Dashboard from '../pages/Dashboard'
import Account from '../components/layouts/Account/Account'
import Game from '../components/layouts/Game/Game'
import Team from '../components/layouts/Team/Team'

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
]
