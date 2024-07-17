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
