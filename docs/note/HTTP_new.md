![图片](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206161353773.png)

### 1. HTTP概述

- **超文本传输协议**
- **URL**: <协议>://<域名>:<端口>/<路径> 例如https://test.com/index.html （HTTP默认80端口）
- **HTTP1中浏览器对一个域名下最大TCP连接数为6**

### 2.在浏览器输入URL后获取HTML页面的过程

1. DNS协议——将域名转换为IP地址
2. 三次握手建立TCP连接
3. 发起HTTP请求
4. 目标服务器接收到HTTP请求并处理
5. 目标服务器向浏览器返回HTTP响应
6. 浏览器解析并渲染页面

### 3. HTTP/1.1

#### 3.1 TCP连接——三次握手

TCP报文段字段和标志位： 

- **序号字段**seq和**确认号字段**ack（接收方期望从对方收到的下一字节的序号）
- **ACK标志位**，用于指示确认字段的值是否有效
- **SYN标志位**，用于**连接建立**，SYN为1表示这是一个请求建立连接报文
- **FIN标志位**，用于**连接拆除**，FIN为1表示发送方数据已发送完毕，要求释放连接

三次握手建立连接：

1. 客户端发送不含数据的TCP报文段，SYN=1，seq随机为x
2. 服务器收到报文后，向客户端发送允许连接的ACK报文段(不含数据), ACK=1,SYN=1， ack=x+1, seq随机为y
3. 客户端收到确认报文后，向服务器发送一个ACK报文段(含数据)，ACK=1, SYN=0, ack=y+1

#### 3.2 TCP释放连接——四次挥手

> FIN报文代表不再发送报文，但仍可以接收报文

1. 客户端发送一个FIN=1的报文段
2. 服务器返回一个确认报文段，ACK=1, 此时服务端还可以向客户端发送消息
3. 当服务端没有消息要发送时，服务器发送FIN=1的报文段,进入超时等待阶段
4. 客户端返回一个确认报文段, ACK=1，双方都断连接

### 4. HTTP报文格式

#### 4.1 请求报文

```yaml
GET /2.app.js HTTP/1.1
Host: 118.190.217.8:3389
Connection: keep-alive
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36
Accept: \*/\*
Referer: http://118.190.217.8:3389/
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
```

#### 4.2 响应报文

```yaml
HTTP/1.1 200 OK
X-Powered-By: Express
Accept-Ranges: bytes
Cache-Control: public, max-age=0
Last-Modified: Sat, 07 Mar 2020 03:52:30 GMT
ETag: W/"253e-170b31f7de7"
Content-Type: application/javascript; charset=UTF-8
Vary: Accept-Encoding
Content-Encoding: gzip
Date: Fri, 15 May 2020 05:38:05 GMT
Connection: keep-alive
Transfer-Encoding: chunked
```

常见Content-Type属性值：

- **application/x-www-form-urlencoded**：浏览器的原生form表单
- **application/json**: 传输JSON字符串
- **multipart/form-data**：上传文件
- text/xml：提交XML格式的数据

#### 4.3 请求方法

![image-20220102143720857](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041454863.png)

**POST和GET的区别**

`副作用`：对服务器上的资源做改变，如POST请求

`幂等`：发送M和N次请求，服务器上的资源状态一致，如GET请求

- 缓存：GET能缓存，POST不能缓存
- 携带参数：GET请求参数保存在URL里，POST请求参数保存在request body里
- 参数长度限制：浏览器对GET请求长度有限制，POST则没有
- 用途：GET获取数据(幂等)   POST发送数据(副作用)

#### 4.4 状态码

### 5. 缓存

- 强缓存: 不需要请求，直接在缓存中读取，成功状态码200
  - `Expires`(HTTP/1.0): 表示资源过期时间，具有局限性(时区)
  - `Cache-Control`(HTTP/1.1)：优先级高于Expires， 表示最大寿命(max-age)；
  - `Cache-Control`的字段：`no-cache`浏览器需要向服务器发送请求确认是否使用缓存，`no-store`不再使用缓存
  - `memory-cache` 和 `disk-cache`的区别：在使用强缓存时，返回的状态码有两种——200 OK(from memory)和200 OK(from disk)，区别在于前者从内存中读取，后者从磁盘中读取。通常样式文件css缓存存放在磁盘中，而图片、js等文件则缓存在内存中。内存中的读取速度比磁盘更快。
- 协商缓存: 需要向服务器发起请求，若命中缓存则返回304
  - `Last-Modified/If-Modified-Since`: Last-Modified表示最后修改日期，If-Modified-Since会将Last-Modified值发送给服务器，若有更新则请求新的资源
  - `Etag/If-None-Match`: Etag是文件的标示， If-None-Match会将Etag发给服务器询问是否变动，优先级高于Last-Modified

### 6. HTTP 1.0和HTTP 1.1的比较

- 连接：http1.1默认使用持久连接，使多个http请求复用同一个tcp连接，减少tcp建立连接的耗时.使得管道(pipeline)网络传输成为可能，在同一个TCP连接里客户端可以发起多个请求，但服务端必须按照顺序响应，造成了队头阻塞问题(前面的响应很慢就会阻塞后面的响应)
- 资源请求：http1.1在请求头中增加了range属性，允许请求部分资源，返回码为206(Partial Content), 支持断点续传
- 缓存：http1.0主要使用header中的`If-Modified-Since`、`Expires`作为缓存字段，http1.1使用`Cache-Control`、`If-None-Match`
- 新增：http1.1中新增了**host字段**用来指定服务器的域名，可以将请求发往同一台服务器上的不同网站，新增了很多**请求方法**，如PUT、HEAD、OPTIONS

### 7. HTTP 2.0

- 二进制传输：HTTP1.1中报文头信息必须是文本(ASCII编码)，HTTP2的头信息和数据体都是二进制帧，是多路复用的基础
- 多路复用：多路复用使得在一个TCP连接里客户端和服务器都可以同时发送多个请求或回应而不用按照顺序发送(**对数据包做标记，指出它属于哪个请求**)，避免了**队头阻塞**（HTTP1.1 "一发一收"，队列中排在最前的的请求会阻塞后面的请求）的问题
- Header压缩：头信息使用gzip压缩后发送，并且客户端和服务端同时维护一张头信息表存储字段生成对应的索引号，在通信时只发送索引号
- 服务端Push：允许服务器未经请求主动向客户端发送资源(推动静态资源)

### 8. HTTP3.0 (基于QUIC)

- 基于UDP实现了流量控制和可靠性控制
- 集成TLS加密功能
- 多路复用
- 快速握手

### 9. HTTP添加状态

- session+cookie：服务器保存标记数据(Session), 客户端每次请求时携带cookie(cookie携带标记sessionId)
  
  ![](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041454864.png)
  
  存在问题：
  
  - CSRF(跨站请求伪造)：利用referer或token解决
  
  - 分布式session: 如果后端采用分布式部署，需要考虑不同服务器之间session的同步
  
  - 跨域问题：cookie有跨域限制，ajax请求跨域时不会携带cookie，需要手动设置withCredentials

- token（JWT）：token是一小段字符串，JWT由header、payload、verify signature三部分组成，header保存当前的加密算法，payload保存具体存储的数据，verify signature把header和payload以及salt做一次加密之后生成的
  
  JWT把数据base64处理之后放在header里，需要搭配https来使用
