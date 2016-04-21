/*
 Test actions in js/vuex/actions.js
 */

import 'jasmine-promises';
import sinon from 'sinon';
import delayed from './delayed.js';
import {mockBackend, mockResponse} from './mock.js';

/* Intercept vuex/actions.js imports */
const actionsInjector = require('inject!../../js/vuex/actions.js');

describe('fetchFeatures', function() {
    const backend = mockBackend(),
          /* Import actions while injecting mock backend */
          actions = actionsInjector({
              '../api/backend.js': backend
          });

    it('should call features.getAll()', function() {
        const getAll = sinon.stub().returns(Promise.resolve({}));
        backend.endpoints.features.getAll = getAll;
        actions.fetchFeatures({});
        expect(getAll.called).toBe(true);
    });

    it('should unwrap response and dispatch FEATURES_REPLACE', function() {
        /* Mock response to return from endpoint */
        const response = {results: {}},
              /* Stub to emulate features endpoint */
              getAll = sinon.stub().returns(
                  Promise.resolve(mockResponse(response))
              ),
              /* Stub for store.dispatch */
              dispatch = sinon.stub();

        /* Stub the endpoint */
        backend.endpoints.features.getAll = getAll;

        return delayed(function() {
            actions.fetchFeatures({dispatch});
        }, function() {
            /* Ensure correct args to dispatch */
            expect(dispatch.calledWith(
                'FEATURES_REPLACE',
                response.results
            )).toBe(true);
        });
    });

    it('should keep fetching if response has next and dispatch FEATURES_APPEND', function() {
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

        return delayed(function() {
            actions.fetchFeatures({dispatch});
        }, function() {

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
            expect(getAll.secondCall.args[0]).toEqual({page: '2'});
        });
    });
});

describe('fetchClients', function() {
    const backend = mockBackend(),
          actions = actionsInjector({
              '../api/backend.js': backend
          });

    it('should call client.getAll()', function() {
        const getAll = sinon.stub().returns(Promise.resolve({}));
        backend.endpoints.client.getAll = getAll;
        actions.fetchClients({});
        expect(getAll.called).toBe(true);
    });

    it('should unwrap response and dispatch CLIENTS_REPLACE', function() {
        /* Mock response to return from endpoint */
        const response = {results: {}},
              /* Stub to emulate clients endpoint */
              getAll = sinon.stub().returns(
                  Promise.resolve(mockResponse(response))
              ),
              /* Stub for store.dispatch */
              dispatch = sinon.stub();

        /* Stub the endpoint */
        backend.endpoints.client.getAll = getAll;

        return delayed(function() {
            actions.fetchClients({dispatch});
        }, function() {
            /* Test the args to dispatch */
            expect(dispatch.calledWith(
                'CLIENTS_REPLACE',
                response.results
            )).toBe(true);
        });
    });
});

describe('fetchProductAreas', function() {
    const backend = mockBackend(),
          actions = actionsInjector({
              '../api/backend.js': backend
          });

    it('should call productArea.getAll()', function() {
        const getAll = sinon.stub().returns(Promise.resolve({}));
        backend.endpoints.productArea.getAll = getAll;
        actions.fetchProductAreas({});
        expect(getAll.called).toBe(true);
    });

    it('should unwrap response and dispatch PRODUCTAREAS_REPLACE', function() {
        /* Mock response to return from endpoint */
        const response = {results: {}},
              /* Stub to emulate productAreas endpoint */
              getAll = sinon.stub().returns(
                  Promise.resolve(mockResponse(response))
              ),
              /* Stub for store.dispatch */
              dispatch = sinon.stub();

        /* Stub the endpoint */
        backend.endpoints.productArea.getAll = getAll;

        return delayed(function() {
            actions.fetchProductAreas({dispatch});
        }, function() {
            /* Test the args to dispatch */
            expect(dispatch.calledWith(
                'PRODUCTAREAS_REPLACE',
                response.results
            )).toBe(true);
        });
    });
});

describe('setSortProperty', function() {
    /* Use regular require */
    const actions = require('../../js/vuex/actions.js');
    const setSortProperty = actions.setSortProperty;

    it('should dispatch SORT_SET_PROPERTY', function() {
        const dispatch = sinon.stub();
        const property = 'sorting_property';

        setSortProperty({dispatch}, property);

        expect(dispatch.calledWith(
            'SORT_SET_PROPERTY',
            property
        )).toBe(true);
    });
});

describe('setSortReverse', function() {
    /* Use regular require */
    const actions = require('../../js/vuex/actions.js');
    const setSortReverse = actions.setSortReverse;

    it('should dispatch SORT_SET_REVERSE', function() {
        const dispatch = sinon.stub();

        setSortReverse({dispatch}, true);

        expect(dispatch.calledWith(
            'SORT_SET_REVERSE',
            true
        )).toBe(true);

        setSortReverse({dispatch}, false);

        expect(dispatch.calledWith(
            'SORT_SET_REVERSE',
            false
        )).toBe(true);
    });
});
