export * from './collect'

import './style/element-plus/common.scss'
import * as components from './collect'
import { App } from 'vue'

export default {
  install: (app: App) => {
    for (const c in components) {
      app.use((components as { [x: string]: any })[c])
    }
  }
}