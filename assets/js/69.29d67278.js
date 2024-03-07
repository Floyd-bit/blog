(window.webpackJsonp=window.webpackJsonp||[]).push([[69],{670:function(t,s,a){"use strict";a.r(s);var e=a(11),n=Object(e.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h2",{attrs:{id:"基于nest-js开发的开放地球引擎oge相关实践"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#基于nest-js开发的开放地球引擎oge相关实践"}},[t._v("#")]),t._v(" 基于Nest.js开发的开放地球引擎OGE相关实践")]),t._v(" "),a("h3",{attrs:{id:"_1-前言"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-前言"}},[t._v("#")]),t._v(" 1. 前言")]),t._v(" "),a("p",[t._v("​\tOGE开放地球引擎项目是武汉大学遥感与信息工程学院龚健雅院士团队研发的一个遥感时空信息分析平台。它的核心功能包括"),a("code",[t._v("遥感卫星影像检索")]),t._v("、"),a("code",[t._v("在线遥感时空数据分析")]),t._v("等，包括"),a("code",[t._v("首页")]),t._v("、"),a("code",[t._v("资源中心")]),t._v("、"),a("code",[t._v("开发中心")]),t._v("、"),a("code",[t._v("应用中心")]),t._v("四个模块。其中我主要负责开发中心中的"),a("strong",[t._v("代码编辑器")]),t._v("、"),a("strong",[t._v("可视化地球")]),t._v("、"),a("strong",[t._v("控制台")]),t._v("以及资源中心的"),a("strong",[t._v("高级检索")]),t._v("页面的开发。下图分别是高级检索页面和开发中心页面：")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202403071156313.jpeg",alt:"img"}})]),t._v(" "),a("p",[a("img",{attrs:{src:"https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202403071156485.png",alt:"img"}})]),t._v(" "),a("p",[t._v("​\t其实在我加入开发之前，遥感团队已经使用vue2开发过一版原型系统。不过初版系统的体验比较糟糕，首次加载时间甚至能达到二十多秒之久，一个原因是他们是使用了"),a("strong",[t._v("低代码工具")]),t._v("来开发，这样的代码肯定不能保证最佳性能，另外一个很重要的原因是开发中心的python脚本运行环境放在前端用"),a("strong",[t._v("pyscript")]),t._v("(利用WASM在浏览器提供python runtime)执行，导致需要引入一个"),a("strong",[t._v("22MB")]),t._v("的依赖。从团队协作和开发体验的角度看，初版系统"),a("strong",[t._v("没有形成统一的团队规范")]),t._v("且使用JS开发，导致代码管理混乱，代码质量差，这其实也是前端体验不好的一个原因。所以遥感院想要我们来重构一下前端，最主要的目的是优化前端性能，其次也招募了专业的产品经历和UI来重构界面设计。")]),t._v(" "),a("p",[t._v("​\t基于以上考虑，加快首屏渲染，优化前端交互卡顿问题成为重构的主要需求。因为系统的首页是一个宣传页，大多是静态展示内容，没有太多交互，同时也有一定的SEO需求，所以我们考虑使用SSR来加快首屏渲染。此外，系统的核心功能开发中心涉及到Web IDE、Cesium、模型编辑器等重交互功能，我们在开发中心还是需要使用CSR渲染。最终我们选择"),a("strong",[t._v("Next.js")]),t._v(" + "),a("strong",[t._v("TS")]),t._v("进行重构，Next.js支持CSR（客户端渲染）、SSR（请求时渲染页面）、SSG（预渲染页面），并且它有活跃的社区。新版我们使用TS进行开发，虽然在开发阶段增加了一部分代码量，但是却在修复错误和维护代码时带来了很大的方便。TS可以帮助我们在代码编写阶段就检查出类型错误，并且完整的类型提示使我们更容易理解别人的代码，带来的好处远远大于多余的工作量。并且我们引入了"),a("code",[t._v("commitlint")]),t._v("、"),a("code",[t._v("eslint")]),t._v("、"),a("code",[t._v("husky")]),t._v("、"),a("code",[t._v("stylelint")]),t._v("、"),a("code",[t._v("prettier")]),t._v("工具来约束团队成员的代码规范和Git提交规范，也制定了"),a("code",[t._v("git workflow")]),t._v("进行代码版本管理，包括"),a("code",[t._v("mian")]),t._v("、"),a("code",[t._v("develop")]),t._v("、"),a("code",[t._v("feature/xxx")]),t._v("、"),a("code",[t._v("fix/xxx")]),t._v("分支，开发新功能时从develop分支新建feature/xxx分支，开发完成后合并到develop分支上，大版本开发完成后从develop分支合并到main分支上。")]),t._v(" "),a("p",[t._v("​\t经过三个月的重构，最终Chrome LightHouse给出的"),a("code",[t._v("First Contentful Paint")]),t._v("（首屏渲染时间）降到"),a("strong",[t._v("0.3s")]),t._v("，"),a("code",[t._v("Total Blocking Time")]),t._v("（页面阻塞时间）降到0，基本上可以达到秒开的效果。并且OGE也成功在空天信息技术与产业发展研讨会上正式发布，上线运行。")]),t._v(" "),a("h3",{attrs:{id:"_2-next-js-ssr实践"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-next-js-ssr实践"}},[t._v("#")]),t._v(" 2. Next.js SSR实践")]),t._v(" "),a("p",[t._v("网页渲染模式")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://zhuanlan.zhihu.com/p/564818428",target:"_blank",rel:"noopener noreferrer"}},[t._v("揭秘同构渲染，nextjs初体验 - 知乎 (zhihu.com)"),a("OutboundLink")],1)]),t._v(" "),a("ul",[a("li",[a("p",[t._v("CSR")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202403071156707.webp",alt:"img"}})]),t._v(" "),a("p",[t._v("​\tCSR是现在主流的前端SPA网页开发模式，它的优点在于可以局部刷新，但缺点在于"),a("code",[t._v("白屏问题")]),t._v("和不利于"),a("code",[t._v("SEO")]),t._v("。白屏问题是因为CSR首先会请求得到一个空HTML页面，然后再去加载JS和CSS渲染页面。")])]),t._v(" "),a("li",[a("p",[t._v("SSR")]),t._v(" "),a("p",[t._v("​\tSSR模式下服务端直接渲染好HTML返回给前端，它解决了白屏问题和SEO优化，但是会导致任何页面的改动都需要"),a("code",[t._v("全局刷新")]),t._v("。")])]),t._v(" "),a("li",[a("p",[t._v("同构")]),t._v(" "),a("p",[t._v("​\t其实可以将SSR和CSR相结合，"),a("strong",[t._v("第一次访问页面是服务端渲染，基于第一次访问后续的交互就是 SPA 的效果和体验")]),t._v("，"),a("strong",[t._v("还不影响SEO 效果")]),t._v("。")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202403071156929.webp",alt:"img"}})])])]),t._v(" "),a("p",[t._v("Next.js提供的渲染策略")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://juejin.cn/post/7273674732447711295#heading-0",target:"_blank",rel:"noopener noreferrer"}},[t._v("讲清楚 Next.js 里的 CSR, SSR, SSG 和 ISR - 掘金 (juejin.cn)"),a("OutboundLink")],1)]),t._v(" "),a("ul",[a("li",[a("p",[t._v("CSR")]),t._v(" "),a("p",[t._v("useEffect是在客户端执行的，可以使用useEffect在客户端获取数据。")])]),t._v(" "),a("li",[a("p",[t._v("SSR")]),t._v(" "),a("p",[t._v("​\t要使用服务器端渲染，需要导出一个名为 "),a("code",[t._v("getServerSideProps")]),t._v(" 的异步函数。服务器将在每次请求页面时优先调用该函数。可以在getServerSideProps函数中请求数据并返回一个props对象，它会作为props传给React组件。")])]),t._v(" "),a("li",[a("p",[t._v("SSG")]),t._v(" "),a("p",[t._v("​\t如果在页面上导出一个"),a("code",[t._v("getStaticProps")]),t._v("函数，那么nextjs将采用服务端预渲染模式。此时页面 HTML 是在构建时生成的，将在每个请求上重复使用，也可以由 CDN 缓存。也就是说如果要更新页面内容，必须重新构建。")])]),t._v(" "),a("li",[a("p",[t._v("ISR")]),t._v(" "),a("p",[t._v("​\t增量静态再生（ISR）建立在 SSG 的基础上，同时又有 SSR 的优点，ISR 允许页面的某些部分是静态的，而其他部分则可以在数据发生变化时动态渲染。ISR 在性能和内容更新之间取得了平衡，因此适用于内容经常更新的站点。")]),t._v(" "),a("p",[t._v("​\t当我们使用 "),a("code",[t._v("revalidate")]),t._v("选项时，Next.js 会在 build 时调用一次"),a("code",[t._v("getStaticProps")]),t._v("，部署生产后，Next.js 还会在达到"),a("code",[t._v("revalidate")]),t._v("设置的时间间隔后再次运行"),a("code",[t._v("getStaticProps")]),t._v("，以此更新内容。")])])]),t._v(" "),a("h3",{attrs:{id:"_3-webide"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-webide"}},[t._v("#")]),t._v(" 3. WebIDE")]),t._v(" "),a("h4",{attrs:{id:"_3-1-monaco实现ide"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-1-monaco实现ide"}},[t._v("#")]),t._v(" 3.1 Monaco实现IDE")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("monaco"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("editor"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("create")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("editorRef"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("current"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("language")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" lang"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    value"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("minimap")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("enabled")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("formatOnPaste")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("automaticLayout")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("h4",{attrs:{id:"_3-2-lsp实现智能语法补全"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-2-lsp实现智能语法补全"}},[t._v("#")]),t._v(" 3.2 LSP实现智能语法补全")]),t._v(" "),a("p",[t._v("​\tmonaco内置了html、css、json、js/ts的语法提示，通过web worker的形式实现。")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// json、js、ts语言的webworker")]),t._v("\n  self"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("MonacoEnvironment "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("getWorker")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("workerId"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" label")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("label "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"json"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Worker")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("URL")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"monaco-editor/esm/vs/language/json/json.worker?worker"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("meta"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("url\n          "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("label "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"javascript"')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("||")]),t._v(" label "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"typescript"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Worker")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("URL")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"monaco-editor/esm/vs/language/typescript/ts.worker?worker"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("meta"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("url\n          "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Worker")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("URL")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"monaco-editor/esm/vs/editor/editor.worker?worker"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("meta"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("url\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v("​\t对于其他语言的语法提示，则需要结合LSP服务实现。项目中主要编写的代码是python，可通过"),a("code",[t._v("monaco-languageclient")]),t._v("+ "),a("code",[t._v("jsonrpc-ws-proxy")]),t._v("+"),a("code",[t._v("python-language-server")]),t._v("实现。")]),t._v(" "),a("blockquote",[a("p",[a("a",{attrs:{href:"https://link.juejin.cn/?target=https%3A%2F%2Fmicrosoft.github.io%2Flanguage-server-protocol%2F",target:"_blank",rel:"noopener noreferrer"}},[a("strong",[t._v("LSP(Language Server Protocol)")]),t._v(" "),a("OutboundLink")],1),a("strong",[t._v("语言服务协议")]),t._v("，此协议定义了在编辑器或IDE与语言服务器之间使用的通信规范，该语言服务器提供了例如自动补全，转到定义，查找所有引用等的功能")])]),t._v(" "),a("p",[a("a",{attrs:{href:"https://juejin.cn/post/7108913087613829151",target:"_blank",rel:"noopener noreferrer"}},[t._v("基于 Monaco Editor & LSP 打造智能 IDE - 掘金 (juejin.cn)"),a("OutboundLink")],1)]),t._v(" "),a("p",[t._v("​\tLSP是基于"),a("code",[t._v("JSON-RPC")]),t._v("实现语言服务和编辑器之间通信的，它是一种基于json的跨语言远程过程调用协议。由于浏览器运行在web端无法直接通过rpc与LSP Server通信，所以需要一个代理服务器。monaco-languageclient将数据转换成"),a("code",[t._v("jsonrpc")]),t._v("后通过"),a("code",[t._v("websocket")]),t._v("发送给"),a("code",[t._v("jsonrpc-ws-proxy")]),t._v("，然后代理服务再通过"),a("code",[t._v("线程间数据流")]),t._v("的方式进行通信。")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202403071156185.png",alt:"image-20240305235420121"}})]),t._v(" "),a("h4",{attrs:{id:"_3-3-see日志推送"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-3-see日志推送"}},[t._v("#")]),t._v(" 3.3 SEE日志推送")]),t._v(" "),a("ul",[a("li",[t._v("轮询")]),t._v(" "),a("li",[t._v("websocket")]),t._v(" "),a("li",[t._v("SEE")])]),t._v(" "),a("h3",{attrs:{id:"_4-cesium-三维地球"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-cesium-三维地球"}},[t._v("#")]),t._v(" 4. Cesium 三维地球")]),t._v(" "),a("p",[t._v("图层")]),t._v(" "),a("p",[t._v("天地图key")]),t._v(" "),a("p",[t._v("上图：WSTM、图片")]),t._v(" "),a("p",[t._v("请求防抖")]),t._v(" "),a("p",[t._v("webwoker GIS计算")]),t._v(" "),a("h3",{attrs:{id:"_5-其他"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5-其他"}},[t._v("#")]),t._v(" 5. 其他")]),t._v(" "),a("p",[t._v("docked-layout  ref + useimperative  dynamic")]),t._v(" "),a("p",[t._v("immer.js")]),t._v(" "),a("p",[t._v("useRef -> useState")]),t._v(" "),a("h3",{attrs:{id:"_6-部署"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_6-部署"}},[t._v("#")]),t._v(" 6. 部署")]),t._v(" "),a("p",[t._v("next build，生成的.next目录就是打包后的包")]),t._v(" "),a("p",[t._v("在服务器上执行next start --port 10001")]),t._v(" "),a("p",[t._v("全局安装pm2(node进程保护)")]),t._v(" "),a("p",[t._v("项目下执行pm2 start deploy.js -i max --name lemon-web 这行代码的含义是，以集群模式部署，并且已当前机器有几个CPU就启动几个进程")]),t._v(" "),a("p",[t._v("nginx配置里添加upstream，完成负载均衡")])])}),[],!1,null,null,null);s.default=n.exports}}]);