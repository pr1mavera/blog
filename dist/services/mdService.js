"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MDService {
  getMDData(ctx) {
    const mdmapJson = _fs.default.readFileSync(_path.default.join(__dirname, '../', 'assets/MDMap.json'), 'utf-8');

    try {
      const MDData = JSON.parse(mdmapJson);
      return MDData;
    } catch (err) {
      ctx.logger.error(err);
      return {};
    }
  }

}

exports.default = MDService;