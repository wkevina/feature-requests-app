/*
 Test api/backend.js
 */

import 'jasmine-promises';

import featuresFixture from './fixtures/features.js';
import clientFixture from './fixtures/client.js';
import productAreaFixture from './fixtures/productarea.js';
import mockApi from './mock/api.js';

// polyfill fetch
require('whatwg-fetch');

const fetchMock = require('fetch-mock');
// Tiny hack to make sure fetch is actually mocked
mockApi(fetchMock);

const backend = require('../../js/api/backend.js').default;
// Destructure members
const { api, endpoints } = backend;
const { features, client, productArea } = endpoints;

// Make sure fetch is mocked properly
describe('fetchMock', () => {
    it('should work', function () {
        fetchMock.mock('http://google.com', 'GET', 200);
        return window.fetch('http://google.com').then((response) => {
            expect(fetchMock.lastUrl()).toBe('http://google.com');
        });
    });
});

function grabId(url) {
    // Return {id} portion of /api/endpoint/{id}/
    return /.+\/([0-9]+)\/$/.exec(url)[1];
}

describe('features endpoints', function () {

    afterEach(function () {
        // Clear request records
        fetchMock.reset();
    });

    describe('collection', function () {

        it('should fetch /api/features', function () {

            return features.getAll().then((response) => {
                expect(fetchMock.lastUrl()).toEqual('/api/features');
                // Response body should match the fixture
                expect(response.body().data()).toEqual(featuresFixture);
            });

        });

        it('should fetch /api/features/?page=1', function () {

            return features.getAll({ page: 1 }).then((response) => {
                expect(fetchMock.lastUrl()).toEqual('/api/features?page=1');
                // Response body should match the fixture
                expect(response.body().data()).toEqual(featuresFixture);
            });

        });
    });

    describe('member', function () {

        it('should fetch /api/features/id', function () {
            let fetches = featuresFixture.results.map(function (item) {
                // Grab object id
                const id = grabId(item.url);

                return features.get(id).then(function (response) {
                    let expectedUrl = RegExp(`/api/features/${id}/?$`);
                    expect(fetchMock.called(expectedUrl)).toBe(true);
                    expect(response.body().data()).toEqual(item);
                });
            });

            return Promise.all(fetches);
        });
    });
});



// Test client API
// You'll notice this is essentially identical to the features API test
// Well, I can't figure out how to DRY my way out of this without getting real fancy

describe('client endpoints', function () {

    afterEach(function () {
        // Clear request records
        fetchMock.reset();
    });


    describe('collection', function () {

        it('should fetch /api/client', function () {

            return client.getAll().then((response) => {
                expect(fetchMock.lastUrl()).toEqual('/api/client');
                // Response body should match the fixture
                expect(response.body().data()).toEqual(clientFixture);
            });

        });
    });


    describe('member', function () {

        it('should fetch /api/client/id', function () {
            let fetches = clientFixture.results.map(function (item) {
                // Grab object id
                const id = grabId(item.url);

                return client.get(id).then(function (response) {
                    let expectedUrl = RegExp(`/api/client/${id}/?$`);
                    expect(fetchMock.called(expectedUrl)).toBe(true);
                    expect(response.body().data()).toEqual(item);
                });
            });

            return Promise.all(fetches);
        });
    });
});


// Test productArea API

describe('productArea endpoints', function () {

    afterEach(function () {
        // Clear request records
        fetchMock.reset();
    });


    describe('collection', function () {

        it('should fetch /api/productarea', function () {

            return productArea.getAll().then((response) => {
                expect(fetchMock.lastUrl()).toEqual('/api/productarea');
                // Response body should match the fixture
                expect(response.body().data()).toEqual(productAreaFixture);
            });

        });
    });


    describe('member', function () {

        it('should fetch /api/productarea/id', function () {
            let fetches = productAreaFixture.results.map(function (item) {
                // Grab object id
                const id = grabId(item.url);

                return productArea.get(id).then(function (response) {
                    let expectedUrl = RegExp(`/api/productarea/${id}/?$`);
                    expect(fetchMock.called(expectedUrl)).toBe(true);
                    expect(response.body().data()).toEqual(item);
                });
            });

            return Promise.all(fetches);
        });
    });
});
