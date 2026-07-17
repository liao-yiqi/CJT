export type TreeMenuData = {
  id: string
  label: string
  disabled: boolean
  children: Array<TreeMenuData>
}

export type TreeMenuDataByRoleId = {
  menus: Array<TreeMenuData>
  checkedKeys: Array<number>
} & BaseResponse
