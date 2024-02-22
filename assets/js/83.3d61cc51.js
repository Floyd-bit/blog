(window.webpackJsonp=window.webpackJsonp||[]).push([[83],{682:function(t,a,s){"use strict";s.r(a);var n=s(11),e=Object(n.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h3",{attrs:{id:"_1-常见跨端框架介绍"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-常见跨端框架介绍"}},[t._v("#")]),t._v(" 1. 常见跨端框架介绍")]),t._v(" "),s("h3",{attrs:{id:"_3-uniapp跨端应用开发实践"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-uniapp跨端应用开发实践"}},[t._v("#")]),t._v(" 3. Uniapp跨端应用开发实践")]),t._v(" "),s("h3",{attrs:{id:"_4-cefsharp实现桌面端跨端应用的实践"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4-cefsharp实现桌面端跨端应用的实践"}},[t._v("#")]),t._v(" 4. CefSharp实现桌面端跨端应用的实践")]),t._v(" "),s("p",[t._v("​\t在C#客户端中嵌入浏览器有多种方法，常见的浏览器控件包括.NET WebBrowser控件以及开源控件CefSharp。.NET WebBrowser控件基于IE浏览器内核，在性能以及兼容性上都不及基于谷歌Chromium的开源控件CefSharp, 所以我们选择后者作为浏览器控件。")]),t._v(" "),s("h4",{attrs:{id:"_4-1-在js中调用c-方法"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4-1-在js中调用c-方法"}},[t._v("#")]),t._v(" 4.1 在JS中调用C#方法")]),t._v(" "),s("p",[t._v("​\t我们可以使用JavaScript Binding（JSB）来进行JavaScript和.Net之间的通信，并且它提供了同步和异步两种实现方式。为了优化性能，减少通信对页面渲染的阻塞，我们使用异步的方式进行通信，同步的方法可见文档https://github.com/cefsharp/CefSharp/wiki/General-Usage#sync-javascript-binding-jsb")]),t._v(" "),s("p",[t._v("​\tJSB使用Chromium IPC（进程间通信）来在浏览器进程和渲染进程间传递消息。我们在JavaScript中调用C#方法的过程类似于ajax，所有的异步方法调用是非阻塞的并且会返回一个JavaScript的标准Promise对象。C#方法的返回值可以在Promise的成功回调函数中获取到，并且C#的异常会被捕获，我们可以在Promise的失败回调函数中获取异常信息。需要注意的是，被JavaScript调用的C#方法名称会默认被转换为小驼峰(例如MyFunction 会变成myFunction)，可以通过设置browser.JavascriptObjectRepository.NameConverter属性来避免方法名的默认转换。")]),t._v(" "),s("p",[t._v("​\t将C#的类提供给JavaScript的具体步骤如下：")]),t._v(" "),s("ol",[s("li",[s("p",[t._v("新建一个C#类")]),t._v(" "),s("p",[t._v("在C#中新建一个类：")]),t._v(" "),s("div",{staticClass:"language-c# extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("public class BoundObject  \n{  \n    public int Add(int a, int b)  \n    {  \n        return a + b;  \n    }  \n}  \n")])])])]),t._v(" "),s("li",[s("p",[t._v("使用JavaScriptObjectRepository注册类的实例")])])]),t._v(" "),s("p",[t._v("我们可以在初始化浏览器时(通常在实例化ChromiumWebBrowser之后)就使用JavaScriptObjectRepository注册类的实例。")]),t._v(" "),s("div",{staticClass:"language-c# extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v('// 绑定JavaScript对象 \nCefSharpSettings.WcfEnabled = true; \nbrowser.JavascriptObjectRepository.Register("boundAsync", new JsEvent(), true, BindingOptions.DefaultBinder); \n')])])]),s("ol",{attrs:{start:"3"}},[s("li",[t._v("在JavaScript中调用CefSharp.BindObjectAsync")])]),t._v(" "),s("p",[t._v("最后，在JavaScript代码中调用CefSharp.BindObjectAsync,该方法被调用后会在JavaScriptObjectRepository中寻找是否有已注册的对象。")]),t._v(" "),s("div",{staticClass:"language-html extra-class"},[s("pre",{pre:!0,attrs:{class:"language-html"}},[s("code",[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("type")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("text/javascript"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),s("span",{pre:!0,attrs:{class:"token script"}},[s("span",{pre:!0,attrs:{class:"token language-javascript"}},[t._v(" \n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("async")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" \n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" \n\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("await")]),t._v(" CefSharp"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("BindObjectAsync")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"boundAsync"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" \n\tboundAsync"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("16")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("then")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("actualResult")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" \n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" \n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" expectedResult "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("18")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" \n        assert"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("equal")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("expectedResult"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" actualResult"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Add 16 + 2 resulted in "')]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" expectedResult"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" \n\t"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" \n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" \n")])]),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("script")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),s("h4",{attrs:{id:"_4-2-在c-中执行js代码"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4-2-在c-中执行js代码"}},[t._v("#")]),t._v(" 4.2 在C#中执行JS代码")]),t._v(" "),s("ol",[s("li",[s("p",[t._v("调用ExecuteScriptAsync方法")]),t._v(" "),s("p",[t._v("​\tJavaScript只能在V8Context中编译执行，我们可以通过ChromiumWebBrowser类的ExecuteScriptAsync或ExecuteJavaScriptAsync方法来执行JS代码。")]),t._v(" "),s("div",{staticClass:"language-c# extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("browser.ExecuteScriptAsync(\"document.body.style.background = 'red';\"); \n")])])]),s("p",[t._v("如果要在ExecuteScriptAsunc方法中执行多行js代码，则需要将这些js语句包裹在IIFE(立即执行函数)中执行。")]),t._v(" "),s("div",{staticClass:"language-c# extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("browser.ExecuteScriptAsync(\"(function(){ document.getElementsByName('q')[0].value = 'CefSharp Was Here!'; document.getElementsByName('btnK')[0].click(); })();\"); \n")])])])]),t._v(" "),s("li",[s("p",[t._v("通过JS自定义事件进行通信")]),t._v(" "),s("p",[t._v("​\t某些业务场景需要从客户端向前端发送信息，我们就可以通过ExecuteScriptAsync方法触发JS中的事件，并且在前端进行监听，这样就可以完成客户端到前端的数据通信。")]),t._v(" "),s("p",[t._v("​\tJS中的自定义事件通过CustomEvent构造函数来创建，CustomEvent接收两个参数, 第一个参数表示创建事件的名称，第二个参数为可选配置项，可以通过第二个参数的detail属性传递数据。")]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 创建事件  ")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" myEvent "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("CustomEvent")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"test"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("  \n    "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("detail")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("data")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"test info"')]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("  \n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("  \t  \n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 触发事件  ")]),t._v("\nwindow"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("dispatchEvent")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("myEvent"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("  \t  \n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 添加适当的事件监听器  ")]),t._v("\nwindow"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("addEventListener")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"test"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("e")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("  \n    "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("alert")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("e"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("detail"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("data"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("  \n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("  \n")])])])])])])}),[],!1,null,null,null);a.default=e.exports}}]);