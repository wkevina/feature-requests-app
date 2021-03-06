/*
 Test actions in js/vuex/actions.js
 */

import 'jasmine-promises';
import sinon from 'sinon';
import delayed from './delayed.js';
import { mockBackend, mockResponse } from './mock.js';

/* Intercept vuex/actions.js imports */
const actionsInjector = require('inject!../../js/vuex/actions.js');

describe('fetchFeatures', function () {
    const backend = mockBackend(),
          /* Import actions while injecting mock backend */
          actions = actionsInjector({
            '../api/backend.js': backend
        });

    it('should call features.getAll()', function () {
        const getAll = sinon.stub().returns(Promise.resolve({}));
        backend.endpoints.features.getAll = getAll;
        actions.fetchFeatures({});
        expect(getAll.called).toBe(true);
    });

    it('should unwrap response and dispatch FEATURES_REPLACE', function () {
        /* Mock response to return from endpoint */
        const response = { results: {} },
              /* Stub to emulate features endpoint */
              getAll = sinon.stub().returns(
                  Promise.resolve(mockResponse(response))
              ),
              /* Stub for store.dispatch */
              dispatch = sinon.stub();

        /* Stub the endpoint */
        backend.endpoints.features.getAll = getAll;

        return delayed(function () {
            actions.fetchFeatures({ dispatch });
        }, function () {
            /* Ensure correct args to dispatch */
            expect(dispatch.calledWith(
                'FEATURES_REPLACE',
                response.results
            )).toBe(true);
        });
    });

    it('should keep fetching if response has next and dispatch FEATURES_APPEND', function () {
        /* Mock response to return from endpoint */
        const responses = [
            {
                results: {},
                previous: null,
                next: '/api/features/?page=2'
            },
            {
                results: {},
                previous: '/api/features/',
                next: null
            }
        ],
              /* Stub to emulate features endpoint */
              getAll = sinon.stub(),
              /* Stub for store.dispatch */
              dispatch = sinon.stub();

        /* Configure reponses */
        getAll.onFirstCall().returns(
            Promise.resolve(mockResponse(responses[0]))
        );

        getAll.onSecondCall().returns(
            Promise.resolve(mockResponse(responses[1]))
        );

        /* Stub the endpoint */
        backend.endpoints.features.getAll = getAll;

        return delayed(function () {
            actions.fetchFeatures({ dispatch });
        }, function () {

            /* Should be called twice */
            expect(dispatch.callCount).toBe(2);

            /* Ensure correct args to dispatch */
            const firstCall = dispatch.firstCall;
            expect(firstCall.calledWith(
                'FEATURES_REPLACE',
                responses[0].results
            )).toBe(true);

            /* Should append on second call */
            const secondCall = dispatch.secondCall;
            expect(secondCall.calledWith(
                'FEATURES_APPEND',
                responses[1].results
            )).toBe(true);

            /* Should call endpoint with params object */
            expect(getAll.secondCall.args[0]).toEqual({ page: '2' });
        });
    });
});

describe('postFeature', function () {
    const backend = mockBackend();
    const actions = actionsInjector({
        '../api/backend.js': backend
    });

    beforeEach(function () {
        this.dispatch = sinon.stub();
        this.post = sinon.stub();
        backend.endpoints.features.post = this.post;
    });

    it('should call post method on features endpoint', function () {
        const postData = {
            key: 'value'
        };

        this.post.returns(Promise.resolve(mockResponse({}, 201)));

        actions.postFeature({ dispatch: this.dispatch }, postData);

        expect(this.post.called).toBe(true);
        expect(this.post.calledWith(postData)).toBe(true);
    });

    it('should dispatch FEATURES_APPEND with returned data on 201', function () {
        const body = {
            key: 'value'
        };

        this.post.returns(Promise.resolve(mockResponse(body, 201)));

        return delayed(() => {
            actions.postFeature({ dispatch: this.dispatch }, {});
        }, () => {
            expect(
                this.dispatch.calledWith('FEATURES_APPEND', body)
            ).toBe(true);
        });
    });

});

