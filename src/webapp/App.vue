<template>
    <div id="app">
        <header class="navbar">
            <a class="home-link">
                <img class="avatar" src="" alt="">
                <span class="title">pr1mavera's blog</span>
            </a>
            <div class="links">
                <ul>
                    <router-link to="/" exact><span>首页</span></router-link>
                    <router-link to="/article/"><span>文章</span></router-link>
                </ul>
            </div>
        </header>
        <router-view class="view"></router-view>
    </div>
</template>

<script>
export default {
    name: 'app'
}
</script>

<style lang="less">
#app, a {
    color: #2c3e50;
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
}
.view {
    position: relative;
    margin-top: 60px;
    width: 100vw;
    height: calc(100% - 60px);
}
</style>