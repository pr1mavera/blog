<template>
    <div class="topics">
        <div v-for="(topic, i) in topics" :key="i">
            <p>{{topic.title}}</p>
        </div>
        <!-- <vue-markdown :source="articleContent"></vue-markdown> -->
        <div v-html="articleContent"></div>
        <!-- <vue-markdown source="# 整体概念\n\n#### 对比工厂和工人\n+ 类似于一个工厂，有自己独立的资源（系统为进程分配的独立内存）\n+ 工厂之间相互独立（进程之间相互独立）\n+ 工厂中有一个或多个工人（进程管理一个或多个线程程）\n+ 多个工人协作完成任务（进程中的线程互相协作）\n+ 工人之间共享工厂资源（同一进程下的各个线程之间共享程序的内存空间：包括代码段、数据集、堆等）\n\n\n"></vue-markdown> -->
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

const requestTopicsData = ({ store, route }) => {
    const aid = route.params.aid;
    return store.dispatch('getArticle', aid);
}

export default {
    // 此处需要留一个占位，在 server层 入口（entry-server）初始化渲染时，找到此处的占位，去请求相应接口
    asyncData: requestTopicsData,
    computed: {
        ...mapGetters({ topics: 'getTopics', articleContent: 'articleContent' }),
    },
    // server层 Vue对应的生命周期只有 beforeMounted 、 mounted
    mounted() {
        requestTopicsData({ store: this.$store, route: this.$route });
        setTimeout(() => {
            console.log(this.articleContent);
        }, 1000);
    }
}
</script>