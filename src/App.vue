<template>
    <div>
        <!-- <player-component class="player"></player-component> -->
        <router-view
            class="app-view"
            keep-alive
            transition
            transition-mode="out-in">
        </router-view>
    </div>
</template>
<script>
    import playerComponent from "./components/player-component.vue"

    export default{
        components:{
            playerComponent
        }
    }
</script>
<style lang="less">
    @import "main.less";
    .nav{
        position: absolute;
        min-width: 900px;
        top: 0;
        left: 0;
    }
    .player{
        position: fixed;
        bottom: 0;
        right: 0;
        z-index: 200;
    }
    .v-transition {
        transition: opacity .5s ease;
    }

    .v-enter, .v-leave {
        opacity: 0;
    }
</style>