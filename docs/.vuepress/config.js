module.exports = {
    title: `pr1mavera`,
    description: `搞搞前端`,
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
        sidebar: {
            '/whatever/urlToPage': ['urlToPage'],
            '/whatever/ha-js-sdk': ['ha-js-sdk'],
            '/whatever/RxJS': ['RxJS'],
            '/whatever/video-server': ['video-server'],
            '/whatever/cude-ui': ['cude-ui'],
            '/whatever/MV*': ['MV*'],
            '/whatever/函数式编程学习笔记': ['函数式编程学习笔记'],
            '/whatever/记一次算法在前端某业务场景的实际应用': ['记一次算法在前端某业务场景的实际应用'],
            '/FE-notes/继承与原型': ['继承与原型'],
            '/FE-notes/正则': ['正则'],
            '/FE-notes/面向切面编程': ['面向切面编程'],
        }
    }
}