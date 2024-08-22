import{_ as e,o,c as l,U as c}from"./chunks/framework.1bc6aac7.js";const b=JSON.parse('{"title":"flex 探究","description":"","frontmatter":{},"headers":[],"relativePath":"HTMLCSS/css/flex探究.md"}'),d={name:"HTMLCSS/css/flex探究.md"},i=c('<h1 id="flex-探究" tabindex="-1">flex 探究 <a class="header-anchor" href="#flex-探究" aria-label="Permalink to &quot;flex 探究&quot;">​</a></h1><h2 id="一、作用" tabindex="-1">一、作用 <a class="header-anchor" href="#一、作用" aria-label="Permalink to &quot;一、作用&quot;">​</a></h2><p>简便<code>display</code>+<code>position</code>+<code>float</code>等属性做一些特殊的布局，比如垂直居中、流式布局、响应式布局。对于目前的浏览器都有很好的支持。</p><h2 id="二、基本使用" tabindex="-1">二、基本使用 <a class="header-anchor" href="#二、基本使用" aria-label="Permalink to &quot;二、基本使用&quot;">​</a></h2><h3 id="_2-1-容器属性" tabindex="-1">2.1 容器属性 <a class="header-anchor" href="#_2-1-容器属性" aria-label="Permalink to &quot;2.1 容器属性&quot;">​</a></h3><ol><li><code>flex-direction</code>：定义内部元素是如何在弹性容器中布局的，定义了主轴的方向（正方向或反方向）。</li><li><code>flex-wrap</code>： 定义<code>flex</code>元素单行显示还是多行显示。如果允许换行，这个属性允许你控制行的堆叠方向。</li><li><code>flex-flow</code>：<code>flex-direction</code> 和 <code>flex-wrap</code> 的简写。</li><li><code>justify-content</code>：定义沿着弹性容器的主轴和网格容器的行向轴分配内容元素之间和周围的空间。</li><li><code>align-items</code>：定义所有直接子元素的<code>align-self</code>值作为一个组。在<code>Flexbox</code>中，它控制子元素在交叉轴上的对齐。在 Grid 布局中，它控制了子元素在其网格区域内的块向轴上的对齐</li><li><code>align-content</code>：定义沿着弹性盒子布局的纵轴和网格布局的主轴在内容项之间和周围分配空间。</li></ol><h3 id="_2-2-项目属性" tabindex="-1">2.2 项目属性 <a class="header-anchor" href="#_2-2-项目属性" aria-label="Permalink to &quot;2.2 项目属性&quot;">​</a></h3><ol><li><code>flex-grow</code>：设置<code>flex</code>项目主轴尺寸的每行均分时的所占比例。</li><li><code>flex-shrink</code>： 定义<code>flex</code>元素一行的收缩规则。<code>flex</code>元素仅在默认宽度之和大于容器的时候才会发生收缩，其收缩的大小是依据<code>flex-shrink</code>的值。</li><li><code>flex-basis</code>：指定了<code>flex</code>元素在主轴方向上的初始大小。如果不使用<code>box-sizing</code>改变盒模型的话，那么这个属性就决定了<code>flex</code>元素的内容盒<code>content-box</code>的尺寸</li><li><code>flex</code>：上面三个属性的简写</li><li><code>order</code>：属性规定了弹性容器中的可伸缩项目在布局时的顺序。元素按照<code>order</code>属性的值的增序进行布局。拥有相同<code>order</code>属性值的元素按照它们在源代码中出现的顺序进行布局。</li><li><code>align-self</code>：定义对齐当前<code>grid</code>或<code>flex</code>行中的元素，并覆盖已有的<code>align-items</code>的值。在<code>Flexbox</code>中，会按照当前<code>flex</code>元素排列方向的垂直方向进行排列。</li></ol><blockquote><p>属性定义=&gt;<a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex" target="_blank" rel="noreferrer">https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex</a></p></blockquote><h2 id="注意点" tabindex="-1">注意点 <a class="header-anchor" href="#注意点" aria-label="Permalink to &quot;注意点&quot;">​</a></h2><ol><li>justify-items、justify-self 在弹性盒子里是被忽略的</li><li>可以结合 gap 属性做流式间隔布局</li><li>项目不设置高度，也不设置<code>align-items</code>或者设置了<code>stretch</code>，项目高度会均匀填充满弹性盒子，默认值是<code>normal</code>在 flex 布局下它等同于<code>stretch</code></li><li>align-content 如果使用了 unsafe，滚动会失效</li><li>align-content 如果使用了，会覆盖 align-items 的效果</li><li>flex、flex-grow，会受 min-xxx 属性覆盖</li><li>flex-shrink 仅在单行生效</li><li>flex 值单数字相当于<code>flex-grow</code>、单数字单位或者<code>flex-basis</code>的值相当于<code>flex-basis</code>、双值数字加数字单位对应<code>flex-grow</code> | <code>flex-basis</code>、双值数字<code>flex-grow</code> | <code>flex-shrink</code></li></ol><ol start="9"><li>设置为弹性盒子，子元素时行内元素会被转换为块级元素</li></ol>',12),a=[i];function t(r,s,n,f,x,h){return o(),l("div",null,a)}const p=e(d,[["render",t]]);export{b as __pageData,p as default};
