---
title: js学习(一)
date: 2021-07-25 18:42:30
tags: javascript
description: JS红宝书学习
---

### 一、概览

- JavaScript由ECMAScript、文档对象模型(DOM)、浏览器对象模型(BOM)组成
- ECMAScript提供核心语言功能
- DOM提供访问和操作网页内容的方法和接口
- BOM提供与浏览器交互的方法和接口
- Js 是一门基于对象的语言

### 二、在HTML中使用JavaScript

- 使用Script标签元素（script元素应该放在页面的head元素中或body中）
  
  ```html
  <html>
       <head>
          <title>xxx</title>
          <!--会导致等全部js代码都被下载、解析完才开始呈现页面内容-->
          <script type="text/javascript" src="xxx.js"></script>
      </head>
      <body>
          <!--打开浏览器速度加快-->
          <script type="text/javascript" src="xxx.js"></script>
      </body>
  </html>
  ```

- 嵌入脚本与外部脚本

- defer延迟执行,async异步执行

### 三、数据类型、语句

- **基本数据类型: Undefined、Null、Boolean、Number(浮点类型，没有整型)、String** 
- 复杂数据类型：Object(本质上由一组无序的名值对组成)
- NaN也属于number类型，而且它不等于自身
- **for-in语句： for (var propName in window) { document.write(propName)}**
- label语句：label: statement 一般要与for语句等循环语句配合使用
- 函数接受的参数arguments是一个数组，没有重载

### 四、垃圾回收

> 标记清除 

垃圾收集器在运行的时候会给存储在内存中的所有变量都加上标记，然后去掉环境中的变量以及被环境中的变量引用的变量的标记

在此之后加上标记的变量将被视作准备删除的变量，垃圾收集器定时完成内存清除

### 五、引用类型

#### 1. Object

对象的key值只能是字符串或Symbol

```javascript
// Object构造函数
let person = new Object();
// 对象字面量表示法
let person = {
    name: 'xx',
    age: 29
};

// 新数据替换旧数据
var palyer = {score: 1, name: 'Jeff'};
var newPlayer = Object.assign({},player,{score:2}); // player的值没有改变，newPlayer的值为{score:2,name:'Jeff'}
// 使用对象展开语法
var newPlayer = {...player,score:2};

// 遍历对象
let i in obj

Object.values(obj); //  -> ['xx', 29]
Object.keys(obj); //   -> ['name', 'age']
```

#### 2. Array

`数组中每个槽位可以存储任意类型的数据。这意味着可以创建一个数组，它的第一个元素是字符串，第二个元素是数值，第三个是对象。ECMAScript数组也是动态大小的，会随着数据添加而自动增长。`

```javascript
let colors = new Array(20);
let colors = new Array("red","blue","green");
let colors = ["red","blue","green"];
// ES6新增方法 from of
// form 用于将类数组结构转换为数组实例，第一个参数是一个类数组对象，第二个可选参数是映射函数
Array.from("MAtt"); // ["M","A","t","t"]
// of 用于把一组参数转换为数组 
Array.of(1,2,3,4); // [1,2,3,4]
// isArray方法判断一个值是否为数组
```

数组length属性的独特之处在于，它不是只读的。通过修改length属性，可以从数组末尾删除或添加元素

Array的原型上暴露了3个用于检索数组内容的方法：keys()、values()和entries()。keys()返回数组索引的迭代器，values()返回数组元素的迭代器，而entries()返回索引/值对的迭代器

```javascript
const a = ["foo","bar","baz","qux"];
const aKeys = Array.from(a.keys()); // [0,1,2,3]
const aValues = Array.from(a.values()); // ["foo","bar","baz","qux"]
const aEntries = Array.from(a.entries()); // [[0,"foo"],[1,"foo"],[2,"foo"],[3,"foo"]]
```

- 栈方法: push入栈，返回数组的长度   pop出栈，返回被删除的项

- 队列方法: push入队   shift删除数据的第一项并返回

