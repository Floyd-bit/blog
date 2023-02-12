---
title: Redux学习
date: 2021-08-24 11:14:16
tags: react
description: Redux学习
---

### 1. Redux工作流程

![img](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041455610.jpg)

### 2.创建Redux中的仓库

```react
// npm install --save redux

// store/index.js
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer) // 创建数据存储仓库

export default store
```

```react
// store/reducer.js
const defaultState = {
    inputValue: 'Write Something',
    list: [
        'xxx',
        'xxxx'
    ]
}
export default (state = defaultState, action) => { // state指原始仓库里的状态，action指action新传递的状态
    if(action.type === 'changeInput'){
        let newState = JSON.parse(JSON.stringify(state)) // 深度拷贝state
        newState.inputValue = action.value
        return newState
    }
    return state
}
```

```react
// src/TodoList.js
import React, { Component } from 'react';
import 'antd/dist/antd.css'
import { Input , Button , List } from 'antd'
import store from './store'

class TodoList extends Component {
constructor(props){
    super(props)
    //关键代码-----------start
    this.state=store.getState();
    //关键代码-----------end
    this.changeInputValue = this.changeInputValue.bind(this) // 修改this的指向
    this.storeChange = this.storeChange.bind(this)
    store.subscribe(this.storeChange) // 订阅Redux的状态
}
changeInputValue(e) {
    // console.log(e.target.value)
    // 改变Redux中的state的值要通过Action
    const action = {
        type: 'change_input_value', // 对action的描述
        value: e.target.value // 要改变的值
    }
    store.dispatch(action) // 通过dispatch()方法把action传递给store
}
storeChange(){
    this.setState(store.getState) // store中状态改变时更新state
}
    render() { 
        return ( 
            <div style={{margin:'10px'}}>
                <div>
                    <Input 
                        placeholder={this.state.inputValue} 
                        style={{ width:'250px', marginRight:'10px'}}
                        onChange={this.changeInputValue}
                     />
                    <Button type="primary">增加</Button>
                </div>
                <div style={{margin:'10px',width:'300px'}}>
                    <List
                        bordered
                        //关键代码-----------start
                        dataSource={this.state.list}
                        //关键代码-----------end
                        renderItem={item=>(<List.Item>{item}</List.Item>)}
                    />    
                </div>
            </div>
         );
    }
}
export default TodoList;
```

### 3. Axios与Redux结合

在componentDidMount()中通过axios获取数据

```react
export const getListAction = (data) => ({
    type: GET_LIST,
    data
})

componentDidMount() {
    axios.get('xxxx'.then(res=>{
        const data = res.data
        const action = getListAction(data)
        store.dispatch(action)
    }))
}
```

### 4. Redux-thunk中间件

应用场景：**在`Dispatch`一个`Action`之后，到达`reducer`之前，进行一些额外的操作**

在实际工作中你可以使用中间件来进行**日志记录、创建崩溃报告，调用异步接口或者路由**

```react
// npm install --save redux-thunk
import { createStore , applyMiddleware } from 'redux' 
import thunk from 'redux-thunk'
const store = createStore(
    reducer,
    applyMiddleware(thunk)
) // 创建数据存储仓库
export default store   //暴露出去
```

```react
// actionCreators.js

import axios from 'axios'
...something...
export const getTodoList = () =>{
    return (dispatch)=>{
        axios.get('https://www.easy-mock.com/mock/5cfcce489dc7c36bd6da2c99/xiaojiejie/getList').then((res)=>{
            const data = res.data
            const action = getListAction(data)
            dispatch(action)
            // console.log(data)
        })
    }
}
```

```react
// TodoList.js

//先引入getTodoList
import {getTodoList , changeInputAction , addItemAction ,deleteItemAction,getListAction} from './store/actionCreatores'
---something---
componentDidMount(){
    const action = getTodoList()
    store.dispatch(action)
}
```

### 5. React-Redux

- Provider
  
  Provider相当于顶级组件，这样所有组件都可以在react-redux的控制下，**store必须作为参数放到Provider组件中**
  
  ```react
  import { createStore } from 'redux';
  const reducer = (state, action) => {
  
  }
  const store = createStore(reducer);
  <Provider store={store}>
      <App/>
  </Provider>
  ```

- connect(**HOC典型应用**)
  
  ```react
  connect(mapStateToProps, mapDispathToProps)(MyComponent)
  ```
  
  - mapStateToProps 将Redux中的数据映射到React中的props中
    
    ```react
    const mapStateToProps = (state) => {
        return {
            foo: state.bar
        }
    }
    
    class Foo extends Component {
        constructor(props) {
            super(props);
        }
           render() {
            return (
                <div>this.props.foo</div>
            )
        }
    }
    Foo = connect(mapStateToProps)(Foo);
    ```
  
  - mapDispatchToProps 将各种dispatch也变成props可以直接使用
    
    ```react
    const mapDispatchToProps = (dispatch) => {
        return {
            onClick: () => {
                dispatch({
                    type: 'add'
                })
            }
        }
    }
    
    class Foo extends Component {
        constructor(props) {
            super(props);
        }
        render() {
            return(
                <button onClick={this.props.onClick}></button>
            )
        }
    }
    Foo = connect()(Foo);
    ```
  
  ### 6. Hooks——useSelector 、useDispatch
  
  - useSelector
    
    子组件通过useSelector访问state
    
    ```react
    import React from "react";
    import { createStore } from "redux";
    import { Provider, useSelector, useDispatch } from "react-redux";
    
    const initialState = { num: 0 }
    const reducer = (state, action) => {}
    // createStore将state存入store
    const store = createStore(reducer, initialState);
    
    const Component = () => {
        return (
            // Provoder向子组件暴露store,通过store在父子组件间共享状态
            <Provider store={store}>
                <Children/>
            </Provider>
        )
    }
    
    const Children = () => {
        // useSelector使子组件可以直接访问state，相当于mapStateToProps的语法糖
        const num = useSelector(state => state.num);
        // 相当于mapDispatchToProps的语法糖
        const dispatch = useDispatch();
        return (
            Number: {num}
            <button onClick={() => dispatch({type: 'add'})></button>
        )
    }
    ```

- useDispatch

### 7. 使用useReducer和useContext代替redux

react-redux中通过connect的方式使用高阶组件进行来凝结，造成模板代码较多

- reducer实现

```javascript
const reducer = (state, action) => {
    switch(action.type) {
        case ADD:
             ...
    }
}

```

- context实现跨组件数据共享，使不同组件可以访问到state和dispatch
  
  ```javascript
  export TodoProvider = ({children}) => {
      const TodoContext = React.createContext(null);
      const [state, dispatch] = useReducer(reducer);
      const context = {
          state,
          dispatch
      }
      return <TodoContext.Provider value={context}>
          {children}
      </TodoContext.Privider>
  }
  ```
