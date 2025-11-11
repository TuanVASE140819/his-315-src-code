import { ComponentType } from 'react'

export interface RouteConfig {
  index?: boolean
  path: string
  Component: ComponentType<any>
  isLayout?: boolean
  isAuth?: boolean
  redirectPath?: string
}
