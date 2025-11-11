import React from 'react'
import { Spin } from 'antd'
import { useAppSelector } from '../../redux/store/hooks'

const LoadingPage = () => {
  const { isLoadingScreen } = useAppSelector((state) => state.Common)
  return <Spin size='large' spinning={isLoadingScreen} fullscreen />
}

export default LoadingPage
