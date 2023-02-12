### 1. Ajax

- 手写Ajax请求

```js
function ajax() {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'www.xxx.com');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onReadyStateChange = function() {
        if(xhr.readyState === 4) {
            if(xhr.status > 200 && xhr.status <300 || xhr === 304) {
                resolve(xhr.responseText);
            } else {
                reject(xhr.responseText);
            }
        }
        } 
     xhr.send();
    })
}
```

- ajax技术可以在不刷新整个页面的情况下只更新网页的一部分

- JQuery中使用回调函数的形式，容易造成**回调地狱**
  
  ```js
  $.ajax({
      type: 'POST',  // 请求方法
      url: url,   // 请求地址
      data: data,  // 发送到服务器的数据，由请求的request body携带
      success: function() {},  // 成功的回调
      error: function() {}   // 失败的回调
  })
  ```

- xhr对象可以通过abort()来取消

### 2. axios

- axios是一个基于**Promise**的http请求库，本质上也是对原生XHR的封装
  
  ```js
  const axios = require('axios');
  axios.get('/url')
      .then(function(res) => {
           console.log(res);                  
       })
  ```

- 提供了拦截请求和响应的拦截器 service.interceptors.request.use(config => {]})

- 提供了一些**并发**请求的接口, 类似与promise.all

- 支持**取消请求**, cancelToken

### 3. fetch

- fetch是ajax的替代品，基于Promise设计。fetch不是对ajax的封装而是用原生js的另一种实现
- **AbortController中断请求**

```js
fetch('www.xxx.com')
    .then(function(res){
        return response.json()l
    })
```
