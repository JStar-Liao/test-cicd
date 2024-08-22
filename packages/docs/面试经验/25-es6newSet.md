<!--
 * @Descriptios  : 
 * @Author       : maps131_liaoxing
 * @Date         : 2021-07-05 21:41:28
 * @LastEditors  : maps131_liaoxing
 * @LastEditTime : 2021-07-05 22:55:22
 * @FilePath     : \进击的面试\25-es6newSet.md
-->
# new set
es6新增的数据结构，类似数组，但它的一大特性就是所有元素都是唯一的，没有重复的值，一般称为集合。
Set本身是一个构造函数，用来生成 Set 数据结构
## 方法
| 方法 | 描述 |
| :--- | :---- |
| add | 添加某个值，返回Set对象本身。 |
| clear |	删除所有的键/值对，没有返回值。 |
| delete |	删除某个键，返回true。如果删除失败，返回false。 |
| has |	返回一个布尔值，表示某个键是否在当前 Set 对象之中。 |
| forEach |	 方法会根据集合中元素的插入顺序，依次执行提供的回调函数 |
| keys | 返回键名的遍历器，相等于返回键值遍历器values() |
| values | 返回键值的遍历器 |
| entries | 返回键值对的遍历器 |

> 只能去重在栈区重复的，像匿名对象，函数无效在堆没指向的无效

### add
```js
  let list = new Set()
  list.add(99)
```
### clear
```js
  list.clear()
```
### delete
```js
  /* 栈区储存，删除无效 */
  let list2 = new Set([{name: 1, id: 1}, {naem: 2, id: 2}])
  list2.delete(0)
  list2.delete({name: 1, id: 1})
  /* 变量存了指针，有效 */
  let obj1 = {name: 1, id: 1}
  let obj2 = {name: 2, id: 2}
  let list3 = new Set([obj1, obj2])
  list3.delete(obj1)
```
### has
```js
  /* 判断栈区 */
  console.log(list2.has(0), list2.has({name: 1, id: 1}), list3.has(obj2)) // f f t
```
### forEach
```js
function logSetElements(value1, value2, set) {
  console.log("s[" + value1 + "] = " + value2);
}

new Set(["foo", "bar", undefined]).forEach(logSetElements);

// logs:
// "s[foo] = foo"
// "s[bar] = bar"
// "s[undefined] = undefined"

```
### entries
```js
var mySet = new Set();
mySet.add("foobar");
mySet.add(1);
mySet.add("baz");

var setIter = mySet.entries();

console.log(setIter.next().value); // ["foobar", "foobar"]
console.log(setIter.next().value); // [1, 1]
console.log(setIter.next().value); // ["baz", "baz"]
```
### values
```js
  var mySet = new Set();
mySet.add('foo');
mySet.add('bar');
mySet.add('baz');

var setIter = mySet.values();

console.log(setIter.next().value); // "foo"
console.log(setIter.next().value); // "bar"
console.log(setIter.next().value); // "baz"
```

> 以下方法，对象，函数需要在栈区有指针才有效
## 数组去重
```js
  let arr = [3, 5, 2, 2, 5, 5];
  let setArr = new Set(arr)     // 返回set数据结构  Set(3) {3, 5, 2}

  //方法一   es6的...解构
  let unique1 =  [...setArr ];      //去重转数组后  [3,5,2]

  //方法二  Array.from()解析类数组为数组
  let unique2 = Array.from(setArr )   //去重转数组后  [3,5,2]
```

## 字符串去重
```js
  let str = "352255"
  let unique = [...new Set(str)].join("")
```

## 实现并集、交集、和差集
```js
  let a = new Set([1, 2, 3]);
  let b = new Set([4, 3, 2]);

  // 并集
  let union = new Set([...a, ...b]);
  // Set {1, 2, 3, 4}

  // 交集
  let intersect = new Set([...a].filter(x => b.has(x)));
  // set {2, 3}

  // （a 相对于 b 的）差集
  let difference = new Set([...a].filter(x => !b.has(x)));
  // Set {1}

```