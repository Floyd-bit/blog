###  1. new操作符

```js
function myNew(fn, ...args) {
    // 通过原型创建对象
    let obj = Object.create(fn.prototype);
    // 绑定this作用域
    let res = fn.call(obj, ...args);
    // new返回对象或方法直接返回
    if (res && (typeof res === "object" || typeof res === "function")) {
        return res;
    }
    return obj;
}
```

### 2. AJax

```js
const getJSON = function(url) {
    return new Promise((resolve,reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.setRequestHeader("Content-Type","application/json");
        xhr.onreadystatechange = function() {
           if(xhr.readyState !== 4) return;
            if(xhr.status === 200 || xhr.status === 304) {
              resolve(xhr.responseText);
            } else {
              reject(new Error(xhr.responseText));
            }
        };
        xhr.send();
    })
}
```

### 3. 深拷贝

浅拷贝方法：Object.assign、[...obj]

简易版 JSON.prase(JSON.stringify(obj))

```js
function isObject(val) {
    return typeof val === "object" && val !== null;
}

function deepClone(obj, hash = new WeakMap()) {
    // 不是引用类型，而是基本数据类型，直接返回
    if(!isObject(obj))  return obj;
    // 防止循环引用
    if(hash.has(obj)) {
        return hash.get(obj);
    }
    // 判断是数组还是对象
    let target = Array.isArray(obj) ? [] : {};
    Reflect.ownkeys(obj).forEach((item) => {
        // 如果对象的某条属性是对象，则递归调用
        if(isObject(obj[item])) {
            target[item] = deepClone(obj[item],hash);
        } else {
            // 如果是基本数据类型，则直接复制
            target[item] = obj[item];
        }
    });

    return target;
}
```

### 4. once函数（使传入的函数只执行一次）

```js
// 个人感觉用闭包
function a() {
    this.tag = true;
    return function once(func){
        if(this.tag)
            func();
            this.tag = false;
    }
}
```

### 5. promise实现

- 三种状态不受外界影响：pending进行中 fulfilled已成功 rejected已失败
- 一旦状态改变就不会再变：只有pending->fulfilled pending->rejected

```javascript
// 简易版
class Promise {
    constructor(process) {
        this.status = 'pending';
        this.msg = '';
        process(this.resolve.bind(this), this.reject.bind(this));
        return this;
    }
    resolve(val) {
        if(this.status === 'pending'){
            this.status = 'fulfilled';
            this.msg = val;
        }
    }
    reject(err) {
        if(this.status === 'pending') {
            this.status = 'rejected';
            this.msg = val;   
        }
    }
    then(fufilled,reject) {
        if(this.status === 'fulfilled') {
            fufulled(this.msg);
        }
        if(this.status === 'rejected') {
            reject(this.msg);
        }
    }
}
```

- promise具有promiseState属性(pending fulfilled rejected)，状态一旦变化后就不再改变; 具有promiseValue属性，传入then或catch
- promise需要传入一个回调函数，接收两个参数resolve、reject函数
- then函数接收一个callback参数，注册到promise中的thenCallback中，resolve执行时异步执行then注册的回调函数
- 链式调用：then函数执行返回一个promise对象, 

