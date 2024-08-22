<!--
 * @Descriptios  : 
 * @Author       : maps131_liaoxing
 * @Date         : 2021-07-11 14:54:59
 * @LastEditors  : maps131_liaoxing
 * @LastEditTime : 2021-07-11 23:33:32
 * @FilePath     : \进击的面试\35-CommonJs和Es6Module的区别.md
-->
# CommonJs和Es6 Module的区别
## Es6 Module
ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS 和 AMD 模块，都只能在运行时确定这些东西。
ES6 模块不是对象，而是通过令显式指定输出的代码，再通过import命令输入。自动采用严格模式
```js
  // ES6模块
  import { stat, exists, readFile } from 'fs';
```
上面代码的实质是从fs模块加载 3 个方法，其他方法不加载。这种加载称为“编译时加载”或者静态加载，即 ES6 可以在编译时就完成模块加载，效率要比 CommonJS 模块的加载方式高。当然，这也导致了没法引用 ES6 模块本身，因为它不是对象。
### export
输出模块，一个模块就是一个独立的文件。该文件内部的所有变量，外部无法获取。如果你希望外部能够读取模块内部的某个变量，就必须使用export关键字输出该变量。因为是静态化的，所以不能写在运行时的代码里，会报错，违背初衷。

```js
  /* export 导出需要是{}包裹，或者是如下的直接声明方式*/
  export var firstName = 'Michael';
  export var lastName = 'Jackson';
  export function temp () {}

  /* 等同于 */
  var firstName = 'Michael';
  var lastName = 'Jackson';
  function temp () {}
  export {firstName, lastName, temp}

  /* as重命名 */
  function v1() { ... }
  function v2() { ... }

  export {
    v1 as streamV1,
    v2 as streamV2,
    v2 as streamLatestVersion
  }

  /* 输出default, 相当于把default后面的值赋值给default */
  export default 99
  export default function () {}

  /* 混合输出,加动态改变 */
  let c3 = {
    num: 33
  }
  let c4 = 44
  let c5 = 55

  export var c1 = 11
  setTimeout(() => c1 = 100, 3000)
  export function c2 () {}
  export {c4}
  export {c3}
  export {c5 as changeName}
  export default 8888
  /* 全部引入 */
  import * as temp from '上面的文件地址'
  console.log(temp) 
  /* 上面打印
    Module {
      c1: 99 // 引用类型之后变成100
      c2: ƒ c2()
      c3: Object
      c4: 44
      changeName: 55
      default: 8888
    }
  */
  console.log(temp.c1) // 99
  setTimeout(() => console.log(temp.c1), 3000) // 100
```
### import
使用export命令定义了模块的对外接口以后，其他 JS 文件就可以通过import命令加载这个模块。
* 引入是只读接口无法修改，但对象可以
* import命令具有提升效果，会提升到整个模块的头部，首先执行
```js
/* 引入 {}包裹的内容 */
import { firstName, lastName, temp } from './xx.js';
/* 引入default */
import temp from './xx.js'
/* 引入重命名 */
import { temp as othor} from './xx.js'
/* 全部引入 */
import * as all from './xx.js'
/* 混合引入, 引入了全部，又单独引入了其他模块，重复了，但可以这样做 */
import all, { firstName, lastName, temp } from './xx.js';
```
### export 与 import 的复合写法
如果在一个模块之中，先输入后输出同一个模块，import语句可以与export语句写在一起。
```js
export { foo, bar } from 'my_module';
// 可以简单理解为
import { foo, bar } from 'my_module';
export { foo, bar };
// 接口改名
export { foo as myFoo } from 'my_module';

// 整体输出
export * from 'my_module';

// 改成默认
export { es6 as default } from './someModule';
// 等同于
import { es6 } from './someModule';
export default es6;

// 默认改具名
export { default as es6 } from './someModule';


export * as ns from "mod";

// 等同于
import * as ns from "mod";
export {ns};
```

