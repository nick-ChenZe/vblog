<template>
	 <main class="post-view">
        <div class="into hidden-sm hidden-xs clearfix">
            <intro-component v-bind:date="content.meta.date"></intro-component>
        </div>
        <h1 class="title">{{content.meta.title | capitalize}}</h1>
        <div class="cover" v-if="content.meta.cover ">
            <img v-bind:src="content.meta.cover">
        </div>
        <section class="blog col-sm-12">
            <div class="post">
                <div class="html" v-html="content.content"></div>
            </div>
            <p class="label-list clearfix">
                <small class="pull-left small" v-for="tag in content.meta.tags">{{tag}}</small>
            </p>
            
            <div class="page clearfix">
                <div class="col-md-6 text-center text-overflow">
                    <a v-if="content.meta.prev" v-link="{path:`/post/${content.meta.prev.id}`}">
                        Prev: {{content.meta.prev.title}}
                    </a>
                    <a v-else href="javascript:;">这是最早的一篇文章</a>
                </div>
                <div class="col-md-6 text-center text-overflow">
                    <a v-if="content.meta.next" v-link="{path:`/post/${content.meta.next.id}`}">
                    Next: {{content.meta.next.title}}
                    </a>
                <a v-else href="javascript:;">这是最新的一篇文章</a>
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
    // @import "../style/comment.less";
    .post-view{
        background-color: white;
        padding: 0 200px 0;
        .title{
            margin: 2em 0 0;
        }
        .into{
            margin-top: 60px;
        }
        .cover{
            margin: 2em -200px 2em;
            overflow: hidden;
            img{
                width: 100%;
                min-height: 400px;
            }
        }
        .page{
            font-size: 14px;
            margin: 0 -200px;
            border-top: 1px solid #ddd;
            >div{
                margin: 20px 0;
            }
        }
        .label-list{
            margin: 2em 0;
            .small{
                padding: .6em 2em;
                margin-right: 2em;
                background-color: #eee;
                border-radius: .2em;
            }
        }
    }

    @media (max-width: 1100px) {
        .post-view{
            padding: 20px;
            .cover{
                margin-left: -20px;
                margin-right: -20px;
            }
            .page{
                margin-left: 0;
                >div{
                    text-align: left;
                }
            }
        }
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
                    document.title = `${this.title} - ${this.$root.setting.user.username}`
                    document.body.scrollTop = 0;
                })
            }
            
        }
        
    }
</script>