## 浅析OpenTiny源码

![image-20240307115847250](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202403071158978.png)

### 1. 目录结构

TinyVue中每个组件按照以下的目录结构组织，其中带有`!`前缀的文件表示必选，`?`前缀的文件表示可选

```
examples
    docs
    public
    sites
        <mpt> app
            ![component-name]
                !webdoc
                    ![component-name].cn.md // 中文文档
                    ![component-name].cn.md //英文文档
                    ![component-name].js // 组件文档配置
                ![demo].vue //示例文件
                ?[demo].spec.ts //示例的e2e测试
        overviewimage //图标
        resource
        webdoc //对应使用指南
        config.js
        !menu.js // 目录文件，需要在此追加你的组件
packages
    renderless
        src
            ![component-name]
                ?[component-name]
                    vue.ts // renderless逻辑，包括state、api、props等
                    index.ts //框架无关的逻辑
                vue.ts
                index.ts
    theme // pc端样式
        src
            ?[component-name] // 有些组件不一定需要样式(例如: config-provider)
                index.less // 样式
                vars.less // 变量声明
                aurora-theme.js // aurora主题样式css变量
                smb-theme.js // smb主题样式css变量
    theme-mobile // 移动端样式
        src
            ?[component-name]
                index.less // 样式
                vars.less // 变量声明
    vue
        src
            ![component-name]
                !__tests__
                    ![component-name].spec.vue // 至少要有一个单元测试文件
                src
                    pc.vue // pc端模板
                    ?mobile.vue // 移动端模板,如果你的组件不需要移动端那么可以删除
                index.ts // 组件入口文件，包含install方法
                package.json
```

### 2. 组件库的工程化

一个成熟的组件库应有以下工程化需求：

- **包管理：**每个组件都需要发布到npm仓库
- **文件组织**：组件库要组织多个零散的模块
- **构建**：生成产物包括cjs、esm等 
- 开发环境：需要开发服务器
- 文档、测试、代码规范
- 发布、集成

TinyVue项目是使用pnpm管理的monorepo工程，相比于传统multirepo多仓库的管理模式，monorepo拥有如下优势：

- 依赖管理：传统multirepo模式每个仓库都要单独安装依赖，存在依赖重复安装的情况，占用磁盘空间。monorepo模式下相同版本的依赖只需要安装一次，不同子模块可以复用依赖。
- 开发迭代：对于组件库项目而言，往往会出现多个组件互相依赖的情况。在传统模式下，如果一个组件进行了改动，要在另一个组件中引入最新的依赖，需要先将被依赖的组件发包。而monorepo模式下可以直接引用到最新版本。

monorepo有多种实现方式，opentiny选用pnpm作为包管理工具，其优势在于：

- 安装速度快：安装速度是npm/yarn的2-3倍
- 节省磁盘空间：通过硬链接节约磁盘空间
- 依赖访问：优化了node_modules的扁平结构，解决了幽灵依赖问题
- 支持monorepo：不需要集成lerna等工具，自身通过workspace模式支持monorepo

workspace模式目录结构：

📦my-project
 ┣ 📂a  // a模块
 ┃ ┗ 📜package.json
 ┣ 📂b
 ┃ ┗ 📜package.json
 ┣ 📂c
 ┃ ┣ 📂c-1
 ┃ ┃ ┗ 📜package.json
 ┃ ┣ 📂c-2
 ┃ ┃ ┗ 📜package.json
 ┃ ┗ 📂c-3
 ┃  ┗ 📜package.json
 ┣ 📜package.json
 ┣ 📜pnpm-workspace.yaml  // 在pnpm-workspace.yaml中配置模块

### 3. 跨框架的实现

  OpenTiny通过划分`renderless`无渲染层、`common`适配层、`template`模板层实现了业务逻辑、框架和模板的分离。其中renderless层抽离了与框架和渲染无关的业务逻辑，方便复用；common适配层抹平了不同框架间的差异，并对接renderless层；template模板对接common层和renderless层编写组件模板。

