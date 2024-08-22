<!--
 * @Descriptios  : 
 * @Author       : maps131_liaoxing
 * @Date         : 2021-07-14 20:49:09
 * @LastEditors  : maps131_liaoxing
 * @LastEditTime : 2021-07-14 20:49:26
 * @FilePath     : \进击的面试\38-spa页面易造成的内存泄露.md
-->
# spa页面易造成的内存泄露
通常不是来自框架自身，可能出现在：
1. 组件通过原生方法选择了组件的DOM对象，然后赋值给了组件外的变量，组件销毁后，内存中还保留着选择的组件DOM,但实际DOM已经被销毁了。
* 在组件销毁时把组件外的变量赋值为null
2. 组件内使用了组件外的方法，并且引用了组件内的函数或者变量，组件销毁后，这些变量和函数还存在内存中
* 在组件销毁时把方法解除引用
```js
  mounted () {
    window.addEventListener('resize', this.func)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.func)
  }

  mounted () {
   this.$EventBus.$on('homeTask', res => this.func(res))
  },
  destroyed () {
   this.$EventBus.$off()
  }
```