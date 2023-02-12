---
title: js学习五
date: 2021-08-05 13:35:49
tags: javascript
description: http协议、存储、Ajax
---

### 1. Cookie

- 全称HTTP Cookie，是浏览器存储数据的一种方式，数据不超过4k，在所有同源窗口共享
- 存储在用户本地，而不是存储在服务器上
- 一般会自动随着浏览器每次请求发送到服务器端
- 利用Cookie跟踪统计用户访问网站的习惯

```javascript
// 写入cookie
document.cookie = 'username=zs'; // Name Value
document.cookie = 'age=18';
// 设置中文
document.cookie = `username=${encodeURIComponent('张三')}`;

// 读取全部cookie
console.log(document.cookie);  // username=zs;age=18

// 到期时间
// 如果没有设置失效时间，这样的Cookie成为会话Cookie,当会话结束（浏览器关闭），Cookie消失
// 若想长时间存在，设置Expires或Max-Age
document.cookie = `username=alex;expires=${new Date('2100-1-01 00:00:00')}`;  // Expires值为Date类型
document.cookie = 'username=alex;max-age=5'; // max-age值为数字，表示秒数

// Domain域 限定了访问Cookie的范围
document.cookie = 'username=alex;domain=www.xxx.com'
// Path限定了统一域名下的访问范围

// 设置了HttpOnly属性的Cookie不能通过JS去访问
// Secure的值限定了只有通过https访问才生效
```

封装Cookie

```javascript
// 写入Cookie
const set = (name,value,{maxAge,domain,path,secure}) => {
    let cookieText = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    if(typeOf maxAge === 'number'){
        cookieText+=`;max-age=${maxAge}`;
    }

    if(domain){
        cookieText+=`;domain=${domain}`;
    }

    if(path){
        cookieText+=`;path=${path}`;
    }

    if(secure){
        cookieText+=`;secure`;
    }

    document.cookie = cookieText;
};

// 通过name获取cookie
const get = (name) => {
    name = `${encodeURIComponent(name)}`;
    const cookies = document.cookie.split(';');
    for(const item of cookies){
        const [cookieName,cookieValue]  = item.split('=');
        if(cookieName === name){
            return decodeURIComponent(cookieValue);
        }
    }
    return;
};

// 根据name、domain、path删除cookie
const remove = (name,{domain,path} = {}) => {
    set(name,'',{domain,path,maxAge:-1});
};
```

### 2. LocalStorage

- 浏览器将数据存储在本地，不会发送到服务器端，在所有同源窗口共享
- localStorage是持久化的本地存储，除非手动清除，否则数据是永远不会过期的

```javascript
localStorage.setItem('username','alex');
localStorage.setItem('age',18);

localStorage.getItem('username');

localStorage.removeItem('username');
```

sessionStorage

当会话结束（浏览器关闭），sessionStorage中的数据会被清空，不在不同的浏览器窗口共享

### 3.Ajax

>  Ajax是Asynchronous Javascript and XML (异步JavaScript和XML)

- 异步：可以异步地向服务器发送请求，在等待响应地过程中，不会阻塞当前页面，浏览器可以做自己地事情
- XML（可扩展标记语言）：前后端数据通信时传输数据的一种格式

![image-20210807173646805](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041454044.png)

```javascript
const xhr = new XMLHttpRequest();

// GET请求
xhr.open('GET','url',true); // HTTP方法  请求地址  是否异步
xhr.send(null);  // send的参数通过请求体携带数据

// POST请求
xhr.open('POST','url',true);
xhr.sned({
    username: 'alex',
    age: 18
});

// 当获取到响应后，会触发xhr对象的readystatechange事件，可以在该事件中对响应进行处理
xhr.onreadystatechange = () => {
 if(xhr.readyState !== 4) return;
 // HTTP 状态码
 if((xhr.status>=200&xhr.status<300)||xhr.status===304){
     console.log(xhr.responseText);
 }
}
```

```html
<!-- form表单 -->
<form action="url" method="get">
    <input type="text" name="username"/>
    <input type="text" name="words"/>
    <input type="password" name="password"/>
    <input type="submit" value="提交"/>
</form>
```

```javascript
xhr.setRequestHeader(头部字段名称，值) // 设置请求头信息
xhr.setReauestHeader('Content-Type','application/x-www-form-urlencoded');
```

