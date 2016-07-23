<template>

    <div class="post-view">
        <div class="paper">
            <h1 id="title">{{content.meta.title}}</h1>
            <div class='calendar'>
                  <div class='day'></div>
                  <div class='month'>
                    <div class='month-name'>{{month}}</div>
                  </div>
                  <div class='number'>{{day}}</div>
              </div>
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
            duoshuoFn.initDuoShuo();
        }
    }

</script>

<style lang="less">
    @import "../paper.less";
    @import "../calendar.less";
    .post-view {
        position: relative;
        top: 50px;
        padding: 30px 200px;
        background-color: #efefef; 
        .paper{
            padding: 50px 40px 
        }
        .calendar{
            position: absolute;
            top: -50px;
            right: 40px;
        }
        #title {
            line-height: 2;
            margin: .5em 0 1.4em 0;
            text-align: center;
        }
        h2,h3,h4,h5{
            margin: .5em 0;
        }
        p {
            line-height: 1.5;
            margin: 1em 0;
            word-wrap: break-word;
        }

    }

</style>
