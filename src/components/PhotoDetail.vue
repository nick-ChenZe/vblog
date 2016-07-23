<template>
    <div class="mask" ctrl="{{$route.name}}">
        <main class="content">
            <div class="img-content">
                <img v-bind:src="detail.url" height="600" width="800" alt=""> 
            </div>
            <div class="side">
                <figcaption>
                    <i class="fa fa-picture-o"></i> 主人描述：
                    <br/>
                    <p> {{detail.desc}}</p>
                </figcaption>
                <div class="comments">
                    <i class="fa fa-comments"></i> 客人留言：
                    <br/>
                    <div class="ds-thread v-comment-box" id="ds-thread" v-bind:data-thread-key="key" v-bind:data-title="" v-bind:data-url="url"></div>
                </div>
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
        margin-top: -50px;
        background-color: rgba(0,0,0,.7);
        width: 100vw;
        min-width: 1000px;
        height: 100vh;
        min-height: 600px;
        top:0;
        left: 0;
        z-index: 100;
    }
    .content{
        display: flex;
        width: 90%;
        height: 90%;
        min-height: 600px;
        min-width: 1000px;
        margin: 0 auto;
        position: relative;
        background-color: white;
        .img-content{
            flex:1;
            background-color: black;
            display:flex;
            justify-content:center;
            align-items: center;
            background-color: black;;
            img{
                width: 80%;
                height: auto;
            }  
        }
        .side{
            flex: 1;
            padding: 20px;
            overflow: scroll;
        }
        .comments{
            margin-top: 1em;
            padding: .5em;
        }
        figcaption{
            background-color: #efefef;
            padding: .5em;
            border-radius: .3em;
            p{
                text-indent: 2em;
                margin: .5em 0;
                color: #999;
            }
        }
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
</style>
<script type="text/javascript">

    var duoshuoFn = require('../setting/embed.js').default;

    export default {
        data(){
            return {
                url: window.location.href,
                key: 'photo'+this.$route.params.id,
                detail:{
                    desc: ''
                }
            }
        },
        attached(){
           let id = this.$route.params.id;
            this.url = window.location.href;
            this.key = 'photo'+this.$route.params.id
            duoshuoFn.initDuoShuo();
        },
        methods:{
        },
        route:{
            data(){
                let list = this.$parent.items;
                if(!list.length){
                    this.$http.get('../../api/photoList.json')
                    .then(res => {
                        list = JSON.parse(res.body);
                        this.detail = _.filter(list,{id:+this.$route.params.id})[0];
                    })
                }else{
                    this.detail = _.filter(list,{id:+this.$route.params.id})[0];
                    console.log(this.detail);
                }
                console.log('p',this.detail);
            }
        }

    }
</script>
