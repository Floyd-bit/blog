---
title: vue2学习
date: 2021-08-02 20:55:03
tags: vue
description: vue2版本官网学习
---

### 1.  Vue 框架

> Vue是一套用于构建用户界面的**渐进式框架**

核心： 声明式渲染（**采用模板语法来声明式地将数据渲染进DOM**）

- **内部指令：v-if(控制DOM) v-else v-show(控制css) v-for(优先级高于v-if) v-text(解决双括号模板暴露问题) v-html(渲染html代码 有安全问题xss) v-on v-model(双向绑定) v-bind(改变html中的标签属性) 其他内部指令(v-pre跳过编译  v-cloak渲染完整个DOM后显示 v-once第一次渲染完成后不再改变)**
- **全局API：自定义指令(Vue.directive)  构造器的延伸(Vue.extend) 全局操作外部数据(Vue.set  解决vue检测不到数组变化) 生命周期(钩子函数) 组件(全局组件，局部组件，组件传值，Component标签(动态选择组件))**
- **选项(options): computed(利用缓存) methods watch mixins(混入，引入外部方法) extends option(引入外部选项)**
- **实例(Vue实例)**
- **内置组件：插槽(slot)**

### 2.生命周期钩子

```vue
created: function() {}
mounted: function() {}
updated: function() {}
destoryed: function() {}
```

![Vue 实例生命周期](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041455213.png)

### 3. 模板语法

```vue
<!-- 渲染HTML -->
<span v-html="rawHtml"></span>
<!-- 绑定html元素 -->
<div v-bind:id="dynamicId"> </div>
<div v-bind:disabled="isButtonDisabled"></div>
<div v-bind:id=“‘list-’+id”></div>
<a v-bind:href="url"></a>
<!-- 监听DOM事件 -->
<a v-on:click="doSomething"></a>
<a @click="doSomething"></a>
```

### 4.计算属性

> 对于任何复杂逻辑，你都应该使用计算属性

```vue
<p>
    Orginal message: "{{ message }}"
    Reversed message: "{{ reversedMessage }}"
</p>


data: {
    message: ''
}
computed: {
    reversedMessage: function() {
        return this.message.split('').reverse().join('') 
    }
}
```

**计算属性是基于它们的响应式依赖进行缓存的，只在相关响应式依赖发生改变时它们才会重新求值**

### 5.侦听器

watch

### 6.条件渲染

- v-if (当v-if和v-for一起使用时，v-for具有比v-if更高的优先级)
- v-show (*带有v-show的元素始终会被渲染并保留在DOM中，v-show只是简单地切换元素的display*)

```vue
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username" key="username-input">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address" key="email-input">
</template>
```

### 7.列表渲染

```vue
<ul id="example-1">
  <li v-for="item in items" :key="item.message">
      <!-- v-for 还支持一个可选的第二个参数，即当前项的索引。-->
      <!-- v-for="(item, index) in items" -->
    {{ item.message }}
  </li>
</ul>

var example1 = new Vue({
  el: '#example-1',
  data: {
    items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ]
  }
})
```

### 8.事件处理

使用v-on指令监听DOM事件

v-on事件修饰符

```vue
<!-- 阻止单击事件继续传播 -->
<a v-on:click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>

<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
<div v-on:click.capture="doThis">...</div>

<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat">...</div>

<!-- 按键修饰符 -->

<!-- 只有在 `key` 是 `Enter` 时调用 `vm.submit()` -->
<input v-on:keyup.enter="submit">

<input v-on:keyup.page-down="onPageDown">
```

### 9.表单

使用 `v-model` 指令在表单 `<input>`、`<textarea>` 及 `<select>` 元素上创建双向数据绑定

```vue
<input v-model="message" placeholder="edit me">
<p>Message is: {{ message }}</p>

<!-- 在“change”时而非“input”时更新 -->
<input v-model.lazy="msg">

<!-- 用户输入转为数值类型 -->
<input v-model.number="age" type="number">

<!-- 自动过滤用户输入的首尾空白字符 -->
<input v-model.trim="msg">
```

### 10.组件

- 全局注册
  
  ```vue
  Vue.component('my-component',{
      //options
  })
  ```

- 局部注册
  
  ```javascript
  // 使用Babel和webpack使用es6模块
  import ComponentA from './ComponentA.vue'
  
  export default {
    components: {
      ComponentA
    },
    // ...
  }
  ```

