### 1. 概述

- **声明式**的视图层（**JSX**）
- 从状态到UI——**单向数据流**
- **虚拟DOM**——灵活的渲染
- **Diff算法**——高效的DOM操作
- React相当于MVC框架的V层，需要结合其他库发挥作用

### 2. 基础

#### 1.JSX语法： HTML写在js中，用{}包裹对象

#### 2.原生html

```react
const rawHtmlData ={
    _html: rawHtml
}
<p dangerousSetInnerHTML={rawHtmlData}></p>
```

#### 3. 事件

- 更好的兼容性和跨平台
- 挂载到document,减少内存消耗，避免频繁解绑
- 方便事件的统一管理

![image-20220118134806580](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041455038.png)

**this默认是undefined, 所以react中的事件必须修改this的指向**

```react
function1() {}
// 箭头函数，this指向当前实例
function2 = () => {}
// 写在构造函数里，只绑定一次
this.function = this.function1.bind(this);
// 写在render函数里, 每次触发事件都绑定一次
render() {
    return <p onClick={this.function1.bind(this)}></p>
    <p onClick={this.function2}></p>
}
```

react中的事件是组合事件(SyntheticEvent), 都绑定在document上

```js
console.log(event.target); // 指向当前元素，即当前元素触发
console.log(event.currentTarget); // 指向当前元素
console.log(event.nativeEvent); // 原生事件
console.log(event.nativeEvent.target); // 指向当前元素，即当前元素触发
console.log(event.nativeEvent.currentTarget); // document
```

#### 4. 组件

##### 1. 类组件和函数组件

类组件

```react
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
    constructor() {
        super(props);
         this.state = {};
    }
    render() {
        return ()
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));
```

函数组件 （无状态组件）

```react
function App(props) {
    return ()
}
```

**属性校验PropTypes   默认属性defaultProps**

```react
App.propTypes = {
    post: PropTypes.object;
    onVote: PropTypes.func;
}

App.defaultProps = {
    name: 'Stranger'
}
```

##### 2. 受控组件和非受控组件

受控（非受控）组件

1. 受控组件
   
   **如果一个表单元素的值由React来管理，那么它就是一个受控组件**
   
   方法： 通过表单元素的value属性设置表单元素的值，通过表单元素的onChange事件监听值的变化，并将变化同步到React组件的state中

2. 非受控组件
   
   **表单元素的状态仍然由表单元素自己管理，而不是交给React组件管理**
   
   方法： **可以使用ref（一个函数，以当前元素为参数）来获得React组件或DOM元素的实例**
   
   缺点：破坏了React对组件状态管理的一致性
   
   ```react
   <input type="text" ref={(input) => this.input = input}></input>
   ```

##### 3. 组件样式

1. 外部样式（CSS Moudles）

2. 内联样式
   
   第一个大括号表示style的值是一个JavaScript表达式，第二个大括号表示这个JavaScript表达式是一个对象
   
   ```react
   <div style={{height: '10px', weight: '10px'}}></div>
   ```

##### 4. 生命周期(只有类组件有生命周期方法，函数组件没有)

![image.png](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041455039.webp)

1. 挂载阶段
   
   （1）constructor（ES6 class的构造方法）
   
   （2）componentWillMount (这个方法在组件被挂载到DOM前调用，且只会被调用一次)
   
   （3）render(渲染UI)
   
   （4）***componentDidMount***（在组件被挂载到DOM后调用，且只会被调用一次）：
   
   ​        **依赖DOM节点的操作可以放到这个方法中，还会用于向服务器端请求数据**

2. 更新阶段
   
   组件被挂载到DOM后，组件的**props或state**可以引起组件更新，props引起的组件更新，本质上是由**渲染该组件的父组件引起**的，也就是**当父组件的render方法被调用时，组件会发生更新过程，无论props的值是否改变，父组件render方法每一次调用，都会导致组件更新**
   
   （1）componentWillReceiveProps
   
   ​    这个方法**只在props引起的组件更新过程**中，才会被调用。State引起的组件更新并不会    触发该方法的执行。方法的参数nextProps是父组件传递给当前组件的新的props
   
   （2）***shouldComponentUpdate***(**不能调用setState**)
   
   ​    这个方法决定组件是否继续执行更新过程。当方法返回true时（true也是这个方法的默认返回值），组件会继续更新过程；当方法返回false时，组件的更新过程停止。**一般通过比较nextProps、nextState和组件当前的props、state决定这个方法的返回结果**。这个方法可以用来**减少组件不必要的渲染，从而优化组件的性能**
   
   （3）componentWillUpdate（render调用前执行，**不能调用setState**）
   
   （4）render
   
   （5）***componentDidUpdate***

3. 卸载阶段
   
   ***componentWillUnmount***
   
   这个方法在组件被卸载前调用，可以在这里执行一些清理工作，比如**清除组件中使用的定时器，清除componentDidMount中手动创建的DOM元素**等

