import{_ as e,o as n,c as a,U as s}from"./chunks/framework.1bc6aac7.js";const h=JSON.parse('{"title":"undefined、null 区别","description":"","frontmatter":{},"headers":[],"relativePath":"js/base/undefinedWithnullDiff.md"}'),l={name:"js/base/undefinedWithnullDiff.md"},o=s(`<h1 id="undefined、null-区别" tabindex="-1">undefined、null 区别 <a class="header-anchor" href="#undefined、null-区别" aria-label="Permalink to &quot;undefined、null 区别&quot;">​</a></h1><h2 id="定义" tabindex="-1">定义 <a class="header-anchor" href="#定义" aria-label="Permalink to &quot;定义&quot;">​</a></h2><p>两者都代表空，都是原始数据类型，使用<code>typeof</code>的类型检查，可以看出<code>undefined</code>就是<code>undefined</code>类型，<code>null</code> 是 <code>object</code> 类型（历史原因）。所以根据这个判断，可以帮助理解。</p><ul><li><code>null</code> 是一个没有地址指向的对象（尚未创建的对象）</li><li><code>undefined</code> 未去定义这个变量</li></ul><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark"><code><span class="line"><span style="color:#6A737D;">// null</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">a</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#6A737D;">// undefined</span></span>
<span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> b;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h2 id="注意点" tabindex="-1">注意点 <a class="header-anchor" href="#注意点" aria-label="Permalink to &quot;注意点&quot;">​</a></h2><ol><li>typeof 检查 null 的类型为 object</li><li>unefined 计算时会隐式转换为 NaN、null 为 0</li><li>JSON.stringify 时如果对象属性值是 undefined，会删除该属性，因为删掉后表现形式也没不同，在需要保留时就得注意了</li><li>判断时两者转换为 false</li></ol>`,7),i=[o];function d(t,c,r,p,u,f){return n(),a("div",null,i)}const b=e(l,[["render",d]]);export{h as __pageData,b as default};
