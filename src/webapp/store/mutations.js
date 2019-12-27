// 定义 mutation
export const mutations = {
    ['TREE_ASIDE_EXPAND']: (state, bool) => {
        state.isTreeAsideExpand = bool;
    },
    ['ARTICLE_MAP']: (state, data) => {
        state.articleMap = data;
    },
    ['ARTICLE_CONTENT']: (state, contentPack) => {
        state.articleContent = contentPack;
    },
    ['INCREMENT']: state => ++state.count,
    ['DECREMENT']: state => --state.count
}