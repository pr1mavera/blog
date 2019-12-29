import Vue from 'vue';
import Vuex from 'vuex';
import { mutations } from './mutations';
import * as getters from './getters';
import * as actions from './actions';

// const Vue = require('vue');
// const Vuex = require('vuex');

// 判断当前环境是否是浏览器
const isBrowser = typeof window != 'undefined';
const isClientProdEnv = isBrowser && process.env.NODE_ENV == 'production';

if (!isClientProdEnv) {
    // 若当前为在 client层 的生产环境
    // 需要将 Vue / Vuex 等类库使用CDN引入，需要另外处理
    // 此处先这样引入
    Vue.use(Vuex);
}

// 初始化state
const defaultState = {
    count: 0,
    articleMap: {},
    articleContent: [],
    isTreeAsideExpand: true
}

let state;
// node层 渲染时，需要知道前端哪些请求是异步加载的，后端统一处理完成之后合并，再一次性返回给前端
if (isBrowser && window.__INITIAL_STATE__) {
    state = window.__INITIAL_STATE__;
    // 修正侧边栏展开初始化状态
    state.isTreeAsideExpand = window.innerWidth > 700;
} else {
    state = defaultState;
}

export function createStore() {
    const store = new Vuex.Store({
        state,
        getters,
        mutations,
        actions
    });

    return store;
}
