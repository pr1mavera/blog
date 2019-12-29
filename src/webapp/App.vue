<template>
    <div id="app">
        <div class="navbar">
            <a class="home-link" :style="isSidebarShouldShow ? 'padding-left: 60px;' : ''">
                <img class="avatar" src="/blog/img/logo.png" alt="">
                <span class="title">pr1mavera's blog</span>
            </a>
            <div class="links">
                <ul>
                    <router-link to="/" exact><span>首页</span></router-link>
                    <router-link to="/article"><span>文章</span></router-link>
                </ul>
            </div>
            <span
                v-if="isSidebarShouldShow"
                class="sidebar-button"
                @click="foldTreeAside">
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" viewBox="0 0 448 512" class="icon"><path fill="currentColor" d="M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z"></path></svg>
            </span>
        </div>
        <keep-alive>
            <router-view class="view"></router-view>
        </keep-alive>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'app',
    data() {
        return {
            isSidebarShouldShow: this.$route.name === 'article-view'
        }
    },
    computed: {
        // ...mapGetters([ 'isTreeAsideExpand' ])
    },
    methods: {
        ...mapActions([
            'openTreeAside',
            'closeTreeAside',
            'foldTreeAside'
        ]),
        resize(e) {
            const event = e || window.event;
            if (e.currentTarget.innerWidth <= 700) {
                // 折叠
                this.closeTreeAside();
            } else {
                // 展开
                this.openTreeAside();
            }
            
        }
    },
    mounted() {
        window.addEventListener('resize', this.resize);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.resize)
    },
    watch: {
        '$route'(to, from) {
            this.isSidebarShouldShow = to.name === 'article-view'
        }
    }
}
</script>

<style lang="less" scope>
#app, a {
    color: #2c3e50;
}
html, body {
    font-family: Ubuntu,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.navbar {
    box-sizing: border-box;
    width: 100%;
    height: 60px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 20;
    overflow: hidden;
    background-color: #fff;
    box-shadow: 0 1px 6px 0 rgba(0,0,0,.2);
    .home-link {
        float: left;
        height: inherit;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        .avatar {
            --imgRect: 40px;
            width: var(--imgRect);
            height: var(--imgRect);
            background: #999;
            border-radius: 50%;
            margin: 0 10px;
        }
        .title {
            font-size: 24px;
        }
    }
    .links {
        height: 100%;
        display: flex;
        align-items: center;
        float: right;
        ul > a {
            margin-right: 20px;
        }
    }
    .sidebar-button {
        cursor: pointer;
        // display: none;
        width: 1.25rem;
        height: 1.25rem;
        position: absolute;
        padding: .6rem;
        top: .6rem;
        left: 1rem;
    }
}
.view {
    position: relative;
    margin-top: 60px;
    width: 100%;
    height: calc(100% - 60px);
}

@media screen and (max-width: 700px) {
    #app {
        .navbar {
            .home-link {
                padding-left: 0 ~'!important';
                float: none;
                display: flex;
                justify-content: center;
            }
            .link {
                display: none;
            }
        }
    }
}
</style>