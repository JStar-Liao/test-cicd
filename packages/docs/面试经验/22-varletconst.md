# const
const实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址不得改动。对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。

# var、let
都是声明变量

## 区别
1. let声明的变量在块作用域内可访问，例如在{}内声明，只能在{}内访问
```js
if (1) {
  var i = 0
  let c = 0
}
console.log(i) // 0
console.log(c) // c is not defined

for (let i = 0; i < 1; i++) {
  var q = 1
  let w = 2
}

console.log(q) // 1
console.log(w) // w is not defined
```
2. 没有变量提升，声明前使用报not defined
3. 不能重复声明同名变量
4. for循环中的局部作用域，会被固定，不会像var一样因为事件循环机制，拿的都是循环最后的值 