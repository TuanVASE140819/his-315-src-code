import React, { useEffect, useMemo, useState } from 'react'
import {
  useDispatch,
  //  useSelector
} from 'react-redux'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Button, ConfigProvider, Layout, Menu, theme } from 'antd'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  DollarOutlined,
} from '@ant-design/icons'
import logo from '../../assets/images/logo/logo.png'
import ButtonLogout from '../../components/common/ButtonLogout'
// import Notification from '../../components/common/Notification'
import ChangePassword from '../../components/common/ChangePassword/ChangePassword'
import Profile from '../../components/common/Profile'
import LoadingPage from '../../pages/LoadingPage'
import { updateInfoUserToStore } from '../../redux/actions/userActions'
import Cookies from 'js-cookie'

const { Header, Sider, Content } = Layout

const menuItems = [
  {
    key: '/nguoidung',
    label: 'Người dùng',
    icon: <TeamOutlined />,
    children: [
      {
        key: '/nguoidung/taikhoan',
        title: 'Tài khoản',
        label: <Link to={'nguoidung/taikhoan'}>Tài khoản</Link>,
      },
      {
        key: '/nguoidung/doimatkhau',
        title: 'Đổi mật khẩu',
        label: 'Đổi mật khẩu',
      },
    ],
  },
  {
    key: '/dudoan',
    label: 'Dự đoán',
    icon: <DollarOutlined />,
    children: [
      {
        key: '/dudoan/giaidau',
        title: 'Giải đấu',
        label: <Link to={'dudoan/giaidau'}>Giải đấu</Link>,
      },
    ],
  },
]

const RootLayout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const { infoUser } = useSelector((state) => state.User)
  const token = Cookies.get('accessToken')
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)
  const [selectedKeys, setSelectedKeys] = useState([])
  const [openKeys, setOpenKeys] = useState([])
  const [menuTitle, setmenuTitle] = useState(null)
  const [isModalChangePassword, setisModalChangePassword] = useState(false)
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const onOpenChange = (keys) => {
    setOpenKeys(keys)
  }
  const onSelect = (e) => {
    if (e.key.includes('doimatkhau')) return handleOpenChangePassword()
    setSelectedKeys([e.key])
    setmenuTitle(e?.item?.props?.title)
  }
  const handleOpenChangePassword = () => {
    setisModalChangePassword(true)
  }
  const handleCloseChangePassword = () => {
    setisModalChangePassword(false)
  }

  useEffect(() => {
    const path = location.pathname
    const openSub = menuItems?.find(({ key }) => path?.includes(key))
    const openItem = openSub?.children?.find(({ key }) => path?.includes(key))
    setOpenKeys(openSub?.key ? [openSub?.key] : [])
    setSelectedKeys(openItem?.key ? [openItem?.key] : [])
    setmenuTitle(openItem?.title)
  }, [location.pathname])

  useEffect(() => {
    const loginFirstTime = localStorage.getItem('loginFirstTime')
    if (loginFirstTime) localStorage.removeItem('loginFirstTime')
    else if (token) dispatch(updateInfoUserToStore()) //fetch info user by access token
  }, [])
  return (
    <>
      <Layout className='hidden lg:flex'>
        <ConfigProvider
          theme={{
            components: {
              Menu: {
                darkItemBg: '#00AFEF', // light blue
                darkSubMenuItemBg: '#0396CD', // medium blue
                darkPopupBg: '#007BA7', // dark blue
                darkItemTextColor: '#FFFFFF', // white text
                darkHoverItemBg: '#005F73', // darker blue on hover
                darkSelectedItemBg: '#003A47', // very dark blue for selected items
              },
            },
          }}
        >
          <Sider
            trigger={null}
            style={{
              backgroundColor: '#00AFEF',
              overflow: 'auto',
              height: '100vh',
              position: 'fixed',
              left: 0,
              top: 0,
              bottom: 0,
            }}
            collapsible
            collapsed={collapsed}
          >
            <div className='h-16 flex justify-center items-center'>
              {!collapsed ? (
                <Link to='/'>
                  <div className='text-lg font-bold font-sans font-outline text-amber-500 hover:text-amber-400 transition-colors duration-300'>
                    NGHI88 - Admin
                  </div>
                </Link>
              ) : (
                <Link to='/'>
                  <img
                    className='w-11 hover:w-[2.85rem] transition-transform duration-300 py-3 img-outline'
                    src={logo}
                  />
                </Link>
              )}
            </div>
            <Menu
              theme='dark'
              mode='inline'
              selectedKeys={selectedKeys}
              openKeys={openKeys}
              onOpenChange={onOpenChange}
              onSelect={onSelect}
              items={menuItems}
            />
          </Sider>
        </ConfigProvider>
        <Layout
          style={{
            marginLeft: !collapsed ? 200 : 80,
            transition: 'all .3s',
          }}
        >
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
              zIndex: 1,
              position: 'relative',
            }}
          >
            <div className='flex justify-between '>
              <div className='flex gap-3 items-center'>
                <Button
                  type='text'
                  icon={
                    collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                  }
                  onClick={() => setCollapsed(!collapsed)}
                  style={{
                    fontSize: '16px',
                    width: 64,
                    height: 64,
                  }}
                />
                <div className=' flex flex-col gap-1'>
                  <h2 className='font-semibold leading-none text-lg text-gray-700'>
                    {menuTitle ?? 'Trang chủ'}
                  </h2>
                </div>
              </div>
              <div className='px-5'>
                <div className='flex justify-between items-center '>
                  <ul className=' flex justify-center gap-4 items-center pt-3'>
                    {/* <li>
                      <Notification />
                    </li> */}
                    <li>
                      <Profile />
                    </li>
                    <li>
                      <ButtonLogout />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Header>
          <Content
            style={{
              minHeight: 'calc(100vh - 64px)',
              background: colorBgContainer,
              borderRadius: 0,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
      <ChangePassword
        open={isModalChangePassword}
        handleClose={handleCloseChangePassword}
      />
      <LoadingPage />
    </>
  )
}
export default RootLayout
