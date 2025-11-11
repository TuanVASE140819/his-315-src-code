import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Tab } from '../components/common/TabBar'
import { useLocalStorage } from './useLocalStorage'

const MENU_STORAGE = {
  TABS: 'app:openTabs',
  ACTIVE_TAB: 'app:activeTab',
}

const DEFAULT_HOME_TAB: Tab = {
  key: 'home',
  title: 'Trang chủ',
  path: '/',
  closable: false,
}

export function useTabManager() {
  const navigate = useNavigate()

  const [tabs, setTabs] = useLocalStorage<Tab[]>(MENU_STORAGE.TABS, [
    DEFAULT_HOME_TAB,
  ])

  const [activeTab, setActiveTab] = useLocalStorage<string>(
    MENU_STORAGE.ACTIVE_TAB,
    'home',
  )

  /**
   * Add a new tab or activate existing tab
   */
  const addOrActivateTab = useCallback(
    (path: string, title: string) => {
      const existingTab = tabs.find((tab) => tab.path === path)

      if (existingTab) {
        // Tab already exists, just activate it
        setActiveTab(existingTab.key)
      } else {
        // Create new tab
        const newTab: Tab = {
          key: `tab-${Date.now()}`,
          title: title || 'Trang mới',
          path: path,
          closable: true,
        }
        setTabs([...tabs, newTab])
        setActiveTab(newTab.key)
      }
    },
    [tabs, setTabs, setActiveTab],
  )

  /**
   * Switch to a specific tab
   */
  const switchTab = useCallback(
    (tabKey: string) => {
      const tab = tabs.find((t) => t.key === tabKey)
      if (tab) {
        setActiveTab(tabKey)
        navigate(tab.path)
      }
    },
    [tabs, setActiveTab, navigate],
  )

  /**
   * Close a specific tab
   */
  const closeTab = useCallback(
    (tabKey: string) => {
      const tabIndex = tabs.findIndex((t) => t.key === tabKey)
      if (tabIndex === -1) return

      const newTabs = tabs.filter((t) => t.key !== tabKey)

      // If closing active tab, switch to another tab
      if (activeTab === tabKey) {
        let nextActiveTab = 'home'
        if (newTabs.length > 0) {
          // Switch to previous tab or next tab
          const nextTab = newTabs[tabIndex - 1] || newTabs[0]
          nextActiveTab = nextTab.key
          navigate(nextTab.path)
        } else {
          navigate('/')
        }
        setActiveTab(nextActiveTab)
      }

      setTabs(newTabs)
    },
    [tabs, activeTab, setTabs, setActiveTab, navigate],
  )

  /**
   * Close all tabs except home
   */
  const closeAllTabs = useCallback(() => {
    setTabs([DEFAULT_HOME_TAB])
    setActiveTab('home')
    navigate('/')
  }, [setTabs, setActiveTab, navigate])

  /**
   * Close other tabs (keep current tab and home)
   */
  const closeOtherTabs = useCallback(
    (currentTabKey: string) => {
      const currentTab = tabs.find((t) => t.key === currentTabKey)
      if (!currentTab) return

      const newTabs = tabs.filter(
        (t) => t.key === 'home' || t.key === currentTabKey,
      )
      setTabs(newTabs)
    },
    [tabs, setTabs],
  )

  /**
   * Close tabs to the right of specified tab
   */
  const closeRightTabs = useCallback(
    (currentTabKey: string) => {
      const tabIndex = tabs.findIndex((t) => t.key === currentTabKey)
      if (tabIndex === -1) return

      const newTabs = tabs.slice(0, tabIndex + 1)
      setTabs(newTabs)

      // If active tab was closed, switch to the current tab
      const stillExists = newTabs.find((t) => t.key === activeTab)
      if (!stillExists) {
        setActiveTab(currentTabKey)
        const currentTab = tabs.find((t) => t.key === currentTabKey)
        if (currentTab) {
          navigate(currentTab.path)
        }
      }
    },
    [tabs, activeTab, setTabs, setActiveTab, navigate],
  )

  return {
    tabs,
    activeTab,
    addOrActivateTab,
    switchTab,
    closeTab,
    closeAllTabs,
    closeOtherTabs,
    closeRightTabs,
  }
}
