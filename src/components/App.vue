<template>

    <div>
        <header>
            <!--search-->
            <!--<input v-model="keyword">-->
            <ul class="inline clearfix pull-right">
                <li><a href="" v-link="{name:'home'}">首页</a></li>
                <li><a href="" v-link="{name:'list',query:{page:1}}">归档</a></li>
                <li><a href="" v-link="{name:'photo'}">相册</a></li>
                <li><a href="" v-link="{name:'about'}">关于</a></li>
            </ul>
        </header>
        <!-- main -->
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
                setting: this.$route.setting
            }
        }
    }
</script>
<style lang="less">
    // reset css
    *{
        margin: 0;
        padding: 0;
        ul{
            list-style: none;
            &.inline{
                li{
                    float: left;
                }
            }
        }
        ol{
            padding-left: 1em;
        }
        a{
            text-decoration: none;
            color: #34495e;
        }
    }
    h1{
        text-align: center;
    }
    // h1,h2,h3,h4,h5{
    //     margin: .5em 0;
    // }
    pre,pre.hljs{
        border-radius: .5em;
        padding: 1em;
        background-color: #efefef;
        margin: .2em 0;
    }
    p code{
        background-color: #d1f1d3;
        color: #487ad2;
        padding: .2em .3em;
        border-radius: .3em;
        font-size: .9em;
        opacity: .8;
    }
    blockquote{
        background-color: #efefef;
        border-left: 8px solid #42b983;
        padding: .3em 1em;
        margin: .5em 0;
    }
    .pull-right{
        float: right !important;
    }
    .clearfix{
        &:after {
           content: " "; 
           visibility: hidden;
           display: block;
           height: 0;
           clear: both;
        }
    }
    body {
        font-family: "PT Sans","Helvetica Neue",Helvetica,"Hiragino Sans GB","STHeitiSC-Light","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        font-size: 16px;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        -webkit-text-size-adjust: none;
        color: #34495e;
    }

    header {
        box-shadow: 0 0 4px rgba(0,0,0,.3);
        background-color: #fff;
        z-index: 99;
        width: 100%;
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
    }
    .v-transition {
        // transition: opacity .2s ease;
    }

    .v-enter, .v-leave {
        opacity: 0;
    }
    .app-view{
        padding: 60px 40px;
    }
</style>