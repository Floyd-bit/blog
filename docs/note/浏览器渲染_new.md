![img](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041456973.webp)

### 1. 浏览器渲染过程

1. 首先解析收到的文档，根据文档定义构建一棵 **DOM 树**，DOM 树是由 DOM 元素及属性节点组成的。
2. 然后对 CSS 进行解析，生成 **CSSOM 规则树**。
3. 根据 DOM 树和 CSSOM 规则树构建**渲染树(render tree)**。渲染树的节点被称为渲染对象，渲染对象是一个包含有颜色和大小等属性的矩形，渲染对象和 DOM 元素相对应，但这种对应关系不是一对一的，不可见的 DOM 元素(**meta标签、script标签，display:none的元素**)不会被插入渲染树。还有一些 DOM元素对应几个可见对象，它们一般是一些具有复杂结构的元素，无法用一个矩形来描述。
4. 当渲染对象被创建并添加到树中，它们并没有位置和大小，所以当浏览器生成渲染树以后，就会根据渲染树来进行**布局(Layout)**（也可以叫做**回流**）。这一阶段浏览器要做的事情是要弄清楚各个节点在页面中的确切**位置和大小(几何信息)**。通常这一行为也被称为“自动重排”。
5. 布局阶段结束后是**绘制(paint)**阶段，根据渲染树和回流得到的几何信息，计算出每个节点的绝对像素
6. 展示(Display): 将像素发送给GPU，展示在页面上

### 2. 触发回流重绘的操作

> 回流一定会触发重绘，而重绘不一定会回流

**回流：**

- 添加或删除可见的DOM元素
- 元素的位置发生变化
- 元素的尺寸发生变化
- 浏览器的窗口尺寸变化

### 3. 减少回流和重绘

- 使经常修改的DOM元素**脱离文档流**，不影响其他元素
- 最小化重绘和重排，样式集中改变
- ccs3硬件加速(GPU加速)，使得动画不会引起回流重绘
- 不要使用table布局，因为一个小的改动会造成整个table的重新布局
- 批量添加DOM时，使用文档碎片DocumentFragment

### 4. 分层和合成

`光栅化(rasterizing)`: 将元素的几何信息、样式信息、绘画顺序转化为显示器中的像素

`动画的渲染`：

- 只光栅化视口(viewport)内的网页内容，滚动网页时移动光栅帧并且光栅更多的内容以补上页面缺失的部分
  
  ![](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041456974.png)

- 利用分层和合成的技术，将页面各个层光栅化，滚动网页时只需要将页面上的层进行移动并构建成新的一帧
  
  ![](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041456975.png)

在实现一些复杂的动画效果时，如果采用js实现，每次页面发生改变都会触发重排或者重绘机制，影响页面的渲染效率

使用css动画实现，利用GPU实现分层和合成。类似于ps，可以把一张网页当成多个图片叠加在一起，将一个页面分为多层，这样在更新页面时只需要在相应层上进行变化，最后再合成。

### 5. 页面渲染技术架构

1. 服务端渲染

   后端同步渲染(jsp、php)、同构直出(node.js)

   **JSP同步渲染流程**：

   .jsp文件请求时，对应的JSP Servlet进行编译并发送给客户端浏览器HTML

   缺点：渲染耗时长，用户需等待HTML完全加载后才能看到页面内容；代码耦合严重，业务逻辑和页面模板耦合在一起

2. 客户端渲染

   - JS渲染：SPA
   - Web APP: Angular、React、Vue, PWA
   - 原生APP：IOS、Android
   - Hybrid APP: PhoneGap
   - 跨平台开发：React Native、Flutter、小程序
