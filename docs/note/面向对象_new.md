---
title: js学习三
date: 2021-08-03 15:00:07
tags: javascript
description: js面向对象
---

### 1.面向对象

> 对象是键值对的集合，表示属性和值的映射关系

- 创建对象
  
  ```js
  // 构造函数
  var person = new Person();
  person.say(); 
  
  // 直接调用
  Person(); // 添加到window
  window.say();
  
  //在另一个对象作用域中调用
  var o = new Object();
  Person.call(o);
  o.say();
  
  // 通过Object.create()创建
  const list = Object.create(Array); // Array是list的原型 list._proto_ = Array.prototype
  ```
  
  通过new()创建的对象，Person.prototype.isPrototypeOf(person) 为true

- 对象的遍历

```javascript
var obj ={
    a:11,
    b:22,
    c:33
};
for(var k in obj) {
    console.log(obj[k]);
}
```

- 对象的深浅克隆
  
  ![image-20210803152216343](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041454094.png)
  
  ```javascript
  var obj1 ={
      a:1,
      b:2,
      c:[22,33,44]
  };
  
  var obj2 = {}
  
  // 浅克隆
  // c属性是引用类型值，本质上obj1和obj2的c属性是内存中的同一个数组
  for (var k in obj1) {
      obj2[k] = obj1[k];
  }
  
  // 深克隆 使用递归
  // 不论对象的属性值是否是引用类型值，都能将它们实现克隆
  function deepClone(o) {
      if(Array.isArray(o)) {
          // 数组
          var result = [];
          for(var i = 0; i < o.length; i++) {
              result.push(deepClone(o[i]));
          }
      } else if (typeof o == 'object') {
          // 对象
          var result = {};
          for (var k in o) {
              result[k] = deepClone(o[k]);
          }
      } else {
          // 基本类型值
          var result = o;
      }
      return result;
  }
  ```

- **上下文**
  
  > this永远指向最后调用它的对象
  
  **函数的上下文由调用方式决定**
  
  ```javascript
  var obj = {
      nickname: 'xx',
      age: 1,
      // 对象打点调用函数，函数中的this 指代这个打点的对象
      sayHello: function() {
          console.log(this.nickname+this.age); // xx 1
      }
  }
  
  // 圆括号直接调用函数，函数中的this指代window对象
  var sayHello = obj.sayHello;
  sayHello(); // undesigned undesigned
  
  // IIFE中的函数，它的上下文是window对象
  // IIFE 立即执行函数
  function() {
      // xxx
  }
  
  // 类数组对象调用，上下文是调用的类数组对象
  
  // 定时器、延时器调用函数，上下文是window对象
  
  // 事件处理函数的上下文是绑定事件的DOM元素
  
  document.onclick = function() {
  
  }
  ```
  
  ![image-20210803182044094](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041454095.png)
  
  **备份上下文**： var self = this
  
  **指定函数上下文： 函数.call(上下文)   函数.apply(上下文)**
  
  ```javascript
  function sum() {
      alert (this.a+this.b+this.c);
  }
  
  function sum2(b1,b2) {
      alert (this.a+this.b+this.c+b1+b2);
  }
  
  var obj = {
      a:1,
      b:2,
      c:3
  }
  
  sum.call(obj);
  sum.applay(obj);
  sum2.call(obj,5,3); // 传参,参数为...array
  sum2.apply(obj,[5,3]); // 传参，参数为数组
  sum2.bind(obj,5,3)(); // 返回一个新的函数，需要调用
  ```
  
  **构造函数： 使用new()调用**   **类似于面向对象语言中的类**
  
  ```javascript
  function People(name,age,sex) {
      this.name = name;
      this.age = age;
      this.sex= sex;
  }
  
  var xioaming = new People('xx',10,'nan');
  ```
  
  **new() 的过程**
  
  ```javascript
  var a = new myFunction("Li","Cherry");
  
  new myFunction{
      var obj = {};
      obj.__proto__ = myFunction.prototype;
      var result = myFunction.call(obj,"Li","Cherry");
      return typeof result === 'obj'? result : obj;
  }
  
  /*
  创建一个空对象 obj;
  将新创建的空对象的隐式原型指向其构造函数的显示原型。
  使用 call 改变 this 的指向
  如果无返回值或者返回一个非对象值，则将 obj 返回作为新对象；如果返回值是一个新对象的话那么直接直接返回该对象。
  */
  ```

- **原型 （prototype）**
  
  - Object.prototype是原型链的终点，具有toString()、valueOf()等函数，Object.prototype.\_proto\_ =null
  - Function是所有函数的构造函数，所有函数是Function的实例，Person.\_proto\_ = Function.prototype; Function自身也是自己的一个实例，Function.\_proto_ = Function.prototype; 
  - Function也是一个对象，Function.prototype.\_proto_ = Object.prototype; Object也是Function的一个实例，Object.\_proto_ = Function.prototype
  
  ![image-20220210122738185](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041454096.png)
  
  ![image-20210803184540300](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041454097.png)
  
  **构造函数的prototype属性是它的实例的原型**
  
  ![image-20210803190257902](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041454098.png)
  
  **原型链查找**
  
  **实例可以打点访问它的原型的属性和方法**
  
  **hasOwnProperty方法可以检查对象是否真正拥有自己的属性和方法**
  
  **isPrototypeOf()可以检查对象的原型** Array.isPrototypeOf(list) // true
  
  ```javascript
  function People() {
  
  }
  
  People.prototype.sayHello = function() {
  
  }
  
  var xiaoming = new People();
  var xiaohong = new People();
  ```
  
  **通过原型链实现继承**
  
  ![image-20210803192113732](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041454099.png)
  
  ```javascript
  function People(name, age, sex) {
      this.name = name;
      this.age = age;
      this.sex = sex;
  }
  
  People.prototype.sayHello = function() {
      console.log(this.name);
  }
  
  function Student(name,age,sex,scholl,studentNumber) {
      this.name = name;
      // ...
  }
  // 子类， 学生类
  Student.prototype.study = function() {
      consolo.log("study");
  }
  // 关键语句，实现继承
  Student.prototype = new People();
  
  // 实例化
  var hanmeimie = new Student();
  hanmeimei.study();
  hanmeimei.sayHello();
  ```
  
  **包装类**
  
  > 包装类可以让基本类型值从它们的构造函数的prototype上获得方法
  
  ```javascript
  var a = new Number(123);
  var b = new String('慕课网');
  var c = new Boolean(true);
  ```