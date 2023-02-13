---
title: JAVA基础
date: 2021-01-21 15:34:48
tags: java
description: javaSE
---

### 1. Lambda表达式

1. 一些参数

2. 一个箭头

3. 一段代码

   `匿名内部类的语法糖`

#### 1.1格式

（参数列表）-> {重写方法的代码}

```java
public interface Cook{
	public abstract void makeFood();
}
```

```java
public class Demo{
public static void main(String[] args){
    //匿名内部类
    invokeCook(new Cook(){
		public void makeFood(){
            ...
        }
    }
    );
    //Lambda表达式
    invokeCook(()->{
        ...
    });
}
public static void invokeCook(Cook cook){
	cook.makeFood();
}
}
```

#### 1.2使用前提

1. 必须有接口，且接口中有且只有一个抽象方法（函数式接口）
2. 必须具有上下文推断

### 2.网络编程

#### 2.1软件结构

1. C/S结构（Client/Server 客户端/服务器）：QQ
2. B/S结构（Browser/Server 浏览器/服务器）：谷歌

#### 2.2网络通信协议

1. **TCP/IP协议**<br>

   查看本机IP地址：ipconfig <br>

   检查网络是否联通：ping Ip地址<br>

   本机IP地址： 127.0.0.1(localhost)<br>

   常见端口号：

   - 网络端口：80
   - 数据库mysql:3306 oracle:1521
   - Tomcat服务器:8080

2. **UDP协议**

####   2.3 TCP通信程序

##### Socket类

（服务器获取到请求的客户端对象Socket，使用每个客户端Socket中的IO流和客户端进行交互）

1. java.net.Socket:实现**客户端**套接字(服务器先启动，才会正常连接)

   ```java
   //构造方法
   Socket(String host,int post)//服务器主机名称和端口号
   //成员方法
   getOutputStream()
   getInputStream()
   void close() //关闭套接字
   //实现步骤
   /*
   	1.创建一个客户端对象Socket
   	2.使用Socket对象中的方法getOutputStream()获取网络字节输出流
   	3.使用OutputStream对象中的方法write，给服务器发送数据
   	4.使用Socket对象中的方法getInputStream()获取InputStream对象
   	5.使用InputStream中的方法read，读取服务器写回的数据
   	6.释放资源（Socket）
   */
   public class TCPClient{
       public static void main(String[] args){
   		Socket socket = new Socket("127.0.0.1",8888);
           OutputStream os = socket.getOutputStream();
           os.write("hello".getBytes());
       }
   }
   ```

   2.java.net.serverSocket实现**服务器端**

   ```java
   //接受客户端请求，读取客户端发送的数据，给客户端回写数据
   /*
   构造方法
   SeverSocket(int port)  创建绑定到特定端口的服务器套接字
   成员方法
   Socket accept() 侦听并接受到此套接字的连接
   实现步骤
   1.创建服务器ServerSocket对象
   2.使用ServerSocket的方法accept，获取到请求的客户端对象Socket
   3.使用getInputStream（）获取InputStram对象
   4.使用getIputStream中的read，读取客户端发送的数据
   5.使用Socket对象中的方法getOutputStream()获取网络字节输出流
   6.使用OutputStream对象中的方法write，给服务器写回数据
   7.释放资源（Socket,ServerSocket）
   */
   public class TCPServer{
   	public static void main(String[] args){
   		ServerSocket server = new ServerSocket(8888);
           Socket socket = server.accept();
           InputStream is = socket,getInputStream();
           byte[] bytes = new byte[1024];
           int len = is.read(bytes);
           System.out.println(new String(bytes,0,len));
           OutputStream os = socket.getOutputStream();
           os.write("accept".getbytes());
           socket.close();
           server.close();
       }
   }
   ```

### 3.函数式接口

有且仅有一个抽象方法的接口，适用于函数式编程（Lambda）

