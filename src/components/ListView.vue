<template>
    <div class="list-view">
        <!-- loading -->
        <h2 v-if="!items.length">Loading...🐹</h2>

        <!-- loaded -->
        <ul v-if="items.length" class="article-list">
            <li v-for="item in items" track-by="$index" transition="list">
                <a v-link="{name:'post',params:{id:item.id}}">
                    {{(($route.params.page || 1)-1)*10+$index+1}}. {{ item.title}}
                    <span class="pull-right publish-date">
                        <i class="fa fa-calendar"></i>
                        {{item.date | date}}
                    </span>
                    <span class="pull-right">
                        <i class="fa fa-folder"></i>
                        {{item.categories}}
                    </span>
                </a>
            </li>
        </ul>
        <Pagination class="vue-pagination"></Pagination>
    </div>
</template>

<script>

    import { date, limitTo} from '../filters';
    import Pagination from './Pagination.vue'
    export default {

        name: 'ListView',

        components: {
            Pagination
        },
        filters: {
            date,limitTo
        },

        data () {
            return {
                items: [],
                perPagenNum: 10
            }
        },
        methods:{
            pageChange (){
                this.items = this._items.splice(0,10);
            }
        },
        route: {
            data(){
                if(this.$route.params.page > 5){
                    this.$router.go({path: '/404'})
                }
                this.$root.hideHeader = false;
                this.$http.get('../../api/list.json')
                    .then(res => {
                        let len,page = this.$route.params.page;
                        let start = (page-1)*10;
                        let end = start + 10;
                        this._items = JSON.parse(res.body);
                        len = this._items.length;
                        this.$broadcast('getTotalNum', len);
                        this.items = _.take(this._items,len).splice(start,end); 
                    })
            }
        }
    }

</script>

<style lang="less" scoped>

    .list-view {
        padding: 70px 200px;
        .article-list{
            li {
                line-height: 50px;
                i{
                    margin: 0 .1em;
                }
                .publish-date{
                    margin-left: 2em;
                }
            }
        }
    }
    .vue-pagination{
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translate(-50%,-100%);
    }
    .list-transition {
        transition: all .5s ease;
        overflow: hidden;
        margin: 0;
    }
    .list-enter, .list-leave {
        opacity: 0;
        height: 0;
    }
    @media(max-width: 600px) {
        .publish-date {
            display: none;
        }
    }

</style>