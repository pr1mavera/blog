<template>
    <div id="app">
        <ul>
            <router-link to="/" exact><span>首页</span></router-link>
            <router-link to="/topics/12345"><span>topics</span></router-link>
            <router-link to="/component1"><span>组件1-同步</span></router-link>
            <router-link to="/component2"><span>组件2-异步</span></router-link>
        </ul>
        <router-view class="view"></router-view>
    </div>
</template>

<script>
export default {
    name: 'app'
}
</script>