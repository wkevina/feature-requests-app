import Vue from 'vue';
import VueRouter from 'vue-router';
import VueForm from 'vue-form';
import {sync} from 'vuex-router-sync';

import store from './vuex/store.js';
import * as actions from './vuex/actions.js';

import App from './app.vue';
import FeatureList from './components/featurelist.vue';
import FeatureForm from './components/featureform.vue';

Vue.use(VueRouter);
Vue.use(VueForm);

let router = new VueRouter({
    linkActiveClass: 'active'
});

/* sync route info to store */
sync(store, router);

router.map({
    '/list': {
        name: 'home'
    },
    '/list/:page': {
        component: FeatureList,
        name: 'list-all'
    },
    '/new': {
        component: FeatureForm,
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
    '*': '/list/1'
});

router.alias({
    '/list': '/list/1'
});
