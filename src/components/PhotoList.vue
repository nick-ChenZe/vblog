<template>
    <div class="photolist-view">
        <main>
            <h1>照片区</h1>
            <ul class="photoList clearfix">
                <li v-for="item in items">
                    <a v-link="{path:`photo/detail/${item.id}`}">
                        <img v-bind:src="item.url">
                        <h5>{{item.title}}</h5>
                    </a>
                </li>
            </ul>
            <router-view
            class="view"
            transition="fade"
            transition-mode="out-in"
            ></router-view>
        </main>
    </div>
</template>
<style lang="less" scoped>
    .photolist-view{
        position: relative;
        top: 50px;
        padding: 50px 100px;
        main{
            h1{
                text-indent: 20px;
            }
            background-color: #efefef;
            padding: 30px;
            border-radius: .5em;
            min-height: 600px;
        }
        // transition: .1s opacity ease-out;
    }
    .fade-enter, .fade-leave {
      opacity: 0;
    }
    .photoList li{
        float: left;
        width: 25%;
        a{  
            display: inline-block;
            background-color: white;
            margin: 20px;
            padding: 10px;
            border-radius: 10px;
            border: 2px solid #34495e;
            img{
                width: 200px;
            }
            h5{
                background-color: #efefef;
                padding: .5em;
                margin-top: .5em;
                border-radius: .3em;
                text-indent: 2em;
            }
        }
    }
</style>
<script>


    export default {

        name: 'PhotoList',
        components: {
        },
        filters: {
            // date
        },

        data () {
            return {
                items: []
            }
        },

        route: {
            data(){
                this.$http.get('../../api/photoList.json')
                    .then(res => {
                        this.items = JSON.parse(res.body);
                    })
            }
        }

    }

</script>
