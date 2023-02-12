(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{622:function(t,e,a){"use strict";a.r(e);var n=a(11),s=Object(n.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h3",{attrs:{id:"_1-redux工作流程"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-redux工作流程"}},[t._v("#")]),t._v(" 1. Redux工作流程")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041455610.jpg",alt:"img"}})]),t._v(" "),a("h3",{attrs:{id:"_2-创建redux中的仓库"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-创建redux中的仓库"}},[t._v("#")]),t._v(" 2.创建Redux中的仓库")]),t._v(" "),a("div",{staticClass:"language-react extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("// npm install --save redux\n\n// store/index.js\nimport { createStore } from 'redux'\nimport reducer from './reducer'\n\nconst store = createStore(reducer) // 创建数据存储仓库\n\nexport default store\n")])])]),a("div",{staticClass:"language-react extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("// store/reducer.js\nconst defaultState = {\n    inputValue: 'Write Something',\n    list: [\n        'xxx',\n        'xxxx'\n    ]\n}\nexport default (state = defaultState, action) => { // state指原始仓库里的状态，action指action新传递的状态\n    if(action.type === 'changeInput'){\n        let newState = JSON.parse(JSON.stringify(state)) // 深度拷贝state\n        newState.inputValue = action.value\n        return newState\n    }\n    return state\n}\n")])])]),a("div",{staticClass:"language-react extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("// src/TodoList.js\nimport React, { Component } from 'react';\nimport 'antd/dist/antd.css'\nimport { Input , Button , List } from 'antd'\nimport store from './store'\n\nclass TodoList extends Component {\nconstructor(props){\n    super(props)\n    //关键代码-----------start\n    this.state=store.getState();\n    //关键代码-----------end\n    this.changeInputValue = this.changeInputValue.bind(this) // 修改this的指向\n    this.storeChange = this.storeChange.bind(this)\n    store.subscribe(this.storeChange) // 订阅Redux的状态\n}\nchangeInputValue(e) {\n    // console.log(e.target.value)\n    // 改变Redux中的state的值要通过Action\n    const action = {\n        type: 'change_input_value', // 对action的描述\n        value: e.target.value // 要改变的值\n    }\n    store.dispatch(action) // 通过dispatch()方法把action传递给store\n}\nstoreChange(){\n    this.setState(store.getState) // store中状态改变时更新state\n}\n    render() { \n        return ( \n            <div style={{margin:'10px'}}>\n                <div>\n                    <Input \n                        placeholder={this.state.inputValue} \n                        style={{ width:'250px', marginRight:'10px'}}\n                        onChange={this.changeInputValue}\n                     />\n                    <Button type=\"primary\">增加</Button>\n                </div>\n                <div style={{margin:'10px',width:'300px'}}>\n                    <List\n                        bordered\n                        //关键代码-----------start\n                        dataSource={this.state.list}\n                        //关键代码-----------end\n                        renderItem={item=>(<List.Item>{item}</List.Item>)}\n                    />    \n                </div>\n            </div>\n         );\n    }\n}\nexport default TodoList;\n")])])]),a("h3",{attrs:{id:"_3-axios与redux结合"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-axios与redux结合"}},[t._v("#")]),t._v(" 3. Axios与Redux结合")]),t._v(" "),a("p",[t._v("在componentDidMount()中通过axios获取数据")]),t._v(" "),a("div",{staticClass:"language-react extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("export const getListAction = (data) => ({\n    type: GET_LIST,\n    data\n})\n\ncomponentDidMount() {\n    axios.get('xxxx'.then(res=>{\n        const data = res.data\n        const action = getListAction(data)\n        store.dispatch(action)\n    }))\n}\n")])])]),a("h3",{attrs:{id:"_4-redux-thunk中间件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-redux-thunk中间件"}},[t._v("#")]),t._v(" 4. Redux-thunk中间件")]),t._v(" "),a("p",[t._v("应用场景："),a("strong",[t._v("在"),a("code",[t._v("Dispatch")]),t._v("一个"),a("code",[t._v("Action")]),t._v("之后，到达"),a("code",[t._v("reducer")]),t._v("之前，进行一些额外的操作")])]),t._v(" "),a("p",[t._v("在实际工作中你可以使用中间件来进行"),a("strong",[t._v("日志记录、创建崩溃报告，调用异步接口或者路由")])]),t._v(" "),a("div",{staticClass:"language-react extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("// npm install --save redux-thunk\nimport { createStore , applyMiddleware } from 'redux' \nimport thunk from 'redux-thunk'\nconst store = createStore(\n    reducer,\n    applyMiddleware(thunk)\n) // 创建数据存储仓库\nexport default store   //暴露出去\n")])])]),a("div",{staticClass:"language-react extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("// actionCreators.js\n\nimport axios from 'axios'\n...something...\nexport const getTodoList = () =>{\n    return (dispatch)=>{\n        axios.get('https://www.easy-mock.com/mock/5cfcce489dc7c36bd6da2c99/xiaojiejie/getList').then((res)=>{\n            const data = res.data\n            const action = getListAction(data)\n            dispatch(action)\n            // console.log(data)\n        })\n    }\n}\n")])])]),a("div",{staticClass:"language-react extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("// TodoList.js\n\n//先引入getTodoList\nimport {getTodoList , changeInputAction , addItemAction ,deleteItemAction,getListAction} from './store/actionCreatores'\n---something---\ncomponentDidMount(){\n    const action = getTodoList()\n    store.dispatch(action)\n}\n")])])]),a("h3",{attrs:{id:"_5-react-redux"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5-react-redux"}},[t._v("#")]),t._v(" 5. React-Redux")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("Provider")]),t._v(" "),a("p",[t._v("Provider相当于顶级组件，这样所有组件都可以在react-redux的控制下，"),a("strong",[t._v("store必须作为参数放到Provider组件中")])]),t._v(" "),a("div",{staticClass:"language-react extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("import { createStore } from 'redux';\nconst reducer = (state, action) => {\n\n}\nconst store = createStore(reducer);\n<Provider store={store}>\n    <App/>\n</Provider>\n")])])])]),t._v(" "),a("li",[a("p",[t._v("connect("),a("strong",[t._v("HOC典型应用")]),t._v(")")]),t._v(" "),a("div",{staticClass:"language-react extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("connect(mapStateToProps, mapDispathToProps)(MyComponent)\n")])])]),a("ul",[a("li",[a("p",[t._v("mapStateToProps 将Redux中的数据映射到React中的props中")]),t._v(" "),a("div",{staticClass:"language-react extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("const mapStateToProps = (state) => {\n    return {\n        foo: state.bar\n    }\n}\n\nclass Foo extends Component {\n    constructor(props) {\n        super(props);\n    }\n       render() {\n        return (\n            <div>this.props.foo</div>\n        )\n    }\n}\nFoo = connect(mapStateToProps)(Foo);\n")])])])]),t._v(" "),a("li",[a("p",[t._v("mapDispatchToProps 将各种dispatch也变成props可以直接使用")]),t._v(" "),a("div",{staticClass:"language-react extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("const mapDispatchToProps = (dispatch) => {\n    return {\n        onClick: () => {\n            dispatch({\n                type: 'add'\n            })\n        }\n    }\n}\n\nclass Foo extends Component {\n    constructor(props) {\n        super(props);\n    }\n    render() {\n        return(\n            <button onClick={this.props.onClick}></button>\n        )\n    }\n}\nFoo = connect()(Foo);\n")])])])])]),t._v(" "),a("h3",{attrs:{id:"_6-hooks-useselector-、usedispatch"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_6-hooks-useselector-、usedispatch"}},[t._v("#")]),t._v(" 6. Hooks——useSelector 、useDispatch")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("useSelector")]),t._v(" "),a("p",[t._v("子组件通过useSelector访问state")]),t._v(" "),a("div",{staticClass:"language-react extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('import React from "react";\nimport { createStore } from "redux";\nimport { Provider, useSelector, useDispatch } from "react-redux";\n\nconst initialState = { num: 0 }\nconst reducer = (state, action) => {}\n// createStore将state存入store\nconst store = createStore(reducer, initialState);\n\nconst Component = () => {\n    return (\n        // Provoder向子组件暴露store,通过store在父子组件间共享状态\n        <Provider store={store}>\n            <Children/>\n        </Provider>\n    )\n}\n\nconst Children = () => {\n    // useSelector使子组件可以直接访问state，相当于mapStateToProps的语法糖\n    const num = useSelector(state => state.num);\n    // 相当于mapDispatchToProps的语法糖\n    const dispatch = useDispatch();\n    return (\n        Number: {num}\n        <button onClick={() => dispatch({type: \'add\'})></button>\n    )\n}\n')])])])])])]),t._v(" "),a("li",[a("p",[t._v("useDispatch")])])]),t._v(" "),a("h3",{attrs:{id:"_7-使用usereducer和usecontext代替redux"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_7-使用usereducer和usecontext代替redux"}},[t._v("#")]),t._v(" 7. 使用useReducer和useContext代替redux")]),t._v(" "),a("p",[t._v("react-redux中通过connect的方式使用高阶组件进行来凝结，造成模板代码较多")]),t._v(" "),a("ul",[a("li",[t._v("reducer实现")])]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("reducer")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("state"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" action")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("switch")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("action"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("type"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("case")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("ADD")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("\n             "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n")])])]),a("ul",[a("li",[a("p",[t._v("context实现跨组件数据共享，使不同组件可以访问到state和dispatch")]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("TodoProvider")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("children"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" TodoContext "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" React"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("createContext")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("state"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" dispatch"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("useReducer")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("reducer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" context "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        state"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        dispatch\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("TodoContext"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Provider value"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("context"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("children"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("TodoContext"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Privider"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])])])])}),[],!1,null,null,null);e.default=s.exports}}]);