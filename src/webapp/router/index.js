import Vue from 'vue';
import Router from 'vue-router';
// import Home from '@/webapp/components/Home.vue';
// import Component1 from '@/webapp/components/Component1.vue';
// import Article from '@/webapp/components/Article.vue';

Vue.use(Router);

const prod = process.env.NODE_ENV === 'production';

export function createRouter() {
    const router = new Router({
        mode: 'history',
        base: prod ? '/blog/' : '/',
        routes: [
            // {
            //     path: '*',
            //     redirect: '/',
            // },
            {
                path: '/',
                name: 'home',
                component: () => import(/* webpackChunkName: "home" */'@/webapp/components/Home.vue')
            },
            {
                path: '/article',
                name: 'Article',
                component: () => import(/* webpackChunkName: "article" */'@/webapp/components/Article.vue'),
                children: [
                    {
                        path: '/article/:aid',
                        name: 'Article',
                        component: () => import(/* webpackChunkName: "article" */'@/webapp/components/Article.vue')
                    }
                ]
                
            },
        ]
    });

    return router;
}