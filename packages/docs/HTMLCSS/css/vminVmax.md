# vmin和vmax
`vmin`: 取视口宽度( vw )和视口高度( vh )较小的值。

`vmax`: 取视口宽度( vw )和视口高度( vh )较大的值。

## 示例
<vminVmax></vminVmax>

## 代码
```html
<div class="vminVmaxWrap">
  <h3>vmin</h3>
  <img class="min" src="/star.png">
  <h3>vmax</h3>
  <img class="max" src="/star.png">
</div>
```

```scss
.vminVmaxWrap {
  img {
    background-color: rgb(238 238 238);
  }

  .min {
    width: 10vmin;
    height: 10vmin;
  }

  .max {
    width: 10vmax;
    height: 10vmax;
  }
}
```

## 贡献名单

<script setup>
  import vminVmax from './animationTimeline.vue'
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