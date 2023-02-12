> 如果只使用socket进行网络传输，其实是基于裸TCP连接。TCP的特点是面向连接、基于字节流和可靠。TCP传输的过程中数据都以二进制串表示，接受端无法区分每个数据包的范围，会出现粘包的问题。所以出现了基于TCP的应用层协议，RPC、HTTP等。

### 1. HTTP

HTTP是浏览器厂商制定的统一的应用层协议，屏蔽了不同平台的差异。

### 2. RPC

> 常见的RPC协议包括gRPC、thrift。除了TCP，有的RPC协议底层基于UDP、HTTP

RPC(远程过程调用)是一种通信方式，而不是一种具体的通信协议。各个厂商制定的RPC协议实现方式都不同。

### 3. HTTP和RPC的区别

- 服务发现：HTTP基于DNS找到对方的IP和端口，RPC基于etcd、consul、coreDNS等
- 底层连接：HTTP基于TCP传输JSON序列化数据，RPC也基于HTTP长连接，但拥有TCP连接池
- 序列化：HTTP传输字符串，使用JSON序列化；RPC使用protobuf等进行序列化
- 相比于HTTP1.1，RPC的性能会更好；但是HTTP2的性能甚至会好于部分RPC协议

