
export const argsNumberOverload = (overloadObj:  {[x: string]: () => any}, name: string, fn: any) => {
  const old = overloadObj[name]
  overloadObj[name] = function (...args: any) {
    if (args.length === fn.length) {
      return fn.apply(this, args)
    } else if (typeof old === 'function') {
      return old.apply(this, args)
    }
  }
}