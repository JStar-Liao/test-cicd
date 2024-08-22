# asyncawait

## 定义

async/await 是 es7 正式加入，用于处理异步操作 generator + Promise 的语法糖。

## 解决啥问题

1. 回调地狱（Callback Hell）：
   在 JavaScript 的异步编程中，经常需要使用回调函数来处理异步操作的结果。然而，当多个异步操作需要按顺序执行时，回调函数很容易形成嵌套，导致代码结构混乱，难以阅读和维护。这种现象被称为“回调地狱”。async/await 允许我们使用同步的写法来编写异步代码，避免了嵌套回调，使代码更加清晰和易于理解。
2. 更好的错误处理：
   在回调函数中处理错误通常比较繁琐，因为需要在每个回调函数中显式地检查错误。使用 async/await 时，可以使用 try/catch 语句来捕获和处理异步操作中抛出的错误。这使得错误处理更加集中和一致，易于维护。
3. 代码的可读性和可维护性：
   async/await 语法使得异步代码看起来更加直观和易于理解。它允许我们以同步的方式编写异步代码，使得代码结构更加清晰，易于阅读和维护。同时，由于避免了嵌套回调，代码也更容易进行重构和扩展。
4. 更自然的控制流：
   使用 async/await，我们可以像处理同步代码一样处理异步代码，包括使用条件语句、循环等控制流语句。这使得异步代码的控制流更加自然和直观，易于理解和编写。
5. 支持 Promise 链的简化：
   async/await 是基于 Promise 实现的，但它提供了更加简洁和易用的语法。通过 await 关键字，我们可以直接等待一个 Promise 的解析结果，而无需使用.then()和.catch()链式调用。这使得代码更加简洁和易于阅读。
6. 更好的调试体验：
   由于 async/await 使异步代码看起来像同步代码一样，因此调试起来也更加方便。开发者可以使用调试工具逐步执行代码，查看变量的值以及调用栈等信息，从而更容易地定位和解决问题。

总之，async/await 为 JavaScript 的异步编程带来了许多好处，使得代码更加清晰、易于阅读和维护，同时提供了更好的错误处理和调试体验。

## 注意点

1. await 只能在 async 中使用
2. async 返回的是一个 Promise
3. await 不能处理状态为 rejected 的 Promise，需要 Promise 处理 rejected 后返回，或者使用 try catch 包裹 await 执行

## 实现原理

1. 调用 async，js 会将函数转换为一个 Promise 函数，返回出去
2. 同时会生成一个生成器函数，将 await 的表达式转换为 yield 表达式
3. Promise 函数内部会去自动去调用生成器函数的 next 方法
4. 然后根据 done 判断算法执行结束，返回解决值

```js
/* 自动执行next */
function co(gen) {
  return new Promise((res, rej) => {
    let next = (params) => {
      try {
        /* 获取yield右边表达式 */
        var { value, done } = gen.next(params);
      } catch (e) {
        return rej(e);
      }
      /* 根据done判断是否结束 */
      if (done) {
        res(value);
      } else {
        /* 用promise包裹，兼容value的值为promise */
        Promise.resolve(value).then((data) => {
          --data;
          /* 递归执行，实现自动 */
          next(data);
        });
      }
    };
    /* 开启执行 */
    next();
  });
}

function promiseCreater(params) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(params);
    }, 1000);
  });
}

function* gen(params) {
  let data1 = yield promiseCreater(params);
  console.log(data1);
  let data2 = yield promiseCreater(data1);
  console.log(data2);
  let data3 = yield promiseCreater(data2);
  console.log(data3);
  return data3;
}

co(gen(100));
```
