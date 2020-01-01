---
title: js执行过程
date: 2019-11-27
---

## 代码段

js 代码执行过程中，**最大颗度**的执行片段

### 宏任务

js 等待宿主环境分配宏任务，类似于一个在独立线程的 `while(TRUE)` 的循环，内部加上 **判断循环是否结束、宏观任务队列** 等逻辑
``` js
while (TRUE) {
    r = wait();
    execute(r);
}
```
这样的一次循环就对应着一次宏任务，引擎不断的判断当前任务队列中是否存在任务，一次次执行

+ 宿主级别任务
+ 宏观任务的队列就相当于事件循环
+ 存在于宿主环境主线程中，代表一次 js 脚本的执行
+ 可以由宿主环境提供的API，调用产生新的宏任务

### 微任务

每个宏任务中包含一个微任务队列，js引擎产生微任务添加至任务队列末尾

+ 引擎级别任务
+ 存在于宏任务中，由 js引擎 提供的API产生
+ 微任务一定在下一个宏任务之前执行，换句话说：**下一个宏任务执行之前会将上一个宏任务中的微任务全部执行完**

### 比较

下一个宏任务执行之前会将上一个宏任务中的微任务全部执行完

#### 分析异步执行的顺序

1. 首先我们分析有多少个**宏任务**
2. 在每个**宏任务**中，分析有多少个**微任务**
3. 根据调用次序，确定宏任务中的微任务**执行次序**
4. 根据宏任务的触发规则和调用次序，确定宏任务的**执行次序**
5. 确定整个顺序

#### sleep

常用的程序休眠工具函数

1. 同步休眠
    + js主线程休眠，全局休眠，会同时阻塞 GUI
    + 通过循环阻塞当前主线程实现休眠
    + 所有异步任务即使在休眠时期触发也被会被阻塞
    ``` js
    const sleepSync = delay => {
        const start = Date.now();
        while (Date.now() - start < delay);
    }
    setTimeout(() => console.log('我想要引擎空闲就执行'), 0);
    sleepSync(1000);
    // 一秒之后打印 '我想要引擎空闲就执行'
    ```
2. 异步休眠
    + 只会阻塞当前宏任务
    + 将休眠后的代码作为宏任务添加进异步队列队尾
    ``` js
    const sleep = delay => new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, delay)
    });
    setTimeout(() => console.log('我想要引擎空闲就执行'), 0);
    await sleep(1000);
    // 立即打印 '我想要引擎空闲就执行'
    ```

#### 一道有♂趣的面试题

``` js
setTimeout(() => console.log("d"), 0)
var r = new Promise(function(resolve, reject){
    resolve()
});
r.then(() => { 
    var begin = Date.now();
    // 刻意构造一个阻塞，模拟一个 执行1秒 的微任务
    while (Date.now() - begin < 1000);
    console.log("c1");
    new Promise(function(resolve, reject) {
        resolve();
    }).then(() => console.log("c2"));
});

// 打印结果为 c1 c2 d
```

#### 一道更有♂趣的面试题

``` js
const LOG = console.warn;

setTimeout(() => LOG('s0'), 200);
setTimeout(() => LOG('s1'), 600);

new Promise((resolve) => {
    setTimeout(() => LOG('s2'), 100);
    sleep(300);
    setTimeout(() => resolve(), 90);
}).then(() => {
    (async () => {
        setTimeout(() => LOG('s3'), 100);
        sleep(150);
        setTimeout(() => LOG('s4'), 0);
        await {};
        LOG('6');
    })();
    new Promise((resolve) => {
        sleep(1000);
        resolve();
    }).then(() => LOG('7'));
    LOG('8');
});

function sleep(n) {
    var start = Date.now();
    while (Date.now() < n + start) {}
}

// 打印结果为 S2 S0 8 6 7 S3 S4 S1
```

## 函数

js 代码执行过程中，**函数颗度**的执行片段

