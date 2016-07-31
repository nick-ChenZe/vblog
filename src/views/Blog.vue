<template>
    <main class="blog-view">
        <section class="content col-md-12">
            <h5>> 第一次记录文章于{{ start | dateAgo}}，至今共写了{{items.length}}篇文章，总计{{body.totalStringLength}}字, 留下{{body.tagNumber}}个标记 </h5>
            <div>
                <div class="item" v-for="item in items">
                    <h4 class="title" >
                        <a v-link="{path:`/post/${item.id}`}" class="text-overflow" v-bind:title="item.title"># {{item.title | capitalize}}</a>
                        <span class="badge danger" v-if="item.isTop">置顶</span>
                        <span class="pull-right hidden-xs">
                            <i>{{item.date | dateAgo}}发布于{{item.categories | capitalize}}</i> 
                        </span>
                    </h4>
                    <p>
                        <span class="label" v-for="tag in item.tags">{{tag}}</span>
                    </p>
                    <p>
                    {{item.snapshot}}
                    <a v-link="{path:`/post/${item.id}`}" class="inline">>></a>
                    </p>
                </div>
                <button v-on:click="load(pageNum)" class="btn btn-lg btn-default" v-show="hasItem">More</button>
            </div>
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
                hasItem:false,
                start: null,
                body: {
                    totalStringLength: 0,
                    tagNumbe: 0
                }
            }
        },
        attached(){
            if(!this.allItems.length){
                this.$http.get('../../api/list.json')
                    .then(res => {
                    this.body = JSON.parse(res.body);
                    this.start = this.body.lists[this.body.lists.length-1].date;
                    this.allItems = this.topItem(this.body.lists);
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
                // this.$broadcast('getTotalNum', len);
                this.items = _.take(this.allItems,len).splice(start,end);
                this.pageNum++;
            },
            topItem(arr){
                arr.unshift(..._.remove(arr,{isTop:true}));
                return arr;
            }
        }
    }

</script>

<style lang="less" scoped>
    .content{
        padding: 1em 2em;
        >h5{
            line-height: 1.5;
        }
        >div>button{
            margin: 2em auto;
            margin-left: 50%;
            transform: translate(-50%,0);
        }
    }
    .item{
        border-bottom: 1px solid #ddd;
        padding: 1em 0;
        p{
            margin: .8em 0; 
        }
        .inline{
            color: inherit;
            font-size: 15px;
            font-weight: bold;
        }
    }
</style>