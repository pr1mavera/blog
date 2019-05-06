module.exports = {
	title: `pr1mavera`, 
    description: `pr1mavera's blog`,
    // host: '192.168.8.104',
    host: 'localhost',
    port: '8080',
	head: [
		['link', { rel: 'icon', href: `/favicon.ico` }]
	],
	repo: 'https://github.com/pr1mavera/blog',
	dest: './docs/.vuepress/dist',
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
		nav: [
            {
                text: 'Blog',
                items: [
                    { text: 'Android', link: '/android/' },
                    { text: 'ios', link: '/ios/' },
                    { text: 'Web', link: '/web/' }
                ]
            },
			{
                text: 'About',
                link: '/about/'
            },
        ],
        sidebar: {
            '/android/': [
                ''
            ],
            '/web/urlToPage/': [
                ''
            ],
            '/web/ha-js-sdk/': [
                ''
            ]
        },
	}
}