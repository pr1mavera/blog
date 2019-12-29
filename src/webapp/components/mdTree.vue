<template>
  <ul class="md-tree">
    <router-link
      v-if="tree.aid"
      :class="{ 'title-link': true, 'is-cur-article': isCurArticle }"
      :to="`/article?aid=${tree.aid}`"
      :style="tabByDeep"
      @click.native="clickArticleHandler"
      exact
    >{{tree.title}}</router-link>
    <a class="title" :style="tabByDeep" v-else>{{tree.title}}</a>
    <div class="child" v-if="tree.children && tree.children.length">
      <md-tree
        v-show="isExpand"
        v-for="(children, i) in tree.children"
        :key="i"
        :aid="aid"
        :deep="deep + 1"
        :isContent="childIsContent"
        :tree="tree.children[i]"
      ></md-tree>
    </div>
    <div class="high-light-block" v-if="isCurArticle"></div>
  </ul>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: "md-tree",
  props: {
    aid: {
      type: String,
      default: ''
    },
    deep: {
      type: Number,
      default: 1
    },
    isContent: {
      type: Boolean,
      default: false
    },
    tree: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      // isCurArticle: false
    };
  },
  computed: {
    childIsContent() {
      return this.isContent || this.tree.aid != void 0;
    },
    isCurArticle() {
      return this.tree.aid === this.aid;
    },
    isExpand() {
      // this.tree.aid 不存在说明为文件骨架，展开
      // 为当前文章，展开
      return !this.tree.aid || this.isCurArticle;
    },
    tabByDeep() {
      return {
        paddingLeft: 15 * this.deep + 'px',
        fontSize: this.isContent ? '80%' : '100%'
      };
    }
  },
  methods: {
    clickArticleHandler() {
      if (window.innerWidth <= 700) {
        this.closeTreeAside();
      }
    },
    ...mapActions([
      'closeTreeAside'
    ]),
  }
  // mounted() {
  //   this.isCurArticle = this.tree.aid === this.$route.query.aid;
  // },
  // watch: {
  //   $route(to) {
  //     this.isCurArticle = this.tree.aid === to.query.aid;
  //   }
  // }
};
</script>

<style lang="less" scope>
.md-tree {
    position: relative;
    line-height: 2;
    --themeColor: #2d94e6;
    padding-left: 0;
    .title-link, .title {
      // box-sizing: border-box;
      margin: 0;
    }
    .title-link {
      &.is-cur-article {
        color: var(--themeColor);
        // border-left: 5px solid var(--themeColor);
      }
      &:hover {
        color: var(--themeColor);
      }
    }
    .high-light-block {
      position: absolute;
      left: 0;
      top: 0;
      width: 4px;
      height: calc(2 * 16px);
      background-color: var(--themeColor);
    }
}
</style>