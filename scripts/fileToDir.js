// 获取docs下的文件，并按目录分类
import fs from 'fs'
import { resolve } from 'path'
import glob from 'fast-glob'
const outPath = resolve('packages/docs/directory')

const dirsList = []
const filesList = []

const getFiles = async () => {
  const dirs = await glob('packages/docs/**/', {
    onlyDirectories: true,
    ignore: [
      '.vitepress',
      'packages/docs/node_modules',
      'packages/docs/dist',
      'packages/docs/directory',
      'packages/docs/guide',
      'packages/docs/public',
      'packages/docs/**/img',
    ],
    objectMode: true,
  })
  dirs.forEach((item) => {
    dirsList.push({
      text: item.name.split('.')[0],
      link: item.path.replace('packages/docs', ''),
      parent: item.path.split('/').slice(-2)[0],
    })
  })

  const files = await glob('packages/docs/**/*.md', { objectMode: true })
  if (files && files.length) {
    files.forEach((item) => {
      if (
        item.path.includes('node_module') ||
        item.path.includes('index.md') ||
        item.path.includes('guide')
      )
        return
      filesList.push({
        text: item.name.split('.')[0],
        link: item.path.replace('packages/docs', '').replace('.md', ''),
        parent: item.path.split('/').slice(-2)[0],
      })
    })
  }

  const tree = arrayToTree([ ...filesList, ...dirsList ])

  await fs.writeFileSync(outPath + '/' + 'diretory.json', JSON.stringify(tree))
}
getFiles()

function arrayToTree (items) {
  const result = []
  const itemMap = {}
  for (const item of items) {
    const id = item.text
    const pid = item.parent

    if (!itemMap[id]) {
      itemMap[id] = {
        items: [],
      }
    }

    itemMap[id] = {
      ...item,
      items: itemMap[id]['items'],
    }

    const treeItem = itemMap[id]
    if (pid === 'docs') {
      result.push(treeItem)
    } else {
      if (!itemMap[pid]) {
        itemMap[pid] = {
          items: [],
        }
      }
      itemMap[pid].items.push(treeItem)
    }
  }
  return result
}
