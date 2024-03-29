​	在早期编写网页程序时，我们想要在项目中引入第三方依赖(如Jquery、axios)通常选择在依赖包的github仓库中下载xxx.js或xxx.min.js文件，然后手动复制到项目中，最后在html的script标签中加载依赖的js代码，这样的依赖引入方式十分原始。而其他热门编程语言(如Java、Python、C#)等都可以通过包管理工具(Maven、pip、NuGet)直接在命令行或IDE提供的可视化界面中管理项目的依赖。

​	随着Node.js的出现和前端工程化的发展，前端终于也有了自己的包管理工具`npm`(Node.js Package Manager)。现在npm已经成为了前端开发中不可缺少的工具，Node.js直接内置了npm，当我们安装配置好node环境时其实也装好了npm。在命令行中执行`npm init`就会在当前目录下生成`package.json`文件，它用来描述项目信息(作者、版本号......)以及项目依赖模块信息(依赖包名称、版本......)，一个基本的package.json文件如下：

```json
{
  "name": "projectName",
  "version": "1.0.0",
  "description": "描述信息",
  "main": "index.js",
  "dependencies": {
    "moment": "^1.0.0",
    "axios": "^1.2.6"
  },
  "devDependencies": {},
  "scripts": {
    "test": "node ./index.js"
  },
  "repository": {
    "type": "git",
    "url": "github地址"
  },
  "keywords": [
    "vue"
  ],
  "author": "作者",
  "license": "ISC"
}
```

## 1. packages.json文件详解	

package.json文件中比较重要的配置项包括`dependencies`、`devDependencies`、`scripts`

- dependencies: 从字面意思我们很容易理解，dependencies配置项中记录了项目的依赖包信息。事实上，当我们在命令行中运行`npm install axios`时，dependencies就会新增一个axios包的字段，并记录了版本号。

  依赖包的版本号的格式通常是`major.minor.patch`，例如***1.2.3的含义就是主要版本号1、次要版本号2、补丁版本号3***。正确的版本号在工作中十分重要，在一个开发流程规范且使用敏捷开发方法的团队，往往需要定期发版。一般而言，只有在项目有比较大的更新情况下才会改变主版本号，这种变化意味着新旧版本不兼容。以我们熟悉的Vue和React框架为例，Vue2.x和Vue3.x在语法、理念等众多方面都有改变且相互不兼容，React16.x与之前的版本也在开发理念上大相径庭(React Hooks、fiber的引入)。而当我们为项目开发了一个不影响其他内容的新的Feature，这时就应该更新次要版本号。补丁版本号则容易理解，即修复了之前项目中的错误。

  细心观察dependicies中的版本号，我们会发现有的版本号数字前会出现`^`或`~`，有时还会是`*`。版本号前不同的符号用来指定依赖的安装规则，**`*`表示始终安装最新版本的依赖包, `^`表示安装最新大版本的依赖包，如^1.2.3会在所有1.x.x的包中安装最新版本，`~`则表示安装最新小版本依赖包, 如~1.2.3会在所有1.2.x的包中安装最新版本**。然而这样的机制会导致在多人合作开发时出现依赖版本不一致的情况，而这进一步导致在出现bug复现问题时有人说**"我电脑上看没问题"**。在npm5.x版本之后通过引入package-lock.json解决了类似问题，这一点会在下文详细展开。

- devDependencies: 与dependencies配置项不同，devDependencies中的依赖只在开发阶段用到，也就是说最终打包构建的生产环境文件并不会引入这部分依赖，常见的devDependencies如webpack的plugins、loaders以及babel。要在项目中添加devDependencies，我们只需要在npm install package命令后加上`-D`的参数。

- scripts: 当我们首次创建一个vue项目时，我们通常会选择官方推荐的Vue-Cli工具来创建一个脚手架，开发者只需要关注业务逻辑就可以借助脚手架方便地进行调试、热更新、打包构建等等。这时如果有人问，你的vue项目是如何启动的呢，大部分新手都会回答"在命令行输入npm run dev(或者serve)就可以启动啊"，表面上看答案的确是这样的，然而在npm run dev命令背后还有许多细节值得我们去学习。那么我们要从哪里入手呢，观察package.json文件，我们发现在scripts配置项中有这样的字段：

  ```json
  {
      "scripts": {
          "dev": "vue-cli-service serve",
          "build:prod": "vue-cli-service build",
          "build:stage": "vue-cli-service build --mode staging",
          ......
      }
  }
  ```

  当我们运行npm run dev时其实执行了scripts中dev字段的命令，即vue-cli-service serve。事实上，当我们运行npm run命令时，就会新建一个Shell，就会在Shell中执行vue-cli-service serve脚本。那么我们直接在命令行执行vue-cli-service serve会发生什么呢？当然会报错，因为系统的环境变量中找不到vue-cli-service。npm之所以能成功执行命令是因为npm run新建shell后会将当前目录的node_modules/.bin目录下的可执行文件加入PATH变量，执行结束后再将PATH变量恢复。早在我们npm install安装依赖时npm就在node_modules/.bin目录下创建好了vue-cli-service的可执行文件。

## 2. npm依赖安装机制

### 2.1 npm常用命令

![image-20221021001132040](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202210210011993.png)

### 2.2 npm3.x之前依赖安装机制

​	npm的早期版本依赖层层嵌套，即项目的依赖包都存在node_modules目录下，每个依赖包也有自己的node_modules目录用于存放自己的依赖。这样的机制导致node_modules十分冗余，存放了大量重复的依赖，且多级嵌套的目录导致文件路径过长(Windows下无法处理超过一定字符长度的文件路径)。

![图片](https://mmbiz.qpic.cn/mmbiz_png/lP9iauFI73zicfulFnT9NT6c3aJeQiaG5AnYAYTwmyMaarv7pbFgC3HUDmsde4uJj88becItMVicF39rIkwcRwNjvw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### 2.3 扁平化管理

​	npm3版本之后提出了`hoist`机制，将项目依赖的依赖提升到顶层。例如，项目有A和B两个依赖，A和B又各自有相同的依赖C，那么在安装依赖时npm就会把依赖C提升到顶层依赖，即node_modules下有A、B、C三个包。但是如果A和B依赖的C的版本不同，如A依赖C v1, 而B依赖C v2，那么npm只会把C v1提升到顶层，C v2只能存放在B下。

![图片](https://mmbiz.qpic.cn/mmbiz_png/lP9iauFI73zicfulFnT9NT6c3aJeQiaG5Any651lIqessSrLIanlwmmS1iaL1IL35B2fAAjJRyC5vI8WxibpxyXfsGg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

![图片](https://mmbiz.qpic.cn/mmbiz_png/lP9iauFI73zicfulFnT9NT6c3aJeQiaG5AnehB7Dpec7GgxpfadasahlQES9naMS8pgweJGw5SYXBobJ11bTTt2Kg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### 2.4 存在的问题

​	尽管扁平化管理依赖解决了部分情况下的重复依赖和嵌套依赖的问题，但是仍然存在着`幽灵依赖(phantom dependencies)`、`双胞胎陌生人(doppelgangers)`、`依赖不幂等`问题。

- 幽灵依赖：由于扁平化管理将子依赖提升到了顶层，我们就可以在业务代码中引用到package.json指定依赖以外的包，而这违背了我们使用package.json管理依赖的本意。

- 双胞胎陌生人：对于下图的情况而言，由于B V1已经被提升到了顶层，C v1和D v1都依赖的B v2只能存在各自目录下，被重复安装了两遍。

  ![图片](https://mmbiz.qpic.cn/mmbiz_png/lP9iauFI73zicfulFnT9NT6c3aJeQiaG5AnCQaTRc6HsgUoFvlyVS8zN0Sq6oqrleiaXGvRoKVBlgwVmlDG7fiam0Lg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

- 依赖不幂等：事实上，双胞胎陌生人问题的出现与依赖的安装顺序有关。正常情况下，npm的安装顺序由依赖包的字母进行排序。但是有时我们会手动安装新的依赖，这时如果其他人重新安装依赖就会出现依赖不幂等的情况。

## 3. yarn和pnpm

### 3.1 yarn

> yarn与npm的基本理念相同，也是采用扁平化结构优化重复依赖，但是对于重复安装包的计算更加智能

### 3.2 pnpm

> pnpm的设计理念与npm完全不同，主要利用symbol link和hard link解决了扁平化管理带来的问题