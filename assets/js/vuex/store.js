import Vue from 'vue';
import Vuex from 'vuex';

import isIterable from '../../js/util/is-iterable.js';

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
    },
    /* Filters array */
    filters: []
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
        if (isIterable(features)) {
            state.features.push(...features);
        } else {
            state.features.push(features);
        }
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
    },

    /**
     Add filter to list
     */
    FILTER_APPEND(state, filter) {
        if (filter) {
            state.filters.push(filter);
        }
    },

    /**
     Remove filter from list
     */
    FILTER_REMOVE(state, filter) {
        if (filter) {
            state.filters.$remove(filter);
        }
    },

    /**
     Clear all filters
     */
    FILTER_RESET(state) {
        state.filters = [];
    },

    /**
     Modify existing filter object
     */
    FILTER_MODIFY(state, filter, changes) {
        /* Ensure filter is in filters list
         Not strictly necessary, but it would nice to know we're only operating
         on data we own */
        if (state.filters.includes(filter)) {
            Object.assign(filter, changes);
        }
    },

    /**
     Remove filter
     */
    FILTER_REMOVE(state, filter) {
        state.filters.$remove(filter);
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
