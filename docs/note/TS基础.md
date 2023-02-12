### 1. 基础类型

- 布尔 boolean
- 数字 number
- 字符串 string
- 数组 number[]  Array\<number\>
- 元组(已知元素数量和类型的数组) [string, number]
- 枚举 enum Color { Red, Green, Blue }      let c: Color = Color.Green
- 任意值 any
- 空值 void

### 2. 类型断言

**类似于类型转换**

```typescript
// 尖括号语法
let someValue: any = "xx";
let value: number = (<string>someValue).length;
// as语法
let value: number = (someValue as string).length;
```

### 3. 接口

```typescript
interface config {
    label: string;
    color?: string; // 可选属性
    readonly x: number; // 只读属性
    // 绕开类型检查
    // 索引签名，用string类型索引可以得到any类型变量
    [propName: string]: any;  
    [index: number]: string;
}

interface SearchFunc {
    // 函数类型
    (source: string, subString: string): boolean;
}

interface ClockInterface {
    currentTime: Date;
}
interface son extends father {
    // 使用extends关键字继承
    // 如果发生冲突则会导致编译错误
}
```

### 4.函数

```typescript
// 定义函数类型表达式
function add(x: number, y: number): number {
    return x + y;
}
function add(x:number, y: number) => number = {}
// 可选参数
function build(firstName: string, lastName?: string) {
}
// 设置参数默认值
function build(firstName: string, lastName = "Smith"){}
// 参数解构，shape: Shape表示的是把shape的值赋值给局部变量Shape
function draw({ shape: Shape, xPos: number }) {
	render(shape); // Cannot find name 'shape', Did you mean 'Shape'
}
// 回调函数
function greeter(fn: (a: string) => void)
// 调用签名, 声明一个带有属性的函数
type DescribableFunction = {
    description: string,
    (someArg: number): boolean
}
function doSomething(fn: DescribableFuncion) {
    // fn.description
}
// 构造签名, 构造函数的类型
type SomeContructor = {
    new (s: string): SomeObject;
}
```

### 5. 泛型

类型变量T帮助我们**捕获用户传入的类型**, 增强程序的扩展性，不必写过多的类型重载

```typescript
function identity<T>(arg: T): T {
    return arg;
}
identity('str');

// 泛型类
class GenericNumber<T> {
    zeroValue: T;
}
// 泛型接口
interface Log<T> {
    (value: T): T
}
// 泛型约束
interface Length {
    length: number
}
// 泛型函数
function log<T extends Length>(value: T):T {
    console.log(value.length);
    return value;
}
```

### 6. 交叉类型和联合类型

```typescript
interface DogInterface {
    run(): void
}
interface CatInterface {
    jump(): void
}
// 交叉类型，每个类型都需要满足
let pet: DogInterface & CatInterface = {
    run() {}
    jump() {}
}
// 使用交叉类型时，如果两个类型有冲突，则取两种类型的交集

// 用 | 分割每个类型
let a: number | string | boolean; // 表示可以是number,string,boolean
```

### 7. 声明文件

> 引入第三方js库，需要编写声明文件

.d.ts 兼容第三方库

```js
// globalLib.js
function globalLib(options) {
    console.log(options)
}
globalLib.version = 'xx'
globalLib.doSomething = function() {
    console.log('xx')
}
```

```typescript
// globalLib.d.ts
declare function globalLib(options: globalLib.Options): void;
declare namespace globalLib {
    const version: string;
    function doSomething(): void;
}
```

### 8. 类

```typescript
class Dog() {
    constructor(name: string) {
        this.name = name;
    }
    // 成员修饰符
    public name: string = 'xx';
    run() {}
    private fn() {}
    protected fn2() {}
}

class Husky extends Dog() {
    constructor(name: string, color: string){
        super(name);
    }
}
```

### 9. 索引

可以使用**索引访问类型**查找另外一个类型上的特定属性,索引名也要是一个类型

```typescript
// 索引类型
type Person = { age: number; name: string; alive:boolean };
type Age = Person["age"]; // Age = number
Person[keyof Person] // string | number | boolean

// 通过number来获取数组元素的类型
const MyArray = [
  { name: "Alice", age: 15 },
  { name: "Bob", age: 23 },
  { name: "Eve", age: 38 },
];
type Person = typeof MyArray[number]; 
// {name: string; age: number}
// keys里的每个成员都必须是obj的属性
// T[k]表示对象T的K属性的类型
function getValues<T, K extends keyof T>(obj: T, keys: K[]): T[k][] {

}
```

### 10 . 映射

基于一种类型根据某种规则映射到另一种新的类型。

```typescript
// OptionFlags会遍历Type的所有属性，然后设置为布尔类型
type OptionsFlags<T> = {
    // Property通过keyof创建，然后遍历键名创建一个类型
    [Property in keyof T]: boolean;
}

// 映射修饰符 redonly设置属性只读 ?设置属性可选 可以通过前缀-删除修饰符
type CreateMutable<T> = {
    // 删除属性中的只读属性
    -readonly [Property in keyof T]: T[Property];
    // 删除属性中的可选属性
    [Property in kyeof T]-?: T[Property];
}
```

```typescript
interface Obj {
    a: string;
    b: number;
    c: boolean
}
// ReadOnly是内置接口, 将一个接口中每个类型变为只读
type ReadonlyObj = ReadOnly<Obj>
// Partial将一个接口中每个类型变为可选
type PartialObj = Partial<Obj>

// ReadOnly实现
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
}
```

### 11. 命名空间

```typescript
namespace Shape {
    export function square() {
        // xxx
    }
}
Shape.square()
```

### 12. tsconfig.json配置

- 文件配置：include、exclude

- 编译配置：compileOptions

### 13. 类型收窄

> ts会根据条件自动进行更精细的类型判断，如typeof 、条件运算&& || !!、instanceof

```typescript
function demo(a: number|null): string {
    // a + 1 报错，a可能是null类型
    a && a+1; // 编译通过，a:number
}
```

### 14. `keyof`类型操作符

- 对一个对象类型使用`keyof`操作符会返回由对象属性名组成的一个联合

  ```typescript
  type Point = { x: number, y: number };
  type P = keyof Point;
  // P: "x"|"y"
  ```

- 约束对象类型

  ```typescript
  function getProperty<Type, Key extends keyof Type> {
      return obj[key];
  }
  ```


### 15. `typeof`类型操作符

- JS中的typeof运算符在表达式上下文中使用

  ```js
  console.log(typeof "xxx"); // string
  ```

- TS中的typeof方法在类型上下文中使用

  ```typescript
  let s = "xxx";
  let n: typeof s;
  // 对象的typeof
  const person = { name: 'xx', age: 18 };
  type Person = typeof person;
  // { name: string, age: number }
  // 函数的typeof
  function f<T>(arg: T): T {
      return arg;
  }
  type F = typeof f; // <T>(arg: T) => T
  ```

- 通过内置的ReturnType\<T>获取函数返回值类型

  ```typescript
  type f = (x: unknown) => boolean;
  type K = ReturnType<f>;
  ```


### 16. 条件类型

基于输入的值的类型决定输出值的类型

```typescript
// 简化函数重载
interface IdLabel {
    id: number
}
interface NameLable {
    name: string
}
type NameOrId<T extends number | string> = T extends number ? IdLabel : NameLabel
// 条件类型中推断, 如果输入数组，则返回数组中值的类型
type Flatten<T> = T extends Array<infer Item> ? Item : T;
```

