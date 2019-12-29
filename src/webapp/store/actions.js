import axios from 'axios';

const isDev = process.env.NODE_ENV === 'development';

const request = axios.create({
    baseURL: isDev ? 'http://127.0.0.1:3000/api/v1' : 'https://video-uat.ihxlife.com/blog/api/v1'
    // baseURL: 'https://video-uat.ihxlife.com/blog/api/v1'
    /* other custom settings */
});

export const getArticleMap = ({ commit, state }) => {
    if (state.articleMap.title) return state.articleMap;

    return request.get('/articleList')
        .then(response => response.data)
        .then(response => {
            response.result.code == '0' && commit('ARTICLE_MAP', response.data);
        });
};

export const getArticle = ({ commit, state }, aid) => {
    if (aid === state.articleContent[0]) return state.articleContent;
    return request.get('/article/' + aid)
        .then(response => response.data)
        .then(response => {
            response.result.code == '0' && commit('ARTICLE_CONTENT', [ aid, response.data ]);
        });
};

export const increment = ({ commit }) => commit('INCREMENT');
export const decrement = ({ commit }) => commit('DECREMENT');

export const openTreeAside = ({ commit }) => commit('TREE_ASIDE_EXPAND', true);
export const closeTreeAside = ({ commit }) => commit('TREE_ASIDE_EXPAND', false);
export const foldTreeAside = ({ commit, state }) => commit('TREE_ASIDE_EXPAND', !state.isTreeAsideExpand)