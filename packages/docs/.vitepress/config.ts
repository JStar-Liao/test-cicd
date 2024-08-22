import type { UserConfig } from 'vitepress'
import directory from '../directory/diretory.json'

const newDirectory = directory.filter((item: any) => item.items.length)

// 处理link和parent,collapsed

const handler = (list: any) => {
  list.forEach((item => {
    delete item.parent
    if (item.items.length) {
      item['path'] = item.link
      delete item.link
      item['collapsed'] = true
      handler(item.items)
    }
  }))
}

handler(newDirectory)

const map = newDirectory.map((item: any) => {
  return {
    text: item.text,
    link: item.items[0].items.length ? item.items[0].items[0].link : item.items[0].link
  }
})

const slider =  {};
newDirectory.forEach((item: any) => {
  slider[item.path + '/'] = item.items
})

const nav = {
  '/guide/': [
    {
      text: '简介',
      link: '/guide/readme',
      activeMatch: '/guide/readme'
    },
  ],
  ...slider
}
export const config: UserConfig = {
  title: 'JStar',
  titleTemplate: ':title | 前端边角料',
  description: 'jstar对各类前端知识点碎片学习后的记录',
  head: [['link', { rel: 'icon', href: '/star.ico' }]],
  lang: 'zh',
  // base: '/',
  // srcDir: './src',
  /* 去除.html后缀 */
  cleanUrls: true,
  /* 需要去除的.md */
  srcExclude: [],
  outDir: './dist',
  markdown: {
    theme: 'github-dark',
    lineNumbers: true,
  },
  themeConfig: {
    docFooter: { prev: '上一篇', next: '下一篇' },
    logo: '/star.png',
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-PRESENT jstar'
    },
    nav: [
      { text: '开始', link: '/guide/readme' },
      ...map
    ],
    socialLinks: [{ icon: 'github', link: 'https://gitee.com/maps_x/front-end-scraps' }],
    sidebar: nav,
    outlineTitle: '大纲',
    search: {
      provider: 'local',
    }
  }
}

export default config
