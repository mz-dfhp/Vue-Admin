import type { IUserInfo } from '@/interface'
import { asyncRoutes } from '@/router/asyncRoutes'
import { formatteClientRoutes } from '@/utils/router'

export function getUserInfo(role: string) {
  return new Promise<IUserInfo>((resolve) => {
    resolve(getRole(role))
  })
  function getRole(role: string): IUserInfo {
    let filterPath: string[] = []
    if (role !== 'admin') {
      filterPath = ['/component']
    }
    const userInfo = {
      username: 'admin',
      age: 18,
      role,
      avatar: role === 'admin' ? 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png' : 'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
      permission: formatteClientRoutes(asyncRoutes).filter(
        item => !filterPath.includes(item.path),
      ),
    }
    return userInfo
  }
}
