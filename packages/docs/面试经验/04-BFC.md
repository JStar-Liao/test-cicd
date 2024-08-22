<!--
 * @Descriptios  : 
 * @Author       : maps131_liaoxing
 * @Date         : 2021-06-26 13:59:14
 * @LastEditors  : maps131_liaoxing
 * @LastEditTime : 2021-06-27 14:08:48
 * @FilePath     : \进击的面试\BFC.md
-->
# BFC (Block Formatting Context 块级格式化上下文)
BFC是一个独立的布局环境，BFC内部的元素布局与外部互不影响

## BFC特性
  1. 同一BFC下相邻块级元素的margin会重叠
  2. 触发了BFC的元素，不会被浮动元素覆盖，避免文字环绕
      1. overflow、float、dispaly: inline-block、table-cell触发，元素跟随浮动文档流
      2. position脱离文档流，提高层级 
  3. 触发BFC的元素，浮动元素加入高度计算

## 触发BFC
  1. 子 float: left \ right （每个元素都设置，注意宽度，换行了才有效果显示）
  2. 子 position: absolute \ fixed
  3. display: inline-block \ inline-flex \ 父flex
  4. 父overflow: hidden \ scroll \ auto 但这几个不改变元素特性,作用在子元素上

  ```css
  body .wrap{
    width: 100%;
    /* display: flex; */
    /* overflow: hidden; */
    /* overflow: auto; */
    /* overflow: scroll; */
  }

  body .wrap .inner{
    /* float: left; */
    /* display: inline-block; */
    /* display: inline-flex; */
    margin-bottom: 10px;
    margin-top: 10px;
    width: 100%;
    height: 100px;
    border: 1px solid red;
    box-sizing: border-box;
  }
  ```

## 解决块级块级margin重叠
  1. 给其中一个元素触发bfc，但overflow作用在子元素上所以无效
  2. 用个父盒子包裹其中一个元素，然后给父盒子设置overflow

## 自适应布局
  1. 左右自适应，一边浮动，另一边overflow
  2. 中间自适应，左右浮动，中间overflow