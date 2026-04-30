import type { App } from 'vue'

import * as ScBaseComponents from './index'

const ScBaseComponentsRegister = {
  install(app: App) {
    Object.entries(ScBaseComponents).forEach(([key, component]) => {
      if (!component) return
      app.component(key, component as Component)
    })
  }
}

export default ScBaseComponentsRegister
