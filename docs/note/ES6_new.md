---
title: js学习四
date: 2021-08-04 10:45:55
tags: javascript
description: es6 es7 es8学习
---

## ES6

### 1. let 与 const

- let 只在代码块内有效

- let只能声明一次，不能重复声明

- let不存在变量提升，var 会变量提升
  
  ```javascript
  console.log(a); // ReferenceError: a is not defined
  let a = "apple";
  
  console.log(b); // undefined
  var b = "banana";
  ```

- const 声明一个只读变量，声明后不允许改变

- 代码内如果存在let或者const，代码块会对这些命令声明的变量从块的开始就形成一个封闭作用域 （**暂时性死区**）代码快内，在声明变量之前使用会报错

### 2. 解构赋值

针对数组或者对象进行模式匹配，然后对其中的变量进行赋值

```javascript
// 数组解构
let [a,b,c] = [1,2,3];
let [a,[[b],c]] = [1,[[2],3]];
let [a, , b] = [1,2,3]; // a=1, b=3
let [a,b] = [1,2,3]  // a=1, b=2

// 剩余运算符
let [a,...b] = [1,2,3]; // a=1,b=[2,3]
// 解构字符串
let [a,b,c,d,e] = 'hello'; // a='h' b='e' c='l' d='l' e='o'

// 解构默认值
// 当解构模式有匹配结果，且匹配结果是Undefined，会触发默认值作为返回结果
let [a = 2] = [undefined]; // a=2

//对象解构
let {foo,bar} = {foo:'aaa',bar:'bbb'};
let {a,b,..rest} = {a:10,b:20,c:30,d:40}; // a=10,b=20,rest={c:30,d:40}
```

### 3. Symbol

ES6引入的新的原始数据类型，表示独一无二的值，用来定义对象的唯一属性名

let sy = Symbol("kk");

### 4. Map与Set

Map对象保存键值对，任何值都可以作为一个键或值

```javascript
var myMap = new Map();
myMap.set("xx","xxxx"); // 键可以是字符串、对象、函数、NaN
myMap.get("xx");

// Map的迭代
for(var [key,value] of myMap) {
    console.log(key+"="+value);
}

for(var value of myMap.values()) {
    console.log(value);
}

myMap.forEach(function(value,key) {
    console.log(key+"="+value);
},myMap)

// Map的合并
var first = new Map([1,'x'],[2,'s'],[3,'w']);
var second = new Map();
var merged = new Map([...first,...second]);
```

Set对象允许储存任何类型的唯一值

```javascript
// 数组去重
var mySet = new Set([1,2,3,4,4]);
[...mySet]; // [1,2,3,4]
```

WeakMap(key只能是对象，不可遍历): 用es6中map进行存储时，如果map中某一项数据的键值的对象被垃圾回收(退出执行上下文环境), 对应的value值仍然存在。如果我们存储的value值是DOM对象，那么就有可能产生内存泄漏。使用weakmap，键值对象与值之间的关系是弱引用，当Key对象被清除，对应值也会被清除

WeakSet的成员只能是对象，它是对象的弱引用，垃圾回收机制不考虑，所以不会造成内存的泄露

WeakMap和WeakSet不可迭代

### 5.模版字符串

```javascript
// 模版字符串中的换行和空格会被保留
let info = `my  name is ${name}`
```

### 6. 扩展运算符

拓展运算符（...）用于取出参数对象所有可遍历属性然后拷贝到当前对象

### 7.函数

**箭头函数的 this 始终指向函数定义时的 this，而非执行时**

> 箭头函数中没有 this 绑定，必须通过查找**作用域链**(**函数、全局**)来决定其值，**如果箭头函数被非箭头函数包含，则 this 绑定的是最近一层非箭头函数的 this，否则，this 为 undefined（window对象）**

不可以作为构造函数（不能使用new命令）

```javascript
// 箭头函数
var f = (a,b) => {
    // 箭头函数里面没有this对象
    // 此时的this是window
}

// 适用于回调函数
var Person = {
    'age': 18,
    'sayHello': function() {
        // 相当于var self = this
        setTimeOut(() => {
            console.log(this.age);
        });
    }
};

var age =20;
Person.sayHello(); //18
```

### 8.类

```javascript
function Person() {
    // window.age = 18; new Person().age = undefined
    age = 18;
}
```

