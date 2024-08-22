<template>
  <span :style="Props.style" class="relative rsCountTo">
    <countTo :startVal="Props.startVal" :endVal="Props.endVal" :duration="Props.duration" :decimals="Props.decimals" :style="{color: Props.color?.color || 'inherit'}"></countTo>
    <span class="unitWrap absolute" :style="{color: Props.color?.unitColor || 'inherit'}">{{ Props.unit }}</span>
  </span>
</template>

<script setup lang="ts">
import countTo from './module/countTo.vue'
import './index.scss'

type PropsType = {
  startVal?: number,
  endVal?: number,
  duration?: number,
  decimals?: number,
  style?: any,
  unit?: string,
  color?: any
}

const Props = withDefaults(defineProps<PropsType>(), {
  startVal: () => 0,
  endVal: () => 0,
  duration: () => 1000,
  decimals: () => 0,
  style: () => { return {} }
})

</script>