import { Api } from '../interface/Api';
import { provide, TAGS } from '../ioc';

@provide(TAGS.ApiService)
export class ApiService implements Api {
    private datas = {
        result: {
            code: '0',
            message: 'success'
        },
        data: {}
    }
    getInfo(url: string, arg?: object, callback?: Function) {
        return Promise.resolve(this.datas);
    }
}