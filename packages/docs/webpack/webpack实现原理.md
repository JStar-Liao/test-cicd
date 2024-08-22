# webpack

## 定义

一个用于现代 JavaScript 应用程序的 静态模块打包工具。当 webpack 处理应用程序时，它会在内部从一个或多个入口点构建一个 依赖图(dependency graph)，然后将你项目中所需的每一个模块组合成一个或多个 bundles，它们均为静态资源，用于展示你的内容。

## 作用

把静态模块内容，压缩、转译、打包等（前端工程化）

把 less/sass 转成 css 代码

把 ES6+ 降级成 ES5 等

支持多种模块文件类型，多种模块标准语法

## 加载器 loader

webpack 默认只识别 js 和 json，要想识别更多内容，就需要使用加载器器（loader）

### 规则 rules

它有两个属性：

1. test，识别出哪些文件会被转换，一般是正则匹配
2. use，定义用哪个 loader 进行转换

#### 占位符

1. 【hash】对模块内容做算法计算，得到映射的数字字母组合的字符串
2. 【ext】使用当前模块原本的占位符，例如：.png / .jpg 等字符串
3. 【query】保留引入文件时代码中查询参数（只有 URL 下生效

- 处理图片规则

```js
module.exports = {
  // ...
  module: {
    rules: [
      // ...
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: "asset",
        generator: {
          filename: "assets/[hash][ext][query]",
        },
      },
    ],
  },
};
```

- 识别 css，`css-loader`解析 css 代码，`style-loader`将解析的 css 代码插入到 DOM 里，`mini-css-extract-plugin`提取 css 到单文件中，好让浏览器缓存，需实例化到插件里。
- `less-loader`、`sass-loader`

### 类型

enforce 属性，分为前置(pre)、普通(normal)、行内(inline)、后置(post)

### 执行顺序

1. Pitching 阶段: Loader 上的 pitch 方法，按照 后置(post)、行内(inline)、普通(normal)、前置(pre) 的顺序调用。
2. Normal 阶段: Loader 上的 常规方法，按照 前置(pre)、普通(normal)、行内(inline)、后置(post) 的顺序调用。模块源码的转换， 发生在这个阶段。
3. 同等类型下的 normal Loader 执行顺序才是由右向左，或者由下到上执行。picth Loader 从左往右

> 这里的 normal loader 和 enforce 的不是同一个东西，源码处理转换在这个阶段

### 内联方式

1. 使用 ! 前缀，将禁用所有已配置的 normal loader(普通 loader)

```js
import test from "!c-loader";

const a = 1;
```

2. 使用 !! 前缀，将禁用其他类型的 loader，只要内联 loader

3. 使用 -! 前缀，将禁用所有已配置的 preLoader 和 loader，但是不禁用 postLoaders，也就是不要 pre 和 normal loader：

### 编写自定义 loader

三个参数 source、map、meta

1. loader 是一个函数，接收一个源代码
2. 不能是箭头函数因为要复用 this，传递上下文参数
3. 同步处理必须返回 buffer 或者 string，异步需要调用特定函数
4. 如果 pitch 有返回值，则会中断后面的 loader 链

## 插件 plugin

loader 用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。包括：打包优化，资源管理，注入环境变量。

### hooks

- entry-option 初始化 option
- run 开始编译
- compile 真正开始的编译，在创建 compilation 对象之前
- compilation 生成好了 compilation 对象
- make 从 entry 开始递归分析依赖，准备对每个模块进行 build
- after-compile 编译 build 过程结束
- emit 在将内存中 assets 内容写到磁盘文件夹之前
- after-emit 在将内存中 assets 内容写到磁盘文件夹之后
- done 完成所有的编译过程
- failed 编译失败的时候
- ...还有好多

### Hook 类型

1. SyncHook 同步钩子 Webpack 共出现 71 次，如 Compiler.hooks.compilation
2. SyncBailHook 同步熔断钩子 Webpack 共出现 66 次，如 Compiler.hooks.shouldEmit
3. SyncWaterfallHook 同步瀑布流钩子 Webpack 共出现 37 次，如 Compilation.hooks.assetPath
4. SyncLoopHook 同步循环钩子 Webpack 中未使用
5. AsyncParallelHook 异步并行钩子 Webpack 仅出现 1 次：Compiler.hooks.make
6. AsyncParallelBailHook 异步并行熔断钩子 Webpack 中未使用
7. AsyncSeriesHook 异步串行钩子 Webpack 共出现 16 次，如 Compiler.hooks.done
8. AsyncSeriesBailHook 异步串行熔断钩子 Webpack 中未使用
9. AsyncSeriesLoopHook 异步串行循环钩子 Webpack 中未使用
10. AsyncSeriesWaterfallHook 异步串行瀑布流钩子 Webpack 共出现 5 次，如 NormalModuleFactory.hooks.beforeResolve

