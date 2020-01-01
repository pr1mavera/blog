---
title: curry
date: 2019-11-22
tags: 
 - 手写代码
 - js基础
 - 函数式编程
---

柯里化是通过偏函数思想去实现的：
```js
const curry = (fn, arity = fn.length) => {
	// 1. 构造一个这样的函数：
	//    即：接收前一部分参数，返回一个 接收后一部分参数 的函数，返回的那个函数需在内部判断是否执行原函数
	const nextCurried = (...prevArgs) =>
							(...nextArgs) => {
								const args = [ ...prevArgs, ...nextArgs ];

								return args.length >= arity
										? fn(...args)
										: nextCurried(...args)
							};

	// 2. 将构造的这个函数执行并返回，初始入参为空
	return nextCurried();
};

// test
function add(a, b, c) {
	return a + b + c;
}
const _add = curry(add);

_add(1)(2)(3); // 6
_add(1, 2)(3); // 6
_add(1)(2, 3); // 6
_add(1, 2, 3); // 6
```
这个柯里化可以选择提供被柯里化函数的**参数个数**(默认为形参个数 `fn.length` )，即如果传入的参数达到这个个数，被柯里化的函数便会执行