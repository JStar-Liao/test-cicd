# 手写promise
```js
/*
 * @Author: maps131_liaoxing
 * @Date: 2021-06-11 15:58:48
 * @LastEditors  : maps131_liaoxing
 * @LastEditTime : 2021-06-29 00:12:53
 * @Description: 手写promise
 * promise规则
 *  0. 自身有reslove、reject、then、catch、finally、all、race方法
 *  1. 可以链式调用then、catch、finally，且catch、finally不阻断链式调用
 *  3. resolve后执行then的第一个函数参数，然后进行链式调用
 *  4. reject后执行then的第二函数参数，如果没则执行catch调用，如果没catch调用，则报错 Uncaught (in promise) param，然后进行链式调用
 *  5. 链式调用返回值可以是promise对象，后面的链式调用都属于新promise对象
 *  6. 同步执行和异步执行的结果都一样
 *  7. resolve、reject的参数和链式调用的返回值，作为下一个链式调用的参数
 *  8. 同一promise，catch执行一次
 *  9. all方法需要等所有promise执行完毕出发，包括其链式调用，如果链式调用不返回值，all接收的值为undefined
 *  10. race方法返回最快执行完毕返回值，包括其链式调用，如果链式调用不返回值，race接收的值为undefined，不阻断较慢promise执行
 */

class $Promise{
  /**
   * @description: 模拟promise上面的11条规则，我这里主干逻辑是保证所有的链式调用，遇到所有pendding状态的promise,都将其添加进等待任务，等状态改变后循环触发
   * @param { Function } callBack
   * @param { String } name
   * @return {*}
   */  
  constructor (callBack, name) {
    if (typeof callBack !== 'function') {
      throw new Error('$Promise resolver ' + callBack +' is not a function')
    }
    this.name = name
    this.status = 'pedding' // 状态
    this.resParam = null // res与链式传递的值
    this.rejParam = null // rej的值
    this.waitTask = [] // 被异步阻断的任务
    callBack(this.resolve.bind(this), this.reject.bind(this))
  }
  resolve (param) {
    this.status = 'resolved'
    this.resParam = param
    /* 触发等待的任务 */
    this.oprateTask()
  }
  reject (param) {
    this.status = 'rejected'
    this.rejParam = param
    /* 如果一直处于rejected状态说明没catch和then第二参，报个错 */
    setTimeout(() => {
      if (this.status === 'rejected') {
        console.error('Uncaught (in $Promise)', this.rejParam)
      }
    })
    /* 触发等待的任务 */
    this.oprateTask()
  }
  then (next, rejNext) {
    if (!next) return this
    /* 返回值是$Promise对象，将后面的 */
    if (this.resParam instanceof $Promise) {
      let that = this.resParam
      return this.oprateThen(that, next, rejNext)
    }
    /* 返回值不是$Promise对象 */
    return this.oprateThen(this, next, rejNext)
  }
  catch (next) {
    /* 返回值是$Promise对象 */
    if (this.resParam instanceof $Promise) {
      let that = this.resParam
      return this.oprateCach(that, next)
    }
    /* 返回值不是$Promise对象 */
    return this.oprateCach(this, next)
  }
  finally (next) {
    if (this.resParam instanceof $Promise) {
      let that = this.resParam
      return this.oprateFina(that, next)
    }
    /* 返回值不是$Promise对象 */
    return this.oprateFina(this, next)
  }
  oprateTask () {
    /* 如果没有等待任务就直接调出 */
    if (!this.waitTask.length) return
    /* 循环调用等待任务，根据类型用方法调用 */
    this.waitTask.forEach(item => {
      if (item.res) {
        this.then(item.res, item.rej)
      } else if(item.fina) {
        this.finally(item.fina)
      } else {
        this.catch(item.catch)
      }
    })
  }
  oprateThen (that, next, rejNext) {
    /* 等待状态，将链式调用加进等待任务，待状态改变循环调用 */
    if (that.status === 'pedding') {
      that.waitTask.push({res: next, rej: rejNext || null, catch: null, fina: null})
    }
    /* 解决状态直接执行then，并将返回值赋给resParam，然后当作下一链式调用的参数 */
    if (that.status === 'resolved') {
      that.resParam = next(that.resParam)
    }
    /* 有第二参就执行，并改状态，以便后面的链式，没就直接返回that，调用下一个链式 */
    if (that.status === 'rejected') {
      if (!rejNext) return that

      that.rejParam = rejNext(that.rejParam)

      that.resParam = that.rejParam
      that.status = 'resolved'
    }
    /* 返回that,才有链式的指向 */
    return that
  }
  oprateCach (that, next) {
    if (that.status === 'pedding') {
      that.waitTask.push({res: null, rej: null, catch: next, fina: null})
    }
    /* 只有rejected状态才能触发，将返回值指向resParam,然后修改状态，以便下一链式调用 */
    if (that.status !== 'rejected') return that
    that.rejParam = next(that.rejParam)

    that.resParam = that.rejParam
    that.status = 'resolved'
    /* 返回that,才有链式的指向 */
    return that
  }
  oprateFina (that, next) {
    if (that.status === 'pedding') {
      that.waitTask.push({res: null, rej: null, catch: null, fina: next})
      return that
    }
    /* finally直接触发，没参数没返回 */
    next()
    /* 返回that,才有链式的指向 */
    return that
  }
}

$Promise.all = (promiseList) => {
  let count = promiseList.length // 用来判断有没有全部执行完毕
  let resData = [] // 存储返回值
  resData.length = count // 赋值empty空值
  /* 向返回值添加值，并-1，相当于完毕一个执行，等于0时res返回值，all结束 */
  const judge = (index, result, res) => {
    resData[index] = result
    count--
    if (!count) res(resData)
  }
  /* 返回各$Promise，以便then */
  return new $Promise((res, rej) => {
    /* 循环调用 */
    promiseList.forEach((item, index) => {
      item.then(data => {
        judge(index, data, res)
      }) 
    })
  })
}

$Promise.race = (promiseList) => {
  let resData = null // 存储最快执行完毕的返回值
  /* 有返回值了就不再触发res */
  const judge = (data, res) => {
    if (resData) return
    resData = data
    res(resData)
  }
  return new $Promise((res, rej) => {
    /* 循环调用 */
    for (let item of promiseList) {
      item.then(data => {
        judge(data, res)
      })
    }
  })
}
```