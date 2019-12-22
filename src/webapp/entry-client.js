import { createApp } from './main';

const { app, router } = createApp();
router.onReady(() => {
    // 路由已经初始化完全，Vue实例已也经初始化完全
    // 此时页面已生成dom，可以直接挂载
    app.$mount('#app');
});