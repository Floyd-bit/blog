> 写项目用webpack, 写库用Rollup

### 1. webpack基本配置

- 拆分配置 webpack.common.js  webpack.dev.js   webpack.prod.js

- merge 引入公共配置
  
  ```js
  const { smart } = require('webpack-merge')
  const webpackCommonConf = require('./webpack.common.js')
  
  moudle.exports = smart(webpackCommonConf, {
      mode: 'development'
  })
  
  // 公共配置
  moudle.exports = {
      entry: path.join(srcPath, 'index'),
      moudle: {
          rules: [
              {
                  test: /\.js$/,
                  loader: ['babel-loader'],
                  include: srcPath,
                  exclude: /node_moudles/
              },
              {
                  test: /\.css$/,
                  // loader执行顺序：从后往前
                  loader: ['style_loader', 'css-loader', 'postcss-loader']
              },
              {
                  test: /\.less$/,
                  loader: ['style-loader', 'css-loader', 'less-loader']
              }
          ]
      },
      plugins: {
          new HtmlWebpackPlugin({
              template: path.join(srcPath, 'index.html'),
              filename: 'index.html'
      })
      }
  }
  ```

- 启动本地服务(webpack-dev-server)
  
  ```js
  moudule.exports = smart(webpackCommonConf, {
      mode: 'development',
      moudles: {
          rules: [
                 // 直接引入图片url
              {
                  test: /\.(png|jpg|jpeg|gif)$/,
                  use: 'file-loader'
              }
             ]
      },
      plugins: [
          new webpack.DefinePlugin({
              ENV: JSON.stringify('development')
          })
      ],
      // 本地服务配置
      devServer: {
          port: 8080,
          progress: true, // 显示打包的进度条
          contentBase: distPath, // 根目录
          open: true, // 自动打开浏览器
          comporess: ture, // 启动gzip压缩
           // 设置代理
           proxy: {
               '/api': {
                   target: ''.
                   pathRewrite: {
                       '/api': ''
                   }
               }
           }
      }
  })
  ```

- 处理ES6

- 生产环境配置
  
  ```js
  module.exports = smart(webpackCommonConf, {
      mode: 'production',
      output: {
        filename: 'bundle.[contentHash:8].js', //打包代码时加上hash值 
        path: distPath
      },
      modules: {
          rules: [
              // 图片 - 考虑base64编码的情况
              {
                  test: /\.(png|jpg|jpeg|gif)$/,
                  use: {
                      loader: 'url-loader',
                      options: {
                          // 小于5kb的图片用base64格式产出,否则产出url格式
                          limit: 5 * 1024,
                          outputPath: '/img1/',
                          publicPath: 'cdn地址'
                      }
                  }
              }
          ]
      }
  })
  ```

### 2. Webpack高级配置

- 多入口
  
  ```js
  moudle.exports = {
      // 生成两个html
      entry: {
          index: path.join(srcPath, 'index'),
          other: path.join(srcPath, 'other')
      },
      output: {
          filename: '[name].[contentHash:8].js'
      }
      plugins: [
          new HtmlWebpackPlugin({
              template: path.join(srcPath, 'index.html'),
               filename: 'index.html',
               // chunks表示该页面要引用哪些chunk
               chunks: ['index'] // 只引用index.js
          }),
           new HtmlWebpackPlugin({
              template: path.join(srcPath, 'other.html'),
               filename: 'other.html',
               // chunks表示该页面要引用哪些chunk
               chunks: ['other'] // 只引用other.js
          })
      ]
  }
  ```

- 抽离css文件
  
  不抽离css文件——css代码混杂在js代码中
  
  ```js
  // 配置loader抽离css
  {
      test: /\.css$/,
      loader: [
          MiniCSSExtractPlugin.loader,  // 替代style-loader
          'css-loader',
          'postcss-loader'
      ]
  },
  plugins: [
      new MiniCssExtractPlugin({
          filename: 'css/main.[contentHash8].css'
      })
  ],
  optimization: {
      // 压缩css
      minimizer: [new TeserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
  }
  ```

- 抽离公共代码
  
  ```js
  optimization: {
      // 压缩css
      minimizer: [],
      // 分割代码块
      splitChunks: {
          chunks: 'all',
          // 缓存分组
          cacheGroups: {
              // 第三方模块
              vendor: {
                  name: 'vendor',  // chunk名称
                  priority: 1
              },
              // 公共的模块
              common: {
  
              }
          }
      }
  }
  ```

