import type { TBreadcrumb } from '@/interface'

interface CustomRouteMeta {
  title: string
  icon?: string
  keepAlive?: boolean
  activeMenu?: string
  hide?: boolean
  sort?: number
  breadcrumb?: TBreadcrumb
}

declare module 'vue-router' {
  interface RouteMeta extends CustomRouteMeta {}
}