​	例如，如果我们要在React框架中实现common适配层，可以从以下三个方面来处理：

- **抹平响应式数据：** 为 React提供响应式数据能力，从而可以复用 OpentinyVue 已经写好组件的 state 数据响应能力，React 使用了 **ahooks** 提供的**useReactive**（通过Proxy代理对象）去模拟了 Vue 的响应式数据，并且可以在响应式数据变化的时候调用 React 的setState方法，从而触发了视图的渲染；

- **抹平 Vue 的 nextTick：** 使用微任务 **queueMicrotask** 模拟 Vue 框架的 nextTick。

- **抹平事件触发机制：** 使用**props传入回调函数**模拟 Vue 框架的事件触发机制 emit。

  ```js
  import { useReactive } from 'ahooks' // 使用ahooks提供的useReactive抹平vue框架的响应式数据
  
  // 抹平vue框架的事件触发机制
  export const emit =
    (props) =>
    (evName, ...args) => {
      if (props[evName] && typeof props[evName] === 'function') {
        props[evName](...args)
      }
    }
  
  // 模拟vue框架的nextTick，等待 dom 更新后触发回调
  export const useNextTick = (callback) => {
    queueMicrotask(callback)
  }
  ```

​    通过分析源码，我们可以对OpenTiny跨框架的原理有更深的认识。以TinyButton组件为例，我们先来查看renderless无渲染层的实现。在`renderless/button`目录下分别有`index.js`、`vue.js`、`react.js`、`solid.js`四个文件，其中index.js是和**框架无关**的**公共逻辑**，其他文件则分别对应了与框架耦合的逻辑（状态、事件等）。下面我们分别分析vue.js、react.js和index.js的源码：

```js
// renderless/button/vue.js
import { handleClick, clearTimer } from './index'

export const api = ['state', 'handleClick']
// 导出renderless方法，接收模板层传入的props和common层传入的工具（生命周期函数、状态声明等），返回组件的API方法
export const renderless = (
  props,
  { computed, onBeforeUnmount, reactive, watch, inject },
  { emit, parent },
  { framework }
) => {
  parent.tinyForm = parent.tinyForm || inject('form', null)
  // 定义响应式状态
  const state = reactive({
    timer: null,
    disabled: props.disabled,
    plain: computed(() => props.plain || (parent.buttonGroup || {}).plain),
    formDisabled: computed(() => (parent.tinyForm || {}).disabled),
    buttonDisabled: computed(
      () =>
        props.disabled ||
        state.disabled ||
        (parent.buttonGroup || {}).disabled ||
        state.formDisabled
    )
  })
  // 监听数据变化
  watch(
    () => props.disabled,
    (value) => {
      state.disabled = value
    },
    { immediate: true }
  )
  // 组件提供给模板层的state、method
  const api = {
    state,
    clearTimer: clearTimer(state),
    handleClick: handleClick({ emit, props, state, framework })
  }
  // 生命周期函数
  onBeforeUnmount(api.clearTimer)

  return api
}
```

```react
// renderless/button/react.js
import { handleClick, clearTimer } from './index'

export const api = ['state', 'handleClick']

export default function renderless(
  props,
  { useReactive },
  { emit },
  { framework }
) {
  // 利用ahooks提供的useReactive模拟vue的响应式数据
  const state = useReactive({
    timer: null,
    disabled: !!props.disabled,
    plain: props.plain,
    formDisabled: false
  })

  const api = {
    state,
    clearTimer: clearTimer(state),
    handleClick: handleClick({ emit, props, state, framework })
  }

  return api
}
```

