<!--
 * @Descriptios  : 
 * @Author       : maps131_liaoxing
 * @Date         : 2021-07-15 20:52:14
 * @LastEditors  : maps131_liaoxing
 * @LastEditTime : 2021-07-17 00:06:48
 * @FilePath     : \进击的面试\45-vue的computed和watch.md
-->
# vue的computed和watch
## watch
1. 是一个数据监听属性，数据有变化会触发handle的执行回调函数
2. 有deep属性可以设置，深度监听元素变化，默认是false， 只监听对象自身，不监听其内元素值改变0，true，监听子属性变化，但还是受制于Object.defineProperty的不监听属性的增加
3. 不监听未被observer劫持的对象

## computed
1. 是一个接收return 数据的变量，内部可以含有被劫持的变量，变量改变，也会触发该函数的get属性，return最新值
2. 再次引用该变量，如果关联的劫持变量没改变，会从缓存中拿
3. 内部不能操作异步函数，会提示错误
4. 有get和set方法，set内可以使用异步函数
5. 只监听对象自身，不监听其内元素值改变
