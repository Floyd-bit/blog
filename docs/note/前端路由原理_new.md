**SPA（单页面应用）需要路由**

### 1. Hash路由

- url中带#, 例如`www.abc.com/#/vue`, 它的hash值是`#/vue`

- hash变化会触发网页跳转，即浏览器的前进后退，且**不会刷新页面**（页面的hash与对应的url关联起来）

- 触发hash变化：js修改url   手动修改url的hash   浏览器前进后退

```js
// hash模式通过window的onhashchange事件监听并加载响应的代码
window.onhashchange = function(event) {
    console.log(event,oldURL, event.newURL);
}
```

### 2. History路由

- **url规范**的路由，跳转时不刷新页面
- 需要**后端配置**，始终返回index.html，若后台没有配置正确则会返回404
- `history.pushState()` 或 `history.replaceState()` 不会触发 `popstate` 事件，这时我们需要手动触发页面渲染

```js
// history.go()  history.forward() history.back() 浏览器跳转、前进、后退
// history.pushState() history.replaceState() 修改浏览器的历史记录
const state = {name: 'page1'}
history.pushState(state, '', 'page1')
window.onpopstate = (event) => {
    // 监听浏览器前进后退
}
```

### 3. 区别

- history路由模式通过pushState方法设置的新URL可以是**与当前URL同源的任意URL**；而hash只可修改#后的部分，因此只能设置**与当前URL同文档的URL**
- pushState设置的新的URL可以和当前URL一样，也会把记录添加到历史记录栈中；而hash设置的新值必须与原来不一样才会添加
- pushState通过stateObject参数可以添加任意类型数据，而hash只能添加短字符串
