<template>
    <div class="topics">
        <div v-for="(topic, i) in topics" :key="i">
            <p>{{topic.title}}</p>
        </div>
        <vue-markdown :toc="true">{{markdownContent}}</vue-markdown>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import VueMarkdown from 'vue-markdown'

const requestTopicsData = ({ store }) => {
    return store.dispatch('getTopicsList');
}

export default {
    // 此处需要留一个占位，在 server层 入口（entry-server）初始化渲染时，找到此处的占位，去请求相应接口
    asyncData: requestTopicsData,
    components: {
        VueMarkdown
    },
    computed: {
        ...mapGetters({ topics: 'getTopics', markdownContent: 'markdownContent' })
    },
    // server层 Vue对应的生命周期只有 beforeMounted 、 mounted
    mounted() {
        requestTopicsData({ store: this.$store });
    }
}
</script>