```js
function MyPromise(fn) {
    this.promiseState = 'pending';
    this.promiseValue = undefined;
    this.thenCallback = undefined;
    this.catchCallback = undefined;
    // 保存上下文
    var _this = this;
    var resolve = function(value) {
        _this.promiseState = 'fulfilled';
        _this.promiseValue = value;
        // 当传入参数是promsie时，执行then拿到结果
        if(value instanceof MyPromise) {
            value.then(res => _this.thenCallback(res));
        } else {
            // 异步执行then注册的回调函数
            setTimeout(() => {
                if(_this.thenCallback){
                    _this.thenCallback(value);
                }
            });            
        }
    }
    var reject = function(err) {
        if(_this.promiseState === 'pending') {
            _this.promiseState = 'rejected';
            _this.promiseValue = value;
            setTimeout(function() {
                if(_this.catchCallback) {
                    _this.catchCallback(err);
                }
            })
        }
    }
    fn && fn(resolve, reject);
}
// then方法
MyPromise.prototype.then = function(callback) {
    // 保存上下文
    var _this = this;
    return new MyPromise(function(resolve, reject) {
        _this.thenCallback = function(value) {
        if(_this.promiseState === 'rejected') {
            reject(value);
        } else {
            // 回调函数执行结果通过resolve传给下一个then
            var callbackRes = callback(value);
            resolve(callbackRes);
        }
    }
    });
}
// catch方法
MyPromise.prototype.catch = function(callback) {
    var _this = this;
    return new MyPromise(function(resolve, reject) {
        _this.catchCallback = function(err) {
            var callbackRes = callback(err);
            resolve(callbackRes);
        }
    })
}
// all
MyPromise.all = function(promiseArr) {
    var resArr = [];
    var count = 0;
    var length = promiseArr.length;
    var flag = true;
    return new MyPromise(function(resolve, reject) {
        for(let i=0; i<length; i++) {
            promiseArr[i].then(res => {
                count++;
                resArr.push(res);
                if(count === length){
                    resolve(resArr);
                }
            }).catch(err => {
                flag = false;
                reject(err);
            })
            if(!flag) break;
        }
    })
}
// allSettled
MyPromise.allSettled = function(promiseArr) {
    var resArr = [];
    var count = 0;
    var length = promiseArr.length;
    return new MyPromise((resolve, reject) => {
		for(let i=0; i<length; i++) {
			promiseArr[i].then(res => {
                count++;
                resArr.push({
                    status: 'fulfilled',
                    value: res
                });
                if(count === length) resolve(resArr);
            }).catch(err => {
               count++;
               resArr.push({
                   status: 'rejected',
                   reason: err
               });
               if(count === length) resolve(resArr);
            });
        }
    })
}
// race竞争(死锁)
MyPromise.race = function(promiseArr) {
    var flag = false;
    return new MyPromise(function(resolve, reject) {
        for(let i=0; i<promiseArr.length; i++) {
            promiseArr[i].then(res => {
                if(!flag) {
                    flag = true;
                    resolve(res);
                }
            }).catch(err => {
                if(!flag) {
                    flag = true;
                    reject(err);
                }
            })
        }
    })
}
// any
MyPromise.any = function(promiseArr) {
	var flag = false;
    var count = 0;
    let errs = [];
    let length = promiseArr.length;
    return new MyPromise((resolve, reject) => {
        for(let i=0; i<length; i++) {
			promiseArr[i].then(res => {
                if(!flag) {
                    flag = true;
                    resolve(res);
                }
            }).catch(err => {
                count++;
				errs.push(err);
                if(count === length && !flag) {
                    reject(new AggregateError(errs));
                }
            })
        }
    })
}
```

node.js的promisify方法实现

```js
// fn接收的参数形式为a,...b, function(err, res)
function promisify(fn) {
    return function() {
        const args = Array.prototype.slice.call(arguments);
        return new Promise((resolve, rejcet) => {
            fn.call(this, ...args, function(err, res) {
                if(!err) {
                    reject(err);
                }
                if(res) {
                    resolve(res);
                }
            })
        })
    }
}
```

### 6. 防抖和节流

- 防抖：用户输入停止后间隔一段时间再执行(每次触发事件重新计时)

- 节流：用户输入每隔一端时间执行(每隔一段时间执行一次)
  
  ```js
  // 防抖
  function debounce(fn,delay) {
      let timer = null;
      return function(){
         	if(timer) {
          	clearTimeout(timer);
      	}
          timer = setTimeout(()=>{
              fn.apply(this,arguments);
          },delay);
      }
  }
  
  // 节流
  function throttle(fn, delay) {
      let timer = null;
      return function() {
          if(timer) {
          	return;
      	}
          timer = setTimeout(()=>{
              fn.apply(this,arguments);
          },delay);
      }
  }
  ```

