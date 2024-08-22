import { build, defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import dts from "vite-plugin-dts"
import chalk from "chalk"

/* 打包方法配置 */
const viteMethodsPackDeploy = {
  plugins: [
    vue(),
    dts({
      include: [ 'packages/utils' ],
      tsConfigFilePath: './tsconfig.json',
      outputDir: 'packages/MethodsLib/dist/types'
    })
  ],
  build: {
    lib: {
      entry: 'packages/utils/index.ts',
      name: 'MethodsLib',
      fileName: (format) => `index.${format === 'cjs' ? format : 'js'}`,
      /* es和common */
      formats: [ "es", "cjs" ]
    },
    outDir: 'packages/MethodsLib/dist'
  }
}

const step = (text, color) => console.log(chalk[color](text))
const run = async () => {
  /* 打包方法 */
  step("开始打包方法", 'green')
  await build(defineConfig(viteMethodsPackDeploy))
  step("方法打包完成", 'green')
}

run()
