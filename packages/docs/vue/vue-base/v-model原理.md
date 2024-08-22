# v-model 原理

## 定义和用处

它是一个 vue 的的核心指令，于在表单元素（如 input、textarea、select 等）和 Vue 实例的数据之间创建双向数据绑定。

## 区别

1. 使用在表单元素这类标签上面，比如 input 相当于给 input 添加了一个:value 属性和 v-on:input 修改 value 值的方法的指令语法糖，在标签 onInput 事件触发后，会去把绑定 input 事件触发，修改 value。checkBox 和 radio 则是 checked 属性和 change 事件、select 则是 value 和 change

2. 在组件上使用，

- vue2 里，默认也是相当于个组件传递了一个 value 属性和 input 方法，但在组件内部可以使用 model 钩子，prop 自定义属性的名字,event 自定义方法名字，
- 对应这个 vue2 里还有.sync 修饰符，在 bind 后面修饰。相当于给组件传递了一个属性和：update:属性名的方法，相比 v-model，同一组件它可以定义多个，子组件内部不能属性名和方法名。
- vue3 里，是将 v-model 和.sync 两者结合了起来，只有 v-model，给组件传递了一个属性和：update:属性名的方法。可以多个，在 v-model 后面：自定义名名称。
