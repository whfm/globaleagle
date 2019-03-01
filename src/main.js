import Vue from 'vue'
import Header from './Header.vue'
import Main from './Main.vue'
import Router from 'vue-router'
import {routes} from './router.js'

Vue.use(Router);
const router = new Router({
    routes
});


new Vue({
    el:'#app',
    router,
    components:{
        'wh-header' : Header,
        'wh-main' : Main,
    }
})
