---
title: 跨域
date: 2021-08-31 14:28:41
tags: 前端知识
description: 跨域问题解决方案
---

### 1. 跨域问题

浏览器的**同源策略**： 浏览器只能访问与包含它的页面处于同一个域内的资源

**跨域并不是请求发不出去，服务端能收到请求并正常返回结果，只是结果被浏览器拦截了**

### 2. JSONP (参数式JSON)

**只支持GET请求**

利用\<script>标签没有同源策略的限制的特性，通过动态创建script标签，其中src属性参数为请求api地址+"callback=functionName"，声明一个回调函数接收response;

jsonp由**回调函数**和**数据**组成，回调函数是当响应到来时应该在页面中调用的函数，数据是传入回调函数中的JSON数据

优点：对各款浏览器的兼容性比较好； 可以在后端没有配置cors的情况下使用

缺点：只支持Get请求；且参数直接在url中传递，安全性较差，容易收到xss攻击

```js
function handleResponse(response) {
    alert(response.name);
}
// jsonp通过动态script元素使用
var script = document.createElement('script');
// src属性指定一个跨域URL
script.src = "https://www.xxx.com/json/?callback=handleresponse";
document.body.insertBefore(script,document.body.firstChild);
```

### 3. CORS (跨域资源共享)

关键是服务器实现CORS的接口(设置*Access-Control-Allow-Origin*)

- 简单请求：浏览器直接发出CORS请求，在请求头中增加Origin字段
  
  请求的方法只能是HEAD GET POST
  
  头部信息字段有限

- 非简单请求: 在发送请求之前，增加一次HTTP请求——预检 (OPTION请求)
  
  请求方法为PUT DELETE
  
  Content-Type字段的类型是application/json

### 4. iframe(postMessage)

```javascript
// 给B页面发送消息
window.frames[0].postMessage(data, '');
// 接收B页面发来的消息
window.addEventListener('message', function(e){
    console.log(e);
})
```

### 5. webSocket

```javascript
var ws = new WebSocket('wss://echo.websocket.org');

ws.onopen = function(evt) {
    ws.send('Hello')
}
ws.onmessage = function(evt) {
    ws.close();
}
ws.onclose = function(evt) {
    console.log('close')
}
```

### 6. document.domain + iframe

使用于二级域名相同的情况，如a.test.com和b.test.com适用于该方式；

给页面添加document.domain = 'test.com'就可以实现跨域

#### 7.使用nginx服务器反向代理

同源策略仅在浏览器端有限制，而在服务器上发起请求则不会收到同源策略的限制

**正向代理(伪造客户端，服务器感知不到客户端)：代理屏蔽了客户端的存在，如使用代理访问谷歌，或使用代理绕过ip限制**

**反向代理(伪造服务端，客户端感知不到服务器)：代理屏蔽了服务器的存在，如反向代理服务器将客户端请求转发给服务器，从而实现跨域**

#### 8. 面试

> 跨域是因为浏览器的同源策略导致的不同协议，域名，端口之间的资源无法正常访问的问题。主要解决方法有 JSONP 和 CORS。
> 
> JSONP 的话主要是通过动态生成的 script 标签带上回调函数的名字，传给后台，后台将数据包裹在回调函数里面返回前台，然后执行回调函数。
> 
> CORS 的话要求浏览器和服务器都支持这个功能，然后浏览器就可以发送简单请求和非简单请求。
> 
> 对于简单请求来说，浏览器直接发送请求，请求中携带 Origin 字段。如果该字段在服务器允许的列表中，则服务器响应该请求，并在响应头里面带上 Access-Control-Allow-Origin。若不在的话，则会被请求的 onerror 函数捕获。
> 
> 对于非简单请求，浏览器先发送 option 预检请求并带上请求的方法和参数，如果服务器允许这些方法和参数，会返回对应的请求。如果不允许的话，会发送一个正常的 HTTP 响应，但是这个响应中没有 CORS 相关的信息。然后预检通过的话，浏览器就像发送简单请求一样发送请求。

> JSONP 与 CORS 的区别

​        主要区别就是 JSONP 只能发起 get 请求，而 cors 可以发起任何请求

        JSONP安全性不好，将参数和回调函数放在url中，容易被恶意攻击者获取到

> 其他可以跨域的标签

​        img 和 iframe，所有具有 src 属性的都可以

> 其他跨域方式

​        Web Socket

### 9. 浏览器不同标签页通信

- 同源页面
  
  - cookie
  
  - localstorage

- 不同源页面
  
  - postMessage
  
  - webSocket
