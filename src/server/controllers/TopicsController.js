import { route, GET } from "awilix-koa";

@route('/api/v1/topics')
class TopicsController {
    constructor({ topicsService }) {
        this.topicsService = topicsService;
    }

    @route('/')
    @GET()
    async getTopics(ctx) {
        const res = await this.topicsService.getTopics();
        ctx.body = {
            code: '0',
            message: 'success',
            data: res
        };
    }
}

export default TopicsController;