import axios from 'axios';
var request = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
    /* other custom settings */
});

export const getTopicsList = ({ commit, state }) => {
    return request.get('/topics')
        .then(response => response.data)
        .then(response => {
            response.code == '0' && commit('TOPICS_LIST', response.data);
        });
};
export const getArticle = ({ commit, state }, aid) => {
    return request.get('/article/' + aid)
        .then(response => response.data)
        .then(response => {
            response.result.code == '0' && commit('ARTICLE_CONTENT', response.data);
        });
};
export const increment = ({ commit }) => commit('INCREMENT');
export const decrement = ({ commit }) => commit('DECREMENT');