---
title: 模块化编程
date: 2021-08-31 14:45:29
tags: 前端知识
description: 前端模块化编程
---

### 1. 模块化编程

> 将一个大程序按照功能划分为若干小程序模块

类比java中的import, c#的using

### 2. AMD（异步模块定义）

### 3. Common.js  (node.js的模块化规范)

​    **同步一次性加载**        **运行时加载**

```js
// 全局加载模块
const util = require('util');
```

```js
// 模块定义exports   模块标示module 
// exports()对象用于导出当前模块的变量或方法
module.exports = {

}

// require用来引入外部模块
const util = require('util.js')
```

### 4. ES6 Module

**静态化**，使得**编译时**就能确定模块的依赖关系

### 5. ES6与Common.js模块的差异

- Common.js模块输出一个值的复制， ES6模块输出值的引用
- Common.js模块是运行时加载，ES6模块是编译时加载
- Common.js中的this指向当前模块，ES6模块this为undefined
