---
title: 深入js对象
date: 2019-11-23
---

## 对象系统

js对象，定义为对象运行时的属性的集合，属性以字符串或者 Symbol 为 key，以数据属性特征值或者访问器属性特征值为 value。（存在一套自己的类型系统）

#### 特点
1. **完全运行时** - JavaScript 提供了完全运行时的对象系统，使得它可以模仿多数面向对象编程范式
2. **高度动态性** - 对象为**引用类型**，数据保存在堆内存中（执行栈中保存引用），能够完全模仿传统的基于类的面向对象行为：
    1. **唯一标识性** - 即使完全相同的两个对象，也并非同一个对象
    2. **状态** - 对象具有状态，同一对象可能处于不同状态之下
    3. **行为** - 即对象的状态，可能因为它的行为产生变迁

### 数据属性

#### 特征
+ `value` - 就是属性的值
+ `writable` - 决定属性能否被赋值，默认为 `true`
+ `enumerable` - 决定 for in 能否枚举该属性，默认为 `true`
+ `configurable` - 决定该属性能否被删除或者改变特征值，默认为 `true`

#### 获取
可以使用 `Object.getOwnPropertyDescriptor` 来获取对象上某个属性的数据属性
``` js
var o = { a: 1 };
o.b = 2;

Object.getOwnPropertyDescriptor(o, 'a')
// {value: 1, writable: true, enumerable: true, configurable: true}
Object.getOwnPropertyDescriptor(o, 'b')
// {value: 2, writable: true, enumerable: true, configurable: true}
```

#### 修改
使用 `Object.defineProperty` 修改
``` js
var o = { a: 1 };
Object.defineProperty(o, 'b', {
    value: 2,
    writable: false,
    enumerable: false,
    configurable: true
});

Object.getOwnPropertyDescriptor(o, 'a');
// {value: 1, writable: true, enumerable: true, configurable: true}
Object.getOwnPropertyDescriptor(o, 'b');
// {value: 2, writable: false, enumerable: false, configurable: true}
o.b = 3;
console.log(o.b); // 2
```

### 访问器属性

#### 特征
+ `getter` - 函数 或 `undefined` ，在取属性值时被调用
+ `setter` - 函数 或 `undefined` ，在设置属性值时被调用

#### 重写
ES5 可以使用 `Object.defineProperty`
``` js
var obj = { a: 1 };
Object.defineProperty(obj, 'a', {
    get: function() {
        /* side effect !!! */
        console.log('get obj.a');

        return this.value;
    },
    set: function(val) {
        /* side effect !!! */
        console.log('set obj.a: ', val);

        this.value = val;
    }
});

obj.a; // get obj.a
obj.a = 2; // set obj.a: 2
```

ES6 可以直接使用 get 关键字定义
``` js
var obj = {
    get a() {
        /* side effect !!! */
        console.log('get obj.a');

        return this.value;
    },
    set a(val) {
        /* side effect !!! */
        console.log('set obj.a: ', val);

        this.value = val;
    }
};

obj.a; // get obj.a
obj.a = 2; // set obj.a: 2
```

### 对象冻结

#### 引用变量冻结 const
+ ES6 可以通过 `const` 关键字可以定义常量
+ 使用 `const` 定义常量，会使得索引指向不可被重写（若定义为引用类型将始终指向堆内存中的真实对象）
+ 若尝试将 `const` 定义的常量重新赋值，会抛出错误
``` js
const obj = {};
obj = {}; // Uncaught TypeError: Assignment to constant variable.
```

存在的问题：只能冻结引用类型的引用，并不能阻止修改对象属性 `obj.a = 123`

#### 属性冻结 Object.freeze
+ 通过改写属性描述符冻结对象属性
+ 能阻止修改对象属性（静默失败）
+ 实际就是通过 `Object.defineProperty` ，递归的将对象可枚举属性一一设置为不可写、不可配置
+ 类似于 `Object.defineProperty(obj, key, { writable: false, configurable: false });`
``` js
var obj = { a: 123 };
Object.freeze(obj);
Object.getOwnPropertyDescriptor(obj, 'a');
// {
//     value: 123,
//     writable: false,
//     enumerable: true,
//     configurable: false
// }
```

存在的问题：只能冻结深度为 1 的属性，若对象的属性也还是引用类型则失效
``` js
var obj = {
    a: {
        a: 123
    }
};
Object.freeze(obj);
obj.a.a = 321;
obj.a.a // 321
```

#### 深度冻结 deepFreeze

