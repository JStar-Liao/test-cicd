# apply、call、bind

## 定义

允许改变函数运行时的 this 上下文，并且传递参数。

## 使用方法

```js
const obj = {
  initNum: 0,
  Test(a, b, c, d) {
    console.log(this, a, b, c, d);
    return this.initNum + a + b + c + (d || 0);
  },
};

const obj2 = {
  initNum: 100,
};

console.log(obj.Test.apply(obj2, [1, 2, 3]));
console.log(obj.Test.call(obj2, 1, 2, 3));
console.log(obj.Test.bind(obj2, 1, 2, 3)(4));
```

## 好处

1. 都可以改变函数的 this 的指向，方便包含通过 this 业务逻辑复用。
2. apply 可以数组作为函数参数传递，比如 Math.max
3. 因为 bind 会返回一个函数，所以可以在绑定线传入一些参数，类似柯里化

## 注意点

1. 他们无法改变箭头函数的 this 指向
2. 使用方式不一样，apply 二参传入数组，call 二参及后面是正常参数列表，bind 和 call 参数传递一样，但会返会一个函数，需要手动调用。

## 实现

```js
Function.prototype.myApply = function () {
  const [constructor, ...args] = arguments;
  console.log(constructor, args);
  const conetxt = constructor || window;
  conetxt.fn = this;
  const res = conetxt.fn(...args[0]);
  return res;
};

Function.prototype.myCall = function () {
  const [constructor, ...args] = arguments;
  const conetxt = constructor || window;
  conetxt.fn = this;
  const res = conetxt.fn(...args);
  return res;
};

Function.prototype.myBind = function () {
  const [constructor, ...args] = arguments;
  const conetxt = constructor || window;
  conetxt.fn = this;
  const res = (...a) => {
    return conetxt.fn.myApply(constructor, [...args, ...a]);
  };
  return res;
};

const a = {
  a: 999,
  test: function (name, age) {
    console.log(this.a);
    console.log(name, age);
  },
};

const b = {
  a: 1000,
  test: function (name, age) {
    console.log(this.a);
    console.log(name, age);
  },
};

a.test.myBind(b, "800", "900")();
```