```javascript
// 封装ajax

// ajax.js
import { serialize,addURLData } from './utils.js'
import DEFAULTS from './defaults.js';
class Ajax{
    constructor(url,options) {
        this.url = url;
         this.options = Object.assign({},DEFAULTS,options);
         this.init();
    }
    init() {
        const xhr = new XMLHttpRequest();
        this.xhr = xhr;

        this.bindEvents();
        xhr.open(this.options.method,this.url,true);
        this.setCookie();
        this.setResponseType();
        this.setTimeout();
        xhr.send(data);

    }
    // 绑定响应事件处理程序
    bindEvents() {
        const xhr = this.xhr;
        const {success,httpCodeError,error,abort,timeout} = this.options;
        xhr.addEventListener(
        'load',
        ()=>{
            if(this.ok()) {
                success(xhr.response,xhr);
            }else{
                httpCodeError(xhr.status,xhr);
            }
        },false);

        xhr.addEventListener(
        'error',
         ()=>{
            error(xhr);
         }
        );

        xhr.addEventListener(
        'abort',
         ()=>{
            abort(xhr);
         }
        );

         xhr.addEventListener(
        'timeout',
         ()=>{
            timeout(xhr);
         }
        );
    }
    // 检测状态码
    ok() {
        const xhr = this.xhr;
        return ((xhr.status>=200&&xhr.status<300)||xhr.status===304);
    }
    // 在url上添加参数
    addParam() {
       const {params} = this.options;
        if(!parmas) return '';
        return addURLData(this.url,serialize(params));
    }

    setResponseType() {
        this.xhr.responseType = this.options.responseType;
    }

    // 设置跨域是否携带cookie
    setCookie() {
        if(this.options.withCredentials)
        this.xhr.withCredentials = true;
    }

    setTimeOut() {
        const { timeoutTime } = this.options;
        if(timeOutTime>0){
            this.xhr.timeout = timeoutTime;
        }
    }
}

export default Ajax;
```

```javascript
// defaults.js
const DEFAULTS = {
    method:'GET',
    // 请求头携带数据
    params:null,
    // 请求体携带数据
    data:null,
    contentType:'application/x-www-form-urlencoded',
    responseType:'',
    timeoutTime: 0,
    withCredentials:false

    // 方法
    success() {},
    httpCodeError() {},
    error() {},
    abort() {},
    timeOut() {}
}
```

```javascript
// 工具函数
// 序列化参数
const serialize = param => {
    const result = [];
    for(const [key,value] of Object.entries(param)) {
        result.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    }
    return result.join('&');
};

// 给URL添加参数
const addURLData = (url,data) => {
    if(!data) return '';
    const mark = url.includes('?')?'&':'?';
    return `${mark}${data}`
};

export {serialize,addURLData};
```

```javascript
import Ajax from './ajax.js'

const ajax = (url,options) => {
    // return new Ajax(url,options).getXHR();
    let xhr;
    const p = new Promise((resolve,reject) => {
        xhr = new Ajax(url,{
            ...options,
            ...{
                success(response){
                    resolve(response);
                },
                httpCodeError(status){
                    reject({
                        type:1,
                        text:`HTTP状态码异常${status}`
                    });
                }
            }
        }).getXHR();
    });
    p.xhr = xhr;
    return p;
}

const get = (url,options) => {
    return ajax(url,{...options,method:'GET',responseType:'json'});
}

export {get,ajax}
```

```javascript
import {get,ajax} from './ajax/index.js'

const url = 'xxx';

const p = get(url,{xxx});
p.then(response=>{
    console.log(response);
}).catch(err=>{
    console.log(err);
})
```

### 4.JSON

> JSON 全称是JavaScript Object Notation

```json
{
    "name":"张三",
    "age":18,
    "hobby":["足球","乒乓球"],
    "family":{
        "father":"xx",
        "mother":'xx'
    }
}
```

```javascript
// 将JSON格式的字符串解析为对象
JSON.prase();

// 将JS中的对象、数组转换为JSON类型字符串
JSON.stringify

// 可以利用JSON将复杂数据类型存储在localStorage中
```

### 5.跨域

https(协议)://www.xxx.com(域名):443(端口号)/course/list(路径)

协议、域名、端口号中任何一个不一样，就是不同域，不同域之间的请求为跨域

浏览器安全策略——同源策略，只允许同一个域中的请求，阻止跨域请求

跨域解决方案：

- CORS跨域资源共享
  
  1. 浏览器发送请求
  2. 后端在响应头中添加Access-Control-Allow-Origin头信息
  3. 浏览器接受响应
  4. 同域下的请求，前后端通信完成
  5. 跨域请求，浏览器从响应头中查找是否允许跨域访问
  6. 如果允许跨域，通信完成
  7. 如果不允许，则丢弃响应结果

- JSONP script
  
  原理：script标签跨域不会被浏览器阻止

### 6.axios

基于Promise的HTTP库，第三方的Ajax库

```javascript
const url = 'xxx';
axios(url,{
    method:'post',
    // 头信息
    headers:{
        'Content-Type':'application.x-www.form-urlencoded'
        // 'Content-Type':'application/json'
    },
    // 请求头携带的数据
    params:{
        username:'alex'
    },
    // 请求体携带的数据
    data:{
        age:18,
        sex:'male'
    }
}).then(response => {
    console.log(response);
}).catch(err => {
    console.log(err);
})

axios.post(url,'username=zzx&age=1')
.then(response => {

})

axios.post(url,{
    username: 'zzx'
})
.then(response => {

})

// axios.put
// axios.delete
```

### 7.Fetch

Fetch是Ajax的一种替代方案，基于Promise, Ajax的兼容性比Fetch好

```javascript
// fetch调用后返回Promise对象
fetch(url).then(response => {
    console.log(response);
    if(response.ok) {
        // return response.json();
       // return response.text();
    }
})
.catch(err => {
    console.log(err);
    throw new Error(`HTTP异常${response.status}`)
})


fetch(url,{
    method: 'post',
    body: 'username=alex&age=1',
    // body:JSON.stringify({username:'alex'})
    headers:{
        'Content-Type':'application.x-www.form-urlencoded'
        // 'Content-Type':'application/json'
    },
    mode:'cors'
})
```
