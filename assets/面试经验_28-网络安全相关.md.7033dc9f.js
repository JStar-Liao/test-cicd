import{_ as e,o as i,c as l,U as a}from"./chunks/framework.1bc6aac7.js";const p=JSON.parse('{"title":"web网络安全","description":"","frontmatter":{},"headers":[],"relativePath":"面试经验/28-网络安全相关.md"}'),s={name:"面试经验/28-网络安全相关.md"},r=a('<h1 id="web网络安全" tabindex="-1">web网络安全 <a class="header-anchor" href="#web网络安全" aria-label="Permalink to &quot;web网络安全&quot;">​</a></h1><h2 id="xss攻击-cross-site-scripting攻击-跨站脚本攻击" tabindex="-1">xss攻击 （Cross Site Scripting攻击,跨站脚本攻击） <a class="header-anchor" href="#xss攻击-cross-site-scripting攻击-跨站脚本攻击" aria-label="Permalink to &quot;xss攻击 （Cross Site Scripting攻击,跨站脚本攻击）&quot;">​</a></h2><ul><li>反射型：所谓反射型，得用户去触发，那得先注入，注入得通过页面劫持或者不法数据返回，所以不明白这是咋分成反射型的，和其他方式关联极大 <ul><li>账号密码 <ol><li>表单方式提交： 输入js代码，表单没做过滤转义，因为是get请求，会显示在浏览器地址栏，部分老旧浏览器不自动转义，会直接执行js代码</li></ol></li></ul></li><li>存储型 <ul><li>评论区、文章类 <ol><li>表单或者其他带参数提交：输入js或者有执行js能力的标签代码块，提交没做过滤转义，服务端接收和返回都没做处理，返回给页面，页面做读取渲染，像渲染script标签，执行其内代码、a标签，点击执行相应代码或者跳转某个地方</li></ol></li></ul></li></ul><h3 id="防御方式" tabindex="-1">防御方式 <a class="header-anchor" href="#防御方式" aria-label="Permalink to &quot;防御方式&quot;">​</a></h3><ol><li>前端入参字符转义过滤，服务端入参过滤</li><li>服务器端返回前过滤或者转义</li><li>长度限制</li><li>cookies设置httponly为true，让js无法获取</li><li>csp(Content-Security-Policy)，设置http头部，或者在meta头带入</li></ol><h2 id="csrf攻击-cross-site-request-forgery-跨站请求伪造" tabindex="-1">csrf攻击 （Cross-site request forgery, 跨站请求伪造） <a class="header-anchor" href="#csrf攻击-cross-site-request-forgery-跨站请求伪造" aria-label="Permalink to &quot;csrf攻击 （Cross-site request forgery, 跨站请求伪造）&quot;">​</a></h2><p>通过存储在cookies里的信息，请求自动带上，校验身份</p><ul><li>在只有cookies鉴权时，用户a登入网站A，拿到鉴权信息后，点进了用户b引诱的网页B，B内向网站A的服务发送了恶意请求，因为请求网站A时自动带上鉴权信息，所以请求能通过</li></ul><h3 id="防御方式-1" tabindex="-1">防御方式 <a class="header-anchor" href="#防御方式-1" aria-label="Permalink to &quot;防御方式&quot;">​</a></h3><ol><li>验证 HTTP Referer 字段。判断请求来源</li><li>添加请求参数双重验证</li><li>在 HTTP 头中自定义属性并验证</li><li>cookie设置SameSite，只能url和请求url同样时才带上cookies</li><li>验证码图片相关</li></ol><h2 id="sql注入" tabindex="-1">sql注入 <a class="header-anchor" href="#sql注入" aria-label="Permalink to &quot;sql注入&quot;">​</a></h2><p>利用服务端代码漏洞，注入可执行SQL代码，服务端读取时没做相关处理，导致这段SQL命令</p><h3 id="防御方式-2" tabindex="-1">防御方式 <a class="header-anchor" href="#防御方式-2" aria-label="Permalink to &quot;防御方式&quot;">​</a></h3><ol><li>长度限制</li><li>关键字过滤转义</li><li>不直接返回显示错误原因</li><li>预编译防注入</li></ol>',14),t=[r];function o(c,n,h,u,_,d){return i(),l("div",null,t)}const q=e(s,[["render",o]]);export{p as __pageData,q as default};
