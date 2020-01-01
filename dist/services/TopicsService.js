"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SafeRequest = _interopRequireDefault(require("../utils/SafeRequest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TopicsService {
  constructor(app) {
    this.app = app;
  }

  async getTopics() {
    return [{
      title: 'Topic 1'
    }, {
      title: 'Topic 2'
    }, {
      title: 'Topic 3'
    }];
  }

}

var _default = TopicsService;
exports.default = _default;