---
title: springboot 入门
date: 2021-02-14 14:49:15
tags: spring
description: springboot入门
---

> Springboot大量使用约定简化配置，内置Tomcat, 并且通过Starter可以方便地引入其他框架

### 1.注解

- **@SpringBootApplication** 来标注一个主程序，说明这是一个Sping Boot项目。该注解组合了三个注解：

  - @Configuration
  - @EnableAutoConfiguration, 根据jar包依赖自动配置，如Tomcat和SpringMVC
  - @ComponentScan, 扫描入口类同级包里的Bean

- **Controller层**

  **@RestController**注解相当于@ResponseBody ＋ @Controller合在一起的作用,**默认返回json格式**

  1.使用@Controller 注解
  在对应的方法上，视图解析器可以解析return 的jsp,html页面，并且跳转到相应页面
  若返回json等内容到页面，则需要加@ResponseBody注解
  2.@RestController注解
  相当于@Controller+@ResponseBody两个注解的结合。
  返回json数据不需要在方法前面加@ResponseBody注解了
  使用@RestController这个注解，就不能返回jsp,html页面，视图解析器无法解析
  jsp,html页面

- 配置文件获取

  @ConfigurationProperties 意思是:我们类里面的属性和配置文件中的属性做绑定

  prefix = "persion" 配置文件中那个下面的属性来一一映射

  @PropertySource：加载指定配置文件

  @Component 如果想要这个注解起作用，必须放到容器里面

  ![image-20210214145822481](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041450115.png)

- JSR303校验(数据校验)

  ```java
  @Component
  @ConfigurationProperties(prefix = "person")
  @Validated // 数据校验
  public class Person {
  	// 该属性的值必须符合邮件格式
      @Email(message = "邮件格式错误")
      private String email;
  }
  ```
  
- 测试类

  ![](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041450116.png)

### 2.配置文件

> yaml相较于properties拥有语法简单、松散绑定、JSR303校验等优点

- application.yml

  ```yaml
  persion: 
      name: 王大锤 
      age: 18 
      weight: 125 
      boss: false 
      birth: 2018/5/5 
      maps: {k1: v1,k2: v2} 
      list: 
        - wangli 
        - wangbai 
      dog: 
        name: xiaogou 
        age: 2
  ```

- application.properties

  ```
  persion.name = 王大锤 
  persion.age = 18 
  persion.weight = 125 
  persion.boss = false 
  persion.birth = 2018/5/5 
  persion.maps.k1 = v1 
  persion.maps.k2 = v2 
  persion.dog.name = xiaogou 
  persion.dog.age = 15
  ```
  
- 多环境配置和配置文件的优先级

  - 多配置文件优先级

    ![image-20221028232818898](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202210282328165.png)

      1. 项目根目录下的config目录
      2. 项目根目录下
      3. resource目录下的config目录
      4. resource目录下
    
  - 多环境配置
  
    ```
    // 在application.propertites文件中指定环境
    spring.profiles.active = dev
    // 根据生产、开发、测试创建不同的配置文件
    ```
  
    

### 3.web实战

#### 3.1模板引擎

*把**数据**和**静态模板**进行绑定，生成我们想要的**HTML***

常见模板引擎：JSP、Thymeleaf、Freemarker、Velocity

- Thymeleaf的使用

  只需要把HTML放在classpath:/templates/，Thymeleaf就会自动解析渲染

![image-20210214162743660](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041450117.png)

#### 3.2 静态资源映射

扩展SpringMvc配置

#### 3.3 filter

#### 3.4 合法性检验

```java
@PostMapping("")
@Audit
public ReturnObject createProduct(@Validated @RequestBody ProductVo productVo, @LoginUser Long userId, @LoginName String userName) {
    // Validated注解用来检验参数的合法性。若不合法则会抛出异常
    return new ReturnObject(ReturnNo.CREATED, vo);
}
```

```java
@RestControllerAdvice(basePackages = "xxx.controller")
public class ControllerExceptionHandler {
    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    public Object methodArgumentNotValid(MethodArgumentNotValidException, HttpServletResponse response) {
        return BAD_REQUEST;
    }
}
```

### 4. 集成框架

#### 4.1 Lombok

- Data注解
- Get、Set注解
- AllArgsConstructor(static = "of")  NoArgsConstructor

#### 4.2 Mybatis-Plus

- Service、DAO层简化开发

#### 4.3 JPA

> JPA全称Java Persistence API 是一款ORM框架，基于Hibernate实现

- 配置

  ```yaml
  jpa:
    hibernate:
      ddl-auto: update // 第一次使用create自动建表，后续使用Update
    show-sql: true
  ```

- 实体类

  ```java
  // @Entity注解表示实体类，@Id注解表示Id,@GeneratedValue字段自动生成
  @Entity
  public class Account {
  	@Id
      @GeneratedValue
      private int id;
      private String name;
  }
  ```

- Dao层（数据访问层）

  ```java
  // 只需要编写一个继承自JpaRepository的接口就可以自动进行单表操作
  public interface AccountDAO extends JpaRepository<Account, Integer> {
  	// JpaRepository泛型接受的第二个参数为主键的类型
  }
  ```

- Web层 (Service、Controller层)

  ```java
  @RestController
  @RequestMapping("/account")
  public class AccountController {
  	@Autowired
      AccountDAO accountDAO;
      
      @RequestMapping(value="/list", method = RequestMethod.GET)
      public List<Account> getAccounts() {
          return accountDAO.findAll();
      }
      
      @RequestMapping(value = "/{id}", method = RequestMethod.GET)
      public Account getAccountById(@PathVariable("id") int id) {
  		return accountDAO.findOne(id);
      }
      // Update: accountDAO.saveAndFlush(account);
      // Add: accountDAO.save(account);
  }
  ```

- 数据库事务：通过在service层方法上添加@Transactional注解

#### 4.4 Redis