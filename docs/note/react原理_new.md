### 1. Not Magic, just Arrays

从useState的实现角度来看，应该是将state放在useState函数的外部，这样当调用setData时可以render, 并且组件中也能访问到最新的state; useEffect的实现主要是将依赖数组放在useEffect函数的外部，当依赖dep更新或没有传入依赖dep则重新执行函数逻辑；当我们需要使用多个useState和useEffect时，需要用**数组**(Fiber架构中使用**单链表**)保存这些全局的状态

```react
const [count, setCount] = useState(0);
const [name, setName] = useState('fan');
useEffect(() => {console.log(count)}, [count]);
useEffect(() => {console.log(name)}, [name]);
```

![image-20220309230132418](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041455263.png)

因此，hooks只能在函数最外层调用，且不能在循环、条件判断中使用(**memorizedState是按照hook定义的顺序来存放数据的**)

### 2. React-Fiber

- react存在的问题：js线程和渲染线程是互斥的，当react在渲染组件时从开始到渲染过程不会中断。如果组件较大，那么js线程会一直执行vdom的计算，可能会阻塞页面渲染线程

- react-fiber的解决方案：fiber将渲染更新过程拆分为多个子任务，并引入优先级调度，从而在react计算vdom的间隙完成页面的渲染。实现方式是通过window.requestIdleCallback()方法，该方法在浏览器空闲时段调用排队的函数

- 可以被打断的生命周期(**reconciliation阶段**)：getDerivedState、shouldComponentUpdate；在reconciliation阶段，主要进行diff计算找出变化部分

- 不可以被打断的生命周期(**commit阶段**)：componentDidMount、componentDidUpdate、componentWillUnmount；在commit阶段，主要执行patch操作，将上一阶段获取到的变化部分应用到真实DOM树中

### 3. mini-react

- React的JSX语法 -> React.createElement() -> 虚拟DOM -> render()渲染真实DOM

  ![img](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9caeaa42b5494fa39ce70452c10af2bb~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?)

```js
// react jsx语法
const element = <h1 title="foo"></h1>
// createElement语法, 传入参数分别为tag、props、chilren
const element = React.createElement("h1", {title: "foo"}, "Hello");
// createElement生成的虚拟DOM对象
const element = {
    type: "h1",
    props: {
        title: "foo",
        children: "Hello"
    }
}
const container = document.getElementById("root");
// babel将jsx编译成React.createElement形式, render函数将虚拟DOM转化为真实DOM并插入到comtainer元素下
ReactDOM.render(element, container);
```

```js
// React.createElement()函数, 创建虚拟DOM
function createElement(type, props, ...children) {
	return {
        type,
        props: {
            ...props,
            // 如果children是基本类型则直接生成文本节点
            children: children.map(child => 
            	typeof child === 'object' ? child : createTextElement(child)
            )
        }
    }
}

function createTextElement(text) {
    return {
        type: "TEXT_ELEMENT",
        props: {
            nodeValue: text,
            children: []
        }
    }
}
```

```js
// render函数，将虚拟DOM转化为真实DOM并挂载
function render(element, container) {
    // 创建当前element的DOM节点，注意区分文本类型
	const dom = 
          element.type == "TEXT_ELEMENT" 
    	  ? document.createTextNode("")
          : document.createElement(element.type);
    // 添加element的props到DOM中
    const isProperty = key => key !== "children";
    Object.keys(element.props)
    	.filter(isProperty)
    	.forEach(name => {
        	dom[name] = element.props[name];
    	});
    // 遍历子元素并递归render
    element.props.children.forEach(child => 
    	render(child, dom);
    )
    // 挂载到DOM上
    container.appendChild(dom);
}
```

- Concurrent Mode并发渲染， fiber架构

  ​	浏览器的FPS一般是60帧，也就是说1秒内要刷新60帧，每帧的持续时间大约为16.6ms。但是每一帧的渲染时间一般会小于16.6ms，那就可以利用每一帧末尾的空闲时间执行其他任务而不会影响用户体验。 requestIdleCallback用来执行一些低优先级的任务，在浏览器闲时调度

  ```js
  // timeout为超时时间，如果在这个时间内都没有空闲帧，则强制执行
  // fn接收deadline对象作为参数，deadline有两个属性timeRemaining和didTimeout, timereaining返回当前帧还剩余的毫秒数
  requestIdleCallback(fn, timeout);
  
  // concurrent mode
  // 利用requestIdleCallback()提供的闲时调度
  let nextUnitOfWork = null;
  
  function workLoop(deadline) {
      let shouldYield = false;
      while(nextUnitOfWork && !shouldYield) {
          nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
      	shouldYield = deadline.timeRemaining() < 1;
      }
      requestIdleCallback(workLoop);
  }
  requestIdleCallback(workLoop);
  ```

  ​	在Concurrent Mode下，浏览器会随时打断我们createElement以及diff改变vdom的过程，为了保存在被打断时的位置，提出了fiber架构。即每个节点都有**child、parent和sibling**指针。

  ![image-20220620161939350](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206201619815.png)

  
  
  ​	遍历Fiber Tree的过程：当前节点有child -> next unit为child; 当前节点没有child, 有sibling -> next unit为sibling; 当前节点没有child和sibling，有uncle（即当前节点parent的sibling）next unit为uncle, 否则继续向上寻找知道找到siblling或者root。
  
  ​	**vdom 转 fiber 的过程叫做 reconcile，是可打断的，React 加入了 schedule 的机制在空闲时调度 reconcile，reconcile 的过程中会做 diff，打上增删改的标记（effectTag），并把对应的 dom 创建好。然后就可以一次性把 fiber 渲染到 dom，也就是 commit。**

### 4. react hooks原理

react hooks是通过闭包实现的

- 实现一个简单的useState

  ```js
  // Demo 2
  const MyReact = (function() {
    let _val // 在函数作用域内保存_val
    return {
      render(Component) {
        const Comp = Component()
        Comp.render()
        return Comp
      },
      // 这里的state是一个闭包
      useState(initialValue) {
        _val = _val || initialValue // 每次执行都会赋值
        function setState(newVal) {
          _val = newVal
        }
        return [_val, setState]
      }
    }
  })()
  // 继续 Demo 2
  function Counter() {
    const [count, setCount] = MyReact.useState(0)
    return {
      click: () => setCount(count + 1),
      render: () => console.log('render:', { count })
    }
  }
  let App
  App = MyReact.render(Counter) // render: { count: 0 }
  // 由于闭包的存在，可以更新state
  App.click()
  // 通过重新渲染组件访问到新的state
  App = MyReact.render(Counter) // render: { count: 1 }
  ```

- 实现useEffect

- 闭包陷阱