```javascript
// 声明形式
class Person{
    // 直接赋值视作给Person添加属性, new Person().age = 18
    age = 18;
    // 通过#来声明私有变量
    #sex = 'male';
    constructor(name,age,sex) {
        // 私有属性
        this._name = name;
        this.age = age;
        this.sex = sex;
    }
    // getter
    get name() {
        return this._name;
    }

    // setter
    set name(value) {
        this._name = value;
    }

    getSex = function() {
        return this.sex;
    }

    getName = function() {
        return this.name;
    }
    // 定义在prototype上
    speak () {
        // 父类方法
    }
}
// 表达式形式
const Person = function() {};

// 继承
class Programmer extends Person{
    constructor(name,age,sex) {
        super(name,age,sex);
    }

    // 同名覆盖
    speak() {
        // 子类方法
    }
}
```

class可以看作是构造函数的语法糖，更贴近面向对象的语法。**类的数据类型就是函数，类本身就指向构造函数。** **类内部定义的方法(不是定义在this对象上)都定义在prototype上，且不可枚举。**

- constructor方法是类的默认方法，通过new命令生成对象实例时自动调用constructor方法，默认返回实例对象(this)
- **不存在变量提升**，必须保证子类在父类之后定义
- this指向
- **子类必须在constructor方法中调用super方法，否则新建实例得不到this对象**
- 作为一个对象，子类（`B`）的原型（`__proto__`属性）是父类（`A`）；作为一个构造函数，子类（`B`）的原型（`prototype`属性）是父类的实例
- static静态方法可以直接通过类来调用，不会被实例继承

### 9.Promise对象

​    promise解决了**回调地狱**

​    promise的三种状态： **pending(未完成)   resolve(执行)   fulfilled(resolved)  已成功**

```javascript
// Promise是异步操作的一种解决方案
// 回调函数
document.addEventListener(
'click',
() => {
    console.log('异步');
},false
);
console.log('同步');

const p = new Promise((resolve,reject) => {
    // 执行reolve,pending->resolved
    resolve('success');
    // 执行reject,pending->rejected
    reject('failed');
});

// .then会返回一个Promise对象，默认为成功状态
p.then(
    // 成功
    (data) => {
        console.log(data);
    }
},
    (err) => {
    // 失败
        console.log(err);
});

p.catch(err=>{
    // 捕获错误
})

p.finally(data=>{
    // 只要状态变化就会执行
})
```

```javascript
// 异步加载图片
const loadImgAsync = url => {
    return new Promise((resolve,reject) => {
        const img = new Image();

        img.onload = () => {
            resolve(img);
        };

        img.onerror = () => {
            reject(new Error(`Could not load Image at ${url}`));
        };

        img.src = url;
    });
};

cosnt imgDOM = document.getElementById('img');
loadImgAsync('图片url').then(img=>{
    console.log(img.src);
    imgDOM.src = img.src;
});
```

### 10. 模块 module

模块：一个一个的局部作用域的代码块

```javascript
// export default导出 import导入
// 一个模块只能有一个export default
export default xx;
// export导出 import导入
// export可以导出多个命名
import * as xx from './xx';  // 全部导入
import {a,b,c} from './xx';

// import命令具有提升效果，会提升到整个模块的头部，this指向undefined
// import和export命令只能在模块的顶层，不能放在代码块中执行
```

### 11. Babel

将ES6代码转化为ES5、ES3的代码

### 12.Webpack

webpack是**静态模块打包器**，当webpcak处理应用程序时，会将所有模块(**js/css/图片/字体**)打包成一个或多个文件

loader 让 webpack能够处理非JS文件的模块

plugins可以用来处理各种各样的任务

```javascript
const path = resquire('path');
const HtmlWepackPlugin = require('html-webpack-plugin');

module.exports = {
    // 入口文件
    entry:'./src/index.js',
    // 出口
    output:{
        path: path.resolve(_dirname,'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules:[
            {
               // js文件使用babel处理
              test:/\.js$/,
              exclude:/node_modules/,
               loader:'babel-loader'
               },
            {
                test: /\.css$/,
                use:['style-loader','css-loader']
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./3.html'
        })
    ]
};
```

## ES7

### 1.Array.prototype.includes()

检查一个数组是否包含一个元素

### 2.指数运算符

4 ** 2 === Math.pow(4,2)

## ES8

### 1. Object.values()

返回一个包含对象自身属性值的数组

```js
const person = {
    name: 'Fred',
    age: '87'
}

Object.values(person) // ['Fred', 87]
```

### 2. Object.entries()

返回一个 [key, value]形式的包含所有属性及值的数组

```js
const person = {
    name: 'Fred',
    age: 87
}
Object.entries(person) // [['name','Fred'],['age',87]]
```

### 3. 异步函数 async

```js
function doSomethingAsync() {
    return new Promise((resolve) => {
        setTimeOut(()=>resolve('I did something'), 3000)
    })
}

async function doSomething() {
    console.log(await doSomethingAsync())
}

console.log('Before')
doSomething()
console.log('after')

// Before after I did Something
```
