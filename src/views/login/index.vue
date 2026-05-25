<script setup lang="ts">
import { useUserStore } from '@/store/modules/user-store.ts'
import type { LocationQueryValue } from 'vue-router'
import { ScMessage } from '@/utils/ElUtils'
import { safeRequest } from '@/utils/safeRequest.ts'
import loginLogo from '@/assets/login/loginLogo.png'
import { Hide, Lock, User, View } from '@element-plus/icons-vue'

type LoginFrom = {
  username: string
  password: string
  rememberMe: boolean
}

const route = useRoute()
const router = useRouter()

const loginForm = reactive<LoginFrom>({
  username: '',
  password: '',
  rememberMe: false
})

const showPassword = ref<boolean>(false)

const descriptionText: Array<{ content: string }> = [
  { content: '测：直指"赛辰测评"核心场景；' },
  { content: '捷：体现"快捷、高效"，双率提升；' },
  { content: '通：寓意"流程贯通、数据打通、一键通行"，契合自动化' },
  { content: '报告与归档的闭环能力' }
]

const redirect = ref<LocationQueryValue | LocationQueryValue[]>('')

watch(
  route,
  newRoute => {
    redirect.value = newRoute.query && newRoute.query.redirect
  },
  { immediate: true }
)

const loading = ref<boolean>(false)

const handleLogin = async () => {
  if (!loginForm.username || !loginForm.username.trim()) {
    ScMessage.warning('请输入账号')
    return
  }
  if (!loginForm.password || !loginForm.password.trim()) {
    ScMessage.warning('请输入密码')
    return
  }
  loading.value = true
  const [err, _] = await safeRequest(useUserStore().handleLogin(loginForm), {
    message: '登录失败！'
  })
  if (err) {
    loading.value = false
    return
  }
  loading.value = false
  const query = route.query
  const otherQueryParams = Object.keys(query).reduce((acc: Record<string, any>, cur) => {
    if (cur !== 'redirect') {
      acc[cur] = query[cur]
    }
    return acc
  }, {})

  await router.push({
    path: (redirect.value as string) || '/',
    query: otherQueryParams
  })
}
</script>

<template>
  <div class="login-container">
    <div class="login-panel">
      <div class="left-content">
        <img class="logo" :src="loginLogo" alt="logo" />
        <h1 class="system-title">测评过程合规管理系统</h1>
      </div>
      <h2 class="login-title">测捷通</h2>
      <div class="login-form">
        <form class="form-content" @submit.prevent="handleLogin">
          <div class="input-wrapper form-item-size">
            <el-icon class="input-icon" :size="25">
              <User />
            </el-icon>
            <input
              type="text"
              class="login-input"
              placeholder="请输入账号"
              v-model="loginForm.username"
              @keyup.enter="handleLogin"
            />
          </div>
          <div class="input-wrapper form-item-size">
            <el-icon class="input-icon" :size="25">
              <Lock />
            </el-icon>
            <input
              :type="showPassword ? 'text' : 'password'"
              class="login-input"
              placeholder="请输入密码"
              v-model="loginForm.password"
              @keyup.enter="handleLogin"
            />
            <el-icon class="password-icon" :size="25" @click="showPassword = !showPassword">
              <View v-if="!showPassword" />
              <Hide v-else />
            </el-icon>
          </div>
          <button
            type="button"
            class="login-button form-item-size"
            :class="{ 'is-loading': loading }"
            :disabled="loading"
            @click="handleLogin"
          >
            <span v-if="!loading">登录</span>
            <span v-else class="loading-text">
              <span class="loading-spinner"></span>
              登录中...
            </span>
          </button>
          <div class="description-text">
            <p v-for="(item, index) in descriptionText" :key="index">
              {{ item.content }}
            </p>
          </div>
        </form>
      </div>
      <h3 class="copyright">广州赛辰数字化科技集团有限公司</h3>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.form-item-size {
  width: 100%;
  height: 50px;
}

.login-container {
  width: 100vw;
  height: 100vh;
  min-width: 1280px;
  background: url('@/assets/login/loginBackground.png') no-repeat center center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
  .login-panel {
    width: 1406px;
    height: 848px;
    border-radius: 20px;
    background: url('@/assets/login/panelBackground.png') no-repeat;
    background-position: center right 75px;
    background-size: contain;
    position: relative;
    flex-shrink: 0;
    margin: auto;
    .left-content {
      width: 100%;
      height: 100%;
      position: absolute;
      .logo {
        position: absolute;
        left: 175px;
        top: 120px;
        width: 115px;
        height: 56px;
      }
      .system-title {
        position: absolute;
        left: 210px;
        top: 290px;
        font-size: 35px;
        font-weight: bold;
        color: #ffffff;
        margin: 0;
        letter-spacing: 2px;
      }
    }
    .login-title {
      position: absolute;
      top: 175px;
      right: 380px;
      font-size: 40px;
      font-weight: bold;
      color: #025ca5;
      letter-spacing: 10px;
      margin: 0;
    }
    .login-form {
      position: absolute;
      right: 250px;
      top: 275px;
      height: 45%;
      .form-content {
        display: flex;
        flex-direction: column;
        gap: 35px;
        .input-wrapper {
          position: relative;
          .input-icon {
            position: absolute;
            left: 33px;
            top: 50%;
            transform: translateY(-50%);
            color: #b9bed1;
          }
          .password-icon {
            position: absolute;
            right: 33px;
            top: 50%;
            transform: translateY(-50%);
            color: #b9bed1;
            cursor: pointer;
            &:hover {
              color: #025ca5;
            }
          }
        }
        .login-input {
          width: 100%;
          height: 100%;
          border: 2px solid #bbc0d2;
          border-radius: 37px;
          background-color: #ffffff;
          padding: 0 65px;
          box-sizing: border-box;
          font-size: 18px;
          color: #000000;
          outline: none;
          &::placeholder {
            color: #b9bed1;
            font-size: 18px;
          }
          &:focus {
            border-color: #025ca5;
          }
        }
        .login-button {
          border-radius: 37px;
          background-color: #025ca5;
          color: #ffffff;
          font-size: 24px;
          border: none;
          cursor: pointer;
          transition: opacity 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          &:hover:not(:disabled) {
            opacity: 0.9;
          }
          &:active:not(:disabled) {
            opacity: 0.8;
          }
          &:disabled {
            cursor: not-allowed;
            opacity: 0.7;
          }
          &.is-loading {
            cursor: not-allowed;
          }
          // Loading 文字容器
          .loading-text {
            display: flex;
            align-items: center;
            gap: 8px;
          }
          // Loading 旋转动画
          .loading-spinner {
            width: 16px;
            height: 16px;
            border: 2px solid #ffffff;
            border-top-color: transparent;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
          }
        }
        .description-text {
          text-align: left;
          align-self: flex-start;
          margin-top: 20px;
          p {
            margin: 0;
            font-size: 16px;
            font-weight: bold;
            color: #000000;
            line-height: 26px;
            &:not(:last-child) {
              margin-bottom: 5px;
            }
          }
        }
      }
    }
    .copyright {
      position: absolute;
      font-size: 22px;
      letter-spacing: 2px;
      color: #025ca5;
      right: 255px;
      bottom: 105px;
    }
  }
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
