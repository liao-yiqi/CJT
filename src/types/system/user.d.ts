import type { SystemRoleData } from '@/types/system/role/systemRole'
import type { PostData } from '@/types/system/post'

export type UserSearchParams = {
  userName: string
  phonenumber: string
  deptId: string | number
  status: string
  dateRange: string
}

export type UserData = {
  userId: number
  userName: string
  nickName: string
  dept: string
  phonenumber: string
  status: string
  createTime: string
}

export type UserDetailDataByUserId = {
  postIds: Array<number>
  roleIds: Array<number>
  data: UserData
}

export type UserFormData = {
  nickName: string
  deptId: string | number
  phonenumber: string
  email: string
  userName: string
  sex: string
  status: string
  postIds: Array<string | number>
  roleIds: Array<string | number>
  remark: string
}

export type UserDeptTreeSelectData = {
  id: number
  parentId: number
  label: string
  weight: string
  children: Array<UserDeptTreeSelectData>
}

export type UserDetailData = {
  roles: Array<SystemRoleData>
  posts: Array<Omit<PostData, keyof CommonTableData>>
} & BaseResponse
