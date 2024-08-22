<!--
 * @Descriptios  : 
 * @Author       : maps131_liaoxing
 * @Date         : 2021-07-15 20:51:26
 * @LastEditors  : maps131_liaoxing
 * @LastEditTime : 2021-07-15 21:22:02
 * @FilePath     : \进击的面试\44-vue中diff算法.md
-->
# vue双端diff算法
因为vue用的是mvvm的设计模式，当model更新后，会通过observer更新虚拟node，生成的新vnode与老vnode进行diff比较,再更新真实node。有些人会有疑问,为啥不直接更新node,要先更新vnode。比较简单的dom结构直接更新node效率是比较高，但页面结构复杂，数据又多时，这样就要写更多的代码，花费的时间也多，并且维护性也不高
1. 同层级比较
2. 节点类型一样，当classname不一样会被判定不是同类型元素，删除重建

## diff流程
1. 数据更新，生成新的vnode，调用patch方法
2. 用sameVnode判断两个node是否值得比较，不值得，就直接替换oldVnode
> 判断key是否相同与标签是否相同、是否都含有data属性、input类型是否相同这些
3. 值得就调用patchVnode进行节点比较，该删删，改增增，还有简单的属性替换，
4. 如果有子节点，就会调用updateChildren方法，就行双端diff算法比较
5. 先新旧左边开始两两比较，如果不值得比较，两端右边开始比较，还不值，旧起始节点与新尾部节点比较，还不值，旧尾节点根新起始节点比较，还不值用key比较
6. 直到旧节点全部比完，或者新节点全部比完。缺增多删，diff结束