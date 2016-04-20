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
