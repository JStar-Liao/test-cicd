# this 指向问题

## 定义

`this`是 `js` 一个关键字，表示当前对象，也是一个重要的语法点。它永远会指向一个对象。

1. 非严格模式下，全局作用域里，单独使用的话指向全局对象
2. 函数作用域里，单独使用的话也指向全局对象
3. 在事件和方法调用里，指向调用事件的元素和对象
4. 严格模式下指向 全局、函数作用域里，单独使用都指向`undefined`
5. call、apply、bind 显示绑定可以修改 this 指向

## 用处

1. 在对象的方法内和类的方法内，快速获取自身的属性或者其他方法
2. 获取事件触发的元素，像 button

## 好处

1.  在 JavaScript 中，this 是一个非常重要的关键字，它引用函数运行时的上下文。理解并正确使用 this 可以帮助你编写更灵活、更可维护的代码。以下是 this 的一些主要好处：

代码复用：
通过 this，你可以编写可以在多个不同上下文中运行的函数。这些函数可以根据它们被调用的上下文来访问和修改不同的数据。

面向对象编程：
在面向对象编程（OOP）中，this 通常用于引用当前对象。这使得你可以通过对象的方法来访问和修改对象的属性。

事件处理：
在 DOM 事件处理中，this 通常引用触发事件的元素。这使得你可以在不使用额外变量的情况下，直接访问和修改该元素。

回调函数和闭包：
虽然回调函数和闭包通常有自己的作用域和上下文，但 this 可以在这些函数中用于引用外部上下文。这可以通过 Function.prototype.bind()、Function.prototype.call() 或 Function.prototype.apply() 方法来实现。

创建库和框架：
当你创建库或框架时，this 可以帮助你编写更通用的代码。例如，jQuery 的许多方法都使用 this 来引用当前选择的 DOM 元素。

避免全局变量：
通过使用 this，你可以避免使用全局变量来存储数据。相反，你可以将数据存储在对象或类的属性中，并通过 this 来访问它们。

实现继承：
在 JavaScript 中，虽然没有类式的继承，但你可以通过原型链和构造函数来模拟类继承。在这些情况下，this 可以帮助你访问和修改继承的属性和方法。

简化代码：
通过减少对全局变量的依赖和避免传递大量参数，this 可以帮助你简化代码并提高可读性。

动态上下文：
this 的值在函数被调用时确定，而不是在函数被定义时确定。这使得你可以根据需要在不同的上下文中使用相同的函数。

灵活性：
由于 this 的值可以在运行时改变，因此它提供了很大的灵活性。你可以根据需要更改函数的上下文，从而改变 this 的引用。

## 坏处

需要注意，this 的行为有时可能会让人感到困惑，特别是在回调函数、事件处理程序和某些异步操作中。因此，在使用 this 时要小心，并确保你理解它在当前上下文中的含义。

## 注意点

0. 绑定优先级 new 关键字 > 显式绑定 > 隐式绑定 > 默认绑定
1. 箭头函数的`this`指向其定义时的所在的函数对象，bind、aplly、call 显示绑定也无法改变
2. 在 setTimeout 里直接定义的箭头函数，也是指向执行 setTimeout 的函数对象
3. 函数在其他作用域里单独执行指向 window，但在 class 里的作用域指向 undefine
4. 显示绑定 null/undefine，指向 window

## 练习题

```js
// 1、直接调用
function foo() {
  console.log(this);
}
foo();

// 2、对象中的函数
var obj1 = {
  foo: foo,
};
var fn1 = obj1.foo;
fn1();

// 3、被全局变量引用
var obj2 = {
  bar: function () {
    console.log(this);
  },
};
var fn2 = obj2.bar;
fn2();

// 4、函数嵌套调用
function foo1() {
  console.log("foo1", this);
}
function foo2() {
  console.log("foo2", this);
  // 注意
  foo1();
}
function foo3() {
  console.log("foo3", this);
  // 注意
  foo2();
}
foo3();

// 5、通过闭包调用
var obj2 = {
  bar: function () {
    return function () {
      console.log(this);
    };
  },
};
obj2.bar()();
```

```js
var user = {
  name: "lisa",
  foo: function () {
    console.log(this);
  },
};
// 注意
new user.foo();
```

```js
function bar() {
  console.log(this);
}
// 注意
var fn = bar.bind("hello");
new fn();
```

```js
var name = "window";
var person = {
  name: "person",
  sayName: function () {
    console.log(this.name);
  },
};
function sayName() {
  var sss = person.sayName;
  sss();
  person.sayName();
  // 注意点
  person.sayName();
  (b = person.sayName)();
}
sayName();
// 注意点
person.sayName();
(b = person.sayName)();
```

```js
let name = "window";
let person1 = {
  name: "person1",
  foo1: function () {
    console.log(this.name);
  },
  foo2: () => console.log(this.name),
  foo3: function () {
    return function () {
      console.log(this.name);
    };
  },
  foo4: function () {
    return () => {
      console.log(this.name);
    };
  },
};
let person2 = { name: "person2" };

person1.foo1();
person1.foo1.call(person2);

person1.foo2();
person1.foo2.call(person2);

person1.foo3()();
person1.foo3.call(person2)();
person1.foo3().call(person2);

// 注意点
person1.foo4()();
person1.foo4.call(person2)();
person1.foo4().call(person2);
```

p1, p2, w, w, w, w, p2, p1, p2, p1

```js
var name = "window";
function Person(name) {
  this.name = name;
  this.obj = {
    name: "obj",
    foo1: function () {
      return function () {
        console.log(this.name);
      };
    },
    foo2: function () {
      return () => {
        console.log(this.name);
      };
    },
  };
}
var person1 = new Person("person1");
var person2 = new Person("person2");

person1.obj.foo1()();
person1.obj.foo1.call(person2)();
person1.obj.foo1().call(person2);
// 注意点,审题
person1.obj.foo2()();
person1.obj.foo2.call(person2)();
// 注意点，审题
person1.obj.foo2().call(person2);
```

w, w, p2, obj, p2, obj
