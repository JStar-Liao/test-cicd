<!--
 * @Descriptios  : 
 * @Author       : maps131_liaoxing
 * @Date         : 2021-07-15 20:53:13
 * @LastEditors  : maps131_liaoxing
 * @LastEditTime : 2021-07-19 22:43:59
 * @FilePath     : \进击的面试\47-vue3proxy.md
-->
# proxy
简单使用
```js
let text = document.querySelector('#text')
let obj = new Proxy([1,2,3], {
  get (o, p) {
    console.log(o, p)
    return o[p]
  },
  set (o, p, val) {
    console.log(o, p, val)
    o[p] = val // 需要在这重新赋值，不像defineproperty
    text.innerText = obj[1]
  }
})

text.innerText = obj[1]
setTimeout(() => {
  obj[3] = 'aleadyChange'
}, 3000)
```
## 对于对象和数组属性，只监听其指针是否改变
1. 当传入一个对象，proxy会对起所有属性的栈区监听，如果属性值包含对象或者包含数组，修改对象属性或者数组元素，不触发set，
2. 但`这个传入对象的属性新增一个属性时会触发set，删除不会`
3. 还有`数组的长度增删都会会触发set`

## 与其继承的defineproperty相比
1. 不需要逐一为每个做劫持，直接监听对象
2. get可用参数做return返回，不像define会进入调用死循环
3. 修改不会直接设置属性，需要在set自行修改属性值