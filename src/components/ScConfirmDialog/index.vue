<script setup lang="ts">
import { WarningFilled } from '@element-plus/icons-vue'

interface ScConfirmDialogProps {
  title?: string
  message?: string
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void | Promise<void>
  onCancel?: () => void
  onClose?: () => void
}

const props = withDefaults(defineProps<ScConfirmDialogProps>(), {
  title: '确认删除',
  message: '此操作不可撤销，确定要删除吗？',
  confirmText: '确认删除',
  cancelText: '取消'
})

const visible = ref(false)
const loading = ref(false)

onMounted(() => {
  // 挂载后触发动画
  requestAnimationFrame(() => {
    visible.value = true
  })
})

const handleClose = () => {
  visible.value = false
  setTimeout(() => {
    props.onClose?.()
  }, 220)
}

const handleCancel = () => {
  props.onCancel?.()
  handleClose()
}

const handleConfirm = async () => {
  loading.value = true
  try {
    await props.onConfirm?.()
    handleClose()
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <Transition name="sc-confirm">
    <div v-if="visible" class="sc-confirm-overlay" @click.self="handleCancel">
      <div
        class="sc-confirm-card"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="'sc-confirm-title'"
      >
        <!-- 标题区域 -->
        <div class="sc-confirm-header">
          <el-icon class="sc-confirm-header__icon">
            <WarningFilled />
          </el-icon>
          <span :id="'sc-confirm-title'" class="sc-confirm-header__title">{{ title }}</span>
        </div>

        <!-- 分割线 -->
        <div class="sc-confirm-divider" />

        <!-- 内容区域 -->
        <div class="sc-confirm-body">
          <p class="sc-confirm-body__message">{{ message }}</p>
        </div>

        <!-- 操作区域 -->
        <div class="sc-confirm-footer">
          <el-button class="sc-confirm-footer__cancel" @click="handleCancel">
            {{ cancelText }}
          </el-button>
          <el-button
            type="danger"
            class="sc-confirm-footer__confirm"
            :loading="loading"
            @click="handleConfirm"
          >
            {{ confirmText }}
          </el-button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.sc-confirm-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(2px);
}

.sc-confirm-card {
  width: 420px;
  border-radius: 10px;
  overflow: hidden;
  background-color: #ffffff;
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.25),
    0 4px 16px rgba(0, 0, 0, 0.12);
}

// ---- 标题区 ----
.sc-confirm-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 18px 24px;
  background-color: #1e2536;

  &__icon {
    font-size: 20px;
    color: #f59e0b;
    flex-shrink: 0;
  }

  &__title {
    font-size: 15px;
    font-weight: 600;
    color: #ffffff;
    letter-spacing: 0.3px;
  }
}

// ---- 分割线 ----
.sc-confirm-divider {
  height: 3px;
  background: linear-gradient(90deg, #e53e3e 0%, #f56565 50%, #e2e8f0 100%);
}

// ---- 内容区 ----
.sc-confirm-body {
  padding: 28px 24px 20px;

  &__message {
    margin: 0;
    font-size: 14px;
    line-height: 1.65;
    color: #4a5568;
    text-align: center;
  }
}

// ---- 操作区 ----
.sc-confirm-footer {
  display: flex;
  justify-content: center;
  gap: 12px;
  padding: 4px 24px 24px;

  &__cancel {
    min-width: 88px;
  }

  &__confirm {
    min-width: 104px;
  }
}

// ---- 过渡动画 ----
.sc-confirm-enter-active,
.sc-confirm-leave-active {
  transition: opacity 0.2s ease;

  .sc-confirm-card {
    transition:
      transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1),
      opacity 0.2s ease;
  }
}

.sc-confirm-enter-from,
.sc-confirm-leave-to {
  opacity: 0;

  .sc-confirm-card {
    transform: scale(0.92);
    opacity: 0;
  }
}
</style>
