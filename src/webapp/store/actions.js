import axios from 'axios';
var request = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
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

export const getArticle = ({ commit }, aid) => {
    return request.get('/article/' + aid)
        .then(response => response.data)
        .then(response => {
            response.result.code == '0' && commit('ARTICLE_CONTENT', response.data);
        });
};

export const increment = ({ commit }) => commit('INCREMENT');
export const decrement = ({ commit }) => commit('DECREMENT');