import Vue from 'vue';
import VueRouter from 'vue-router';
import sync from 'vuex-router-sync';

import store from './vuex/store.js';
import * as actions from './vuex/actions.js';

import App from './app.vue';
import FeatureList from './components/featurelist.vue';

Vue.use(VueRouter);

let router = new VueRouter({
    linkActiveClass: 'active'
});

router.map({
    '/list': {
        component: FeatureList,
        name: 'list-all'
    },
    '/new': {
        component: FeatureList,
        name: 'new-feature'
    }
});

/* Bootstrap the application */
router.start({
    template: '<div><app></app></div>',
    store,
    components: {App},
    vuex: {
        actions
    },
    compiled() {
        this.fetchFeatures();
        this.fetchClients();
        this.fetchProductAreas();
    }
}, '#app');

router.redirect({
    '*': '/list'
});

/* sync route info to store */
sync(store, router);
