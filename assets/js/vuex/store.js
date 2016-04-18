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
    features: [],
    clients: [],
    productAreas: []
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
    },

    /**
     Replace the state.clients array
     */
    CLIENTS_REPLACE (state, clients) {
        state.clients = clients;
    },

    /**
     Replace the state.productAreas array
     */
    PRODUCTAREAS_REPLACE (state, productAreas) {
        state.productAreas = productAreas;
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
