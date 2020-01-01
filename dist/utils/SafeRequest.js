"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _config = _interopRequireDefault(require("@config"));

var _axios = require("axios");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  baseUrl
} = _config.default;

class SafeRequest {
  constructor(url) {
    this.url = url;
    this.baseUrl = baseUrl;
  }

  get(params = {}) {
    let result = {
      code: 0,
      message: "",
      data: []
    };
    return new Promise((resolve, reject) => {
      (0, _axios.get)(this.baseUrl + this.url, {
        params
      }).then(function (response) {
        if (response.status == 200) {
          const data = response.data;
          result.data = data;
          resolve(result);
        } else {
          result.code = 1;
          result.message = "后台请求出错";
          reject(result);
        }
      }).catch(function (error) {
        result.code = 1;
        result.message = error;
        reject(result);
      });
    });
  }

}

var _default = SafeRequest;
exports.default = _default;