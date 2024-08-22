<!--
 * @Descriptios  : 
 * @Author       : maps131_liaoxing
 * @Date         : 2021-07-01 21:19:57
 * @LastEditors  : maps131_liaoxing
 * @LastEditTime : 2021-07-01 21:19:58
 * @FilePath     : \进击的面试\11-async和await.md
-->
<!--
 * @Author: maps131_liaoxing
 * @Date: 2021-06-29 11:50:27
 * @LastEditors: maps131_liaoxing
 * @LastEditTime: 2021-07-01 16:12:26
 * @Description: 
-->
# async await
基于generator + Promise 目前最好的js异步处理的方法，相当于generator + Promise + 自动执行next 的语法糖

## 原理demo
```js
  /* 自动执行next */
  function co (gen) {
      return new Promise((res, rej) => {
        let next = (params) => {
          try {
            /* 获取yield右边表达式 */
            var {value, done} = gen.next(params)
          } catch (e) {
            return rej(e)
          }
          /* 根据done判断是否结束 */
          if (done) {
            res(value)
          } else {
            /* 用promise包裹，兼容value的值为promise */
            Promise.resolve(value).then(data => {
              --data
              /* 递归执行，实现自动 */
              next(data)
            })
          }
        }
        /* 开启执行 */
        next()
      })
    }

    function promiseCreater (params) {
      return new Promise((res, rej) => {
        setTimeout(() => {
          res(params)
        }, 1000)
      })
    }
    
    function* gen(params) {
      let data1 = yield promiseCreater(params)
      console.log(data1)
      let data2 = yield promiseCreater(data1)
      console.log(data2)
      let data3 = yield promiseCreater(data2)
      console.log(data3)
      return data3
    }

    co(gen(100))
```
## 注意事项
1. await 命令后面的Promise对象，运行结果可能是 rejected，此时等同于 async 函数返回的 Promise 对象被reject。因此需要加上错误处理，可以给每个 await 后的 Promise 增加 catch 方法；也可以将 await 的代码放在 try…catch 中
2. 不需要同步得瑟尽量不要使用它
3. await必须使用在async中，不能下层级