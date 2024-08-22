<template>
  <div class="wrap">
    <div class="parent">
      <div class="child"></div>
    </div>
  </div>
  <div class="box">
    <div style="flex: 1;overflow: auto;">
      <ul>
        <li v-for="item in 7" :key="item" :style="{order: item === 7 ? -1 : 1}">
          <div>{{ item }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.wrap {
  width: 300px;
  // height: 600px;
  outline: 1px dashed firebrick;

  .parent {
    position: relative;
    width: 100%;
    padding-top: 100%;
    background-color: rgb(127 255 212 / 37.7%);

    .child {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      // width: 100px;
      // height: 100px;
      margin: auto;
      outline: 1px solid forestgreen;
    }
  }
}

.box {
  display: flex;
  width: 360px;
  height: 760px;
  background-color: rgb(50 50 50);
  flex-direction: column;

  ul {
    padding: 0;
    margin: 0;
    flex: 1;
    overflow: auto;

    li {
      position: relative;
      display: flex;
      width: 100px;
      height: 100%;
      aspect-ratio: 1/1;
      padding: 0;
      margin: 0;
      color: black;
      background-color: aliceblue;
      border-radius: 20px;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
