# substr 和 substring

## 定义

两者都能截取字符串

## substr

在 ECMAScript 2015 中已标记为弃用，str.substr(startIndex, length)

1. 包头包尾，不改变原字符串，返回截取字符串
2. startIndex 为负数，相当于 str.substr(str.length + 负数，负数绝对值)

## substring

str.substring(startIndex, endIndex)

1. 包头不包尾，不改变原字符串，返回截取字符串
2. 内部会做参数大小比较，将更小的置为 startIndex，大的 endIndex
3. startIndex 和 endIndex 相同返回空字符串
