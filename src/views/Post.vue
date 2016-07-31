<template>
	 <main class="post-view">
        <header class="banner">
            <a v-link="{path:'/blog'}">Home</a>
            <img src="/lib/assets/WZpXaW.jpg">
        </header>
        <section class="blog col-md-offset-1 col-md-10 col-sm-12">
            <div class="post">
                <h1 class="title">{{content.meta.title}}</h1>
                <p class="desc">
                
                    <span class="icon glyphicon glyphicon-home"></span>
                    发布于{{content.meta.date | date}}

                    <span class="icon glyphicon glyphicon-bookmark"></span>
                    {{content.meta.categories | capitalize}}

                </p>
                <div class="html" v-html="content.content"></div>
            </div>
            <p class="label-list">
                <span class="label" v-for="tag in content.meta.tags">{{tag}}</span>
            </p>
            <div class="into hidden-xs">
                <intro-component></intro-component>
            </div>
            <div class="page clearfix text-center hidden-xs">
                <div class="col-md-6">
                    <p><span class="label">Next</span>下一篇文章：</p>
                    <a v-if="content.meta.prev" v-link="{path:`/post/${content.meta.prev.id}`}">
                    {{content.meta.prev.title}}
                    </a>
                    <a v-else href="javascript:;">这是最新的一篇文章</a>
                </div>
                <div class="col-md-6 ">
                    <p><span class="label">Last</span>上一篇文章：</p>
                    <a v-if="content.meta.next"v-link="{path:`/post/${content.meta.next.id}`}">
                    {{content.meta.next.title}}
                    </a>
                <a v-else href="javascript:;">这是最早的一篇文章</a>
                </div>
            </div>
           <!--  <comment-component 
                class="v-comment-box"
                :key="key" 
                :title="title"
                :url="url"
            ></comment-component> -->
        </section>
    </main>
</template>	
<style lang="less">
    @import "../style/highlight.less";
    @import "../style/comment.less";
    .banner{
        display: block;
        position: relative;
        height: 300px;
        a,img{
            position: absolute;
        }
        a{
            color: white;
            margin: 1em;
        }
        img{
            width: 100%;
                height: inherit;
            z-index: -1;
        }
    }
    .label-list,.into{
        margin: 4em 0;
    }
    .page{
        padding: 4em 0;
        background-color: #f5f8fa;
        margin: 0 -100px; 
        p{
            line-height: 2;
            .label{
                border-color: black;
                border-radius: 4px;
                color: black;
                &:hover{
                    background-color: inherit;
                }
            }
        }
        a{
            color: rgba(0,0,0,0.5);
        }
    }
    .v-comment-box{
        margin-top: 3em;
    }
</style>
<script>
    import { date} from '../filters';
    // import commentComponent from '../components/comment-component.vue';
    import introComponent from '../components/intro-component.vue';
    export default {
        filters:{
            date
        },
        components:{
            // commentComponent,
            introComponent
        },
        data () {
            console.log(this);
            return {
                content: {
                    meta: {
                        title: 'Loading...',
                        prev:{
                            title:null,
                            id:null
                        },
                        next:{
                            title:null,
                            id:null
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
            data(){
                let id = this.$route.params.id;
                this.url = window.location.href;
                this.key = 'post'+this.$route.params.id;
                this.$http.get(`../../api/${id}.json`)
                    .then(res => {
                    this.content = JSON.parse(res.body); 
                    this.title = this.content.meta.title;
                    //load comment
                    // this.$children.forEach(v=>{
                    // if(v.constructor.name == 'CommentBox'){
                    //         v.init();return;                    
                    //     }
                    // })
                    document.body.scrollTop = 0;
                })
            }
            
        }
        
    }
</script>