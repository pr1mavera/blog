---
title: map
date: 2019-12-13
tags: 
 - 手写代码
 - js基础
---

#### 基本思路
+ 将数组每一项取出，调用fn，将结果保存至新数组对应下标
+ 注意处理稀松数组的问题

#### Polyfill ES6
``` js
const selfMap = function (fn, ctx) {
    if (Object.prototype.toString.call(this) !== '[object Array]') {
        throw new Error('can only bind map to Array');
    }

    if (Object.prototype.toString.call(fn) !== '[object Function]') {
        throw new Error('mapper must be Function');
    }

    const arr = Array.prototype.slice.call(this);
    const newArr = Array();

    for (let i = 0; i < arr.length; i++) {
        // 解决稀松数组问题，若该下标对应数组中的元素不存在则不处理
        if (!arr.hasOwnProperty(i)) continue;
        // 按照下标，对应将执行 fn 之后的内容绑定在新数组
        newArr[i] = fn.call(ctx || null, arr[i], i, this);
    }
    return newArr;
}

// test
const arr1 = [1, 2, 3];
const arr2 = [1, undefined, 3];
const arr3 = [1, , 3];

const res = [
    arr1,
    arr2,
    arr3
].map(arr => `arr: ${JSON.stringify(arr)}, newArr: ${JSON.stringify(selfMap.call(arr, x => x * 2))}`);

console.log(res)
```