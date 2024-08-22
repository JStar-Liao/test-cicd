/*
 * @Author: liaoxing
 * @Date: 2022-06-13 17:38:34
 * @LastEditors: liaoxing
 * @LastEditTime: 2022-06-13 18:23:21
 * @Description: liaoxing created
 * @FilePath: \进击的面试\var.js
 */

console.log(i)
var i = 1
func(1)
function func(i) {
  if (i > 3) {
    return
  }
  console.log(i)
  func(i + 1)
  console.log(i)
}
console.log(i)
for (let a = 0; a < 7; a++) {
  if (!b) {
    var b = 1
  }
  b = b * a
}

console.log(b)

/* 
  func1 1
    1
    func2 2
    2
      func3 3
      3
        func4 4
        return
      func3 3
      3
    func2 2
    2
  func1
  1

  undefind 1233211
*/


