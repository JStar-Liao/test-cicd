# Rollup 实现原理

## 定义

模块打包器，支持 ES6 模块，支持 Tree-shaking，但不支持 webpack 的 code-splitting、模块热更新等，这意味着它更适合用来做类库项目的打包器而不是应用程序项目的打包器

## 概念

1. magic-string
   是 Rollup 作者写的一个关于字符串操作的库，这个库主要是对字符串一些常用方法进行了封装
2. AST
   通过 javascript parse 可以把代码转化为一颗抽象语法树 AST，这颗树定义了代码的结构，通过操纵这个树，我们可以精确的定位到声明语句、赋值语句、运算符语句等等，实现对代码的分析、优化、变更等操作
3. AST 工作流
   Parse（解析）将代码转化成抽象语法树，树上有很多的 estree 节点 Transform(转换) 对抽象语法树进行转换 Generate（代码生成） 将上一步经过转换过的抽象语法树生成新的代码
4. acorn
   acorn 是一个 JavaScript 语法解析器，它将 JavaScript 字符串解析成语法抽象树 AST

## 实现过程

在 Rollup 中，一个文件就是一个模块，每个模块都会根据文件的代码生成一个 AST 抽象语法树。​

1. 首先生成一个打包器 bundle 实例，从入口出发，将其生成 module 实例
2. 在实例中，使用 acorn 方法将代码解析成 AST
3. 分析当前模块的 AST，有哪些导入导出、使用哪些变量，哪些是自身声明哪些是导入的，创建作用域链等，这里就会体现 treeshaking，没记录未使用，打包时就不会参与。
4. 开始生成代码，移除额外的代码，比如 export 关键字
5. 将 AST 的节点源码使用 magic-string 拼接，返回合并的代码
6. 根据配置信息生成文件

## 插件

对于一个真实的项目构建场景来说，我们还需要考虑到模块打包之外的问题，比如路径别名(alias) 、全局变量注入和代码压缩等等。因此 ，Rollup 设计出了一套完整的插件机制，将自身的核心逻辑与插件逻辑分离，让你能按需引入插件功能，提高了 Rollup 自身的可扩展性。

### Hook 类型

1. Async & Sync

2. Parallel
   并行钩子

3. Sequential
   串行钩子

4. First
   如果有多个插件实现了这个 Hook，那么 Hook 将依次运行，直到返回一个非 null 或非 undefined 的值为止。比较典型的 Hook 是 resolveId，一旦有插件的 resolveId 返回了一个路径，将停止执行后续插件的 resolveId 逻辑。

### 钩子函数

有很多钩子函数：

#### build 阶段工作流

options、buildStart,resolveld,load,transform,moduleParsed,resolveDynamicImport,buildEnd

#### output 阶段工作流

outputOptions,renderStart,banner,footer,intro,outro,renderDynamicImport,augumentChunkHash,resolveFileUrl,resolveImportMeta,renderChunk,generateBundle,writeBundle,renderError,closeBundle

#### 主要介绍

1. 路径解析：resolveId
   一般用来解析路径, Async + First 类型的钩子；
   - 返回值为 null 时，会默认交给下一个插件的 resolveId 钩子处理。
   - 返回值为 string 时，则停止后续插件的处理。这里为了让替换后的路径能被其他插件处理，特意调用了 this.resolve 来交给其它插件处理，否则将不会进入到其它插件的处理。
   - 返回值为一个对象，也会停止后续插件的处理，不过这个对象就可以包含更多的信息 (opens new window)了，包括解析后的路径、是否被 enternal、是否需要 tree-shaking 等等，不过大部分情况下返回一个 string 就够用了。
2. load
   load 为 Async + First 类型，即异步优先的钩子，和 resolveId 类似。它的作用是通过 resolveId 解析后的路径来加载模块内容
   load 钩子的入参是模块 id，返回值一般是 null、string 或者一个对象：
   - 如果返回值为 null，则交给下一个插件处理；
   - 如果返回值为 string 或者对象，则终止后续插件的处理，如果是对象可以包含 SourceMap、AST 等
3. 代码转换: transform
   Async + Sequential 类型，也就是异步串行钩子，作用是对加载后的模块内容进行自定义的转换
   - 入参分别为模块代码、模块 ID，返回一个包含 code(代码内容) 和 map(SourceMap 内容) 属性的对象，当然也可以返回 null 来跳过当前插件的 transform 处理。
   - 需要注意的是，当前插件返回的代码会作为下一个插件 transform 钩子的第一个入参，实现类似于瀑布流的处理
4. chunk 级代码修改: renderChunk
   chunk 级的代码修改，后续的插件仍然可能在 transform 中进行模块内容转换，进而可能出现符合替换规则的字符串，在此可以再次替换下
   - 有两个入参，分别为 chunk 代码内容、chunk 元信息 (opens new window)，返回值跟 transform 钩子类似，既可以返回包含 code 和 map 属性的对象，也可以通过返回 null 来跳过当前钩子的处理
5. 产物生成最后一步: generateBundle
   是异步串行的钩子，你可以在这个钩子里面自定义删除一些无用的 chunk 或者静态资源，或者自己添加一些文件
   - 入参分别为 output 配置、所有打包产物的元信息对象 (opens new window)，通过操作元信息对象你可以删除一些不需要的 chunk 或者静态资源，也可以通过 插件上下文对象的 emitFile 方法输出自定义文件

## 与 webpack 的区别

1. 设计理念不同

- webpack 是一个全能型的打包工具，可以处理 css、html、图片等资源。适合构建大型的 web 应用
- Rollup 主要是针对库打包而设计的 ESM 模块打包工具

2. 功能不同

- webpack 提供了 loader、chunks 分块、HMR 这些功能
- Rollup 在分析 AST 时自带了 treeshaking 机制

3. 插件机制不同

- webpack Loader 和 plugin 是分开的
- Rollup 可以直接在集中在一个插件，使用 transform 和 renderChunk 钩子
