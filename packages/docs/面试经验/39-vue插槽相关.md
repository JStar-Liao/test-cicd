<!--
 * @Descriptios  : 
 * @Author       : maps131_liaoxing
 * @Date         : 2021-07-14 20:50:07
 * @LastEditors  : maps131_liaoxing
 * @LastEditTime : 2021-07-14 22:01:36
 * @FilePath     : \进击的面试\39-vue插槽相关.md
-->
# vue插槽相关
Vue 2.6 版本后对 slot 和 slot-scope 做了一次统一的整合，让它们全部都变为函数的形式，所有的插槽都可以在 this.$slotScopes 上直接访问，这让我们在开发高级组件的时候变得更加方便。在优化上，Vue 2.6 也尽可能的让 slot 的更新不触发父组件的渲染，通过一系列巧妙的判断和算法去尽可能避免不必要的渲染。在 2.5 的版本中，由于生成 slot 的作用域是在父组件中，所以明明是子组件的插槽 slot 的更新是会带着父组件一起更新的）

父组件经过初始化时的一系列处理，每个插槽会转换成一个key(插槽名，未命名时是default)对应的函数(有作用域参数的话，会传作用越参数). 子组件的实例 this.$scopedSlots 就可以访问到 父组件里的 ‘插槽函数’。 如果是 普通插槽， 就直接调用函数生成 vnode, 如果是 作用域插槽， 就带着 props 去调用函数生成 vnode.
引用组件
```vue
<template>
  <div id="app">
    <IamSlot #default="{ def }">
      {{ def }}
    </IamSlot>
    <br />
    <IamSlot>
      <template #header="slotInnerProp">
        {{ slotInnerProp.list[0].name }}
      </template>
      <template #footer="{ info }">
        {{ info }}
      </template>
    </IamSlot>
    <br />
    <OldSlot>
      <h1 slot="header" slot-scope="scope">{{ scope.data }} ___ Here might be a page title</h1>

      <p>A paragraph for the main content.</p>
      <p>And another one.</p>

      <p slot="footer">Here's some contact info</p>
    </OldSlot>
  </div>
</template>

<script>
import IamSlot from './slot/iamslot' 
import OldSlot from './slot/oldslot'
export default {
  name: 'App',
  components: {
    IamSlot,
    OldSlot
  },
  data () {
    return {
      info: {age: 1}
    }
  }
}
```
iamslot
```vue
<template>
  <div id="iamslot">
    <slot name="header" :list="list">
      <p>ocupyHeader</p>
    </slot>
    <slot :def="def">
      <p>ocupyMian</p>
    </slot>
    <slot name="footer" :info="info">
      <p>ocupyFooter</p>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'iamslot',
  data () {
    return {
      list: [
        {name: 'maps', id: 1},
        {name: 'wiki', id: 2}
      ],
      info: 'footer',
      def: 'default'
    }
  },
  mounted () {
    console.log(this.$slots) // v-slot打印的都是空的
    console.log(this.$scopedSlots)
  }
}
</script>
```
oldslot
```vue
<template>
  <div id="oldslot">
    <slot name="header" data="info">
      <p>oldHeader</p>
    </slot>
    <slot>
      <p>oldMian</p>
    </slot>
    <slot name="footer">
      <p>oldFooter</p>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'oldslot',
  data () {
    return {
      list: [
        {name: 'maps', id: 1},
        {name: 'wiki', id: 2}
      ],
      // info: 'footer',
      def: 'default',
      info: {age: 1}
    }
  },
  mounted () {
    console.log(this.$slots) // vnode
    console.log(this.$scopedSlots)
  }
}
</script>
```

