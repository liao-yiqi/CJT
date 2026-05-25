import { useUserStore } from '@/store/modules/user.ts'

const ADMIN_PERMISSION = '*:*:*'

export const usePermission = () => {
  const hasPermission = (permission?: string | Array<string>): boolean => {
    if (!permission) return true
    const allPermission = useUserStore().permissions
    if (allPermission[0] == ADMIN_PERMISSION) return true
    if (Array.isArray(permission)) {
      return permission.some(i => allPermission.includes(i))
    }
    return allPermission.includes(permission)
  }
  return { hasPermission }
}
