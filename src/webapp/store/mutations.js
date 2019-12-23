// 定义 mutation
export const mutations = {
    ['TOPICS_LIST']: (state, list) => {
        state.topics = list;
    },
    ['ARTICLE_CONTENT']: (state, content) => {
        state.articleContent = content;
    },
    ['INCREMENT']: state => ++state.count,
    ['DECREMENT']: state => --state.count
}