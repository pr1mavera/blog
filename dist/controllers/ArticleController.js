"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _awilixKoa = require("awilix-koa");

var _dec, _dec2, _dec3, _class, _class2;

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

let ArticleController = (_dec = (0, _awilixKoa.route)('/api/v1/article'), _dec2 = (0, _awilixKoa.route)('/*'), _dec3 = (0, _awilixKoa.GET)(), _dec(_class = (_class2 = class ArticleController {
  constructor({
    articleService
  }) {
    this.articleService = articleService;
  }

  async getArticle(ctx) {
    if (/article\/(\w*)\/?/.test(ctx.url)) {
      const aid = RegExp.$1;
      console.log('🤷‍♀️访问文章：', aid);
      const res = await this.articleService.getArticle(aid);
      ctx.body = {
        result: {
          code: '0',
          message: 'success'
        },
        data: res
      };
    } else {
      ctx.response.redirect('/');
    }
  }

}, (_applyDecoratedDescriptor(_class2.prototype, "getArticle", [_dec2, _dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "getArticle"), _class2.prototype)), _class2)) || _class);
var _default = ArticleController;
exports.default = _default;