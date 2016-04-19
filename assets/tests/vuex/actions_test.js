/*
 Test actions in js/vuex/actions.js
 */

import 'jasmine-promises';
//import sinon from 'sinon';
const sinon = require('sinon');

function mockBackend() {
    return {
        endpoints: {
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
    };
}

function mockResponse(payload) {
    return {
        body() {
            return {
                data() {
                    return {
                        results: payload
                    };
                }
            };
        }
    };
}

let actionsInjector = require('inject!../../js/vuex/actions.js');

console.log(sinon);

describe('fetchFeatures', function() {
    const backend = mockBackend(),
          actions = actionsInjector({
              '../api/backend.js': mockBackend()
          });

    xit('should call features.getAll()', function() {
        const getAll = sinon.stub().returns(Promise.resolve({}));
        backend.endpoints.features.getAll = getAll;
        actions.fetchFeatures({});
        expect(getAll.called).toBe(true);
    });
});
