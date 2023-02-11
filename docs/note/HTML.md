---
title: HTML面试题
author: zzx
date: '2022-05-28'
---
### 1. HTML语义化

使用语义化标签，而不是全部使用\<div>标签。语义化标签包括\<header>\<nav>\<footer>\<section>

使用语义化标签的好处：

- 代码易读，便于维护
- 便于SEO，搜索引擎根据标签来确定关键字
- 便于残障人士阅读

### 2. HTML5新标签

语义化标签: \<header>\<footer>\<aside>\<nav>

音视频标签: \<video>\<audio>

渲染: \<canvas>

拖拽：drag api

### 3. src 和 href的区别

- src表示对**资源**的引用，如img标签需要设置src属性为图片url，script标签需要设置脚本，**src加载资源是同步的，会阻塞其他资源的加载**
- href表示对**超文本**的引用，如a标签设置href属性为跳转地址链接，href加载是异步的，不会阻塞

### 4. meta标签的作用

- meta标签中的内容是给搜索引擎的信息，包括作者、关键词、页面描述、编码类型等
- meta标签由name和content属性定义

```html
<meta charset="UTF-8">
<meta name="keywords" content="关键词" />
<meta name="description" content="描述" />
<!-- 视口信息，移动端适配 -->
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
```

### 5. iframe的优缺点

iframe可以创建包含另一个文档的内联框架

优点：用来加载速度较慢的内容；可以使脚本并行下载；可以实现跨子域通信

缺点：iframe会阻塞主页面的onload事件；无法被一些搜索引擎识别；不易管理

### 6. label的作用

label用在表单中，用于定义表单控件的关系

```html
<label for="mobile">Number:</label>
<input type="text" id="mobile"/>
```

### 7. DOMContentLoaded和loaded的区别

- DOMContentLoaded：在html文档加载解析完成时触发(不需要等待css样式文件、js文件和图片资源等)

- loaded: 所有资源(包括html文档、css样式文件、图片资源)加载完成
