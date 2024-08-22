<!--
 * @Descriptios  : 
 * @Author       : maps131_liaoxing
 * @Date         : 2021-07-19 23:29:11
 * @LastEditors  : maps131_liaoxing
 * @LastEditTime : 2021-07-19 23:29:38
 * @FilePath     : \进击的面试\56-vue-data.md
-->
# 5vue-data
vue中data必须是函数是为了保证组件的独立性和可复用性，data是一个函数，组件实例化的时候这个函数将会被调用，返回一个对象，计算机会给这个对象分配一个内存地址，你实例化几次，就分配几个内存地址，他们的地址都不一样，所以每个组件中的数据不会相互干扰，改变其中一个组件的状态，其它组件不变