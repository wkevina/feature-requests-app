import Vue from 'vue';
import store from './vuex/store.js';
import App from './app.vue';

/* Bootstrap the application */
new Vue({
    el: '#app',
    template: '<div><app></app></div>',
    store,
    components: {App}
});
