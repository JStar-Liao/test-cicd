# animation-timeline

`动画时间线`：是css滚动驱动动画的一个实验性功能属性，需要`Chrome Canary 115+`版本

驱动动画定义了两种新的的`timeline`, 可以指定动画在元素滚动时运行，`@keyframes`的进度也会跟随滚动运行，这里使用的是其中的一种`scroll-timeline`，表示滚动的距离，0% - 100%。

##  注意
 1. `animation-timeline`需要写在`animation`后面; 
 2. 不设置`scroll()`函数的指定容器，滚动关联的是绑定动画元素的父级元素或者定位的元素，可以用`scroll-timeline`属性设置相关滚动属性，然后赋值给`animation-timeline`关联起来。`scroll-timeline-name`变量名需要按`--`开头命名
 3. 指定容器必须滚动容器的子元素

## 示例
<animationTimeline></animationTimeline>

## 代码
```vue
<template>
  <div class="animationTimelineWrap">
    <h3>实现滚动进度条</h3>
    <div class="demoWrap">
      <div class="contentWrap">
        <div class="scrollLineWrap"></div>
        <p v-for="item in list" :key="'jstar' + item.id">
          {{ item.text }}
        </p>
      </div>
    </div>
    <h3>实现横向滚动进度条</h3>
    <div class="demoWrap">
      <div class="contentWrap2">
        <div class="scrollLineWrap"></div>
        <span v-for="item in list" :key="'jstar' + item.id" style="margin-right: 10px;">
          {{ item.text }}
        </span>
      </div>
    </div>
    <h3>实现滚动修改banner图</h3>
    <div class="demoWrap2">
      <div class="contentWrap3">
        <div class="imgWrap">
          XP经典
        </div>
        <p v-for="item in list" :key="'jstar' + item.id">
          {{ item.text }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const list = []
for(let i = 0; i < 100; i++) {
  list.push({
    id: i,
    text: 'jstar' + i
  })
}
</script>

<style lang="scss" scoped>
@supports (animation-timeline: scroll()) {
  .animationTimelineWrap {
    @keyframes widthScrollAnim {
      from {
        width: 0%;
      }

      to {
        width: 100%;
      }
    }

    @keyframes widthScrollAnim2 {
      0% {
        height: 300px;
        font-size: 200px;
        color: var(--vp-c-brand);
      }

      6% {
        height: 60px;
        font-size: 28px;
        color: rgb(255 255 255);
        background-color: var(--vp-c-brand);
      }

      100% {
        height: 60px;
        font-size: 28px;
        color: rgb(255 255 255);
        background-color: var(--vp-c-brand);
      }
    }

    font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;

    .demoWrap {
      position: relative;
      height: 300px;
      margin: 0;
      margin-top: 10px;
      overflow: hidden;
      box-shadow: 0 0 2px 2px gainsboro;

      .contentWrap {
        width: 100%;
        height: 100%;
        overflow-y: scroll;
        scroll-timeline-name: --my-scroller;
        scroll-timeline-axis: y;

        .scrollLineWrap {
          position: absolute;
          top: 0;
          left: 0;
          width: 10%;
          height: 8px;
          background-color: var(--vp-c-brand);
          animation: widthScrollAnim 3s linear;
          /* stylelint-disable-next-line property-no-unknown */
          animation-timeline: --my-scroller;
        }
      }

      .contentWrap2 {
        width: 100%;
        height: 100%;
        padding-top: 10px;
        overflow-y: hidden;
        box-sizing: border-box;
        scroll-timeline-name: --my-scroller2;
        scroll-timeline-axis: x;

        .scrollLineWrap {
          position: absolute;
          top: 0;
          left: 0;
          width: 10%;
          height: 8px;
          background-color: var(--vp-c-brand);
          animation: widthScrollAnim 3s linear;
          /* stylelint-disable-next-line property-no-unknown */
          animation-timeline: --my-scroller2;
        }
      }
    }

    .demoWrap2 {
      position: relative;
      height: 600px;
      margin: 0;
      margin-top: 10px;
      overflow: hidden;
      box-shadow: 0 0 2px 2px gainsboro;

      .contentWrap3 {
        width: 100%;
        height: 100%;
        padding-top: 300px;
        overflow-x: hidden;
        box-sizing: border-box;
        scroll-timeline-name: --my-scroller3;
        scroll-timeline-axis: y;

        .imgWrap {
          position: absolute;
          top: 0;
          left: 0;
          display: flex;
          width: 100%;
          height: 300px;
          overflow: hidden;
          font-family: Arial, Helvetica, sans-serif;
          font-weight: bold;
          background-image: url("https://gss0.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/962bd40735fae6cda56d9afa0eb30f2443a70f4b.jpg");
          background-position: 50% 50%;
          background-repeat: no-repeat;
          background-size: cover;
          // background-color: var(--vp-c-yellow);
          animation: widthScrollAnim2 0.1s linear;
          background-blend-mode: soft-light;
          /* stylelint-disable-next-line property-no-unknown */
          animation-timeline: --my-scroller3;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
}
</style>

```

## 贡献名单

<script setup>
  import animationTimeline from './animationTimeline.vue'
  import {
    VPTeamMembers
  } from 'vitepress/theme'
  
  const members = [
    {
      avatar: '/star.png',
      name: 'jstar',
      title: '创建者',
    },
  ]
</script>

<VPTeamMembers size="small" :members="members" />