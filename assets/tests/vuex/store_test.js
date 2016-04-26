import store from '../../js/vuex/store.js';

describe('store', function() {
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
        expect(typeof store.dispatch).toEqual("function");
    });

    describe('mutations', function() {
        describe('FEATURES_REPLACE', function() {
            it('should replace store.state.features', () => {
                const newGuy = [{}, {}, {}];

                store.dispatch('FEATURES_REPLACE', newGuy);

                expect(store.state.features).toEqual(newGuy);
            });
        });

        describe('FEATURES_APPEND', function() {
            it('should append items from array to store.state.features', () => {
                const newGuys = [{}, {}, {}],
                      oldLength = store.state.features.length;

                store.dispatch('FEATURES_APPEND', newGuys);
                expect(store.state.features.length).toBe(oldLength + newGuys.length);

                newGuys.forEach(function(newGuy) {
                    expect(store.state.features.find(function(element) {
                        return element === newGuy;
                    })).toBe(newGuy);
                });
            });
        });

        describe('CLIENTS_REPLACE', function() {
            it('should replace store.state.clients', () => {
                const newGuys = [{}, {}, {}];

                store.dispatch('CLIENTS_REPLACE', newGuys);
                expect(store.state.clients).toEqual(newGuys);
            });
        });

        describe('PRODUCTAREAS_REPLACE', function() {
            it('should replace store.state.clients', () => {
                const newGuys = [{}, {}, {}];

                store.dispatch('PRODUCTAREAS_REPLACE', newGuys);
                expect(store.state.productAreas).toEqual(newGuys);
            });
        });

        describe('SORT_SET_PROPERTY', function() {
            it('should set store.state.sort.by', function() {
                const property = 'sorting_property';

                store.dispatch('SORT_SET_PROPERTY', property);
                expect(store.state.sort.by).toEqual(property);
            });
        });

        describe('SORT_SET_REVERSE', function() {
            it('should set store.state.sort.reverse', function() {

                store.dispatch('SORT_SET_REVERSE', true);
                expect(store.state.sort.reverse).toBe(true);

                store.dispatch('SORT_SET_REVERSE', false);
                expect(store.state.sort.reverse).toBe(false);
            });
        });
    });
});
