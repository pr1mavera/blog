---
title: babal基础
date: 2019-8-13
---

#### 使用场景
将js中 es2015 / 2016 / 2017 / ... 新语法转（只转换新语法，并不转换新API，如 Iterator、Generator 等）换成更早期的语法如 es5

#### 使用方式
1. 单体文件
2. 命令行（CLI） - package.json 中配置 `scripts`
3. 构建工具的插件（webpack 的 babel-loader）

## 基本结构

+ 插件（plugins）
    + 「语法插件」 - 在 **解析** 阶段使得 babel 能够解析更多的语法
    + 「转译插件」 - 在 **转换** 阶段将源码转换并输出
    + 同一类插件一般存在「语法插件」和「转译插件」，一般来说「转译插件」可以代替「语法插件」
+ 预设（preset）
    + 对于环境的配置集合
    + env - 通过配置得知目标环境的特点，再只做必要的转换
        + 默认配置项为 latest ，即 es2015 + es2016 + es2017
        + `targets.node: 'current'` - 支持最新node稳定版本
        + `modules: amd | umd | systemjs | commonjs | false` - 以特定的模块化格式来输出代码
    + stage-x - 包含的都是当年最新规范的草案
        + Stage 0 - 稻草人: 只是一个想法，经过 TC39 成员提出即可。
        + Stage 1 - 提案: 初步尝试。
        + Stage 2 - 初稿: 完成初步规范。
        + Stage 3 - 候选: 完成规范和浏览器初步实现。
        + Stage 4 - 完成: 将被添加到下一年度发布。
    + es201x, latest - 已经纳入到标准规范的语法
``` json
{
    "presets": [
        // 不带配置项，直接列出名字
        "env",
        // 带了配置项，以数组方式传入
        [
            // 第一项列出名字
            "someConfig",
            // 第二项列出相关参数的对象
            {
                "someOption": "value"
            }
        ]
    ],
    "plugins": [
        // ...
    ]
}
```

## 基本行为

+ 运行阶段 - 解析，转换，生成
+ 运行方式
    + 先 plugins，后 preset
    + plugins 顺序执行
    + preset 逆序执行

## 配套工具

上述 babel 核心不会变，配套工具只是从不同的入口环境进入 babel 的整套流程，或者作为一些插件在 babel 的生命周期中发挥作用

### babel-loader
webpack 中的 babel 加载方案，用于在 webpack 中集成 babel

### babel-cli
使得可以在命令行中使用 babel ，主要用于小项目不含独立的构建工具时使用

### babel-node
**babel-cli** 的一部分，在 node 环境中使用后，可以直接运行 es2015 的代码，不用再进行转码了

#### 存在两部分
+ **babel-register** - 重写 `require` 命令，在加载 `.js`、`.jsx`、`.es` 和 `.es6` 文件时先用 babel 进行实时转码，只适用于开发阶段
+ **babel-polyfill** - 用于转换新API，如 `Iterator`、`Generator`、`Set`、`Maps`、`Proxy`、`Reflect`、`Symbol`、`Promise`

### babel-polyfill
集成了 **core-js**、**regenerator**
+ **core-js** - 将 **babel-polyfill** 上所有polyfill方法分割模块，提供出按需的引入方式
+ **regenerator** - 

#### **babel-polyfill** 存在两个缺点
1. 导致打出来的包非常大，因为 **babel-polyfill** 是一个整体，会将所有方法均放在原型链上（可改用 **core-js** 上某些库按需引入解决）
2. 会污染全局变量，给很多类的原型链上都作了修改（实际生产上采用 **babel-plugin-transform-runtime** 解决）

### babel-runtime 与 babel-plugin-transform-runtime
二者一般绑定使用
+ **babel-plugin-transform-runtime** - 用于将 babel 在作用域生成的额外方法，改为引用方式加载进来，<u>从 **babel-runtime** 引入</u>
    + 解决的问题：babel 直接将转换的代码添加至当前作用域，并且在每处需要转换的地方都这样添加，必定会导致代码重复，使用 **babel-plugin-transform-runtime** 则改为引用方式加载
    ``` js
    // 不使用 babel-plugin-transform-runtime
    // babel 添加一个方法，把 async 转化为 generator
    function _asyncToGenerator(fn) { return function () {....}} // 很长很长一段

    // 使用 babel-plugin-transform-runtime
    // 从直接定义改为引用，这样就不会重复定义了。
    var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');
    var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

    // 具体使用处
    var _ref = _asyncToGenerator(function* (arg1, arg2) {
    yield (0, something)(arg1, arg2);
    });
    ```
+ **babel-runtime** - polyfill转换API集合，包含三部分
    + **core-js** - 内置类（Promise, Symbols等等）和静态方法（Array.from 等）大多数转换都从此处自动引入
    + **regenerator** - **core-js** 的拾遗补漏，主要是 `generator/yield` 和 `async/await` 两组的支持
    + **helpers** - 额外集合[babel-helpers](https://link.zhihu.com/?target=https%3A//github.com/babel/babel/blob/6.x/packages/babel-helpers/src/helpers.js)，如 `asyncToGenerator`、`jsx`、`classCallCheck` 等等，也可以使用单独抽出来的一个包 **babel-plugin-external-helpers**（在 babel7 中删除）