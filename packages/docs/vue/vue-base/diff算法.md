# diff 算法

## 定义

Diff 算法（差异算法）的主要操作是比较两个数据结构（如文本、树形结构等）的差异，并生成描述这些差异的补丁或指令。在 Vue.js 等前端框架中，Diff 算法主要用于比较新旧虚拟 DOM（Virtual DOM）之间的差异，以便决定如何最有效地更新真实的 DOM。

## 好处

比较简单的 dom 结构直接更新 node 效率是比较高，但页面结构复杂，数据又多时，这样就要写更多的代码，花费的时间也多，并且维护性也不高；

## 大致实现逻辑

1. Vue 组件状态发生变化，生成新的 vnode 树后，diff 算法会去获取旧树和新树，开始比较（vue 视图更新是组件级的）
2. 首先是同层比较，比较两个节点的 key 和属性值，看是否相同
3. 节点不同，则删除旧节点并重新创建新节点进行替换
4. 节点相同，则进一步比较子节点
5. 首先会判断新旧树有没有子节点，没得的就做新增或者删除
6. 都有子节点，则进入 updateChildren 使用双端比较算法比较，
7. 根据比较结果生成描述补丁或者指令
8. 然后执行补丁指令，更新到真实的 dom 上

## 缺陷

1. 对大型 DOM 树的性能影响：
   当处理大型、复杂的 DOM 树时，diff 算法的性能可能会受到影响。因为即使是最小的变化也可能需要遍历整个树来找出差异。

2. key 的重要性：
   在列表渲染中，Vue 使用 key 来追踪每个节点的身份，以便在重新渲染时可以高效地复用和重新排序元素。如果没有提供唯一的 key，Vue 会使用一种就地复用策略，这可能会导致渲染错误或不可预期的行为。

3. 嵌套组件的复杂性：
   当处理嵌套组件时，diff 算法可能需要递归地遍历整个组件树。这可能会增加计算的复杂性，特别是在处理深度嵌套的组件时。

4. 动态内容的限制：
   对于某些动态内容（如条件渲染的块），Vue 可能需要频繁地创建和销毁 DOM 元素，即使这些元素的内容只是略有变化。这可能会导致不必要的性能开销。

5. 对第三方库和插件的依赖：
   Vue 的 diff 算法主要关注于 Vue 自身的虚拟 DOM 结构和渲染机制。如果开发者使用了大量的第三方库或插件，并且这些库或插件没有与 Vue 的 diff 算法进行良好的集成，那么可能会出现性能问题或不可预期的行为。

6. 不支持跨框架比较：
   Vue 的 diff 算法是专门为 Vue 的虚拟 DOM 设计的，因此它无法与其他框架（如 React、Angular）的虚拟 DOM 进行比较。这意味着如果你正在尝试将 Vue 与其他框架混合使用或进行迁移，可能会遇到一些困难。

7. 静态内容的处理：
   Vue 3 引入了一种静态标记机制来优化静态内容的处理。然而，如果开发者不当地使用这种机制（例如，错误地标记了应该动态更新的内容），那么可能会导致性能问题或不可预期的行为。
   请注意，这些缺陷并不是 Vue 3 的 diff 算法本身的问题，而是在某些特定情况下可能会出现的潜在问题。在大多数情况下，Vue 3 的 diff 算法仍然是一个非常高效和可靠的工具，可以帮助开发者构建高性能的 Web 应用程序。

## diff 步骤

第一步：调用 patch 方法，传入新旧虚拟 DOM，开始同层对比
第二步：调用 SameNode 方法，对比新旧节点是否同类型节点
第三步：如果不同，新节点直接代替旧节点
第四步：如果相同，调用 patchNode 进行对比节点
如果旧节点和新节点都是文本节点，则新文本代替旧文本
如果旧节点有子节点，新节点没，则删除旧节点的子节点
如果旧节点没有子节点，新节点有，则把子节点新增上去
如果都有子节点，则调用 updateChildren 方法进行新旧子节点的对比
第五步：使用双端比较法，依次头和头、头和尾、尾和头、尾和尾对比。（oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx）
第六步：上面都没命中，在 keyMap 中寻找对应的 index，有则移动，没就插入
第七步：循环结束，比较新旧节点的开始结束下标，做后面添加和删除节点

## vue2 和 vue3 的 diff 区别

1. 子节点比较

- vue2 使用双端比较法，头和头、尾和尾、头和尾、尾和头，匹配到再位移起始结束节点下标，然后再利用 key，循环比较看有没有可以复用的节点，然后移动。
- vue3 使用双端比较头和头、尾和尾，匹配到再位移起始结束下标，剩余新节点的会生成 keyMap，然后根据 key 生成一个对应再旧节点数组的下标，再遍历一遍旧节点，将 key 相同的做差异比对，再最终移动替换节点时，会使用贪心算法加二分查找法，得到最长子序列的索引，添加、替换期间会记录前一个索引是谁，然后在使用前置朔源法，归正乱序。然后遍历新节点数组，参照节点下标数组做位置替换，如果遍历下标匹配待最长子序列的索引，则不替换。然后再新增删除对应的节点。

