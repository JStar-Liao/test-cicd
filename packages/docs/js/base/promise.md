# promise

## 定义

Promise，es6 里正式加入，用于处理异步操作和值传递的一个对象

## 解决啥问题

1. 回调地狱（Callback Hell）：在 JavaScript 的异步编程中，我们经常需要嵌套多个回调函数来处理异步操作的结果。这种嵌套会导致代码难以阅读和维护，形成所谓的“回调地狱”。Promise 通过链式调用（chaining）的方式，使得我们可以将多个异步操作按照顺序连接在一起，而无需嵌套回调函数。
2. 错误处理：在回调函数中处理错误通常比较繁琐，因为你需要在每个回调函数中显式地检查错误。Promise 提供了一种更优雅的错误处理机制，即使用.catch()方法来捕获并处理 Promise 链中的任何错误。
3. 更好的可读性和可维护性：Promise 提供了一种更直观的方式来表示异步操作的状态和结果，使得代码更容易阅读和理解。此外，Promise 还支持使用.then()和.catch()方法进行链式调用，这使得代码更加简洁和易于维护。

总之，Promise 是 JavaScript 异步编程中的一个重要概念，它极大地改善了异步编程的可读性、可维护性和错误处理能力。通过使用 Promise，我们可以更轻松地编写高效、健壮的异步代码。

## 其中概念

1. resolve
2. reject
3. then，onFulfiled，onRejected
4. catch
5. finally
6. peddind, fullfild, rejected
7. 原型方法 race, all

## 实现原理

首先知道几个概念

1. pending, fulfilled, rejected 三个状态
2. promise 的 value 和 fulfilled、rejected 回调列表
3. then 会返回一个新的 promise，它的状态和值是根据 then 的回调函数行为决定
4. catch 和 finally 都是特殊的 then 方法

实现原理

- 创建实例后会去触发传入的执行函数
- 如果是不用等待的任务则直接走 resolve 或者 reject
- 然后将状态修改成 fulfilled, rejected
- 如果有链式调用
- 会执行对应的方法，返回一个新的 Promise，然后将这个 Promise 的 resolve 和 reject，加上链式调用的 onFulfilled 方法和 onRejected 方法映射成一个对象
- 然后用一个处理函数去执行这个对象的方法
- 只要 onFulfilled 和 onRejected 其中一个执行成功，返回解决值或者拒绝原因
- 就会走新 Promise 的 resovle
- 如果执行失败
- 就会走新 Promise 的 reject
- 如果返回值个 promise
- 新 Promise 会根据这个 promise 的状态执行对应的 resolve 和 reject
- 这样让链式调用成功执行
- 如果是等待任务则将链式调用加入到对应的回调列表里
- 等业务逻辑 resolve 或者 reject 后，取出这里的回调列表数据
- 然后处理函数去处理

## 注意点

# 下面的好混乱，错的

```js
class MyPromise {
  sta;
}
```

维护一个回调函数列表，然后根据状态 peddind, fullfild, rejected 判断是去执行加入列表，走 then 的方法还是 catch 的方法，如果列表空了，finally 的方法。同时为保证链式调用，链式调用的方法都会被 promise 包裹一层。

1. 首先创建一个 Promise 实例，实例状态为 pendding。这个状态下，

- 实例自身每次链式调用，链式调用的方法会去创建一个新的 Promise 实例，
- 遇到 then 会将两个回调函数和这个新 Promise 的 res, rej 方法，映射成一个 onFullfild, onRejected, reslove, reject 的对象，
- 在 Promise 内部 当做 handle 方法的参数，执行 handle 方法，因为是 pendding，所以不执行，将这个对象加进回调列表里去，等待调用
- 最后将这个新的 Promise return 出去。
- 这时如果后续还有链式调用，那么使用的就是新 Promise 的方法了。

2. 然后执行 Promise 的回调函数参数，走到 res 或者 rej，

- 如果回调列表没有值，则结束执行；
- 如果有，则根据 fulfild 或者 rejectd 状态 遍历调用回调列表对应的方法，先使用 try catch 的方式执行 onFullfild, onRejected 两个方法，
- 如果报错走 catch 了，那回去找链式调用的 catch 方法执行，找不到则终止执行
- 如果正常执行成功。那再执行 reslove, reject 两个方法，
- 如果没有传入 onRejected 函数，则去看有没有链式调用 catch 方法，onRejected 优先级高于 catch。

##

1. 实例创建后，内部状态为 pending。
2. 执行传入的函数，根据业务逻辑去执行 resolve 还是 reject。
3. 如果业务逻辑能直接同步执行完，触发 resolve 或者 reject，则将传入参数缓存在 Promise 的 value 中，等待有链式调用时使用
4. 如果业务逻辑是需要等待的任务，执行不了 resolve 或者 reject。则直接去执行链式调用
5. 遇到 then，新建一个 Promise 实例，然后执行内部逻辑，将 then 的 onFullFilled、onRejected 和 新 Promise 的 resolve、reject，映射成一个对象，传入 hanlder 执行函数
6. hanlder 执行函数里会根据内部状态 status ，去判断执行对应的方法还是，将这个对象缓存到回调列表里，等待 resolve 或者 reject 触发
7. 遇到 catch，调用自身静态方法 then，把 onRejected 参数，传入 then 的 onRejected 参数里，then 的 onFullFilled 则传空，最后 return 出去
8. 遇到 finally，会做些逻辑处理，然后 return 调用自身静态方法 then，传入特殊处理的参数

- 会用 Promise.resolve 执行 finally 的回调函数，这样通过 resolve 执行将回调函数的返回值缓存在这个新的 Promise 的 value 里了，如果后续还有链式调用，拿的是这个回调函数的返回值，但因为 finally 本身功能定义，自身回调函数的返回值不参与链式调用，所以又主动调用了下自身的 then 方法，将调用 finally 时传入的上一个的返回值，在这返回。相当于跳了一步返回，让后续的链式调用，能接着 finally 前的值，继续执行。

```js
finally(onDone) {
    if (typeof onDone !== 'function') return this.then();
    let Promise = this.constructor;
    return this.then(

      value => Promise.resolve(onDone()).then(/* 主动调用了下自身的then方法，将调用finally时传入的上一个的返回值，在这返回 */() => value),
      reason => Promise.resolve(onDone()).then(() => { throw reason })
    );
  }
```

9. 有链式调用，或者 resolve、 reject 执行完，发现有回调列表在等执行，则直接遍历执行回调列表。去触发 handler 执行，此时状态不再是 pending，则开始执行缓存对象 onFullFilled、onRejected，然后执行缓存对象的 resolve、reject

- 执行 onFullFilled、onRejected 会使用 try catch 执行，如果触发 catch 则会执行 reject

10. 如果状态为 rejected，但又没 onRejected 则直接执行 reject，去触发最近的 onRejected 或者 catch
