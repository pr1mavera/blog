<template>
  <ul class="md-tree">
    <router-link
      v-if="tree.aid"
      :class="{ 'title-link': true, 'is-cur-article': isCurArticle }"
      :to="`/article/${tree.aid}`"
      :style="tabByDeep"
      exact
    >{{tree.title}}</router-link>
    <a class="title" :style="tabByDeep" v-else>{{tree.title}}</a>
    <div class="child" v-if="tree.children && tree.children.length">
      <md-tree
        v-show="isExpand"
        v-for="(children, i) in tree.children"
        :key="i"
        :deep="deep + 1"
        :curItem="curItem"
        :tree="tree.children[i]"
      ></md-tree>
    </div>
    <div class="high-light-block" v-if="isCurArticle"></div>
  </ul>
</template>

<script>
export default {
  name: "md-tree",
  props: {
    deep: {
      type: Number,
      default: 1
    },
    curItem: {
      type: String,
      default: ""
    },
    tree: {
      type: Object,
      default: {}
    }
  },
  computed: {
    isCurArticle() {
      return this.tree.aid === this.$route.params.aid;
    },
    isExpand() {
      // this.tree.aid 不存在说明为文件骨架，展开
      // 为当前文章，展开
      return !this.tree.aid || this.isCurArticle;
    },
    tabByDeep() {
      return { paddingLeft: 15 * this.deep + 'px' };
    }
  }
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
      width: 5px;
      height: calc(2 * 16px);
      background-color: var(--themeColor);
    }
}
</style>