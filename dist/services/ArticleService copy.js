"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _marked = _interopRequireDefault(require("marked"));

var _highlight = _interopRequireDefault(require("highlight.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import 'highlight.js/styles/default.css';
_marked.default.setOptions({
  renderer: new _marked.default.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight: function (code, lang) {
    if (lang && _highlight.default.getLanguage(lang)) {
      return _highlight.default.highlight(lang, code, true).value;
    } else {
      return _highlight.default.highlightAuto(code).value;
    }
  }
});

class ArticleService {
  getArticle(aid) {
    const url = _path.default.join(__dirname, '../../', 'docs/FE-Foundation/浏览器原理及性能优化/浏览器线程与进程.md');

    const content = _fs.default.readFileSync(url, 'utf-8');

    const contentHTML = (0, _marked.default)(content);
    return contentHTML;
  }

}

exports.default = ArticleService;