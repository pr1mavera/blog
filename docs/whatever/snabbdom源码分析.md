---
title: snabbdom 源码分析
date: 2019-11-29
tags: 
 - 源码
---

## DOM-diff 意义

DOM-diff 算法描述：diff 两颗 Virtual DOM 树，并执行最小更新！！！

为了真正弄明白这个现代前端框架最为核心的算法，我们首先要理解 DOM-diff 在前端存在的意义

### 浏览器环境中的操作成本

先分析一下传统方式 `使用纯dom操作的方式` 与 `使用 Virtual DOM + DOM-diff` 两种渲染方式真正消耗资源的地方：
+ `使用纯dom操作的方式` - 单纯的dom操作，如果节点产生变化即替换 innerHTML，这种方式在**一整段文档片段全部改变的时候**似乎是合理的，然而如果**文档片段中只有一小个标签发生了改变**，替换整个文档片段就造成了巨大的浪费，因此花费的时间是依赖的是文档大小 - <u>即不管数据变化的多少，文档片段结构越多花费的时间越多</u>
+ `使用 Virtual DOM + DOM-diff` - 这种方式的时间开销发生在「js逻辑层面的计算」和「操作需要更新的DOM」，然而js逻辑层面的计算相较于DOM操作来说快太多了，快到可以忽略不计，但此处花费的时间的依赖是需要变化的部分 - <u>即即使文档片段结构很复杂，花费的时间也只与修改变化的部分相关，将重回重排的时间压缩到一个可以接受的范围</u>

真实的前端场景中，视图变化多发生在兄弟节点之间，那么 `使用 Virtual DOM + DOM-diff` 的渲染方式则更加合理，更加高效

### 计算层面时间复杂度上的意义

针对刚刚提到的「js逻辑层面的计算」，在时间复杂度方面也存在可以压缩的地方！！

