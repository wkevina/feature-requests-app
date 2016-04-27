import {mockState} from './mock.js';
import * as getters from '../../js/vuex/getters.js';


describe('features', function(){
    it('should return clients array', function() {
        const state = {
            features: [{}, {}, {}]
        };

        const got = getters.features(state);
        expect(got).toBe(state.features);
    });
});

describe('clients', function(){
    it('should return clients array', function() {
        const state = {
            clients: [{}, {}, {}]
        };

        const got = getters.clients(state);
        expect(got).toBe(state.clients);
    });
});


describe('productAreas', function(){
    it('should return productAreas array', function() {
        const state = {
            productAreas: [{}, {}, {}]
        };

        const got = getters.productAreas(state);
        expect(got).toBe(state.productAreas);
    });
});

describe('expandedFeatures', function(){
    it('should return array of features with client and product_area replaced with representative objects', function() {
        const state = mockState();

        const got = getters.expandedFeatures(state);

        expect(got.length).toBe(3);

        got.forEach(function(el, index) {
            expect(el.title).toEqual(state.features[index].title);
            expect(el.client).toEqual(state.clients[index]);
            expect(el.product_area).toEqual(state.productAreas[index]);
        });
    });
});

describe('sortedFeatures', function() {
    it('should sort features by state.sort props', function() {
        const state = mockState();
        state.sort = {
            by: null,
            reverse: false
        };

        /* Sort by simple property */
        state.sort.by = 'title';
        const byTitle = getters.sortedFeatures(state);
        expect(byTitle.length).toBe(3);
        expect(byTitle.map(el => el.title)).toEqual(
            ['Mock1', 'Mock2', 'Mock3']
        );

        /* Reverse sort */
        state.sort.reverse = true;

        const reverseTitle = getters.sortedFeatures(state);
        expect(reverseTitle.map(el => el.title)).toEqual(
            ['Mock3', 'Mock2', 'Mock1']
        );

        /* Sort by nested property */
        state.sort.by = 'client.name';
        state.sort.reverse = false;

        const byClient = getters.sortedFeatures(state);
        expect(byClient.map(el => el.client.name)).toEqual(
            ['Client A', 'Client B', 'Client C']
        );
    });
});

describe('sortProperty', function() {
    it('should return sorting key', function() {
        const state = {};
        state.sort = {
            by: 'sort_property'
        };

        const got = getters.sortProperty(state);
        expect(got).toEqual('sort_property');

        state.sort.by = null;
        const gotNull = getters.sortProperty(state);
        expect(gotNull).toEqual(null);
    });
});

describe('sortReverse', function() {
    it('should return sorting key', function() {
        const state = {};
        state.sort = {
            reverse: false
        };

        const got = getters.sortReverse(state);
        expect(got).toBe(false);

        state.sort.reverse = true;
        const gotNull = getters.sortReverse(state);
        expect(gotNull).toBe(true);
    });
});

describe('filterList', function() {
    it('should return filters array', function() {
        const state = {filters: []};

        const got = getters.filterList(state);

        expect(got).toBe(state.filters);
    });
});
