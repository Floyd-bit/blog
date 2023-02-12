---
title: js学习二
date: 2021-08-02 11:10:26
tags: javascript
description: javascript学习
---

### 1.闭包

**函数能够“记忆”其定义时所处的环境**，**即使函数不在其定义的环境中被调用，也能访问定义时所处环境的变量**

**每次创建函数都会创建闭包**，它允许我们将数据与操作将数据的函数关联起来

对于在函数内用var关键字声明的局部变量来说，当退出函数时，这些局部变量即失去了它们的价值，它们都会随着函数调用的结束而被销毁，**使用闭包可以延续局部变量的生存周期**

![image-20210802111942222](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041454400.png)

功能： 记忆性（函数所处环境的状态会始终保持在内存中，不会在外层函数调用后被自动清除）    

​            **模拟私有变量**

![image-20210802112519091](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041454401.png)

### 2.DOM

> DOM是JS操纵HTML和CSS的桥梁

DOM节点树：包括Element类型节点 Text类型节点

绿色：元素节点  红色：属性节点   蓝色：文本节点

![image-20210802113632951](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041454402.png)

- document对象（nodeType:9）  
  
  > document对象是DOM节点树的根

- 访问元素节点
  
  可以通过选择器选择，也可通过firstChild、lastChild来选择子元素
  
  ![image-20210802114447056](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041454403.png)

- 节点操作
  
  1. 改变元素节点内容  innerHTML  innerText
  
  2. 改变元素节点的CSS样式  style
     
     ![](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041454405.png)
  
  3. 通过href src 直接改变图片、链接
  
  4. 子节点：通过childNodes获取子节点的类数组对象，可以通过[i]访问
  
  5. 节点的创建、移除和克隆
     
     ```javascript
     var oBOx = document.getElementById('box');
     var oPs = oBOx.getElementsByTagName('p');
     var op = document.createElement('div');  // 孤儿节点，没有挂载到DOM树上
     var text = document.createTextNode('x'); // 文本节点
     oBOx.appendChild(op); // 挂载到尾部
     oBox.insertBefore(op,oPs[0]); //插入到p标签之前
     
     // 新父节点.appendChild(已经有父亲的节点)   这个节点会被移动
     
     // 父节点.removeChild(子节点)  删除子节点
     
     // var 孤儿节点 = 老节点.cloneNode(true)   true/false表示是否深度克隆  true表示会克隆该节点和所有子节点 false只克隆该节点
     ```
  
  6. 事件监听
     
     鼠标事件
     
     ![image-20210802122629831](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041454406.png)
     
     - onmouseover: 支持冒泡
     
     - onmouseseener: 不支持冒泡
     
     键盘事件
     
     ![image-20210802122729680](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041454407.png)
     
     表单事件
     
     ![image-20210802122853545](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041454408.png)
     
     页面事件监听
     
     ![image-20210802123002746](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041454409.png)
  - 事件传播
    
    ![image-20210802124422012](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041454410.png)
    
    **DOM0级事件**监听：这种模型不会发生事件传播，只有执行阶段
    
    ```javascript
    oBox.onclick = function() {
        // 只能监听冒泡阶段
    };
    ```
    
    **IE事件模型**：包含两个事件流——执行阶段和冒泡阶段，首先会监听并触发目标事件，然后会依次冒泡到最外层document，所经过的节点依次判断是否绑定了事件，若有则触发
    
    **DOM2级事件**监听：该事件模型包含三个事件流——捕获阶段、执行阶段和冒泡阶段，捕获阶段从document依次向下传播，若经过节点绑定事件则触发，然后进入目标元素的执行阶段，最后冒泡
    
    ```javascript
    oBOx.addEventListener('click', function() {
        // 捕获阶段
    },true)
    oBOx.addEventListener('click', function() {
        // 冒泡阶段
    },false)
    ```
  
  - 事件对象 event / e 
    
    1. 鼠标位置
       
       ![image-20210802145007115](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041454411.png)
    
    2. e.charCode 通常用于onkeypress事件中，表示用户输入的字符的字符码
       
       e.keyCode 通常用户onkeydown事件和onkeyup中，表示用户按下的按键的“键码”
       
       ![image-20210802145322915](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041454412.png)
    
    3. e.preventDefault() 方法用来阻止事件产生的“默认动作”
    
    4. e.stopPropagation() 方法用来阻止事件继续传播
  
  - 事件委托
    
    利用事件冒泡机制，将后代元素事件委托给祖先元素
    
    **e.target属性** **(target为触发事件的元素，currentTarget为事件绑定的元素)**
    
    ![image-20210802151623273](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041454413.png)
    
    使用场景：
    
    当有大量类似元素需要批量添加事件监听时，使用事件委托可以减少内存开销
    
    当有动态元素节点上树时，使用事件委托可以让新上树的元素具有事件监听
  
  - 定时器
    
    ```javascript
    setInterval(function() {
        // 每隔2s执行
    },2000);
    
    var timer = setInterval(function(a,b) {
        // 传递参数
    },2000,2,5);
    
    // 清除定时器
    clearInterval(timer);
    ```
    
    **函数节流**
    
    ```javascript
    var lock = true;
    
    function fun() {
        // 锁关闭，则不执行
        if(!lock) return;
           // 语句
        lock = false;
        // 规定时间之后打开锁
        setTimeout(function() {
            lock = true;
        },2000);
    }
    ```

- 延时器
  
  ```javascript
  var timer = setTimeout(function() {
      // 2s之后执行
  },2000);
  
  clearTimeout(timer);
  ```

- 异步语句
  
  **异步（asynchronous）: 不会阻塞CPU继续执行其他语句，当异步完成时，会执行回调语句 (callback)**
  
  ![image-20210802153504244](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041454414.png)

### 3.BOM

> JS与浏览器窗口交互的接口

- window对象
  
  1. 全局变量会成为window对象的属性
  
  2. 内置函数(setInterval、alert ......)是window对象的方法
  
  3. 窗口尺寸：
     
     ![image-20210803143816562](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041454415.png)
  
  4. window.onresize事件监听窗口大小变化
     
     window.onscroll卷动事件
     
     window.scrollY表示窗口卷动高度
     
     **返回顶部： document.documentElement.scrollTop = 0;**
  - Navigator对象
    
    浏览器的相关属性和标识
    
    ![image-20210803144507170](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041454416.png)
  
  - History对象
    
    回退： history.back()  history.go(-1)
  
  - Location对象
    
    标识当前所在网址
    
    页面跳转： window.location.href = "xxx"
    
    重新加载： window.location.reload();    window.location.reload(true); 强制重新加载
    
    GET请求查询参数：window.location.search    http://www.imooc.cm/?**a=1&b=2**