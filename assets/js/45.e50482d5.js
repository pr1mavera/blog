(window.webpackJsonp=window.webpackJsonp||[]).push([[45],{364:function(v,_,t){"use strict";t.r(_);var o=t(0),i=Object(o.a)({},(function(){var v=this,_=v.$createElement,t=v._self._c||_;return t("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[t("ul",[t("li",[v._v("密码学的处理对象是"),t("strong",[v._v("数字")]),v._v("和"),t("strong",[v._v("字符串")]),v._v(" "),t("ul",[t("li",[v._v("早期密码学加密手段主要是类似于"),t("strong",[v._v("移位替换")]),v._v("的方式")]),v._v(" "),t("li",[v._v("现代密码学是建立在数论基础上的")])])])]),v._v(" "),t("h2",{attrs:{id:"散列算法-hash、md5"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#散列算法-hash、md5"}},[v._v("#")]),v._v(" 散列算法(hash、MD5)")]),v._v(" "),t("p",[v._v("是一种数据一旦转换为其他形式将永远无法恢复的加密技术(混淆技术、不可逆运算，基本上不算是加密算法)")]),v._v(" "),t("ul",[t("li",[v._v("主要应用场景："),t("em",[v._v("用户登录功能")]),v._v(" "),t("ol",[t("li",[v._v("用户输入的密码后通过信道(http)发送到服务端")]),v._v(" "),t("li",[v._v("发送之前在客户端通过"),t("strong",[v._v("散列算法")]),v._v("进行加密再传输(实际上到了服务器这头，服务器存贮的也是加密后面的密码)")]),v._v(" "),t("li",[v._v("如果通信的过程中被截获，得到的也只能是加密后的密码，一定程度上保证了安全性(散列算法也是可以通过某种方式暴力破解的)")])])])]),v._v(" "),t("h2",{attrs:{id:"加密算法"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#加密算法"}},[v._v("#")]),v._v(" 加密算法")]),v._v(" "),t("ul",[t("li",[t("code",[v._v("对称加密")]),v._v(" (AES、DES、3DES)("),t("strong",[v._v("加密过程与解密过程使用同一套算法")]),v._v(")\n"),t("ul",[t("li",[v._v("数据传输双方在不同地方，同时持有 "),t("em",[v._v("加密算法")]),v._v(" 及 "),t("em",[v._v("解密口令")]),v._v("，依旧很不安全")])])]),v._v(" "),t("li",[t("code",[v._v("非对称加密")]),v._v(" (RSA)("),t("strong",[v._v("加密与解密分开，公钥用来加密，私钥用来解密")]),v._v(")\n"),t("ul",[t("li",[v._v("A ----- 传输 -----\x3e B ，A 根据 B 的公钥进行加密，B 收到后用 B 的私钥解密")]),v._v(" "),t("li",[v._v("A <----- 传输 ----- B ，B 根据 A 的公钥进行加密，A 收到后用 A 的私钥解密")])])])]),v._v(" "),t("div",{staticClass:"custom-block tip"},[t("p",[v._v("在https中同时用到了 "),t("em",[v._v("对称加密")]),v._v(" 和 "),t("em",[v._v("非对称加密")]),v._v(" 两种算法：")]),v._v(" "),t("ol",[t("li",[v._v("https握手过程中传递 "),t("em",[v._v("主密钥")]),v._v(" 时使用 "),t("strong",[v._v("非对称加密")]),v._v("，客户端根据密钥交换算法生成 "),t("em",[v._v("预主密钥")]),v._v("， "),t("em",[v._v("预主密钥")]),v._v(" 通过服务器公钥加密后传输给服务器端，服务器端使用私钥解密得到 "),t("em",[v._v("预主密钥")])]),v._v(" "),t("li",[v._v("https握手结束后的通讯，使用的时候 "),t("strong",[v._v("对称加密")]),v._v(" ，因为 "),t("strong",[v._v("非对称加密")]),v._v(" 的性能是非常低的，原因在于寻找大素数、大数计算、数据分割需要耗费很多的CPU周期")])])]),v._v(" "),t("p",[v._v("以下便是 https 中比较有名的密钥交换算法：")]),v._v(" "),t("h2",{attrs:{id:"密钥交换算法"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#密钥交换算法"}},[v._v("#")]),v._v(" 密钥交换算法")]),v._v(" "),t("ul",[t("li",[v._v("Diffie-Hellman 算法是一种著名的密钥协商算法（"),t("strong",[v._v("在两端点之间进行公开的密钥交换，同时如果他人拿到该密钥也无法使用")]),v._v("），利用的是 "),t("a",{attrs:{href:"https://en.wikipedia.org/wiki/Discrete_logarithm",target:"_blank",rel:"noopener noreferrer"}},[v._v("离散对数数学难题"),t("OutboundLink")],1),v._v("，即 "),t("code",[v._v("A = g ^ a (mod p)")]),v._v(" ，在已知的 A, g, p 条件下，很难求得 a\n"),t("ol",[t("li",[v._v("Alice 与 Bob 确定两个大素数 n 和 g (位数现在在4K左右) ，这两个数不用保密")]),v._v(" "),t("li",[v._v("Alice 选择另一个大随机数 x ，并计算 A 如下：A = (g ^ x) mod n，将 A 发给 Bob")]),v._v(" "),t("li",[v._v("Bob 选择另一个大随机数 y ，并计算 B 如下：B = (g ^ y) mod n，将 B 发给 Alice")]),v._v(" "),t("li",[v._v("Alice 用收到的 B 计算密钥 K1 = (B ^ x) mod n")]),v._v(" "),t("li",[v._v("Bob 用收到的 A 计算密钥 K2 = (A ^ y) mod n")]),v._v(" "),t("li",[v._v("K1 = K2，因此 Alice 和 Bob 可以用其进行加解密")])])])]),v._v(" "),t("div",{staticClass:"custom-block tip"},[t("ol",[t("li",[v._v("加密解密过程\n"),t("ul",[t("li",[v._v("加密 ：明文 + 密钥 + 算法 -> 密文")]),v._v(" "),t("li",[v._v("解密 ：密文 + 密钥 + 算法 -> 明文")])])]),v._v(" "),t("li",[t("strong",[v._v("对称加密")]),v._v(" 与 "),t("strong",[v._v("非对称加密")]),v._v(" 区别，在上述过程中的密钥：\n"),t("ul",[t("li",[v._v("对称加密 为一样的 "),t("code",[v._v("key")])]),v._v(" "),t("li",[v._v("非对称加密 加密为 "),t("code",[v._v("公钥")]),v._v(" ，解密为 "),t("code",[v._v("私钥")])])])]),v._v(" "),t("li",[v._v("素数: 一个数只能被1和他自己整除的数")]),v._v(" "),t("li",[v._v("mod: 求模运算，得到一个数除以另一个数的余数")]),v._v(" "),t("li",[v._v("证明以上 K1 = K2 :"),t("br"),v._v("\n已知：求模运算满足公式 "),t("code",[v._v("(((a ^ b) mod p) ^ c) mod p = ((a ^ b) ^ c) mod p) mod p")]),t("br"),v._v("\nK1"),t("br"),v._v("\n= (B ^ x) mod n"),t("br"),v._v("\n= (((g ^ y) mod n) ^ x) mod n"),t("br"),v._v("\n= ((g ^ y) ^ x) mod n"),t("br"),v._v("\n= (g ^ (y * x)) mod n"),t("br"),v._v("\n= (g ^ (x * y)) mod n"),t("br"),v._v("\n= ((g ^ x) ^ y) mod n"),t("br"),v._v("\n= (((g ^ x) mod n) ^ y) mod n"),t("br"),v._v("\n= (A ^ y) mod n"),t("br"),v._v("\n= K2")])])]),v._v(" "),t("h2",{attrs:{id:"证书签发机构-ca"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#证书签发机构-ca"}},[v._v("#")]),v._v(" 证书签发机构 (CA)")]),v._v(" "),t("p",[v._v("CA (certification authority) 第三方受信用部门，用不对称算法对数据加密密钥的进行安全交换，再利用数据加密密钥完成数据的安全交换")]),v._v(" "),t("ul",[t("li",[v._v("证书创建：\n"),t("ol",[t("li",[v._v("服务器 example.com 将从CA（签发机构，例如 "),t("strong",[v._v("Digicert")]),v._v(" ）请求 "),t("strong",[v._v("TLS证书")])]),v._v(" "),t("li",[t("strong",[v._v("Digicert")]),v._v(" 为 example.com 创建证书，包含某些必要信息，"),t("em",[v._v("服务器名称")]),v._v(" 、 "),t("em",[v._v("服务器公钥")]),v._v(" 等，暂且叫 "),t("code",[v._v("Data")])]),v._v(" "),t("li",[t("strong",[v._v("Digicert")]),v._v(" 为必要信息 "),t("code",[v._v("Data")]),v._v(" 生成签名串："),t("br"),v._v(" "),t("strong",[t("code",[v._v("Data")])]),v._v(" "),t("span",{staticStyle:{"font-size":"10px","border-bottom":"1px solid #67cc86"}},[v._v("指定散列算法 > ")]),v._v(" "),t("strong",[t("code",[v._v("Data")]),v._v(" 的哈希值")]),v._v(" "),t("span",{staticStyle:{"font-size":"10px","border-bottom":"1px solid #67cc86"}},[v._v("自己的私钥加密 > ")]),v._v(" "),t("strong",[v._v("签名串 "),t("code",[v._v("sign")])])]),v._v(" "),t("li",[t("strong",[v._v("Digicert")]),v._v(" 将 "),t("code",[v._v("Data")]),v._v(" 、 "),t("code",[v._v("sign")]),v._v(" 以及 "),t("em",[v._v("散列算法")]),v._v(" 合并成最终的 "),t("strong",[v._v("TLS证书")]),v._v(" 发送给服务器")])])]),v._v(" "),t("li",[v._v("证书使用：\n"),t("ol",[t("li",[t("strong",[v._v("浏览器")]),v._v(" 访问网站，收到服务器的相关证书，拿到 "),t("code",[v._v("Data")]),v._v(" 、 "),t("code",[v._v("sign")]),v._v(" 以及 "),t("em",[v._v("散列算法")])]),v._v(" "),t("li",[t("code",[v._v("Data")]),v._v(" "),t("span",{staticStyle:{"font-size":"10px","border-bottom":"1px solid #67cc86"}},[v._v("指定散列算法 > ")]),v._v(" "),t("strong",[v._v("哈希值")])]),v._v(" "),t("li",[t("code",[v._v("sign")]),v._v(" "),t("span",{staticStyle:{"font-size":"10px","border-bottom":"1px solid #67cc86"}},[v._v("签发机构的公钥（浏览器或系统自带）解密 > ")]),v._v(" "),t("strong",[v._v("哈希值")])]),v._v(" "),t("li",[v._v("若两个 "),t("strong",[v._v("哈希值")]),v._v(" 相等，则说明证书有效")])])]),v._v(" "),t("li",[v._v("根证书 & 中间证书\n"),t("ul",[t("li",[v._v("签发机构维护的所有证书签名都是用一套公钥私钥进行加解密，因此对这份私钥的安全性要求很高。因此为了解决这个问题，引入了中间签发机构的概念")]),v._v(" "),t("li",[v._v("中间签发机构从根机构那里取得签发权限证书（intermediate CA），注册成为代理机构，签发证书")]),v._v(" "),t("li",[v._v("浏览器访问时，服务器需共享出两个证书：第三方签发的证书、根机构给第三方签发的 intermediate CA")])])])])])}),[],!1,null,null,null);_.default=i.exports}}]);