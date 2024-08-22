<!--
 * @Descriptios  : 
 * @Author       : maps131_liaoxing
 * @Date         : 2021-07-15 20:49:15
 * @LastEditors  : maps131_liaoxing
 * @LastEditTime : 2021-07-15 20:49:16
 * @FilePath     : \进击的面试\40-vue的路由模式.md
-->
# vue的路由模式
## hash 
hash模式的工作原理是hashchange事件，可以在window监听hash的变化
1. URL 中 hash 值只是客户端的一种状态，也就是说当向服务器端发出请求时，hash 部分不会被发送；

2. hash 值的改变，都会在浏览器的访问历史中增加一个记录。因此我们能通过浏览器的回退、前进按钮控制hash 的切换；

3. 可以通过 a 标签，并设置 href 属性，当用户点击这个标签后，URL 的 hash 值会发生改变；或者使用 JavaScript 来对 loaction.hash 进行赋值，改变 URL 的 hash 值；

4. 我们可以使用 hashchange 事件来监听 hash 值的变化，从而对页面进行跳转(渲染)。
## history
利用html5的新api，window.history，修改浏览器历史记录，并渲染页面
1. back(), foeward(), go(step), 前进后退
2. pushState(state, title, url) 不刷新页面并添加一条历史记录
3. history.replaceState(state, title, url) 替换当前地址栏里的url

## 相关
1. popstate，前进或者后退时会触发。pushState 和 replaceState 不会触发此事件。
2. hashchange，当前页面的hash值发生变化时触发。
