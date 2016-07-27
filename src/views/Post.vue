<template>
	 <main class="post-view">
        <section class="content">
            <header class="banner">
                <a v-link="{path:'/blog'}">Home</a>
                <img src="/lib/assets/WZpXaW.jpg">
            </header>
            <div class="blog">
                <h1>{{content.meta.title}}</h1>
                <p>
                    <span class="icon fa fa-calendar"></span>
                    {{content.meta.date | date}}
                </p>
                <div class="html" v-html="content.content"></div>
            </div>
            <div class="into">
                <intro-component></intro-component>
            </div>
            <div class="page">

                <a v-if="content.meta.prev" v-link="{path:`/post/${content.meta.prev.id}`}">
                    <i class="fa fa-chevron-circle-left"></i>
                    {{content.meta.prev.title}}
                </a>
                <a v-link="{path:`/post/${content.meta.next.id}`}">
                    {{content.meta.next.title}}
                    <i class="fa fa-chevron-circle-right"></i>
                </a>
            </div>
            <comment-component 
                class="v-comment-box"
                :key="key" 
                :title="title"
                :url="url"
            ></comment-component>
        </section>
    </main>
</template>	
<style lang="less" scoped>
    .banner{
        position: relative;
        height: 400px;
        a{
            display: inline-block;
            post: absolute;
            margin: 1em;
            color: white;
        }
        img{
            position: absolute;
            width: 100%;
            height: 100%;  
            top: 0;
            left:0;
            z-index: -1;
        }
    }
    .page{
        height: 80px;
        background-color: #eee;
        padding: 0 100px;
        line-height: 80px;
        font-size: 1.1em;
        display: flex;
        a{
            i{
                margin: 0 .5em;
                vertical-align: -2px;
                font-size: 1.5em;
            }
            flex: 1;
            color: #aaa;
            &:last-child{
                text-align: right;
            }
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
            padding: 2em 0;
        }
        .icon{
            margin-right: .5em;
            text-align: center;
            color: #34495e;
            line-height: 30px;
            font-size: 16px;
        }
    }
	.post-view{
        display: flex;
    }
    .v-comment-box{
        padding: 60px;
    }
</style>
<script>
    import { date} from '../filters';
    import commentComponent from '../components/comment-component.vue';
    import introComponent from '../components/intro-component.vue';
    export default {
        filters:{
            date
        },
        components:{
            commentComponent,
            introComponent
        },
        data () {
            return {
                content: {
                    meta: {
                        title: 'Loading...',
                        prev:{
                            title:'',
                            id:''
                        },
                        next:{
                            title:'',
                            id:''
                        }
                    },
                    content: 'Loading...'
                },
                key: 'post'+this.$route.params.id,
                title: '',
                url: window.location.href,
                id: this.$route.params.id
           }
        },
        route:{
            canReuse:false,
            activate(){
                let id = this.$route.params.id;
            this.url = window.location.href;
            this.key = 'post'+this.$route.params.id;
            this.$http.get(`../../api/${id}.json`)
                .then(res => {
                    this.content = JSON.parse(res.body); 
                    this.title = this.content.meta.title;
                })
            this.$children.forEach(v=>{
                if(v.constructor.name == 'CommentBox'){
                    v.init();return;                    
                }
            })
            }
            
        }
        
    }
</script>