// const arr = [9,2,5,6,1,0,1,2]

// function insertSort (arr) {
//   for(let i = 1; i < arr.length; i++) {
//     const el = arr[i]
//     let preIndex = i - 1
//     while(arr[preIndex] > el) {
//       arr[preIndex + 1] = arr[preIndex]
//       preIndex--
//     }
//     arr[preIndex + 1] = el
//   }
//   console.log(arr)
// }

// insertSort(arr)


// const obj = {
//   a:1
// }

// const p = new Proxy(obj, {
//   set(a, b, c) {
//     console.log('set', a, b, c)
//     a[b] = 2
//     return true
//   },
//   deleteProperty(a, b) {
//     console.log('del', a, b)
//     delete a[b]
//     return true
//   }
// })

// p.b = 2
// delete p.a
// console.log(p)

// function add (a, b, c) {
//   return a + b + c
// }

// function currey(fn) {
//   return function exec(...arr) {
//     if (fn.length <= arr.length) {
//       return fn.apply(this, arr)
//     } else {
//       return exec.bind(this, ...arr)
//     }
//   }
// }

// const t = currey(add)
// console.log(t(1)(2, 3))

// function myNew(func, arg) {
//   let obj = {}
//   const [constructor, ...args] = arguments;

//   obj.__proto__ = constructor.prototype

//   const res = constructor.apply(obj, args)

//   return typeof res === 'object' ? res : obj
// }