```js
// renderless/button/index.js中是与框架无关的公共逻辑

// handleClick设计为高阶函数，由common层提供逻辑中需要用到state、watch、生命周期函数等
export const handleClick =
  ({ emit, props, state, framework }) =>
  (event) => {
    if (props.nativeType === 'button' && props.resetTime > 0) {
      state.disabled = true
      state.timer = setTimeout(() => {
        state.disabled = false
      }, props.resetTime)
    }

    console.log(`${framework}框架代码已触发！！！！！！！！！`)

    emit('click', event)
  }

export const clearTimer = (state) => () => clearTimeout(state.timer)

```

​	综合以上的分析，我们可以知道OpenTiny跨框架的设计思路。首先将组件的逻辑提取到renderless层，renderless层包括框架无关的公共逻辑`index.js`和框架相关的`vue(react).js`。在vue(react).js中定义一个`renderless函数`，它接收组件props（从模板中获取）、utils（从common层获取）等作为参数，返回一个api对象（包括state、methods）给模板使用。在index.js中，组件的方法采用`高阶函数`的形式实现，接收props、state、utils(如emit、nextTick)等作为参数，返回一个普通函数。这样做的目的是使公共逻辑与框架解耦，由使用者(模板层)决定使用哪个框架实现。最后，模板层中调用`setup`方法（common层提供）获得模板需要的state、method等。

### 4. 跨终端的实现

​	OpenTiny组件库同时提供了pc组件和mobile组件。以TinyButton组件为例，`button/src`目录下有`index.js`、`mobile.vue`、`pc.vue`、`mobile-first.vue`文件。我们首先来看入口文件index.js:

```js
import { $props, $prefix, $setup, defineComponent } from '@opentiny/vue-common'
import PcTemplate from './pc.vue'
import MobileTemplate from './mobile.vue'
import WatchTemplate from './watch.vue'
// 根据mode返回不同的模板
const template = (mode) => {
  if (mode === 'mobile') {
    return MobileTemplate
  } else if (mode === 'watch') {
    return WatchTemplate
  } else {
    return PcTemplate
  }
}

export default defineComponent({
  name: $prefix + 'Button',
  inject: {
	// 此处省略
  },
  props: {
    ...$props,
    // 此处省略
  },
  setup(props, context) {
    return $setup({ props, context, template })
  }
})
```

​	从中我们可以看出template方法会根据参数mode返回不同的模板组件，那么mode是从哪里获取的呢，我们继续查看$setup的源码：

```js
export const $setup = ({ props, context, template, extend = {} }) => {
  const view = hooks.computed(() => {
    if (typeof props.tiny_template !== 'undefined') return props.tiny_template
	// resolveMode会根据组件props中的tiny_mode字段返回pc、mobile或mobile-first
    const component = template(resolveMode(props, context), props)

    return typeof component === 'function'
      ? defineAsyncComponent(component)
      : component
  })

  initComponent()

  return renderComponent({ view, props, context, extend })
}
```

​	在使用组件时，可以通过传入tiny_mode的方式来指定使用pc端或移动端的组件。或者也可以在配置文件中指定工程类型。

> ` @opentiny/vue ` 支持多种模式。如果您的工程非移动端工程，可以在vite.config.ts配置代码中的`process.env`中，声明`TINY_MODE`的值，以使工程在构建时，能将移动端模式的代码摇掉，优化打包产物的体积。比如 `'process.env': { ...process.env,TINY_MODE:'pc' }`。

```ts
// vite.config.ts
import vue from '@vitejs/plugin-vue'
import importPlugin from '@opentiny/vue-vite-import'

export default {
  resolve: {
    extensions: ['.js', '.jsx', '.vue']
  },
  plugins: [
    vue(),
    // 按需引入
    importPlugin(
      [
        {
          libraryName: '@opentiny/vue'
        },
        {
          libraryName: `@opentiny/vue-icon`,
          customName: (name) => {
            return `@opentiny/vue-icon/lib/${name.replace(/^icon-/, '')}.js`
          }
        }
      ],
      'pc' // 此配置非必选，按需配置(pc|mobile|mobile-first)
    )
  ],
  define: {
    'process.env': { ...process.env }
  }
}
```

