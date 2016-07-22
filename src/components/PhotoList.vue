<template>
    <div ctrl="{{$route.name}}">
        <h1>Photo</h1>
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
    </div>
</template>
<style lang="less" scoped>
    .view{
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
            margin: 20px;
            padding: 10px;
            border-radius: 10px;
            border: 2px solid #ddd;
            img{
                width: 200px;
            }
            h5{
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
                        this.items = JSON.parse(res.body).map(s=>{
                            s.url = '/api/images/block.png';
                            return s;
                        });  
                    })
            }
        }

    }

</script>
