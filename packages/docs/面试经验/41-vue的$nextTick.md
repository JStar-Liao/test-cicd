<!--
 * @Descriptios  : 
 * @Author       : maps131_liaoxing
 * @Date         : 2021-07-15 20:49:35
 * @LastEditors  : maps131_liaoxing
 * @LastEditTime : 2021-07-15 20:49:36
 * @FilePath     : \进击的面试\41-vue的$nextTick.md
-->
# vue的$nextTick
$nextTick 作用：在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。

## 原理
根据eventloop的微任务优先原则，在dom更新完，进入事件队列。$nextTick会根据浏览器的支持程度，判断用那种任务的执行方法包裹回调函数执行，比如promise包裹，Promise.resolve().then(callback),then是微任务，加进微任务队列，然后在事件循环时优先触发，但如果浏览器不支持，就用定时器包裹，在宏任务队列中执行
