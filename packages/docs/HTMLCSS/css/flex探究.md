# flex 探究

<!-- <FlexVue /> -->

## 一、作用

简便`display`+`position`+`float`等属性做一些特殊的布局，比如垂直居中、流式布局、响应式布局。对于目前的浏览器都有很好的支持。

## 二、基本使用

### 2.1 容器属性

1. `flex-direction`：定义内部元素是如何在弹性容器中布局的，定义了主轴的方向（正方向或反方向）。
2. `flex-wrap`： 定义`flex`元素单行显示还是多行显示。如果允许换行，这个属性允许你控制行的堆叠方向。
3. `flex-flow`：`flex-direction` 和 `flex-wrap` 的简写。
4. `justify-content`：定义沿着弹性容器的主轴和网格容器的行向轴分配内容元素之间和周围的空间。
5. `align-items`：定义所有直接子元素的`align-self`值作为一个组。在`Flexbox`中，它控制子元素在交叉轴上的对齐。在 Grid 布局中，它控制了子元素在其网格区域内的块向轴上的对齐
6. `align-content`：定义沿着弹性盒子布局的纵轴和网格布局的主轴在内容项之间和周围分配空间。

### 2.2 项目属性

1. `flex-grow`：设置`flex`项目主轴尺寸的每行均分时的所占比例。
2. `flex-shrink`： 定义`flex`元素一行的收缩规则。`flex`元素仅在默认宽度之和大于容器的时候才会发生收缩，其收缩的大小是依据`flex-shrink`的值。
3. `flex-basis`：指定了`flex`元素在主轴方向上的初始大小。如果不使用`box-sizing`改变盒模型的话，那么这个属性就决定了`flex`元素的内容盒`content-box`的尺寸
4. `flex`：上面三个属性的简写
5. `order`：属性规定了弹性容器中的可伸缩项目在布局时的顺序。元素按照`order`属性的值的增序进行布局。拥有相同`order`属性值的元素按照它们在源代码中出现的顺序进行布局。
6. `align-self`：定义对齐当前`grid`或`flex`行中的元素，并覆盖已有的`align-items`的值。在`Flexbox`中，会按照当前`flex`元素排列方向的垂直方向进行排列。

> 属性定义=>https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex

## 注意点

1. justify-items、justify-self 在弹性盒子里是被忽略的
2. 可以结合 gap 属性做流式间隔布局
3. 项目不设置高度，也不设置`align-items`或者设置了`stretch`，项目高度会均匀填充满弹性盒子，默认值是`normal`在 flex 布局下它等同于`stretch`
4. align-content 如果使用了 unsafe，滚动会失效
5. align-content 如果使用了，会覆盖 align-items 的效果
6. flex、flex-grow，会受 min-xxx 属性覆盖
7. flex-shrink 仅在单行生效
8. flex 值单数字相当于`flex-grow`、单数字单位或者`flex-basis`的值相当于`flex-basis`、双值数字加数字单位对应`flex-grow` | `flex-basis`、双值数字`flex-grow` | `flex-shrink`
<!-- 9. 从确定高度盒子里做响应式高度布局时，设置了属性为`flex`、`flex-grow`的元素，最好设置`overflow`属性，不然超出比例值，会挤压同轴上的其他元素高度。 -->
9. 设置为弹性盒子，子元素时行内元素会被转换为块级元素

<!-- <script setup>
  import FlexVue from './flex探究.vue'
</script> -->
