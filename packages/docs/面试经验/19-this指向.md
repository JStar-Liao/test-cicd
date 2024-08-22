<!--
 * @Descriptios  : 
 * @Author       : maps131_liaoxing
 * @Date         : 2021-07-02 23:43:22
 * @LastEditors  : maps131_liaoxing
 * @LastEditTime : 2021-07-02 23:44:03
 * @FilePath     : \进击的面试\19-this指向.md
-->
# js中this指向
1. 谁调用指向谁，跟所处作用域无关
  * 全局或者函数内部执行 open()，open内this指向window
  * obj.open()，open内this指向obj，如果open是箭头函数，则指向上一层调用者。.open内步执行的函数，this指向window
  * class.open()，open内this指向class，调用this的函数还是指向this，普通函数指向window
2. call,apply,bing可修改指向
  * open.call(this, arg1, arg2, ..)
  * open.apply(this, [arg1, arg2, ..])
  * open.bind(this, arg1, arg2, ..)