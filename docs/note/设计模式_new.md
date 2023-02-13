> 设计模式：根据前人经验总结的最佳实践经验，归纳为创建型、结构型、行为型23种设计模式，有助于编写高质量代码(高内聚、低耦合、单一职责等)

### 1. 工厂模式

**由工厂对象决定创建某一个产品类的实例**

```javascript
// 不使用工厂模式
class Jacket {

}
class Tshirt {

}
// 使用工厂模式
class ClothingFactory {
    getFactory(clothingType) {

    }
}
```

### 2. 单例模式

**保证一个类只能被实例一次**。前端开发中，弹窗只能有一个实例(显示或隐藏状态)

```javascript
class LoginFrame {
    static instance = null;
    static getInstance() {
        if(!this.instance) {
            this.instance = new LoginFrame()
        }
        return this.instance
    }
}
```

### 3. 策略模式

**定义一系列算法，把它们封装起来，将算法的使用和实现分离**

```javascript
const rules = {
    rule1: {},
    rule2: {}
    rule3: {}
}
```

对于复杂逻辑中if else的嵌套问题，可以用策略模式解决(表驱动: 使用下标/索引访问)

```typescript
// 当前月份的天数
const month: number = new Date().getMonth(),
    year: number = new Date().getFullYear(),
    isLeapYear: boolean = year % 4 == 0 && year % 100 != 0 || year % 400 == 0;

const monthDays: number[] = [31, isLeapYear ? 29 : 28, 31, ... , 31];
const days: number = monthDays[month];
```

### 4. 装饰器模式

典型应用： HOC

**在不改变自身代码的情况下，动态地对其职责进行添加**

```javascript
class Cookie {

}
class Decorator {
    constructor(cookie) {
        this.cookie = cookie
    )
    shape(){
        console.log('圆形')
    }
}
const cookie = new Cookie();
const roundCookie = new Decorator(cookie);
```

### 5. 观察者模式

**两个主体：目标对象(Object)  观察者(Observer)**

当目标对象发生变化时，所有依赖它的观察者都会收到通知(DOM的事件监听)

| 目标对象Subject     | 观察者列表observerList | 订阅方法subscribe | 通知方法notify |
| --------------- | ----------------- | ------------- | ---------- |
| **观察者Observer** | 更新方法update        |               |            |

```javascript
class Observer {
    constructor(name) {
        this.name = name;
    }
    update() {
        console.log('更新')
    }
}

class Subject {
    constructor() {
        this.observerList = [];
    }
    subscribe(type, observer) {
        this.observerList.push(observer)
    }
    notify() {
        this.observerList.forEach(item => {
            item.update();
        })
    }
    unsubscribe(name) {
        this.observerList = this.oberverList.filter(item => 
            item.name !== name
        )
    )
}
```

### 6. 发布-订阅模式

**三个主体：发布者Publisher  订阅者Subscriber  事件调度中心Event Channel**

发布者发布事件后，由事件调度中心通知所有订阅者

发布者和订阅者彼此解耦，通过事件调度中心完成发布订阅过程

| 发布者Publiser         |               |           |             |
| ------------------- | ------------- | --------- | ----------- |
| 事件调度中心Event Channel | 事件存储eventList | 发布publish | 订阅subscribe |
| 订阅者Subscriber       |               |           |             |

```javascript
// 所有操作均由事件调度中心完成
class EventChannel {
    constructor() {
        this.eventList = {};
    }
    subscribe(type, handler) {
        if(eventList[type]) {
            this.eventList[type].push(handler);
        } else {
            this.eventList[type] = [];
            this.eventList[type].push(handler);
        }
    }
    publish(type) {
        if(this.eventList[type]) {
            this.eventList[type].forEach(item => {
                item(...arguments.slice(1));
            })
        }
    }
    remove(type, name) {
        if(this.eventList[type]) {
            this.eventList[type] = this.eventList[type].filter(item => item.name !== name)
        }
    }
}
```

### 7. 原型模式

**克隆自身，生成一个新的对象**

```javascript
Object.create();
```

### 8. 代理模式

### 9. 中介者模式