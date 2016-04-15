import Vue from 'vue';
import Vuex from 'vuex';

// Must initialize plugin
// Has to be done here because webpack hoists imports before executable code
Vue.use(Vuex);


/**
Application-wide state object
*/
const state = {
    /* Supply mock data for now */
    features: [
        {title: 'sample'},
        {title: 'sample2'},
        {title: 'sample3'}
    ]
};

/**
Functions that can mutate our state object
*/
const mutations = {

};

/**
Bundle it all up in a Vuex.Store
*/
const store = new Vuex.Store({
    state
});

export default store;