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


</template>

<script>
    import setting from '../setting';
    export default {
        name: 'PostView',

        data () {
            return {
                content: {
                    meta: {
                        title: 'Loading...'
                    },
                    content: 'Loading...'
                }
           }
        },
        route:{
            data (){
                let id = this.$route.params.id;
                this.$http.get(`../../api/${id}.json`)
                    .then(res => {
                        this.content = JSON.parse(res.body); 
                    })
            }
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