### 函数执行过程术语

+ **闭包**
    + `Closure`
    + 官方：一个绑定了执行环境的函数
    + 白话：使用了本不该使用的变量的函数，函数所需的 **作用域链** 的持久化的快照
    + 保存在堆内存中
+ **作用域**
    + `Scope`
    + *Global Scope* - 全局作用域
    + *Function Scope* - 函数作用域
    + *Block Scope* - 块级作用域（ES6+）
+ **执行上下文**
    + `Execution Context`，`EC`
    + 执行的基础设施
+ **调用栈**
    + `Callback Stack`
    + 函数调用时产生的进度信息
    + 当子函数结束时需要继续执行父函数后续过程
+ **执行上下文栈**
    + `Execution Context Stack`，`ECS`
    + 包含一组 `EC`，栈底永远是 `Global EC`
    + 是 `Callback Stack` 背后的实际数据结构，用于过程管理

### 闭包 `Closure`

#### 概念结构
``` js
fn {
    prototype: {
        constructor: fn,
    },
    // 作用域链（解构就像正常执行时那样）
    [[Scopes]]: [
        Closure {}, // 闭包
        Closure {}, // 根据作用域链的概念，可能存在多级闭包
        ...
        Global {},
    ]
}
```
+ 环境部分
    + 环境：函数的词法环境（执行上下文的一部分）
    + 标识符列表：函数中用到的未声明的变量（本不该使用的那部分）
+ 表达式部分：函数体

### 执行上下文 `EC`

#### 概念结构
``` js
{
    VO / AO：{
        arguments?: ArrayLike<any>,
        [declarations]: any,
    },
    [[Scopes]]: [
        Scope {}, // 父级作用域
        Scope {}, // 多级父级作用域
        ...
        Global {}, // 栈底是全局作用域
    ],
    this: {} || undefined,
}
```

#### ES3
+ this - 当前 `EC` 的this指向
+ 作用域链 - `Scope Chain`，在浏览器中表现为 `[[Scopes]]：Array` ，定义为：Scope = AO | VO + [[Scope]] （活动对象添加到作用域链的前部）
+ 变量对象 - `Variable Object`，`VO`，每个 `EC` 的一部分，保存**当前** `EC` 中词法环境的变量
    + 活动对象 - `Activation Object`，函数级执行上下文中的 VO（多了 arguments）
    + `__parent__` - 指向父级执行上下文的变量对象（`VO` | `AO`），在 `Global EC` 中为 null

#### ES5
+ 词法环境 - `lexical environment`，当获取变量时使用
+ 变量环境 - `variable environment`，当声明变量时使用
+ this - this 值

#### ES2018
+ 词法环境 - `lexical environment`，当获取变量时或者 this 值时使用
+ 变量环境 - `variable environment`，当声明变量时使用
+ code evaluation state - 用于恢复代码执行位置
+ Function - 执行的任务是函数时使用，表示正在被执行的函数
+ ScriptOrModule - 执行的任务是脚本或者模块时使用，表示正在被执行的代码
+ Realm - 使用的基础库和内置对象实例
+ Generator - 仅生成器上下文有这个属性，表示当前生成器

