import{d as i,O as s,a5 as p,u,h as c,l,a6 as d,a7 as f,a8 as m,a9 as h,aa as A,ab as g,ac as P,ad as v,ae as w,af as y,ag as C,ah as E,ai as R,E as _}from"./chunks/framework.1bc6aac7.js";import{t as b}from"./chunks/theme.49acdc83.js";const D={...b};function r(e){if(e.extends){const a=r(e.extends);return{...a,...e,async enhanceApp(t){a.enhanceApp&&await a.enhanceApp(t),e.enhanceApp&&await e.enhanceApp(t)}}}return e}const n=r(D),O=i({name:"VitePressApp",setup(){const{site:e}=u();return c(()=>{l(()=>{document.documentElement.lang=e.value.lang,document.documentElement.dir=e.value.dir})}),d(),f(),m(),n.setup&&n.setup(),()=>h(n.Layout)}});async function T(){const e=S(),a=x();a.provide(A,e);const t=g(e.route);return a.provide(P,t),a.component("Content",v),a.component("ClientOnly",w),Object.defineProperties(a.config.globalProperties,{$frontmatter:{get(){return t.frontmatter.value}},$params:{get(){return t.page.value.params}}}),n.enhanceApp&&await n.enhanceApp({app:a,router:e,siteData:y}),{app:a,router:e,data:t}}function x(){return C(O)}function S(){let e=s,a;return E(t=>{let o=R(t);return e&&(a=o),(e||a===o)&&(o=o.replace(/\.js$/,".lean.js")),s&&(e=!1),_(()=>import(o),[])},n.NotFound)}s&&T().then(({app:e,router:a,data:t})=>{a.go().then(()=>{p(a.route,t.site),e.mount("#app")})});export{T as createApp};
