### 1.  MVVM、MVC、MVP的区别

- MVC架构模式通过分类Model、View、Controller来组织代码结构，View负责页面显示逻辑，Model负责存储页面的业务数据，**当Model改变时会通知View更新页面**，Controller是View和Model的纽带，当用户与页面交互时就触发Controller层修改Model层。
  
  ![image.png](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041453326.webp)

- MVVM架构模式分为Model、View、ViewModel. 其中**Model和View没有直接联系**，通过ViewModel进行联系，ViewModel负责监听Model中数据的改变并且控制视图的更新，处理用户交互操作并修改Model，实现了**Model和View的数据自动同步**。
  
  ![image.png](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041453327.webp)

- MVP架构模式包括Model、View、Presenter，解耦了Model和View，通过Presenter将Model的变化和View的变化绑定在一起，实现View和Model的同步更新。

### 2. 常见的事件修饰符

- .stop, 相当于stopPropagation, 阻止冒泡
- .prevent, 相当于preventDefault, 阻止默认事件
- .capture, 事件捕获
- .self, 只触发自己的事件
- .once, 只会触发一次

### 3. v-if 和 v-show的区别

- v-if 通过向DOM树内添加过删除DOM元素，v-show通过设置DOM元素的display样式属性控制
- v-if由更高的切换消耗，v-show有更高的初始渲染消耗
- v-if适用于根据初始条件渲染的场景，v-show适用于频繁切换(Tab页)

### 4. v-model的实现

```vue
<template>
    <input :value="message" @input="change">
</template>
<script>
    export default {
        data() {
          return {
              message: ''
          }  
        },
        methods: {
            change(event) {
                this.message = event.target.value;
            }
        }
    }
</script>
```

### 5. data问什么是一个函数而不是对象

如果复用一个组件，多个实例的data指向同一个对象，只要一个实例对data进行操作，则其他实例中的data数据也会发生变化。data用函数的形式声明每次复用组件时会返回一个新的data，每个组件各自维护自己的数据，不会干扰其他组件的正常运行

### 6. keep-alive

常用keep-alive包裹组件来保存组件的状态(**缓存**)，防止组件多次渲染

keep-alive的属性：

- include：字符串或正则表达式，只有名称匹配的组件会被缓存
- exclude: 字符串或正则表达式，名称匹配的组件不会被缓存
- max: 最大缓存组件实例数目

keep-alive的生命周期：

- activated: **切换到组件命中缓存**渲染后会执行activated钩子函数
- deactivated：**组件被换掉缓存到内存**后执行deactivated钩子函数

### 7. $nextTick原理及作用

数据改变时视图的更新是异步的，将视图的更新任务放入**异步回调任务队列**。如果我们需要操作DOM，DOM的更新是异步的，我们可以利用nextTick将对DOM的操作放入微任务队列，在DOM更新完成后执行。(在**created生命周期**中进行DOM操作也要放在nextTick回调函数中，因为此时DOM还没有渲染)

### 8. 单页应用(SPA)和多页应用(MPA)的区别

- SPA指只有一个主页面的应用，在一开始就**一次性加载js、css等资源**。通过前端路由来进行页面跳转，实现**局部刷新**，用户体验比较好，不利于SEO(可以借助SSR优化)
- MPA指有多个独立页面的应用，每个页面都必须重复加载js、css资源，需要**整页资源刷新**，适用于对SEO要求较高的应用

### 9. 模板编译

> Vue模板编译过程：template -> AST -> render函数

- 调用prase方法将**template转化为AST**(抽象语法树)，利用正则解析模板
- **优化静态节点**，深度遍历AST，标记静态节点，后续更新渲染跳过静态节点
- 生成代码，generate函数将AST**编译成render函数**

### 10. 异步渲染

Vue不会立即同步执行重新渲染，而是按照一定的策略进行DOM的更新。数据变化时Vue开启一个队列，并**缓冲在同一事件循环中发生的所有数据变更**。如果**同一个watcher被多次触发，只会被推入到队列中一次，可以去除重复数据，避免不必要的计算和DOM操作**。

### 11. mixin

### 12. 自定义指令

### 13. 组件通信

- porps / $emit
- 事件总线eventBus($emit / $on)
- 依赖注入(provide / inject)——类似于react中的context,解决组件跨层级通信
- $parent / $children——直接让组件访问父/子组件的实例
- vuex——全局状态管理

### 14. 虚拟DOM和Diff算法

