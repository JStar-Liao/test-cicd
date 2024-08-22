<!--
 * @Descriptios  : 
 * @Author       : maps131_liaoxing
 * @Date         : 2021-06-29 21:07:17
 * @LastEditors: liaoxing
 * @LastEditTime: 2022-06-14 09:23:12
 * @FilePath: \code\code\面试经验\进击的面试\8-eventloop.md
-->
# eventloop
Event Loop即事件循环，是指浏览器或Node的一种解决javaScript单线程运行时不会阻塞的一种机制，也就是我们经常使用异步的原理

## 任务队列
一种先进先出的操作受限制的线性表

## 任务
在js中任务被分为宏任务和微任务
* 宏任务
  1. script里的代码
  2. setTimeout
  3. setInterval
  4. setImmediate(非标准api)
  5. I / O 
* 微任务
  1. Process.nextTick（Node独有）
  2. Promise.then catch finally
  3. MutationObserver（监听DOM变化触发）

## 机制
JavaScript是一个单线程，它执行的所有代码都放在调用栈里面，遇到宏微任务分别将其加入各自任务队列，当调用栈执行完毕之后，就会在任务队列里面找任务，如果有微任务，就会先执行微任务，再去执行宏任务。
* await 返回的promise会被放到微任务队列

## 版本差异
* 在Google73版本之前，node.js v11之前
  await的值被包裹在一个promise中，尚未resolve，然后将整个await放进微任务队列，等排到时执行了promise，then添加进微任务，再次排到await才全部执行完成
* 73版本之后，node.js v11 +
  await后的值包裹在一个promise.resolve中,await直接加进微任务，排到await就全部执行完成

## nodejs
<img src="https://user-gold-cdn.xitu.io/2018/6/12/163f35f70dc06fcd?imageView2/0/w/1280/h/960/format/webp/ignore-error/1">

## libuv
<img src="https://user-gold-cdn.xitu.io/2018/6/12/163f410b951ce409?imageView2/0/w/1280/h/960/format/webp/ignore-error/1">

Node中的Event Loop是基于libuv实现的，而libuv是 Node 的新跨平台抽象层，libuv使用异步，事件驱动的编程方式，提供i/o的事件循环和异步回调，扮演着nodejs与文件、网络等异步任务的桥接角色。

* 非i/o
  1. 定时器
  2. microtask
  3. process.nextTick
  4. setImmediate
* i/o
  1. 网路i/o
  2. 文件i/oss

libuv内部还维护着一个默认4个线程的线程池，这些线程负责执行文件i/o操作、DNS操作、用户异步代码。当js层传递给 libuv 一个操作任务时，libuv 会把这个任务加到队列中。之后分两种情况：
1. 线程池中的线程都被占用的时候，队列中任务就要进行排队等待空闲线程。
2. 线程池中有可用线程时，从队列中取出这个任务执行，执行完毕后，线程归还到线程池，等待下个任务。同时以事件的方式通知Event Loop，Event Loop接收到事件执行该事件注册的回调函数。



## 机制
### 六个阶段
1. timers: 执行setTimeout和setInterval中到期的callback
2. pending callback: 上一轮循环中少数的callback会放在这一阶段执行
3. idle, prepare: 仅在内部使用
4. poll: 最重要的阶段，执行pending callback，在适当的情况下回阻塞在这个阶段。
5. check: 执行setImmediate(setImmediate()是将事件插入到事件队列尾部，主线程和事件队列的函数执行完成之后立即执行setImmediate指定的回调函数)的callback
6. close callbacks: 执行close事件的callback，例如socket.on('close'[,fn])或者http.server.on('close, fn)

### 循环原理
> setImmediate设计用于在当前poll阶段完成后check阶段执行脚本

> 当每个阶段完成后，如果存在 nextTick 队列，就会执行队列中的所有回调函数，并且优先于其他 microtask 执行

> 每阶段最后都会检测process.nextTic，microtasks有没有回调，有就执行完，然后退出该阶段。（通用阶段）

1. 执行js代码，遇到各任务归类到各任务队列
2. 执行process.nextTic回调
3. 执行microtasks
4. 进入循环
5. timers阶段，检测有没有到期的timers回调执行，先进先出。最后通用阶段
6. pending callback， 检查是否有pending的I/O回调，有就执行。通用阶段
7. idle, prepare这俩关系不大，不管先
8. poll阶段，
    1. 检测有没有尚未到期的回调（定时器，i/o），有到期的就执行，然后通用阶段，没到期，检测有没有immediate回调，有就退出该阶段，没就等待到期的回调；
    2. 如果没有定时器或者i/o的回调任务，退出该阶段
9. check阶段，检测有没有immediate回调，有就执行，然后通用阶段
10. closing阶段，检测有没有监听的close回调，检测有没有immediate回调，有就执行，然后通用阶段
11. 检查有没有定时器、IO等事件句柄，有就进入下一循环，没就结束循环，程序结束

### 练习
```js
  console.log('script start')

  async function async1() {
    await async2()
    let i = await async3()
    console.log(i)
    console.log('async1 end')
  }
  async function async2() {
    console.log('async2 end') 
  }
  async function async3() {
    console.log('async3 start') 
    return new Promise((res, rej) => {
      setTimeout(() => {
        console.log('async3 end') 
        res(99)
      },1000)
    })
  }
  async1()

  setImmediate(() => {
    console.log('setImmediate1');
  })
  process.nextTick(function() {
      console.log('process.nextTick1');
  })

  setTimeout(function() {
    console.log('setTimeout')
  }, 0)

  new Promise(resolve => {
    console.log('Promise')
    setImmediate(() => {
      console.log('setImmediate2');
    })
    process.nextTick(function() {
      console.log('process.nextTick2');
  })
    resolve()
  })
    .then(function() {
      console.log('promise1')
    })
    .then(function() {
      console.log('promise2')
    })

  console.log('script end')
```

