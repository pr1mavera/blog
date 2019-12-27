<template>
  <div class="article">
    <aside class="tree-aside" :style="treeAsideExpandStyle">
      <md-tree :tree="articleMap"></md-tree>
    </aside>
    <!-- <vue-markdown :source="articleContent"></vue-markdown> -->
    <div class="main-wrapper">
      <div class="container" v-html="content"></div>
      <!-- <div class="container">{{content}}</div> -->
    </div>
    <!-- <vue-markdown source="# 整体概念\n\n#### 对比工厂和工人\n+ 类似于一个工厂，有自己独立的资源（系统为进程分配的独立内存）\n+ 工厂之间相互独立（进程之间相互独立）\n+ 工厂中有一个或多个工人（进程管理一个或多个线程程）\n+ 多个工人协作完成任务（进程中的线程互相协作）\n+ 工人之间共享工厂资源（同一进程下的各个线程之间共享程序的内存空间：包括代码段、数据集、堆等）\n\n\n"></vue-markdown> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import MdTree from './mdTree';

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
  // server层 Vue对应的生命周期只有 beforeMounted 、 mounted
  beforeCreate() {
    requestArticleData({ store: this.$store, route: this.$route }).then(() => {
      if (this.$route && !this.$route.query.aid) {
        // 当前无 aid 的情况在客户端渲染，需要重定向路由
        this.$router.replace({
          path: '/article/',
          query: { aid: this.firstArticle.aid }
        });
      }
    });
  },
  watch: {
    $route(to, from) {
      if (to.params.aid !== from.params.aid) this.$store.dispatch('getArticle', to.params.aid);
    }
  },
  components: {
    MdTree
  }
};
</script>

<style lang="less" scope>
.article {
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
  .article {
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