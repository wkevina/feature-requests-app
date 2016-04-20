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

        state.sort.by = 'title';
        const byTitle = getters.sortedFeatures(state);
        expect(byTitle.length).toBe(3);
    });
});
