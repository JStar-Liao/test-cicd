<!--
 * @Descriptios  : 
 * @Author       : maps131_liaoxing
 * @Date         : 2021-07-20 08:07:52
 * @LastEditors  : maps131_liaoxing
 * @LastEditTime : 2021-07-20 08:18:59
 * @FilePath     : \进击的面试\57-v-if和v-show.md
-->
# v-if和v-show
v-if是控制dom节点是否存在做显隐，在切换时会做内部事件子组件的销毁和重建，性能消耗会更大些，但它隐藏状态时，初始不会去渲染
而v-show是通过控制样式的display做显隐，无论显隐，都会在先渲染在页面，有更高的初始渲染消耗
所以在显隐频繁的操作用v-show会较为合适些