// 定义 mutation
export const mutations = {
    ['ARTICLE_MAP']: (state, data) => {
        state.articleMap = data;
    },
    ['ARTICLE_CONTENT']: (state, content) => {
        state.articleContent = content;
    },
    ['INCREMENT']: state => ++state.count,
    ['DECREMENT']: state => --state.count
}