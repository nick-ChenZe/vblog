<template>

    <div>
        <header class="header" v-show="!hideHeader">
            <!--search-->
            <!--<input v-model="keyword">-->
            <a href="" class="logo">
                <img src="../favicon.png">
                竖八不正
            </a>
            <ul class="inline clearfix pull-right">
                <li><a href="" v-link="{name:'home'}">首页</a></li>
                <li><a href="" v-link="{name:'list',params:{page:1}}">目录</a></li>
                <li><a href="" v-link="{name:'photo'}">相册</a></li>
                <li><a href="" v-link="{name:'about'}">关于</a></li>
            </ul>
        </header>
        <!-- main -->
       <!--  <div class="player">
            <iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 src="http://music.163.com/outchain/player?type=2&id=4938705&auto=1&height=66"></iframe>
        </div> -->
        <router-view
            class="app-view"
            keep-alive
            transition
            transition-mode="out-in">
        </router-view>
    </div>

</template>
<script>
    export default {
        name: 'home',

        data () {
            return {
                hideHeader: false
            }
        }
    }
</script>
<style lang="less">
    @import "../main.less";

    .header {
        box-shadow: 0 0 4px rgba(0,0,0,.3);
        background-color: #fff;
        z-index: 99;
        width: 100%;
        height: 50px;
        position: fixed;
        .inline{
            margin-right: 3em;
            li{
                margin: 0 .6em;
                a{
                    padding: .3em 0;
                    line-height: 3;
                    &:hover, &:active, &:focus,&.v-link-active{
                        border-bottom: 4px solid #42b983;
                    }
                    &:visited{
                        color: inherit;
                    }
                }
            }
        }
        .logo{
            height: 50px;
            display: inline-block;
            line-height: 50px;
            img{
                vertical-align: -9px;
                height: 30px;
                margin: 0 1em 0 5em;
            }
        }
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