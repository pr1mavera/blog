---
title: nextTick
date: 2019-12-14
tags: 
 - 手写代码
 - js基础
---

#### nextTick 设计思路
+ Vue 中 `nextTick` 接口向开发者提供了这样一个钩子：让开发者在一次宏任务循环中第一时间获取到更新后的dom
+ 抽象顺序
    + 同步脚本中修改 Vue 环境中绑定的 data，触发 watcher 中所有 dep 绑定的指令节点更新dom
    + 执行开发者在同步任务中使用 `nextTick` 注册的回调（回调中可以拿到更新后的dom）
    + 微任务执行完毕，浏览器主线程交给渲染线程渲染dom，结束后进行下一次宏任务

#### 基本思路
+ 因此 Vue 实现 `nextTick` 的方式就是构造一个回调注册机制，让回调在更新完dom之后执行
+ 由于浏览器宿主环境的不同， `nextTick` 提供降级处理方案
    + Promise
    + MutationObserver（实现于v2.5版本之前，由于兼容性问题，v2.5版本之后改用 MessageChannel）
    + setTimeout

#### nextTick 源码（v2.5之前）
``` js
export const nextTick = (function () {
    const callbacks = []
    let pending = false
    let timerFunc

    function nextTickHandler() {
        pending = false
        const copies = callbacks.slice(0)
        callbacks.length = 0
        for (let i = 0; i < copies.length; i++) {
            copies[i]()
        }
    }

    // the nextTick behavior leverages the microtask queue, which can be accessed
    // via either native Promise.then or MutationObserver.
    // MutationObserver has wider support, however it is seriously bugged in
    // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
    // completely stops working after triggering a few times... so, if native
    // Promise is available, we will use it:
    /* istanbul ignore if */
    if (typeof Promise !== 'undefined' && isNative(Promise)) {
        var p = Promise.resolve()
        var logError = err => { console.error(err) }
        timerFunc = () => {
            p.then(nextTickHandler).catch(logError)
            // in problematic UIWebViews, Promise.then doesn't completely break, but
            // it can get stuck in a weird state where callbacks are pushed into the
            // microtask queue but the queue isn't being flushed, until the browser
            // needs to do some other work, e.g. handle a timer. Therefore we can
            // "force" the microtask queue to be flushed by adding an empty timer.
            if (isIOS) setTimeout(noop)
        }
    } else if (typeof MutationObserver !== 'undefined' && (
        isNative(MutationObserver) ||
        // PhantomJS and iOS 7.x
        MutationObserver.toString() === '[object MutationObserverConstructor]'
    )) {
        // use MutationObserver where native Promise is not available,
        // e.g. PhantomJS IE11, iOS7, Android 4.4
        var counter = 1
        var observer = new MutationObserver(nextTickHandler)
        var textNode = document.createTextNode(String(counter))
        observer.observe(textNode, {
            characterData: true
        })
        timerFunc = () => {
            counter = (counter + 1) % 2
            textNode.data = String(counter)
        }
    } else {
        // fallback to setTimeout
        /* istanbul ignore next */
        timerFunc = () => {
            setTimeout(nextTickHandler, 0)
        }
    }

    return function queueNextTick(cb?: Function, ctx?: Object) {
        let _resolve
        callbacks.push(() => {
            if (cb) cb.call(ctx)
            if (_resolve) _resolve(ctx)
        })
        if (!pending) {
            pending = true
            timerFunc()
        }
        if (!cb && typeof Promise !== 'undefined') {
            return new Promise(resolve => {
                _resolve = resolve
            })
        }
    }
})()
```