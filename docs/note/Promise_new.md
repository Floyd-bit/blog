### 1. 关于Promise的误区

- 状态一旦改变，就不会再变，后续每次调用.then或.catch都会直接拿到该值
  
  ```js
  const promise = new Promise((resolve, reject) => {
      resolve('1');
      reject('error');
      resolve('2');
  })
  promise.then(res => {
      console.log(res)
  }).catch(err => {
      console.log(res)
  })
  // 输出 1, promise状态一旦改变就不会再变
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('once')
      resolve('success')
    }, 1000)
  }
  promise.then(res => console.log(res))
  promise.then(res => console.log(res))
  // 输出 once success success
  ```

- .then或.catch链式调用都会返回一个新的promise(返回其他类型也会被promise包裹)，若返回自身则造成死循环
  
  ```js
  Promise.resolve(1)
      .then(res => {
          console.log(res)
          return 2;  // 返回Promise.resolve(2)
      })
      .catch(err => {
          return 3;
      })
      .then(res => {
          console.log(res)
      })
  // 输出 1, 2
  ```

- 在.then中return一个error并不会抛出错误，只能通过throw Error或调用reject才会被catch捕获
  
  ```js
  Promise.resolve()
      .then(() => {
          return new Error('error') // 被包裹成promise.resolve(new Error('error'))
      })
      .then(res => {
          console.log('then', res)
      }
      .catch(err => {
           console.log('err', err)     
       })
  // 结果then Error
  ```

- .then或.catch的参数期望是函数，传入**非函数**将会发生值穿透
  
  ```js
  Promise.resolve(2)
      .then(2)  // 穿透
      .then(Promise.resolve(3)) // 穿透
      .then(console.log)
  // 输出2
  ```

- then函数的第二个参数是错误处理函数，如果被它捕获就不会被catch函数捕获。
  
  ```js
  Promise.reject('err!')
  .then(res => {
      console.log('success', res);
  }, err => {
      console.log('error', err);
  }).catch(err => {
      console.log('catch', err);
  })
  // 输出 error err!
  ```

- finally方法**不管Promise状态如何都会执行**，最终**返回上一个Promise对象值**，如果**抛出错误则返回异常的Promise对象**
  
  ```js
  Promise.resolve('1')
      .then(res => {
      console.log(res);
      })
      .finally(() => {
          console.log('finally');
      })
  Promise.resolve('2')
      .finally(() => {
          console.log('finally2');
              // 默认返回上一个Promise, 而不是构造一个新的Promise
              return '我是finally2返回的值'
      })
      .then(res => {
          console.log('finally2后面的then函数', res);
      })
  // 输出结果 1 finally2 finally finally2后面的then函数 2
  ```

- resolve可以接收两个参数，resolve(a, console.log(a))
  
  ```js
  function runAsync(x) {
      const p = new Promise(r => {
          setTimeout(() => {
              r(x, console.log(x))
          }, 1000);
      });
      return p;
  }
  function runReject(x) {
      const p = new Promise((res, rej) => {
          setTimeout(() => {
              rej('error', console.log(x))
          }, 1000*x)
      })
  }
  Promise.all([runAsync(1), runReject(4), runAsync(3), runReject(2)])
      .then(res => console.log(res))
      .catch(err => console.log(err))
  // 结果 1s后输出1,3   2s后输出2,error    4s后输出4
  ```

### 2. 中断链式调用

- throw Error, 抛出异常
- 调用reject函数

### 3. 串行请求

### 4. Promise常用api

- Promise.all()
  
  `Promise.all([promise1, promise2]).then(res => console.log('res为数组'))`
  
  接收一个promise数组，当所有的promise对象都进入fulfilled状态后才执行then方法，若其中有一个Promise对象进入rejected状态则直接进入rejected状态，then函数的参数是promise返回的结果数组

- Promise.race()
  
  `Promise.race([promise1, promise2]).then(res => console.log('res为执行最快的promise的结果值'))`
  
  接收一个promise数组，当其中有一个promise对象执行完成时进入fulfilled状态（**多个请求竞争**）
