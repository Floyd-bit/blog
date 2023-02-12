### 1. 开箱即用

内置了路由、构建、部署、测试等功能

### 2. 完备路由

支持配置式路由和约定式路由，支持动态路由、嵌套路由、权限路由等

- 配置式路由，在配置文件中对routes进行配置，格式为路由信息的数组
  
  ```js
  export default {
      routes: [
          {path:'/', component: 'index'},
          {path:'/user', component: 'user'}
      ]
  }
  ```

- 约定式路由
  
  约定式路由也叫文件路由，不需要手写配置，文件系统即路由，通过目录和文件及其命名分析出路由配置。

- 权限路由
  
  配置routes数组中的wrappers高阶组件封装

- 动态路由
  
  []包裹的文件或文件夹为动态路由
  
  src/pages/users/[id].tsx 对应的路由为 /users/:id

### 3. dva

> dva = React-Router + Redux + Redux-saga

- 数据流向
  
  数据改变->通过`dispatch`发起一个action->如果是同步行为直接通过`Reducers`改变`state`,如果是异步行为(副作用)会先触发`Effects`，然后流向`Reducers`最终改变`State`.
  
  ![img](https://gitee.com/floydzzx/tuchuang/raw/master/img/20220117105946.png)

- State 操作时每次都要当作不可变数据(immutable data)来对待，保证每次都是全新对象，没有引用关系(type State = any)

- Action是改变State的唯一途径，必须带有`type`属性指明具体的行为。发起action需要使用`dispatch`函数。`dispatch`是在组件connect Models以后，通过props传入的（type Action = any）

- dispatch函数是一个用来触发action的函数
  
  (type dispatch = (a: Action) => Action)
  
  ```js
  dispatch({
      type: 'user/add',  // 如果在model外调用，需要添加namespace
      payload: {}  // 需要传递的信息
  })
  ```

- Reducer函数接收两个参数：之前已经累计运算的结果和当前要被累计的值，返回一个新的累计结果.Reducers必须是纯函数，每一次的计算都应该使用immutable data,每次操作都返回一个全新的数据
  
  (type Reducer<S,A> = (state: S, action:A) => S)
  
  ```js
  // 向 { todos: [], loading: true }里添加一个新的todo, 并将loading设为false
  function addTodo(state, action) {
      // State为旧的state
      return {
          ...state,
          todos: state.todos.concat(action.payload),
          loading: false
      }
  }
  ```

- Effect，副作用. dva底层引入了redux-sages做异步流程控制,采用generator相关概念，将异步转成同步写法。
  
  ```js
  function *addAfter1Second(action, {put, call}) {
      // call 执行异步函数
      yield call(delay, 1000);
      // put 发出一个Action, 类似于dispatch
      yield put({ type: 'add' });
  }
  ```

- Subscription，用于订阅一个数据源，根据条件dispatch需要的action
  
  ```js
  subscriptions: {
      keyboardWatcher({dispath}) {
          key('x', () => {dispatch({type: 'add'})})
      }
  }
  ```

### 4. css的使用

- 全局样式：src/global.css为全局样式，用于覆盖样式

- CSS Modules
  
  ```js
  // CSS Modules
  import styles from './foo.css';
  
  // 非CSS Modules
  import './foo.css';
  ```

- umi内置支持CSS预处理器less

### 5. 图片的使用

- JS里使用图片
  
  ```js
  // require引用相对路径的图片
  <img src={require('@/foo.png')}/>
  
  // url式引入svg
  import logoSrc from './logo.svg'
  function Analysis() {
      return <img src={logoSrc}/>
  }
  ```

- CSS中使用图片
  
  ```css
  /* 通过相对路径引用 */
  .logo {
      background: url(./foo.png);
  }
  ```

### 6. 进阶配置

- **按需加载**,通过dynamicImport配置
  
  组件体积太大，不适合直接计入bundle中，以免影响首屏加载速度

- **服务端渲染(SSR)**
  
  如何判断当前页面是SSR还是CSR——查看网页源代码，如果\<div id="root">DOM里的元素不为空，则是SSR，否则是CSR

### 7. SSR

