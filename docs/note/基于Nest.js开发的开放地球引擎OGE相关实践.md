## 基于Nest.js开发的开放地球引擎OGE相关实践

### 1. 前言

​	OGE开放地球引擎项目是武汉大学遥感与信息工程学院龚健雅院士团队研发的一个遥感时空信息分析平台。它的核心功能包括`遥感卫星影像检索`、`在线遥感时空数据分析`等，包括`首页`、`资源中心`、`开发中心`、`应用中心`四个模块。其中我主要负责开发中心中的**代码编辑器**、**可视化地球**、**控制台**以及资源中心的**高级检索**页面的开发。下图分别是高级检索页面和开发中心页面：

![img](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202403071156313.jpeg)

![img](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202403071156485.png)

​	其实在我加入开发之前，遥感团队已经使用vue2开发过一版原型系统。不过初版系统的体验比较糟糕，首次加载时间甚至能达到二十多秒之久，一个原因是他们是使用了**低代码工具**来开发，这样的代码肯定不能保证最佳性能，另外一个很重要的原因是开发中心的python脚本运行环境放在前端用**pyscript**(利用WASM在浏览器提供python runtime)执行，导致需要引入一个**22MB**的依赖。从团队协作和开发体验的角度看，初版系统**没有形成统一的团队规范**且使用JS开发，导致代码管理混乱，代码质量差，这其实也是前端体验不好的一个原因。所以遥感院想要我们来重构一下前端，最主要的目的是优化前端性能，其次也招募了专业的产品经历和UI来重构界面设计。

​	基于以上考虑，加快首屏渲染，优化前端交互卡顿问题成为重构的主要需求。因为系统的首页是一个宣传页，大多是静态展示内容，没有太多交互，同时也有一定的SEO需求，所以我们考虑使用SSR来加快首屏渲染。此外，系统的核心功能开发中心涉及到Web IDE、Cesium、模型编辑器等重交互功能，我们在开发中心还是需要使用CSR渲染。最终我们选择**Next.js** + **TS**进行重构，Next.js支持CSR（客户端渲染）、SSR（请求时渲染页面）、SSG（预渲染页面），并且它有活跃的社区。新版我们使用TS进行开发，虽然在开发阶段增加了一部分代码量，但是却在修复错误和维护代码时带来了很大的方便。TS可以帮助我们在代码编写阶段就检查出类型错误，并且完整的类型提示使我们更容易理解别人的代码，带来的好处远远大于多余的工作量。并且我们引入了`commitlint`、`eslint`、`husky`、`stylelint`、`prettier`工具来约束团队成员的代码规范和Git提交规范，也制定了`git workflow`进行代码版本管理，包括`mian`、`develop`、`feature/xxx`、`fix/xxx`分支，开发新功能时从develop分支新建feature/xxx分支，开发完成后合并到develop分支上，大版本开发完成后从develop分支合并到main分支上。

​	经过三个月的重构，最终Chrome LightHouse给出的`First Contentful Paint`（首屏渲染时间）降到**0.3s**，`Total Blocking Time`（页面阻塞时间）降到0，基本上可以达到秒开的效果。并且OGE也成功在空天信息技术与产业发展研讨会上正式发布，上线运行。

### 2. Next.js SSR实践 

网页渲染模式

[揭秘同构渲染，nextjs初体验 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/564818428)

- CSR

  ![img](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202403071156707.webp)

  ​	CSR是现在主流的前端SPA网页开发模式，它的优点在于可以局部刷新，但缺点在于`白屏问题`和不利于`SEO`。白屏问题是因为CSR首先会请求得到一个空HTML页面，然后再去加载JS和CSS渲染页面。

- SSR

  ​	SSR模式下服务端直接渲染好HTML返回给前端，它解决了白屏问题和SEO优化，但是会导致任何页面的改动都需要`全局刷新`。

- 同构

  ​	其实可以将SSR和CSR相结合，**第一次访问页面是服务端渲染，基于第一次访问后续的交互就是 SPA 的效果和体验**，**还不影响SEO 效果**。

  ![img](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202403071156929.webp)

Next.js提供的渲染策略

