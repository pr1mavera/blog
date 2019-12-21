import 'reflect-metadata';
import './ioc/inversify.config';
import { InversifyKoaServer, Container, buildProviderModule, Config } from './ioc';
const container = new Container();
container.load(buildProviderModule());

const server = new InversifyKoaServer(container);
const app = server.build();
app.listen(Config.server.port, () => {
    console.log(`===> 🍺  Server start in http://localhost:${Config.server.port}${Config.server.baseUrl}/ 🍺 <===`)
});