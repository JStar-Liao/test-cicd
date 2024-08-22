<!--
 * @Descriptios  : 
 * @Author       : maps131_liaoxing
 * @Date         : 2021-07-10 21:58:40
 * @LastEditors  : maps131_liaoxing
 * @LastEditTime : 2021-07-10 21:58:41
 * @FilePath     : \进击的面试\31-函数arguments.md
-->
# 函数的argumnets
非箭头函数，其包含两个自动生成的变量对象 `this`、`arguments`,内部函数在搜索这两个变量时，只会搜索到其活动对象为止。

## arguments
它是一个类数组对象，指向形参。有length，可以索引，同时也有个callee属性，指向这个函数本身

### 将其转化为数组
1. Array.prototype.slice.apply(arguments)和Array.prototype.concat.apply([], arguments) 返回一个数组 相当于复制
2. Array.from 返回一个数组 相当于复制
3. 展开运算符[...arguments] 返回一个数组 相当于复制