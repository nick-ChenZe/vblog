<template>
	 <main class="post-view">
        <!-- loading -->
        <!-- <h2 v-if="!items.length">Loading...🐹</h2> -->
        <!-- loaded -->
        
        <section class="content">
            <header class="banner">
                <img src="/lib/assets/WZpXaw.jpg">
            </header>
            <div class="blog">
                <h1>{{content.meta.title}}</h1>
                <p>
                    <span class="icon fa fa-home"></span>
                    {{content.meta.date | date}}
                </p>
                <div class="html" v-html="content.content"></div>
            </div>
        </section>
        <section class="side">

        </section>
    </main>
</template>	
<style lang="less" scoped>
    .banner{
        position: relative;
        height: 300px;
        img{
            position: absolute;
            width: 100%;
            height: 100%;  
        }
    }
    span.icon{
        display: inline-block;
        background-color: white;
        height: 30px;
        width: 30px;
        border-radius: 100%;
        box-shadow: 0 0 4px rgba(0,0,0,.1); 
    }
    .blog{
        padding: 0 60px;
        h1{
            font-size: 2.5em;
            line-height: 2;
            margin: 1em 0;
        }
        p{
            color: #999;
        }
        .html{
            padding: 3em 0;
        }
        .icon{
            margin-right: .5em;
            text-align: center;
            color: #34495e;
            line-height: 30px;
            font-size: 20px;
        }
    }
	.post-view{
        display: flex;
        &>section{
            height: 100vh;
        }
        .content{
            flex:5;
            overflow-y: scroll;
            border-right: 2px solid black; 
        }
        .side{
            flex:2;
        }
    }
</style>
<script>
    var duoshuoFn = require('../setting/embed.js').default;
    import { date} from '../filters';

    export default {
        filters:{
            date
        },
        data () {
            return {
                content: {
                    meta: {
                        title: 'Loading...'
                    },
                    content: 'Loading...'
                },
                url: window.location.href,
                key: 'post'+this.$route.params.id,
                month: '',
                day: ''
           }
        },
        attached(){
            let id = this.$route.params.id;
            this.url = window.location.href;
            this.key = 'post'+this.$route.params.id
            this.$http.get(`../../api/${id}.json`)
                .then(res => {
                    this.content = JSON.parse(res.body); 
                    let d = new Date(this.content.meta.date).toString().split(" ");
                    this.month = d[1];
                    this.day = +d[2]+1;
                })
            // duoshuoFn.initDuoShuo();
        }
    }
</script>