### import()
ES2020提案 引入import()函数，支持动态加载模块。
import函数的参数specifier，指定所要加载的模块的位置。import命令能够接受什么参数，import()函数就能接受什么参数，两者区别主要是后者为动态加载。
import()返回一个 Promise 对象。下面是一个例子。
```js
  const main = document.querySelector('main');

  import(`./section-modules/${someVariable}.js`)
    .then(module => {
      module.loadPageInto(main);
    })
    .catch(err => {
      main.textContent = err.message;
    });

```
### script中使用
```html
<script type="module">
  import lao from './index.js'
  console.log(lao)
  export {lao as sop} // 不知道咋接收
</script>
```

## CommonJs
1. Node 应用由模块组成，采用 CommonJS 模块规范。
2. 每个文件就是一个模块，有自己的作用域。在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见。
3. 运行时加载，加载的是整个对象
### module对象
Node内部提供一个Module构建函数。所有模块都是Module的实例。每个模块内部，都有一个module对象，代表当前模块。它有以下属性。
1. module.id 模块的识别符，通常是带有绝对路径的模块文件名。
2. module.filename 模块的文件名，带有绝对路径。
3. module.loaded 返回一个布尔值，表示模块是否已经完成加载。
4. module.parent 返回一个对象，表示调用该模块的模块。
5. module.children 返回一个数组，表示该模块要用到的其他模块。
6. module.exports 表示模块对外输出的值。
```js
  // example.js
  var jquery = require('jquery');
  exports.$ = jquery;
  console.log(module);
  // 打印出来的module
  module = { id: '.',
    exports: { '$': [Function] },
    parent: null,
    filename: '/path/to/example.js',
    loaded: false,
    children:
    [ { id: '/path/to/node_modules/jquery/dist/jquery.js',
        exports: [Function],
        parent: [Circular],
        filename: '/path/to/node_modules/jquery/dist/jquery.js',
        loaded: true,
        children: [],
        paths: [Object] } ],
    paths:
    [ '/home/user/deleted/node_modules',
      '/home/user/node_modules',
      '/home/node_modules',
      '/node_modules' ]
  }
```
> 如果是在入口文件，其parent为null

### module.exports属性
module.exports属性表示当前模块对外输出的接口，其他文件加载该模块，实际上就是读取module.exports变量。
```js
  // a.js
  var EventEmitter = require('events').EventEmitter;
  module.exports = new EventEmitter();

  setTimeout(function() {
    module.exports.emit('ready');
  }, 1000);

  // b.js
  var a = require('./a');
  a.on('ready', function() {
    console.log('module a is ready');
  });
```
### exports变量
为了方便，Node为每个模块提供一个exports变量，指向module.exports。这等同在每个模块头部，有一行这样的命令。
```js
  var exports = module.exports
  /* 如果修改了exports的指向，则断开了和module.exports的联系，无法导出，这意味着，如果一个模块的对外接口，就是一个单一的值，不能使用exports输出，只能使用module.exports输出。 */
```

### require
Node使用CommonJS模块规范，内置的require命令用于加载模块文件。require命令的基本功能是，读入并执行一个JavaScript文件，然后返回该模块的exports对象。如果没有发现指定模块，会报错。
```js
  // example.js
  var invisible = function () {
    console.log("invisible");
  }

  exports.message = "hi";

  exports.say = function () {
    console.log(message);
  }

  // other.js
  var example = require('./example.js');
  console.log(example)
  // {
  //   message: "hi",
  //   say: [Function]
  // }
```
#### 加载规则
require命令用于加载文件，后缀名默认为.js。
```js
var foo = require('foo');
//  等同于
var foo = require('foo.js');
```
根据参数的不同格式，require命令去不同路径寻找模块文件。

（1）如果参数字符串以“/”开头，则表示加载的是一个位于绝对路径的模块文件。比如，require('/home/marco/foo.js')将加载/home/marco/foo.js。

