"use strict";

require("module-alias/register");

var _koa = _interopRequireDefault(require("koa"));

var _config = _interopRequireDefault(require("@config"));

var _koaStatic = _interopRequireDefault(require("koa-static"));

var _errorHandler = _interopRequireDefault(require("./middlewares/errorHandler"));

var _log4js = require("log4js");

var _awilix = require("awilix");

var _awilixKoa = require("awilix-koa");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-undef */
// import render from 'koa-swig';
// import { wrap } from "co";
const {
  error
} = _errorHandler.default;
const {
  viewDir,
  staticDir,
  port,
  cache
} = _config.default; // IoC

const app = new _koa.default(); // 实现 IoC 数据模型注入
// 1. 构建容器

const container = (0, _awilix.createContainer)(); // 2. 注册模块

container.loadModules([__dirname + ['/services/*.js']], {
  // 每次注入时的格式
  formatName: 'camelCase',
  // 相关配置
  resolverOptions: {
    lifetime: _awilix.Lifetime.SCOPED
  }
}); // 3. 把容器和路由最终合并到一起，在每次请求路由的时候，会新实例化 services 下面的类，注入到构造函数里

app.use((0, _awilixKoa.scopePerRequest)(container));
(0, _log4js.configure)({
  appenders: {
    cheese: {
      type: 'file',
      filename: __dirname + '/logs/yd.log'
    }
  },
  categories: {
    default: {
      appenders: ['cheese'],
      level: 'error'
    }
  }
});
const logger = (0, _log4js.getLogger)('cheese');
app.context.logger = logger; // app.context.render = wrap(render({
//     root: viewDir,
//     autoescape: true,
//     cache,
//     ext: 'html',
//     varControls: ["[[", "]]"],
//     writeBody: false
// }));

app.use((0, _koaStatic.default)(staticDir)); // 容错处理中心

error(app); // 加载所有路由

app.use((0, _awilixKoa.loadControllers)(__dirname + '/controllers/*.js'));
app.listen(port, '127.0.0.1', () => {
  console.log("服务启动成功🍺");
});
app.on("error", err => {
  logger.error(err);
});