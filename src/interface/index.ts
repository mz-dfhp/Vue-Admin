import type { RouteMeta, RouteRecordRaw } from 'vue-router'

export interface IPermission {
  path: string
  title?: string
  sort?: number
  icon?: string
  hide?: boolean
  children?: Array<IPermission>
}

export interface IUserInfo {
  username?: string
  avatar?: string
  role?: string
  permission: Array<IPermission>
}
export interface TBreadcrumb extends
  Omit<RouteMeta, 'title' | 'hide'>,
  Omit<RouteRecordRaw, 'path'> {}
