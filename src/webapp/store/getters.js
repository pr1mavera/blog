const _firstArticle = articleMap => {
    if (articleMap.aid) return articleMap;
    if (articleMap.children && articleMap.children.length) {
        return articleMap.children.find(child => _firstArticle(child)) || {};
    }
    return {};
};

export const getCount = state => state.count;

export const articleMap = state => state.articleMap;

export const firstArticle = ({ articleMap }) => _firstArticle(articleMap);

export const articleContent = state => state.articleContent;

export const isTreeAsideExpand = state => state.isTreeAsideExpand;