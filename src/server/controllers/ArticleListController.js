import { route, GET } from "awilix-koa";

@route('/api/v1/articleList')
class ArticleListController {
    constructor({ mdService }) {
        this.MDService = mdService;
    }

    @route('/')
    @GET()
    async getArticle(ctx) {

        const { mdTree } = await this.MDService.getMDData();

        // const artList = Object.keys(mdMap).reduce((temp, aid) => {
        //     temp.push({
        //         aid,
        //         title: mdMap[aid].split('/').pop().replace('.md', '') // 获取文件名称
        //     });
        //     return temp;
        // }, []);

        ctx.body = {
            result: {
                code: '0',
                message: 'success',
            },
            data: mdTree
        };

    }
}

export default ArticleListController;