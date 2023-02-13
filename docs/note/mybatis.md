---
title: mybatis
date: 2021-02-02 14:37:46
tags: mybatis
description: mybatis知识
---

### 1.原始jdbc操作

#### 1.1查询操作

#### ![](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041449836.png)

#### 1.2插入操作

![image-20210202145851072](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041449871.png)

### 2.mybatis简介

![image-20210202151053984](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041449924.png)

- 持久层：可以将业务数据**存储到磁盘，具备长期存储能力**，只要磁盘不损坏，在断电或者其他情况下，重新开启系统仍然可以读取到这些数据。
- CRUD:增删改查 Create Retrieve Update Delete

### 3.mybatis开发步骤

- 导入pom坐标

  ```xml
          <dependency>
              <groupId>mysql</groupId>
              <artifactId>mysql-connector-java</artifactId>
              <version>8.0.22</version>
          </dependency>
          <dependency>
              <groupId>org.mybatis</groupId>
              <artifactId>mybatis</artifactId>
              <version>3.5.6</version>
          </dependency>
  ```

  

- 创建user数据表

  ![image-20210202230451691](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041449988.png)

- 编写user实体类

  ```java
  public class User {
      private int id;
      private String username;
      private String password;
  
      public int getId() {
          return id;
      }
  
      public void setId(int id) {
          this.id = id;
      }
  
      public String getUsername() {
          return username;
      }
  
      public void setUsername(String username) {
          this.username = username;
      }
  
      public String getPassword() {
          return password;
      }
  
      public void setPassword(String password) {
          this.password = password;
      }
  
      @Override
      public String toString() {
          return "User{" +
                  "id=" + id +
                  ", username='" + username + '\'' +
                  ", password='" + password + '\'' +
                  '}';
      }
  }
  ```

  

- 编写映射文件UserMapper.xml

  ```xml
  <?xml version="1.0" encoding="UTF-8" ?>
  <!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
  <mapper namespace="userMapper">
      <select id="findAll" resultType="com.zzx.domain.User">
          select * from user 
      </select>
      <insert id="save" parameterType="com.zzx.domain.User">
      	insert into user values(#{id},#{username},#{password})
      </insert>
      <update id="update" parameterType="com.zzx.domain.User">
      	update user set username=#{username},password=#{password} where id=#{id}
      </update>
      <delete id="delete" parameterType="java.lang.Integer">
      	delete from user where id=#{id}
      </delete>
  </mapper>
  ```

  ![image-20210202230947523](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041449052.png)

  - 编写核心文件SqlMapConfig.xml

  ```java
  <?xml version="1.0" encoding="UTF-8" ?>
  <!DOCTYPE configuration PUBLIC "-//mybatis.org//DTD Config 3.0//EN" "http://mybatis.org/dtd/mybatis-3-config.dtd">
  <configuration>
      <!--数据源环境-->
      <environments default="development">
          <environment id="development">
              <transactionManager type="JDBC"></transactionManager>
              <dataSource type="POOLED">
                  <property name="driver" value="com.mysql.jdbc.Driver"/>
                  <property name="url" value="jdbc:mysql://127.0.0.1:3306/test?serverTimezone=CST"/>
                  <property name="username" value="root"/>
                  <property name="password" value="abc@123"/>
               </dataSource>
          </environment>
      </environments>
  
      <!--加载映射文件-->
      <mappers>
          <mapper resource="com/zzx/mapper/UserMapper.xml"></mapper>
      </mappers>
  </configuration>
  ```

  

