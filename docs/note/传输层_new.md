### 1. UDP（用户数据报协议）

- **面向报文**

- **不可靠性**
  
  UDP是**无连接**的，且没有拥塞控制，一直以恒定的速度发送数据。在网络条件不好的情况下可能会丢包，但是适用于实时性要求高的场景(电话会议)

- **高效**
  
  UDP的头部开销小，头部包含信息有端口号、报文长度、报文校验和(用于发现头部信息和数据中的错误)

- **传输方式**
  
  支持一对一、一对多、多对多、多对一(单播、多播、广播)

### 2. TCP（传输控制协议）

1. 首部
   
   - seq，保证TCP传输的报文是有序的
   - ack，表示数据接收端期望接收到的下一个字节的编号
   - 窗口大小，表示还能接收多少字节的数据，用户流量控制
   - 标识符：ACK(表示确认号字段有效，TCP规定连接建立后传送的所有报文段都必须把ACK置1)   SYN（表示请求建立连接） FIN（表示请求释放连接）

2. 三次握手建立连接
   
   ![img](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041454580.png)

3. 四次挥手释放连接
   
   ![image-20220118192414429](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041454581.png)
   
   **为什么 A 要进入 TIME-WAIT 状态，等待 2MSL 时间后才进入 CLOSED 状态？**
   
   为了保证 B 能收到 A 的确认应答。若 A 发完确认应答后直接进入 CLOSED 状态，如果确认应答因为网络问题一直没有到达，那么会造成 B 不能正常关闭。

4. ARQ协议(超时重传机制)
   
   > ARQ即超时重传机制，通过确认和超时机制保证了数据的正确送达
   
   **停止等待ARQ**
   
   - A每向B发送一段报文，都要启动一个定时器。若超过定时器设定时间则重复发送数据
   - 数据丢失的情况——报文丢失、ACK超时或丢失
   - 缺点：传输效率低，每次发送报文都需要等待对方的ACK应答
   
   **连续ARQ**
   
   - 发送端拥有一个发送窗口，可以在没有收到应答的情况下持续发送窗口内的数据
   - 累计确认：发送端收到多个报文后统一回复一个应答报文，表示报文序号之前的数据已经全部收到了

5. 滑动窗口
   
   > 发送端和接收端都维护一个窗口，用来进行流量控制，作用于接收方
   
   - 发送端窗口是由接收窗口剩余大小决定的，接收方会在应答报文中写入剩余大小，发送端收到后根据接收窗口剩余大小和网络拥塞情况设置发送窗口的大小
   - 发送端收到应答报文后，会随之将窗口进行滑动
   - 可能会遇到对端出现零窗口的情况，发送端会停止发送数据，并启动定时器重试

6. 拥塞控制
   
   > 作用于网络，防止过多的数据拥塞网络
   
   - 慢开始
     
     在传输开始时将发送窗口慢慢指数级扩大，从而避免一开始就传输大量数据导致网络拥塞
   
   - 拥塞避免
     
     当窗口大小大于阈值时就会启动拥塞避免算法，每过一个 RTT 窗口大小只加一
   
   - 快速重传(接收端收到的报文失序)
     
     - 将阈值设为当前拥塞窗口的一半
     - 将拥塞窗口设为 1 MSS
     - 重新开始慢开始算法
   
   - 快速恢复
     
     重发对端需要的包，一旦收到一个新的 ACK 答复就退出该阶段
   
7. 如何理解面向字节流

### 3. 区别

![image-20220204145907548](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041454582.png)
