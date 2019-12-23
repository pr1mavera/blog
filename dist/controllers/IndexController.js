"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _awilixKoa = require("awilix-koa");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2;

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

let IndexController = (_dec = (0, _awilixKoa.route)('/home'), _dec2 = (0, _awilixKoa.route)('/'), _dec3 = (0, _awilixKoa.route)('/index.html'), _dec4 = (0, _awilixKoa.route)('/component1'), _dec5 = (0, _awilixKoa.route)('/component2'), _dec6 = (0, _awilixKoa.route)('/topics/*'), _dec7 = (0, _awilixKoa.GET)(), _dec(_class = (_class2 = class IndexController {
  constructor({
    indexService
  }) {
    this.indexService = indexService;
  }

  async actionIndex(ctx) {
    console.log('IndexController');
    await this.indexService.init(ctx);
  }

}, (_applyDecoratedDescriptor(_class2.prototype, "actionIndex", [_dec2, _dec3, _dec4, _dec5, _dec6, _dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "actionIndex"), _class2.prototype)), _class2)) || _class);
var _default = IndexController;
exports.default = _default;