- 编写测试类(一般在dao层实现，采取代理方式)

  ```java
  public class test {
      @Test
      public void test1() throws IOException {
          //获得核心配置文件
          InputStream resourceAsStream = Resources.getResourceAsStream("sqlMapConfig.xml");
          //获得session工厂对象
          SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(resourceAsStream);
          //获得session会话对象
          SqlSession sqlSession = sqlSessionFactory.openSession();
          //执行查询操作
          List<User> userList = sqlSession.selectList("userMapper.findAll");
          /*
          执行插入操作
          User user = new User();
          user.setUsername("tom");
          user.setPassword("123");
          sqlSession.insert("userMapper.save",user);
          sqlSession.commit();
          */
          /*
          执行修改操作
          User user = new User();
          user.setId(7);
          user.setUsername("tom");
          user.setPassword("123");
          sqlSession.update("userMapper.update",user);
          sqlSession.commit();
          */
           /*
          执行删除操作
          sqlSession.delete("userMapper.delete",7);
          sqlSession.commit();
          */
          //打印数据
          System.out.println(userList);
          //释放资源
          sqlSession.close();
      }
  }
  ```

![image-20210203133553673](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041449107.png)

![image-20210208115525301](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041449161.png)

### 4.基本原理

- 应用程序找 MyBatis 要数据

- MyBatis 从数据库中找来数据
  1.通过 SqlMapConfig.xml 定位哪个数据库
  2.通过 UserMapper.xml 执行对应的 sql 语句
  3.基于 UserMapper.xml 把返回的数据库封装在 User 对象中
  4.把多个 User 对象装载一个 User 集合中
  
- 返回一个 User 集合

- 配置解析

  ![image-20210207150627635](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041449206.png)

### 5.映射文件深入

#### 5.1动态sql语句（根据条件查询）

- if

  ![image-20210208120213418](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041449263.png)

- foreach

  ![image-20210208121540739](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041449314.png)

#### 5.2 sql片段抽取

<sql>

### 6.核心配置文件深入

- typeHandlers标签：类型处理器，将获取的值转换成java类型

  ![image-20210208123304538](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041449368.png)

- plugins标签：第三方插件，分页助手PageHelper

  ![image-20210208132406646](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041449437.png)

  ```xml
          <dependency>
              <groupId>com.github.pagehelper</groupId>
              <artifactId>pagehelper</artifactId>
              <version>3.7.5</version>
          </dependency>
          <dependency>
              <groupId>com.github.jsqlparser</groupId>
              <artifactId>jsqlparser</artifactId>
              <version>0.9.1</version>
          </dependency>
  ```

  ![image-20210208134320758](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041449494.png)

  ![image-20210208134855893](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041449554.png)

### 7.多表开发

![image-20210210181434716](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041449615.png)

- 7.1一对一的查询（一个订单对应一个用户）

核心配置文件

![image-20210210153357238](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041449686.png)

OrderMapper.xml

![](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041449737.png)

- 7.2一对多查询（一个用户对应多个订单）

  UserMapper.xml

  ![image-20210210180023681](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041449805.png)

- 7.3 多对多查询

  ![image-20210210180221815](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041449858.png)

  ![image-20210210180849550](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041449921.png)

### 8.注解开发

UserMapper.java

![image-20210210183534865](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041449989.png)

核心配置文件：
![image-20210210183628185](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041449058.png)

常用注解：

![image-20210210182334788](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041449123.png)

![image-20210210183824476](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041449179.png)

![image-20210210183838282](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041449248.png) 

**一对一查询：**

![image-20210211121813846](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041449300.png)

![image-20210211122209535](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041449377.png)

**一对多查询：**

![image-20210211122621103](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041449442.png)

**多对多查询：**

UserMapper.java

![image-20210211122927956](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041449514.png)

RoleMapper.java

![image-20210211122942074](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041449587.png)

### 9.在Spring中使用Mybatis

- pom中导入坐标

  ```xml
  <dependency>
  	<groupId>org.mybatis</groupId>
      <artifactId>mybatis</artifactId>
      <version>3.4.6</version>
  </dependency>
  <dependency>
  	<groupId>org.mybatis</groupId>
      <artifactId>mybatis-spring</artifactId>
      <version>1.3.2</version>
  </dependency>
  ```

- 配置application-mybatis.xml

- 配置Mybatis配置mybatis-config.xml

- 测试类

  