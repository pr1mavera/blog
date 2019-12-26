---
title: 对于MV*的理解
date: 2019-07-29
tags: 
 - 开发模式
---

刚刚看了篇对于MV*模式进行分析的博文：[浅析前端开发中的 MVC/MVP/MVVM 模式](https://juejin.im/post/593021272f301e0058273468#heading-10 'https://juejin.im/post/593021272f301e0058273468#heading-10')，通过实际场景分别阐述MVC、MVP以及MVVM设计模式的优劣，浅显易懂。这里记录一下这几大开发模式之间产生的缘由。理解不深，请多指教。

<!-- more -->

## MVC中存在的问题
MVC通常是以controller那一层作为程序的入口，model和view都是通过controller的初始化注册进来的，导致所有的业务逻辑都需要流经这个controller，A业务线和B业务线不能分离解耦。并且MVC中的数据更新通知是由model层直接通知view的(通过将view作为观察者绑定在model层上)。

## MVP解决了MVC的这个问题
MVP中以view那一层作为程序的入口，将presenter在初始化的时候注册进来，并且一个view可以注册多个presenter，分别处理不同的业务线。

## MVP中存在的问题
由于presenter集合了数据处理和通知更新视图的所有逻辑，所有的model层的更新都需要presenter手动同步到view层，导致代码过重，维护起来相对困难。

## MVVM解决了MVP的这个问题
MVVM把View和Model的同步逻辑自动化了，利用MVVM框架提供的数据绑定的能力，只需定义好view那一部分应该显示model层的哪一块就行了。

## 再说说MVVM
model现在以及不关心逻辑了(业务对于数据的操作)，只需定义数据结构。view那一层在这里就跟MVC和MVP的相差比较多了，它不仅仅负责页面渲染，同时需要声明式的绑定要渲染的数据，并且model的更新同步到视图(通过数据绑定)。viewModel这一层与MVP中的presenter基本一致，只不过少了手动更新数据的那一步操作。