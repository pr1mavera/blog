---
title: call & apply
date: 2019-11-21
tags: 
 - 手写代码
 - js基础
---

#### 基本思路：
+ 利用js函数运行时的动态 this 机制，将原函数作为属性绑定在传入的上下文对象上，执行时上下文即为该对象
+ 执行完成后，将上下文对象上的该函数删除，将执行结果返回

``` js
Function.prototype.call = function(ctx, ...args) {
    // 获取原函数
    let func = this;
    // 若当前未传入上下文对象，默认为 window
    ctx || (ctx = window);
    // 错误处理
    if (typeof this !== 'function') {
        throw new Error('function call is not callable');
    }
    // 绑定在新的上下文上的唯一索引
    let caller = Symbol('caller');
    // 绑定上下文
    ctx[caller] = func;
    // 执行
    // 若为 apply 则将 args 数组直接传入
    // let res = ctx[caller](args);
    let res = ctx[caller](...args);
    // 执行结束将上下文上该函数删除
    delete ctx[caller]
    return res;
}

// test
const obj = {
    a: '123'
}
function b(arg1, arg2) {
    console.log('this.a', this.a, arg1, arg2)
}
b.call(obj, '参数1', '参数2') // this.a 123 '参数1', '参数2'
```