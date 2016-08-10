<template>
    <main class="blog-view">
    <!-- TODO: Need Nav Bar -->
        
        <section class="col-md-3 col-xs-12 pull-right">
           <input-component></input-component>
           <div class="profile hidden-xs hidden-sm" v-bind:class="{'fixed': isFix}">
                <profile-component></profile-component>
                <div class="attrs">
                    <h5 class="sub">- 标签</h5>
                   <span class="small" v-for="tag in $root.setting.tags">{{tag}}</span>
                </div>
                <div class="link">
                    <h5 class="sub">- 友链</h5>
                </div>
           </div>
        </section>
        <section class="content col-md-9">
            <h5>> 第一次记录文章于{{ start | dateAgo}}，至今共写了{{allItems.length}}篇文章，总计{{body.totalStringLength}}字, 留下{{body.tagNumber}}个标记 </h5>
            <div>
                <div class="item" v-for="item in items"  v-bind:data-date="item.date | dateAgo">
                    <div class="ill" v-if="item.cover">
                        <img v-bind:src="item.cover">
                    </div>
                    <h4 class="title" >
                        {{item.title | capitalize}}
                        <span class="badge danger" v-if="item.isTop">置顶</span>
                    </h4>
                    <p class="snap">
                        {{item.snapshot}}
                    </p>
                    <a v-link="{path:`/post/${item.id}`}">
                        <small class="small">查看更多...</small>
                    </a>
                    <p class="tags clearfix">
                        <i class="icon icon-tag pull-left"></i>
                        <small class="small pull-left" v-for="tag in item.tags">{{tag}}</small>
                        <small class="small pull-right">
                            <!-- <i class="icon icon-book"></i> -->
                            归档于 {{item.categories | capitalize}}
                        </small>
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
    import inputComponent from '../components/input-component.vue';
    export default {

        name: 'ListView',

        components: {
            profileComponent,
            inputComponent,
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
                },
                isFix: false
            }
        },
        attached(){
            document.title= this.$root.setting.user.username;
            let that = this;
            window.addEventListener('scroll', function(e){
                that.isFix = document.body.scrollTop > 70?true:false;
            })
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
                let end = page*this.$root.setting.pageItem;
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
    .blog-view{
        padding: 1em;
        .fixed{
            position: fixed;
            top: 0;
        }
    }
    .profile{
        padding: 0 20px;
        >section{
            margin-left: -20px;
        }
    }
    .content{
        >h5{
            line-height: 1.5;
        }
        >div{
            padding: 1em 0;
            >button{
                margin: 1em auto;
                margin-left: 50%;
                transform: translate(-50%,0);
            }
        }
    }
    [data-date]{
        position: relative;
        overflow: hidden;
        &:after{
            content: attr(data-date);
            border-radius: 3px;
            width: 8em;
            height: 8em;
            font-size: 14px;
            transform: rotate(45deg) translate(0,-70%);
            padding-top: 6em;
            text-align: center;
            font-weight: bold;
            position: absolute;
            background-color: #00ab6b;
            color: white;
            top: 0;
            right: 0;
        }
    }
    .item{
        box-shadow: 0 1px 4px rgba(0,0,0,.04);
        border: 1px solid rgba(0,0,0,.09);
        border-radius: 3px;
        background-color: white;
        padding: 1em;
        margin-bottom: 1.5em;
        .title{
            font-size: 1.4em;
            margin: 0 0 .8em;
        }
        .snap{
            color: rgba(0,0,0,.44);
            font-size: .8em;
            &::after{
                content: '...';
            }
        }
        >.ill{
            height: 200px;
            overflow: hidden;
            border-radius: 3px;
            margin-bottom: 1em;
            img{
                max-width: 100%;
                min-height: 200px;
            }
        }
        .tags{
            margin: .5em 0 0;
            border-top: 1px solid rgba(0,0,0,.09);
            padding-top: 1em;
            .small{
                &.pull-left{
                    padding: .2em 1.5em;
                    margin: 0 .3em;
                    background-color: #eee;
                    border-radius: .2em;
                }
            }
        }
    }
    .attrs,.link{
        margin-left: -25px;
        .sub{
            font-size: 14px;
            padding: 1em 0;
            border-bottom: 1px solid #ddd;
        }
        span{
            padding: .7em 1.4em;
            margin-right: .5em;
            background-color: white;
            border: 1px solid #eee;
            color: #666;
            border-radius: .2em;
        }
    }
</style>