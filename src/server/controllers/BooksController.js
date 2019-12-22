/* eslint-disable no-unused-vars */
/* eslint-disable no-inner-declarations */
/* eslint-disable require-atomic-updates */
import cheerio from 'cheerio';
import { Readable } from "stream";

import { route, GET } from 'awilix-koa';

@route('/books')
class BooksController {

    // 每次请求路由时都会新实例化 services 下面的类，注入到构造函数里，这里用到的是 booksService
    constructor ({ booksService }) {
        this.booksService = booksService
    }

    @route('/list')
    @GET()
    async actionIndex(ctx, next) {
        ctx.status = 200;
        ctx.type = 'html';
        const result = await this.booksService.getList();
        // 站内切页，思路
        // 将需要更新的dom拿到送至前端，在前端添加到指定的容器内
        const html = await ctx.render('books/pages/list', {
            result
        });
        if (ctx.request.header['x-pjax']) {
            console.log('站内切页');
            const $ = cheerio.load(html);
            // let _result = '';
            // 将用于当前页组件渲染的 模板 扒出来
            $('.pjax-content').each(function() {
                // bigpipe 拿到一段吐一段
                ctx.res.write($(this).html());
                // _result += $(this).html();
            });
            // 将用于当前页组件交互的 脚本 扒出来
            $('.lazyload-js').each(function() {
                // bigpipe 拿到一段吐一段
                // ctx.res.write(`<script src="${$(this).attr('src')}"></script>`);
                // _result += `<script src="${$(this).attr('src')}"></script>`;

                // basket.js 做业务逻辑脚本的前端本地缓存
                ctx.res.write(`<script>initResource("${$(this).attr('src')}")</script>`);
            });
            // ctx.body = _result
            ctx.res.end();
        } else {
            console.log('直接刷页');
            // 通过 buffer 的 readable，将 HTML 内容一点点送至前端
            function createSSRStream() {
                return new Promise((resolve, reject) => {
                    const htmlStream = new Readable();
                    htmlStream.push(html);
                    htmlStream.push(null);
                    htmlStream.on('error', err => { reject(err) }).pipe(ctx.res);
                });
            }
            await createSSRStream();
            // ctx.body = html
        }
        // console.log("返回的值", result);
        // ctx.body = result;
    }

    @route('/create')
    @GET()
    async actionCreate(ctx, next) {
        ctx.body = await ctx.render('books/pages/create');
    }
}
export default BooksController;