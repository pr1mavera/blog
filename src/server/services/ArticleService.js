import fs from 'fs';
import path from 'path';
import marked from 'marked';
import hljs from 'highlight.js';
// import 'highlight.js/styles/default.css';

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code, lang) {
        if (lang && hljs.getLanguage(lang)) {    
            return hljs.highlight(lang, code, true).value;
        } else {
            return hljs.highlightAuto(code).value;
        }
    }
});

export default class ArticleService {
    constructor({ mdService }) {
        this.MDService = mdService;
    }
    async getArticle(aid) {
        const { mdMap } = await this.MDService.getMDData();
        const url = mdMap[aid];
        const content = fs.readFileSync(url, 'utf-8');
        const contentHTML = marked(content);
        return contentHTML;
    }
}