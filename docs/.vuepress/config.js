module.exports = {
    title: `pr1mavera`,
    description: `pr1mavera's blog`,
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
        background: `/img/`,
        github: 'pr1mavera',
        logo: '/img/logo.png',
        accentColor: '#ac3e40',
        lastUpdated: 'Last Updated',
        displayAllHeaders: true,
        sidebarDepth: 3,
        per_page: 6,
        date_format: 'yyyy-MM-dd HH:mm:ss',
        // sidebar: [
        //     '/blog/urlToPage',
        //     '/blog/ha-js-sdk',
        //     '/blog/RxJS'
        // ],
        sidebar: {
            '/whatever/urlToPage': ['urlToPage'],
            '/whatever/ha-js-sdk': ['ha-js-sdk'],
            '/whatever/RxJS': ['RxJS'],
            '/1.yd-pre/1.you-dont-know-html': ['1.you-dont-know-html'],
            '/1.yd-pre/2.high-css': ['2.high-css'],
            '/1.yd-pre/3.ES6-base': ['3.ES6-base'],
            '/1.yd-pre/4.jQuery-core': ['4.jQuery-core'],
            '/1.yd-pre/5.back-end': ['5.back-end']
        },
        nav: [
            { text: '随便写写', link: '/tag/?tag=随便写写', icon: 'reco-blog' },
            { text: '阿灯', link: '/tag/?tag=阿灯', icon: 'reco-edu' }
        ]
        // nav: [
        //     { text: 'Tags', link: '/tags/', icon: 'reco-tag' },
        //     { text: 'Blog', link: '/blog/', icon: 'reco-blog' }
        //     // {
        //     //     text: 'Blog',
        //     //     items: [
        //     //         { text: 'Tags', link: '/tags/', icon: 'reco-tag' },
        //     //         { text: 'Blog', link: '/blog/', icon: 'reco-blog' }
        //     //         // { text: 'Android', link: '/android/' },
        //     //         // { text: 'ios', link: '/ios/' },
        //     //         // { text: 'Web', link: '/web/' }
        //     //     ]
        //     // },
        // 	// {
        //     //     text: 'About',
        //     //     link: '/about/'
        //     // },
        // ],
        // nav: [
        //     {
        //         text: 'categories',
        //         icon: 'reco-blog',
        //         items: [
        //             { text: 'frontEnd', link: '/categories/frontEnd' },
        //             { text: 'backEnd', link: '/categories/backEnd' }
        //         ]
        //     },
        //     { text: 'TimeLine', link: '/timeLine/', icon: 'reco-date' }
        // ],
        // 博客设置
        // blogConfig: {
        //     category: {
        //         location: 2,     // 在导航栏菜单中所占的位置，默认2
        //         text: 'Category' // 默认文案 “分类”
        //     },
        //     // tag: {
        //     //     location: 3,     // 在导航栏菜单中所占的位置，默认3
        //     //     text: 'Tag'      // 默认文案 “标签”
        //     // }
        // }
    }
}