### 执行顺序

钩子处理，没有执行顺序一说，谁先触发钩子谁先执行

### 自定义插件

```js
class TestPlugin {
  constructor() {
    console.log("TestPlugin constructor()");
  }
  // 1. webpack读取配置时，new TestPlugin() ，会执行插件 constructor 方法
  // 2. webpack创建 compiler 对象
  // 3. 遍历所有插件，调用插件的 apply 方法
  apply(compiler) {
    console.log("TestPlugin apply()");

    // 从文档可知, compile hook 是 SyncHook, 也就是同步钩子, 只能用tap注册
    compiler.hooks.compile.tap("TestPlugin", (compilationParams) => {
      console.log("compiler.compile()");
    });

    // 从文档可知, make 是 AsyncParallelHook, 也就是异步并行钩子, 特点就是异步任务同时执行
    // 可以使用 tap、tapAsync、tapPromise 注册。
    // 如果使用tap注册的话，进行异步操作是不会等待异步操作执行完成的。
    compiler.hooks.make.tap("TestPlugin", (compilation) => {
      setTimeout(() => {
        console.log("compiler.make() 111");
      }, 2000);
    });

    // 使用tapAsync、tapPromise注册，进行异步操作会等异步操作做完再继续往下执行
    compiler.hooks.make.tapAsync("TestPlugin", (compilation, callback) => {
      setTimeout(() => {
        console.log("compiler.make() 222");
        // 必须调用
        callback();
      }, 1000);
    });

    compiler.hooks.make.tapPromise("TestPlugin", (compilation) => {
      console.log("compiler.make() 333");
      // 必须返回promise
      return new Promise((resolve) => {
        resolve();
      });
    });

    // 从文档可知, emit 是 AsyncSeriesHook, 也就是异步串行钩子，特点就是异步任务顺序执行
    compiler.hooks.emit.tapAsync("TestPlugin", (compilation, callback) => {
      setTimeout(() => {
        console.log("compiler.emit() 111");
        callback();
      }, 3000);
    });

    compiler.hooks.emit.tapAsync("TestPlugin", (compilation, callback) => {
      setTimeout(() => {
        console.log("compiler.emit() 222");
        callback();
      }, 2000);
    });

    compiler.hooks.emit.tapAsync("TestPlugin", (compilation, callback) => {
      setTimeout(() => {
        console.log("compiler.emit() 333");
        callback();
      }, 1000);
    });
  }
}

module.exports = TestPlugin;
```

## 配置 Configuration

## 模块 Modules

与 Node.js 模块相比，webpack 模块能以各种方式表达它们的依赖关系。下面是一些示例：

- ES2015 import 语句
- CommonJS require() 语句
- AMD define 和 require 语句
- css/sass/less 文件中的 @import 语句。
- stylesheet url(...) 或者 HTML  `<img src=...>` 文件中的图片链接。

## 优化 Optimization

- `css-minimizer-webpack-plugin`压缩 css，在 optimization 的 minimizer 里实例化

## 热更新机制

1. 本地服务启动时，会启动一个 websocket 服务，与浏览器建立连接
2. 服务端监控到文件修改，会去构建新的模块，生成新的编译标识
3. 与旧模块做对比，分析出要替换的模块，生成热更新文件
4. ws 通知浏览器更新，浏览器根据编译标识获取到更新文件，在浏览器里做模块的更新替换删除

## treeshaking 机制

### 定义

是一种基于 ES Module 规范的 Dead Code Elimination 技术，它会在运行过程中静态分析模块之间的导入导出，确定 ESM 模块中哪些导出值未曾其他模块使用，并将其删除，以此实现打包产物的优化。

### 实现过程

