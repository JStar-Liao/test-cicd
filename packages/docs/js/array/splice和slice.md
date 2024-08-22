# splice 和 slice

## 定义

两者都能截取数组元素，但使用方式不一样

## slice

只能截取数组元素，arr.slice(startIndex, endIndex)

1. 不会改变原数组，返回新数组
2. 包头不包尾
3. 二参不填，截取到末尾
4. 一参填负数，相当于(长度+负数，末尾)

## splice

能添加，替换，删除数组元素,arr.slice(startIndex, selectNum, ...replaceArg)

1. 改变原数组，返回截取的新数组
2. 包头不包尾
3. 二参不填，截取到末尾
4. selectNum 数大于 replaceArg 数，在其中部分替换，多出部分删除
5. selectNum 数小于 replaceArg 数，在其中部分替换，多出部分往 toSelectIndex 按顺序插入
