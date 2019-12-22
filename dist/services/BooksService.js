"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SafeRequest = _interopRequireDefault(require("../utils/SafeRequest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @fileoverview 实现Books的数据模型
 * @author yuanzhijia@yifengfe.com
 */
class BooksService {
  /**
   * Books类 实现获取后台有关于图书相关的数据类
   * @class
   */

  /**
   * @constructor
   * @param {object} app app KOA2执行的上下文
   */
  constructor(app) {
    this.app = app;
  }
  /**
   * 📚获取后台图书的全部列表
   * @param {*} params params 设置访问数据的参数
   * @example
   * return new Promsie
   * getList(params)
   */


  getList(params) {
    const safeRequest = new _SafeRequest.default("books");
    return safeRequest.get(params);
  }

}

var _default = BooksService;
exports.default = _default;