# 动态数字

## 示例
<div>
  <countTo :endVal="99999999"></countTo>
  <br/>
  <countTo :endVal="99999999" :duration="100000"></countTo>
</div>

<script setup>
  // import { CountTo } from "jstar-comp-lib"
  import { countTo } from "@jstar-public-lib/components"
  import {
    VPTeamMembers
  } from 'vitepress/theme'
  
  const members = [
    {
      avatar: '/star.png',
      name: 'jstar',
      title: '创建者',
    },
  ]
</script>

## 代码
```html
<div >
  <countTo :endVal="99999999"></countTo>
  <br/>
  <countTo :endVal="99999999" :duration="100000"></countTo>
</div>
```
```js
<script setup>
  import { countTo } from "jstar-comp-lib"
</script>
```

## 参数
| 参数 | 说明 | 类型 | 默认值 |
| :---: | :---: | :---: | :---: |
| startVal | 开始滚动数值 | number | 0 |
| endVal | 结束滚动数值 | number | 0 |
| duration | 滚动时间，单位`ms` | number | 0 |
| decimals | 精确度，数值几位就是几位小数 | number | 0 |
| style | 滚动数字样式 | object | 0 |
| unit | 单位 | string | - |
| color | 单独组件颜色设置`color`滚动数字颜色，`unitColor`单位颜色 | object | 0 |


## 贡献名单

<VPTeamMembers size="small" :members="members" />