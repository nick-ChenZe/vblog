// vendor
import Vue from 'vue';
import Router from 'vue-router';

// components
import App from './App.vue';
import PhotoList from './components/PhotoList.vue';
import Home from './views/Home.vue';
import Blog from './views/Blog.vue';
import Category from './views/Category.vue';
import Post from './views/Post.vue';
import PhotoDetail from './components/photoDetail.vue';

//require('bootstrap/dist/css/bootstrap.min.css');
require('highlight.js/styles/github-gist.css');
require('lodash');
require('font-awesome/css/font-awesome.min.css')
var VueResource = require('vue-resource');
window.duoshuoQuery = {short_name:"chenze2168"};

// debug
Vue.config.debug = true;

// install router
Vue.use(Router);
Vue.use(VueResource);
    
// routing
let router = new Router();  

router.map({
    '/home': {
        name: 'home',
        component: Home
    },
    '/blog': {
        name: 'Blog',
        component: Blog
    },
    '/post/:id': {
        name: 'post',
        component: Post,
        canReuse:false
    },
    '/category': {
        name: 'category',
        component: Category
    },
    '/photo': {
        name: 'photo',
        component: PhotoList,
        subRoutes:{
            '/detail/:id':{
                name: 'photo.detail',
                component: PhotoDetail
            }
        }
    },
    //404
    '/404':{
        name:'error',
        component: require("./components/Error.vue")
    }
});

router.redirect({
    '/': '/home',
    '*': '/404'
});
// let's begin
router.start(App, '#app');