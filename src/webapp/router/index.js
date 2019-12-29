import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/webapp/components/Home.vue';
// import Component1 from '@/webapp/components/Component1.vue';
import Article from '@/webapp/components/Article.vue';

// const Vue = require('vue');
// const VueRouter = require('vue-router');

Vue.use(VueRouter);

const prod = process.env.NODE_ENV === 'production';

export function createRouter() {
    const router = new VueRouter({
        mode: 'history',
        base: prod ? '/blog/home/' : '/home/',
        // base: '/',
        routes: [
            // {
            //     path: '*',
            //     redirect: '/',
            // },
            {
                path: '/',
                name: 'home',
                // component: Home
                component: () => import(/* webpackChunkName: "home" */'@/webapp/components/Home.vue')
            },
            {
                path: '/article',
                name: 'article-view',
                // component: Article
                component: () => import(/* webpackChunkName: "article" */'@/webapp/components/Article.vue'),
                // children: [
                //     {
                //         path: '/article/:aid',
                //         name: 'article-view',
                //         component: () => import(/* webpackChunkName: "article" */'@/webapp/components/Article.vue')
                //     }
                // ]
            },
            // {
            //     path: '/article/:aid',
            //     name: 'article-with-aid',
            //     props: true,
            //     component: Article
            //     // component: () => import(/* webpackChunkName: "article" */'@/webapp/components/Article.vue')
            // }
        ]
    });

    return router;
}