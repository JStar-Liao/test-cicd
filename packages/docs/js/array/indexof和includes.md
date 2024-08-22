# indexOf 和 includes

## 定义

都是用来检查字符串或数组中是否包含某个元素的方法，但它们在使用和返回值上有一些重要的区别

## includes

arr.includes(基本类型或者变量)，返回 boolean 值

1. 能检测 NaN，因为内部使用 SameValueZero 算法比较，它认为 NaN 等于自身

## indexOf

arr.indexOf(基本类型或者变量，开始检索位置（可选参数，规定在字符串中开始检索的位置。它的合法取值是 0 到 stringObject.length - 1）),返回下标和-1

1. 只关心元素存不存在，不关心位置，includes 可能会更快些，因为它匹配到第一项就会停止