DOM-diff 来自于算法中一个典型的问题：[最小编辑距离的问题](https://leetcode.com/problems/edit-distance/)（相关算法比如 Git提交之前会进行一次对象的diff操作）  
最小编辑距离算法的时间复杂度为 `O(n^2m(1+logmn))` ，假设 `m` 与 `n` 同阶，则复杂度为 `O(n^3)`
同理对于树结构，我们可以定义三种操作方式：
1. 删除 - 删除一个节点，将它的 children 交给它的父节点
2. 插入 - 在 children 中，插入一个节点
3. 修改 - 修改节点的值  
具象这三种操作后，我们便可以将一棵树转化为另外一棵树，而修改最少的方式便可以作为这一类问题的解，可以感性的理解：若前后两个树的每个节点两两比较，这就需要 `O(n^2)` ，而比较完成找到差异之后还需要计算最小转换方式，最终平均复杂度为 `O(n^3)`

但是 `O(n^3)` 真的值得嘛？

**<u>若前后两个节点的类型不相同，那么大多数情况下这两个元素的内容基本也不会复用，因此在处理浏览器dom节点这个场景下，直接删除再添加新的节点往往比较符合真实需求</u>**  
因此 React、Vue 都假设：（React、Vue 的 DOM-diff 算法都是基于 snabbdom 改造而来的）
+ 检测 VNode 的变化只发生在同一层（实际上变化发生在不同层级的情况非常少）
+ 检测 VNode 的变化依赖于用户指定的key（若同样的元素指定了不同的key或者不同元素指定同样的key，则通过提示开发者去解决）

因此下面这个问题，在 React 中的解决过程就变成了：（与 snabbdom 的diff策略有所区别）
``` code
        Prev                  Last

          A                     A  
         / \                   / \
        /   \                 /   \
       B     D     ====>     D     B
      /                             \
     C                               C
```
`Prev A -> Last A` ---> `相同，下一个`
`Prev B -> Last D` ---> `不同，替换`
`Prev D -> Last B` ---> `不同，替换`
`Prev C -> Last _` ---> `更新后该节点不存在，删除该位置的节点`
`Prev _ -> Last C` ---> `更新前该节点缺少，添加节点到该位置`

每个新旧节点遍历一次，标准的 `O(n)` ，相较于 `O(n^3)` 大幅度的减少了时间复杂度

接下来详细分析一下 snabbdom 的实现细节，这里采用开源社区一个 es6 的简版进行分析，GitHub：[snabbdom的ES6版本](https://github.com/creeperyang/blog/tree/master/codes/snabbdom/)，核心功能实现与官方 TS 版本一毛一样

## 目录结构

```bash
src
├── domApi.js    # dom api，主要是各种 DOM 操作的包装，快速浏览即可
├── export.js    # export，决定暴露什么接口给调用者，可忽略
├── h.js         # `h()`帮助函数，很简单
├── index.js     # 核心代码，Virtual DOM 的 diff 实现，从 Virtual DOM 构建 DOM 等等
├── modules      # 各个模块，主要负责属性处理
│   ├── class.js
│   ├── props.js
│   └── style.js
├── utils.js     # util 函数
└── vnode.js     # vnode 定义和一些相关函数
```

## 基本使用

snabbdom 向外暴露的两个API：
+ `h` 提供参数，生成vnode
+ `patch` 比较新旧vnode，递归比较各级节点（diff），并将更新映射到真实dom

``` html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>snabbdom-demo</title>
        <script src="snabbdom.js" charset="utf-8"></script>
    </head>
    <body>
        <div id="container"></div>
    </body>
</html>
```

``` js
import { h, patch } from 'snabbdom'

// 最初始的 dom 容器
const container = document.getElementById('container')
// 替换的容器
function createVNodeframe(list) {
    return h(
        'div',
        {
            id: 'container'
        },
        [
            h(
                'ul',
                {
                    id: 'footer',
                    className: 'hello hi',
                    style: {
                        color: '#666'
                    }
                },
                list
            )
        ]
    )
}
// 动态生成列表
function getList(count) {
    return Array.apply(null, { length: count })
            .map((v, i) => i + 1)
            .map(n => h(
                'li',
                {
                    className: 'item',
                    key: n
                },
                `number is ${n}`
            ))
}

// 生成vnode1
const vnode1 = createVNodeframe(getList(3))
// 生成vnode2
const vnode2 = createVNodeframe(getList(10))

patch(container, vnode1)
setTimeout(() => {
    patch(vnode1, vnode2) // 2秒之后列表从 3 个变成 10 个
}, 2000)
```

<!-- 此处可以比较明显的体会到，通过替换 vnode 映射成真实 dom ，从而改变视图， -->

## VNode 数据结构

``` ts
VNode: {
    __type: symbol | undefined /*                   全局统一的 Symbol 常量，标识该节点为vnode节点 */
    type: string | undefined /*                     节点类型，如 'div' */
    key: string | undefined /*                      key，用于 diff 的时候比较是否是同一个vnode节点 */
    data: VNodeData | undefined /*                  data，包括节点上属性，绑定的事件等等 */
    children: Array<VNode | string> | undefined /*  子节点的 vnode */
    text: string | undefined /*                     文本 */
    elm: Node | undefined /*                        对应的真实 dom */
}
```

注意：此处的 children 与 text 互斥，即要么是文本节点，要么是非文本节点。原因是 snabbdom 为了方便处理，text 节点和其它类型的节点处理起来差异很大

## `h` | 渲染

`h` 接口用于生成 VNode，实现在 `src/h.js` 中

``` js
function h(type, config, ...children) {

    // 获取 key，填充 props 对象，此处省略

    // 生成vnode
    return vnode(
        type,
        key,
        props,
        flattenArray(children).map(c => {
            return isPrimitive(c) /* 子节点为数字或者字符串，则映射成文本节点 */
                ? vnode(undefined, undefined, undefined, undefined, c)
                : c
        })
    )
}
```

注意
1. 子节点若为数字或者字符串，则映射成文本节点
2. 此处省略了绑定 props 的过程，实际就是处理传入的 config 对象，将其 config 实例对象上的属性挂载到 props 上，再传入生成 vnode

## `patch` | 更新

`patch` 接口主要用于完成2件事情
1. 将 VNode 映射成 dom
2. 节点有更新时，触发 DOM-diff

patch 的实现在 `src/index.js` 中，通过传入 modules 到 init 入口，生成 patch

注：init 入口有两个参数， `modules` 和 `domApi`
+ `modules` 的作用是为处理节点上的 data 而做的模块化方案，比如节点中存在需要监控 class ，在 dom-diff 的过程中校验变化，那么就需要传入 class 模块
+ `domApi` 的作用是传入一份操作宿主环境元素的 api，用于为 `生成真实dom` 和 `dom-diff 比较完成后的更新` 提供宿主环境的支持（默认是浏览器环境），同理，可以让用户自定义平台相关的 api，增加该工具库本身的拓展性

``` js
export default function init(modules = [], domApi) {

    // 从 modules 初始化 hooks ，并挂载到 cbs 生命周期钩子集合上

    // 为实际 dom 创建 vnode
    function emptyNodeAt(elm) {...}

    // 创建 remove 回调函数
    function createRmCb(childElm, listeners) {...}

    // 为 vnode（tree） 实际创建 dom（未插入文档）
    function createElm(vnode, insertedVnodeQueue) {...}

    // 对 vnode 及其 children 递归执行 destroy hook
    function invokeDestroyHook(vnode) {...}

    // 从 parent dom 删除 vnode 数组对应的 dom
    function removeVnodes(parentElm, vnodes, startIdx, endIdx) {...}

    // 添加 vnode 数组对应的 dom 到 parent dom
    function addVnodes(parentElm, before, vnodes, startIdx, endIdx, insertedVnodeQueue) {...}

    // 比较新旧 children 并更新
    function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue) {...}

    // patch oldVnode 和 vnode （它们是相同的 vnode）
    // 1. 更新本身对应 dom 的 textContent/children/其它属性；
    // 2. 根据 children 的变化去决定是否递归 patch children 里的每个 vnode。
    function patchVnode(oldVnode, vnode, insertedVnodeQueue) {...}

    return function patch(oldVnode, vnode) {...}
}
```

### patch

看看 patch 做了啥

``` js
return function patch(oldVnode, vnode) {
    let elm, parent
    const insertedVnodeQueue = []
    let i
    // 调用 pre hook
    for (i = 0; i < cbs.pre.length; ++i) cbs.pre[i]()

    // 如果 oldVnode 不是 vnode（即是 dom），创建 vnode
    if (!isVnode(oldVnode)) {
        oldVnode = emptyNodeAt(oldVnode)
    }

    // 如果 oldVnode 和 vnode 是相同的 vnode，执行 patch
    if (isSameVnode(oldVnode, vnode)) {
        patchVnode(oldVnode, vnode, insertedVnodeQueue)
    }
    // 否则，直接把 oldVnode 替换为 vnode
    else {
        elm = oldVnode.elm
        parent = api.parentNode(elm)

        // createElm 接口直接处理 vnode.elm ，但此时 vnode.elm 并没有插入到真实文档片段中
        createElm(vnode, insertedVnodeQueue)

        // 如果原 vnode 有 parent，那么插入新 vnode 对应的 dom，删除原 dom
        if (parent !== null) {
            api.insertBefore(parent, vnode.elm, api.nextSibling(elm))
            removeVnodes(parent, [oldVnode], 0, 0)
        }
    }

    // 调用 insert hook。
    for (i = 0; i < insertedVnodeQueue.length; ++i) {
        // 为什么不用判断 insert 是否存在？
        // 因为填充 insertedVnodeQueue 时已判断
        insertedVnodeQueue[i].data.hook.insert(insertedVnodeQueue[i])
    }
    // 调用 post hook
    for (i = 0; i < cbs.post.length; ++i) cbs.post[i]()
    return vnode
}
```

可以看到 patch 中主要就做了三件事情
1. 分辨当前传入的 oldVnode 是否是 VNode ，若不是则当前为初始化，否则为更新
2. 判断传入的俩节点是否是同一个节点（key 相同且 type 相同），相同则进入 patchVnode 流程，不同则舍弃该节点及其子节点（react中似乎处理方式不同），执行 createElm 在新的 VNode 上重新生成dom节点 `vnode.elm` ，绑定在之前的父节点上
3. 在对应的 patch 生命周期中触发钩子

因此我们可以大致梳理一下 snabbdom 的工作流程：
+ 初始化：
    1. 首先根据结构化配置数据通过 `h` 生成 VNode
    2. 将 VNode 挂载到对应的父节点
+ 更新
    3. 由于某些原因修改了结构化数据，触发生成了一份新的 VNode
    4. 比较 oldVnode 与 newVnode 两个节点树，对于变化的部分映射到真实dom上

接下来我们分别来看几个问题：
1. 如何将「VNode」映射成「真实dom」？
2. 对于同一个节点如何比较新旧两个节点树的变化（patchVnode）？
3. 刚刚提到一个「生命周期钩子」的概念，在 snabbdom 中是如何挂载并正确执行的？

### VNode 映射成 dom

在 `createElm` 这个函数中会将 VNode 映射成 dom （未挂载）

``` js
// 为 vnode（tree） 实际创建 dom（未插入文档）
function createElm(vnode, insertedVnodeQueue) {
    // 节点属性
    let data = vnode.data
    let i
    if (data) {
        // 调用 init hook
        if (data.hook && (i = data.hook.init)) {
            i(vnode)
            // data 可能在 init hook 中被改变，重新获取。
            data = vnode.data
        }
    } else {
        data = {}
    }

    // 节点子节点
    let children = vnode.children
    // 节点类型
    let type = vnode.type

    // 处理 type 为注释的节点
    if (type === 'comment') {
        if (vnode.text == null) {
            vnode.text = ''
        }
        vnode.elm = api.createComment(vnode.text)
    }
    // 处理其它 type 的节点
    else if (type) {
        const elm = vnode.elm = data.ns
            ? api.createElementNS(data.ns, type)
            : api.createElement(type)

        // 调用 create hook
        for (let i = 0; i < cbs.create.length; ++i) cbs.create[i](emptyNode, vnode)

        // 分别处理 children 和 text
        // 这里隐含一个逻辑：vnode 的 children 和 text 不会／应该同时存在。
        if (isArray(children) /* 此时 vnode.text 应该为 undefined */ ) {
            // 递归 children，保证 vnode tree 中每个 vnode 都有自己对应的 dom；
            // 即构建 vnode tree 对应的 dom tree
            children.forEach(ch => {
                ch && api.appendChild(elm, createElm(ch, insertedVnodeQueue))
            })
        }
        else if (isPrimitive(vnode.text)) {
            api.appendChild(elm, api.createTextNode(vnode.text))
        }
        // 调用 create hook
        // 为 insert hook 填充 insertedVnodeQueue
        i = vnode.data.hook
        if (i) {
            i.create && i.create(emptyNode, vnode)
            i.insert && insertedVnodeQueue.push(vnode)
        }
    }
    // 处理文本节点
    else {
        vnode.elm = api.createTextNode(vnode.text)
    }

    // 最终返回根节点上挂载的真实dom
    return vnode.elm
}
```

大致思路就是<u>**将 VNode 传入，根据 type 生成对应的真实dom节点，根据 data 挂载节点属性，同时递归子节点数组生成dom**</u>  
另外此处需要处理 VNode 生命周期钩子，触发 init、create 钩子，记录节点插入的 insert 钩子

### patchVnode

终于到了 DOM-diff 算法最核心的部分，这也是前端中发生最频繁的场景，即「对于同一个节点比较新旧两个节点树的变化」

首先新旧两个节点树的子节点可能存在以下情况
1. 新旧节点同时存在子节点
2. 旧的VNode不存在子节点，新的VNode存在
3. 新的VNode不存在子节点，旧的VNode存在
4. 新的VNode不存在文本，旧的存在
5. 新的VNode的子节点只存在文本，且与旧的VNode的不同

因此 patchVnode 就是针对这些情况做后续dom更新策略的分流操作：

``` js
function patchVnode(oldVnode, vnode, insertedVnodeQueue) {
    // 因为 vnode 和 oldVnode 是相同的 vnode，可以复用 oldVnode.elm
    const elm = vnode.elm = oldVnode.elm
    let oldCh = oldVnode.children
    let ch = vnode.children

    // 如果 oldVnode 和 vnode 是同一个，说明无需更新，直接返回。
    if (oldVnode === vnode) return

    // 如果 vnode.text 是 undefined
    if (vnode.text === undefined) {
        // 1. 新旧节点同时存在子节点，比较 old children 和 new children，并更新
        if (oldCh && ch) {
            // ...
        }
        // 2. 旧的VNode不存在子节点，新的VNode存在，添加新 children
        else if (ch) {
            // ...
        }
        // 3. 新的VNode不存在子节点，旧的VNode存在，删除 children。
        else if (oldCh) {
            // ...
        }
        // 4. 新的VNode不存在文本，旧的存在，删除。
        else if (oldVnode.text) {
            // ...
        }
    }
    // 5. 新的VNode的子节点只存在文本，且与旧的VNode的不同，则更新文本
    else if (oldVnode.text !== vnode.text) {
        // ...
    }
}
```

后面四种情况都只需要单纯的删除、添加或替换子节点内容，第一种情况的操作最为复杂，同时也是 DOM-diff 的核心所在，需要根据开发者传入的关键字 `key` 校验新旧子节点列表中是否存在可以重复利用的元素节点，对dom执行最小的更新

该逻辑在 `updateChildren` 函数中
``` js
function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue) {
    let oldStartIdx = 0, newStartIdx = 0
    let oldEndIdx = oldCh.length - 1
    let oldStartVnode = oldCh[0]
    let oldEndVnode = oldCh[oldEndIdx]
    let newEndIdx = newCh.length - 1
    let newStartVnode = newCh[0]
    let newEndVnode = newCh[newEndIdx]
    let oldKeyToIdx
    let idxInOld
    let elmToMove
    let before

    // 遍历 oldCh 和 newCh 来比较和更新
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        // 1⃣️ 首先检查 4 种情况，保证 oldStart/oldEnd/newStart/newEnd
        // 这 4 个 vnode 非空，左侧的 vnode 为空就右移下标，右侧的 vnode 为空就左移 下标。
        if (oldStartVnode == null) {
            oldStartVnode = oldCh[++oldStartIdx]
        } else if (oldEndVnode == null) {
            oldEndVnode = oldCh[--oldEndIdx]
        } else if (newStartVnode == null) {
            newStartVnode = newCh[++newStartIdx]
        } else if (newEndVnode == null) {
            newEndVnode = newCh[--newEndIdx]
        }
        /**
         * 2⃣️ 然后 oldStartVnode/oldEndVnode/newStartVnode/newEndVnode 两两比较，
         * 对有相同 vnode 的 4 种情况执行对应的 patch 逻辑。
         * - 如果同 start 或同 end 的两个 vnode 是相同的（情况 1 和 2），
         *   说明不用移动实际 dom，直接更新 dom 属性／children 即可；
         * - 如果 start 和 end 两个 vnode 相同（情况 3 和 4），
         *   那说明发生了 vnode 的移动，同理我们也要移动 dom。
         */
        // 1. 如果 oldStartVnode 和 newStartVnode 相同（key相同），执行 patch
        else if (isSameVnode(oldStartVnode, newStartVnode)) {
            // 不需要移动 dom
            patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue)
            oldStartVnode = oldCh[++oldStartIdx]
            newStartVnode = newCh[++newStartIdx]
        }
        // 2. 如果 oldEndVnode 和 newEndVnode 相同，执行 patch
        else if (isSameVnode(oldEndVnode, newEndVnode)) {
            // 不需要移动 dom
            patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue)
            oldEndVnode = oldCh[--oldEndIdx]
            newEndVnode = newCh[--newEndIdx]
        }
        // 3. 如果 oldStartVnode 和 newEndVnode 相同，执行 patch
        else if (isSameVnode(oldStartVnode, newEndVnode)) {
            patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue)
            // 把获得更新后的 (oldStartVnode/newEndVnode) 的 dom 右移，移动到
            // oldEndVnode 对应的 dom 的右边。为什么这么右移？
            // （1）oldStartVnode 和 newEndVnode 相同，显然是 vnode 右移了。
            // （2）若 while 循环刚开始，那移到 oldEndVnode.elm 右边就是最右边，是合理的；
            // （3）若循环不是刚开始，因为比较过程是两头向中间，那么两头的 dom 的位置已经是
            //     合理的了，移动到 oldEndVnode.elm 右边是正确的位置；
            // （4）记住，oldVnode 和 vnode 是相同的才 patch，且 oldVnode 自己对应的 dom
            //     总是已经存在的，vnode 的 dom 是不存在的，直接复用 oldVnode 对应的 dom。
            api.insertBefore(parentElm, oldStartVnode.elm, api.nextSibling(oldEndVnode.elm))
            oldStartVnode = oldCh[++oldStartIdx]
            newEndVnode = newCh[--newEndIdx]
        }
        // 4. 如果 oldEndVnode 和 newStartVnode 相同，执行 patch
        else if (isSameVnode(oldEndVnode, newStartVnode)) {
            patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue)
            // 这里是左移更新后的 dom，原因参考上面的右移。
            api.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm)
            oldEndVnode = oldCh[--oldEndIdx]
            newStartVnode = newCh[++newStartIdx]
        }

        // 3⃣️ 最后一种情况：4 个 vnode 都不相同，那么我们就要
        // 1. 从 oldCh 数组建立 key --> index 的 map。
        // 2. 只处理 newStartVnode （简化逻辑，有循环我们最终还是会处理到所有 vnode），
        //    以它的 key 从上面的 map 里拿到 index；
        // 3. 如果 index 存在，那么说明有对应的 old vnode，patch 就好了；
        // 4. 如果 index 不存在，那么说明 newStartVnode 是全新的 vnode，直接
        //    创建对应的 dom 并插入。
        else {
            // 如果 oldKeyToIdx 不存在，创建 old children 中 vnode 的 key 到 index 的
            // 映射，方便我们之后通过 key 去拿下标。
            if (oldKeyToIdx === undefined) {
                oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)
            }
            // 尝试通过 newStartVnode 的 key 去拿下标
            idxInOld = oldKeyToIdx[newStartVnode.key]
            // 下标不存在，说明 newStartVnode 是全新的 vnode。
            if (idxInOld == null) {
                // 那么为 newStartVnode 创建 dom 并插入到 oldStartVnode.elm 的前面。
                api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm)
                newStartVnode = newCh[++newStartIdx]
            }
            // 下标存在，说明 old children 中有相同 key 的 vnode，
            else {
                elmToMove = oldCh[idxInOld]
                // 如果 type 不同，没办法，只能创建新 dom；
                if (elmToMove.type !== newStartVnode.type) {
                    api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm)
                }
                // type 相同（且key相同），那么说明是相同的 vnode，执行 patch。
                else {
                    patchVnode(elmToMove, newStartVnode, insertedVnodeQueue)
                    oldCh[idxInOld] = undefined
                    api.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm)
                }
                newStartVnode = newCh[++newStartIdx]
            }
        }
    }

    // 上面的循环结束后（循环条件有两个），处理可能的未处理到的 vnode。
    // 如果是 new vnodes 里有未处理的（oldStartIdx > oldEndIdx
    // 说明 old vnodes 先处理完毕）
    if (oldStartIdx > oldEndIdx) {
        before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm
        addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue)
    }
    // 相反，如果 old vnodes 有未处理的，删除 （为处理 vnodes 对应的） 多余的 dom。
    else if (newStartIdx > newEndIdx) {
        removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx)
    }
}
```

可以看到，这里的整体策略可以总结如下
1. 首先从新旧两个子节点列表的头尾（四个指针）开始一个个向中间循环处理，每处理一次有一些指针向中间移动一次（这里算作一次 `处理流程` ），任意一个列表处理完成便停止循环并作为短的那个列表，相对的作为长的那个列表，长的那个剩下未处理节点的 `单独处理`
2. 每一次 `处理流程` 都做以下几件事情
    + 边界情况处理：四个指针校验非空，否则向中间移动并跳出流程
    + 四个指针分别两两比较判断是否是同一个节点（① 旧头=新头，② 旧尾=新尾，③ 旧头=新尾，④ 旧尾=新头），命中则执行相应操作并跳出流程
        + ① 旧头=新头 - 当前不需要移动 dom，执行 patchVNode 比较两个指针对应的节点，同时新头、旧头指针直接右移
        + ② 旧尾=新尾 - 当前不需要移动 dom，执行 patchVNode 比较两个指针对应的节点，同时新头、旧头指针直接左移
        + ③ 旧头=新尾 - 当前需要将旧头 dom 插入到新尾对应的节点末尾，执行 patchVNode 比较两个指针对应的节点，同时移动俩指针
        + ④ 旧尾=新头 - 当前需要将旧尾 dom 插入到新头对应的节点开头，执行 patchVNode 比较两个指针对应的节点，同时移动俩指针
    + 两两比较均未命中，则取出当前新头节点的VNode，分别于剩下未处理的旧的节点列表一一比较
        + 若是同一个节点，则比较节点类型，相同则执行 patchVNode，不同则创建新的节点插入
        + 若不是同一个节点，则直接创建新的节点插入
3. 循环停止后，需要 `单独处理` 长的那个列表的未处理字段
    + 若新的列表较长（存在未处理节点），则将多出的节点添加至旧的列表头尾指针交汇处
    + 若旧的列表较长（存在未处理节点），则将多出的节点删除
****
### hook

snabbdom 提供的生命周期
``` js
/**
 * snabbdom 提供的生命周期
 */
const hooks = [
    pre?: PreHook; /*               patch 流程开始 */
    init?: InitHook; /*             一个新的 VNode 被创建 */
    create?: CreateHook; /*         VNode 上一个新的真实DOM被创建 */
    insert?: InsertHook; /*         更新后的DOM节点被挂载到根节点（真实情况是在patch的过程中收集insert回调，待一次更新后统一执行） */
    prepatch?: PrePatchHook; /*     patchVnode 流程开始 */
    update?: UpdateHook; /*         patchVnode 的过程中若 vnode.data 不为空，则触发该钩子更新 data */
    postpatch?: PostPatchHook; /*   patchVnode 流程结束 */
    destroy?: DestroyHook; /*       一个 DOM 被直接或间接移除 */
    remove?: RemoveHook; /*         一个 DOM 被直接移除 */
    post?: PostHook; /*             patch 流程结束 */
];
```

其中 `const hooks = ['pre', 'create', 'update', 'destroy', 'remove', 'post']` 这几个生命周期的回调是可以通过 init 接口选择性注入进来的（在上面的 init 入口描述了这样注册的好处），各模块需要提供对应生命周期需要执行的回调，在 init 中会根据该 hooks 列表聚合每个模块提供的回调，生成类似于下面这种结构：（这可以说是 snabbdom 的生命周期钩子挂载方式）
``` js
modules: [
    {
        create: updateClassName,
        update: updateClassName
    },
    {
        create: updateStyle,
        update: updateStyle
    },
    ...
]
🔽🔽🔽🔽 聚合 🔽🔽🔽🔽
cbs: {
    create: [
        updateClassName, updateStyle
    ],
    update: [
        updateClassName, updateStyle
    ]
}
```

另外在生成 VNode 的时候传入的结构化数据上也可以通过 `data.hooks` 携带一些回调函数进来，主要目的还是在 snabbdom 运行到一定生命周期时触发一些副作用，同时挂载在 VNode 上的钩子来自于各结构化数据，这也是一种符合模块化开发的设计方式，更好的关注点分离

## 总结

总结一下 snabbdom 的 DOM-diff 算法策略：
1. 执行 patch 比较两个 VNode 节点的异同
2. 若为不同的节点，直接舍弃，生成新的节点
3. 若为相同的节点，执行 patchVnode 比较新旧两个节点的子节点
4. patchVnode 中比较两个 VNode 的子节点，若都存在子节点则执行 updateChildren 逐条比较，否则直接更新子节点
5. updateChildren 中比较两个 VNode 的子节点列表，从两头向中间逐层向中间检索，找到最小更新