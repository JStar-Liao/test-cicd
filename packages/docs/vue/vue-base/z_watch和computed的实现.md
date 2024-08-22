# vue 的 watch 和 computed

## 区别

## watch

1. 是一个数据监听属性，数据有变化会触发 handle 的执行回调函数
2. 有 deep 属性可以设置，深度监听元素变化，默认是 false， 只监听对象自身，不监听其内元素值改变 0，true，监听子属性变化，但还是受制于 Object.defineProperty 的不监听属性的增加
3. 不监听未被 observer 劫持的对象

## computed

1. 要依赖 data 上的属性变化返回一个值，watch 则是观察数据触发回调
2. 再次引用该变量，如果关联的劫持变量没改变，会从缓存中拿
3. 内部不能操作异步函数，会提示错误
4. 有 get 和 set 方法，set 内可以使用异步函数
5. 只监听对象自身，不监听其内元素值改变
6. computed 和 watch 依赖收集的发生点不同，c 渲染时，watch 渲染前

## 实现