- 数组转字符串
  
  ```js
  const a = [1,2,3,10,11]
  a.join() // 返回数组元素拼接的字符串
  a.join(',') // 以逗号分隔
  ```

- 排序方法：**reverse将数组元素反向排列**     **sort按照升序重新排列数组元素(转换为字符串后比较)** （**改变原数组**）
  
  ```js
  const a = [1,2,3,10,11] 
  a.sort() // 1,10,11,2,3 转换为字符串后比较，按照ASCII值
  
  // 自定义排序
  a.sort((a,b) => a-b) // 1,2,3,10,11
  ```

- 操作方法：concat在数组末尾添加   slice截取数组   splice在数组中间插入元素
  
  ```javascript
  let colors = [1,2,3];
  let colors2 = colors.concat(4,5); // [1,2,3,4,5]
  
  let colors = [1,2,3,4,5];
  
  let colors1 = colors.slice(); // 复制数组
  let colors2 = colors.slice(1); // [2,3,4,5]
  let colors3 = colors.slice(1,4); // [2,3,4] 前闭后开
  
  // 删除  splice(0,2)   要删除的第一个元素的位置  要删除的元素数量
  // 插入  splice(2,0,"red")   开始位置  要删除的元素数量  要插入的元素
  // 替换  splice(2,1,"red","green")    开始位置  要删除的元素数量  要插入的元素
  ```

- 搜索数组  indexOf()  lastIndexOf()  includes() 
  
  断言函数  find((element,index,array) => element.age<28))；

- 迭代方法
  
  ![image-20210801173302520](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041454175.png)
  
  reduce: 数组的归并方法，可以同时将前面数组项遍历产生的结果与当前遍历项进行计算
  
  ```javascript
  let numbers = [1,2,3,4,5,4,3,2,1];
  let filterResult = numbers.filter((item,index,array) => item > 2) // 3，4，5，4，3
  let mapResult = numbers.map((item,index,array) => item * 2); // 2，4，6，8，10，8，6，4，2
  numbers.foreach((item,index,array) => {
      // 执行操作
  })
  // reduce接收一个函数和初始值，函数接收两个参数，prev是前一轮的结果，cur是当前数组项
  numbers.reduce(function(prev, cur) {
      return prev + cur;
  }, 0);
  ```

#### 3. Map(与object类似)

![](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041454177.jpg)

```js
// 创建map
var myMap = new Map();
var myMap = new Map(kvArray); // 传入参数为二维数组

myMap.set(key,value);
myMap.get(key);

// map的迭代
for(var [key,value] of myMap) {
    console.log(key+ "=" + value);
}

// entries方法返回一个新的Iterator对象，包含[key,value]数组
for(var [key,value] of myMap.entries()) {
    console.log(key+ "=" + value);
}
// 遍历键
for(var key of myMap.keys()) {
    console.log(key);
}
// 遍历值
for(var value of myMap.values()) {
    console.log(value);
}

myMap.forEach(function(value, key) {
    console.log(key+ "=" + value);
})

// map的合并
var merged = new Map([...first,...second]);
```

#### 4.Set(集合类型)

```js
let mySet = new Set();

mySet.add(1);
```

#### 5.Date类型

```js
var now = new Date(); // 现在的时间
var someDate = new Date("May 25,2004");
```

#### 6.RegExp类型(正则表达式)

##### 1.创建

```js
// 字面量创建
var re = /ab+c/ig;
// 调用RegExp对象的构造函数
var re = new RegExp("ab+c","ig");
// 修饰符i表示忽略大小写 g表示全局匹配 m表示多行匹配
```

##### 2. 正则规则

- 元字符
  - \ 转义符——将元字符转为一般字符
  - ^ 匹配字符串的开头
  - $ 匹配字符串的结尾
  - () 一组元素
  - [] 匹配字符集中的一个字符 [a,b,c]表示匹配字符a或b或c [\^a,b,c]表示不等于a,b,c的字符 [a-e]表示匹配a-e范围内的字符 [a-z0-9A-Z_]匹配数字字母下划线
  - | 或操作(ABC|DBS) 表示匹配ABC或DBS
  - {}表示前面的字符出现的次数 {n}表示出现n次  {n,m}表示出现n次到m次
  - \* 匹配前面的子表达式0次或多次00
