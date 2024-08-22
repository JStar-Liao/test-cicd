import fs from 'fs'
import { resolve } from 'path'

const copyScssFiles = async () => {
  return new Promise((r) => {
    const scssPath = resolve('packages/components/style/element-plus')
    const dirPath = resolve('packages/ComponentsLib/dist/element-plus')
    fs.stat(dirPath, async (err) => {
      if (err) {
        await fs.mkdirSync(dirPath)
      }
      const res = await fs.readdirSync(scssPath)
      if (res.length) {
        for (let i of res) {
          console.log(i)
          await fs.copyFileSync(scssPath + '/' + i, dirPath + '/' + i)
        }
      }
      r()
    })
  })
}

export default copyScssFiles