import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import route from './router/index'
import pinia from '@/store'
import 'element-plus/dist/index.css'
import 'normalize.css'
import './styles/index.scss'
// @ts-ignore
import 'virtual:svg-icons-register'
import ScBaseComponentsRegister from '@/components/ScBaseComponents/register.ts'

const app = createApp(App)

app.use(ElementPlus, {
  locale: zhCn
})
app.use(route)
app.use(pinia)

// 组件注册
app.use(ScBaseComponentsRegister)

app.mount('#app')
