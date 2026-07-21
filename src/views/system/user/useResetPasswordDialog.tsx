import { resetUserPasswordAPI } from '@/api/system/user-api.ts'
import ScDialog from '@/components/ScDialog'
import ScInput from '@/components/ScBaseFormItems/ScInput'
import type { UserData } from '@/types/system/user'
import { safeRequest } from '@/utils/safeRequest.ts'
import {
  ElForm,
  ElFormItem,
  ElNotification,
  type FormInstance,
  type FormRules
} from 'element-plus'
import { defineComponent, h, nextTick, reactive, ref } from 'vue'

type ResetPasswordFormData = {
  userId: number
  userName: string
  password: string
}

const resetPasswordRules: FormRules<ResetPasswordFormData> = {
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      min: 5,
      max: 20,
      message: '密码长度需在5到20个字符之间',
      trigger: 'blur'
    },
    {
      pattern: /^[^<>"'|\\]*$/,
      message: '密码不能包含非法字符',
      trigger: 'blur'
    }
  ]
}

export const useResetPasswordDialog = () => {
  const visible = ref(false)
  const confirmLoading = ref(false)
  const formRef = ref<FormInstance>()
  const formData = reactive<ResetPasswordFormData>({
    userId: 0,
    userName: '',
    password: ''
  })

  const open = async (row: UserData) => {
    formData.userId = row.userId
    formData.userName = row.userName
    formData.password = ''
    visible.value = true
    await nextTick(() => formRef.value?.clearValidate())
  }

  const handleConfirm = async () => {
    const valid = await formRef.value?.validate().catch(() => false)
    if (!valid) return

    confirmLoading.value = true
    try {
      const [err] = await safeRequest(
        resetUserPasswordAPI(formData.userId, formData.password)
      )
      if (err) return

      visible.value = false
      ElNotification({ type: 'success', message: '密码重置成功' })
    } finally {
      confirmLoading.value = false
    }
  }

  const handleClosed = () => {
    formData.password = ''
    formRef.value?.clearValidate()
  }

  const ResetPasswordDialog = defineComponent({
    name: 'ResetPasswordDialog',
    setup() {
      return () =>
        h(
          ScDialog,
          {
            modelValue: visible.value,
            'onUpdate:modelValue': (value: boolean) => {
              visible.value = value
            },
            title: '重置密码',
            dialogWidth: '480px',
            confirmLoading: confirmLoading.value,
            autoHeight: true,
            onConfirm: handleConfirm,
            onClosed: handleClosed
          },
          {
            default: () => [
              h(
                'p',
                {
                  style: {
                    margin: '12px 0 20px',
                    color: 'var(--el-text-color-regular)'
                  }
                },
                `正在为用户“${formData.userName}”重置密码`
              ),
              h(
                ElForm,
                {
                  ref: formRef,
                  model: formData,
                  rules: resetPasswordRules,
                  labelPosition: 'top'
                },
                {
                  default: () =>
                    h(
                      ElFormItem,
                      { label: '新密码', prop: 'password' },
                      {
                        default: () =>
                          h(ScInput, {
                            modelValue: formData.password,
                            'onUpdate:modelValue': value => {
                              formData.password = String(value)
                            },
                            type: 'password',
                            placeholder: `请输入${formData.userName}的新密码`,
                            maxLength: 20
                          })
                      }
                    )
                }
              )
            ]
          }
        )
    }
  })

  return { ResetPasswordDialog, open }
}
