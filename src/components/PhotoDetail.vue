<template>
    <div class="mask" ctrl="{{$route.name}}">
        <main class="content">
            <div class="img-content">
                <img src="../../photo/images/block.png" height="600" width="800" alt=""> 
            </div>
            <div class="side">
                <figcaption>Fig1. MDN Logo</figcaption>
                <div class="ds-thread v-comment-box" id="ds-thread" v-bind:data-thread-key="key" v-bind:data-title="" v-bind:data-url="url"></div>
            </div>
            <a class="btn btn-close pull-right" v-link="{path:'/photo'}">
                <i class="fa fa-close"></i>
            </a>
        </main>
    </div>
</template>
<style lang="less" scoped>
    .mask{
        display:flex;
        position: absolute;
        justify-content:center;
        align-items: center;
        background-color: rgba(0,0,0,.7);
        width: 100vw;
        height: 100vh;
        top:0;
        left: 0;
        z-index: 100;
    }
    .btn-close{
        display: inline-block;
        color: white;
        width: 24px;
        height: 24px;
        line-height: 24px;
        font-size: 20px;
        background-color: black;
        border-radius: 100%;
        position: absolute;
        border: 4px solid white;
        top: 0;
        right: 0;
        text-align: center;
        transform: translate(50%,-50%);
    }
    .content{
        width: 1000px;
        margin: 0 auto;
        position: relative;
        background-color: white;
        &>div{
            float: left;
        }
        .img-content{
            width: 55%;
            display:flex;
            justify-content:center;
            align-items: center;
            background-color: black;;
            img{
                width: 100%;
                height: auto;
            }  
        }
        .side{
            width: 45%;
        }
    }
</style>
<script type="text/javascript">

    var duoshuoFn = require('../setting/embed.js').default;

    export default {
        data(){
            return {
                url: window.location.href,
                key: 'photo'+this.$route.params.id
            }
        },
        attached(){
           let id = this.$route.params.id;
            this.url = window.location.href;
            this.key = 'photo'+this.$route.params.id
            duoshuoFn.initDuoShuo();
        },
        methods:{
        }
    }
</script>