- 预定义类
  - \d 数字 \D非数字
  - \w 字母数字下划线 \W非字母数字下划线
  - \s 空白字符 \S非空字符
  - . 任意字符

###### 3. 验证

```js
var re = new RegExp("正则表达式","修饰符");
// RegExp类
re.test("验证字符串"); // 测试s是否符合正则表达式，返回true or false
re.exec("验证字符串"); // 匹配字符串，返回匹配到的字符串，若没有匹配到返回null
// String类
var s = "验证字符串";
s.search(re); // 返回匹配到的字符串位置，若没有则返回-1
s.match(re); // 返回匹配子串数组
s.replace(re,s); // 将re匹配到的字符串替换为s
```

###### 4. 示例

```js
// g表示全局模式 i表示不区分大小写模式 m表示多行模式
var pattern1 = /at/g; // 匹配字符串中所有"at"
var pattern2 = /[bc]at/i; // 匹配第一个"bat"或"cat",不区分大小写
var pattern3 = /.at/gi; // 匹配所有以"at"结尾的3个字符的组合，并不区分大小写  .表示任意字符
var phone = /^(136|189|12[3-9])/g

// 字符串trim方法实现
str.replace(/^\s+|\s+$/g, '')
```

#### 7. 包装类型 (Boolean Number String)

#### 8. 内置对象Math

- Math.random(0, x) 返回一个范围为[0,x)的随机数
- Math.abs(x) 返回x的绝对值
- Math.floor(x) 对x进行向下取整(floor 地板) 
- Math.ceil(x) 对x进行向上取整
- Math.round(x) 对x进行四舍五入

### 六、 函数

#### 1. 立即执行函数 （IIFE）

```js
;(function dosomething() {
    console.log('xxx')
})()
```

#### 2. 函数提升

在执行代码之前，JavaScript会根据规则重新排序，**将函数移动到作用域的顶部**

### 七、 循环

#### 1. for...in...(迭代属性名)

遍历对象的所有可迭代属性名

```js
for(let property in object){
    console.log(property) // 属性名
    console.log(object[property]) // 属性值
}
```

#### 2. for...of...(迭代属性值)

```js
for(const value of ['a','b','c']) {
    console.log(value) // 属性值
}

for(const [index,value] of ['a','b','c'].entries()) {
    console.log(index)
    console.log(value)
}
```

#### 3. 循环作用域

```js
// var 变量提升
const operations []

// 等同于 var i
for(var i=0; i<5; i++) {
    // 没有形成闭包
    operations.push(() => {
        console.log(i)
    })
}
for(const operation of operations) {
    operation()
}
// 5 5 5 5 5 
// 解决方法： let  立即执行函数
```

```js
const operations = []

for(var i=0; i<5; i++) {
    operations.push(((j) => {
        return () => console.log(j)
    })(i))
}

for(const operation of operations) {
    operation()
}
```

### 八、事件

#### 事件循环

> javascript如何单线程工作 处理异步函数

1. **调用堆栈**(后进先出队列)
   
   **事件循环不断检查调用堆栈里是否仍有函数需要执行**，将找到的函数加入调用堆栈，按照顺序执行
   
   ```js
   const bar = () => console.log('bar')
   const baz = () => console.log('baz')
   const foo = () => {
     console.log('foo')
     bar()
     baz()
   }
   foo()
   // foo bar baz
   ```
   
   ![image-20210903122100211](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041454178.png)

2. 函数执行队列

3. 消息队列
   
   **消息队列包含： 回调函数 点击/键盘事件 DOM事件(onLoad)**
   
   **整个循环会优先进行调用堆栈，先处理调用堆栈里找到的内容，一旦没有内容，它就会在事件队列里拾取内容**

4. 宏任务 微任务
