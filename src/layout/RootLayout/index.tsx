import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, Outlet } from 'react-router-dom'
import { Button, ConfigProvider, Layout, Menu, theme } from 'antd'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  DollarOutlined,
  FolderOpenOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import logo from '../../assets/images/logo/logo.png'
import ButtonLogout from '../../components/common/ButtonLogout'
import ChangePassword from '../../components/common/ChangePassword/ChangePassword'
import Profile from '../../components/common/Profile'
import LoadingPage from '../../pages/LoadingPage'
import TabBar from '../../components/common/TabBar'
import { updateInfoUserToStore } from '../../redux/actions/userActions'
import { USER } from '../../redux/constants/constants'
import Cookies from 'js-cookie'
import { useTabManager } from '../../hooks/useTabManager'
import { useMenuState } from '../../hooks/useMenuState'

const { Header, Sider, Content } = Layout

const menuItems = [
  {
    key: '/hethong',
    label: 'Hệ thống',
    icon: <SettingOutlined />,
    children: [
      {
        key: '/hethong/cauhinh',
        title: 'Cấu hình',
        label: <Link to={'/hethong/cauhinh'}>Cấu hình</Link>,
      },
      {
        key: '/hethong/nhanvien',
        title: 'Nhân viên',
        label: <Link to={'/hethong/nhanvien'}>Nhân viên</Link>,
      },
    ],
  },
  {
    key: '/nguoidung',
    label: 'Người dùng',
    icon: <TeamOutlined />,
    children: [
      {
        key: '/nguoidung/taikhoan',
        title: 'Tài khoản',
        label: <Link to={'/nguoidung/taikhoan'}>Tài khoản</Link>,
      },
      {
        key: '/nguoidung/khachhang',
        title: 'Khách hàng',
        label: <Link to={'/nguoidung/khachhang'}>Khách hàng</Link>,
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
        key: '/dudoan/trandau',
        title: 'Trận đấu',
        label: <Link to={'/dudoan/trandau'}>Trận đấu</Link>,
      },
    ],
  },
  {
    key: '/danhmuc',
    label: 'Danh mục',
    icon: <FolderOpenOutlined />,
    children: [
      {
        key: '/danhmuc/doithidau',
        title: 'Đội thi đấu',
        label: <Link to={'/danhmuc/doithidau'}>Đội thi đấu</Link>,
      },
    ],
  },
]

const RootLayout = () => {
  const dispatch = useDispatch()
  const token = Cookies.get('accessToken')

  // Use custom hooks for cleaner state management
  const {
    tabs,
    activeTab,
    addOrActivateTab,
    switchTab,
    closeTab,
    closeAllTabs,
    closeOtherTabs,
    closeRightTabs,
  } = useTabManager()

  const {
    collapsed,
    selectedKeys,
    openKeys,
    menuTitle,
    toggleCollapsed,
    handleOpenChange,
    handleSelect,
  } = useMenuState(menuItems as any)

  const [isModalChangePassword, setisModalChangePassword] = useState(false)

  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const onSelect = (e: any) => {
    if (e.key.includes('doimatkhau')) return handleOpenChangePassword()

    const menuTitle = e?.item?.props?.title
    const menuPath = e.key

    // Add or activate tab using custom hook
    addOrActivateTab(menuPath, menuTitle)

    // Update menu selection
    handleSelect(menuPath, menuTitle)
  }

  const handleOpenChangePassword = () => {
    setisModalChangePassword(true)
  }

  const handleCloseChangePassword = () => {
    setisModalChangePassword(false)
  }

  useEffect(() => {
    // If we have persisted infoUser in localStorage, hydrate store so header/profile retain values after F5
    try {
      const saved = localStorage.getItem('infoUser')
      if (saved) {
        const parsed = JSON.parse(saved)
        dispatch({ type: USER.DISPATCH_INFO_LOGIN, payload: parsed })
        // Remove loginFirstTime fallback if present
        localStorage.removeItem('loginFirstTime')
        return
      }
    } catch (err) {
      console.warn('Failed to parse persisted user info', err)
    }

    const loginFirstTime = localStorage.getItem('loginFirstTime')
    if (loginFirstTime) localStorage.removeItem('loginFirstTime')
    else if (token) dispatch(updateInfoUserToStore() as any) // fetch info user by access token
  }, [])
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#E97195', // Primary color for all components
          },
          components: {
            Menu: {
              darkItemBg: 'transparent', // transparent background
              darkSubMenuItemBg: 'rgba(0, 0, 0, 0.1)', // slight dark overlay for submenu
              darkPopupBg: '#C3215F', // darker pink popup
              darkItemColor: '#ffffff', // white text
              darkItemSelectedBg: 'rgba(255, 255, 255, 0.3)', // white overlay when selected
              darkItemHoverBg: 'rgba(255, 255, 255, 0.2)', // white overlay on hover
              darkItemSelectedColor: '#ffffff', // white text when selected
              darkItemHoverColor: '#ffffff', // white text on hover
            },
            Button: {
              colorPrimary: '#E97195',
              colorPrimaryHover: '#F4A7C3',
              colorPrimaryActive: '#C3215F',
            },
          },
        }}
      >
        <Layout className='hidden lg:flex'>
          <Sider
            trigger={null}
            width={collapsed ? 80 : 200}
            style={{
              background: 'linear-gradient(180deg, #E97195 0%, #D6497A 100%)',
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
                  <div className='flex items-center justify-center transition-all duration-300'>
                    <img
                      className='w-16 h-16 hover:w-[4.5rem] hover:h-[4.5rem] object-contain transition-all duration-300'
                      src={logo}
                      alt='Logo'
                    />
                  </div>
                </Link>
              ) : (
                <Link to='/'>
                  <img
                    className='w-11 hover:w-[2.85rem] transition-transform duration-300 py-3 img-outline'
                    src={logo}
                    alt='Logo'
                  />
                </Link>
              )}
            </div>
            <Menu
              theme='dark'
              mode='inline'
              selectedKeys={selectedKeys}
              openKeys={openKeys}
              onOpenChange={handleOpenChange}
              onSelect={onSelect}
              items={menuItems}
            />
          </Sider>
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
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
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
                    onClick={toggleCollapsed}
                    style={{
                      fontSize: '16px',
                      width: 64,
                      height: 64,
                      color: '#333333',
                    }}
                  />
                  <div className=' flex flex-col gap-1'>
                    <h2 className='font-custom leading-none text-gray-800'>
                      {menuTitle}
                    </h2>
                  </div>
                </div>
                <div className='px-5'>
                  <div className='flex justify-between items-center '>
                    <ul className=' flex justify-center gap-4 items-center pt-3'>
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
            {/* Tab Bar - Browser-style tabs */}
            <TabBar
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={switchTab}
              onTabClose={closeTab}
              onCloseOthers={closeOtherTabs}
              onCloseAll={closeAllTabs}
              onCloseRight={closeRightTabs}
            />
            <Content
              style={{
                minHeight: 'calc(100vh - 64px - 45px)', // Header(64px) + TabBar(45px)
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
      </ConfigProvider>
    </>
  )
}
export default RootLayout
