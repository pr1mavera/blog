import { createBundleRenderer } from 'vue-server-renderer';
const LRU = require('lru-cache');
const clientManifest = require('../assets/vue-ssr-client-manifest.json');
const serverBundle = require('../assets/vue-ssr-server-bundle.json');
const template = require('fs').readFileSync(require('path').join(__dirname, '..') + '/assets/index.template.html', 'utf-8');

class IndexService {
    constructor(app) {
        this.app = app;
        this.mateDict = {
            
        }
    }
    async init(ctx) {
        // 生成预备环境
        const SSRRenderer = createBundleRenderer(serverBundle, {
            runInNewContext: false,
            template,
            clientManifest,
            cache: new LRU({
                max: 1000,
                maxAge: 1000 * 60 * 15
            })
        });

        return new Promise((resolve, rejects) => {
            const SSRStream = SSRRenderer.renderToStream({ url: ctx.url });
            ctx.status = 200;
            ctx.type = 'html';
            
            console.log('IndexController over', 'ctx.url: ', ctx.url);
            SSRStream.on('error', err => { rejects(err) }).pipe(ctx.res);
        })
    }
}

export default IndexService;