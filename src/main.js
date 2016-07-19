// vendor
import Vue from 'vue';
import Router from 'vue-router';

// components
import App from './components/App.vue';
import ListView from './components/ListView.vue';
import PostView from './components/PostView.vue';
import PhotoList from './components/PhotoList.vue';
import Home from './components/Home.vue';
import About from './components/About.vue';
import PhotoDetail from './components/photoDetail.vue';
// setting
import setting from './setting';
//require('bootstrap/dist/css/bootstrap.min.css');
require('highlight.js/styles/github-gist.css');
require('lodash');
var VueResource = require('vue-resource');

// debug
Vue.config.debug = true;

// install router
Vue.use(Router);
Vue.use(VueResource);
    
// routing
let router = new Router();

router.map({
    'home': {
        name: 'home',
        component: Home,
        setting
    },
    '/list': {
        name: 'list',
        component: ListView
    },
    '/post/:id': {
        name: 'post',
        component: PostView
    },
    'about': {
        name: 'about',
        component: About
    },
    '/photo': {
        name: 'photo',
        component: PhotoList,
        subRoutes:{
            '/detail':{
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