1. 构建阶段收集模块信息，有哪些导出值，形成导出列表，记录到依赖关系图 ModuleGraph 对象里去
2. 封装阶段，再次遍历模块，标记出导出列表哪些导出值被用到，哪些没有
3. 导出阶段，将未使用和使用的值生成不同的代码
4. 删除阶段，根据生成代码的标记，使用 Terser、UglifyJS 等 DCE 工具，删除无效代码

> 注意
>
> 1. Tree-Shaking 强依赖于 ESM 模块化方案的静态分析能力，所以应尽量坚持使用 ESM 编写模块代码。
> 2. 禁止 Babel 转译模块导入导出语句
> 3. 使用支持 Tree Shaking 的包

## 开发环境搭建

使用`webpack-dev-server`做服务器

```js
// ...

module.exports = {
  // ...
  mode: "development",
};
```

```json
"scripts": {
  "build": "webpack --mode=production",
  "dev": "webpack serve --mode=development"
}
```

> 注意：命令行设置的优先级高于配置文件中的，推荐用命令行设置。
> 开发模式注重代码热替换更快，让开发调试代码更便捷
> 生产模式注重项目体积更小，更轻量，适配不同的浏览器环境

### 注入环境变量

```js
// ...
const webpack = require("webpack");

module.exports = {
  // ...
  plugins: [
    // ...
    new webpack.DefinePlugin({
      // key 是注入到打包后的前端 JS 代码中作为全局变量
      // value 是变量对应的值（在 corss-env 注入在 node.js 中的环境变量字符串）
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};
```

### 别名

```js
// ...

const config = {
  // ...
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
};
```

### 外部扩展 Externals

externals 配置选项提供了「从输出的 bundle 中排除依赖」的方法。相反，所创建的 bundle 依赖于那些存在于用户环境(consumer's environment)中的依赖

#### 获取第三方对应 key,value

key 是 package.json 中安装的包名，value 导出时的全局变量

#### 缺点

没 tree shaking

## 编译打包过程

### 概念

1. bundle

- Bundle（捆绑包）是指将所有相关的模块和资源打包在一起形成的单个文件。它是应用程序的最终输出，可以在浏览器中加载和执行。
- 捆绑包通常由 Webpack 根据入口点（entry）和它们的依赖关系自动创建。当你运行 Webpack 构建时，它会根据配置将所有模块和资源打包成一个或多个捆绑包。

2. Chunk

- Chunk（代码块）是 Webpack 在打包过程中生成的中间文件，它代表着一堆 module 的集合。

- Webpack 根据代码的拓扑结构和配置将模块组织成不同的代码块。每个代码块可以是一个独立的文件，也可以与其他代码块组合成一个捆绑包。

- Webpack 使用代码分割（code splitting）技术将应用程序代码拆分成更小的代码块，以便在需要时进行按需加载。这有助于减小初始加载的文件大小，提高应用程序的性能。

- 在 Webpack 中，捆绑包和代码块之间存在一对多的关系。一个捆绑包可以包含多个代码块，而一个代码块也可以属于多个不同的捆绑包。这取决于 Webpack 配置中的拆分点（split points）和代码块的依赖关系。

### 过程

1. 初始化参数：从配置文件和 Shell 语句中读取与合并参数,得出最终的参数。
2. 开始编译：用上一步得到的参数初始化 Compiler 对象,加载所有配置的插件,执行对象的 run 方法开始执行编译。
3. 确定入口：根据配置中的 entry 找出所有的入口文件。
4. 编译模块：创建 compilation 对象，和其相关回调钩子，从入口文件出发,调用所有配置的 Loader 对模块进行翻译,再找出该模块依赖的模块,再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理。
5. 完成模块编译：在经过第 4 步使用 Loader 翻译完所有模块后,得到了每个模块被翻译后的最终内容以及它们之间的依赖关系。
6. 输出资源：根据入口和模块之间的依赖关系,组装成一个个包含多个模块的 Chunk,再把每个 Chunk 转换成一个单独的文件加入到输出列表,这步是可以修改输出内容的最后机会。
7. 输出完成：在确定好输出内容后,根据配置确定输出的路径和文件名,把文件内容写入到文件系统

- 在以上过程中,Webpack 会在特定的时间点广播出特定的事件,插件在监听到感兴趣的事件后会执行特定的逻辑,并且插件可以调用 Webpack 提供的 API 改变 Webpack 的运行结果。
