import type { RouteRecordRaw } from 'vue-router'
import { cloneDeep } from 'lodash-es'
import type { IPermission, TBreadcrumb } from '@/interface'

/**
 * @description 扁平化路由 生成面包屑
 * @param systemRoutes
 * @returns 扁平化路由
 */
export function flatSystemRoutes(systemRoutes: RouteRecordRaw[]) {
  function flatRoutes(routes: RouteRecordRaw[], routeCrumbs: TBreadcrumb[] = [], url: string) {
    const result: RouteRecordRaw[] = []
    routes.forEach((element) => {
      if (element.meta) {
        element.meta.breadcrumb = [
          ...routeCrumbs,
          {
            path: element.path,
            ...element?.meta,
            title: element?.meta?.title,
            hide: element?.meta?.hide,
          },
        ]
      }
      element.path = `${url ? `${url}/` : ''}${element.path}`
      if (element.children && element.children.length > 0) {
        const cope = cloneDeep(element.children)
        delete element.children
        result.push(...flatRoutes(cope, element?.meta?.breadcrumb, element.path))
      }
      else {
        result.push(element)
      }
    })
    return result
  }
  const resultRoutes = [...systemRoutes]
  resultRoutes.forEach((route: RouteRecordRaw) => {
    if (route.children) {
      route.children.forEach((sonRoute) => {
        const routeCrumbs = [
          {
            path: route.path,
            ...route.meta,
          },
          {
            path: sonRoute.path,
            title: sonRoute?.meta?.title,
            hide: sonRoute?.meta?.hide,
          },
        ]
        if (sonRoute.meta) {
          sonRoute.meta.breadcrumb = routeCrumbs
        }
        if (sonRoute.children) {
          sonRoute.children = flatRoutes(sonRoute.children, routeCrumbs, '')
        }
      })
    }
  })
  return resultRoutes
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
    if (item?.meta?.hide) {
      resultRoutes.push(item)
    }
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
    if (!item.meta?.hide) {
      const path = !url ? item.path : `${url === '/' ? '' : `${url}/`}${item.path}`
      result.push({
        path,
        title: item.meta?.title,
        sort: item.meta?.sort,
        icon: item.meta?.icon,
        children: item.children ? formatteClientRoutes(item.children, path) : undefined,
      })
    }
  })
  return result
}
