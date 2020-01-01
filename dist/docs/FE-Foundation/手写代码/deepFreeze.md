---
title: deepFreeze
date: 2019-11-23
tags: 
 - 手写代码
 - js基础
---

#### 基本思路
+ 遍历对象的可枚举属性，判断其是否是对象
    + 非对象（普通类型） ，则设置为不可写、不可配置
    + 对象（引用类型），则递归遍历

``` js
function deepFreeze(obj) {
    Object.keys(obj).forEach(key => {
        obj[key] && typeof obj[key] === 'object' ?
            deepFreeze(obj[key]) :
            Object.defineProperty(obj, key, { writable: false, configurable: false });
    })
}

// test
var obj = {
    a: {
        a: 123
    }
};
deepFreeze(obj);
obj.a.a = 321;
obj.a.a // 123
```