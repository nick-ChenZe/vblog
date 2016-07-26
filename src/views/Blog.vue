<template>
    <main class="blog-view">
        <section class="content">
            <div>
                <div class="item" v-for="item in items">
                    <h4 class="title" >
                        <a v-link="{path:`/post/${item.id}`}" class="text-overflow" v-bind:title="item.title"># {{item.title}}</a>
                        <span class="pull-right">
                            <i class="fa fa-calendar"></i>
                            {{item.date | dateAgo}}
                        </span>
                    </h4>
                    <div class="clearfix">
                        <span class="pull-left tags" v-for="tag in item.tags | limit 1">
                            <i class="fa fa-tag"></i>
                            {{tag}}
                        </span>
                        <span class="pull-left tags" v-if="!item.tags || item.tags.length == 0">
                            <i class="fa fa-tag"></i>
                            Blog
                        </span>
                    </div>
                    <div class="html" v-html="item.snapshot">
                    </div>
                    <!-- <a v-link="{path:`/post/${item.id}`}" class="btn btn-default pull-right">More</a> -->
                </div>
                <button v-on:click="load(pageNum)" class="btn" v-show="hasItem">More</button>
            </div>
        </section>
        <section class="side">
            <profile-component></profile-component>
        </section>
    </main>
</template>

<script>
    import { date, limit,dateAgo} from '../filters';
    import profileComponent from '../components/profile-component.vue';
    export default {

        name: 'ListView',

        components: {
            profileComponent
        },
        filters: {
            date,limit,dateAgo
        },
        data () {
            return {
                allItems:[],
                items: [],
                perPagenNum: 10,
                pageNum: 1,
                hasItem:false
            }
        },
        attached(){
            if(!this.allItems.length){
                this.$http.get('../../api/list.json')
                    .then(res => {
                    this.allItems = JSON.parse(res.body);
                    this.load(this.pageNum);
                })
            }
        },
        methods:{
            load (page){
                let len = this.allItems.length;
                let start = 0;
                let end = page*10;
                this.hasItem = end < len ? true : false;
                this.$broadcast('getTotalNum', len);
                this.items = _.take(this.allItems,len).splice(start,end);
                this.pageNum++;
            }
        }
    }

</script>

<style lang="less">
    .blog-view{
        display: flex;
        &>section{
            height: 100vh;
        }
        .content{
            flex:5;
            overflow-y: scroll;
            text-align: center;
            &>div{
                padding: 80px;
                &>.btn{
                    margin-top: 2em;
                    padding: .5em 5em;
                }
            }
            .item{
                text-align: left;
                font-size: 1.5em;
                padding: 1.5em;
                border-bottom: 4px dashed;
                .title{
                    i{
                        margin: 0 1em;
                    }
                    a{
                        display: inline-block;
                        width: 70%;
                    }
                }
                &:hover{
                    background-color: #5495f1;
                    color: white;
                    a{
                        color: white;
                    }
                }
                .tags{
                    font-size: .6em;
                    line-height: 3;
                }
                .html{
                    *{
                       font-size: 14px; 
                    }
                    blockquote,pre{
                        color: #34495e;
                    }
                    img{
                        width: 80%;
                    }
                }
            }
        }
        .side{
            width: 400px;
        }
    }
</style>