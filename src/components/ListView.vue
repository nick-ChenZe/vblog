<template>
    <div class="list-view">
        <!-- loading -->
        <h2 v-if="!items.length">Loading...🐹</h2>

        <!-- loaded -->
        <ul v-if="items.length" class="article-list">
            <li v-for="item in items" transition>
                <a v-link="{name:'post',params:{id:item.id}}">
                    {{($route.params.page-1)*10+$index+1}}. {{ item.title}}
                    <span class="pull-right">{{item.date | date}}</span>
                </a>
            </li>
        </ul>
        <Pagination></Pagination>
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

<style lang="less">

    .list-view {
        padding: 70px 40px;
        .article-list{
            li {
                margin-bottom: 1rem;
        
                a {
                    font-size: 1.2rem;
                }
            }
        }
    }

    @media(max-width: 600px) {
        .publish-date {
            display: none;
        }
    }

</style>