/* eslint-disable no-undef */
import 'module-alias/register';
import Koa from 'koa';
import config from "@config";
// import render from 'koa-swig';
// import { wrap } from "co";
import serve from 'koa-static';
import errorHandler from "./middlewares/errorHandler";
const { error } = errorHandler;
import { configure, getLogger } from 'log4js';
const { viewDir, staticDir, port, cache } = config;

// IoC
import { createContainer, Lifetime } from 'awilix';
import { loadControllers, scopePerRequest } from 'awilix-koa';

const app = new Koa();

// 实现 IoC 数据模型注入
// 1. 构建容器
const container = createContainer();
// 2. 注册模块
container.loadModules([ __dirname + ['/services/*.js'] ], {
    // 每次注入时的格式
    formatName: 'camelCase',
    // 相关配置
    resolverOptions: {
        lifetime: Lifetime.SCOPED
    }
})
// 3. 把容器和路由最终合并到一起，在每次请求路由的时候，会新实例化 services 下面的类，注入到构造函数里
app.use(scopePerRequest(container))

configure({
    appenders: { cheese: { type: 'file', filename: __dirname + '/logs/yd.log' } },
    categories: { default: { appenders: ['cheese'], level: 'error' } }
});
const logger = getLogger('cheese');
app.context.logger = logger;
// app.context.render = wrap(render({
//     root: viewDir,
//     autoescape: true,
//     cache,
//     ext: 'html',
//     varControls: ["[[", "]]"],
//     writeBody: false
// }));
app.use(serve(staticDir));
// 容错处理中心
error(app);
// 加载所有路由
app.use(loadControllers(__dirname + '/controllers/*.js'));
app.listen(port, '127.0.0.1', () => {
    console.log("服务启动成功🍺");
});
app.on("error", (err) => {
    logger.error(err);
})