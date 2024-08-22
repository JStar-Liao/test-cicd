<!--
 * @Descriptios  : 
 * @Author       : maps131_liaoxing
 * @Date         : 2021-06-30 21:55:51
 * @LastEditors  : maps131_liaoxing
 * @LastEditTime : 2021-07-01 21:17:11
 * @FilePath     : \进击的面试\10-generator.md
-->
# generator
声明时添加* function* gen()
## 特性
1. 遇到yield表达式，就暂停执行后面的操作，并将紧跟在yield后面的那个表达式的值，作为返回的对象的value属性值
2. yield表达式本身没有返回值，或者说总是返回undefined
3. next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值

## demo
```js
  function fetchData(params) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(params)
        resolve(params);
      }, 3000)
    })
  }

  function *gen(params) {
    console.log('start');
    let a = yield 9;
    console.log(a);
    let b = yield fetchData(a);
    console.log(b);
    let c = yield () => 3;
    console.log(c);
    console.log('end');
    return 'getData end'
  }

  let app = gen()
  let i1 = app.next()
  console.log(i1)
  let i2 = app.next(i1.value)
  console.log(i2)
  let i3 = app.next(88)
  console.log(i3)
  let i4 = app.next()
  console.log(i4)
```