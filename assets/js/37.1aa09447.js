(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{342:function(v,_,t){"use strict";t.r(_);var l=t(0),i=Object(l.a)({},(function(){var v=this,_=v.$createElement,t=v._self._c||_;return t("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[t("h2",{attrs:{id:"浏览器渲染过程"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#浏览器渲染过程"}},[v._v("#")]),v._v(" 浏览器渲染过程")]),v._v(" "),t("h3",{attrs:{id:"navigation-timing"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#navigation-timing"}},[v._v("#")]),v._v(" Navigation Timing")]),v._v(" "),t("p",[v._v("w3c 制定的浏览器标准处理流程，将各个阶段拆分成一个个步骤：\n"),t("img",{attrs:{src:"/blog/img/cs/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%A4%84%E7%90%86%E6%B5%81%E7%A8%8B.jpg",alt:"浏览器处理流程"}})]),v._v(" "),t("ol",[t("li",[t("code",[v._v("prompt for funload")]),v._v(" 提示准备卸载上一个页面\n"),t("ul",[t("li",[v._v("事件 : "),t("code",[v._v("navigationStart")]),v._v(" 该流程真正开始的时间")])])]),v._v(" "),t("li",[t("code",[v._v("redirect")]),v._v(" 本地跳转重定向，检查本地缓存（客户端）是否存在、是否过期\n"),t("ul",[t("li",[v._v("事件 : "),t("code",[v._v("redirectStart")]),v._v(" 重定向开始，开始查找本地资源")]),v._v(" "),t("li",[v._v("事件 : "),t("code",[v._v("redirectEnd")]),v._v(" 查找到数据库中对应的资源位置，此时还未获取到资源")])])]),v._v(" "),t("li",[t("code",[v._v("unload")]),v._v(" 卸载上一个页面（与上一步同时进行，并发）\n"),t("ul",[t("li",[v._v("事件 : "),t("code",[v._v("unloadStart")])]),v._v(" "),t("li",[v._v("事件 : "),t("code",[v._v("unloadEnd")])])])]),v._v(" "),t("li",[t("code",[v._v("APP cache")]),v._v(" 读取本地缓存（前提是步骤二中检查到有本地缓存，否则跳过，但是该步骤伴随的事件依旧存在）\n"),t("ul",[t("li",[v._v("事件 : "),t("code",[v._v("fetchStart")]),v._v(" 读取缓存的起始")]),v._v(" "),t("li",[v._v("若获取到该缓存资源，则直接跳过一下 5、6、7、8 步，直接开始处理 HTML")])])]),v._v(" "),t("li",[t("code",[v._v("DNS")]),v._v(" 解析\n"),t("ul",[t("li",[v._v("事件 : "),t("code",[v._v("domainLookupStart")]),v._v(" DNS 查询起始时间")]),v._v(" "),t("li",[v._v("事件 : "),t("code",[v._v("domainLookupEnd")]),v._v(" DNS 查询结束时间")])])]),v._v(" "),t("li",[t("code",[v._v("TCP")]),v._v(" 从 TCP 层面上与远程服务器建立连接、握手过程\n"),t("ul",[t("li",[v._v("事件 : "),t("code",[v._v("connectStart")]),v._v(" TCP 建立请求时间，三次握手开始")]),v._v(" "),t("li",[v._v("事件 : "),t("code",[v._v("(srcureConnectionStart)")]),v._v(" HTTPS 安全协议连接、交换证书")]),v._v(" "),t("li",[v._v("事件 : "),t("code",[v._v("connectStart")])])])]),v._v(" "),t("li",[t("code",[v._v("Request")]),v._v(" "),t("ul",[t("li",[v._v("事件 : "),t("code",[v._v("requestStart")]),v._v(" 开始发送请求")]),v._v(" "),t("li",[v._v("等待服务器处理")])])]),v._v(" "),t("li",[t("code",[v._v("Response")]),v._v(" "),t("ul",[t("li",[v._v("事件 : "),t("code",[v._v("responseStart")]),v._v(" 客户端收到服务器发来的响应开始")]),v._v(" "),t("li",[v._v("事件 : "),t("code",[v._v("responseEnd")]),v._v(" 客户端收到服务器发来的响应结束")])])]),v._v(" "),t("li",[t("code",[v._v("Processing")]),v._v(" 处理 HTML\n"),t("ul",[t("li",[v._v("事件 : "),t("code",[v._v("domLoading")]),v._v(" 收到响应文本之后，放入内存，开始解析")]),v._v(" "),t("li",[v._v("处理成 DOM 树")]),v._v(" "),t("li",[v._v("事件 : "),t("code",[v._v("domInteractive")]),v._v(" 解析完成")]),v._v(" "),t("li",[v._v("待解析完毕，将 DOM 对象载入可用内存中去")]),v._v(" "),t("li",[v._v("事件 : "),t("code",[v._v("domContentLoaded")]),v._v(" 开始计算 DOM 结构的位置和大小")]),v._v(" "),t("li",[v._v("事件 : "),t("code",[v._v("domComplete")]),v._v(" 计算完成")])])]),v._v(" "),t("li",[t("code",[v._v("onLoad")]),v._v(" 展示\n"),t("ul",[t("li",[v._v("事件 : "),t("code",[v._v("loadEventStart")])]),v._v(" "),t("li",[v._v("事件 : "),t("code",[v._v("loadEventEnd")])])])])]),v._v(" "),t("ul",[t("li",[v._v("本地缓存阶段 2, 3, 4")]),v._v(" "),t("li",[v._v("网络请求阶段 5, 6, 7, 8")]),v._v(" "),t("li",[v._v("渲染阶段 9, 10")])]),v._v(" "),t("div",{staticClass:"custom-block tip"},[t("p",[v._v("这些节点的时间可以通过浏览器的 "),t("code",[v._v("performance.timing")]),v._v(" API 获取，目前主流的浏览器都支持")])]),v._v(" "),t("p",[v._v("可优化的点：")]),v._v(" "),t("ul",[t("li",[v._v("缓存阶段")]),v._v(" "),t("li",[v._v("DNS")]),v._v(" "),t("li",[v._v("TCP")]),v._v(" "),t("li",[v._v("请求 & 响应（传输数据的多少）")])]),v._v(" "),t("h2",{attrs:{id:"dns解析"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#dns解析"}},[v._v("#")]),v._v(" DNS解析")]),v._v(" "),t("p",[v._v("Domain Name System，用于将 域名 转换成 IP")]),v._v(" "),t("ul",[t("li",[v._v("正向解析 域名 --\x3e IP")]),v._v(" "),t("li",[v._v("反向解析 IP --\x3e 域名")])]),v._v(" "),t("p",[v._v("域名数量级达到上亿，因此需要分级解析")]),v._v(" "),t("h3",{attrs:{id:"名词"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#名词"}},[v._v("#")]),v._v(" 名词")]),v._v(" "),t("ul",[t("li",[t("code",[v._v("顶级域名")]),v._v(" google.com")]),v._v(" "),t("li",[t("code",[v._v("二级域名")]),v._v(" www.google.com")]),v._v(" "),t("li",[t("code",[v._v("后缀")]),v._v(" .com")]),v._v(" "),t("li",[t("code",[v._v("资源记录")]),v._v(" 关联 域名 与 IP")])]),v._v(" "),t("h3",{attrs:{id:"解析过程"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#解析过程"}},[v._v("#")]),v._v(" 解析过程")]),v._v(" "),t("p",[v._v("DNS 服务器：")]),v._v(" "),t("ul",[t("li",[v._v("内置所有 根服务器 的 IP")]),v._v(" "),t("li",[v._v("内部有缓存机制，几分钟更新一次")])]),v._v(" "),t("p",[v._v("几个资源服务器：")]),v._v(" "),t("ul",[t("li",[v._v("Root Server 根服务器\n"),t("ul",[t("li",[v._v("维护后缀（.com）")]),v._v(" "),t("li",[v._v("全球仅13台（大部分分布于欧美日，且都是集群分布）")])])]),v._v(" "),t("li",[v._v("TLD Server TLD服务器\n"),t("ul",[t("li",[v._v("维护顶级域名（google.com）")])])]),v._v(" "),t("li",[v._v("Name Server 名称服务器\n"),t("ul",[t("li",[v._v("维护剩余的域名（二级、三级、... ，如：www.google.com / images.google.com / map.a.qq.com）")])])])]),v._v(" "),t("div",{staticClass:"custom-block tip"},[t("p",[v._v("由于请求压力非常的大，这些资源服务器都不是单独的一台或者单独的集群，都是存在相应的镜像服务器的")]),v._v(" "),t("ul",[t("li",[v._v("受制于主服务器")]),v._v(" "),t("li",[v._v("镜像服务器只负责查询，不起真正作用")]),v._v(" "),t("li",[v._v("真正的 主服务器 更新之后，需要马上同步至镜像服务器")]),v._v(" "),t("li",[v._v("镜像同步是需要时间的，几分钟至几十分钟")])])]),v._v(" "),t("p",[t("img",{attrs:{src:"/blog/img/cs/DNS%E6%9F%A5%E8%AF%A2.jpg",alt:"DNS查询"}})]),v._v(" "),t("p",[v._v("过程：")]),v._v(" "),t("ol",[t("li",[v._v("PC 向 DNS 服务器查询，在本地系统中设置的 DNS 服务器（8.8.8.8 / 114.114.114.114）")]),v._v(" "),t("li",[v._v("DNS 服务器检查存在缓存并且未过期，则直接将缓存的 IP 返回给 PC")]),v._v(" "),t("li",[v._v("若以上步骤不通，则需要启动远程 DNS 查询（甚至跨域半个地球）")]),v._v(" "),t("li",[v._v("远程 DNS 查询\n"),t("ul",[t("li",[v._v("与 Root Server 通信，查询后缀，返回下一个要查询的TLD服务器的 IP")]),v._v(" "),t("li",[v._v("与 TLD Server 通信，查询顶级域名，返回下一个要查询的名称服务器的 IP")]),v._v(" "),t("li",[v._v("与 Name Server 通信，解析整个域名，返回最终的 IP 给 DNF 服务器")])])]),v._v(" "),t("li",[v._v("DNF 服务器将 IP 缓存住，返回给 PC")])]),v._v(" "),t("h3",{attrs:{id:"dns-记录类型"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#dns-记录类型"}},[v._v("#")]),v._v(" DNS 记录类型")]),v._v(" "),t("ul",[t("li",[v._v("SOA: (StartOf Authority, 起始授权记录)，一个区域解析库有且只能有一个SOA记录，⽽而且必须放在第一条")]),v._v(" "),t("li",[v._v("A记录: (主机记录)，用于名称解析的重要记录，将特定的主机名映射到对应主机的 IPv4 IP地址上")]),v._v(" "),t("li",[v._v("CNAME记录: (别名记录)，用于返回另一个域名，即当前查询的域名是另一个域名的跳转，主要用于域名的内部跳转，为服务器配置提供灵活性")]),v._v(" "),t("li",[v._v("NS记录: (域名服务器记录)，用于返回保存下一级域名信息的服务器地址。该记录只能设置为域名，不能设置为IP地址。")]),v._v(" "),t("li",[v._v("MX: (邮件记录)，用于返回接收电子邮件的服务器地址")]),v._v(" "),t("li",[v._v("IPv6主机记录: (AAAA记录)，与A记录对应，用于将特定的主机名映射到一个主机的 IPv6 地址")])]),v._v(" "),t("h2",{attrs:{id:"tcp-三次握手与四次挥手"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#tcp-三次握手与四次挥手"}},[v._v("#")]),v._v(" TCP 三次握手与四次挥手")]),v._v(" "),t("p",[v._v("通过 TCP 协议传输的数据内容，是经过层层包装的从原始的 HTTP 包装请求报文开始，一层层的向下传输至物理层（电信号），每经过一层，数据就被多包装一次。数据到了接收方那边，又一层层的拆开包装，拿到里面的数据内容\n"),t("img",{attrs:{src:"/blog/img/cs/tcp%E5%8C%85%E8%A3%85%E8%BF%87%E7%A8%8B.jpg",alt:"tcp包装过程"}})]),v._v(" "),t("h3",{attrs:{id:"tcp-的协议头结构"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#tcp-的协议头结构"}},[v._v("#")]),v._v(" TCP 的协议头结构")]),v._v(" "),t("p",[v._v("被 TCP 协议包装过后，会给数据包装上这样的协议头：\n"),t("img",{attrs:{src:"/blog/img/cs/tcp%E5%8D%8F%E8%AE%AE%E5%A4%B4.jpg",alt:"tcp协议头"}})]),v._v(" "),t("p",[v._v("其中：")]),v._v(" "),t("ul",[t("li",[v._v("左手边的数字为数据流偏移量（字节位置）")]),v._v(" "),t("li",[t("code",[v._v("Source Port")]),v._v(" "),t("ul",[t("li",[v._v("源端口号、发送方端口号（本机的一个高于 1024 随机端口号）")]),v._v(" "),t("li",[v._v("占两个字节（短整型）")])])]),v._v(" "),t("li",[t("code",[v._v("Destination Port")]),v._v(" "),t("ul",[t("li",[v._v("目标端口号、接收方端口号（80 端口）")])])]),v._v(" "),t("li",[t("code",[v._v("Sequence Number")]),v._v(" "),t("ul",[t("li",[v._v("顺序号，发送方发送数据需携带")]),v._v(" "),t("li",[v._v("每发送一个数据包，顺序号 +1")]),v._v(" "),t("li",[v._v("目的：大数据是要拆成多个小包发送的，数据的顺序就依靠顺序号，到接收方那边若发现某个数据包丢失需要重发，只需要求发送方重发该顺序号对应的数据包")])])]),v._v(" "),t("li",[t("code",[v._v("Acknowledgment Number")]),v._v(" "),t("ul",[t("li",[v._v("应答编号，与顺序号对应，接收方收到数据响应回去需携带")])])]),v._v(" "),t("li",[t("code",[v._v("Offet")]),v._v(" "),t("ul",[t("li",[v._v("整个协议头长度，即偏移量")]),v._v(" "),t("li",[v._v("当拿到数据包的时候需要拆开层层包装的数据时，根据该字段拆分")])])]),v._v(" "),t("li",[v._v("后续为一系列用于校验与验证的数据属性")])]),v._v(" "),t("h3",{attrs:{id:"握手与挥手"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#握手与挥手"}},[v._v("#")]),v._v(" 握手与挥手")]),v._v(" "),t("p",[v._v("为了创建一条稳定的链路，TCP 连接（建立链路）需要三次握手过程，断开连接（断开链路）需要四次挥手过程")]),v._v(" "),t("p",[t("img",{attrs:{src:"/blog/img/cs/%E6%8F%A1%E6%89%8B%E4%B8%8E%E6%8C%A5%E6%89%8B.jpg",alt:"握手与挥手"}})]),v._v(" "),t("p",[v._v("名词：")]),v._v(" "),t("ul",[t("li",[t("code",[v._v("SYN")]),v._v(" : 请求指令")]),v._v(" "),t("li",[t("code",[v._v("ACK")]),v._v(" : 应答指令")]),v._v(" "),t("li",[t("code",[v._v("FIN")]),v._v(" : 结束指令")])]),v._v(" "),t("p",[v._v("握手过程：")]),v._v(" "),t("ol",[t("li",[v._v("客户端 ----"),t("span",{staticStyle:{"font-size":"10px","border-bottom":"1px solid #67cc86"}},[v._v("发送请求指令，携带顺序号（Seq=x）")]),v._v("---\x3e 服务端")]),v._v(" "),t("li",[v._v("客户端 <---"),t("span",{staticStyle:{"font-size":"10px","border-bottom":"1px solid #67cc86"}},[v._v("发送应答指令，携带应答号（Ack=x+1），同时为减少通信次数，发送请求指令，携带顺序号（Seq=y）")]),v._v("---- 服务端")]),v._v(" "),t("li",[v._v("客户端 ----"),t("span",{staticStyle:{"font-size":"10px","border-bottom":"1px solid #67cc86"}},[v._v("发送应答指令，携带应答号（Ack=y+1）")]),v._v("---\x3e 服务端")])]),v._v(" "),t("p",[v._v("挥手过程：")]),v._v(" "),t("ol",[t("li",[v._v("客户端 ----"),t("span",{staticStyle:{"font-size":"10px","border-bottom":"1px solid #67cc86"}},[v._v("发送结束指令，携带顺序号（Seq=x+2）、应答号（Ack=y+1）")]),v._v("---\x3e 服务端")]),v._v(" "),t("li",[v._v("客户端 <---"),t("span",{staticStyle:{"font-size":"10px","border-bottom":"1px solid #67cc86"}},[v._v("服务端应答该结束指令，携带应答号（Ack=x+1）")]),v._v("---- 服务端")]),v._v(" "),t("li",[v._v("客户端 <---"),t("span",{staticStyle:{"font-size":"10px","border-bottom":"1px solid #67cc86"}},[v._v("服务端做好断开准备，发送结束指令，携带顺序号（Seq=y+1）")]),v._v("---- 服务端")]),v._v(" "),t("li",[v._v("客户端 ----"),t("span",{staticStyle:{"font-size":"10px","border-bottom":"1px solid #67cc86"}},[v._v("客户端应答该结束指令，携带应答号（Ack=y+2）")]),v._v("---\x3e 服务端")])]),v._v(" "),t("div",{staticClass:"custom-block tip"},[t("p",{staticClass:"custom-block-title"},[v._v("为什么挥手有四次？")]),v._v(" "),t("p",[v._v("因为挥手过程中，服务端接收到客户端的结束指令时，服务端可能还存在事务未处理完，需先响应客户端的断开，处理完事务，再发送给客户端结束指令，告诉客户端自己这边也处理完毕，可以结束")])]),v._v(" "),t("h3",{attrs:{id:"半连接"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#半连接"}},[v._v("#")]),v._v(" 半连接")]),v._v(" "),t("p",[v._v("半连接状态：即握手或挥手过程中，客户端发送请求指令，服务端发送应答指令，之后客户端未响应应答指令。这时，服务端维持着网络连接状态。")]),v._v(" "),t("p",[v._v("造成的后果：")]),v._v(" "),t("ul",[t("li",[v._v("网络连接资源无法释放不掉")]),v._v(" "),t("li",[v._v("为连接申请的资源释放不掉，会造成 TCP 堆的崩溃")])]),v._v(" "),t("p",[v._v("网络安全中存在一种 DOS 攻击（半连接攻击、拒绝服务攻击），目前应对的策略只能是堆硬件")]),v._v(" "),t("h2",{attrs:{id:"cdn-与-集群"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#cdn-与-集群"}},[v._v("#")]),v._v(" CDN 与 集群")]),v._v(" "),t("p",[t("img",{attrs:{src:"/blog/img/cs/CDN.jpg",alt:"CDN"}})]),v._v(" "),t("p",[v._v("CDN\b 的原理：")]),v._v(" "),t("ul",[t("li",[v._v("一台主服务器映射多台 "),t("strong",[v._v("镜像服务器")]),v._v("，镜像服务器的资源需从主服务器同步")]),v._v(" "),t("li",[v._v("智能 DNS ，将域名映射到 "),t("strong",[v._v("多个 IP 地址")]),v._v("，并将对应的解析规则，放入到客户端对应的 "),t("strong",[v._v("区域 DNS 服务器")]),v._v(" 中。比如当某客户端访问 www.baidu.com，则由该客户端的区域 DNS 服务器解析出对于客户端最快的镜像服务器 IP 地址")])])])}),[],!1,null,null,null);_.default=i.exports}}]);