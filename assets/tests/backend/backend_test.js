/*
 Test api/backend.js
 */

import 'jasmine-promises';

import featuresFixture from './fixtures/features.js';
import clientFixture from './fixtures/client.js';

import mockApi from './mock/api.js';
const fetchMock = require('fetch-mock');

// Tiny hack to make sure fetch is actually mocked
mockApi(fetchMock);

const backend = require('../../js/api/backend.js').default;
// Destructure members
const {api, endpoints} = backend;
const {features, client} = endpoints;

// Make sure fetch is mocked properly
describe('fetchMock', () => {
    it('should work', function() {
        fetchMock.mock('http://google.com', 'GET', 200);
        return window.fetch('http://google.com').then((response) => {
            expect(fetchMock.lastUrl()).toBe('http://google.com');
        });
    });
});

describe('features endpoints', function() {

    afterEach(function() {
        // Clear request records
        fetchMock.reset();
    });

    describe('collection', function() {

        it('should fetch /api/features', function() {

            return features.getAll().then((response) => {
                expect(fetchMock.lastUrl()).toEqual('/api/features');
                // Response body should match the fixture
                expect(response.body().data()).toEqual(featuresFixture);
            });

        });
    });

    describe('member', function() {

        it('should fetch /api/features/id', function() {
            let fetches = featuresFixture.results.map(function(item) {
                // Grab object id
                const id = String(/.+\/([0-9]+)\/$/.exec(item.url)[1]);

                return features.get(id).then(function(response) {
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

describe('client endpoints', function() {

    afterEach(function() {
        // Clear request records
        fetchMock.reset();
    });


    it('should have a collection endpoint', function() {
        expect(client.collection).toBeDefined();
    });


    describe('collection', function() {

        it('should fetch /api/client', function() {

            return client.collection.getAll().then((response) => {
                expect(fetchMock.lastUrl()).toEqual('/api/client');
                // Response body should match the fixture
                expect(response.body().data()).toEqual(clientFixture);
            });

        });
    });

    it('should have a member endpoint', function() {
        expect(client.member).toBeDefined();
    });

    describe('member', function() {

        it('should fetch /api/client/id', function() {
            let fetches = clientFixture.results.map(function(item) {
                // Grab object id
                const id = String(/.+\/([0-9]+)\/$/.exec(item.url)[1]);

                return client.member(id).then(function(response) {
                    expect(response.body().data()).toEqual(item);
                });
            });

            return Promise.all(fetches);
        });
    });
});
