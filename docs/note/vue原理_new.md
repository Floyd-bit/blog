---
title: vue原理
date: 2021-08-29 18:03:33
tags: vue
description: vue原理
---

### 初始化流程

- 创建Vue实例，传入options。初始化options中的data、computed、watch，完成数据的响应式处理，在执行这一步的前后分别执行beforeCreate和created的钩子函数。
- 页面的渲染。首先进行模板编译，如果options中有render函数则直接执行，否则将template模板转成AST, 再生成render函数。render函数调用后会生成虚拟DOM，虚拟DOM转化为真实DOM后挂载到options中的el上。
- 视图和响应式数据的关联，在渲染页面的时候收集依赖。
- 当响应式数据变化时，触发更新，由diff算法比较更新前后虚拟DOM最小代价更新DOM
- 销毁实例。

### 1. MVVM

> 数据劫持 + 发布订阅模式

**数据劫持（observe）**

通过defineProperty()给属性添加get和set，每次赋予一个新对象会给新对象增加defineProperty（数据劫持）

```javascript
// 创建一个Observe构造函数
// 写数据劫持的主要逻辑
function Observe(data) {
    // 所谓数据劫持就是给对象增加get,set
    // 先遍历一遍对象再说
    for (let key in data) {     // 把data属性通过defineProperty的方式定义属性
        let val = data[key];
        observe(val);   // 递归继续向下找，实现深度的数据劫持
        Object.defineProperty(data, key, {
            configurable: true, // 可以配置对象，删除属性
            get() {  // 获取对象属性时会调用get方法
              // 依赖收集，将视图watcher放入依赖数组
              if (Dep.target) {
                dp.addSub(Dep.target)
              }
              return val;
            },
            set(newVal) {   // 更改值的时候
                if (val === newVal) {   // 设置的值和以前值一样就不理它
                    return;
                }
                val = newVal;   // 如果以后再获取值(get)的时候，将刚才设置的值再返回去，闭包
                observe(newVal);    // 当设置为新值后，也需要把新值再去定义成属性
                // 数据变化时通知，执行watcher的update方法
                dp.notify();
            }
        });
    }
}

// 外面再写一个函数
// 不用每次调用都写个new
// 也方便递归调用
function observe(data) {
    // 如果不是对象的话就直接return掉
    // 防止递归溢出
    if (!data || typeof data !== 'object') return;
    return new Observe(data);
}
```

**数据代理**

通过数据代理，我们可以通过mvvm.a来获取数据，而不用mvvm._data.a

```javascript
/*
function Mvvm(options = {}) {  
    // 数据劫持
    observe(data);
    // this 代理了this._data
   for (let key in data) {
        Object.defineProperty(this, key, {
            configurable: true,
            get() {
                return this._data[key];     // 如this.a = {b: 1}
            },
            set(newVal) {
                this._data[key] = newVal;
            }
        });
   }
}

// 此时就可以简化写法了
console.log(mvvm.a.b);   // 1
mvvm.a.b = 'ok';    
console.log(mvvm.a.b);  // 'ok'
*/
```

**数据编译**

取出模板中的内容

```javascript
function Mvvm(options = {}) {
    observe(data);

    new Compile(options.el, this);

    funciton Compile(el, vm) {
        // 将el中的{{}}正则匹配
    }
}
```

**发布订阅**

使用一个数组来存放函数，订阅就是放入函数，发布就是让数组中的函数执行

在响应式中，data的一个属性可能对应多个视图watcher（dep中存放）, 一个视图的watcher也对应多个属性，它们是多对多的关系

```javascript
// 通过 Dep 解耦
class Dep {
  constructor() {
    this.subs = []
  }
  addSub(sub) {
    // sub 是 Watcher 实例
    this.subs.push(sub)
  }
  notify() {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}
// 全局属性，通过该属性配置当前 Watcher
Dep.target = null

// update方法更新页面
function update(value) {
  document.querySelector('div').innerText = value
}

class Watcher {
  constructor(obj, key, cb) {
    // 将 Dep.target 指向自己
    // 然后触发属性的 getter 添加监听
    // 最后将 Dep.target 置空
    Dep.target = this
    this.cb = cb
    this.obj = obj
    this.key = key
    this.value = obj[key]
    Dep.target = null
  }
  update() {
    // 获得新值
    this.value = this.obj[this.key]
    // 调用 update 方法更新 Dom
    this.cb(this.value)
  }
}

// 当vue解析到 `{{name}}`模板语法 触发的操作
new Watcher(data, 'name', update)
```