- 通过Props向子组件传递数据
  
  **传递静态Prop**
  
  ```vue
  <blog-post title="My journey with Vue"></blog-post>
  ```
  
  **通过v-bind传递动态Prop**
  
  ```vue
  <!-- 动态赋予一个变量的值 -->
  <blog-post v-bind:title="post.title"></blog-post>
  
  <!-- 动态赋予一个复杂表达式的值 -->
  <blog-post
    v-bind:title="post.title + ' by ' + post.author.name"
  ></blog-post>
  ```
  
  传递一个对象的所有property作为prop传入
  
  ```vue
  <blog-post v-bind="post"></blog-post>
  post: {
    id: 1,
    title: 'My Journey with Vue'
  }
  ```

- 插槽
  
  合成组件
  
  ```vue
  <navigation-link url="/profile">
    Your Profile {{ user }}
  </navigation-link>
  
  <!-- navigation-link模板 -->
  <a
    v-bind:href="url"
    class="nav-link"
  >
    <!-- 默认显示abc -->
    <slot>abc</slot>
  </a>
  
  <!-- 当组件渲染的时候，<slot></slot> 将会被替换为“Your Profile”。插槽内可以包含任何模板代码，包括 HTML -->
  ```
  
  具名插槽
  
  v-slot只能添加在\<template\>上
  
  ```vue
  <div class="container">
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
  
  <!--  向具名插槽提供内容 -->
  <base-layout>
    <template v-slot:header>
      <h1>Here might be a page title</h1>
    </template>
  
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  
    <template v-slot:footer>
      <p>Here's some contact info</p>
    </template>
  </base-layout>
  ```
  
  作用域插槽(将current-user中的user传给父组件)
  
  **父组件可以获取子组件中的data**
  
  ```vue
  <span>
    <slot v-bind:user="user">
      {{ user.lastName }}
    </slot>
  </span>
  
  <current-user>
    <template v-slot:default="slotProps">
      {{ slotProps.user.firstName }}
    </template>
  </current-user>
  ```

### 11. 自定义指令

```javascript
<div v-xx="color" id="demo">
</div>

// 定义一个控制颜色的指令
// el为指令绑定的元素，可以用来操作DOM
// bingding为包含指令信息的对象
// vnode为编译生成的虚拟节点
Vue.directive('xx',function(el,binding,vnode){
    el.style = 'color:'+binding.value;
});
var app = new Vue({
    el:'#app',
    data:{
        color:'green'
    }
})
```

### 12. Vue.set全局操作外部数据

```javascript
var outData={
    count:1
};

var app = new Vue({
    el:'#app',
    data:outData
})
```

由于Javascript的限制，Vue不能自动检测以下变动的数组。

- **当你利用索引直接设置一个项时，vue不会为我们自动更新。**
- **当你修改数组的长度时，vue不会为我们自动更新。**
- 需要使用Vue.set(outData,'count',4)

### 13.Mixins

1. 在你已经写好了构造器后，需要增加方法或者临时的活动时使用的方法，这时用混入会减少源代码的污染。
2. 很多地方都会用到的公用方法，用混入的方法可以减少代码量，实现代码重用。
3. **执行顺序：混入的先执行，构造器里的后执行**
4. **当混入方法和构造器的方法重名时，混入的方法无法生效**

```javascript
var addLog = {
    update:function{
        consolo.log('mixin执行');
    }
}

var app = new Vue({
    el:'#app',
    data:{},
    methods:{},
    mixins:[addLog] //混入
})
```

```javascript
// 全局混入
Vue.mixin({
    updated:function() {
        console.log('mixin执行');
    }
})
```

### 14. Extends Option 扩展选项

**类似于Mixin**,区别在于Mixin添加方法，扩展选项不限于方法

```javascript
        var bbb={
            created:function(){
                console.log("我是被扩展出来的");
            },
            methods:{
                add:function(){
                    console.log('我是被扩展出来的方法！');
                }
            }
        };
        var app=new Vue({
            el:'#app',
            data:{
                message:'hello Vue!'
            },
            methods:{
                add:function(){
                    console.log('我是原生方法');
                }
            },
            extends:bbb
        })
```

```js
// 改变插值符号
// vue默认的插值形式是 {{}}
// 改为${}
delimiters:['${','}']
```

### 15.实例

- 实例属性
  
  实例即vue的实例——app
  
  ```js
  var app = new Vue({})
  ```

- 实例方法
  
  1. $mount挂载方法
     
     ```js
     // 将扩展挂载到DOM上
     var extension = Vue.extend({
         template: `<p>{{message}}</P>`,
         data() {
             return {
                 message: 'xxxx'
             }
         }
     })
     var vm = new extension().$mount('#app')
     ```
  
  2. $destory卸载方法
     
     卸载整个挂载
     
     vm.$destory();
  
  3. $forceUpdate更新方法
     
     vm.$forceUpdate();
  
  4. $nextTick数据修改方法
     
     **当Vue构造器里的data值被修改完成后会调用$nextTick方法，类似于钩子函数中的updated**

- 实例事件
