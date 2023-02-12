### 1. 盒模型

css中的元素可以看作盒子来进行设计和布局, 盒子由内到外包括content(内容)、padding（内边距）、border(边框)、margin(外边距)

- 标准盒模型（box-sizing: content-box）： offsetWidth = width + padding + border
- 怪异盒模型(IE盒模型  box-sizing: border-box):  offsetWidth = width

### 2.  rem 与 em 的区别

> rem相对于根元素的font-size变化，em根据父级的font-size变化

- rem一般用来设置字体大小，多用于移动端适配
- em一般用来设置margin、width等属性

### 3. CSS选择器

通配符*   ID选择器   类选择器   伪类选择器   标签选择器    组合选择器(> ,)

**按照权重递减排序：**

!import > ID选择器 > **类选择器(伪类)** > **标签选择器(伪元素)** > **通配符*(组合选择器)** > 继承 > 默认

### 4. CSS3新特性

**transition过渡  transform旋转  animation动画**  shadow阴影  **border-radius圆角**

### 5. 行内元素和块级元素

- 行内元素：与他元素同占一行，若一行排列不下换到下一行
  
  特点：不可设置宽高、不可设置竖直方向的margin
  
  举例：\<span>   \<img>  \<a>

- 块级元素：每个元素独占一行
  
  特点：可以设置宽高，可以设置margin
  
  举例: \<div>  \<p>  \<ul>

### 6. 定位

- relative：相对于自身定位
- absolute：相对于离的最近的定位元素(非static)定位, 脱离标准文档流
- fixed: 相对于浏览器窗口定位
- sticky: 根据滚动位置定位，在relative和fixed定位之间切换(本来是relative, 滚动超过目标区域变为fixed)

### 7. Flex布局

- flex-direction: 主轴方向， 决定元素横排还是竖排
- flex-wrap：决定元素换行格式，默认wrap
- justify-content: 决定元素水平方向对齐格式
- align-items: 决定元素竖直方向对齐格式
- align-content: 决定多行对齐方式
- align-self: 决定每个元素各自的竖直方向位置

flex:1 的含义： flex-grow：1  flex-shrink：1   flex-basis：0%。

### 8. BFC(块级格式化上下文)

BFC是一个独立渲染的区域，与外部的元素相互隔离，不会影响

**产生BFC的方式**: overflow: hidden   display: flex   display: inline-block   position: absolute  position: fixed

**BFC的应用**：消除竖直方向margin塌陷问题、清除浮动

### 9. 居中

- 行内元素(display: inline-block)
  - 水平居中：text-align: center
  - 垂直居中: line-height设置为高度的值
- 块级元素
  - 水平居中: 设置宽高,margin: 0 auto;   子绝父相，left设置50%，margin-left负值;   flex布局，justify-content: center
  - 垂直居中: 子绝父相，top设置50%, margin-top设置负值； flex布局， aligin-items: center
  - 水平垂直居中: 子绝父相 left、right、top、bottom:0,  margin: auto; 子绝父相； 子绝父相，left:50%, top: 50%, transform(-50%, -50%); flex布局，设置align-items和justify-content

### 10. less 、scss

预处理器(less、scss)：用来预编译，**增加了css的代码复用性，提供了变量、mixin、循环、函数等写法**

后处理器(postCss): 根据css规范处理css，让其更加有效，作用类似与babel，将先进的css语法转换成更兼容的版本

### 11. link与@import的区别

```html
<style type="text/css">
    @import url('');
</style>
<link href="" rel="stylesheet" type="text/css">
```

- **link可以定义rel、rss, @import只能用于加载css**
- **link同步加载css, @import等到页面加载完才开始加载**
- @import的浏览器兼容性不好
- link可以使用js动态引入， @import不行

### 12. 多行文本省略

```css
/* 多行文本省略 */
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 3;
-webkit-box-orient: vertical;
/* 单行文本省略 */
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
```

### 13. 伪类和伪元素的区别

- 伪元素：在内容元素的前后**插入额外的元素**或样式，但它们并不在文档中生成 (:after  :before)
- 伪类：在**已有元素**上添加类别，不会产生新的元素(:ntd-child  :hover)

### 14. 对requestAnimationframe的理解

- **requestAnimationframe传入一个回调函数作为参数，在浏览器下次重绘前执行**
- requestAnimationframe属于宏任务，会在执行完微任务之后再去执行
- 相比于setTimeout，不会出现**掉帧**的情况(setTimeout的执行时间间隔不一定与屏幕刷新率相同)

### 15. 判断元素到达可视区域

![img](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041453054.webp)

### 16. 画一条0.5px的线

- **采用meta viewport**
  
  ```html
  <meta name="viewport" content="width=device-width, initial-scale=0.5, minimum-scale=0.5, maximum-scale=0.5"/>
  ```

- **采用transform: scale()的方式**
  
  ```css
  transform: scale(0.5, 0.5);
  ```

### 17. 解决移动端1px问题

**物理像素：设备本身的像素**，实际像素

**逻辑像素：设计稿上的像素**，css像素

**像素密度：物理像素/逻辑像素**，为了保证不失真，1个图片像素至少要对应一个物理像素

> 移动端1px问题：在一些Retina屏幕的机型上，移动端页面的1px会变得很粗

- 直接写对应的逻辑像素
  
  window.devicePixelRatio = 像素密度，我们直接设置为 (1/像素密度) px

- meta viewport解决
  
  ```js
  const scale = 1 / window.devicePixelRatio;
  metaEl.setAttribute('content', `width=device-width, user-scalable=no, init-scale=${scale}, minimun-scale=${scale}`);
  ```

### 18. 画三角形

根据盒子模型，四个border相当于将一个正方形分为四个三角形，只设置其中一个border且其他border设置为transparent则显示对应的三角形

### 19. 隐藏元素的方法

- display: none——render tree不包含该元素，因此不占据位置也不会响应绑定的监听事件
- visibility: hidden——元素在页面中仍然占据空间，但是不会响应绑定的监听事件
- opacity: 0——元素在页面中仍然占据空间，可以响应绑定的监听事件

### 20. animation 和 transition 的区别

- animation通过**关键帧(keyframe)**的方式实现动画，关键帧可以是动画过程中的多个状态； transition是**过渡**，只有开始和结束两个状态
- animation可以**自动触发**， transition需要通过hover或js事件来触发
- animation可以**触发多次**(在属性中设置循环次数)，transition只能触发一次
- **transform**可以做形状大小的变化(缩放scale、旋转rorate、位移translate)

### 21. 两栏布局

一栏固定，一栏自适应

- float+margin

- float+BFC

- 绝对定位+margin

- flex布局，通过flex:1实现自适应

### 22. 三栏布局

左右两栏固定，中间自适应

- 圣杯布局, padding

- 双飞翼布局, margin

- flex布局，中间内容设置flex:1
