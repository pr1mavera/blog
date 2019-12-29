<template>
    <div class="home">
        <div class="banner">
            <div class="icon">
                <img src="/img/banner-2.jpg" alt="banner">
            </div>
            <h1 class="title">一切不成体系的知识碎片都只能当做无聊的消遣</h1>
            <router-link class="link" to="/article">消遣一哈</router-link>
        </div>
        <footer class="footer">
            <p class="copyright">2018 - 2020 | pr1mavera</p>
        </footer>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'home',
    computed: {
        ...mapGetters({ count: 'getCount' })
    },
    // methods: {
    //     ...mapActions([
    //         'increment',
    //         'decrement'
    //     ])
    // }
}
</script>

<style lang="less" scope>
.home {
    position: relative;
    text-align: center;
    .banner {
        position: relative;
        left: 0;
        right: 0;
        box-sizing: border-box;
        padding-top: 160px;
        min-height: calc(100vh - 120px);
        // padding-bottom: 60px;
        .icon {
            --rect: 65vw;
            --maxRect: 250px;
            max-width: var(--maxRect);
            max-height: var(--maxRect);
            width: var(--rect);
            height: var(--rect);
            background-color: #ccc;
            border-radius: 50%;
            overflow: hidden;
            margin: auto;
            box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 18px;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        .title {
            margin: 29px auto;
            font-size: 26px;
            line-height: 1.3;
            color: #476582;
            font-weight: 400;
            padding: 0 20px;
        }
        .link {
            display: inline-block;
            font-size: 19px;
            color: #fff;
            background-color: #2d94e6;
            padding: 10px 19px;
            margin-bottom: 60px;
            border-radius: 4px;
            box-sizing: border-box;
        }
    }
    .footer {
        position: relative;
        height: 60px;
        // margin-top: -60px;
        // background-color: #f00;
    }
}

@media screen and (max-width: 700px) {
    .home {
        .banner {
            padding-top: 60px;
            .title {
                font-size: 22px;
                font-weight: 200;
            }
        }
    }
}
</style>