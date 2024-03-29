> WebSocket是**HTML5**提供的一种浏览器与服务器进行**全双工通信**的技术，属于应用层协议，基于**TCP**传输，并**复用HTTP的握手通道**

### 1. 特点

- 服务器可以向客户端主动推送消息，客户端也可以主动向服务器推送消息
- 可以发送文本，也可以发送二进制数据
- 没有同源限制
- 握手阶段复用HTTP的握手，只需要完成一次握手，双方就可以直接创建持久性的连接

### 2. 原理

客户端向WebSocket服务器通知(notify)一个带有所有接收者ID的事件(event), 服务器接收后立即通知所有活跃(active)的客户端, 只有ID在接收ID序列中的客户端才会处理