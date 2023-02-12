### 1. 队列和栈的互相实现

- 用两个栈实现队列
  
  思路：入队时进入栈a, 出队时若栈b为空则将栈a中的所有项出栈然后依次放入栈b，栈b执行出栈操作；若栈b不为空则直接执行出栈操作
  
  ```js
  let stack1 = [];
  let stack2 = [];
  function push(data) {
      stack1.push(data);
  }
  function pop() {
      if(!stack2.length) {
          while(stack.length) {
              stack2.push(stack1.pop());
          }
      }
      return stack2.pop();
  }
  ```

- 用两个队列实现栈
  
  思路：入栈压入空队列，然后将非空队列项依次移到空队列，出栈时从非空队列执行出队操作
  
  ```js
  let queue1 = [];
  let queue2 = [];
  function push(data) {
      if(!queue1.length) {
          queue1.push(data);
          while(queue2.length) {
              queue1.push(queue2.shift());
          }
      }
      if(!queue2.length) {
          queue2.push(data);
          while(queue1.length) {
              queue2.push(queue1.shift());
          }   
      }
      }
  }
  function pop() {
      if(queue1.length) {
          return queue1.shift();
      } else {
          return queue2.shift();
      }
  }
  ```

### 2. 包含min函数的栈

思路：新建一个栈保存当前最小值

```js
let stack = [];
let minStack = [];
function push(data) {
    if(!stack.length) {
        stack.push(data);
        minStack.push(data);
    } else {
        let min = minStack[minStack.length-1];
         if(data < min) {
            minStack.push(data);
        } else {
            minStack.push(min);
        }
        stack.push(data);
    }
}
function pop() {
    minStack.pop();
    return stack.pop();
}
function min() {
    return minStack[minStack.length-1];
}
```

### 3. 栈的压入弹出序列

题目描述：输入两个整数序列，第一个序列表示栈的压入顺序，判断第二个序列是否可能为该栈的弹出顺序。

思路：模拟栈的操作

```js
function isLegal(arr1, arr2) {
    let index = arr1.indexOf(arr2[0]);
    let stack = arr1.slice(0,index);
    let stack2 = arr1.slice();
    for(let i=1; i<arr2.length; i++) {
        if(arr1.indexOf(arr2[i]) === -1) return false; 
        stack2.splice(index-1, 1);
        if(arr1.indexOf(arr2[i]) > index) {
            let k = index+1;
             while(stack2[k] !== arr2[i]){
                 stack.push(stack2[k]);
             }
        } else {
            if(arr2[i] !== stack.pop()) 
                return false;
        }
        index = arr1.indexOf(arr2[i]);
    }
    if(!stack.length) return true;
}
```

### 4. 滑动窗口的最大值

![image-20220123135009558](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041453520.png)

使用一个双端队列（队列两面都可进出），用于存储处于窗口中的值的下标，保证窗口头部元素永远是窗口最大值

- 1.当前进入的元素下标 - 窗口头部元素的下标 >= k 头部元素移出队列
- 2.如果当前数字大于队列尾，则删除队列尾，直到当前数字小于等于队列尾，或者队列空 （保证窗口中左侧的值均大于当前入队列的值，这样做可以保证当下次循环窗口头部的元素出队后，窗口头部元素仍然为最大值）
- 3.队列元素入队
- 4.第k次遍历后开始向结果中添加最大值

### 5. 接雨水

### 6. 有效括号
