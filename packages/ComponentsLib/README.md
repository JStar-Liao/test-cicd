<p align="center">
  <a href="http://192.168.8.131/saas-basement/frontend/jstar-public-lib.git" target="_blank" rel="noopener noreferrer">
    <img width="180" src="https://i.328888.xyz/2023/04/25/iouNDC.png" alt="jstar logo">
  </a>
</p>

<br/>
<p align="center">
  <img src="https://img.shields.io/badge/npm-v0.0.0%2B-%23407fbc" alt="vue">
</p>
<br/>

* 💪 Vue 3 Composition API
* 🔥 Written in TypeScript

# jstar公共组件库

## 全局引入组件
``` js
/* cjs */
const all = require("jstar-comp-lib")
/* es */
import all from "jstar-comp-lib"
```
## 全局引入样式
``` js
import "jstar-comp-lib/dist/style.css"
```

## 按需引入组件
```js
const { rsCountTo }  = require("jstar-comp-lib")
import { rsCountTo } from "jstar-comp-lib"
```

## 按需引入样式
```js
import "jstar-comp-lib/dist/style/common.css" // jstarelement-plus 样式
import "jstar-comp-lib/dist/style/rsCountTo.css" // jstarrsCountTo组件相关样式
```