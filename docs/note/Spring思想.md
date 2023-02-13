---
title: Spring思想
date: 2021-01-23 15:40:17
tags: spring
description: Spring入门，理论部分
---

# Spring 入门

## 1.Spring 框架介绍

#### 1.1设计理念

- IoC(Inversion of Control):控制反转
- AOP(Aspect Oriented Programming):面向切面编程

#### 1.2常用术语

- **框架**：包括项目的整体框架、一些基础功能、规定了类和对象如何创建、如何写作
- **非侵入式设计* **（轻量级）*：无需继承框架提供的任何类（更换框架时，可以继续使用之前的代码
- JavaBean：符合JavaBean规范的Java类，即Spring中的组件
- POJO(Plain Old Java Objects):简单老式Java对象，可以包含业务逻辑或持久化逻辑，但**不担当任何特殊角色**且**不继承或不实现任何其它Java框架的类或接口**
- **容器**：装对象的对象，负责管理对象的生命周期
- Spring与数据访问框架：Spring提供了**JDBC**, 第三方数据访问框架包括**Hibernate**、**JPA**
- Spring与Web: Spring提供了**Spring MVC**, 第三方Web框架包括Struts

`Java中Dao层、Service层和Controller层的区别：`

- `DAO层（data access object）:数据访问层  是一种比较底层，比较基础的操作，具体到某个表的增删改查，也就是说某个dao一定是和数据库的某张表一一对应，其中封装了增删改查的操作。建议Dao只做原子操作，增删改查。`

- `Service层` `叫服务层，被称为服务，粗略的理解就是对一个dao 或者多个dao进行再次封装，封装成一个服务，所以这里就不会是一个原子操作了，需要事务控制`。`需要根据系统的实际业务需求进行逻辑代码的编写，有些业务逻辑需要通过与数据库交互的，则业务逻辑层需要调用数据访问层（dao）的相关方法实现与数据库的交互，对于一些不需要与数据库进行交互的，则直接编写业务代码，将执行结果反馈给(Controller)即可`

- `Controller层``负责请求转发，接收页面过来的参数，传给service处理，接到返回值，再传给页面。只负责与数据库的数据交互，将数据进行存储读取操作`

- > DAO面向表，Service面向业务。后端开发时先数据库设计出所有表，然后对每一张表设计出DAO层，然后根据具体的业务逻辑进一步封装DAO层成一个Service层，对外提供成一个服务

  ![dao](https://gitee.com/floydzzx/tuchuang/raw/master/img/20210124121307.png)

#### 1.3框架结构

![kuangjia](https://gitee.com/floydzzx/tuchuang/raw/master/img/20210124121312.png)

- **Data Access/Integration层**包含有JDBC、ORM、OXM、JMS和Transaction模块。
- **Web层**包含了Web、Web-Servlet、WebSocket、Web-Porlet模块。
- **AOP模块**提供了一个符合AOP联盟标准的面向切面编程的实现。
- **Core Container(核心容器)：**包含有Beans、Core、Context和SpEL模块。
- **Test模块**支持使用JUnit和TestNG对Spring组件进行测试。

## 2.Spring Ioc 和DI

- ​	IoC(Inverse of Control):控制反转

  `**将原本在程序中手动创建对象的控制权，交由Spring框架来管理。**`

- **正控：**若要使用某个对象，需要**自己去负责对象的创建**

- `**反控：**若要使用某个对象，只需要**从 Spring 容器中获取需要使用的对象，不关心对象的创建过程**，也就是把**创建对象的控制权反转给了Spring框架**`

- **好莱坞法则：**Don’t call me ,I’ll call you

- > 理解：不需要主动去创造对象，而是使用别人提供好的对象

- DI(Dependency Injection): 依赖注入， 将对象`依赖属性`(简单值、集合、对象)通过`配置`设置值给对象

## 3.AOP(面向切面编程） 

- 功能分为核心业务功能（登录、增删改查），周边功能（性能统计、日志、事务管理）——切面

- AOP中，核心业务功能和切面功能独立开发，然后把切面功能和核心业务功能编织在一起。将周边功能封装起来，减少系统的重复代码，降低模块间的耦合度

- 概念：切入点(where) 通知(when) 切面(切面=切入点+通知) 织入(将切面加入对象，并由Spring创建对象)

- ![img](https://gitee.com/floydzzx/tuchuang/raw/master/img/20210124214847.png)

  

![image-20221222160418325](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202212221604516.png) 

> 自定义的用bean,非自定义的用xml配置

## 4. Spring缓存

![image-20221126122407318](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202211261224462.png)

####  4.1 MyBatis缓存

> 在参数和SQL相同的情况下，优先命中MyBatis缓存而不是在数据库中查询

MyBatis默认开启一级缓存，数据库的隔离级别只能为REPEATED READ；

- 一级缓存

  在`同一个事务`中，相同的SQL查询被缓存。

  存在问题：数据库隔离级别如果是READ COMMITED，则不适用，如果为REPEATED READ, 则适用 ；且不同请求的事务不同，一级缓存无法生效。

- 二级缓存

   `不同的事务`相同的SQL查询结果被缓存。

  存在问题：如果服务器有多台，那么可能一台服务器执行了UPDATE语句，而另一台服务器查询到错误的数据。

- 缓存的更新机制

  如果执行了UPDATE、INSERT、DELETE语句则会删除对应表的缓存。

#### 4.2 Redis缓存