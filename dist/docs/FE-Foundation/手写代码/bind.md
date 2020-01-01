---
title: bind
date: 2019-11-21
tags: 
 - 手写代码
 - js基础
---

#### 基本思路
+ 将原函数通过包装一层绑定函数直接返回，将执行控制权交出
+ 包装函数内通过 `call` / `apply` 实现原函数执行时的上下文切换

#### 注意点
1. 包装的绑定函数也是函数，也是可以 `call` 的（callable），需判断当前上下文是否是函数
2. 判断当绑定函数是通过 `new` 关键字调用的则以 `new` 构造函数的上下文为准
3. 需维护原函数的原型对象

#### Polyfill ES6
``` js
/**
 * self Polyfill ES6
 */
Function.prototype.bind = function(bindCtx, ...bindArgs) {
    // 由于返回的 bound 函数也是函数类型，也是存在 call \ apply 等API的（callable）
    // 这里需要判断当前 this 是否是函数类型
    if (typeof this !== 'function') {
        throw new Error('function bind is not callable');
    }

    // 原函数
    var fToBind = this;
    // 返回的 bound 函数，通过返回原函数的 call，修改上下文
    // 若当前是通过 new 关键字调用的函数，则忽略 bind 传入的上下文，以 new 构造函数的上下文为准
    var fBound = function(...args) {
        return fToBind.call(
            new.target ? this : bindCtx,
            ...bindArgs, ...args
        );
    }

    // 处理返回的函数的原型链，若原函数存在显式原型，则包装原函数原型，否则包装空对象
    fBound.prototype = Object.create(this.prototype || {});

    return fBound;
}

// test
const obj = {
    a: '123'
}
function b() {
    console.log('this.a', this)
}
b.bind(obj)() // this.a 123
b.bind(obj).__proto__ === b.__proto__ // true
```

#### Polyfill ES5
``` js
/**
 * self Polyfill ES5
 */
Function.prototype.bind = function(bindCtx) {
    // 由于返回的 bound 函数也是函数类型，也是存在 call \ apply 等API的（callable）
    // 这里需要判断当前 this 是否是函数类型
    if (typeof this !== 'function') {
        throw new Error('function bind is not callable');
    }

    // 获取传入的预设参数，将类数组对象转换成数组
    var bindArgs = Array.prototype.slice.call(arguments, 1);
    // 原函数
    var fToBind = this;
    // 构造一个空函数，作为维护原型的构造函数
    var protoFn = function() { };
    // 返回的 bound 函数，通过返回原函数的 call，修改上下文
    // 若当前是通过 new 关键字调用的函数，则忽略 bind 传入的上下文，以 new 构造函数作为上下文
    var fBound = function() {
        return fToBind.apply(
            this instanceof fBound ? this : bindCtx,
            bindArgs.concat(Array.prototype.slice.call(arguments))
        );
    }

    // 处理返回的函数的原型链，若原函数存在显式原型，则将空函数的显式原型指向该原型
    fToBind.prototype && (protoFn.prototype = fToBind.prototype);
    // 将空函数实例化后的对象作为返回的 bound 函数的原型
    fBound.prototype = new protoFn();

    return fBound;
}

// test
const obj = {
    a: '123'
}
function b() {
    console.log('this.a', this)
}
b.bind(obj)() // this.a 123
b.bind(obj).__proto__ === b.__proto__ // true
```