#### 生命周期
+ **Creation** - `ECS` 入栈一个新 `EC`
    + 创建变量对象 `VO` | `AO`（预编译阶段）
        + 创建 `arguments` 对象
        + [声明提升](#声明提升)
    + 创建作用域链 `[[Scopes]]：Array`，将当前 `VO` 与父级 `[[Scopes]]` 相连，作为当前 `EC` 作用域链
    + 创建this指向
+ **Execution** - 代码执行
    + 遵循 JavaScript **中缀**的语法顺序，详细移步 [js语句级别执行](#语句)
    + 变量 RHS 查找（找到内存中对应的值，用于值操作）规则：
        1. 查找当前 `VO` | `AO`
        2. 找不到则基于当前作用域链依次向上查找
        3. 直到找到顶层 `Global VO` 还未找到，则报错
    + 变量 LHS 查找（查找变量索引，用于赋值）规则：
        1. 查找当前 `VO` | `AO`
        2. 找不到则基于当前作用域链依次向上查找
        3. 直到找到顶层 `Global VO` 还未找到，则在顶层 `Global VO` 创建同名变量，并作为查找结果返回
+ **Finished** - 执行结束，当前 `EC` 出栈
    + 显式的 ReturnStatement 或隐式的 return undefined
    + 卸载当前上下文，可能产生闭包
    + `ECS` 退至上一级 `EC` 继续执行

#### 与 script 标签的关系

+ 每个 script 的顶层代码都位于 Global 层（ECS 栈底）（无论是src引入脚本，还是内部代码）
+ 每个 script 都创建一套独立的完整的 Program 生命周期（创建 ESC -> Global EC 流程），因此不同的 script 报错不会相互影响

### 声明提升

引擎执行代码前会在预编译阶段进行声明提升

+ 函数提升（function）
    + 完全提升，<u>严格模式下只提升至块级作用域（若存在）</u>
    + 若存在同名函数，则优先级为后面覆盖前面
    ``` js
    a();
    function a() {
        console.log('函数a1');
    }
    function a() {
        console.log('函数a2');
    }
    ```
+ 变量提升（var）
    + 部分提升至当前<u>最近的有效的</u>词法作用域，只提升声明部分，不提升赋值部分，初始化值为 `undefined`
    + 若变量名与函数名重复，则以函数为准（因为变量提升之后为 `undefined` ，没有意义，引擎会默认打印有意义的值）
    + 若涉及 ES6 新语法：let、const、class，则报错 `SyntaxError: Identifier has already been defined`

#### 块级作用域

ES6 引入了块级作用域的概念，由一对大括号界定（`{}` 会被引擎优先解析为块级作用域而不是对象）
+ with（严格模式禁止，有变量指向歧义，避免使用，可以用解构代替）
+ try catch
+ for
+ 使用 const / let 声明变量对块级作用域有效

#### 块级作用域内的函数提升
+ 会提升**整体**到「块内」的顶部
+ 同时会提升**变量声明**至「块外」的顶部，类似于 `var` ，此时值为 `undefined`
+ 提升至「块外」的变量，会 <u>**依照词法阶段的顺序在引擎执行到该函数声明时将当前「块内」该变量的值映射（link）至「块外」的变量**</u> 

因此会产生以下行为：
``` js
console.log('1', a, window.a); /*       1 undefined undefined */
a(); // TypeError: a is not a function
{
    console.log('2', a, window.a); /*   2 function a(){} undefined */
    function a(){} // 映射（link）当前该变量的值至块外作用域
}
console.log('3', a, window.a); /*       3 function a(){} function a(){} */
```

#### 块级作用域内存在同名的函数和默认变量
PS : 默认变量 - 在没有声明的情况下直接向变量赋值，类似于 `a = 1;`

关注以下行为：
``` js
console.log('1', a, window.a); /*       1 undefined undefined */
{
    console.log('2', a, window.a); /*   2 function a(){} undefined */
    function a(){} // 映射（link）当前该变量的值至块外作用域
    console.log('3', a, window.a); /*   3 function a(){} function a(){} */
    a = 50; // 此时只单纯的对块内的默认变量赋值，对块外的 window.a 无影响
    console.log('4', a, window.a); /*   4 50 function a(){} */
}
console.log('5', a, window.a); /*       5 function a(){} fuction a(){} */
```
``` js
console.log('1', a, window.a); /*       1 undefined undefined */
{
    console.log('2', a, window.a); /*   2 function a(){} undefined */
    function a(){} // 映射（link）当前该变量的值至块外作用域
    console.log('3', a, window.a); /*   3 function a(){} function a(){} */
    a = 50; // 此时只单纯的对块内的默认变量赋值，对块外的 window.a 无影响
    console.log('4', a, window.a); /*   4 50 function a(){} */
    function a(){} // 增加一个声明，再次映射（link）当前该变量的值至块外作用域
    console.log('5', a, window.a); /*   5 50 50 */
}
console.log('6', a, window.a); /*       6 50 50 */
```

### this

JavaScript 的 `this` 机制为运行时动态绑定

名词：
+ `[[thisMode]]` - 私有属性，表示当前 `thisValue` 的查找规则，有三种取值
    + lexical - 从上下文中找 this（对应箭头函数）
    + global - 当 this 为 undefined 时，取全局对象（对应普通函数调用）
    + strict - 当严格模式时使用，this 严格按照调用时传入的值，可能为 null 或者 undefined（class 被设计成了默认按 strict 模式执行，可通过 call / apply 改写，对应对象方法调用）
+ `[[ThisBindingStatus]]` - 私有属性，表示绑定在当前词法环境记录中的 this 指向

js运行时，引擎会根据 `[[thisMode]]` 来标记新纪录的 `[[ThisBindingStatus]]` 私有属性，引擎执行遇到 this 时，会逐层检查当前词法环境记录中的 `[[ThisBindingStatus]]`，当找到有 this 的环境记录时获取 this 的值

+ Global
    + 脚本 - `window`
    + 模块 - `module.exports`
+ Function / Eval （会创建新的 EC ）
    + 方法调用 - 调用的 `Object`
    + 函数调用 - `window`
        + 严格模式 - `undefined`
    + 箭头函数 - 绑定父级的词法作用域的 this

### 严格模式

+ `'use strict';`
+ 函数层面的严格

## 语句

js 代码执行过程中，**最细颗度**的执行片段

语句分类：
+ **普通语句**
    + 声明类语句
        + var
        + const
        + let
        + 函数声明
        + 类声明
    + 表达式语句
    + 空语句
    + with语句
    + debugger语句
+ **语句块**
    + 大括号括起来的一组语句
+ **控制型语句**
    + if
    + switch
    + for
        + for
        + for-of
        + for-await-of
        + for-in
    + while
        + while
        + do-while
    + continue
    + break
    + return
    + throw
    + try
+ **带标签的语句**
    + 语句前加冒号

### Completion Record 类型

Completion Record 表示 **一个语句执行完之后的结果**，有三个字段
+ `[[type]]` - 表示完成的类型，有 `break` `continue` `return` `throw` 和 `normal` 几种类型
    + `normal` - 引擎遇到会继续执行下一句
+ `[[value]]` - 表示语句的返回值，如果语句没有，则是 empty
+ `[[target]]` - 表示语句的目标，通常是一个 JavaScript 标签

### 普通语句
+ 顺序执行，得到 `[[type]]` 为 `normal` 的 Completion Record
+ Chrome 控制台打印的普通语句执行结果即为 Completion Record 的 `[[value]]`

### 语句块
+ 大括号括起来的一组语句、多条语句
+ 一个语句块每条语句执行的 Completion Record `[[type]]` 都可能对整个语句块产生影响，若一条语句执行的 `[[type]]` 为
    + `normal`，则继续顺序执行
    + 非 `normal` ，则会打断后续语句的执行，该语句执行得到的 Completion Record 即作为整个语句块执行的 Completion Record

### 控制型语句
+ 产生控制代码执行顺序和执行逻辑的效果
+ 又分为两类
    + 对内部造成影响 - `if` 、`switch` 、`while/for` 、`try`
    + 对外部造成影响 - `break` 、`continue` 、`return` 、`throw`
![控制型语句](/blog/img/js-excute/控制型语句.png)

### 带标签的语句
+ 语句前加冒号
+ 大部分时候用于注释
+ 与完成记录类型中的 target 相配合，用于跳出多层循环
