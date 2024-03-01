### 1. type和interface的区别

1. type是**类型别名**，可以用来表示**基本类型、对象类型、联合类型、元组**
   
   ```typescript
   type useName = string; // 基本类型
   type userId = string | number; // 联合类型
   type arr = nuber[]; // 数组
   type Person = {
       id: userId;
       name: userName;
   }
   ```

2. interface是**接口**，仅限于描述**对象类型**
   
   ```typescript
   interface Person {
       id: string | number;
       name: string;
   }
   ```

3. **声明合并**
   
   如果多次声明一个同名的接口，TS会将它们合并到一个声明中
   
   重复声明同名的type则会报错
   
   ```typescript
   interface Person {
       name: string
   }
   interface Person {
       age: number
   }
   let user: Person = {
       name: 'xx',
       age: 1
   }
   ```

4. 最佳实践
   
   - **React组件中props及state的类型使用type声明，这样能够保证使用组件的地方不能在上面添加属性**
   - **在引入第三方库时的类型声明文件.d.ts中，使用interface更加灵活的类型合并**

### 2. 使用TS的好处

**静态类型语言的类型在编译阶段确定，而动态类型语言则会在执行阶段确定变量的类型**

![image-20220308203032728](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041455022.png)

![image-20220308203204279](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041455023.png)

### 3. any、never、unknown、void

- any表示**任意类型**，也是默认类型，即对any类型不作约束，**编译时会跳过类型检查**，一般不建议使用
- void表示**无任何类型**，函数没有返回值
- unknown表示**未知类型**，即不清楚具体的数据类型，如接口返回数据。相当于any类型的安全版本，unkonwn可以被赋值为任何类型
- never表示**永不存在的类型**，如函数会抛出异常或死循环

### 4. 工具类型

- Partial\<T>: 将类型 T 的所有属性变为**可选**属性
- Required\<T>: 将类型 T 的所有属性变为**必选**属性
- Readonly\<T>: 将类型 T 的所有属性变为**只读**属性
- Pick\<T,K>: 从类型 T 中**选择**属性名为类型 K 中的属性，创建一个新类型
- Omit\<T,K>: 从类型 T 中**排除**属性名为类型 K 中的属性，创建一个新类型
- Exclude\<T,U>: 从类型 T 中排除类型 U 中的所有属性
- ReturnType\<T>:  获取函数类型 T 的返回值类型

### 5. 第三方库类型

```typescript
// lodash.d.ts
declare module 'lodash' {
  function utils(...args: any[]): any;
  export { utils };
}
```

