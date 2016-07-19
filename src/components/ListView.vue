<template>
    <div class="list-view">
        <!-- loading -->
        <h2 v-if="!items.length">Loading...🐹</h2>

        <!-- loaded -->
        <ul v-if="items.length">
            <li v-for="item in items" transition>
                <a v-link="{name:'post',params:{id:item.id}}">
                    {{$index+1}}. {{ item.title}}
                    <span class="pull-right">{{item.date | date}}</span>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>

    import { date } from '../filters';
    export default {

        name: 'ListView',

        components: {
        },
        filters: {
            date
        },

        data () {
            return {
                items: []
            }
        },

        route: {
            data(){
                this.$http.get('../../api/list.json')
                    .then(res => {
                        this.items = JSON.parse(res.body);  
                    })
            }
        }
    }

</script>

<style lang="less">

    .list-view {
        padding: 70px 40px;
        li {
            margin-bottom: 1rem;

            a {
                font-size: 1.2rem;
            }
        }
    }

    @media(max-width: 600px) {
        .publish-date {
            display: none;
        }
    }

</style>