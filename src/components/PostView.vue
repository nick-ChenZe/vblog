<template>

    <div class="post-view">
        <!--<img ng-if="meta.thumbnail" src="meta.thumbnail">-->
        <h1 id="title">{{content.meta.title}}</h1>
        <article
            class="post-content"
            id="post"
            v-html="content.content"
            transition>
        </article>
        <div id="comments">
            <h2>
                <i class="fa fa-comments"></i>
                评论区
            </h2>
            <div class="ds-thread v-comment-box" v-bind:data-thread-key="key" v-bind:data-title="content.meta.title" v-bind:data-url="url"></div>
        </div>
     </div>  
      
</template>

<script>
    //TODO change DUOSHUO to DUSQUS
    var duoshuoFn = require('../setting/embed.js').default;

    export default {
        name: 'PostView',

        data () {
            return {
                content: {
                    meta: {
                        title: 'Loading...'
                    },
                    content: 'Loading...'
                },
                url: window.location.href,
                key: 'post'+this.$route.params.id
           }
        },
        attached(){
            let id = this.$route.params.id;
            this.url = window.location.href;
            this.key = 'post'+this.$route.params.id
            this.$http.get(`../../api/${id}.json`)
                .then(res => {
                    this.content = JSON.parse(res.body); 
                })
            duoshuoFn.initDuoShuo();
        }
    }

</script>

<style lang="less">

    .post-view {
        padding: 1.5em 4em;
        #title {
            line-height: 2;
            margin-bottom: .5em;
            margin-top: 2em;
            text-align: center;
        }

        p {
            line-height: 2rem;
            letter-spacing: 1px;
            word-wrap: break-word;
        }

    }

    .anchor {
        display: none;
    }

</style>
