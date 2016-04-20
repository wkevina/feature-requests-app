/*
 Test actions in js/vuex/actions.js
 */

import 'jasmine-promises';
//import sinon from 'sinon';
const sinon = require('sinon');

function mockBackend() {

    return {
        //default: {
            endpoints:  {
                features: {
                    getAll: function() {}
                },
                client: {
                    getAll: function() {}
                },
                productArea: {
                    getAll: function() {}
                }
            }
        //}
    };
}

function mockResponse(payload, status=200) {
    return {
        body() {
            return {
                data() {
                    return payload;
                }
            };
        },
        statusCode() {
            return status;
        }
    };
}

function delayed(setup, wrapup, delay=200) {
    const promise = new Promise(function(resolve) {
        setup();
        setTimeout(resolve, delay);
    }).then(wrapup);

    return promise;
}

const actionsInjector = require('inject!../../js/vuex/actions.js');

describe('fetchFeatures', function() {
    const backend = mockBackend(),
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