- 懒加载
  
  ```js
  import('./dynamic.js').then(res => {
  
  })
  ```

- 处理jsx
  
  babel处理jsx
  
  ```json
  // .babelrc
  {
      "presets": ["@babel/preset-react"],
      "plugins": []
  }
  ```

- 处理vue —— vue-loader

### 3.  module、chunk、bundle的区别

- module——各个模块文件(webpack中一切皆模块)
- chunk——多模块合并成的(如index的chunk, 异步import的chunk, other的chunk)
- bundle——最终的输出文件(chunk最终生成的文件)

![image-20220119154841000](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041455764.png)

### 4. 性能优化

**构建速度**

- 优化babel-loader
  
  ```js
  {
      test: /\.js$/,
      use: ['babel-loader?cacheDirectory'], // 开启缓存, 没有改动的部分直接读取缓存
      include: path.resolve(_dirname, 'src')  // 明确范围
  }
  ```

- IgnorePlugin避免引入无用模块
  
  手动引入需要的模块部分，plugins中配置IgnorePlugin

- noParse
  
  ```js
  module.exports = {
      module: {
          // 忽略对'react.min.js'文件的打包
          noParse: [/react\.min\.js$/]
      }
  }
  ```

- happyPack（多进程打包工具）

- ParallelUgifyPlugin（多进程压缩JS）

- **热更新(HMR)**——开发环境

- DllPlugin(动态链接库插件，打包框架vue react)——开发环境

**产出代码**

- **小图片base64编码**

- **bundle加Hash,合理利用缓存**

- **懒加载**

- **提取公共代码**，第三方vendor

- 使用CDN加速

- 使用**Production**环境(**自动开启代码压缩、Vue、React会自动删除调试代码、启动Tree-Shaking**)
  
  Tree-Shaking：删除无用代码 (ES Module才能开启tree-shaking)

- Scope Hosting: 合并多个函数，减少作用域数量(在使用模块化时)

### 5. babel

Polyfill 补丁：兼容不同浏览器

babel-polyfill

### 6. 面试题

1. 为什么前端要进行打包和构建？

代码层面

- 体积更小(Tree-Shaking、压缩、合并)， 加载更快
- 编译高级语言或语法(TS、ES6、模块化)
- 兼容性和错误检查(Polyfill、postcss、eslint)

研发流程

- 统一、高效的开发环境

- 统一的构建流程和产出标准

- 构建规范
2. Loader和plugin的区别
   
   - loader模块转换器，less->css, 如css-loader、style-loader、babel-loader、file-loader
   - plugin提供更多功能扩展插件，HtmlWebpackPlugin、DefinePlugin

3. babel 和 webpack的区别
   
   - babel——JS新语法编译工具，不关心模块化
   - webpack——打包构建工具，是多个loader、plugin的集合

4. 打包构建有几种hash值
   
   - 全局hash, 打包构建的文件hash值相同，且其中一个更新则全部更新
   - chunk hash, 同一个chunk(入口文件)打包的文件hash值相同
   - content hash, 打包出来的每一个文件hash值都不相同 

5. 兼容性
   
   - Polyfill：用于实现浏览器并不支持的原生API代码, 如Promise
   - babel：编译一些高级的语法(es6、jsx、vue-template), 编译成需要兼容的浏览器版本js语法. babel通过加入plugin来转换新语法或新的api写法，加入preset-env来转换语法，加入@bable/polyfill来转换新api
   - css样式兼容：Normalize.css
   
6. **webpack和vite有什么区别**

   - **编译方式不同**

     **webpack在编译过程中，会将所有模块打包为一个bundle.js文件，然后再运行这个文件。**
  
     **vite是bundleless的。在开发模式下，没有打包的步骤，它利用了浏览器的ES Module Imports特性，只有在真正需要时才编译文件。在生产模式下，vite使用Rollup进行打包，提供更好的tree-shaking，代码压缩和性能优化。**
  
   - **开发效率不同**

     **webpack的热更新是全量更新，即使修改一个小文件，也会重新编译整个应用，这在大型应用中可能会导致编译速度变慢。**

     **vite的热更新是增量更新，只更新修改的文件，所以即使在大型应用中也能保持极快的编译速度。**

   - **扩展性不同**

     **webpack有着成熟的插件生态，几乎可以实现任何你想要的功能，扩展性非常强。**

     **vite虽然也支持插件，但相比webpack的生态，还有一些距离。**