（2）如果参数字符串以“./”开头，则表示加载的是一个位于相对路径（跟当前执行脚本的位置相比）的模块文件。比如，require('./circle')将加载当前脚本同一目录的circle.js。

（3）如果参数字符串不以“./“或”/“开头，则表示加载的是一个默认提供的核心模块（位于Node的系统安装目录中），或者一个位于各级node_modules目录的已安装模块（全局安装或局部安装）。

举例来说，脚本/home/user/projects/foo.js执行了require('bar.js')命令，Node会依次搜索以下文件。

> /usr/local/lib/node/bar.js
> /home/user/projects/node_modules/bar.js
> /home/user/node_modules/bar.js
> /home/node_modules/bar.js
> /node_modules/bar.js

这样设计的目的是，使得不同的模块可以将所依赖的模块本地化。

（4）如果参数字符串不以“./“或”/“开头，而且是一个路径，比如require('example-module/path/to/file')，则将先找到example-module的位置，然后再以它为参数，找到后续路径。

（5）如果指定的模块文件没有发现，Node会尝试为文件名添加.js、.json、.node后，再去搜索。.js件会以文本格式的JavaScript脚本文件解析，.json文件会以JSON格式的文本文件解析，.node文件会以编译后的二进制文件解析。

（6）如果想得到require命令加载的确切文件名，使用require.resolve()方法

#### 模块的缓存
第一次加载某个模块时，Node会缓存该模块。以后再加载该模块，就直接从缓存取出该模块的module.exports属性。
```js
require('./example.js');
require('./example.js').message = "hello";
require('./example.js').message
```
上面代码中，连续三次使用require命令，加载同一个模块。第二次加载的时候，为输出的对象添加了一个message属性。但是第三次加载的时候，这个message属性依然存在，这就证明require命令并没有重新加载模块文件，而是输出了缓存。

如果想要多次执行某个模块，可以让该模块输出一个函数，然后每次require这个模块的时候，重新执行一下输出的函数。

所有缓存的模块保存在require.cache之中，如果想删除模块的缓存，可以像下面这样写。
```js
// 删除指定模块的缓存
delete require.cache[moduleName];

// 删除所有模块的缓存
Object.keys(require.cache).forEach(function(key) {
  delete require.cache[key];
})
```
#### 循环加载
如果发生模块的循环加载，即A加载B，B又加载A，则B将加载A的不完整版本。
```js
// a.js
exports.x = 'a1';
console.log('a.js ', require('./b.js').x);
exports.x = 'a2';

// b.js
exports.x = 'b1';
console.log('b.js ', require('./a.js').x);
exports.x = 'b2';

// main.js
console.log('main.js ', require('./a.js').x);
console.log('main.js ', require('./b.js').x);
```
上面代码是三个JavaScript文件。其中，a.js加载了b.js，而b.js又加载a.js。这时，Node返回a.js的不完整版本，所以执行结果如下。
```js
/* 第二次加载a.js和b.js时，会直接从缓存读取exports属性，所以a.js和b.js内部的console.log语句都不会执行了。 */
$ node main.js
b.js  a1
a.js  b2
main.js  a2
main.js  b2
```
#### require.main
require方法有一个main属性，可以用来判断模块是直接执行，还是被调用执行。

直接执行的时候（node module.js），require.main属性指向模块本身。
```js
require.main === module
// true
```
调用执行的时候（通过require加载该脚本执行），上面的表达式返回false。
#### 模块的加载机制
CommonJS模块的加载机制是，输入的是被输出的值的拷贝。也就是说，一旦输出一个值，模块内部的变化就影响不到这个值


# CommonJs和Es6 Module的区别
1. CommonJS 是同步加载模块（用在服务端），ES6是异步加载模块
2. CommonJS 模块输出的是一个值的拷贝，并且回缓存加载，ES6 模块输出的是值的引用，地址只读，可以修改属性。
3. CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
- 因为 CommonJS 加载的是一个对象（即module.exports属性），该对象只有在脚本运行完才会生成。
- 而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。