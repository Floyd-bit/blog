### 1. 历史版本

React-Router V6

| 组件名      | 作用           | 说明                                                         |
| ----------- | -------------- | ------------------------------------------------------------ |
| `<Routers>` | 一组路由       | 代替原有`<Switch>`，所有子路由都用基础的Router children来表示 |
| `<Router>`  | 基础路由       | Router是可以嵌套的，解决原有V5中严格模式，后面与V5区别会详细介绍 |
| `<Link>`    | 导航组件       | 在实际页面中跳转使用                                         |
| `<Outlet/>` | 自适应渲染组件 | 根据实际路由url自动选择组件                                  |

| hooks名           | 作用                                  | 说明                      |
| ----------------- | ------------------------------------- | ------------------------- |
| `useParams`       | 返回当前参数                          | 根据路径读取参数          |
| `useNavigate`     | 返回当前路由                          | 代替原有V5中的 useHistory |
| `useOutlet`       | 返回根据路由生成的element             |                           |
| `useLocation`     | 返回当前的location 对象               |                           |
| `useRoutes`       | 同Routers组件一样，只不过是在js中使用 |                           |
| `useSearchParams` | 用来匹配URL中?后面的搜索参数          |                           |

```react
     <Routes>
       <!-- index指定默认子路由 -->
       <Route index path="/" element={<Home />} />
       <Route path="about" element={<About />} />
       <!-- 嵌套路由 -->
       <Route path="users" element={<User />}>
         <Route path=":id" element={<UserDetail />} />
         <Route path="create" element={<NewUser />} />
       <Route />
     </Routes>
```

React-Router V5

- 使用\<Route>组件
- 结合使用\<Switch>和\<Route>组件
- 使用\<Link>、\<Redirect>组件

```react
     <Switch>
       <Route exact path="/">
         <Home />
       </Route>
       <Route path="/about">
         <About />
       </Route>
       <Route path="/users/:id" children={<User />} />
     </Switch>
```

React-Router V3

```react
const App = () => (
  <Router
    routes={[
      { path: '/home', component: <Home /> },
      { path: '/articles', component: <Articles /> }
    ]}
  />
)

const Home = () => (
  <div>
    home, <Link href="/articles">go articles</Link>,
    <span onClick={() => navigate('/details')}>or jump to details</span>
  </div>
)
```

### 2. V3版本源码解析

- Router

  分析：Router需要接收routes参数，根据当前url地址判断渲染哪个组件；当url地址变化时，渲染新的url对应的组件

  实现：使用history路由时，浏览器的前进后退或地址栏输入url会触发popstate事件。Router在state中保存当前的url，并监听popstate事件，当路由改变时更新state，返回对应的组件并渲染。

  ```react
  export default function Router ({ routes }) {
    // 存储当前 url path，方便其变化时引发自身重渲染，以返回新的 url 对应的组件
    const [currentPath, setCurrentPath] = useState(window.location.pathname);
  
    useEffect(() => {
      const onLocationChange = () => {
        // 将 url path 更新到当前数据流中，触发自身重渲染
        setCurrentPath(window.location.pathname);
      }
  
      // 监听 popstate 事件，该事件由用户点击浏览器前进/后退时触发
      window.addEventListener('popstate', onLocationChange);
  
      return () => window.removeEventListener('popstate', onLocationChange)
    }, [])
  
    // 找到匹配当前 url 路径的组件并渲染
    return routes.find(({ path, component }) => path === currentPath)?.component
  }
  ```

- navigate, 调用式函数

  实现：使用单页跳转API history.pushState, 须手动触发popstate事件

  ```react
  export function navigate (href) {
    // 用 pushState 直接刷新 url，而不触发真正的浏览器跳转
    window.history.pushState({}, "", href);
  
    // 手动触发一次 popstate，让 Route 组件监听并触发 onLocationChange
    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);
  }
  ```

- Link，内置navigate能力的a标签，并且当按住ctrl时打开新tab页(a标签默认行为)

  实现：利用a标签实现，正常点击时阻止a标签默认行为并触发navigate函数，按住ctrl时默认执行

  ```react
  export function Link ({ className, href, children }) {
    const onClick = (event) => {
      // mac 的 meta or windows 的 ctrl 都会打开新 tab
      // 所以此时不做定制处理，直接 return 用原生行为即可
      if (event.metaKey || event.ctrlKey) {
        return;
      }
  
      // 否则禁用原生跳转
      event.preventDefault();
  
      // 做一次单页跳转
      navigate(href)
    };
  
    return (
      <a className={className} href={href} onClick={onClick}>
        {children}
      </a>
    );
  };
  ```

  