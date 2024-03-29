### 1. DNS协议

- DNS是域名系统(Domain Name System)的缩写，提供一种域名到IP地址的转换服务
- 由**分层的DNS服务器**组成的分布式数据库，定义了主机如何查询分布式数据库的方式
- 占用53端口，同时使用TCP和UDP协议，在**区域传输**(辅域名服务器定时同步主域名服务器)时使用**TCP协议**，在**域名解析**时使用**UDP协议**

### 2. 查询过程

- 先在浏览器的缓存中查找对应的IP地址（www.baidu.com）
- 将请求发送**本地DNS服务器**，若在缓存中查到返回否则下一步
- 本地DNS服务器向**根域名服务器**发送请求, 返回负责.com的顶级域名服务器的IP地址列表
- 本地DNS服务器向**顶级域名服务器**发送请求，返回负责.baidu的权威域名服务器的IP地址列表
- 本地DNS服务器向权威域名服务器发送请求，返回对应IP地址
- 本地DNS服务器将结果保存在缓存中，并返回给浏览器

### 3. 递归查询和迭代查询

- 递归查询指域名**服务器代为**向下一级域名服务器发出请求，最后返回结果
- 迭代查询指域名服务器返回单次查询的结果，下一级的查询由**用户自己请求**
- 在DNS解析的过程中，**用户向本地DNS服务器发送请求的方式是递归查询，本地DNS服务器向其他域名服务器的请求是迭代查询**

### 4. DNS预解析

### 5. CDN原理





