import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/webapp/components/Home.vue';
import Component1 from '@/webapp/components/Component1.vue';
import Topics from '@/webapp/components/Topics.vue';

Vue.use(Router);

export function createRouter() {
    const router = new Router({
        mode: 'history',
        base: '/home/',
        routes: [
            {
                path: '*',
                redirect: '/',
            },
            {
                path: '/',
                name: 'home',
                component: Home
            },
            {
                path: '/component1',
                name: 'component1',
                component: Component1
            },
            {
                path: '/component2',
                name: 'component2',
                component: () => import('@/webapp/components/Component2.vue')
            },
            {
                path: '/topics',
                name: 'topics',
                component: Topics
            },
        ]
    });

    return router;
}