### 7. instanceof

```js
function instanceof(left, right) {
    let prototype = right.prototype
    left = left._proto_
    while(true) {
        if(left === null) {
            return false;
        }
        if(prototype === left) {
            return true;
        }
        left = left._proto_;
    }
}
```

### 8. call 、apply、bind

- 不传入第一个参数，默认为window

- 通过给新的对象添加一个函数然后执行完后删除的方式实现this指向的改变
  
  ```js
  Function.prototype.call = function(context) {
    // 处理缺省情况
    var context = context || window;
    // 给传入新的对象添加一个函数
    context.fn = this;
    var args = [...arguments].slice(1);
    var result = context.fn(...args);
    // 删除传入对象的函数
    delete context.fn;
    return result;
  }
  
  Function.prototype.apply = function(context) {
    // 处理缺省情况
    var context = context || window;
    context.fn = this;
    var result;
    // 对第二个参数的处理
    if(arguments[1]) {
        result = context.fn(...arguments[1]);
    } else {
        result = context.fn();
    }
    delete context.fn;
    return result;
  }
  
  Function.prototype.bind = function(context) {
    if(typeof this !== 'function') {
        throw new TypeError('Error');
    }
    var _this = this;
    var args = [...arguments].slice(1)
    // 返回一个函数
    return function F() {
        const bindArgs = Array.prototype.slice.call(arguments);
        // 如果函数F作为构造函数使用，bind指定的this会失效
        if(this instanceof F) { 
            // return new _this(...args, ...arguments)
            return _this.apply(this, args.concat(...bindArgs))
        }
        return _this.apply(context, args.concat(...bindArgs))
    }
  } 
  ```

### 9. 继承

```javascript
function Father(name) {
    this.name = name;
    this.fn = function(){}
}
Father.prototype.say = function() {
    console.log('Hi‘)
}
```

- 原型继承
  
  可以继承原型链上的方法和属性，但是缺点是只能单继承，且子类的所有实例都继承了父类的一个实例，当此实例改变时会引起子类所有实例的变化
  
  ```javascript
  function Child(name) {
      this.name = name;
  }
  Child.prototype = new Father();
  ```

- 构造继承
  
  可以继承父类的全部属性和方法，但是不能继承到原型链上的方法
  
  ```javascript
  function Child(name) {
      this.name = name;
      Father.call(this);
  }
  ```

- 组合继承
  
  综合了前两种继承的特点，但是会调用两次父类的构造函数，造成性能的开销
  
  ```javascript
  function Child(name) {
      this.name = name;
      Father.call(this);
  }
  Child.prototype = new Father('father');
  ```

- 寄生组合继承
  
  组合继承的优化，只调用了一次父类的构造函数，但是写法较为麻烦
  
  ```javascript
  function Child(name) {
      this.name = name;
      Father.call(this);
  }
  let obj = Object.create(Father.prototype);
  Child.prototype = obj;
  obj.constructor = Child;
  ```

### 10. 发布订阅模式

### 11. 函数柯里化

```js
// f(a,b,c) => f(a)(b)(c)
function curry(a) {
    // 闭包
    return function(b) {
        curry([...a, ...b]);
    }
}
```

sum(1,2,3)求和

函数柯里化应用：fn = curry(sum)

fn(1,2,3) -> fn(1)(2)(3) -> fn(1,2)(3)

```javascript
function curry(fn, ...curArgs) {
    let args = Array.prototype.slice().call(curArgs);
    // fn的参数个数    
    const length = fn.length;  
    return function(...newargs) {
        args = args.concat(newargs);
        if(args.length === length) {
            return fn(...args);
        } else {
            return curry(fn, args);
        }
    }      
}
```

### 12. LRU

**一个Map对象在迭代时会根据对象中元素的插入顺序来进行；新添加的元素会被插入到map的末尾**

