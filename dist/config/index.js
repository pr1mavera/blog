"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = require("lodash");

var _path = require("path");

/* eslint-disable no-undef */
let $config = {
  viewDir: (0, _path.join)(__dirname, "..", "views"),
  staticDir: (0, _path.join)(__dirname, "..", "assets")
};

if (process.env.NODE_ENV == "development") {
  const localConfig = {
    port: 3000,
    cache: false,
    baseUrl: "http://localhost"
  };
  $config = (0, _lodash.extend)($config, localConfig);
}

if (process.env.NODE_ENV == "production") {
  const prodConfig = {
    port: 80,
    cache: 'memory'
  };
  $config = (0, _lodash.extend)($config, prodConfig);
}

var _default = $config;
exports.default = _default;