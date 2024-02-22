(window.webpackJsonp=window.webpackJsonp||[]).push([[42],{640:function(t,a,e){"use strict";e.r(a);var s=e(11),n=Object(s.a)({},(function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h3",{attrs:{id:"_1-概述"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_1-概述"}},[t._v("#")]),t._v(" 1. 概述")]),t._v(" "),e("ul",[e("li",[e("strong",[t._v("声明式")]),t._v("的视图层（"),e("strong",[t._v("JSX")]),t._v("）")]),t._v(" "),e("li",[t._v("从状态到UI——"),e("strong",[t._v("单向数据流")])]),t._v(" "),e("li",[e("strong",[t._v("虚拟DOM")]),t._v("——灵活的渲染")]),t._v(" "),e("li",[e("strong",[t._v("Diff算法")]),t._v("——高效的DOM操作")]),t._v(" "),e("li",[t._v("React相当于MVC框架的V层，需要结合其他库发挥作用")])]),t._v(" "),e("h3",{attrs:{id:"_2-基础"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2-基础"}},[t._v("#")]),t._v(" 2. 基础")]),t._v(" "),e("h4",{attrs:{id:"_1-jsx语法-html写在js中-用-包裹对象"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_1-jsx语法-html写在js中-用-包裹对象"}},[t._v("#")]),t._v(" 1.JSX语法： HTML写在js中，用{}包裹对象")]),t._v(" "),e("h4",{attrs:{id:"_2-原生html"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2-原生html"}},[t._v("#")]),t._v(" 2.原生html")]),t._v(" "),e("div",{staticClass:"language-react extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("const rawHtmlData ={\n    _html: rawHtml\n}\n<p dangerousSetInnerHTML={rawHtmlData}></p>\n")])])]),e("h4",{attrs:{id:"_3-事件"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_3-事件"}},[t._v("#")]),t._v(" 3. 事件")]),t._v(" "),e("ul",[e("li",[t._v("更好的兼容性和跨平台")]),t._v(" "),e("li",[t._v("挂载到document,减少内存消耗，避免频繁解绑")]),t._v(" "),e("li",[t._v("方便事件的统一管理")])]),t._v(" "),e("p",[e("img",{attrs:{src:"https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041455038.png",alt:"image-20220118134806580"}})]),t._v(" "),e("p",[e("strong",[t._v("this默认是undefined, 所以react中的事件必须修改this的指向")])]),t._v(" "),e("div",{staticClass:"language-react extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("function1() {}\n// 箭头函数，this指向当前实例\nfunction2 = () => {}\n// 写在构造函数里，只绑定一次\nthis.function = this.function1.bind(this);\n// 写在render函数里, 每次触发事件都绑定一次\nrender() {\n    return <p onClick={this.function1.bind(this)}></p>\n    <p onClick={this.function2}></p>\n}\n")])])]),e("p",[t._v("react中的事件是组合事件(SyntheticEvent), 都绑定在document上")]),t._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[t._v("console"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("event"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("target"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 指向当前元素，即当前元素触发")]),t._v("\nconsole"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("event"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("currentTarget"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 指向当前元素")]),t._v("\nconsole"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("event"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("nativeEvent"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 原生事件")]),t._v("\nconsole"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("event"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("nativeEvent"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("target"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 指向当前元素，即当前元素触发")]),t._v("\nconsole"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("event"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("nativeEvent"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("currentTarget"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// document")]),t._v("\n")])])]),e("h4",{attrs:{id:"_4-组件"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_4-组件"}},[t._v("#")]),t._v(" 4. 组件")]),t._v(" "),e("h5",{attrs:{id:"_1-类组件和函数组件"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_1-类组件和函数组件"}},[t._v("#")]),t._v(" 1. 类组件和函数组件")]),t._v(" "),e("p",[t._v("类组件")]),t._v(" "),e("div",{staticClass:"language-react extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("import React, { Component } from 'react';\nimport ReactDOM from 'react-dom';\n\nclass App extends Component {\n    constructor() {\n        super(props);\n         this.state = {};\n    }\n    render() {\n        return ()\n    }\n}\n\nReactDOM.render(<App/>, document.getElementById('root'));\n")])])]),e("p",[t._v("函数组件 （无状态组件）")]),t._v(" "),e("div",{staticClass:"language-react extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("function App(props) {\n    return ()\n}\n")])])]),e("p",[e("strong",[t._v("属性校验PropTypes   默认属性defaultProps")])]),t._v(" "),e("div",{staticClass:"language-react extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("App.propTypes = {\n    post: PropTypes.object;\n    onVote: PropTypes.func;\n}\n\nApp.defaultProps = {\n    name: 'Stranger'\n}\n")])])]),e("h5",{attrs:{id:"_2-受控组件和非受控组件"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2-受控组件和非受控组件"}},[t._v("#")]),t._v(" 2. 受控组件和非受控组件")]),t._v(" "),e("p",[t._v("受控（非受控）组件")]),t._v(" "),e("ol",[e("li",[e("p",[t._v("受控组件")]),t._v(" "),e("p",[e("strong",[t._v("如果一个表单元素的值由React来管理，那么它就是一个受控组件")])]),t._v(" "),e("p",[t._v("方法： 通过表单元素的value属性设置表单元素的值，通过表单元素的onChange事件监听值的变化，并将变化同步到React组件的state中")])]),t._v(" "),e("li",[e("p",[t._v("非受控组件")]),t._v(" "),e("p",[e("strong",[t._v("表单元素的状态仍然由表单元素自己管理，而不是交给React组件管理")])]),t._v(" "),e("p",[t._v("方法： "),e("strong",[t._v("可以使用ref（一个函数，以当前元素为参数）来获得React组件或DOM元素的实例")])]),t._v(" "),e("p",[t._v("缺点：破坏了React对组件状态管理的一致性")]),t._v(" "),e("div",{staticClass:"language-react extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v('<input type="text" ref={(input) => this.input = input}></input>\n')])])])])]),t._v(" "),e("h5",{attrs:{id:"_3-组件样式"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_3-组件样式"}},[t._v("#")]),t._v(" 3. 组件样式")]),t._v(" "),e("ol",[e("li",[e("p",[t._v("外部样式（CSS Moudles）")])]),t._v(" "),e("li",[e("p",[t._v("内联样式")]),t._v(" "),e("p",[t._v("第一个大括号表示style的值是一个JavaScript表达式，第二个大括号表示这个JavaScript表达式是一个对象")]),t._v(" "),e("div",{staticClass:"language-react extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("<div style={{height: '10px', weight: '10px'}}></div>\n")])])])])]),t._v(" "),e("h5",{attrs:{id:"_4-生命周期-只有类组件有生命周期方法-函数组件没有"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_4-生命周期-只有类组件有生命周期方法-函数组件没有"}},[t._v("#")]),t._v(" 4. 生命周期(只有类组件有生命周期方法，函数组件没有)")]),t._v(" "),e("p",[e("img",{attrs:{src:"https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041455039.webp",alt:"image.png"}})]),t._v(" "),e("ol",[e("li",[e("p",[t._v("挂载阶段")]),t._v(" "),e("p",[t._v("（1）constructor（ES6 class的构造方法）")]),t._v(" "),e("p",[t._v("（2）componentWillMount (这个方法在组件被挂载到DOM前调用，且只会被调用一次)")]),t._v(" "),e("p",[t._v("（3）render(渲染UI)")]),t._v(" "),e("p",[t._v("（4）"),e("em",[e("strong",[t._v("componentDidMount")])]),t._v("（在组件被挂载到DOM后调用，且只会被调用一次）：")]),t._v(" "),e("p",[t._v("​        "),e("strong",[t._v("依赖DOM节点的操作可以放到这个方法中，还会用于向服务器端请求数据")])])]),t._v(" "),e("li",[e("p",[t._v("更新阶段")]),t._v(" "),e("p",[t._v("组件被挂载到DOM后，组件的"),e("strong",[t._v("props或state")]),t._v("可以引起组件更新，props引起的组件更新，本质上是由"),e("strong",[t._v("渲染该组件的父组件引起")]),t._v("的，也就是"),e("strong",[t._v("当父组件的render方法被调用时，组件会发生更新过程，无论props的值是否改变，父组件render方法每一次调用，都会导致组件更新")])]),t._v(" "),e("p",[t._v("（1）componentWillReceiveProps")]),t._v(" "),e("p",[t._v("​    这个方法"),e("strong",[t._v("只在props引起的组件更新过程")]),t._v("中，才会被调用。State引起的组件更新并不会    触发该方法的执行。方法的参数nextProps是父组件传递给当前组件的新的props")]),t._v(" "),e("p",[t._v("（2）"),e("em",[e("strong",[t._v("shouldComponentUpdate")])]),t._v("("),e("strong",[t._v("不能调用setState")]),t._v(")")]),t._v(" "),e("p",[t._v("​    这个方法决定组件是否继续执行更新过程。当方法返回true时（true也是这个方法的默认返回值），组件会继续更新过程；当方法返回false时，组件的更新过程停止。"),e("strong",[t._v("一般通过比较nextProps、nextState和组件当前的props、state决定这个方法的返回结果")]),t._v("。这个方法可以用来"),e("strong",[t._v("减少组件不必要的渲染，从而优化组件的性能")])]),t._v(" "),e("p",[t._v("（3）componentWillUpdate（render调用前执行，"),e("strong",[t._v("不能调用setState")]),t._v("）")]),t._v(" "),e("p",[t._v("（4）render")]),t._v(" "),e("p",[t._v("（5）"),e("em",[e("strong",[t._v("componentDidUpdate")])])])]),t._v(" "),e("li",[e("p",[t._v("卸载阶段")]),t._v(" "),e("p",[e("em",[e("strong",[t._v("componentWillUnmount")])])]),t._v(" "),e("p",[t._v("这个方法在组件被卸载前调用，可以在这里执行一些清理工作，比如"),e("strong",[t._v("清除组件中使用的定时器，清除componentDidMount中手动创建的DOM元素")]),t._v("等")])]),t._v(" "),e("li",[e("p",[t._v("列表和key")]),t._v(" "),e("p",[t._v("React使用key属性来标记列表中的每个元素，"),e("strong",[t._v("当列表数据发生变化时，React就可以通过key知道哪些元素发生了变化，从而只重新渲染发生变化的元素，提高渲染效率")]),t._v("，但并不推荐使用索引作为key，因为一旦列表中的数据发生重排，数据的索引也会发生变化，不利于React的渲染优化")])]),t._v(" "),e("li",[e("p",[t._v("事件处理")]),t._v(" "),e("ul",[e("li",[e("p",[t._v("处理事件的响应函数要以"),e("strong",[t._v("对象的形式")]),t._v("赋值给事件属性，而不是DOM中的字符串形式")])]),t._v(" "),e("li",[e("p",[t._v("React中的事件是"),e("strong",[t._v("合成事件")]),t._v("，并不是原生的DOM事件,必修"),e("strong",[t._v("显式地调用事件对象的preventDefault方法阻止事件的默认行为")])])]),t._v(" "),e("li",[e("p",[t._v("ES6类不会为方法自动绑定this到当前对象，解决this指向问题")]),t._v(" "),e("ol",[e("li",[e("p",[e("strong",[t._v("使用箭头函数直接在render方法中为元素事件定义事件处理函数")]),t._v("，最大的问题是，每次render调用时，都会重新创建一个新的事件处理函数，带来额外的性能开销，组件所处层级越低，这种开销就越大")]),t._v(" "),e("div",{staticClass:"language-react extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("<button onClick={(e)=>{xxx}}></button>\n")])])])]),t._v(" "),e("li",[e("p",[t._v("直接将组件的方法赋值给元素的事件属性，同时在类的构造函数中，将这个方法的this绑定到当前对象")]),t._v(" "),e("div",{staticClass:"language-react extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("constructor(props) {\n    super(props);\n    this.handleClick = this.handleClick.bind(this);\n}\n")])])])]),t._v(" "),e("li",[e("p",[e("strong",[t._v("属性初始化语法")])]),t._v(" "),e("div",{staticClass:"language-react extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("// ES7会自动为class中定义的方法绑定this\nhandleClick = (e) => {\n     xxx   \n}\n<button onClick={this.handleClick}></button>\n")])])])])])])])])]),t._v(" "),e("h3",{attrs:{id:"_3-react-16新特性-基于fiber架构"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_3-react-16新特性-基于fiber架构"}},[t._v("#")]),t._v(" 3. React 16新特性——基于Fiber架构")]),t._v(" "),e("h4",{attrs:{id:"_1-render支持返回数组和字符串"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_1-render支持返回数组和字符串"}},[t._v("#")]),t._v(" 1.render支持返回数组和字符串")]),t._v(" "),e("h4",{attrs:{id:"_2-错误边界"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2-错误边界"}},[t._v("#")]),t._v(" 2.错误边界")]),t._v(" "),e("p",[t._v("部分UI的错误不应该破坏整个应用程序")]),t._v(" "),e("h4",{attrs:{id:"_3-protals-插槽"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_3-protals-插槽"}},[t._v("#")]),t._v(" 3.Protals(插槽)")]),t._v(" "),e("p",[t._v("Portals特性让我们可以把组件渲染到当前组件树以外的DOM节点上")]),t._v(" "),e("div",{staticClass:"language-react extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("ReactDOM.createProtal(child, container)\n")])])]),e("p",[t._v("第一个参数child是可以被渲染的React节点，例如React元素、由React元素组成的数组、字符串等，container是一个DOM元素，child将被挂载到这个DOM节点")]),t._v(" "),e("p",[t._v("应对css兼容性问题，如z-index、fixed、BFC等问题，全局的dialog")]),t._v(" "),e("h3",{attrs:{id:"_4-深入理解组件"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_4-深入理解组件"}},[t._v("#")]),t._v(" 4. 深入理解组件")]),t._v(" "),e("h4",{attrs:{id:"_1-state"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_1-state"}},[t._v("#")]),t._v(" 1.state")]),t._v(" "),e("ul",[e("li",[e("p",[t._v("不能直接修改state,要使用setState")])]),t._v(" "),e("li",[e("p",[e("strong",[t._v("state的更新是异步的")]),t._v("，调用setState时把要修改的状态放入一个队列中，React会优化真正的执行时机，可能会将多次setState的状态修改合并成一次状态修改，"),e("strong",[t._v("所以不要依赖当前的state来计算下一个state,同样不能依赖当前的props来计算下一个状态")])]),t._v(" "),e("p",[e("img",{attrs:{src:"https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041455041.png",alt:"image-20220118135012122"}})]),t._v(" "),e("p",[t._v("正确方法：")]),t._v(" "),e("div",{staticClass:"language-react extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("// preState是前一个状态，props是当前最新的属性props\nthis.setState((preState, props) => {\n    // isBatchingUpdates = true\n    counter: preState.quantity + 1;\n})\n// setTimeout中setState是同步的\nsetTimeout(() => {\n    // isBatchingUpdates = false\n       setState({\n        count: this.state.count + 1\n    })\n}， 1000)\n// 自己定义的DOM事件中setState是同步的\ndocument.body.addEventListener('click', this.bodyClickHandler)\n")])])])]),t._v(" "),e("li",[e("p",[t._v("state的更新是一个合并的过程")]),t._v(" "),e("p",[t._v("当调用setState修改组件状态时，只需要传入发生改变的state，而不是组件完整的state，因为组件state的更新是一个合并的过程")])]),t._v(" "),e("li",[e("p",[t._v("state被视为"),e("strong",[t._v("不可变对象")])]),t._v(" "),e("p",[e("strong",[t._v("不可变类型")]),t._v("（number string boolean null undefined）")]),t._v(" "),e("p",[t._v("数组类型（使用concat方法或扩展语法、slice()、filter()——返回一个新的数组对象）")]),t._v(" "),e("p",[e("strong",[t._v("对象类型")]),t._v("（object.assgin合并对象、扩展语法返回一个新的对象）")])])]),t._v(" "),e("h4",{attrs:{id:"_2-与服务端通信"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2-与服务端通信"}},[t._v("#")]),t._v(" 2. 与服务端通信")]),t._v(" "),e("p",[t._v("在componentDidMount阶段进行服务器通信，此时组件已经挂载且真实DOM渲染完成，是调用服务器API最安全的地方")]),t._v(" "),e("ul",[e("li",[t._v("在componentDidMount中执行服务器通信可以保证获取到数据时，组件已经处于挂载状态，这时即使要直接操作DOM也是安全")]),t._v(" "),e("li",[t._v("在componentWillMount中请求并不会比在componentDidMount中请求快多少，而在constructor中请求则会导致加载时间太长")]),t._v(" "),e("li",[t._v("当组件在服务器端渲染时，componentWillMount会被调用两次，一次是在服务器端，另一次是在浏览器端，而componentDidMount能保证在任何情况下"),e("strong",[t._v("只会被调用一次")]),t._v("，从而不会发送多余的数据请求")])]),t._v(" "),e("h4",{attrs:{id:"_3-组件间通信"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_3-组件间通信"}},[t._v("#")]),t._v(" 3. 组件间通信")]),t._v(" "),e("ul",[e("li",[e("p",[t._v("父子组件通信")]),t._v(" "),e("p",[e("strong",[t._v("子->父：父组件通过子组件的props传递给子组件一个回调函数，子组件调用这个回调函数来改变父组件数据")])])]),t._v(" "),e("li",[e("p",[t._v("兄弟组件通信")]),t._v(" "),e("p",[e("strong",[t._v("通过状态提升的方式实现，即把需要共享的状态保存在公共父组件内，通过回调函数修改共享状态")])])]),t._v(" "),e("li",[e("p",[t._v("Context")]),t._v(" "),e("p",[e("strong",[t._v("context上下文让任意层级的子组件都可以获得父组件中的状态和方法")])]),t._v(" "),e("div",{staticClass:"language-react extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("const Context = createContext();\n// 父组件中\n<Context.Provider value={color}>\n    <Child/>\n</Context.Provider>\n// 子组件中\n<Context.Consumer>{color}</Context.Consumer>\n")])])])]),t._v(" "),e("li",[e("p",[t._v("消息队列、Redux、Mobx")])])]),t._v(" "),e("h4",{attrs:{id:"_4-ref获取dom"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_4-ref获取dom"}},[t._v("#")]),t._v(" 4.ref获取DOM")]),t._v(" "),e("p",[t._v("ref接收一个"),e("strong",[t._v("回调函数")]),t._v("作为值，在组件被挂载或卸载时，回调函数会被调用，在组件被挂载时，回调函数会接收当前DOM元素作为参数；在组件被卸载时，回调函数会接收null作为参数")]),t._v(" "),e("h4",{attrs:{id:"_5-异步组件"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_5-异步组件"}},[t._v("#")]),t._v(" 5. 异步组件")]),t._v(" "),e("ul",[e("li",[t._v("import()")]),t._v(" "),e("li",[t._v("React.lazy")]),t._v(" "),e("li",[t._v("React.Suspense")])]),t._v(" "),e("div",{staticClass:"language-react extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("const Demo = React.lazy(() => import('./Demo'))\n\nclass App extends React.Component {\n    constructor(props) {\n        super(props)\n    }\n    render() {\n        return <React.Suspense fallback={<div>...loading</div>}>\n            <Demo/>\n        </React.Suspense>\n    }\n}\n")])])]),e("h4",{attrs:{id:"_6-组件声明方式"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_6-组件声明方式"}},[t._v("#")]),t._v(" 6. 组件声明方式")]),t._v(" "),e("ul",[e("li",[t._v("函数式组件: 无状态组件，不能访问this对象，不能使用生命周期方法")]),t._v(" "),e("li",[t._v("React.createClass类组件：自动绑定函数方法")]),t._v(" "),e("li",[t._v("extends React.Component类组件：需要手动在构造函数中绑定成员函数的this")])]),t._v(" "),e("h3",{attrs:{id:"_5-虚拟dom和diff算法"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_5-虚拟dom和diff算法"}},[t._v("#")]),t._v(" 5. 虚拟DOM和Diff算法")]),t._v(" "),e("ul",[e("li",[e("p",[t._v("操作真实DOM缺点：每一次对DOM的修改都会引起浏览器对网页的重新布局和重新渲染，所以尽量减少DOM操作")])]),t._v(" "),e("li",[e("p",[t._v("虚拟DOM是真实DOM的抽象，使用JS对象描述DOM元素")]),t._v(" "),e("div",{staticClass:"language-react extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("// 真实DOM\n<div className = \"foo\">\n    <h1>Hello</h1>\n</div>\n// 虚拟DOM\n{\n    type: 'div',\n     props: {\n        className: 'h1',\n         children: {\n             type: 'h1',\n             props: {\n                 children: 'Hello'\n             }\n         }\n     }\n}\n")])])])]),t._v(" "),e("li",[e("p",[t._v("DIff算法 O(n)：React会通过"),e("strong",[t._v("比较两次虚拟DOM结构的变化")]),t._v("找出差异部分，更新到真实DOM上，从而减少最终要在真实DOM上执行的操作，提高程序执行效率")]),t._v(" "),e("ol",[e("li",[e("p",[t._v("根节点是不同类型：")]),t._v(" "),e("p",[t._v("DOM元素类型（旧DOM节点被销毁，新DOM元素插入DOM树中）")]),t._v(" "),e("p",[t._v("React组件类型(旧的组件实例的componentWillUnmount被调用，新的组件实例componentWillMount和componentDidMount调用)")])]),t._v(" "),e("li",[e("p",[t._v("根节点是相同DOM元素类型")]),t._v(" "),e("p",[t._v("React保留根节点，比较根节点的"),e("strong",[t._v("属性")]),t._v("，只更新变化了的属性")])]),t._v(" "),e("li",[e("p",[t._v("根节点是相同的组件类型")]),t._v(" "),e("p",[t._v("执行组件实例的componentWillReceiveProps() componentWillUpdate()")])])])])]),t._v(" "),e("h3",{attrs:{id:"_6-高阶组件"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_6-高阶组件"}},[t._v("#")]),t._v(" 6. 高阶组件")]),t._v(" "),e("blockquote",[e("p",[t._v("高阶组件（简称HOC）接收React组件作为参数，并且返回一个新的React组件")])]),t._v(" "),e("p",[t._v("高阶组件的主要功能是"),e("strong",[t._v("封装并分离组件的通用逻辑")]),t._v("，让通用逻辑在组件间更好地被复用")]),t._v(" "),e("p",[t._v("高阶组件最适合使用的地方是在"),e("strong",[t._v("组件定义的外部")]),t._v("，这样就不会受到组件生命周期的影响")]),t._v(" "),e("div",{staticClass:"language-react extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("import React, { Component } from 'react'\n// 代理方式实现\n// 高阶函数，添加ComponentWillMount方法\nfunction withPersistentData(WrappedComponent) {\n    return class extends Componet {\n        componentWillMount() {\n            let data = localStorage.getItem('data');\n            this.setState({data};\n        }\n\n        render() {\n            return <WrappedComponent data={this.state.data} {...this.props} />\n        }\n    }\n}\n\nclass MyComponent extends Component {\n    render() {\n        return <div>{this.props.data}</div>\n    }\n}\n\nconst MyComponentWithPersistentData = withPersistentData(MyComponent);\n")])])]),e("ul",[e("li",[e("p",[t._v("操纵props")]),t._v(" "),e("p",[t._v("在被包装组件接收props前，高阶组件可以先拦截到props，对props执行增加、删除或修改的操作，然后将处理后的props再传递给被包装组件")])]),t._v(" "),e("li",[e("p",[t._v("通过ref访问组件实例")]),t._v(" "),e("p",[t._v("高阶组件通过ref获取被包装组件实例的引用，然后高阶组件就具备了直接操作被包装组件的属性或方法的能力")]),t._v(" "),e("div",{staticClass:"language-react extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("function withRef(wrappedComponent) {\n    return class extends React.Component {\n        constructor(props) {\n            super(props);\n            this.someMethod = this.someMethod.bind(this);\n        }\n        someMethod() {\n            this.wrappedInstance.somMethodInWrappedComponent();\n        }\n\n        render() {\n            // 通过ref 访问被包装组件的实例\n            return <WrappedComponent ref=((instance) => {this.wrappedInstance = instance}) {...this.props} />\n        }\n    }\n}\n")])])])]),t._v(" "),e("li",[e("p",[t._v("组件状态提升")]),t._v(" "),e("p",[t._v("高阶组件可以通过将被包装组件的状态及相应的状态处理方法提升到高阶组件自身内部实现被包装组件的无状态化，"),e("strong",[t._v("利用高阶组件将原本受控组件需要自己维护的状态统一提升到高阶组件中")])])]),t._v(" "),e("li",[e("p",[t._v("用其他元素包装组件")])]),t._v(" "),e("li",[e("p",[e("strong",[t._v("参数传递")])]),t._v(" "),e("p",[t._v("高阶组件的参数并非只能是一个组件，它还可以接收其他参数")]),t._v(" "),e("div",{staticClass:"language-react extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("HOC(...params) (wrappedComponent)\n\nfunction withPersistentData = (key) => (wrappedComponent) => {\n    // xxx\n}\n\nconst MycomponentWithPersistentData = withPersistentData('data')(MyComponent);\n")])])]),e("p",[t._v("还可以使用工具函数compose(...func),调用compose(f, g, h)等价于(...args) =>f(g(h(...args)))")])])]),t._v(" "),e("h3",{attrs:{id:"_7-性能优化"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_7-性能优化"}},[t._v("#")]),t._v(" 7. 性能优化")]),t._v(" "),e("ul",[e("li",[e("p",[t._v("SCU（shouldComponentUpdate）")]),t._v(" "),e("p",[t._v("父组件更新，子组件无条件更新(需要在子组件SCU判断)")]),t._v(" "),e("div",{staticClass:"language-react extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("shouldComponentUpdate(nextProps, nextState) {\n    if (nextState.count !== this.state.count) {\n        return true // 可以渲染\n    }\n    return false  // 不重复渲染\n}\n")])])])]),t._v(" "),e("li",[e("p",[t._v("PureComponent(类组件)和React.memo(函数式组件)")]),t._v(" "),e("p",[t._v("尽量浅比较")]),t._v(" "),e("div",{staticClass:"language-react extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("class Demo extends React.PureComponent {\n    // \n}\n")])])]),e("p",[e("img",{attrs:{src:"https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041455042.png",alt:"image-20220118133345356"}})])]),t._v(" "),e("li",[e("p",[t._v("不可变值immutable.js")])])]),t._v(" "),e("h3",{attrs:{id:"_8-render-props"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_8-render-props"}},[t._v("#")]),t._v(" 8. Render Props")]),t._v(" "),e("p",[t._v("通过一个函数将class组件的state作为props传递给纯函数组件")]),t._v(" "),e("div",{staticClass:"language-react extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("class Factory extends React.Component {\n    constructor() {\n        this.state = {}\n    }\n    render() {\n        return <div>this.props.render(this.state)</div>\n    }\n}\n\nconst App = () => {\n    <Factory render={(props) => <p>{props.a}</p>}></Factory>\n}\n")])])])])}),[],!1,null,null,null);a.default=n.exports}}]);