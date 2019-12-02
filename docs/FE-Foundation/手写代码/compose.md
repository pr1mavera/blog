---
title: compose
date: 2019-11-22
tags: 
 - 手写代码
 - js基础
 - 函数式编程
---

``` js
/**
 * 潜在面试题：
 * 实现一个 compose ，并利用 compose 实现一个工具函数：传入数组，使数组每一项自增1再求和
 * 输入：[ 1, 2, 3, 4 ]，输出：14
 */

const arr = [ 1, 2, 3, 4 ];
const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));

const addOne = x => x + 1;
const sum = (x, y) => x + y;
const map = mapper => arr => arr.map(mapper);
const reduce = (reducer, inital) => arr => arr.reduce(reducer, inital);

// 数组每项自加1后求和
const increaseAndSum = compose(reduce(sum, 0), map(addOne));

increaseAndSum(arr); // 14
```