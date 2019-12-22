<template>
    <div class="home">
        <h1>Home</h1>
        <p>Count: {{count}}</p>
        <div><button @click="increment">count + 1</button></div>
        <div><button @click="decrement">count - 1</button></div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'home',
    computed: {
        ...mapGetters({ count: 'getCount' })
    },
    methods: {
        ...mapActions([
            'increment',
            'decrement'
        ])
    }
}
</script>