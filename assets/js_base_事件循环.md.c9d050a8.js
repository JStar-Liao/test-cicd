import{_ as e,o as a,c as t,U as i}from"./chunks/framework.1bc6aac7.js";const p=JSON.parse('{"title":"事件循环","description":"","frontmatter":{},"headers":[],"relativePath":"js/base/事件循环.md"}'),o={name:"js/base/事件循环.md"},s=i('<h1 id="事件循环" tabindex="-1">事件循环 <a class="header-anchor" href="#事件循环" aria-label="Permalink to &quot;事件循环&quot;">​</a></h1><h2 id="定义" tabindex="-1">定义 <a class="header-anchor" href="#定义" aria-label="Permalink to &quot;定义&quot;">​</a></h2><p>事件循环是 js 运行时环境（如 Node.js 或浏览器环境）中处理异步操作的核心机制。</p><h2 id="基本概念" tabindex="-1">基本概念 <a class="header-anchor" href="#基本概念" aria-label="Permalink to &quot;基本概念&quot;">​</a></h2><ol><li>调用栈（Call Stack）：JavaScript 引擎有一个单线程的调用栈，用于执行同步代码。</li><li>任务队列（Task Queue）：当异步任务完成时（例如，setTimeout 回调、Promise 解析等），它们的回调函数会被添加到任务队列中等待执行</li><li>微任务队列（Microtask Queue）：某些异步任务，如 Promise 的回调函数，会被添加到微任务队列中，它们的优先级高于普通的任务队列。</li><li>事件循环：一个不断运行的循环，负责监控任务队列和微任务队列，并在调用栈为空时将任务从队列中推送到调用栈以供执行。</li><li>异步任务分为宏任务（包括 script（整体代码）、setTimeout、setInterval、setImmediate（Node.js 环境）和 I/O 操作等。）这些任务会被添加到任务队列中；微任务（包括 Promise 的.then、process.nextTick（Node.js 环境）、MutationObserver（浏览器环境）等。这些任务会被添加到微任务队列中，并在每个宏任务执行完毕后立即执行。）</li></ol><h2 id="工作原理" tabindex="-1">工作原理 <a class="header-anchor" href="#工作原理" aria-label="Permalink to &quot;工作原理&quot;">​</a></h2><ol><li>调用栈执行全局的同步代码</li><li>遇到各种异步任务将他们按宏、微任务按顺序加进对列里去</li><li>js 会先检查微任务队列，按先进先出原则，放到调用栈里去执行</li><li>后面再检查任务队列，，按先进先出原则，放到调用栈里去执行</li><li>每次任务执行完，js 都会去检查微任务队列里面有没有事件，有就取出执行，直到队列都空，程序结束。这样往复的动作，叫做事件循环。</li></ol>',7),l=[s];function r(n,c,_,d,h,u){return a(),t("div",null,l)}const b=e(o,[["render",r]]);export{p as __pageData,b as default};
