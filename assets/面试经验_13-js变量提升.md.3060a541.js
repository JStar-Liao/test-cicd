import{_ as s,o as a,c as n,U as l}from"./chunks/framework.1bc6aac7.js";const u=JSON.parse('{"title":"js变量提升","description":"","frontmatter":{},"headers":[],"relativePath":"面试经验/13-js变量提升.md"}'),e={name:"面试经验/13-js变量提升.md"},p=l(`<h1 id="js变量提升" tabindex="-1">js变量提升 <a class="header-anchor" href="#js变量提升" aria-label="Permalink to &quot;js变量提升&quot;">​</a></h1><p>函数优先原则，然后形参</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark"><code><span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(f1) </span><span style="color:#6A737D;">// 打印函数</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> f1 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">f1</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;f1&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div>`,3),o=[p];function r(c,t,E,i,_,d){return a(),n("div",null,o)}const b=s(e,[["render",r]]);export{u as __pageData,b as default};
