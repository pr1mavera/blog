import { interfaces, controller, httpGet, httpPost, TYPE, inject, TAGS, Router, provideThrowable, Config } from '../ioc';
import { Api } from '../interface/Api';

@controller(Config.server.baseUrl)
@provideThrowable(TYPE.Controller, 'ApiController')
export default class ApiController implements interfaces.Controller {
    private apiService: Api;

    constructor(@inject(TAGS.ApiService) apiService) {
        this.apiService = apiService;
    }

    @httpGet('/')
    private async test(ctx: Router.IRouterContext) {
        ctx.body = {
            result: '__test__'
        }
    }
}