[讲清楚 Next.js 里的 CSR, SSR, SSG 和 ISR - 掘金 (juejin.cn)](https://juejin.cn/post/7273674732447711295#heading-0)

- CSR

  useEffect是在客户端执行的，可以使用useEffect在客户端获取数据。

- SSR

  ​	要使用服务器端渲染，需要导出一个名为 `getServerSideProps` 的异步函数。服务器将在每次请求页面时优先调用该函数。可以在getServerSideProps函数中请求数据并返回一个props对象，它会作为props传给React组件。

- SSG

  ​	如果在页面上导出一个`getStaticProps`函数，那么nextjs将采用服务端预渲染模式。此时页面 HTML 是在构建时生成的，将在每个请求上重复使用，也可以由 CDN 缓存。也就是说如果要更新页面内容，必须重新构建。

- ISR

  ​	增量静态再生（ISR）建立在 SSG 的基础上，同时又有 SSR 的优点，ISR 允许页面的某些部分是静态的，而其他部分则可以在数据发生变化时动态渲染。ISR 在性能和内容更新之间取得了平衡，因此适用于内容经常更新的站点。

  ​	当我们使用 `revalidate`选项时，Next.js 会在 build 时调用一次`getStaticProps`，部署生产后，Next.js 还会在达到`revalidate`设置的时间间隔后再次运行`getStaticProps`，以此更新内容。

### 3. WebIDE

#### 3.1 Monaco实现IDE

```js
monaco.editor.create(editorRef.current!, {
    language: lang,
    value,
    minimap: { enabled: false },
    formatOnPaste: true,
	automaticLayout: true,
});
```

#### 3.2 LSP实现智能语法补全

​	monaco内置了html、css、json、js/ts的语法提示，通过web worker的形式实现。

```js
  // json、js、ts语言的webworker
  self.MonacoEnvironment = {
    getWorker: (workerId, label) => {
      if (label === "json") {
        return new Worker(
          new URL(
            "monaco-editor/esm/vs/language/json/json.worker?worker",
            import.meta.url
          )
        );
      }
      if (label === "javascript" || label === "typescript") {
        return new Worker(
          new URL(
            "monaco-editor/esm/vs/language/typescript/ts.worker?worker",
            import.meta.url
          )
        );
      }
      return new Worker(
        new URL(
          "monaco-editor/esm/vs/editor/editor.worker?worker",
          import.meta.url
        )
      );
    },
  };
```

​	对于其他语言的语法提示，则需要结合LSP服务实现。项目中主要编写的代码是python，可通过`monaco-languageclient`+ `jsonrpc-ws-proxy`+`python-language-server`实现。

> [**LSP(Language Server Protocol)** ](https://link.juejin.cn/?target=https%3A%2F%2Fmicrosoft.github.io%2Flanguage-server-protocol%2F)**语言服务协议**，此协议定义了在编辑器或IDE与语言服务器之间使用的通信规范，该语言服务器提供了例如自动补全，转到定义，查找所有引用等的功能

[基于 Monaco Editor & LSP 打造智能 IDE - 掘金 (juejin.cn)](https://juejin.cn/post/7108913087613829151)

​	LSP是基于`JSON-RPC`实现语言服务和编辑器之间通信的，它是一种基于json的跨语言远程过程调用协议。由于浏览器运行在web端无法直接通过rpc与LSP Server通信，所以需要一个代理服务器。monaco-languageclient将数据转换成`jsonrpc`后通过`websocket`发送给`jsonrpc-ws-proxy`，然后代理服务再通过`线程间数据流`的方式进行通信。

![image-20240305235420121](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202403071156185.png)

#### 3.3 SEE日志推送

- 轮询
- websocket
- SEE

### 4. Cesium 三维地球

图层

天地图key

上图：WSTM、图片

请求防抖

webwoker GIS计算

### 5. 其他

docked-layout  ref + useimperative  dynamic

immer.js

useRef -> useState 

### 6. 部署

next build，生成的.next目录就是打包后的包

在服务器上执行next start --port 10001

全局安装pm2(node进程保护)

项目下执行pm2 start deploy.js -i max --name lemon-web 这行代码的含义是，以集群模式部署，并且已当前机器有几个CPU就启动几个进程

nginx配置里添加upstream，完成负载均衡