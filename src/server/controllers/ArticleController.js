import { route, GET } from "awilix-koa";

@route('/api/v1/article')
class ArticleController {
    constructor({ articleService }) {
        this.articleService = articleService;
    }

    @route('/*')
    @GET()
    async getArticle(ctx) {
        if (/article\/(\w*)\/?/.test(ctx.url)) {
            const aid = RegExp.$1;
            console.log('🤷‍♀️访问文章：', aid);
            const res = await this.articleService.getArticle(aid);
            ctx.body = {
                result: {
                    code: '0',
                    message: 'success',
                },
                data: res
            };
        } else {
            ctx.response.redirect('/');
        }
    }
}

export default ArticleController;