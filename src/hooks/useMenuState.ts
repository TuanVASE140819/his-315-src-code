import { useState, useCallback, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useLocalStorage } from './useLocalStorage'
import type { MenuProps } from 'antd'

const MENU_STORAGE = {
  SELECTED_KEYS: 'app:menuSelectedKeys',
  OPEN_KEYS: 'app:menuOpenKeys',
  COLLAPSED: 'app:siderCollapsed',
}
export function useMenuState(menuItems: MenuProps['items']) {
  const location = useLocation()

  const [collapsed, setCollapsed] = useLocalStorage<boolean>(
    MENU_STORAGE.COLLAPSED,
    false,
  )

  const [selectedKeys, setSelectedKeys] = useLocalStorage<string[]>(
    MENU_STORAGE.SELECTED_KEYS,
    [],
  )

  const [openKeys, setOpenKeys] = useLocalStorage<string[]>(
    MENU_STORAGE.OPEN_KEYS,
    [],
  )

  const [menuTitle, setMenuTitle] = useState<string | null>(null)

  /**
   * Toggle sidebar collapsed state
   */
  const toggleCollapsed = useCallback(() => {
    setCollapsed((prev) => !prev)
  }, [setCollapsed])

  /**
   * Handle menu open/close
   */
  const handleOpenChange = useCallback(
    (keys: string[]) => {
      setOpenKeys(keys)
    },
    [setOpenKeys],
  )

  /**
   * Handle menu item selection
   */
  const handleSelect = useCallback(
    (menuPath: string, title?: string) => {
      setSelectedKeys([menuPath])
      setMenuTitle(title || null)
    },
    [setSelectedKeys],
  )

  /**
   * Sync menu state with current route
   */
  useEffect(() => {
    const path = location.pathname
    // items coming from AntD can include divider/menu types without keys
    const openSub = (menuItems as any[])?.find(
      (mi: any) =>
        typeof mi?.key === 'string' && path?.includes(String(mi.key)),
    )
    const openItem = (openSub?.children as any[])?.find(
      (c: any) => typeof c?.key === 'string' && path?.includes(String(c.key)),
    )

    const derivedOpen = openSub?.key ? [String(openSub.key)] : []
    const derivedSelected = openItem?.key ? [String(openItem.key)] : []

    // Only update selectedKeys if it actually changed
    if (derivedSelected.length > 0 && derivedSelected[0] !== selectedKeys[0]) {
      setSelectedKeys(derivedSelected)
    }

    // Only update openKeys when derived value differs to avoid
    // overwriting user interactions (opening/closing submenus)
    if (derivedOpen.length > 0) {
      if (openKeys[0] !== derivedOpen[0]) {
        setOpenKeys(derivedOpen)
      }
    }

    setMenuTitle(
      openSub && openItem
        ? `${openSub?.label} / ${openItem?.title}`
        : 'Trang chủ',
    )
  }, [
    location.pathname,
    menuItems,
    selectedKeys,
    openKeys,
    setSelectedKeys,
    setOpenKeys,
  ])

  return {
    collapsed,
    selectedKeys,
    openKeys,
    menuTitle,
    toggleCollapsed,
    handleOpenChange,
    handleSelect,
  }
}
