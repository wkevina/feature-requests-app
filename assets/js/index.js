import Vue from 'vue';
import store from './vuex/store.js';
import * as actions from './vuex/actions.js';
import App from './app.vue';

import backend from './api/backend.js';

/* Bootstrap the application */
new Vue({
    el: '#app',
    template: '<div><app></app></div>',
    store,
    components: {App},
    vuex: {
        actions
    },
    compiled() {
        this.fetchFeatures();
        this.fetchClients();
    }
});
