import store from '../../js/vuex/store.js';

describe('store', function () {
    it('should exist', () => {
        expect(store).toBeDefined();
    });

    it('should have a state object', () => {
        expect(store.state.features).toBeDefined();
    });

    it('should have a features array', () => {
        expect(store.state.features).toBeDefined();
    });

    it('should have a dispatch method', () => {
        // Is defined
        expect(store.dispatch).toBeDefined();
        // Is a function
        expect(typeof store.dispatch).toEqual('function');
    });

    describe('mutations', function () {
        describe('FEATURES_REPLACE', function () {
            it('should replace store.state.features', () => {
                const newGuy = [{}, {}, {}];

                store.dispatch('FEATURES_REPLACE', newGuy);

                expect(store.state.features).toEqual(newGuy);
            });
        });

        describe('FEATURES_APPEND', function () {
            it('should append items from array to store.state.features', () => {
                const newGuys = [{}, {}, {}],
                      oldLength = store.state.features.length;

                store.dispatch('FEATURES_APPEND', newGuys);
                expect(store.state.features.length).toBe(oldLength + newGuys.length);

                newGuys.forEach(function (newGuy) {
                    expect(store.state.features.find(function (element) {
                        return element === newGuy;
                    })).toBe(newGuy);
                });
            });
        });

        describe('CLIENTS_REPLACE', function () {
            it('should replace store.state.clients', () => {
                const newGuys = [{}, {}, {}];

                store.dispatch('CLIENTS_REPLACE', newGuys);
                expect(store.state.clients).toEqual(newGuys);
            });
        });

        describe('PRODUCTAREAS_REPLACE', function () {
            it('should replace store.state.clients', () => {
                const newGuys = [{}, {}, {}];

                store.dispatch('PRODUCTAREAS_REPLACE', newGuys);
                expect(store.state.productAreas).toEqual(newGuys);
            });
        });

        describe('SORT_SET_PROPERTY', function () {
            it('should set store.state.sort.by', function () {
                const property = 'sorting_property';

                store.dispatch('SORT_SET_PROPERTY', property);
                expect(store.state.sort.by).toEqual(property);
            });
        });

        describe('SORT_SET_REVERSE', function () {
            it('should set store.state.sort.reverse', function () {

                store.dispatch('SORT_SET_REVERSE', true);
                expect(store.state.sort.reverse).toBe(true);

                store.dispatch('SORT_SET_REVERSE', false);
                expect(store.state.sort.reverse).toBe(false);
            });
        });

        describe('FILTER_APPEND', function () {
            it('should add filter to filters', function () {

                const testFilter = {};
                const notInList = {};
                const badFilter = null;
                const extraBadFilter = undefined;

                store.dispatch('FILTER_APPEND', testFilter);
                store.dispatch('FILTER_APPEND', badFilter);
                store.dispatch('FILTER_APPEND', extraBadFilter);

                // should add valid objects
                expect(store.state.filters.includes(testFilter)).toBe(true);
                // if this wasn't true, I wouldn't know what to do
                expect(store.state.filters.includes(notInList)).toBe(false);
                // should NOT accept null
                expect(store.state.filters.includes(badFilter)).toBe(false);
                // should NOT accept undefined
                expect(store.state.filters.includes(extraBadFilter)).toBe(false);
            });
        });

        describe('FILTER_REMOVE', function () {
            it('should remove filter from filters', function () {

                const testFilter = {};
                const anotherFilter = {};

                // manually append items
                store.state.filters.push(testFilter);
                store.state.filters.push(anotherFilter);
                // make sure items are present
                expect(store.state.filters.includes(testFilter)).toBe(true);
                expect(store.state.filters.includes(anotherFilter)).toBe(true);

                store.dispatch('FILTER_REMOVE', testFilter);
                // should NOT find testFilter
                expect(store.state.filters.includes(testFilter)).toBe(false);
                // other filters should NOT be affected
                expect(store.state.filters.includes(anotherFilter)).toBe(true);
            });
        });

        describe('FILTER_RESET', function () {
            it('should remove all filters', function () {
                // manually append items
                store.state.filters.push({});
                store.state.filters.push({});

                store.dispatch('FILTER_RESET');

                expect(store.state.filters.length).toEqual(0);
            });
        });

        describe('FILTER_MODIFY', function () {
            it('should change properties of filter', function () {
                const filter = { prop: 'test', value: 'test' };

                // manually append items
                store.state.filters.push(filter);

                store.dispatch('FILTER_MODIFY', filter, {
                    prop: 'different',
                    value: 'different'
                });

                expect(filter.prop).toEqual('different');
                expect(filter.value).toEqual('different');
            });
        });

        describe('FILTER_REMOVE', function () {
            it('should remove a particular filter', function () {
                const filter = { prop: 'test', value: 'test' };

                // manually append items
                store.state.filters.push(filter);

                const lengthBefore = store.state.filters.length;

                store.dispatch('FILTER_REMOVE', filter);

                expect(store.state.filters.length).toEqual(lengthBefore - 1);
                expect(store.state.filters.includes(filter)).toEqual(false);
            });
        });
    });
});
