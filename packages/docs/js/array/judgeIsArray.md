# 判断是否为数组

## 对象描述符

`Object.prototype.toString.call(${var})`用对象原型转字符串的方式判断，正常情况下如果执行完为`[object Array]`则为数组

### 注意点

如果其他对象类型使用了`Symbol.toStringTag`修改了默认描述符为`Array`，是无法判断的。

## 原型链

`${var} instanceof Array`判断变量原型链上是否有数组原型，正常情况下为`true`则为数组

### 注意点

1. 如果其他类型对象使用了`Object.setPrototypeOf(${var}, Array.prototype)`修改了这个对象原型，是无法正确判断的
2. iframe 子应用页面的 Array 和父页面的 Array 是不相等的，所以无法用父页面的数组判断方法去判断子页面的数组

## 构造函数（推荐）

`Array.isArray`，声明数组肯定会经过构造函数，构造函数提供了这个方法用来准确判断是否为数组
