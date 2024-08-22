# interface 和 type 的区别

## 声明合并

`interface`会做声明合并，将同变量名的合并，导致其声明的类型具有不确定性。会造成比如，将这个类型的变量赋值给`Record<string, string>`、`{[x: string], string}`类型变量时，会报类型错误，解决方法是给`interface`加上索引签名`{[x: string], string}`。

但`type`不做声明合并, 所以是没有问题的。

```ts
interface user {
  name: string;
}

interface user {
  breed: string;
  // {[x: string], string}
}

type user2 = {
  name: string;
};

const person: user = {
  name: "Andi",
  age: 18,
};

const person2: user2 = {
  name: "Andi",
};

let person3: Record<string, string>;

person3 = person; // 报类型错误

person32 = person; // 没问题
```

## 类型拓展

`interface`使用`extends`实现，`type`通过`&`交叉运算符形成交叉类型

```ts
interface userExtends {
  breed: string;
}

interface user extends userExtends {
  name: string;
}

type user2Extends = {
  breed: string;
};

type user2 = user2Extends & {
  name: string;
};
```
