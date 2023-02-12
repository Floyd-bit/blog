---
title: 函数式编程
date: 2021-08-11 12:40:28
tags: javascript
description: 函数式编程指北
---

### 1.纯函数

> 纯函数是这样一种函数，即相同的输入，永远会得到相同的输出，而且没有任何可观察的**副作用**(http请求等)

**如slice()是纯函数，而splice()不是纯函数，因为splice()永久地改变了数组**

### 2. 函数柯里化(加工站)

> 只传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数

```javascript
var add = function(x) {
  return function(y) {
    return x + y;
  };
};

var increment = add(1);
var addTen = add(10);

increment(2);
// 3

addTen(2);
// 12
```

> 将一个多元函数，转换成一个依次调用的**单元函数**    f(a,b,c) → f(a)(b)(c)

高级柯里化——部分函数应用

```javascript
// 柯里化
f(a,b,c) → f(a)(b)(c)
// 部分函数调用
f(a,b,c) → f(a)(b,c) / f(a,b)(c)
```

### 3. 函数组合(流水线)

```javascript
const compose = (f, g) => x => f(g(x))

const f = x => x + 1;
const g = x => x * 2;
const fg = compose(f, g);
fg(1) //3
```

```javascript
// 命令式写法
log(toUpperCase(head(reverse(arr))))

// 面向对象式写法
arr.reverse()
  .head()
  .toUpperCase()
  .log()

// 函数组合
const upperLastItem = compose(log, toUpperCase, head, reverse);
```
