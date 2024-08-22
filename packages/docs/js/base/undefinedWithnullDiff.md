# undefined、null 区别

## 定义

两者都代表空，都是原始数据类型，使用`typeof`的类型检查，可以看出`undefined`就是`undefined`类型，`null` 是 `object` 类型（历史原因）。所以根据这个判断，可以帮助理解。

- `null` 是一个没有地址指向的对象（尚未创建的对象）
- `undefined` 未去定义这个变量

```js
// null
const a = null;
// undefined
let b;
```

## 注意点

1. typeof 检查 null 的类型为 object
2. unefined 计算时会隐式转换为 NaN、null 为 0
3. JSON.stringify 时如果对象属性值是 undefined，会删除该属性，因为删掉后表现形式也没不同，在需要保留时就得注意了
4. 判断时两者转换为 false
