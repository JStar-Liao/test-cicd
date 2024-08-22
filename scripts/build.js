import { build, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import chalk from 'chalk'

import copyScssFiles from './copyScssFiles.js'
import buildCss from './buildCss.js'

/* 打包组件配置 */
const viteCompPackDeploy = {
  plugins: [
    vue(),
    dts({
      include: [ 'packages/components' ],
      exclude: [ 'packages/**/test' ],
      tsConfigFilePath: 'tsconfig.json',
      outputDir: 'packages/ComponentsLib/dist/types'
    })
  ],
  build: {
    lib: {
      entry: 'packages/components/index.ts',
      name: 'ComponentsLib',
      fileName: (format) => `index.${format === 'cjs' ? 'js' : 'mjs'}`,
      /* es和common */
      formats: [ 'es', 'cjs' ]
    },
    outDir: 'packages/ComponentsLib/dist',
    // outDir: 'es',
    rollupOptions: {
      external: [ 'vue', 'element-plus' ],
    }
  }
}

const step = (text, color) => console.log(chalk[color](text))
const run = async () => {
  /* 打包组件 */
  step('开始打包组件', 'yellow')
  await build(defineConfig(viteCompPackDeploy))
  step('组件打包完成', 'yellow')
  /* 复制自定义的element颜色 */
  step('开始复制element-plus-scss', 'blue')
  await copyScssFiles()
  step('element-plus-scss复制结束', 'blue')
  /* 样式分离并可按需加载*/
  step('开始分离组件样式', 'red')
  await buildCss()
  step('分离组件样式完成', 'red')
}

run()