```java
@FunctionalInterface //检测接口是否是函数式接口，是则编译成功，否则编译失败
public interface MyFunctionalInterface{
    public abstract void method();
    void method2();
}
```



#### 3.1使用（作为方法的参数和返回值类型）

```java
public class Demo{
	public static void show(MyFunctionalInterface myInter){
		myInter.method();
	}
	public static void main(String args[]){
		show(()->{
			System.out.println("Lambda表达式");
		});
	}
}
```



#### 3.2常用函数式接口(java.util.function)

1. Supplier<T>接口，只包含一个无参的方法T get(),用来获取一个泛型参数指定类型的对象数据（生产型接口）

   ```java
   public class Demo{
       public static String getString(Supplier<String> sup){
   		return sup.get();
       }
      	public static void main(String args[]){
           String s = getString(()->{
   			return "1";});
       }
   }
   ```

   

2. Consumer<T>接口，包含void accept(T t),消费一个指定泛型的数据

3. Predicate<T>接口,包含boolean test(T t),用于判断是否为指定泛型

4. Function<T>接口，包含R apply(T t),用于将T转换为R

### 4.Junit单元测试(白盒测试)

- 加入@Test注解

- 导入Junit依赖环境

  @Before @After 注解

### 5.反射

> 在运行时动态加载类，获取类的属性和方法，并且可以调用方法

#### 5.1概念

java代码在计算机中三个阶段：Source源代码阶段->Class类对象阶段->Runtime运行时阶段<br>
成员变量 Field[] fields         构造方法 Constructor[] cos      成员方法Method[] methods

将类的各个组成部分封装为其他对象，这就是反射机制

#### 5.2获取Class对象的方式

1. Class.forName("全类名")      源代码阶段

   多用于配置文件

2. 类名.class           Class类对象阶段

   多用于参数传递

3. 对象.getClass     运行时阶段

   多用于对象获取字节码的方式

#### 5.3Class对象功能

- 获取功能：
  1.获取成员变量 

   Field[] getFileds()

  Field getField(String name)

  Field getDeclaredFields()   //不考虑修饰符

  Field getDeclaredField(String name)

  Field的操作：

  void set(Object obj,Object value)

  get(Object)

  setAccessible(true)   //暴力反射

  2.获取构造方法

  Constructor<?>[] getConstructors()

  Constructor<T> getConstructor()

  Constructor<?>[] getDeclaredConstructors()

  Constructor<T> getDeclaredConstructor() 

  创建对象：
  T newInstance(Object...  initargs)

  3.获取成员方法

  Method[] getMethods()

  Method getMethod(String name)

  Method getDeclaredMethods()

  Method getDeclaredMethod(String name)

  执行方法

  Object invoke(Object obj,Object... args)

  获取方法名称：

  String getName()

  4.获取类名

### 6.注解 

#### 6.1作用

- 编写文档

  ```java
  @author zzx
  @version 1.0
  @since 1.5
  ```

- 代码分析(使用反射)

- 编译检查 Override

#### 6.2预定义注解

- @Override:检查是否是继承自父类的
- @Deprecated：将标注的内容已过时
- @SuppressWarnings：压制警告

#### 6.3自定义注解

​			格式：

​					元注解

​					public @interface 注解名称{

​	                		属性列表；

​					}

​			属性的返回值类型可以是：

- `基本数据类型`
- `String`
- `枚举`
- `注解`
- `以上类型的数组`					

`定义了属性，在使用时需要给属性赋值`：

在定义属性时可以使用default关键字赋初值

如果只有一个属性需要赋值，并且属性名称是value，在使用时可以省略value

数组类型赋值，使用{}包裹，如果只有一个值，则{}可以省略

#### 6.4元注解（用于描述注解的注解）

- `@Target:描述注解能够作用的位置`

   ElementType取值：
   TYPE 类  METHOD 方法  FIELD 成员变量

- `@Retention:描述注解被保留的阶段`

  RetentionPolicy取值： 

  SOURCE 源代码 CLASS 类加载  `RUNTIME 运行时`

