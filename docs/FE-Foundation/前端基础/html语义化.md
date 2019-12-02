---
title: html语义化
date: 2019-06-18
---

多数情况下div和span够用，也提倡使用，同时如果能做到合理运用语义化则更便于人阅读，也便于机器阅读
::: warning 注意：
尽量只用自己熟悉的语义标签，并且只在有把握的场景引入语义标签。这样，我们才能保证语义标签不被滥用，造成更多的问题
:::

## 作为自然语言延伸的语义类标签
`ruby` 、 `rt` 、 `rp` ，在一定的语句中用于解释说明用

![ruby语义](/blog/img/html/ruby-yuyi.png)

## 表示一些特定语义
`em` 、 `strong` ，em通常在一句话中用于表达特定的语义，em位置不同，表达的句意也不一样。strong只单纯表示强调

## 作为标题摘要的语义类标签
+ hgroup 避免副标题产生额外的一个层级
+ section 的嵌套会使得其中的 h1-h6 下降一级

## 作为整体结构的语义类标签
```html
<body>
    <header>
        <nav>
            ……
        </nav>
    </header>
    <aside>
        <nav>
            ……
        </nav>
    </aside>
    <section>……</section>
    <section>……</section>
    <section>……</section>
    <footer>
        <address>……</address>
    </footer>
</body>
```
article 是一种特别的结构，它表示具有一定独立性质的文章。article 和 body 具有相似的结构，同时，一个 HTML 页面中，可能有多个 article 存在。
```html
<body>
    <header>……</header>
    <article>
        <header>……</header>
        <section>……</section>
        <section>……</section>
        <section>……</section>
        <footer>……</footer>
    </article>
    <article>
        ……
    </article>
    <article>
        ……
    </article>
    <footer>
        <address></address>
    </footer>
</body>
```
## 意义
1. 在没有 CSS 的时候，开发者也能够清晰地看出网页的结构，增强了可读性
2. 便于团队的开发和维护
3. 让浏览器更好的理解标签
4. 适合搜索引擎检索（SEO）
5. 让爬虫刚好的理解文章的意思
6. 语义类还可以支持读屏软件，根据文章可以自动生成目录

::: warning 注意：
尽量少写html标签：（一个标签利用上 `before` 、 `after` 至少可以代替三个）。作用：
1. 减少dom渲染时间
2. 不浪费整个文件大小
:::