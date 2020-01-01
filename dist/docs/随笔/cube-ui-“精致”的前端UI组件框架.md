---
title: cube-ui - “精致”的前端UI组件框架
date: 2019-07-22
tags: 
 - cube-ui
 - UI组件框架
 - 效率
---

华夏前端UI组件移动端框架技术选型，我们团队经讨论之后推荐 `cube-ui` ，理由如下：

## 同类型框架的比较

我们研究了几款现在市场用户占有率比较高的移动端UI框架，各项数据比较如下：

|  | [VUX](https://vux.li/demos/v2/?x-page=v2-doc-home#/) | [Vant](https://youzan.github.io/vant/mobile.html#/zh-CN/) | [cube-ui](https://didi.github.io/cube-ui/example/#/) |
| ------ | ------ | ------ | ------ |
| 介绍 | 基于 `WeUI` 和 `Vue(2.x)` 开发的移动端UI组件库，整体UI样式接近WeUI的设计规范 | 由有赞前端团队开发并维护， `Vue` 官方推荐UI组件框架，规范统一 | 滴滴前端团队内部组件库提炼组件库 |
| 文档 | 文档结构清晰 | 文档清晰齐全，规范统一，实例丰富，场景覆盖广泛 | 场景覆盖广泛，遵循统一的设计交互标准，文档规范统一 |
| 维护 | 作者已停止维护，项目及文档已不在更新 😕 | 由有赞前端团队维护，同时UI设计由专门的设计团队维护，社区活跃 🤓 | 由滴滴前端团队维护，社区活跃 🤓 | 
| 拓展性 | 组件封装程度较高，拓展性欠佳 | 可在现有的组件基础上进行二次封装 | 支持后编译和源码级发布，可高度自定义，拓展性极强 |
| 动画及性能 | 组件动画丰富、流畅，且交互体验接近微信 | 组件内置动画丰富，动画整体风格统一 | 动画精致，风格统一，同时内置的better-scroll模块统一了 `iOS` 和 `Android` 等不同终端平台的基础滚动交互 |
| 自定义主题 | 通过样式覆盖的方式实现主题自定义 | 提供了一套默认主题，同时支持完全替换主题色或者其他样式 | 几乎所有的组件样式主题均可配置，同时发布时不存在样式冗余覆盖的问题 |
| 弹出层类组件层级提升 | 通过其内置的transform自定义组件实现 | 可指定组件挂载的节点实现 | 可通过create-api实现 |
| 后编译 | 不支持 ❌ | 不支持 ❌ | 支持 ✅ |

通过数据的比较可以看出， `VUX` 现已无人维护，暂不考虑， `Vant` 的优点是**整体设计风格和规范**相较其他两个更加**规范和齐全**，而 `cube-ui` 最大的特点就是很适合**二次开发**，搭建适合团队的内部公共组件库。

## cube-ui 的亮点
相较于其他两款UI组件框架，cube-ui有一些特有的亮点：

### style模块及自定义主题


### create-api
cube-ui可以通过 `create-api` 很方便的自定义组件，可以配合现有库的一些功能，快速定制化自定义组件行为，这一点对二次开发十分友好。

### 后编译
后编译是cube-ui特有的一个十分重要的特性，其官方文档解释了这项特性的背景：
> 使用 webpack + babel 开发应用越来越多，而且一般都是通过 NPM 进行包管理的，这样依赖包越来越多，这些依赖包也是使用的 ES2015+ 开发的，所以每个依赖包都需要编译才能发布，这样编译后代码中往往后包含很多编译代码，所以为了消除这部分冗余，推荐大家使用后编译。

相当于是我们在使用UI组件进行开发的时候引入的都是编译好的库文件，虽然可能这些组件库内部实现了一些按需引入的能力，但依旧存在一些冗余，更重要的是**对于二次开发来讲不是特别友好**，我们为了适配自己项目的业务逻辑，可能都需要做一些暴力的工作比如强行覆盖一些样式、包装一些组件内部行为之类的。  
然而如果我们能直接通过引入源码级的组件，甚至是将组件库本身作为基础库，拓展一些额外的行为来适配我们自己的项目，这样对于项目的开发成本、项目发布时候的编译优化、组内UI库的迭代，各方面都是有一定帮助的。**相当于是拿到人家的源代码来编写自己的项目，真正做到源码级发布**。

## 二次开发
这里我通过一个例子模拟一下现有项目集成 `cube-ui` 进行二次开发的流程。  
由于只是为了演示集成过程，我们假设原有项目通过 `vue-cli` 构建，并从这个基础上集成 `cube-ui` 。

### 下载依赖
首先是 `cube-ui` ，我们将其声明在dependencies中：
```shell
npm install cube-ui --save
```

然后我们需要为后编译添加几个插件和申明：

### 引入路径替换
我们需要一个插件
```shell
npm install babel-plugin-transform-modules --save-dev
```
`babel-plugin-transform-modules` 这是个用来解决组件按需引入的问题的插件，举个例子：
我们按需引入组件的时候一般这样去写：
```js
import { Button } from 'cube-ui'
```
这样如果不做任何配置的话根据package.json中定义的main入口："lib/index.js"，引入的就是 `cube-ui` 编译之后的组件了，这并不是我们想要的对吧，所以需要统一做路径替换，修改 `.babelrc` ：
```js
// .babelrc

{
    "plugins": [
        ["transform-modules", {
            "cube-ui": {
                // 注意: 这里的路径需要修改到 src/modules 下
                "transform": "cube-ui/src/modules/${member}",
                "kebabCase": true
            }
        }]
    ]
}
```
这样相当于引入的就是这个路径的文件了：
```js
import Button from 'cube-ui/src/modules/button'
```
这样做还有一个好处就是可以做到**后编译和非后编译自由替换**！

### stylus-loader
`cube-ui` 源码的 css 部分使用了 `stylus` 预处理器
```shell
npm install stylus stylus-loader --save-dev
```

### 添加编译
既然是后编译，我们自然需要将编译流程挂载到自身项目上来，这里需要用到一个插件：`webpack-post-compile-plugin`，就是为了解决后编译问题的
```shell
npm install webpack-post-compile-plugin --save-dev
```

**说说这个流程：**  
首先因为webpack配置中是声明了不编译 `node_modules` 目录下的内容的，但是我们的 `cube-ui` 是存放在 `node_modules` 中的，所以要在webpack配置中显示include我们的 `cube-ui` 模块
```js
// webpack.base.conf.js

// ...
{
    test: /\.js$/,
    loader: 'babel-loader',
    include: [resolve('src'), resolve('node_modules/cube-ui')]
}
// ...
```
但是这样做还存在一个问题，就是如果 `cube-ui` 一旦也后编译依赖其它模块，作为编译的应用方也需要把它们显示地写进 include 里，但这显然是不合理的，因为应用不应该知道 `cube-ui` 依赖的模块，每个模块只应该声明它自身的后编译依赖即可。那么 `webpack-post-compile-plugin` 就是来解决这个问题的，它会读取每个模块 package.json 文件中声明的 `compileDependencies` ，并递归去查找后编译依赖，然后添加到应用 webpack 配置的 include 中，所以在我们应用项目中的 package.json 文件中，我们指定了 `compileDependencies` 为 `[cube-ui]`：
```js
// package.json

// ...
"compileDependencies": ["cube-ui"],
// ...
```
最后我们需要将PostCompilePlugin插件注册到webpack配置中
```js
const PostCompilePlugin = require('webpack-post-compile-plugin')
module.exports = {
    // ...
    plugins: [
        // ...
        new PostCompilePlugin()
    ]
    // ...
}
```

这样我们就完成了原有项目集成 `cube-ui` 的相关配置，下面我们来修改一下 `Button` 组件的源码，看看有什么效果：

### 修改源码

首先我们引入 `Button` 组件：
```js
// HelloWorld.vue

import { Button } from 'cube-ui'

export default {
    //   ...
    components: {
        'cube-button': Button
    },
    // ...
}
```
在模板中使用：
```html
<cube-button icon="cubeic-right">Button With Icon</cube-button>
```

可以看到效果：
![button](/blog/img/cube-ui/button.jpeg)

接下来我们更改 `Button` 组件的源码，再点击的时候弹出 1234：
![alert](/blog/img/cube-ui/alert.jpeg)

现在我们点击按钮，便可以看到弹出：
![view](/blog/img/cube-ui/view.jpeg)

这样我们就从组件内部，做到了源码层面的更改和封装。

## 总结