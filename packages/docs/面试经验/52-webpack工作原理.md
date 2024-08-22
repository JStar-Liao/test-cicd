<!--
 * @Descriptios  : 
 * @Author       : maps131_liaoxing
 * @Date         : 2021-07-17 12:37:15
 * @LastEditors  : maps131_liaoxing
 * @LastEditTime : 2021-07-17 17:19:22
 * @FilePath     : \进击的面试\52-webpack工作原理.md
-->
# webpack工作原理
webpack的运行流程是一个串行的过程，从启动到结束会依次执行以下流程:
1. 读取命令和config文件，初始化本次构建的参数，会执行new plugin()
2. 拿到参数创建Compiler实例，包含整个webpack信息，负责文件的启动和编译，全局只有一个
3. 读取entry入口信息，遍历出所有入口文件
4. 开始编译，创建compilation对象，和其相关回调钩子
5. 依次进入每个入口用loader对文件进行编译，将编译好的内容生成ast抽象语法树，然后继续递归
6. 全部解析编译玩，整理所有chunk，准备输出
7. 询问插件哪些文件需要输出，哪些不需要，执行输出文件
8. 成功完成一次编译和输出流程
<img src="./img/why_webpack_compile.jpg">
