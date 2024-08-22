# 无界微前端方案

### 优势

1. 使用成本低
2. 运行快
   不仅可以预加载，也提供了类似 fiber 的方式，使用 requestIdleCallback Api 去执行，避免阻塞主应用的渲染进程。同时子应用的 js 在 iframe 执行，子应用通过 proxy + Object.defineproperty 的方式劫持 dom 操作，然后代理到 webcomponent shadowRoot 容器中
3. 天然的 js、css 隔离

- css 隔离：使用 webcomponent+shadowRoot（attachShadow） 包裹子应用
- js 隔离：使用 iframe 的 js 执行，然后通过代理渲染到 webcomponent shadowRoot 容器中

4. 功能强大
   包含子应用保活、嵌套、多应用激活、便捷通讯、生命周期、插件系统等
