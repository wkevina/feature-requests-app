import Vue from 'vue';
import Vuex from 'vuex';

// Must initialize plugin
// Has to be done here because webpack hoists imports before executable code
Vue.use(Vuex);


/**
 Application-wide state object
 */
const state = {
    features: [],
    clients: [],
    productAreas: [],
    /* Features sorting properties */
    sort: {
        /* Property to sort by */
        by: null,
        /* True to reverse sort order, false otherwise */
        reverse: false
    }
};

/**
 Functions that mutate our state object
 */
const mutations = {
    /**
     Replace the contents of the state.features array
     */
    FEATURES_REPLACE(state, features) {
        state.features = features;
    },

    /**
     Append new features to the state.features array
     */
    FEATURES_APPEND(state, features) {
        state.features.push(...features);
    },

    /**
     Replace the state.clients array
     */
    CLIENTS_REPLACE(state, clients) {
        state.clients = clients;
    },

    /**
     Replace the state.productAreas array
     */
    PRODUCTAREAS_REPLACE(state, productAreas) {
        state.productAreas = productAreas;
    },

    /**
     Set state.sort.by property
     */
    SORT_SET_PROPERTY(state, property) {
        state.sort.by = property;
    },

    /**
     Set state.sort.reverse
     */
    SORT_SET_REVERSE(state, reverse) {
        state.sort.reverse = reverse;
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
