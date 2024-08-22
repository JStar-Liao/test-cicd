<!--
 * @Descriptios  : 
 * @Author       : maps131_liaoxing
 * @Date         : 2021-06-24 21:28:26
 * @LastEditors  : maps131_liaoxing
 * @LastEditTime : 2021-06-24 21:32:26
 * @FilePath     : \进击的面试\浏览器cookies工作原理.md
-->
# cookies
| 属性名 | 描述 |
| ---- | ---- |
| path | Cookie的使用路径。如果设置为“/sessionWeb/”，则只有contextPath为“/sessionWeb”的程序可以访问该Cookie。如果设置为“/”，则本域名下contextPath都可以访问该Cookie。注意最后一个字符必须为“/”。 |
| domain | 可以访问该Cookie的域名。如果设置为“.google.com”，则所有以“google.com”结尾的域名都可以访问该Cookie。注意第一个字符必须为“.”。 |
```js
// 设置cookies
  document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
```

1. 姓名，今天来面试啥
2. 在过往的6年中，vue25年，vue31年
3. 上一家主要做信息系统和综合性工作台，还有流程低代码、表单低代码平台。用来做事务的自动流转。
4. 在上一家公司从开发人员晋升到了前端组长，同时职责也多了，比如搭建通用脚手架，前端公共组件库，指定前端规范，代码质量把控，疑难问题帮助解决这些
5. 会使用同nestjs，做模糊、多条件查询、树状结构数据、创建关系数据表、多表联查、webscoket、sse、微服务等业务功能，也熟悉express和koa。
7. 上家离职原因