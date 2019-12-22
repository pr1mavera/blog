// 定义 mutation
export const mutations = {
    ['TOPICS_LIST']: (state, list) => {
        state.topics = list;
    },
    ['INCREMENT']: state => ++state.count,
    ['DECREMENT']: state => --state.count
}