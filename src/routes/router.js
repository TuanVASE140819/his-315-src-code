import Dashboard from '../pages/Dashboard'
// import CheckInOut from '../components/layouts/ChamCong/CheckInOut'

export const route = [
  {
    index: true,
    path: '/',
    Component: Dashboard,
    isAuth: true,
    redirectPath: '/login',
  },
  {
    path: '/test',
    Component: Dashboard,
    isLayout: true,
    // isAuth: true,
    redirectPath: '/login',
  },
]
