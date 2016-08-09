<template>
    <div class="container-fluid">
        <!-- <player-component class="player"></player-component> -->
        <router-view
            class="app-view row"
            keep-alive
            transition
            transition-mode="out-in">
        </router-view>
    </div>
</template>
<script>
    import playerComponent from "./components/player-component.vue"
    import setting from './setting.js';
    export default{
        components:{
            playerComponent
        },
        data(){
            return {
                setting: setting
            }
        }
    }
</script>
<style lang="less">
    @import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
    @import "./style/main.less";
    .app-view{
        background-color: #fafafa;
        min-height: 100vh;
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