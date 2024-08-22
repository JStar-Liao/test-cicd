import { App } from 'vue'
export const withInstall = (comp: any) => {
  comp.install = (app: App) => {
    app.component(comp.name, comp )
  }

  return comp
}