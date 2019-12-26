'use strict';

var lodash = require('lodash');
var path = require('path');

/* eslint-disable no-undef */
let $config = {
    viewDir: path.join(__dirname, "..", "views"),
    staticDir: path.join(__dirname, "..", "assets")
};
{
    const prodConfig = {
        port: 8088,
        cache: 'memory'
    };
    $config = lodash.extend($config, prodConfig);
}
var $config$1 = $config;

module.exports = $config$1;
