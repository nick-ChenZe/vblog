<template>
    <div ctrl="{{$route.name}}">
        <h1>Photo</h1>
        <ul class="photoList">
            <li v-for="item in items">
                <a v-link="{path:'photo/detail'}">
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
<style lang="less">
    .view{
        // transition: .1s opacity ease-out;
    }
    .fade-enter, .fade-leave {
      opacity: 0;
    }
    [ctrl = "photo"]{
        .photoList li{
            float: left;
            width: 220px;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: .4em;
            margin: 10px;
            img{
                width: 200px;
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
