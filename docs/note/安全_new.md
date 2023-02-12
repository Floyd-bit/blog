### 1. XSS攻击

> 跨站脚本攻击 Cross-site scripting

XSS是代码注入攻击的一种，它允许恶意使用者将代码(html、js)注入到网页上，其他使用者在观看网页时会收到影响。

分类：

- 存储型xss: 攻击者将恶意代码提交到网站数据库中(用户提交表单，数据存储在数据库中)，其他用户访问页面时数据库中的恶意脚本执行
- 反射型xss：攻击者将恶意代码注入到URL上
- DOM型xss：注入代码对前端DOM结构进行改变，属于前端自身的安全漏洞

**防御手段**：

- **转义输入输出内容，对于引号、尖括号、斜杠进行转义**

- CSP(内容安全策略),是一个额外的安全层，用于检测并削弱某些特定类型的攻击，包括跨站脚本(XSS)和数据注入攻击等。通常可以通过HTTP Header中的Content-Security-Policy来开启CSP
  
  ```yaml
  Content-Security-Policy: default-src 'self'  // 只允许加载本站资源
  Content-Security-Policy: img-src https://* // 只允许加载HTTPS协议图片
  ```

- **对Cookie设置httponly属性禁止js操作cookie，设置security属性只允许https请求**

### 2. CSRF攻击

> 跨站请求伪造 Cross-site request forgery

CSRF是一种挟制用户在当前已登录的web网页上执行非本意的操作的攻击方法(**利用用户的登录状态发起恶意请求**)，诱导用户点击链接或提交表单(发起GET、POST请求)

**防御手段**：

- Get请求不对数据进行修改, 涉及到修改数据操作使用post请求
- **禁止第三方网站访问到用户Cookie，对Cookie设置SameSite属性**
- 阻止第三方网站请求接口
- **请求时附带验证信息，token（服务器给一个随机token,客户端每次发起请求时将Token携带）**
- **通过请求Header中的Referer字段判断请求来源地址**
- 验证机制：验证码

### 3. SQL注入攻击

在表单中填写SQL语句，数据库执行恶意SQL

### 4. DDos攻击

Dos攻击: 拒绝服务攻击，发送大量合法请求到服务器，使服务器宕机

DDos攻击：分布式拒绝服务攻击，利用大量计算机设备Dos攻击

### 5. SYN洪范攻击

发起大量TCP连接握手，但是在收到服务端回应后不返回ACK，使得服务端一直保持等待状态
