# 数字逗号分隔 count

## 示例
<div >
  <h1>{{ count(999999999) }}</h1>
</div>

<script setup>
  import { count } from "jstar-methods-lib"
</script>

## 代码
```html
<div >
  <h1>{{ count(999999999) }}</h1>
</div>
```
```js
<script setup>
  import { count } from "jstar-methods-lib"
</script>
```

## API
| 函数名 | 说明 | 参数 | 返回类型 |
| :---: | :---: | :---: | :---:
| count | 数字每3位逗号分隔 | num: number | string |

## 源码
```ts
(number: number | string, decimals?: number): string => {
  number = number + ''
  // 转为字符串，并按照.拆分
  let hasPoint = false
  if (number.indexOf('.') > -1) {
    hasPoint = true
  }
  const arr = (number + '').split('.')
  // 整数部分再拆分
  const int = arr[0].split('')
  // 小数部分
  let fraction = arr[1] || ''
  if (decimals) {
    fraction = fraction.substring(0, decimals)
  }
  // 返回的变量
  let r = ''
  int.reverse().forEach(function (v, i) {
    // 非第一位并且是位值是3的倍数，添加“,”
    if (i !== 0 && i % 3 === 0) {
      r = v + ',' + r
    } else {
      // 正常添加字符(这是好写法)
      r = v + r
    }
  })
  // 整数部分和小数部分拼接
  return r + (fraction ? '.' + fraction : hasPoint ? '.' : '')
}
```