实现 `LRUCache` 类：

- `LRUCache(int capacity)` 以 **正整数** 作为容量 `capacity` 初始化 LRU 缓存
- `int get(int key)` 如果关键字 `key` 存在于缓存中，则返回关键字的值，否则返回 `-1` 。
- `void put(int key, int value)` 如果关键字 `key` 已经存在，则变更其数据值 `value` ；如果不存在，则向缓存中插入该组 `key-value` 。如果插入操作导致关键字数量超过 `capacity` ，则应该 **逐出** 最久未使用的关键字。

函数 `get` 和 `put` 必须以 `O(1)` 的平均时间复杂度运行。

```js
var LRUCache = function(capacity) {
    this.lru = new Map();
    this.capacity = capacity;
};

/** 
 * @param {number} key
 * @     {number}
 */
LRUCache.prototype.get = function(key) {
    console.log(this.lru)
    if(!this.lru.has(key)) {
        return -1;
    }
    let value = this.lru.get(key);
    this.lru.delete(key);
    this.lru.set(key, value);
    return this.lru.get(key);
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    if(this.lru.has(key)) {
        this.lru.delete(key);
        this.lru.set(key, value);
    } else {
        if(this.lru.size < this.capacity) {
            this.lru.set(key, value);
        } else {
            // 获取map中第一个元素的key
            let firstKey = this.lru.keys().next().value;
            this.lru.delete(firstKey);
            this.lru.set(key, value);
        }
    }
};
```



### 13. 数组扁平化

- 递归
  
  ```javascript
  function flat(arr) {
      let result = [];
      for(let item of arr) {
          if(Array.isArray(item)){
              result.concat(flat(item));
          } else {
              result.push(item);
          }
      )
      return result;
  }
  ```

- reduce
  
  ```javascript
  function flat(arr) {
      return arr.reduce((pre, cur) => {
          return pre.concat(Array.isArray(cur) ? flat(cur) : cur)
      }, [])
  }
  ```

- 迭代
  
  ```javascript
  function flat(arr) {
      let flag = arr.some(item => Array.isArray(item));
      while(flag) {
          arr = [...arr];
      }
      return arr;
  }
  ```

### 14. compose函数

compose(fn1, fn2, fn3, fn4)   =>   fn1(fn2(fn3(fn4())))

```javascript
function compose(...fns) {
    if(!fns.length) return;
    if(fn.length === 1) {
        return fn[0];
    }
    return fns.reduce((pre, cur) => 
        (...args) => {
            return pre(cur(...args));
        }
    )
}
```

### 15. 数组方法

- reduce实现map

  ```js
  // reduce 实现 map
  Array.prototype.myMap = function(cb) {
      return this.reduce((pre, cur, index) => {
          pre.push(cb.call(this, cur, index));
          return pre;
      }, []);
  }
  ```


### 16. 循环打印红绿黄

**红灯 3s 亮一次，绿灯 1s 亮一次，黄灯 2s 亮一次；如何让三个灯不断交替重复亮灯？**

- 回调函数写法

  ```js
  function print(light, time, callback) {
  	setTimeout(() => {
         console.log(light);
         callback();
      }, time);
  }
  function excute() {
      print('red', 3000, () => {
          print('green', 1000, () => {
              // 递归调用，循环打印
              print('yellow', 2000, excute);
          })
      })
  }
  ```

- Promise写法

  ```js
  function print(light, time) {
      return new Promise((resolve) => {
        	setTimeout(() => {
             console.log(light);
             resolve();
      	}, time);  
      })
  }
  function excute() {
      print('red', 3000).then(() => {
          print('green', 1000).then(() => {
              print('yellow', 2000).then(() => {
                  excute();
              })
          })
      })
  }
  ```

- async/await写法

```js
async function excute() {
    await print('red', 3000);
    await print('green', 1000);
    await print('yellow', 2000);
    excute();
}
```