4. 列表和key
   
   React使用key属性来标记列表中的每个元素，**当列表数据发生变化时，React就可以通过key知道哪些元素发生了变化，从而只重新渲染发生变化的元素，提高渲染效率**，但并不推荐使用索引作为key，因为一旦列表中的数据发生重排，数据的索引也会发生变化，不利于React的渲染优化

5. 事件处理
   
   - 处理事件的响应函数要以**对象的形式**赋值给事件属性，而不是DOM中的字符串形式
   
   - React中的事件是**合成事件**，并不是原生的DOM事件,必修**显式地调用事件对象的preventDefault方法阻止事件的默认行为**
   
   - ES6类不会为方法自动绑定this到当前对象，解决this指向问题
     
     1. **使用箭头函数直接在render方法中为元素事件定义事件处理函数**，最大的问题是，每次render调用时，都会重新创建一个新的事件处理函数，带来额外的性能开销，组件所处层级越低，这种开销就越大
        
        ```react
        <button onClick={(e)=>{xxx}}></button>
        ```
     
     2. 直接将组件的方法赋值给元素的事件属性，同时在类的构造函数中，将这个方法的this绑定到当前对象
        
        ```react
        constructor(props) {
            super(props);
            this.handleClick = this.handleClick.bind(this);
        }
        ```
     
     3. **属性初始化语法**
        
        ```react
        // ES7会自动为class中定义的方法绑定this
        handleClick = (e) => {
             xxx   
        }
        <button onClick={this.handleClick}></button>
        ```

### 3. React 16新特性——基于Fiber架构

#### 1.render支持返回数组和字符串

#### 2.错误边界

部分UI的错误不应该破坏整个应用程序

#### 3.Protals(插槽)

Portals特性让我们可以把组件渲染到当前组件树以外的DOM节点上

```react
ReactDOM.createProtal(child, container)
```

第一个参数child是可以被渲染的React节点，例如React元素、由React元素组成的数组、字符串等，container是一个DOM元素，child将被挂载到这个DOM节点

应对css兼容性问题，如z-index、fixed、BFC等问题，全局的dialog

### 4. 深入理解组件

#### 1.state

- 不能直接修改state,要使用setState

- **state的更新是异步的**，调用setState时把要修改的状态放入一个队列中，React会优化真正的执行时机，可能会将多次setState的状态修改合并成一次状态修改，**所以不要依赖当前的state来计算下一个state,同样不能依赖当前的props来计算下一个状态**
  
  ![image-20220118135012122](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041455041.png)
  
  正确方法：
  
  ```react
  // preState是前一个状态，props是当前最新的属性props
  this.setState((preState, props) => {
      // isBatchingUpdates = true
      counter: preState.quantity + 1;
  })
  // setTimeout中setState是同步的
  setTimeout(() => {
      // isBatchingUpdates = false
         setState({
          count: this.state.count + 1
      })
  }， 1000)
  // 自己定义的DOM事件中setState是同步的
  document.body.addEventListener('click', this.bodyClickHandler)
  ```

- state的更新是一个合并的过程
  
  当调用setState修改组件状态时，只需要传入发生改变的state，而不是组件完整的state，因为组件state的更新是一个合并的过程

- state被视为**不可变对象**
  
  **不可变类型**（number string boolean null undefined） 
  
  数组类型（使用concat方法或扩展语法、slice()、filter()——返回一个新的数组对象）
  
  **对象类型**（object.assgin合并对象、扩展语法返回一个新的对象）

#### 2. 与服务端通信

在componentDidMount阶段进行服务器通信，此时组件已经挂载且真实DOM渲染完成，是调用服务器API最安全的地方

- 在componentDidMount中执行服务器通信可以保证获取到数据时，组件已经处于挂载状态，这时即使要直接操作DOM也是安全
- 在componentWillMount中请求并不会比在componentDidMount中请求快多少，而在constructor中请求则会导致加载时间太长
- 当组件在服务器端渲染时，componentWillMount会被调用两次，一次是在服务器端，另一次是在浏览器端，而componentDidMount能保证在任何情况下**只会被调用一次**，从而不会发送多余的数据请求

#### 3. 组件间通信

- 父子组件通信
  
  **子->父：父组件通过子组件的props传递给子组件一个回调函数，子组件调用这个回调函数来改变父组件数据**

- 兄弟组件通信
  
  **通过状态提升的方式实现，即把需要共享的状态保存在公共父组件内，通过回调函数修改共享状态**

- Context
  
  **context上下文让任意层级的子组件都可以获得父组件中的状态和方法**
  
  ```react
  const Context = createContext();
  // 父组件中
  <Context.Provider value={color}>
      <Child/>
  </Context.Provider>
  // 子组件中
  <Context.Consumer>{color}</Context.Consumer>
  ```

- 消息队列、Redux、Mobx

#### 4.ref获取DOM

ref接收一个**回调函数**作为值，在组件被挂载或卸载时，回调函数会被调用，在组件被挂载时，回调函数会接收当前DOM元素作为参数；在组件被卸载时，回调函数会接收null作为参数

#### 5. 异步组件

- import()
- React.lazy
- React.Suspense

