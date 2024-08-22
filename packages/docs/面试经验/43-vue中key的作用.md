<!--
 * @Descriptios  : 
 * @Author       : maps131_liaoxing
 * @Date         : 2021-07-15 20:50:46
 * @LastEditors  : maps131_liaoxing
 * @LastEditTime : 2021-07-15 20:51:02
 * @FilePath     : \进击的面试\43-vue中key的作用.md
-->
# vue中key的作用
在diff比较过程中，双端比较和有无判断，都为false时，会进入key查询，来寻找节点。
1. key的作用主要是为了高效的更新虚拟DOM,其原理是vue在patch过程中通过key可以精准判断两个节点是否是同一个，从而避免频繁更新不同元素， 使得整个patch过程更加高效， 减少DOM操作， 提高性能。
2. vue中在使用相同标签名元素的过度切换时，也会使用到key属性， 其目的也是为了让vue可以区分它们， 否则vue只会替换其内部属性而不会触发过度效果