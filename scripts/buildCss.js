// const sass = require("sass")
// const fs = require("fs")
// const path = require('path')
// const glob = require("fast-glob")
// const chalk = require('chalk')
import sass from 'sass'
import fs from 'fs'
import { resolve } from 'path'
import glob from 'fast-glob'
import chalk from 'chalk'

const step = (text, color) => console.log(chalk[color](text))
const outPath = resolve('packages/ComponentsLib/dist/style')

const buildCss = async () => {
  const files = await glob('packages/components/**/*.scss', { onlyFiles: true })
  const filesInfo = files.map((item) => {
    const list = item.split('/')
    const listLength = list.length
    let name = list[listLength - 2] + '.css'
    if (name === 'element-plus.css') {
      name = (list[listLength - 1].replace('.scss', '')) + '.css'
    }
    return {
      name,
      path: item
    }
  })
  return new Promise((r) => {
    fs.stat(outPath, async (err) => {
      if (err) {
        await fs.mkdirSync(outPath)
      }

      for (let i of filesInfo) {
        const css = await sass.renderSync({ file: i.path, outputStyle: 'compressed' })
        await fs.writeFileSync(outPath + '/' + i.name, css.css.toString())
        step('分离 ' + i.path, 'red')
      }
      r()

    })
  })
}

export default buildCss