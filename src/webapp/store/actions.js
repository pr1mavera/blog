import axios from 'axios';
var request = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
    /* other custom settings */
});

export const getTopicsList = ({ commit, state }) => {
    // commit('TOPICS_LIST', [{"title":"Topic 1"},{"title":"Topic 2"},{"title":"Topic 3"}])
    return request.get('/topics')
        .then(response => response.data)
        .then(response => {
        response.code == '0' && commit('TOPICS_LIST', response.data);
    });
};
export const increment = ({ commit }) => commit('INCREMENT');
export const decrement = ({ commit }) => commit('DECREMENT');