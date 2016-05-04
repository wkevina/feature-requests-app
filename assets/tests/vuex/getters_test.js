import { mockState } from './mock.js';
import * as getters from '../../js/vuex/getters.js';


describe('features', function () {
    it('should return clients array', function () {
        const state = {
            features: [{}, {}, {}]
        };

        const got = getters.features(state);
        expect(got).toBe(state.features);
    });
});

describe('clients', function () {
    it('should return clients array', function () {
        const state = {
            clients: [{}, {}, {}]
        };

        const got = getters.clients(state);
        expect(got).toBe(state.clients);
    });
});


describe('productAreas', function () {
    it('should return productAreas array', function () {
        const state = {
            productAreas: [{}, {}, {}]
        };

        const got = getters.productAreas(state);
        expect(got).toBe(state.productAreas);
    });
});

describe('expandedFeatures', function () {
    it('should return array of features with client and product_area replaced with representative objects', function () {
        const state = mockState();

        const got = getters.expandedFeatures(state);

        expect(got.length).toBe(3);

        got.forEach(function (el, index) {
            expect(el.title).toEqual(state.features[index].title);
            expect(el.client).toEqual(state.clients[index]);
            expect(el.product_area).toEqual(state.productAreas[index]);
        });
    });
});

describe('sortedFeatures', function () {
    it('should sort features by state.sort props', function () {
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

describe('sortProperty', function () {
    it('should return sorting key', function () {
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

describe('sortReverse', function () {
    it('should return sorting key', function () {
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

describe('filterList', function () {
    it('should return filters array', function () {
        const state = { filters: [] };

        const got = getters.filterList(state);

        expect(got).toBe(state.filters);
    });
});

describe('filterOptions', function () {
    it('should return array describing filters', function () {
        const state = {
            clients: [{ name: 'Client A' }, { name: 'Client B' }],
            productAreas: [{ name: 'Sales' }, { name: 'Billing' }]
        };

        const got = getters.filterOptions(state);

        expect(got.length).toBe(3);

        expect(got[0].title).toEqual('Title');
        expect(got[0].prop).toEqual('title');

        expect(got[1].title).toEqual('Client Name');
        expect(got[1].prop).toEqual('client.name');
        expect(got[1].values).toEqual(['Client A', 'Client B']);

        expect(got[2].title).toEqual('Product Area');
        expect(got[2].prop).toEqual('product_area.name');
        expect(got[2].values).toEqual(['Sales', 'Billing']);
    });
});

describe('filteredFeatures', function () {
    beforeEach(function () {
        this.state = mockState();
        this.state.sort = {};
    });

    it('should return exact matches for filters with values list', function () {
        this.state.filters = [
            {
                opt: { title: 'Client', prop: 'client.name' },
                value: 'Client A'
            }
        ];

        const onlyClientA = getters.filteredFeatures(this.state);
        expect(onlyClientA.length).toBe(1);
        expect(onlyClientA[0].title).toEqual('Mock1');

        // Add another mutually exclusive filter
        this.state.filters.push(
            { opt: { title: 'Product Area', prop: 'product_area.name' },
              value: 'Marketing' }
        );

        const noMatch = getters.filteredFeatures(this.state);
        expect(noMatch.length).toBe(0);
    });

    it('should return substring matches for filters with no values list', function () {
        this.state.filters = [
            {
                opt: { title: 'Title', prop: 'title' },
                value: 'MoCk'
            }
        ];

        const matchAll = getters.filteredFeatures(this.state);
        expect(matchAll.length).toBe(3);
        expect(matchAll.map(el => el.title))
            .toEqual(['Mock1', 'Mock2', 'Mock3']);

        this.state.filters = [
            {
                opt: { title: 'Title', prop: 'title' },
                value: 'Mock1'
            }
        ];

        const matchOne = getters.filteredFeatures(this.state);
        expect(matchOne.length).toBe(1);
        expect(matchOne[0].title).toEqual('Mock1');
    });
});
