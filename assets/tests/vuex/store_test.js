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
    });
});