- `@Documented:描述注解是否被抽取到api文档中`

- `@Inherired:描述注解是否被子类继承`

#### 6.5解析注解（获取注解中定义的属性值）

1. 获取注解定义的位置的对象（Class,Mehod,Field）

2. 获取指定的注解

   getAnnotation(Class)

3. 调用注解中的抽象方法获取属性值

### 7. 字符串

#### 7.1 Java String类

1. 创建字符串

   - 字符串常量，存储在`公共池`中
   - 实例化字符串对象，存储在`堆`上

   ```java
   String str = "xxx";
   String str2 = new String("xxx");
   ```

2. 访问器方法

   length()方法：获取字符串的字符数

3. 字符串方法：

   - concat: 连接字符串
   - charAt: 返回指定索引处的字符
   - equals: 与指定对象比较
   - startWith/endsWith: 是否以指定后缀开始/结束
   - indexOf: 返回子字符串在此字符串中第一次出现处的索引
   - lastIndexOf: 返回指定字符串在此字符串中最后一次出现处的索引
   - matches: 是否匹配给定的正则表达式
   - replace: 用newChar替换此字符串中出现的所有oldChar，返回新的字符串
   - replaceAll: 替换所有匹配正则表达式的子字符串
   - split: 根据给定正则表达式的匹配拆分此字符串
   - subString: 返回子字符串
   - trim: 忽略前后空格，返回新字符串
   - isEmpty: 判断字符串是否为空
   - contains: 判断是否包含指定的字符系列

#### 7.2 Java StringBuffer 和 StringBuilder类

> 不同于String类，StringBuffer和StringBuilder类的对象能够被多次修改，且不产生新的未使用对象。

> StingBuilder是线程不安全的(不能同步访问)，但是相较于StringBuffer有速度优势，大多数情况使用StringBuilder，在要求线程安全的情况下必须使用StringBuffer

```java
StringBuilder sb = new StringBuilder(10);
sb.append("xxx");
sb.insert(4, "xxxx");
sb.delete(2, 4);
```

StringBuffer方法：

- append: 将指定字符串追加到此字符序列
- reverse: 反转字符串
- delete(int start, int end): 移除字符串中的字符
- insert(int offset, String str): 插入字符串

### 8. 集合

| 序号 | 接口描述                                                     |
| :--- | :----------------------------------------------------------- |
| 1    | Collection 接口 Collection 是最基本的集合接口，一个 Collection 代表一组 Object，即 Collection 的元素, Java不提供直接继承自Collection的类，只提供继承于的子接口(如List和set)。Collection 接口存储一组不唯一，无序的对象。 |
| 2    | List 接口 List接口是一个有序的 Collection，使用此接口能够精确的控制每个元素插入的位置，能够通过索引(元素在List中位置，类似于数组的下标)来访问List中的元素，第一个元素的索引为 0，而且允许有相同的元素。List 接口存储一组不唯一，有序（插入顺序）的对象。 |
| 3    | Set Set 具有与 Collection 完全一样的接口，只是行为上不同，Set 不保存重复的元素。Set 接口存储一组唯一，无序的对象。 |
|      |                                                              |
| 4    | Map Map 接口存储一组键值对象，提供key（键）到value（值）的映射。 |

#### 8.1 List

- ArrayList

  > AarryList类是一个可以动态修改的数组，没有固定大小限制，可以添加或删除元素

  ```java
  ArrayList<String> sites = new ArrayList<String>();
  sites.add("xxx");
  sites.set(2, "xx");
  sites.remove(3);
  // 获取集合元素个数
  System.out.println(sites.size());
  // 获取指定索引处的值
  System.out.println(sites.get(1));
  // ArrayList要存储基本类型需要使用基本类型的包装类
  ArrayList<Integer> li = new ArrayList<Integer>();
  // 字母或数字排序
  Collections.sort(li);
  // 遍历方法
  for (int i : li) {
  };
  li.forEach((e) -> {
      
  });
  ```

