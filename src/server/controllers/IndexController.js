import { route, GET } from 'awilix-koa';

@route('/home')
class IndexController {

    constructor({ indexService }) {
        this.indexService = indexService;
    }

    @route('/')
    @route('/index.html')
    @route('/component1')
    @route('/component2')
    @route('/topics')
    @GET()
    async actionIndex(ctx) {
        console.log('IndexController');
        await this.indexService.init(ctx);
    }
}
export default IndexController;