/*
 * @Author: liaoxing
 * @Date: 2022-06-13 18:13:23
 * @LastEditors: liaoxing
 * @LastEditTime: 2022-06-13 18:22:12
 * @Description: liaoxing created
 * @FilePath: \进击的面试\thisDirective.js
 */
var name = 'A'

var Biden = {
  name: 'B',
  log1: function () {
    console.log(this.name)
  },
  log2: () => console.log(this.name),
  log3: function () {
    return function () {
      console.log(this.name)
    }
  },
  log4: function () {
    return () => {
      console.log(this.name)
    }
  }
}

var Trump = { name: 'T' }

Biden.log1()
Biden.log1.call(Trump)

Biden.log2()
Biden.log2.call(Trump)

Biden.log3()()
Biden.log3.call(Trump)()
Biden.log3().call(Trump)

Biden.log4()()
Biden.log4.call(Trump)()
Biden.log4().call(Trump)