```react
const Demo = React.lazy(() => import('./Demo'))

class App extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <React.Suspense fallback={<div>...loading</div>}>
            <Demo/>
        </React.Suspense>
    }
}
```

#### 6. 组件声明方式

- 函数式组件: 无状态组件，不能访问this对象，不能使用生命周期方法
- React.createClass类组件：自动绑定函数方法
- extends React.Component类组件：需要手动在构造函数中绑定成员函数的this

### 5. 虚拟DOM和Diff算法

- 操作真实DOM缺点：每一次对DOM的修改都会引起浏览器对网页的重新布局和重新渲染，所以尽量减少DOM操作

- 虚拟DOM是真实DOM的抽象，使用JS对象描述DOM元素
  
  ```react
  // 真实DOM
  <div className = "foo">
      <h1>Hello</h1>
  </div>
  // 虚拟DOM
  {
      type: 'div',
       props: {
          className: 'h1',
           children: {
               type: 'h1',
               props: {
                   children: 'Hello'
               }
           }
       }
  }
  ```

- DIff算法 O(n)：React会通过**比较两次虚拟DOM结构的变化**找出差异部分，更新到真实DOM上，从而减少最终要在真实DOM上执行的操作，提高程序执行效率
  
  1. 根节点是不同类型：
     
     DOM元素类型（旧DOM节点被销毁，新DOM元素插入DOM树中）
     
     React组件类型(旧的组件实例的componentWillUnmount被调用，新的组件实例componentWillMount和componentDidMount调用)
  
  2. 根节点是相同DOM元素类型
     
     React保留根节点，比较根节点的**属性**，只更新变化了的属性
  
  3. 根节点是相同的组件类型
     
     执行组件实例的componentWillReceiveProps() componentWillUpdate()

### 6. 高阶组件

> 高阶组件（简称HOC）接收React组件作为参数，并且返回一个新的React组件

高阶组件的主要功能是**封装并分离组件的通用逻辑**，让通用逻辑在组件间更好地被复用

高阶组件最适合使用的地方是在**组件定义的外部**，这样就不会受到组件生命周期的影响

```react
import React, { Component } from 'react'
// 代理方式实现
// 高阶函数，添加ComponentWillMount方法
function withPersistentData(WrappedComponent) {
    return class extends Componet {
        componentWillMount() {
            let data = localStorage.getItem('data');
            this.setState({data};
        }

        render() {
            return <WrappedComponent data={this.state.data} {...this.props} />
        }
    }
}

class MyComponent extends Component {
    render() {
        return <div>{this.props.data}</div>
    }
}

const MyComponentWithPersistentData = withPersistentData(MyComponent);
```

- 操纵props
  
  在被包装组件接收props前，高阶组件可以先拦截到props，对props执行增加、删除或修改的操作，然后将处理后的props再传递给被包装组件

- 通过ref访问组件实例
  
  高阶组件通过ref获取被包装组件实例的引用，然后高阶组件就具备了直接操作被包装组件的属性或方法的能力
  
  ```react
  function withRef(wrappedComponent) {
      return class extends React.Component {
          constructor(props) {
              super(props);
              this.someMethod = this.someMethod.bind(this);
          }
          someMethod() {
              this.wrappedInstance.somMethodInWrappedComponent();
          }
  
          render() {
              // 通过ref 访问被包装组件的实例
              return <WrappedComponent ref=((instance) => {this.wrappedInstance = instance}) {...this.props} />
          }
      }
  }
  ```

- 组件状态提升
  
  高阶组件可以通过将被包装组件的状态及相应的状态处理方法提升到高阶组件自身内部实现被包装组件的无状态化，**利用高阶组件将原本受控组件需要自己维护的状态统一提升到高阶组件中**

- 用其他元素包装组件

- **参数传递**
  
  高阶组件的参数并非只能是一个组件，它还可以接收其他参数
  
  ```react
  HOC(...params) (wrappedComponent)
  
  function withPersistentData = (key) => (wrappedComponent) => {
      // xxx
  }
  
  const MycomponentWithPersistentData = withPersistentData('data')(MyComponent);
  ```
  
  还可以使用工具函数compose(...func),调用compose(f, g, h)等价于(...args) =>f(g(h(...args)))

### 7. 性能优化

- SCU（shouldComponentUpdate）
  
  父组件更新，子组件无条件更新(需要在子组件SCU判断)
  
  ```react
  shouldComponentUpdate(nextProps, nextState) {
      if (nextState.count !== this.state.count) {
          return true // 可以渲染
      }
      return false  // 不重复渲染
  }
  ```

- PureComponent(类组件)和React.memo(函数式组件)
  
  尽量浅比较
  
  ```react
  class Demo extends React.PureComponent {
      // 
  }
  ```
  
  ![image-20220118133345356](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041455042.png)

- 不可变值immutable.js

### 8. Render Props

通过一个函数将class组件的state作为props传递给纯函数组件

```react
class Factory extends React.Component {
    constructor() {
        this.state = {}
    }
    render() {
        return <div>this.props.render(this.state)</div>
    }
}

const App = () => {
    <Factory render={(props) => <p>{props.a}</p>}></Factory>
}
```
