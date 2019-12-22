import { createApp } from './main';

// server层 初始化流程
// 1. 拿到客户当前访问的真实路由地址（node层路由）映射成router中对应路由所引用的组件
// 2. 将引用的组件上所有待请求服务的数据占位（asyncData）执行，并填充进store
// 3. 页面全部组装完毕之后，将 store.state 挂载到 ctx.state 上
export default ctx => new Promise((resolve, reject) => {
    const { app, router, store } = createApp();
    // 进入客户访问的真实路由
    router.push(ctx.url);
    router.onReady(() => {
        // 匹配路由对应的组件
        const matchComponents = router.getMatchedComponents();
        // 抓取 asyncData 执行
        const asyncDatas = matchComponents.filter(component => component.asyncData)
                                          .map(component => component.asyncData({ store, route: router.currentRoute }));
        Promise.all(asyncDatas)
               // 挂载
               .then(() => ctx.state = store.state)
               .then(() => resolve(app))
               .catch(reject);
    }, reject);
});