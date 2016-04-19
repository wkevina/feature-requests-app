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
        const state = {
            features: [
                {
                    title: 'This is my title',
                    client: '/api/client/1/',
                    product_area: '/api/productarea/1/'
                },
                {
                    title: 'This is my title',
                    client: '/api/client/2/',
                    product_area: '/api/productarea/2/'
                },
                {
                    title: 'This is my title',
                    client: '/api/client/3/',
                    product_area: '/api/productarea/3/'
                }
            ],
            clients: [
                {
                    name: 'Client A',
                    url: '/api/client/1/'
                },
                {
                    name: 'Client B',
                    url: '/api/client/2/'
                },
                {
                    name: 'Client C',
                    url: '/api/client/3/'
                }
            ],
            productAreas: [
                {
                    name: 'Sales',
                    url: '/api/productarea/1/'
                },
                {
                    name: 'Marketing',
                    url: '/api/productarea/2/'
                },
                {
                    name: 'Widgets',
                    url: '/api/productarea/3/'
                }
            ]
        };

        const got = getters.expandedFeatures(state);

        expect(got.length).toBe(3);

        got.forEach(function(el, index) {
            expect(el.title).toEqual(state.features[index].title);
            expect(el.client).toEqual(state.clients[index]);
            expect(el.product_area).toEqual(state.productAreas[index]);
        });
    });
});
