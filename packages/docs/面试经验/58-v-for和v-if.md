<!--
 * @Descriptios  : 
 * @Author       : maps131_liaoxing
 * @Date         : 2021-07-20 08:19:29
 * @LastEditors  : maps131_liaoxing
 * @LastEditTime : 2021-07-20 08:20:39
 * @FilePath     : \进击的面试\58-v-for和v-if.md
-->
# v-for和v-if
在 vue 2.x 中，在一个元素上同时使用 v-if 和 v-for 时，v-for 会优先作用。
在 vue 3.x 中，v-if 总是优先于 v-for 生效

当 v-if 与 v-for 一起使用时，v-for 具有比 v-if 更高的优先级，这意味着 v-if 将分别重复运行于每个 v-for 循环中

所以，不推荐v-if和v-for同时使用