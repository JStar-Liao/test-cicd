<template>
  <div class="vminVmaxWrap">
    <h3>vmin</h3>
    <img class="min" src="/star.png">
    <h3>vmax</h3>
    <img class="max" src="/star.png">
  </div>
</template>

<style lang="scss" scoped>
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
</style>
