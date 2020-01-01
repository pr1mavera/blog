"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _awilixKoa = require("awilix-koa");

var _dec, _dec2, _dec3, _class, _class2;

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

let ArticleListController = (_dec = (0, _awilixKoa.route)('/api/v1/articleList'), _dec2 = (0, _awilixKoa.route)('/'), _dec3 = (0, _awilixKoa.GET)(), _dec(_class = (_class2 = class ArticleListController {
  constructor({
    mdService
  }) {
    this.MDService = mdService;
  }

  async getArticle(ctx) {
    const {
      mdTree
    } = await this.MDService.getMDData(); // const artList = Object.keys(mdMap).reduce((temp, aid) => {
    //     temp.push({
    //         aid,
    //         title: mdMap[aid].split('/').pop().replace('.md', '') // 获取文件名称
    //     });
    //     return temp;
    // }, []);

    ctx.body = {
      result: {
        code: '0',
        message: 'success'
      },
      data: mdTree
    };
  }

}, (_applyDecoratedDescriptor(_class2.prototype, "getArticle", [_dec2, _dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "getArticle"), _class2.prototype)), _class2)) || _class);
var _default = ArticleListController;
exports.default = _default;