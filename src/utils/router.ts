import type { RouteMeta, RouteRecordRaw } from 'vue-router'
import type { IPermission } from '@/interface'

/**
 * @description 扁平化路由 生成面包屑
 * @param systemRoutes
 * @returns 扁平化路由
 */
export function flatSystemRoutes(systemRoutes: RouteRecordRaw[], url = '', breadcrumb: RouteMeta['breadcrumb'] = []) {
  const result: RouteRecordRaw[] = []
  systemRoutes.forEach((item) => {
    const path = `${url || ''}/${item.path}`.replace('//', '/')
    const currentCrumb = {
      title: item.meta?.title || '',
      path,
      hide: item.meta?.hide || false,
    }
    const crumbs = [...breadcrumb, currentCrumb]
    result.push({
      ...item,
      path,
      meta: Object.assign(item.meta as RouteMeta, { breadcrumb: crumbs }),
      children: item.children ? flatSystemRoutes(item.children, path, crumbs) : [],
    })
  })
  return result
}

/**
 *
 * @param allRoutes 前端路由
 * @param userRoutes 后端返回角色路由
 * @returns 过滤后的路由
 */
export function diffRoutes(allRoutes: RouteRecordRaw[], userRoutes: IPermission[]): RouteRecordRaw[] {
  const resultRoutes: RouteRecordRaw[] = []
  allRoutes.forEach((item) => {
    userRoutes.forEach((Item) => {
      if (item.path === Item.path) {
        if (item.children?.length && Item.children?.length) {
          item.children = diffRoutes(item.children, Item.children)
        }
        resultRoutes.push(item)
      }
    })
  })
  return resultRoutes
}

/**
 * @description 项目自动生成左侧菜单栏 后期根据后端字段自行修改
 * @param list
 */
export function formatteClientRoutes(list: RouteRecordRaw[], url = '') {
  const result: IPermission[] = []
  list.forEach((item) => {
    const path = `${url || ''}/${item.path}`.replace('//', '/')
    result.push({
      path,
      title: item.meta?.title,
      sort: item.meta?.sort,
      icon: item.meta?.icon,
      hide: item.meta?.hide,
      children: item.children ? formatteClientRoutes(item.children, path) : [],
    })
  })
  return result
}
