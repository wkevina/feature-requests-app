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
 Functions that mutate our state object
 */
const mutations = {
    /**
     Replace the contents of the state.features array
     */
    FEATURES_REPLACE (state, features) {
        state.features = features;
    },

    /**
     Append new features to the state.features array
     */
    FEATURES_APPEND (state, features) {
        Array.prototype.push.apply(state.features, features);
    }
};

/**
 Bundle it all up in a Vuex.Store
 */
const store = new Vuex.Store({
    state,
    mutations
});

export default store;
