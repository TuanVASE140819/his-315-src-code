import React, { useCallback, memo } from 'react'
import { CloseOutlined, HomeOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { Dropdown } from 'antd'
import type { MenuProps } from 'antd'

export interface Tab {
  key: string
  title: string
  path: string
  closable?: boolean
}

interface TabBarProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (key: string) => void
  onTabClose: (key: string) => void
  onCloseOthers?: (key: string) => void
  onCloseAll?: () => void
  onCloseRight?: (key: string) => void
}

const TabBar: React.FC<TabBarProps> = memo(
  ({
    tabs,
    activeTab,
    onTabChange,
    onTabClose,
    onCloseOthers,
    onCloseAll,
    onCloseRight,
  }) => {
    const navigate = useNavigate()

    const handleTabClick = useCallback(
      (tab: Tab, e: React.MouseEvent) => {
        // Middle click to close tab
        if (e.button === 1 && tab.closable !== false) {
          e.preventDefault()
          onTabClose(tab.key)
          return
        }

        // Left click to switch tab
        if (e.button === 0) {
          onTabChange(tab.key)
          navigate(tab.path)
        }
      },
      [onTabChange, onTabClose, navigate],
    )

    const handleCloseTab = useCallback(
      (e: React.MouseEvent, tabKey: string) => {
        e.stopPropagation()
        onTabClose(tabKey)
      },
      [onTabClose],
    )

    const handleContextMenu = useCallback((e: React.MouseEvent) => {
      e.preventDefault()
      // Context menu is handled by Ant Design Dropdown
    }, [])

    const handleCloseContextMenu = useCallback(() => {
      // Not needed with Ant Design Dropdown
    }, [])

    const getContextMenuItems = useCallback(
      (tabKey: string): MenuProps['items'] => {
        const tab = tabs.find((t) => t.key === tabKey)
        const tabIndex = tabs.findIndex((t) => t.key === tabKey)
        const hasRightTabs = tabIndex < tabs.length - 1
        const hasOtherTabs = tabs.length > 1
        const isClosable = tab?.closable !== false

        return [
          {
            key: 'close',
            label: 'Đóng tab',
            disabled: !isClosable,
            onClick: () => {
              onTabClose(tabKey)
              handleCloseContextMenu()
            },
          },
          {
            key: 'close-others',
            label: 'Đóng các tab khác',
            disabled: !hasOtherTabs || !onCloseOthers,
            onClick: () => {
              onCloseOthers?.(tabKey)
              handleCloseContextMenu()
            },
          },
          {
            key: 'close-right',
            label: 'Đóng tab bên phải',
            disabled: !hasRightTabs || !onCloseRight,
            onClick: () => {
              onCloseRight?.(tabKey)
              handleCloseContextMenu()
            },
          },
          {
            type: 'divider',
          },
          {
            key: 'close-all',
            label: 'Đóng tất cả tab',
            disabled: !onCloseAll,
            onClick: () => {
              onCloseAll?.()
              handleCloseContextMenu()
            },
          },
        ]
      },
      [
        tabs,
        onTabClose,
        onCloseOthers,
        onCloseRight,
        onCloseAll,
        handleCloseContextMenu,
      ],
    )

    return (
      <>
        <div className='flex items-center bg-gray-50 border-b border-gray-200 px-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent'>
          <div className='flex items-center gap-1 py-1.5'>
            {tabs.map((tab) => {
              const isActive = tab.key === activeTab
              return (
                <Dropdown
                  key={tab.key}
                  menu={{ items: getContextMenuItems(tab.key) }}
                  trigger={['contextMenu']}
                >
                  <div
                    onClick={(e) => handleTabClick(tab, e)}
                    onMouseDown={(e) => {
                      // Handle middle click
                      if (e.button === 1 && tab.closable !== false) {
                        e.preventDefault()
                        onTabClose(tab.key)
                      }
                    }}
                    onContextMenu={handleContextMenu}
                    className={`
                    group relative flex items-center gap-2 px-4 py-2 min-w-[100px] max-w-[180px]
                    cursor-pointer transition-all duration-150 rounded-t-lg
                    ${
                      isActive
                        ? 'bg-white text-[#E97195] font-medium shadow-md border-t-2 border-[#E97195] -mb-[1px]'
                        : 'bg-transparent text-gray-600 hover:bg-white/50 border-t-2 border-transparent'
                    }
                  `}
                  >
                    {tab.key === 'home' && (
                      <HomeOutlined
                        className={`text-base flex-shrink-0 ${isActive ? 'text-[#E97195]' : 'text-gray-500'}`}
                      />
                    )}
                    <span className='truncate flex-1 text-sm leading-tight'>
                      {tab.title}
                    </span>
                    {tab.closable !== false && tabs.length > 1 && (
                      <div
                        className={`
                        flex-shrink-0 ml-1 p-1 rounded-full transition-all
                        ${
                          isActive
                            ? 'text-gray-400 hover:text-[#E97195] hover:bg-pink-50'
                            : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                        }
                        opacity-0 group-hover:opacity-100
                      `}
                        onClick={(e) => handleCloseTab(e, tab.key)}
                      >
                        <CloseOutlined className='text-xs' />
                      </div>
                    )}
                  </div>
                </Dropdown>
              )
            })}
          </div>
        </div>
      </>
    )
  },
)

TabBar.displayName = 'TabBar'

export default TabBar