describe('fetchClients', function () {
    const backend = mockBackend(),
          actions = actionsInjector({
            '../api/backend.js': backend
        });

    it('should call client.getAll()', function () {
        const getAll = sinon.stub().returns(Promise.resolve({}));
        backend.endpoints.client.getAll = getAll;
        actions.fetchClients({});
        expect(getAll.called).toBe(true);
    });

    it('should unwrap response and dispatch CLIENTS_REPLACE', function () {
        /* Mock response to return from endpoint */
        const response = { results: {} },
              /* Stub to emulate clients endpoint */
              getAll = sinon.stub().returns(
                  Promise.resolve(mockResponse(response))
              ),
              /* Stub for store.dispatch */
              dispatch = sinon.stub();

        /* Stub the endpoint */
        backend.endpoints.client.getAll = getAll;

        return delayed(function () {
            actions.fetchClients({ dispatch });
        }, function () {
            /* Test the args to dispatch */
            expect(dispatch.calledWith(
                'CLIENTS_REPLACE',
                response.results
            )).toBe(true);
        });
    });
});

describe('fetchProductAreas', function () {
    const backend = mockBackend(),
          actions = actionsInjector({
            '../api/backend.js': backend
        });

    it('should call productArea.getAll()', function () {
        const getAll = sinon.stub().returns(Promise.resolve({}));
        backend.endpoints.productArea.getAll = getAll;
        actions.fetchProductAreas({});
        expect(getAll.called).toBe(true);
    });

    it('should unwrap response and dispatch PRODUCTAREAS_REPLACE', function () {
        /* Mock response to return from endpoint */
        const response = { results: {} },
              /* Stub to emulate productAreas endpoint */
              getAll = sinon.stub().returns(
                  Promise.resolve(mockResponse(response))
              ),
              /* Stub for store.dispatch */
              dispatch = sinon.stub();

        /* Stub the endpoint */
        backend.endpoints.productArea.getAll = getAll;

        return delayed(function () {
            actions.fetchProductAreas({ dispatch });
        }, function () {
            /* Test the args to dispatch */
            expect(dispatch.calledWith(
                'PRODUCTAREAS_REPLACE',
                response.results
            )).toBe(true);
        });
    });
});

describe('setSort', function () {
    /* Use regular require */
    const actions = require('../../js/vuex/actions.js');
    const setSort = actions.setSort;

    it('should dispatch SORT_SET_PROPERTY when called with object with property key', function () {
        const dispatch = sinon.stub();
        const property = 'sorting_property';

        setSort({ dispatch }, { property });

        expect(dispatch.calledWith(
            'SORT_SET_PROPERTY',
            property
        )).toBe(true);
    });

    it('should dispatch SORT_SET_REVERSE when called with object with reverse key', function () {
        const dispatch = sinon.stub();

        setSort({ dispatch }, { reverse: true });

        expect(dispatch.calledWith(
            'SORT_SET_REVERSE',
            true
        )).toBe(true);
    });

    it('should dispatch SORT_SET_REVERSE and SORT_SET_PROPERTY when called with object when property and reverse key', function () {
        const dispatch = sinon.stub();
        const property = 'sorting_property';

        setSort({ dispatch }, { property, reverse: true });

        expect(dispatch.calledWith(
            'SORT_SET_REVERSE',
            true
        )).toBe(true);

        expect(dispatch.calledWith(
            'SORT_SET_PROPERTY',
            property
        )).toBe(true);
    });
});

describe('addEmptyFilter', function () {
    const actions = require('../../js/vuex/actions.js');
    const addEmptyFilter = actions.addEmptyFilter;

    it('should dispatch FILTER_APPEND with empty filter', function () {
        const dispatch = sinon.stub();

        addEmptyFilter({ dispatch });

        expect(dispatch.calledWith(
            'FILTER_APPEND',
            { opt: null, value: null }
        )).toBe(true);
    });
});

describe('updateFilter', function () {
    const actions = require('../../js/vuex/actions.js');
    const updateFilter = actions.updateFilter;

    it('should dispatch FILTER_MODIFY with new values', function () {
        const dispatch = sinon.stub();
        const filter = { opt: null, value: null };
        const props = {
            opt: {},
            value: 'find me'
        };

        updateFilter({ dispatch }, filter, props);

        expect(dispatch.calledWith(
            'FILTER_MODIFY',
            filter,
            props
        )).toBe(true);
    });
});

describe('removeFilter', function () {
    const actions = require('../../js/vuex/actions.js');
    const removeFilter = actions.removeFilter;

    it('should dispatch FILTER_REMOVE with filter argument', function () {
        const dispatch = sinon.stub();
        const filter = {};

        removeFilter({ dispatch }, filter);

        expect(dispatch.calledWith(
            'FILTER_REMOVE',
            filter
        )).toBe(true);
    });
});
