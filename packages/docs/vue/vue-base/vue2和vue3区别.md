# vue2 和 vue3 区别

## 主要区别

1. 工程源码

- 工程目录 v3 改成了 monorepo 方式维护，v2 是在 src 目录下根据功能拆分。
  - 让开发人员更容易理解、更改模块
  - 让包可以单独引用，而不用依赖整个 vuejs，比如响应式库
- 类型检查工具改成了 typescript，也就是使用 ts 重写，v2 是使用的是 Flow
  - 可以更好结合 ts 做开发

2. 性能

- 源码体积优化，移除了一些冷门的功能比如（filter，inline-template），还有引入了 tree-shaking 技术
- 编译优化，v3 在编译阶段会对静态模板分析，会将不需要动态更新的节点生成 Block tree，只去 diff 绑定动态节点的标签。

3. 数据劫持修改

- v3 是使用 proxy api 劫持数据的，而 vue2 使用的是 object.definePropty。proxy 提供更多的监听方法，可以劫持的是整个对象属性的增删改。
  - 注意点
    1. proxy 不能监听内部深层次的对象变化，v3 是在 proxy 的 getter 里做递归劫持，这样做好处是只有使用了这个对象才去劫持
  - 解决了不能检测到对象属性添加删除的缺陷
  - 解决一开始旧遍历劫持对象层次耗性能的问题
  - 还代理了 set、map、weakmap、weakset
  - 依赖项的收集是用 WeakMap 类型收集，已 target 为键，Set 类型收集 effect 列表。
    - 好处，target 不在被引用时，其值的列表项也会被自动回收。具有更好的内存管理

4. api

- 提供了 Composition API（组合式 api）

  - 逻辑点不会怎么分散
  - 码更易于复用和组合

- $on，$off 和 $once 被移除

5. 新组件

- Teleport，模态框组件，将内部 dom 插入到指定标签、id、类名下面去

```html
<Teleport to="">DOM</Teleport>
```

- Suspense，异步处理组件，在加载异步组件时，可以先渲染其它东西，让渲染更加平滑

```html
<suspense>
  <template #default>
    <async-component></async-component>
    <async-component></async-component>
    <async-component></async-component>
  </template>
  <template #fallback> Loading... </template>
</suspense>
```

6. diff 算法

- v3 在编译时使用了静态节点提前处理的方式（静态节点提升），做了静态标记，更新不重新计算和比较
- 最长子序列的索引

  1. 子节点比较

  - vue2 使用双端比较法，头和头、尾和尾、头和尾、尾和头，匹配到再位移起始结束节点下标，然后再利用 key，循环比较看有没有可以复用的节点，然后移动。
  - vue3 使用双端比较头和头、尾和尾，匹配到再位移起始结束下标，剩余新节点的会生成 keyMap，然后根据 key 生成一个对应再旧节点数组的下标，再遍历一遍旧节点，将 key 相同的做差异比对，再最终移动替换节点时，会使用贪心算法加二分查找法，得到最长子序列的索引，添加、替换期间会记录前一个索引是谁，然后在使用前置朔源法，归正乱序。然后遍历新节点数组，参照节点下标数组做位置替换，如果遍历下标匹配待最长子序列的索引，则不替换。然后再新增删除对应的节点。

  2. 静态节点提升

  - vue3 编译时会记录不包含数据劫持的标签节点，在更新直接使用这些节点。同时再 diff 对比时直接跳过这些节点。

7. 生命周期

- 组合式 api 的生命周期钩子 4. onBeforeMount 在组件被挂载之前被调用
  1. onMounted 在组件挂载完成后执行。
  2. onBeforeUpdate 在组件即将因为响应式状态变更而更新其 DOM 树之前调用
  3. onUpdated 在组件因为响应式状态变更而更新其 DOM 树之后调用。
  4. onBeforeUnmount 在组件实例被卸载之前调用
  5. onUnmounted 在组件实例被卸载之后调用
  6. onErrorCaptured 在捕获了后代组件传递的错误时调用
  7. onRenderTracked 当组件渲染过程中追踪到响应式依赖时调用
  8. onRenderTriggered 当响应式依赖的变更触发了组件渲染时调用
  9. onActivated 组件实例是 KeepAlive 缓存树的一部分，当组件被插入到 DOM 中时调用
  10. onDeactivated 若组件实例是 KeepAlive 缓存树的一部分，当组件从 DOM 中被移除时调用
  11. onServerPrefetch 在组件实例在服务器上被渲染之前调用

8. v-if/v-for 的实现

9. 多根节点处理
   jsx 的写法还是一个，遵循 jsx 规范
