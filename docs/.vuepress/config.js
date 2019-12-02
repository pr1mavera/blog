module.exports = {
    title: `pr1mavera's blog`,
    description: '一切不成体系的知识碎片都只能当做无聊的消遣',
    // host: '192.168.8.104',
    host: 'localhost',
    port: '8080',
    head: [
        ['link', { rel: 'icon', href: `/favicon.ico` }],
        ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
    ],
    base: '/blog/',
    repo: 'https://github.com/pr1mavera/blog',
    dest: './docs/.vuepress/dist',
    theme: 'reco',
    themeConfig: {
        // type: 'blog',
        huawei: true,
        startYear: '2018',
        author: 'pr1mavera',
        background: `/img/`,
        github: 'pr1mavera',
        logo: '/img/logo.png',
        lastUpdated: 'Last Updated',
        sidebarDepth: 3,
        date_format: 'yyyy-MM-dd HH:mm:ss',
        smoothScroll: true,
        sidebar: [{
            title: '无聊的消遣',
            sidebarDepth: 3,
            collapsable: false,
            children: [
                '/whatever/行为收集接入手册',
                '/whatever/记一次算法在前端的实际应用',
                '/whatever/对于MV*的理解',
                '/whatever/cube-ui-“精致”的前端UI组件框架',
                '/whatever/华夏视频服务',
                '/whatever/RxJS的响应式原理',
                '/whatever/可视化埋点JS-SDK技术方案'
            ]
        }, {
            title: '计算机科学基础',
            sidebarDepth: 3,
            children: [
                {
                    title: '目录',
                    path: '/FE-Foundation/计算机科学基础/'
                },
                '/FE-Foundation/计算机科学基础/正则',
                {
                    title: '网络',
                    sidebarDepth: 3,
                    collapsable: false,
                    children: [
                        '/FE-Foundation/计算机科学基础/密码学基础',
                        '/FE-Foundation/计算机科学基础/http',
                        '/FE-Foundation/计算机科学基础/https',
                        '/FE-Foundation/计算机科学基础/http2&http3',
                        '/FE-Foundation/计算机科学基础/http&http2&http3队首阻塞问题'
                    ]
                },
                {
                    title: '算法',
                    sidebarDepth: 3,
                    collapsable: false,
                    children: []
                },
                {
                    title: '编译原理',
                    sidebarDepth: 3,
                    collapsable: false,
                    children: []
                },
                {
                    title: '编程范式',
                    sidebarDepth: 3,
                    collapsable: false,
                    children: [
                        '/FE-Foundation/计算机科学基础/面向切面编程'
                    ]
                },
                {
                    title: '模式',
                    sidebarDepth: 3,
                    collapsable: false,
                    children: []
                }
            ]
        }, {
            title: '前端基础',
            sidebarDepth: 3,
            children: [
                {
                    title: '目录',
                    path: '/FE-Foundation/前端基础/',
                },
                {
                    title: 'HTML',
                    sidebarDepth: 3,
                    collapsable: false,
                    children: [
                        '/FE-Foundation/前端基础/跨域',
                        '/FE-Foundation/前端基础/html语义化'
                    ]
                },
                {
                    title: 'CSS',
                    sidebarDepth: 3,
                    collapsable: false,
                    children: []
                },
                {
                    title: 'JavaScript',
                    sidebarDepth: 3,
                    collapsable: false,
                    children: [
                        '/FE-Foundation/前端基础/模块化',
                        '/FE-Foundation/前端基础/类型',
                        '/FE-Foundation/前端基础/深入js对象',
                        '/FE-Foundation/前端基础/js执行过程'
                    ]
                }
            ]
        }, {
            title: '手写代码',
            sidebarDepth: 3,
            children: [
                {
                    title: '目录',
                    path: '/FE-Foundation/手写代码/',
                },
                '/FE-Foundation/手写代码/bind',
                '/FE-Foundation/手写代码/call&apply',
                '/FE-Foundation/手写代码/curry',
                '/FE-Foundation/手写代码/compose',
                '/FE-Foundation/手写代码/deepFreeze'
            ]
        }, {
            title: '浏览器原理及性能优化',
            sidebarDepth: 3,
            children: [
                {
                    title: '目录',
                    path: '/FE-Foundation/浏览器原理及性能优化/',
                },
                '/FE-Foundation/浏览器原理及性能优化/浏览器线程与进程',
                '/FE-Foundation/浏览器原理及性能优化/事件',
                '/FE-Foundation/浏览器原理及性能优化/服务端性能优化',
                '/FE-Foundation/浏览器原理及性能优化/前端性能优化',
            ]
        }, {
            title: 'nodeJs',
            sidebarDepth: 3,
            children: [
                {
                    title: '目录',
                    path: '/FE-Foundation/nodeJs/',
                }
            ]
        }, {
            title: 'ES6',
            sidebarDepth: 3,
            children: [
                {
                    title: '目录',
                    path: '/FE-Foundation/ES6/',
                }
            ]
        }, {
            title: '函数式编程',
            sidebarDepth: 3,
            children: [
                {
                    title: '目录',
                    path: '/FE-Foundation/函数式编程/',
                },
                '/FE-Foundation/函数式编程/函数式编程笔记'
            ]
        }, {
            title: '框架与原理',
            sidebarDepth: 3,
            children: [
                {
                    title: '目录',
                    path: '/FE-Foundation/框架与原理/',
                }
            ]
        }, {
            title: '前端工程实践',
            sidebarDepth: 3,
            children: [
                {
                    title: '目录',
                    path: '/FE-Foundation/前端工程实践/',
                }
            ]
        }]
    }
}