<!--
 * @Descriptios  : 
 * @Author       : maps131_liaoxing
 * @Date         : 2021-07-15 20:49:45
 * @LastEditors  : maps131_liaoxing
 * @LastEditTime : 2021-07-15 20:50:30
 * @FilePath     : \进击的面试\42-vue的scope原理.md
-->
# vue的scope原理
添加scope后，编译时会在类名后面加上.box[data-v-xxx]，hash内容的标示的属性，标签上也会带上<div class="box" data-v-xxx></div>。这样就限制即使同名，但data属性不同，样式也不生效