- LinkedList

  > 链表(LinkedList)

  ```java
  LinkedList<String> sites = new LinkedList<String>();
  sites.add("xxx");
  // 在链表头部添加元素
  sites.addFirst("xx");
  // 在链表尾部添加元素
  sites.addLast("xx");
  // 移除头部元素
  sites.removeFirst();
  // 移除尾部元素
  sites.removeLast();
  // 获取头部元素
  sites.getFirst();
  // 获取尾部元素
  sites.getLast();
  ```

#### 8.2 HashSet

> HashSet是一个不允许有重复元素的集合，是无序的，不是线程安全的

```java
HashSet<String> sites = new HashSet<String>();
// 重复的元素不会被添加
sites.add("xx");
// 删除元素
sites.remove("xx");
```

#### 8.3 HashMap

> HashMap是一个散列表，存储键值对，是无序的

```java
HashMap<Integer, String> sites = new HashMap<Integer, String>();
// 添加键值对
sites.put(1, "xx");
// 根据键获取值
sites.get(1);
// 删除键值对
sites.remove(1);
// 删除所有键值对
sites.clear();
// 遍历HashMap
for (Integer i: sites.KeySet()) {
	// key
    System.out.println(i);
    // value
    System.out.println(sites.get(i));
}
// 遍历HashMap的所有value值
for (String value: sites.values()) {
}
```

### 9. 多线程编程

![img](https://www.runoob.com/wp-content/uploads/2014/01/java-thread.jpg)

- 通过实现Runnable接口来创建线程

  实现Runnable需要执行一个方法调用run(), 在创建了实现Runnable接口的类后，可以在类中实例化一个Thread对象。Thread(Runnable threadOb, String threadName) 其中ThreadOb是一个实现Runnable接口的类的实例。在新线程创建之后，通过调用start()方法运行。

  ```java
  class RunnableDemo implements Runnable {
  	private Thread t;
      private String threadName;
      
      RunnableDemo(String name) {
  		// creating， 新建状态
          threadName = name;
      }
      
      public void run() {
  		// running，运行状态
          // do something
      }
      
      public void start() {
  		// starting, 就绪状态
          if(t == null) {
              t = new Thread(this, threadName);
              t.start();
          }
      }
  }
  
  public class TestThread {
      public static void main(String args[]) {
  		RunnableDemo R1 = new RunnableDemo("1");
          R1.start();
          
          RunnableDemo R2 = new RunnableDemo("2");
          R2.start();
      }
  }
  ```

- 通过继承Thread来创建线程

  ```java
  class ThreadDemo extends Thread {
  	// 同Runnable
  }
  ```


### 10. 枚举类型

> 枚举类型用来定义一组常量

#### 10.1 基本用法

```java
// 使用类定义
class Day {
    static final int MONDAY = 1;
    static final int TUESDAY = 2;
    // ...
}
// 使用enum定义
enum Day {
    MONDAY, TUESDAY, ...
}
```

#### 10.2 进阶用法

**可以向enum中添加方法和变量**

```java
public enum Day {
    MONDAY("星期一"),
    TUESDAY("星期二"),
    // ...
    SUNDAY("星期日");
    
    // 类属性
    private String desc;
    
    // 构造方法
    private Day(String desc) {
		this.desc = desc;
    }
    
    // 类方法
    public String getDesc() {
		return desc;
    }
}
```

### 11. 流(Stream)操作

> 流是java8的特性，允许以**声明式**的方式处理数据集合，而不是通过迭代器来手动处理

#### 11.1 流只能遍历一次

#### 11.2 流支持并行处理

#### 11.3 流的基本操作

- 筛选和切片 filter、distinct、limit、skip
- 映射 map、flatMap
- 查找和匹配 allMatch、anyMatch、noneMatch、findFirst、findAny
- 归约：reduce