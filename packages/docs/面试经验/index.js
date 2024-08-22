/*
 * @Descriptios  : 
 * @Author       : maps131_liaoxing
 * @Date         : 2021-06-29 22:15:18
 * @LastEditors  : maps131_liaoxing
 * @LastEditTime : 2021-07-24 13:14:56
 * @FilePath     : \进击的面试\index.js
 */
let arr = [1, 2, 3, 4]
let arr2 = [2, 4, 8, 9]

let arr3 = [
  {val: 1, str: 'item1'},
  {val: 2, str: 'item2'},
  {val: 3, str: 'item3'},
  {val: 4, str: 'item4'}
]
let arr4 = [
  {val: 8, str: 'item8'},
  {val: 2, str: 'item2'},
  {val: 9, str: 'item9'},
  {val: 4, str: 'item4'}
]

// /* 交集 */
// let intersection = arr.filter(item => arr2.includes(item))
// console.log('交集:', intersection)

// /* 并集 */
// let union = arr2.concat(arr.filter(item => !(arr2.includes(item))))
// console.log('并集：', union)

// /* 差集 */
// let difference = arr.concat(arr2).filter(v => arr.includes(v) && !arr2.includes(v))
// console.log('差集：', difference)


// let sArr = new Set(arr)
// let sArr2 = new Set(arr2)

// /* 交集 */
// let intersection2 = Array.from(arr.filter(item => sArr2.has(item)))
// console.log(intersection2)

// /* 并集 */
// let union2 = arr2.concat(Array.from(arr.filter(item => !sArr2.has(item))))
// console.log(union2)

// /* 差集 */
// let difference2 = arr.concat(arr2).filter(v => sArr.has(v) && !sArr2.has(v))
// console.log(difference2)

/* 交集 */
let intersection3 = arr.filter(function(item) {
  return arr2.indexOf(item) > -1
})
console.log(intersection3)