---
title: 从输入url到显示网页，浏览器都干了啥
date: 2019-05-12
tags: 
 - 前端基础
 - 浏览器
---

“从输入url到显示网页”，说实话这是个老生常谈的问题，在很多前端开发场景中多少都会接触到一些相关知识，最近看到个专栏顺便深（fu）入（zhi）研（zhan）究（tie）了一下，算是对于自己知识体系的总结吧。

<!-- more -->

<!-- # 从输入url到显示网页，浏览器都干了啥 -->

<!-- <font color=#ddd>pr1mavera 2019-04-28</font> -->

![banner](/blog/img/urlToPage/banner.jpg)

第一次写博客，紧脏的一匹😂。。

## 感性认识
大致过程应该是这个样子：（大家应该都知道）  
http -> 构建dom树 -> 计算css -> 排版 -> 渲染和合成 -> 绘制
1. 浏览器首先使用 HTTP 协议或者 HTTPS 协议，向服务端请求页面；
2. 把请求回来的 HTML 代码经过解析，构建成 DOM 树；
3. 计算 DOM 树上的 CSS 属性；
4. 最后根据 CSS 属性对元素逐个进行渲染，得到内存中的位图；
5. 一个可选的步骤是对位图进行合成，这会极大地增加后续绘制的速度；
6. 合成之后，再绘制到界面上。

而需要注意的是，从http请求得到数据之后，后续的操作基本都是流式的，意思是浏览器拿到html代码之后并不是等完全构建完dom树再去计算css的，而是产出即消费，类似于水库里的水，并不是一股脑的十吨二十吨拿出来用的，是要靠水龙头一点点输出的。这也是为什么我们看到的网页都是逐步加载出来的，一个道理。

下面我们一点点来看这个过程。

## http请求
浏览器将输入的url，生成对应的http请求。

### DNS解析
URL（Uniform Resource Locator），即统一资源定位符，又叫做域名。浏览器完全依靠URL来定位网络中的资源。  
DNS（Domain Name System，域名系统），记录域名和IP地址相互映射的信息，DNS解析是浏览器的实际寻址方式。  
浏览器将输入的URL按照DNS解析的对应规则，找到网络中对应的资源。以下为DNS解析方式的两种比较简单的情况：  
1. 对于浏览器首次登陆或者相隔一段时间内登陆某个网站
* 输入URL地址后，浏览器会从电脑的hosts文件查找是否有存储DNS信息，查找是否有目标域名和对应的IP地址；
* 从路由器的缓存DNS信息中查找；
* ISP DNS缓存查找，从网络服务商（比如电信）的DNS缓存信息中查找；
* 经由以上三种查找方法还没查找到目标URL对应的IP的话，就会向根域名DNS服务器查找目标URL的对应IP，根域名服务器会向下级服务器转送请求，层层下发，直至找到对应IP为止。
2. 对于近期内有在浏览器登录过的网站，本地浏览器会有DNS缓存，可以直接查找到IP地址。

浏览器根据输入的url，进行DNS解析找到对应IP，通过IP地址查找到对应的服务器，向发起一次http请求。

### Request-Response 模式
HTTP 协议是基于 TCP 协议出现的，对 TCP 协议来说，TCP 协议是一条双向的通讯通道，HTTP 在 TCP的基础上，规定了 Request-Response 的模式。这个模式决定了通讯必定是由浏览器端首先发起的。
我们可以用Telnet协议模拟一个http的请求：  
在终端中输入Telnet连接的命令：
```sh
> telnet www.baidu.com 80
```
发起一次get请求：
```sh
> GET / HTTP/1.1
> Host: www.baidu.com
```
连续敲两次回车之后，我们会看到这样的提示：
![Telnet](/blog/img/urlToPage/telnet.jpeg)

这就是一次完整的 HTTP 请求的过程了，我们可以看到，在TCP通道中传输的，完全是**文本**。  
在 `request` 部分，第一行被称作 `request line`，它分为三个部分，HTTP Method，也就是请求的“方法”，请求的“方法”，请求的路径和请求的协议和版本。  
在 `response` 部分，第一行被称作 `response line`，它也分为三个部分，协议和版本、状态码和状态文本。  
紧随在 `request line` 或者 `response line` 之后，是请求头 / 响应头，这些头由若干行组成，每行是用冒号分隔的名称和值。在头之后，以一个空行（两个换行符）为分隔，是请求体 / 响应体，请求体可能包含文件或者表单数据，响应体则是 html 代码。

也就是下面这个样子：
![requestAndResponse](/blog/img/urlToPage/requestAndResponse.jpg)

<!-- ### HTTP Method
先说一下 `request line` 里面的方法部分，这里的方法跟我们编程中的方法意义类似，表示我们此次 HTTP 请求希望执行的操作类型。
* GET
* POST
* HEAD
* PUT
* DELETE
* CONNECT
* OPTIONS
* TRACE

浏览器通过地址栏访问页面都是 GET 方法。表单提交产生 POST 方法。  
HEAD 则是跟 GET 类似，只返回请求头，多数由 JavaScript 发起。  
PUT 和 DELETE 分别表示添加资源和删除资源，但是实际上这只是语义上的一种约定，并没有强约束。  
CONNECT 现在多用于 HTTPS 和 WebSocket。  
OPTIONS 和 TRACE 一般用于调试，多数线上服务都不支持。 -->

## 解析HTML
拿到服务传输回来的文本之后，我们就需要开始解析了。需要通过一定的方式解析成一个个的“词”（指编译原理的术语 token，表示最小的有意义的单元），浏览器才能理解。HTML的结构不算复杂，基本就标签开始、属性、标签结束、注释、CDATA 节点这么几种。  
然而需要注意的是，解析器需要做许多的容错处理，这在有些时候会比较的麻烦。

### 拆分
拆解的过程类似于在文本的合适位置做切割，一个标准的文本 `<p class="a">text</p>` 会被拆成这样几个词： `<p` `class="a"` `>` `text` `</` `>`。

![token](/blog/img/urlToPage/token.png)

实际上，我们**每读入一个字符**，其实都要做一次决策，而且这些决定是跟“当前状态”有关的。在这样的条件下，浏览器工程师要想实现把字符流解析成词（token），最常见的方案就是使用状态机。

### 状态机
一个粗略的HTML语法状态机大概长这样：

实际上，用状态机做词法分析，其实正是把每个词的“特征字符”逐个拆开成独立状态，然后再把所有词的特征字符链合并起来，形成一个联通图结构。  
我们可以用JS来模拟一下HTML的语法解析过程，当然这只是个最小实现。

未完未完。。。