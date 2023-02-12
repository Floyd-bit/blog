### 1. 编译原理

- **编译型语言**和**解释性语言**
  
  编译型语言是在代码运行前编译器将高级编程语言转换成机器语言，如C、C++
  
  解释型语言是在运行时将高级编程语言转换成机器语言，如java、javascript

- 编译在前端领域的应用
  
  高级语言编译为机器语言：V8引擎编译JS、TypeScript编译器(tsc)
  
  前端工程化：webpack loader编译器(acorn)、babel
  
  前端框架语法转换：Vue Template模板编译器、jsx

- **高级语言的编译**
  
  1. 编译过程
     
     ![](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041455637.png)
  
  2. 词法分析
     
     分词：识别出每一个单词和符号，拆分成一个个**token**。利用有限状态机对token进行模式匹配，识别出每一个token的类型
     
     有限状态机：两个状态s1和s2, 若当前处于s1状态，输入0则进入s2状态。如表达式`10+20-30`在进行词法分析时，首先分析1判断类型为数字，则继续向后分析0，分析到+时状态改变。最终可以解析得到token数组为：[{type: 'number', value: '10'}, {type: 'ADD', value: '+'} ...]
     
     ![](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041455638.png)
  
  3. 语法分析
     
     语法分析会将词法分析得到的token数组转化为**抽象语法树AST**
     
     对于代码`const name = 'xujianglong'`, 生成的抽象语法树(**json 结构**)如下：
     
     ```json
     {
         "type": "Program",
         "start": 0,
         "end": 28,
         "body": [
             {
                 "type": "VariableDeclaration",
                 "start": 1,
                 "end": 28,
                 "declaration": [
                 {
                     "type": "VariableDeclarator",
                     "start": 7,
                     "end": 27,
                     "id": {
                         "type": "Identifier",
                         "start": 7,
                         "end": 11,
                         "name": "name"
                     },
                     "init": {
                         "type": "Literal",
                         "start": 14,
                         "end": 27,
                         "value": "xujianglong",
                         "raw": "xujianglong"
                     }
                 }
                 ],
                 "kind": "const"
             }
         ],
         "sourceType": "module"
     }
     ```
  
  4. 语义分析
     
     语义分析阶段编译器对AST进行遍历，主要包括**声明检查和类型检查**(变量是否被重复声明，const类型变量是否被改变，函数参数数量检查)
  
  5. 中间代码生成与优化
     
     一般编译器并不会直接生成目标代码，而是先生成**中间代码**，再生成目标代码。

              v8引擎在编译Js时，先将AST编译为字节码，再通过JIT转换成目标代码

### 2. Babel的编译流程

> Babel是一个JS转换编译器，用于将ES6+语法编写的代码转换为向后兼容的JS语法，并且还可以将新的api进行polyfill

![](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041455639.png)

- parse(将代码解析为AST)
  
  通过`@babel/parser`包(之前叫babylon)进行转换

- transform(转换AST)
  
  通过`@babel/traverse`对AST进行深度优先遍历，对需要修改的节点进行操作(**替换新语法、polyfill**)

- generate(生成目标代码)
  
  通过`@babel/generator`逆向操作AST，遍历AST根据节点类型和属性生成目标代码

