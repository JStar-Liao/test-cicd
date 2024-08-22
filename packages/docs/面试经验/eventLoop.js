/*
 * @Author: liaoxing
 * @Date: 2022-06-13 18:24:55
 * @LastEditors: liaoxing
 * @LastEditTime: 2022-06-28 18:27:37
 * @Description: liaoxing created
 * @FilePath: \进击的面试\eventLoop.js
 */

// w 
// h 
// p 
// script start - async2 end - promise - script end - async3 start - promise1- promise2 - process.nextTick1 - process.nextTick2 - setImmediate1 - setImmediate2 - setTimeout - async3 end - 99 - async1 end
console.log('script start')

async function async1() {
  await async2()
  let i = await async3()
  console.log(i)
  console.log('async1 end')
}
async function async2() {
  console.log('async2 end') 
}
async function async3() {
  console.log('async3 start') 
  return new Promise((res, rej) => {
    setTimeout(() => {
      console.log('async3 end') 
      res(99)
    },1000)
  })
}
async1()

setImmediate(() => {
  console.log('setImmediate1');
})
process.nextTick(function() {
    console.log('process.nextTick1');
})

setTimeout(function() {
  console.log('setTimeout')
})

new Promise(resolve => {
  console.log('Promise')
  setImmediate(() => {
    console.log('setImmediate2');
  })
  process.nextTick(function() {
    console.log('process.nextTick2');
})
  resolve()
})
  .then(function() {
    console.log('promise1')
  })
  .then(function() {
    console.log('promise2')
  })

console.log('script end')