### 5. 多主题的实现

- **规范化 class 名称**

通常情况下，组件库的样式 `class` 名称都有**严格的命名规范**，例如 [element-plus](https://link.zhihu.com/?target=https%3A//element-plus.gitee.io/zh-CN/) 的类名都为 `el-xxx` 的格式；[Vant](https://link.zhihu.com/?target=https%3A//vant-ui.github.io/vant/%23/zh-CN/home) 的类名都为 `vant-xxx` 的格式。且这些 `class` 名称都**十分注重语义化**，尽量能表现出对应元素的功用和特点。

于是，只要遵循组件库 `class` 的命名规则，用户可以很方便地自定义组件的样式，而无需担心与项目中的自定义样式存在冲突问题。

openTiny组件库严格遵循BEM(block-element-modifier)规范

- **使用 CSS 变量**

为了支持用户灵活地设置组件样式，甚至于实现主题切换功能，组件库的样式一般不会被设定为具体的值。

在组件库中，这些 CSS 变量往往被称为**主题变量**，通常都挂载在 `:root` 节点上，只需要改变这些变量值，对应组件的样式就会一齐发生变化。在此基础上，批量设置主题变量就能达成“一键换肤”的主题切换效果。

### 6. WebComponents组件库

**WebComponents**可以原生实现组件，它由三部分组成：

- **Custom elements（自定义元素）：** 即自定义组件，在html中通过\<custom-component>\</custom-component>可以直接使用
- **Shadow DOM（影子 DOM ）**：一组 JavaScript API，用于将封装的“影子” DOM 树附加到元素（与主文档 DOM 分开呈现）并控制其关联的功能。通过这种方式，您可以保持元素的功能私有，这样它们就可以被脚本化和样式化，而不用担心与文档的其他部分发生冲突。
- **HTML templates（HTML模板）slot**：即插槽

通过WebComponents技术也可以实现跨框架的组件库，但是它存在以下问题：

- **命令式写法，非数据驱动：**更加偏向于 UI 层面，与现在数据驱动不太符，和现在的组件库能力上相比功能会比较弱，使用场景相对单一。

- **兼容性差**：这里**不仅仅指的是浏览器的兼容性，还有框架的兼容性**，在框架中使用偶尔会发现意外的“惊喜”，并且写法会比较复杂。

- **开发体验差**：如果不借助框架开发的话，写法会返璞归真，HTML CSS JS 会糅合在一个文件，html CSS 都是字符串的形式 ，没有高亮，格式也需要自己调整，对于开发人员来说还是难受的。

- **单元测试使用繁琐**：单元测试是组件库核心的一项，但是在 WebComponents 中使用单元测试十分复杂。

### 7. 我的贡献

#### 7.1 单元测试

​	openTiny组件库包含`e2e测试`和`单元测试`。e2e测试即端到端测试，是一种`黑盒测试`方法，模拟真实用户进行交互，并测试功能是否达到预期的结果。单元测试是一种`白盒测试`方法，对每个函数进行测试，对给定的输入应该产生预期的输出。在开发阶段引入e2e测试和单元测试并通过github action添加提交代码时的自动测试钩子，保证了组件库的健壮性和可用性。

​	e2e测试使用**Playwright**工具，使用文档的组件实例作为e2e测试用例场景。

​	单元测试使用**Vitest**工具。我为container、tag、wizard、user-head组件添加了单元测试，涉及到的单元测试内容大致包含以下几个方面：

- 界面内容测试：对于slot，通过`expect(wrapper.find('#mine_header').text()).contain('自定义插槽内容')`来判断dom中是否插入内容。
- 界面样式测试:：如container组件的header-height属性可以设置头部高度，那么测试语句就应该类似于`expect(wrapper.vm.$el.children[0].style.height).toEqual('80px')`。或者说pattern属性可以设置组件的模式，那么就应该去查看dom元素上有没有应有的类选择器。
- 事件测试：如要测试tag组件的click事件，那么测试语句的逻辑应该是触发该事件并判断事件的回调函数是否被执行。`await wrapper.find('.tiny-tag').trigger('click')` `expect(handleClick).toBeCalled()`

#### 7.2 TS类型补全

补充了tag-group、popconfirm、rate、user-head组件的renderless层的TS类型

善用类型工具ExtractPropTypes、ReturnType\<typeof func>、Pick<Type, 'props' | 'state'>

[💻新组件贡献参考：RFC 骨架屏组件 · opentiny/tiny-vue · Discussion #1334 (github.com)](https://github.com/opentiny/tiny-vue/discussions/1334)

#### 7.2 语法提示插件

json结构设计

检测package.json依赖

hover提示

外链

[组件库设计 | 让你的React组件获得代码补全和属性提示功能 - 掘金 (juejin.cn)](https://juejin.cn/post/7121817655765368845)

[开发者的福利 - NutUI-vscode 智能提示来了 - 掘金 (juejin.cn)](https://juejin.cn/post/7096284896749944840?from=search-suggest)

1. 代码补全(snippets)

   只需在项目中创建`snippets.json`文件，在里面配置snippets就可以

2. 智能提示

   鼠标悬浮在组件标签上时弹框显示组件文档（props、events等），并显示指向官方文档的链接。

   ```js
   import * as vscode from 'vscode'
   
   const compileFiles = ['react', 'typescript', 'javascript', 'javascriptreact', 'typescriptreact'];
   
   function providerHover(document: vscode.TextDocument, position: vscode.Position) {}
   
   export function activate(context: vscode.ExtensionContext) {
     context.subscriptions.push(
       vscode.languages.registerHoverProvider(compileFiles, {
         provideHover,
       }),
     );
   }
   
   function provideHover(document: vscode.TextDocument, position: vscode.Position) {
     //移入Concis组件Dom，出现介绍
     const line = document.lineAt(position);
     let isConcisComponentDom = false;
     let matchComponent = '';
     for (let i = 0; i < componentList.length; i++) {
       const component = componentList[i];
       if (line.text.includes(`<${component}`)) {
         isConcisComponentDom = true;
         matchComponent = component;
       }
     }
     if (isConcisComponentDom) {
       const isCN = vscode.env.language === 'zh-cn';
       let componentDocPath = '';
       for (let i = 0; i < matchComponent.length; i++) {
         const str = matchComponent[i];
         if (i !== 0 && str.charCodeAt(0) >= 65 && str.charCodeAt(0) <= 90) {
           componentDocPath += '-';
         }
         componentDocPath += str;
       }
       let text = isCN
         ? `查看${matchComponent}组件官方文档\n
   Concis -> http://react-view-ui.com:92/#/common/${componentDocPath.toLowerCase()}`
         : `View the official documentation of the Button component\n
   Concis -> http://react-view-ui.com:92/#/common/${componentDocPath.toLowerCase()}`;
   
       return new vscode.Hover(text);
     }
   }
   
   
   export function deactivate() {}
   ```

   ​	首先，通过`document.lineAt`获取代码行，判断Concis组件关键词是否出现在代码内容`line.text`中；

   对满足条件的情况，获取组件线上文档地址，编辑提示的内容信息，对应代码段中的`text`；

   将`text`通过`new vscode.Hover`返回；

   

   ​	在组件标签内输入props时智能提示。对于使用vue3+Volar的组件库来说，只要组件库是使用TS开发并声明了global.d.ts文件，Volar会自动生成组件库的代码提示。

   - VSCode + Volar 通过 ts 类型文件实现相关提示
   - VSCode + Vetur 通过在组件库构建目录下添加 tags.json 和 attributes.json 实现相关提示

3. 使用工具自动解析组件库文档

   使用markdown-it解析组件库中的md文档，自动生成需要格式的json文件。