2. 静态节点提升

- vue3 编译时会记录不包含数据劫持的标签节点，在更新直接使用这些节点。同时再 diff 对比时直接跳过这些节点。

## 最长子序列的索引（贪心算法+二分法）+前置回溯法

```js
export function getSequence(arr) {
  const len = arr.length;
  const result = [0]; // 默认以数组中第0个为基准来做序列，注意！！存放的是数组 索引
  let resultLastIndex; // 结果集中最后的索引
  let start;
  let end;
  let middle;
  const p = new Array(len).fill(0); // 最后要标记索引 放的东西不用关心，但是要和数组一样长

  for (let i = 0; i < len; i++) {
    let arrI = arr[i];
    /** 当前这一项比我们最后一项大则直接放到末尾 */
    if (arrI !== 0) {
      // 因为在vue newIndexToOldIndexMap 中，0代表需要创建新元素，无需进行位置移动操作
      resultLastIndex = result[result.length - 1];
      if (arrI > arr[resultLastIndex]) {
        // 比较当前项和最后一项的值，如果大于最后一项，则将当前索引添加到结果集中
        result.push(i); // 记录索引
        p[i] = resultLastIndex; // 当前放到末尾的要记录他前面的索引，用于追溯
        continue;
      }

      /** 这里我们需要通过二分查找，在结果集中找到仅大于当前值的（所有大于当前值的结果中的最小值），用当前值的索引将其替换掉 */
      // 递增序列 采用二分查找 是最快的
      start = 0;
      end = result.length - 1;
      while (start < end) {
        // start === end的时候就停止了  .. 这个二分查找在找索引
        middle = ((start + end) / 2) | 0; // 向下取整
        // 1 2 3 4 middle 6 7 8 9   6
        if (arrI > arr[result[middle]]) {
          start = middle + 1;
        } else {
          end = middle;
        }
      }
      // 找到中间值后，我们需要做替换操作  start / end
      if (arrI < arr[result[end]]) {
        // 这里用当前这一项 替换掉以有的比当前大的那一项。 更有潜力的我需要他
        result[end] = i;
        p[i] = result[end - 1]; // 记住他的前一个人是谁
        console.log(i, result, p);
      }
    }
  }

  // [2, 1, 8, 4, 6, 7]
  // [101, 103, 104, 106, 107, 109]
  // [0,0,undifine,1,3,4,4,6,1]

  const l1 = [];
  result.forEach((i) => {
    l1.push(arr[i]);
  });
  console.log("result1", result);
  console.log("l1", l1);
  // 1) 默认追加记录前驱索引 p[i] = resultLastIndex
  // 2) 替换之后记录前驱索引 p[i] = result[end - 1]
  // 3) 记录每个人的前驱节点
  // 通过最后一项进行回溯
  console.log(p);
  console.log(arr);
  let i = result.length;
  let last = result[i - 1]; // 找到最后一项
  while (i > 0) {
    i--;
    // 倒叙追溯
    result[i] = last; // 最后一项是确定的
    last = p[last];
  }
  // [0, 1, 3 4, 6, 7]
  // 6, 4, 3, 1, 0, 0
  const l2 = [];
  result.forEach((i) => {
    l2.push(arr[i]);
  });
  console.log("result2", result);
  console.log("l2", l2);
  return result;
}

const endRes = getSequence([102, 103, 101, 105, 106, 108, 107, 109, 104]);
console.log(endRes);

export function getSequence2(arr) {
  if (!arr.length) return [];

  const result = [[arr[0]]];
  const resultIndex = [[0]];

  for (let i = 1; i < arr.length; i++) {
    const n = arr[i];
    _updata(n, i);
  }

  function _updata(n, index) {
    for (let i = result.length - 1; i >= 0; i--) {
      const line = result[i];
      const lineIndex = resultIndex[i];
      const tail = line[line.length - 1];

      if (n > tail) {
        result[i + 1] = [...line, n];
        resultIndex[i + 1] = [...lineIndex, index];
        break;
      } else if (n < tail && i === 0) {
        result[i] = [n];
        resultIndex[i] = [index];
      }
    }
  }
  console.log(resultIndex[resultIndex.length - 1]);
  return result[result.length - 1];
}

const endRes2 = getSequence2([102, 103, 101, 105, 106, 108, 107, 109, 104]);
console.log("endRes2", endRes2);
```
