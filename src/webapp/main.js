import Vue from 'vue';
import App from './App';
import { createRouter } from './router';
import { createStore } from './store';
import { sync } from 'vuex-router-sync'

export function createApp() {
    // 每次都动态构建
    const router = createRouter();
    const store = createStore();
    // 同步路由状态(route state)到 store
    sync(store, router)
    const app = new Vue({
        // 此处需兼容 server层，client层 双端的渲染
        // server层并不需要挂载实例
        // 因此此处的 el 挂载需要在 client层 入口处完成
        // el: '#app',
        router,
        store,
        render: h => h(App)
    })

    return { app, router, store }
}