**数据更新视图**

```javascript
// watch监听数据变化，在获取数据时会调用get方法

// 数据劫持中的get方法
function Observe(data) {
    let dep = new Dep();

    Object.defineProperty(data,key,{
        // 调用get方法获取数据时订阅watcher,即将watcher放到数组中
        get() {
            Dep.target && dep.addSub(Dep.target); // 将watch添加到订阅事件中
             return val;
        },
        // set方法执行时执行notify方法，执行函数池中的函数
        set(newVal) {
            if( val === newVal) {
                return 
            }
            val = newVal;
            observe(newVal); // 深度数据劫持
            dep.notify(); // 让所有watcher的update方法执行
        }
    })
}

Watcher.prototype.update = function() {
    let arr = this.exp.split('.');
    let val = this.vm;
    arr.foreach(key => {
        val = val[key]; // 通过get获取到新的值
    });
    this.fn(val); //将每次拿到的新值替换{{}}中的内容
}
```

**双向数据绑定**

```javascript
// 监听变化
new Watcher(vm, exp, function(newVal) {
    node.value = newVal; // 当watcher触发时自动将内容放进输入框中
})

node.addEventListener('input', e => {
    let newVal = e.target.value;
    // 值的改变会调用set,set中调用notify,notify中调用watcher的update方法更新
    vm[exp] = newVal;
})
```

### 2. 异步更新

**异步更新是指当响应式数据在一次同步代码中进行多次更新，那么应该合并多次更新，只渲染一次**

实现：使用一个队列维护需要更新的watcher，每次update时将watcher加入到队列中。并且为了合并更新，我们**只在第一次触发update时开启一个定时器**(使用boolean值进行控制)，在同步代码执行完后统一渲染。

```js
// watcher队列
const queue = [];
// 去重
const has = [];
// 控制合并更新
let pending = false;
// 更新函数
function queueWatchcer(watcher) {
    const id = watcher.id;
    if(!has[id]) {
     	queue.push(watcher);
        has[id] = true;
        if(!pending) {
            // 合并更新
            setTimeout(flushSchedulerQueue, 0);
            // 防止其他更新触发定时器
            pending = true;
        }
    }
}
function flushSchedulerQueue() {
    // 清空watcher队列
    const flushQueue = [...queue];
    queue = [];
    has = [];
    pending = false;
    // 触发更新
    flushQueue.forEach((watcher) => watcher.update());
}
```

### 3. nextTick

**nextTick中的回调是在下次DOM更新循环结束之后执行**，在修改数据后立即执行该方法获取更新后的DOM。

原理：利用微任务优先的方式调用异步方法执行nextTick包装的方法。Vue的响应式更新是异步的，如果每次响应式数据改变都更新依赖的视图那么会影响性能，所以vue维护了一个异步更新的队列，当data改变时将watcher放入更新队列中，如果是对同一个watcher的更改则合并。nextTick利用了event loop采用**promise->mutationObserver->setImmediate->setTimeout**依次降级的方式在异步队列更新完成后执行。

实现：类似于vue异步更新的实现，如果数据更新在nextTick执行之前则可以获取到最新DOM，否则获取到的还是旧的DOM

### 4. keep-alive

keep-alive用来实现vue的组件缓存，是vue性能优化的一种手段。用keep-alive标签包裹的组件不会执行正常的生命周期，也就是不会被销毁(destory)，而是被缓存起来。常用于频繁切换的标签页等。

- keep-alive标签的属性：include/exclude用来匹配需要被缓存的组件

- keep-alive的生命周期：activated/deactived，组件命中缓存时进入activated生命周期，否则进入deactived生命周期

- keep-alive的内存管理策略：LRU算法(最近最久未使用), 可以使用map实现
  
  ![lrusuanfa.png](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041455671.webp)

### 5. Vue.set

vue2的响应式在以下两种情况下不会触发视图更新：

- 新增对象属性，删除对象属性

- 通过数组下标修改数组

利用Vue.set来处理以上两种情况的更新，原理：如果set的是数组，则调用数组的splice方法触发视图更新；如果set的是对象，则对新增的属性进行defineReactive响应式处理, 通知视图更新

### 6. vm.$watch

```js
vm.$watch(expOrFn, callback, [options])
// watch方法接收参数：响应式data或computed， 一个参数为监听对象前后值的回调函数， 最后一个参数为配置项immidate和deep
var unwatch = vm.$watch('a', (newVal, oldVal) => {}) 
// watch返回一个取消观察函数用来停止触发回调
unwatch()
```
