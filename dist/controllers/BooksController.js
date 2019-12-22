"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _cheerio = _interopRequireDefault(require("cheerio"));

var _stream = require("stream");

var _awilixKoa = require("awilix-koa");

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

let BooksController = (_dec = (0, _awilixKoa.route)('/books'), _dec2 = (0, _awilixKoa.route)('/list'), _dec3 = (0, _awilixKoa.GET)(), _dec4 = (0, _awilixKoa.route)('/create'), _dec5 = (0, _awilixKoa.GET)(), _dec(_class = (_class2 = class BooksController {
  // 每次请求路由时都会新实例化 services 下面的类，注入到构造函数里，这里用到的是 booksService
  constructor({
    booksService
  }) {
    this.booksService = booksService;
  }

  async actionIndex(ctx, next) {
    ctx.status = 200;
    ctx.type = 'html';
    const result = await this.booksService.getList(); // 站内切页，思路
    // 将需要更新的dom拿到送至前端，在前端添加到指定的容器内

    const html = await ctx.render('books/pages/list', {
      result
    });

    if (ctx.request.header['x-pjax']) {
      console.log('站内切页');

      const $ = _cheerio.default.load(html); // let _result = '';
      // 将用于当前页组件渲染的 模板 扒出来


      $('.pjax-content').each(function () {
        // bigpipe 拿到一段吐一段
        ctx.res.write($(this).html()); // _result += $(this).html();
      }); // 将用于当前页组件交互的 脚本 扒出来

      $('.lazyload-js').each(function () {
        // bigpipe 拿到一段吐一段
        // ctx.res.write(`<script src="${$(this).attr('src')}"></script>`);
        // _result += `<script src="${$(this).attr('src')}"></script>`;
        // basket.js 做业务逻辑脚本的前端本地缓存
        ctx.res.write(`<script>initResource("${$(this).attr('src')}")</script>`);
      }); // ctx.body = _result

      ctx.res.end();
    } else {
      console.log('直接刷页'); // 通过 buffer 的 readable，将 HTML 内容一点点送至前端

      function createSSRStream() {
        return new Promise((resolve, reject) => {
          const htmlStream = new _stream.Readable();
          htmlStream.push(html);
          htmlStream.push(null);
          htmlStream.on('error', err => {
            reject(err);
          }).pipe(ctx.res);
        });
      }

      await createSSRStream(); // ctx.body = html
    } // console.log("返回的值", result);
    // ctx.body = result;

  }

  async actionCreate(ctx, next) {
    ctx.body = await ctx.render('books/pages/create');
  }

}, (_applyDecoratedDescriptor(_class2.prototype, "actionIndex", [_dec2, _dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "actionIndex"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "actionCreate", [_dec4, _dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "actionCreate"), _class2.prototype)), _class2)) || _class);
var _default = BooksController;
exports.default = _default;