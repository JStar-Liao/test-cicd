<template>
  <div class="wh100">

  </div>
</template>

<script setup lang="ts">
import { argsNumberOverload } from '@jstar-public-lib/utils'

/* 重载汇集的对象 */
const overloadObj: {[x: string]: () => any} = {}
// console.log(argsNumberOverload)

argsNumberOverload(overloadObj, 'find', () => {
  console.log('没有参数')
})

argsNumberOverload(overloadObj, 'find', (p: any) => {
  console.log('一个参数：', p)
})

argsNumberOverload(overloadObj, 'find', (p: any, a: any) => {
  console.log('两个参数', p, a)
})

overloadObj.find()
overloadObj.find(1)
overloadObj.find(1,2)
</script>

<style scoped>
</style>
