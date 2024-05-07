### 1. 前言

​	实习期间我参与了一个公司内部产品协作平台designhub的开发，其核心功能是产品经理和UI设计师可以上传对应产品的需求文档和原型图，技术人员可以在线预览并给出评审意见，双方也可以对评审意见进行评论。预览的文件类型包括word、pdf以及axure工具导出的html文件，后端技术选型为`egg.js` + ORM框架`Sequelize` + `MySQL` + `Minio`对象存储，前端技术选型为`vue3`+`Element-plus`+`TS`。大致流程就是产品经理在前端上传文件，后端接收后存储到minio里，预览是通过直接在iframe中打开文件。

### 2. CRUD

​	后端整体上遵循MVC架构，提供Restful风格的接口，分为controller、service、model层。

​	评审需求中涉及到review、review_item表。

​	事务（保证操作的原子性）：如一次操作要修改多个表

​	封装baseContoller，统一返回格式，统一错误处理

​	遇到的坑：forEach中await不会按顺序执行  -> 改用Promise.all

### 3. 文件上传

由于业务不会涉及到很大的文件上传，所以没有做太多大文件上传的处理。

https://mp.weixin.qq.com/s/DhirOMKMHR8hzmDnrkLTFw

### 4. 容器化部署

docker  docker-compose

### 5. 前端预览

​	要做到用户在文档上双击就可以在当前位置创建一个评审框，就需要记录当前点击的位置，当然可以通过e.offsetX和e.offsetY来获得。但是主要遇到的问题是使用iframe进行的文件预览，如果我们直接通过点击事件获取位置的话没有办法获取到在iframe中的准确位置，所以需要想办法监听到iframe中页面的滚动事件，对于需求文档和原型图的预览还需要监听页面的切换。

​	

​	

