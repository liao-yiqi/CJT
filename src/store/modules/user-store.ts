import { loginApi, logout } from '@/api/login-api.ts'
import { getUserInfo } from '@/api/system/user-api.ts'
import type { UserState, LoginFormData } from '@/types/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { encryptWithSM4, encryptWithSm2, generateRandomSymmetricKey } from '@/utils/jsencrypt'
import defaultAvatar from '@/assets/images/defaultAvatar.png'

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    permissions: [],
    nickName: '',
    loginTime: ''
  }),
  actions: {
    handleLogin(loginFormData: LoginFormData) {
      // 生成随机对称密钥、IV
      const { symmetricKey, iv } = generateRandomSymmetricKey()
      // 使用公钥对对称密钥进行非对称加密
      const encryptedSymmetricKey = encryptWithSm2(symmetricKey)
      // 使用对称密钥对密码进行加密
      const encryptedPassword = encryptWithSM4(loginFormData.password, symmetricKey, iv)
      const params: LoginFormData = {
        username: loginFormData.username,
        password: encryptedPassword,
        symmetricKey: encryptedSymmetricKey,
        iv,
        code: loginFormData.code,
        uuid: loginFormData.uuid
      }
      return new Promise((resolve, reject) => {
        loginApi(params)
          .then(res => {
            setToken(res.token)
            this.token = res.token
            resolve(res)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    handleGetUserInfo() {
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then(res => {
            const { userName, avatar, nickName } = res.user
            const userAvatar =
              avatar && avatar.trim() ? import.meta.env.VITE_APP_BASE_API + avatar : defaultAvatar
            if (res.roles && res.roles.length !== 0) {
              this.roles = res.roles
              this.permissions = res.permissions
            } else {
              this.roles = ['ROLE_DEFAULT']
            }
            this.name = userName
            this.nickName = nickName
            this.avatar = userAvatar
            resolve(res)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    handleLogout() {
      return new Promise(resolve => {
        logout().finally(() => {
          this.token = ''
          this.roles = []
          this.permissions = []
          removeToken()
          resolve(true)
        })
      })
    }
  }
})
