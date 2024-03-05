(window.webpackJsonp=window.webpackJsonp||[]).push([[69],{669:function(_,e,t){"use strict";t.r(e);var v=t(11),r=Object(v.a)({},(function(){var _=this,e=_.$createElement,t=_._self._c||e;return t("ContentSlotsDistributor",{attrs:{"slot-key":_.$parent.slotKey}},[t("h2",{attrs:{id:"基于nest-js开发的开放地球引擎oge相关实践"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#基于nest-js开发的开放地球引擎oge相关实践"}},[_._v("#")]),_._v(" 基于Nest.js开发的开放地球引擎OGE相关实践")]),_._v(" "),t("h3",{attrs:{id:"_1-前言"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-前言"}},[_._v("#")]),_._v(" 1. 前言")]),_._v(" "),t("p",[_._v("​\tOGE开放地球引擎项目是武汉大学遥感与信息工程学院龚健雅院士团队研发的一个遥感时空信息分析平台。它的核心功能包括"),t("code",[_._v("遥感卫星影像检索")]),_._v("、"),t("code",[_._v("在线遥感时空数据分析")]),_._v("等，包括"),t("code",[_._v("首页")]),_._v("、"),t("code",[_._v("资源中心")]),_._v("、"),t("code",[_._v("开发中心")]),_._v("、"),t("code",[_._v("应用中心")]),_._v("四个模块。其中我主要负责开发中心中的"),t("strong",[_._v("代码编辑器")]),_._v("、"),t("strong",[_._v("可视化地球")]),_._v("、"),t("strong",[_._v("控制台")]),_._v("以及资源中心的"),t("strong",[_._v("高级检索")]),_._v("页面的开发。下图分别是高级检索页面和开发中心页面：")]),_._v(" "),t("p",[t("img",{attrs:{src:"http://www.openge.org.cn/index/feature/1.jpg",alt:"img"}})]),_._v(" "),t("p",[t("img",{attrs:{src:"http://www.openge.org.cn/index/feature/3.png",alt:"img"}})]),_._v(" "),t("p",[_._v("​\t其实在我加入开发之前，遥感团队已经使用vue2开发过一版原型系统。不过初版系统的体验比较糟糕，首次加载时间甚至能达到二十多秒之久，一个原因是他们是使用了"),t("strong",[_._v("低代码工具")]),_._v("来开发，这样的代码肯定不能保证最佳性能，另外一个很重要的原因是开发中心的python脚本运行环境放在前端用"),t("strong",[_._v("pyscript")]),_._v("(利用WASM在浏览器提供python runtime)执行，导致需要引入一个"),t("strong",[_._v("22MB")]),_._v("的依赖。从团队协作和开发体验的角度看，初版系统"),t("strong",[_._v("没有形成统一的团队规范")]),_._v("且使用JS开发，导致代码管理混乱，代码质量差，这其实也是前端体验不好的一个原因。所以遥感院想要我们来重构一下前端，最主要的目的是优化前端性能，其次也招募了专业的产品经历和UI来重构界面设计。")]),_._v(" "),t("p",[_._v("​\t基于以上考虑，加快首屏渲染，优化前端交互卡顿问题成为重构的主要需求。因为系统的首页是一个宣传页，大多是静态展示内容，没有太多交互，同时也有一定的SEO需求，所以我们考虑使用SSR来加快首屏渲染。此外，系统的核心功能开发中心涉及到Web IDE、Cesium、模型编辑器等重交互功能，我们在开发中心还是需要使用CSR渲染。最终我们选择"),t("strong",[_._v("Next.js")]),_._v(" + "),t("strong",[_._v("TS")]),_._v("进行重构，Next.js支持CSR（客户端渲染）、SSR（请求时渲染页面）、SSG（预渲染页面），并且它有活跃的社区。新版我们使用TS进行开发，虽然在开发阶段增加了一部分代码量，但是却在修复错误和维护代码时带来了很大的方便。TS可以帮助我们在代码编写阶段就检查出类型错误，并且完整的类型提示使我们更容易理解别人的代码，带来的好处远远大于多余的工作量。并且我们引入了"),t("code",[_._v("commitlint")]),_._v("、"),t("code",[_._v("eslint")]),_._v("、"),t("code",[_._v("husky")]),_._v("、"),t("code",[_._v("stylelint")]),_._v("、"),t("code",[_._v("prettier")]),_._v("工具来约束团队成员的代码规范和Git提交规范，也制定了"),t("code",[_._v("git workflow")]),_._v("进行代码版本管理，包括"),t("code",[_._v("mian")]),_._v("、"),t("code",[_._v("develop")]),_._v("、"),t("code",[_._v("feature/xxx")]),_._v("、"),t("code",[_._v("fix/xxx")]),_._v("分支，开发新功能时从develop分支新建feature/xxx分支，开发完成后合并到develop分支上，大版本开发完成后从develop分支合并到main分支上。")]),_._v(" "),t("p",[_._v("​\t经过三个月的重构，最终Chrome LightHouse给出的"),t("code",[_._v("First Contentful Paint")]),_._v("（首屏渲染时间）降到"),t("strong",[_._v("0.3s")]),_._v("，"),t("code",[_._v("Total Blocking Time")]),_._v("（页面阻塞时间）降到0，基本上可以达到秒开的效果。并且OGE也成功在空天信息技术与产业发展研讨会上正式发布，上线运行。")]),_._v(" "),t("h3",{attrs:{id:"_2-next-js-ssr实践"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-next-js-ssr实践"}},[_._v("#")]),_._v(" 2. Next.js SSR实践")]),_._v(" "),t("p",[_._v("网页渲染模式")]),_._v(" "),t("p",[t("a",{attrs:{href:"https://zhuanlan.zhihu.com/p/564818428",target:"_blank",rel:"noopener noreferrer"}},[_._v("揭秘同构渲染，nextjs初体验 - 知乎 (zhihu.com)"),t("OutboundLink")],1)]),_._v(" "),t("ul",[t("li",[t("p",[_._v("CSR")]),_._v(" "),t("p",[t("img",{attrs:{src:"https://pic2.zhimg.com/80/v2-5dee5d47309b037da87694c14955dced_720w.webp",alt:"img"}})]),_._v(" "),t("p",[_._v("​\tCSR是现在主流的前端SPA网页开发模式，它的优点在于可以局部刷新，但缺点在于"),t("code",[_._v("白屏问题")]),_._v("和不利于"),t("code",[_._v("SEO")]),_._v("。白屏问题是因为CSR首先会请求得到一个空HTML页面，然后再去加载JS和CSS渲染页面。")])]),_._v(" "),t("li",[t("p",[_._v("SSR")]),_._v(" "),t("p",[_._v("​\tSSR模式下服务端直接渲染好HTML返回给前端，它解决了白屏问题和SEO优化，但是会导致任何页面的改动都需要"),t("code",[_._v("全局刷新")]),_._v("。")])]),_._v(" "),t("li",[t("p",[_._v("同构")]),_._v(" "),t("p",[_._v("​\t其实可以将SSR和CSR相结合，"),t("strong",[_._v("第一次访问页面是服务端渲染，基于第一次访问后续的交互就是 SPA 的效果和体验")]),_._v("，"),t("strong",[_._v("还不影响SEO 效果")]),_._v("。")]),_._v(" "),t("p",[t("img",{attrs:{src:"https://pic1.zhimg.com/80/v2-39a18edb171d4df1b088cd389323e7a8_720w.webp",alt:"img"}})])])]),_._v(" "),t("p",[_._v("Next.js提供的渲染策略")]),_._v(" "),t("p",[t("a",{attrs:{href:"https://juejin.cn/post/7273674732447711295#heading-0",target:"_blank",rel:"noopener noreferrer"}},[_._v("讲清楚 Next.js 里的 CSR, SSR, SSG 和 ISR - 掘金 (juejin.cn)"),t("OutboundLink")],1)]),_._v(" "),t("ul",[t("li",[t("p",[_._v("CSR")]),_._v(" "),t("p",[_._v("useEffect是在客户端执行的，可以使用useEffect在客户端获取数据。")])]),_._v(" "),t("li",[t("p",[_._v("SSR")]),_._v(" "),t("p",[_._v("​\t要使用服务器端渲染，需要导出一个名为 "),t("code",[_._v("getServerSideProps")]),_._v(" 的异步函数。服务器将在每次请求页面时优先调用该函数。可以在getServerSideProps函数中请求数据并返回一个props对象，它会作为props传给React组件。")])]),_._v(" "),t("li",[t("p",[_._v("SSG")]),_._v(" "),t("p",[_._v("​\t如果在页面上导出一个"),t("code",[_._v("getStaticProps")]),_._v("函数，那么nextjs将采用服务端预渲染模式。此时页面 HTML 是在构建时生成的，将在每个请求上重复使用，也可以由 CDN 缓存。也就是说如果要更新页面内容，必须重新构建。")])]),_._v(" "),t("li",[t("p",[_._v("ISR")]),_._v(" "),t("p",[_._v("​\t增量静态再生（ISR）建立在 SSG 的基础上，同时又有 SSR 的优点，ISR 允许页面的某些部分是静态的，而其他部分则可以在数据发生变化时动态渲染。ISR 在性能和内容更新之间取得了平衡，因此适用于内容经常更新的站点。")]),_._v(" "),t("p",[_._v("​\t当我们使用 "),t("code",[_._v("revalidate")]),_._v("选项时，Next.js 会在 build 时调用一次"),t("code",[_._v("getStaticProps")]),_._v("，部署生产后，Next.js 还会在达到"),t("code",[_._v("revalidate")]),_._v("设置的时间间隔后再次运行"),t("code",[_._v("getStaticProps")]),_._v("，以此更新内容。")])])]),_._v(" "),t("h3",{attrs:{id:"_3-webide"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-webide"}},[_._v("#")]),_._v(" 3. WebIDE")]),_._v(" "),t("h4",{attrs:{id:"_3-1-monaco实现ide"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-1-monaco实现ide"}},[_._v("#")]),_._v(" 3.1 Monaco实现IDE")]),_._v(" "),t("h4",{attrs:{id:"_3-2-lsp实现智能语法补全"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-2-lsp实现智能语法补全"}},[_._v("#")]),_._v(" 3.2 LSP实现智能语法补全")]),_._v(" "),t("p",[_._v("可通过"),t("code",[_._v("monaco-languageclient")]),_._v("+ "),t("code",[_._v("jsonrpc-ws-proxy")]),_._v("+"),t("code",[_._v("python-language-server")]),_._v("实现")]),_._v(" "),t("p",[t("a",{attrs:{href:"https://juejin.cn/post/7108913087613829151",target:"_blank",rel:"noopener noreferrer"}},[_._v("基于 Monaco Editor & LSP 打造智能 IDE - 掘金 (juejin.cn)"),t("OutboundLink")],1)]),_._v(" "),t("h4",{attrs:{id:"_3-3-see日志推送"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-3-see日志推送"}},[_._v("#")]),_._v(" 3.3 SEE日志推送")]),_._v(" "),t("ul",[t("li",[_._v("轮询")]),_._v(" "),t("li",[_._v("websocket")]),_._v(" "),t("li",[_._v("SEE")])]),_._v(" "),t("h3",{attrs:{id:"_4-cesium-三维地球"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_4-cesium-三维地球"}},[_._v("#")]),_._v(" 4. Cesium 三维地球")]),_._v(" "),t("p",[_._v("图层")]),_._v(" "),t("p",[_._v("天地图key")]),_._v(" "),t("p",[_._v("上图：WSTM、图片")]),_._v(" "),t("p",[_._v("请求防抖")]),_._v(" "),t("p",[_._v("webwoker GIS计算")]),_._v(" "),t("h3",{attrs:{id:"_5-其他"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_5-其他"}},[_._v("#")]),_._v(" 5. 其他")]),_._v(" "),t("p",[_._v("docked-layout  ref + useimperative  dynamic")]),_._v(" "),t("p",[_._v("immer.js")]),_._v(" "),t("p",[_._v("useRef -> useState")]),_._v(" "),t("h3",{attrs:{id:"_6-部署"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_6-部署"}},[_._v("#")]),_._v(" 6. 部署")]),_._v(" "),t("p",[_._v("next build，生成的.next目录就是打包后的包")]),_._v(" "),t("p",[_._v("在服务器上执行next start --port 10001")]),_._v(" "),t("p",[_._v("全局安装pm2(node进程保护)")]),_._v(" "),t("p",[_._v("项目下执行pm2 start deploy.js -i max --name lemon-web 这行代码的含义是，以集群模式部署，并且已当前机器有几个CPU就启动几个进程")]),_._v(" "),t("p",[_._v("nginx配置里添加upstream，完成负载均衡")])])}),[],!1,null,null,null);e.default=r.exports}}]);