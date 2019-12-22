const path = require('path');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const rootPath = path.join(__dirname, '../');

module.exports = {
    entry: [ rootPath + 'src/webapp/entry-client.js' ],
    plugins: [
        new VueSSRClientPlugin()
    ]
};