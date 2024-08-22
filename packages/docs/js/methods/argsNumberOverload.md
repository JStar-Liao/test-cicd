# 函数参数数量重载

## 代码

```ts
export const argsNumberOverload = (
  overloadObj: { [x: string]: () => any },
  name: string,
  fn: any
) => {
  // 存储上一次的方法，形成闭包
  const old = overloadObj[name];
  // 方法挂载最新赋值的方法
  overloadObj[name] = function (...args: any) {
    // 使用时参数数量相等
    if (args.length === fn.length) {
      return fn.apply(this, args);
    } else if (typeof old === "function") {
      return old.apply(this, args);
    }
  };
};
```

## 使用

```ts
/* 重载汇集的对象 */
const overloadObj: { [x: string]: () => any } = {};

argsNumberOverload(overloadObj, "find", () => {
  console.log("没有参数");
});

argsNumberOverload(overloadObj, "find", (p: any) => {
  console.log("一个参数：", p);
});

argsNumberOverload(overloadObj, "find", (p: any, a: any) => {
  console.log("两个参数：", p, a);
});

overloadObj.find(); // 没有参数
overloadObj.find(1); // 一个参数：1
overloadObj.find(1, 2); // 两个参数：1，2
```
