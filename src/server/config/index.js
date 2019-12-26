/* eslint-disable no-undef */
import { extend } from "lodash";
import { join } from "path";
let $config = {
    viewDir: join(__dirname, "..", "views"),
    staticDir: join(__dirname, "..", "assets")
};
if (process.env.NODE_ENV == "development") {
    const localConfig = {
        port: 3000,
        cache: false,
        baseUrl: "http://localhost"
    }
    $config = extend($config, localConfig);
}
if (process.env.NODE_ENV == "production") {
    const prodConfig = {
        port: 8088,
        cache: 'memory'
    }
    $config = extend($config, prodConfig);
}
export default $config;