1. **虚拟DOM**
   
   - 虚拟DOM是一个对象，用js来模拟真实DOM的对象，具有type(节点类型div、p), props(节点属性class、id)、children(子节点数组)
   - 虚拟DOM屏蔽了不同浏览器平台间的差异，且将对DOM的多次修改映射到新的虚拟DOM上最终一次性地更新真实DOM，避免了频繁操作DOM引发的频繁重排
   - 虚拟DOM的首屏加载时间较长(需要根据当前的节点生成虚拟DOM)，并且在极端场景(所有DOM节点都改变)下性能不是最优解

2. **Diff算法**
   
   - Diff算法用于对比新旧两颗虚拟DOM树，找到其中变化的节点并以**最小化代价更新**
   
   - 如果不同层比较全部对比完时间复杂度为O(n^3)，**只在同一层级比较**时间复杂度为O(n)
   
   - Diff算法采用**深度优先遍历节点**进行差异的比较，同层比较具体过程如下：
     
     **节点类型改变**：如节点由p标签变为div标签，则直接销毁旧节点挂载新节点
     
     **节点类型相同但属性发生改变**：触发当前节点属性的更新
     
     **节点文本变化**：触发文本的更新
     
     旧节点有子节点，新节点没有 removeChild；旧节点没有子节点，新节点有 appendChild；
     
     **新旧节点都有子节点，执行updateChildren方法，首尾指针法(头头、尾尾、头尾、尾头)，若四次比较都没有找到可复用的节点，则将所有旧子节点的key映射为旧节点下标的`key->index`表，然后再用新vnode的key去匹配可复用的位置**
     
     ![图片](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041453328.png)

### 15. 观察者模式和发布订阅模式

### 16. Vue生命周期

**开始创建 -> 初始化数据 -> 编译模板 -> 挂载DOM -> 渲染、更新 -> 卸载**

1. beforeCreate: 此时data还没有变成响应式，data、watch、computed、methods上的方法和数据无法访问
2. created: 实例**创建**完成，data、computed、watch、methods都初始化完成
3. beforMount: **模板编译**生成render函数， 执行render函数生成Html
4. Mounted: 将编译好的html替换el属性指向的DOM对象(**挂载DOM**)，**发起ajax请求(数据初始化完成且DOM已挂载)**
5. beforeUpdate: 响应式数据更新，对应真实DOM还没有更新
6. Updated: 虚拟DOM执行Diff算法，对真实DOM patch
7. beforeDestory: 实例消耗前调用，在这个钩子函数里销毁定时器、事件监听器等
8. Destoryed: 实例被销毁

### 17. vue和react的区别

**相同点**：虚拟DOM、DIff算法、组件化、数据驱动、都提供了UI库、全局状态管理库、路由库

**不同点：**

- **更新的粒度不同**。监听数据变化原理不同，vue通过数据劫持的方式监听响应式数据的改变。react则在state或props变化时重新渲染组件和它的子组件，所以需要开发人员在编码时考虑较多的优化手段，带来比较大的心智负担。
- UI界面语法不同，vue主要通过模板语法(template)并提供指令对模板进行操作，react主要通过jsx语法(用js语法书写html，通过render函数渲染成html)
- 数据流不同，vue双向绑定数据流(MVVM框架，view和model双向绑定，主要通过v-model指令实现)，react单向数据流(数据只能通过props的形式由父组件流向子组件)
- 逻辑复用方式不同，vue通过mixin来复用公共逻辑，react可以通过render props(在props中传入render函数)、HOC(高阶组件，接收一个组件作为参数并返回一个新的组件)、自定义HOOKS(react16.8版本之后)来实现逻辑复用
- 全局状态库不同，vuex和redux都基于flux的思想来实现，具体来说vuex中主要对象为state、getters、mutations、actions、module, 视图通过commit(mutation)的方式触发state的变化，只能通过mutation对state进行改变的，在actions中可以加入副作用逻辑(异步请求等)；redux并不是react独有的，它的主要对象包括state、action、reducer、subscribe，视图通过dispath(action)来触发state的更新，只能通过action来改变视图，reducer(纯函数)根据接收的action的类型进行响应操作并返回一个新的State(Immutable data)。redux本身不支持异步操作，需要配合一些中间件(redux-saga, redux-thunk), 具体在react中使用redux时需要使用react-redux库(connect函数使组件可以使用store和dispatch)

### 18. mixin、mixins、extends

- mixin是全局混入，它会影响每一个Vue实例

- mixins混入，是Vue中逻辑复用的方式，通过配置mixin数组来复用一些公共的逻辑(data、method、生命周期钩子函数)，添加新的配置项合并已经存在的配置项。mixin混入的钩子在组件自身钩子**之前**调用，并且如果存在命名冲突，将会保留**组件内**的配置

- mixins存在缺点，容易引起命名冲突，且当代码规模比较大的时候复杂度高不易维护

- extends以面向对象的方式继承一些方法，但只能继承一个
