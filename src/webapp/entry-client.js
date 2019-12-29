import { createApp } from './main';

const { app, router, store } = createApp();

// 同步store
if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__);
}

router.onReady(() => {
    // 路由已经初始化完全，Vue实例已也经初始化完全
    // 此时页面已生成dom，可以直接挂载
    app.$mount('#app');
});