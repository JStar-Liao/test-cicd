# 数组去重

## filter 搭配 indexof

```js
// O(n^2)，适用小型数据
const uniqueArrat = ${array}.filter((item, index, self) => {
  // 根据第一次返回的下标和当前下标对比，只保留第一次匹配到的
  return self.indexof(item) === inex
})
```

## reduce 搭配 includes

```js
// O(n^2)，适用小型数据
const uniqueArray = ${array}.reduce((acc, item) => {
  // 定义空数组往里加没有的，不能用push，因为是执行方法返回的是添加项
  return acc.includes(item) ? acc : [...acc, item]
}, [])
```

## Set 数据结构 搭配 拓展运算符（推荐）

```js
// O(n)
// 利用Set数据自动去除重复元素的特性
const uniqueArray = [...new Set(${array})]
```

## Map 数据结构

```js
// O(n)
// 通过Map键的唯一性来做，然后将Map转为数组
const uniqueArray = Array.from(new Map(${array}.map(item => [item, item])).values())
```

## 双重循环遍历（不推荐）

## 对象哈希表

```js
// 近乎O(n)
const uniqueArray = [];
const hashTable = {};
for (let i = 0; i < array.length; i++) {
  const item = array[i];
  if (!hashTable[item]) {
    uniqueArray.push(item);
    hashTable[item] = true;
  }
}
```

## 注意点

1. 优先考虑 Set、Map、哈希法
2. 懒加载分批处理
3. 使用 web worker 去处理计算密集型去重操作