思路：遍历对象的可枚举属性，若为 **普通类型** 则设置为不可写、不可配置，若为 **引用类型** 则递归遍历

实现请移步 [deepFreeze](/FE-notes/手写代码.html#deepfreeze)

## 面向对象

+ `new` ：JavaScript关键字，用于实例化一个对象
+ `构造函数` ：普通的函数使用 `new` 操作符调用，这个函数就被称为构造函数
+ `prototype` ：每一个**函数**都有一个叫 `prototype` 的公有并且不可枚举属性，指向的是这个构造函数的原型对象（注意是一个对象）
+ `constructor` ：函数上的 `prototype` 属性默认会有一个 `constructor` 属性，引用的是对象关联的函数，指的是对象由该函数 “构造”（这里需注意：实例化对象上本身并不存在 `constructor` 属性，只是从原型上委托过来的）
+ `__proto__` ：每个**实例对象**（ object ）都有一个私有属性（称之为 `__proto__` ）指向其的构造函数的原型对象（`prototype`），Function.__proto__ 指向自己！！
+ `[[Prototype]]` ：JavaScript对象的内部链接，指向该对象的原型，等同于非标准但许多浏览器实现的属性 `__proto__` 。可以通过 Object.getPrototypeOf() 和 Object.setPrototypeOf() 访问器来访问。

### [[Class]]

+ 早期 js 中引用类型都存在私有属性 `[[Class]]` ，用来表示它们的类
+ `[[Class]]` 只可以通过 `Object.prototype.toString`
+ ES5 开始，被 `Symbol.toStringTag` 代替，可重写
    ``` js
    var o = { [Symbol.toStringTag]: 'SomeOtherType' };
    o.toString(); // '[object SomeOtherType]'
    ```
+ 所有具有内置 class 属性的对象
    ``` js
    var o = new Object;
    var n = new Number;
    var s = new String;
    var b = new Boolean;
    var d = new Date;
    var arg = function(){ return arguments }();
    var r = new RegExp;
    var f = new Function;
    var arr = new Array;
    var e = new Error;
    console.log([o, n, s, b, d, arg, r, f, arr, e].map(v => Object.prototype.toString.call(v)));
    // [
    //     "[object Object]",
    //     "[object Number]",
    //     "[object String]",
    //     "[object Boolean]",
    //     "[object Date]",
    //     "[object Arguments]",
    //     "[object RegExp]",
    //     "[object Function]",
    //     "[object Array]",
    //     "[object Error]"
    // ]
    ```

### [[prototype]]

+ 所有对象都有私有字段 `[[prototype]]`，就是对象的原型
+ 委托原则 - 又叫原型链查找，即通过 `.` 操作符获取对象属性时，若该对象上不存在该属性，则会去往原型链上找该属性，一直找到 `Object.prototype`（`Object.prototype.__proto__ === null`）
+ 构造函数 - 使用 `new` 关键字调用的函数，即为 构造函数
    + 默认返回对象实例，可通过显式的返回对象重写（若返回基本类型则无效）
+ `prototype` - 显式原型对象
    + 每个 function 上自带属性，作为原型对象
+ `constructor` - 构造函数引用
    + prototype 上的属性，保存原型对象的构造函数引用
    + 遵循委托原则
+ `__proto__` - 隐式原型对象
    + 保存在实例对象上

::: tip 关键点：
对象实例上的 `隐式原型` 指向 其对应构造函数上的 `显式原型` ！！！
:::

#### 简单的关联关系
``` js
function Person(name) {
    this.name = name;
}
var man = new Person('man');
man.__proto__ === Person.prototype; // true
```

### new

通过 `new` 关键字调用的函数，称为构造函数，执行时做了4件事情：
1. 以构造函数的 prototype 属性为原型，创建新对象
2. 将 this 指向构造函数返回的对象
3. 调用参数传给构造器，执行
4. 如果构造函数返回的是对象，则返回，否则返回第一步创建的对象

#### 一定程度上的私有

> 如果构造器返回了一个新的对象，那么 new 创建的新对象就变成了一个构造函数之外完全无法访问的对象

这意味着可以构造一定程度上的私有，如果没有将变量返回出去，在外部则访问不到内部的变量

``` js
function cls(){
    this.a = 100;
    return {
        getValue:() => this.a
    }
}
var o = new cls;
o.getValue(); //100
// a在外面永远无法访问到
```

### 原型系统

![js原型对象关系](/blog/img/object/js原型对象关系.png)

#### 面试题中找原型关系
牢记几个规律：
1. 找 `o.__proto__` 时，就将 `o` 作为对象来看待，看 `o` 是什么类型的
2. 找 `o.constructor` 时，切记 constructor 是绑在 prototype 上的，指向其原型对象的构造函数，依照委托原则，向上委托的是原型上的constructor

### Object.create

`Object.create(proto[, propertiesObject])`

+ 创建一个新对象，使用传入的对象来提供新创建的对象的 `__proto__`
+ **实际上就是通过原对象构建了一个新的实例对象，新的实例对象的 `[[prototype]]` 与原对象的 `[[prototype]]` 关联**

#### 参数
+ proto - 新创建对象的原型对象
+ propertiesObject - 要添加到新创建对象的可枚举属性
    ``` js
    const obj = Object.create({}, {
        // foo会成为所创建对象的数据属性
        foo: { 
            writable: true,
            configurable: true,
            value: "hello" 
        },
        // bar会成为所创建对象的访问器属性
        bar: {
            configurable: false,
            get: function() { return 10 },
            set: function(value) {
                console.log("Setting `o.bar` to", value);
            }
        }
    });
    obj.foo // 'hello'
    obj.bar // 10
    ```

#### polyfill
``` js
Object.create = function (proto) {
    // 仅支持第一个参数
    function F() {}
    F.prototype = proto;

    return new F();
};
```

### ES6 class

删除了所有 `[[class]]` 相关的私有属性描述，基于类的编程方式成为了 JavaScript 的官方编程范式

#### 实现 class

移步 [class](/FE-notes/手写代码.html#class)

### 继承（ES5 & ES6）

移步 [继承](/FE-notes/手写代码.html#继承)

## 对象分类

我们可以将对象分为几大类，他们分别由运行时环境（宿主环境，浏览器、node）与 js 语言本身提供

+ 宿主对象 - 由运行时所在环境提供，通过某种机制注册到 js 引擎中，行为完全由宿主环境决定
+ 内置对象 - 由 js 语言提供
    + 固有对象：由标准规定，随着 JavaScript 运行时创建而自动创建的对象实例
    + 原生对象：可以由用户通过 Array、RegExp 等内置构造器或者特殊语法创建的对象
    + 普通对象：由 `{}` 语法、Object 构造器或者 class 关键字定义类创建的对象，它能够被原型继承。

### 宿主对象

由运行时所在环境提供，通过某种机制注册到 js 引擎中，行为完全由宿主环境决定

+ 浏览器：
    + 固有的 - window 、document 、Event 、location 、history...
    + 用户可创建的 - document.createElement 、new Image ...
+ node:
    + fs 文件系统
    + commonJS 模块化方案
    + ...

### 固有对象

+ 由 ECMAScript标准 规定的
+ 在任何 JavaScript 代码执行前就已经被创建出来了，类似于基础库
+ js 中**固有对象**种类目前多达 155+ 个

可以通过下面的一系列对象，通过广度优先搜索其上所有属性和 Getter/Setter，基本可以获取到 js 中所有的**固有对象**
#### 三个值
Infinity 、NaN 、undefined
#### 九个函数
eval 、isFinite 、isNaN 、parseFloat 、parseInt 、decodeURI 、decodeURIComponent 、encodeURI 、encodeURIComponent
#### 一些构造器
Array 、Date 、RegExp 、Promise 、Proxy 、Map 、WeakMap 、Set 、WeakSet 、Function 、Boolean 、String 、Number 、Symbol 、Object 、Erro r、EvalError 、RangeError 、ReferenceError 、SyntaxError 、TypeError 、URIError 、ArrayBuffer 、SharedArrayBuffer 、DataView 、Typed Arra y、Float32Array 、Float64Array 、Int8Array 、Int16Array 、Int32Array 、UInt8Array 、UInt16Array 、UInt32Array 、UInt8ClampedArray
#### 四个用于当作命名空间的对象
Atomics 、JSON 、Math 、Reflect

### 原生对象

+ JavaScript 中，能够通过语言本身的构造器（30+ 个）创建的对象称作原生对象
+ 基本都不是使用纯 js 语法实现的（c++），**可以使用 class/extend 语法继承其原型上的方法，但是没法跟原生对象一模一样的**

![js原生对象](/blog/img/object/js原生对象.png)

### 普通对象

由 `{}` 语法、Object 构造器或者 class 关键字定义类创建的对象，它能够被原型继承

### 函数对象与构造器对象

+ 函数对象 - 任何具有 `[[call]]` 私有字段的对象，可以被调用执行
+ 构造器对象 - 任何具有私有字段 `[[construct]]` 的对象，可以被 `new`
