<template>
  <div class="article-view">
    <aside class="tree-aside" :style="treeAsideExpandStyle">
      <md-tree :aid="articleContent[0]" :tree="articleMap"></md-tree>
    </aside>
    <div class="main-wrapper">
      <no-ssr>
        <div class="container" v-html="articleContent[1]"></div>
      </no-ssr>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import MdTree from './mdTree';
import NoSSR from 'vue-no-ssr'

const requestArticleData = ({ store, route }) => {
  // 抽取文章列表
  return store.dispatch('getArticleMap').then(() => {
    const aid = route.query.aid || store.getters.firstArticle.aid;
    // 拉取文章数据
    return store.dispatch('getArticle', aid);
  });

};

export default {
  name: 'article-view',
  // 此处需要留一个占位，在 server层 入口（entry-server）初始化渲染时，找到此处的占位，去请求相应接口
  asyncData: requestArticleData,
  computed: {
    ...mapGetters([ 'articleContent', 'firstArticle', 'articleMap', 'isTreeAsideExpand' ]),
    content() {
      return this.articleContent[1] || '文章自己跑路辣~'
    },
    treeAsideExpandStyle() {
      return this.isTreeAsideExpand ? {
        // 打开状态
        transform: 'translateX(0)'
      } : {};
    }
  },
  // data() {
  //   return {
  //     aid: 
  //   }
  // },
  // server层 Vue对应的生命周期只有 beforeMounted 、 mounted
  created() {
    requestArticleData({ store: this.$store, route: this.$route }).then(() => {
      if (this.$route && !this.$route.query.aid) {
        // 当前无 aid 的情况在客户端渲染，需要重定向路由
        this.$router.replace('/article?aid=' + this.firstArticle.aid);
      }
    });
  },
  watch: {
    '$route'(to, from) {
      if (to.query.aid !== from.query.aid) this.$store.dispatch('getArticle', to.query.aid);
    }
  },
  components: {
    MdTree,
    'no-ssr': NoSSR
  }
};
</script>

<style lang="less" scope>
.article-view {
  position: relative;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  --aside: 320px;
  .tree-aside {
    position: fixed;
    left: 0;
    top: 60px;
    bottom: 0;
    float: left;
    box-sizing: border-box;
    // padding: 0 20px;
    border-right: 1px solid #eaecef;
    width: var(--aside);
    overflow-y: auto;
    background-color: #eee;
    z-index: 10;
  }
  .main-wrapper {
    box-sizing: border-box;
    padding-left: var(--aside);
    width: 100%;
    height: auto;
    overflow: hidden scroll;
    .container {
      box-sizing: border-box;
      padding: 20px;
      max-width: 840px;
      width: 100%;
      margin: 0 auto;
      line-height: 1.75;
    }
  }
}

@media screen and (max-width: 700px) {
  .article-view {
    .tree-aside {
      // display: none;
      transform: translateX(-100%)
    }
    .main-wrapper {
      padding-left: 0;
    }
  }
}
</style>