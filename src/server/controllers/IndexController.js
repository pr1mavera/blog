import { route, GET } from 'awilix-koa';

@route('/')
class IndexController {

    constructor({ indexService }) {
        this.indexService = indexService;
    }

    @route('/')
    @route('/index.html')
    @route('/article/*')
    @GET()
    async actionIndex(ctx) {
        console.log('IndexController');
        await this.indexService.init(ctx);
    }
}
export default IndexController;