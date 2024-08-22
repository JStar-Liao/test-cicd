<p align="center">
  <a href="https://gitee.com/maps_x/front-end-scraps.git" target="_blank" rel="noopener noreferrer">
    <img width="180" src="./star.png" alt="jstar logo">
  </a>
</p>

<br/>
<p align="center">
  <img src="https://img.shields.io/badge/vue-v3.2.0%2B-%23407fbc" alt="vue">
</p>
<br/>

* 💪 Vue 3 Composition API
* 🔥 Written in TypeScript

# JStar的前端边角料博客打包库
零零碎碎学习，收集，觉得需要记下来的东西，做成示例，然后生成博客文档。

## 库功能
1. 组件、样式
    * 分了es与cjs模块
    * 组件可全局、按需引入
    * 样式可全局、按需引入
    * 生成jstarelement-plus主题颜色css
2. 方法 
    * 分了es与cjs模块
    * 方法可全局、按需引入
3. 调试`开发时`与`打包后`的组件、方法
4. 可编写vitest测试用例，查看测试结果与覆盖率
5. 发布到私有镜像
6. 使用文档生成静态页面

# 快速使用
## 安装pnpm
```shell
npm install pnpm -g
```
## 克隆代码到本地

```shell
# gitlab
git clone https://gitee.com/maps_x/front-end-scraps.git
```

## 安装依赖

```shell
# 根目录
pnpm install -w
```

## 初始化husky
```
pnpm prepare
```

## 开发组件或方法
在`packages/components/`下面创建组件文件夹，编写组件。编写好后将其导入到`collect.ts`里面。

`element`主题颜色在`style/element-plus`修改

在`packages/utils/`下面创建方法。编写好后将其导入到`collect.ts`里面。

## 单元测试（可选）
在`components`和`utils`的test文件夹，创建对应得到测试文件，执行命令时会去获取这下面所有的测试用例，调试测试用例执行`pnpm test`，查看测试覆盖率执行`pnpm cover`

## 调试
1. 在`debugger`文件夹里安装本地包`pnpm --filter debugger add @jstar-public-lib/utils @jstar-public-lib/components`
2. `pnpm debugger`开启调试服务
3. 然后全局引入或者按需引入组件调试
## 打包
组件方法全部打包`pnpm build`，组件单独打包`pnpm build:c`，方法单独打包`pnpm build:m`。打包后的文件会生成在`components/ComponentsLib/dist`和components/MethodsLib/dist`里面

## 调试打包后的
1. 在`debugger`文件夹里安装本地包`pnpm --filter debugger add jstar-comp-lib jstar-methods-lib`
2. `pnpm debugger`开启调试服务
3. 然后全局引入或者按需引入组件调试
## 发布
> 先提交本地代码`pnpm cm`
1. 安装`nrm`镜像管理工具，`npm install nrm -g`
2. 增加私有镜像源 `nrm add myImage http://192.168.28.51:4873`
3. 使用私有镜像源`nrm use myImage`
  * 没注册登入先注册登入
4. 执行发布
  * 发布组件`publish:c`
  * 发布方法`publish:m`
5. 版本号说明AA.BB.CC => 1.0.0
  * AA 核心代码修改比如把vite化成webpack后 + 1
  * BB 新组件 + 1
  * CC 组件修改 + 1
6. 发布选项
  Publish jstar-comp-lib to npm? Y
  Commit Y
  Tag n
  Push Y

## 编写使用文档
1. 安装打包后的组件`pnpm --filter docs add jstar-comp-lib jstar-methods-lib`，注意切换回npm源
2. `docs/component`或者docs/methods下面创建组件说明md文档，里面可以写vue，也可以引入vue组件
3. 在`docs/.vitepress/config.ts`里的sidebar，添加文档路由
4. 开启本地文档服务`pnpm docs:dev`查看调试文档页面
5. 打包页面发布到gitlab静态资源托管还在实现中。。。


# 命令介绍

```shell
# 本地调试
pnpm debugger

# 打包组件库和方法
pnpm build

# 打包组件
pnpm build:c

# 打包方法
pnpm build:m

# 提交代码
pnpm cm

# 单元测试
pnpm test

# 查看测试覆盖率
pnpm cover

# 发布组件库
pnpm publish:c

# 发布方法库
pnpm publish:m

# 本地文档调试
pnpm docs:dev

# 本地文档打包
pnpm docs:build

# 发布线上文档
暂未实现

```

## 目录介绍

``` js
rs-components-lib
├─ debugger // vite-vue3-ts脚手架目录，用来调试开发时和打包后的组件、方法
│  ├─ .gitignore
│  ├─ index.html
│  ├─ package.json
│  ├─ public
│  │  └─ vite.svg
│  ├─ src
│  │  ├─ App.vue
│  │  ├─ assets
│  │  │  └─ vue.svg
│  │  ├─ main.ts
│  │  ├─ style.css
│  │  ├─ types
│  │  │  └─ index.d.ts
│  │  └─ vite-env.d.ts
│  ├─ tsconfig.json
│  ├─ tsconfig.node.json
│  └─ vite.config.ts
├─ package.json
├─ packages
│  ├─ components // 组件开发包
│  │  ├─ collect.ts
│  │  ├─ index.ts
│  │  ├─ package.json
│  │  ├─ rsText
│  │  │  ├─ index.scss
│  │  │  ├─ index.ts
│  │  │  └─ index.vue
│  │  ├─ style // 样式包
│  │  │  ├─ element-plus
│  │  │  │  ├─ common.scss
│  │  │  │  └─ dark.scss
│  │  │  └─ theme
│  │  ├─ tools // 组件工具包
│  │  │  └─ vueInstall.ts
│  │  └─ vite-env.d.ts
│  ├─ ComponentsLib // 组件打包出口
│  │  └─ package.json // 库包信息
│  ├─ MethodsLib // 方法打包出口
│  │  └─ package.json
│  └─ utils // 方法开发包
│     ├─ collect.ts
│     ├─ count.ts
│     ├─ index.ts
│     └─ package.json
├─ pnpm-workspace.yaml
├─ scripts
│  ├─ build.js // 打包工具
│  ├─ buildCss.js // 打包css工具
│  ├─ copyScssFiles.js // 复制element scss

```