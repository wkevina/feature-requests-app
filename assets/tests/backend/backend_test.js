/*
 Test api/backend.js
 */

import 'jasmine-promises';

import featuresFixture from './fixtures/features.js';

import mockApi from './mock/api.js';
const fetchMock = require('fetch-mock');

// Tiny hack to make sure fetch is actually mocked
mockApi(fetchMock);

const backend = require('../../js/api/backend.js').default;
// Destructure members
const {api, endpoints} = backend;
const {features} = endpoints;

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


    it('should have a collection endpoint', function() {
        expect(features.collection).toBeDefined();
    });


    describe('collection', function() {

        it('should fetch /api/features', function() {

            return features.collection.getAll().then((response) => {
                expect(fetchMock.lastUrl()).toEqual('/api/features');
                // Response body should match the fixture
                expect(response.body().data()).toEqual(featuresFixture);
            });

        });
    });

    it('should have a member endpoint', function() {
        expect(features.member).toBeDefined();
    });

    describe('member', function() {

        it('should fetch /api/features/id', function() {
            let fetches = featuresFixture.results.map(function(item) {
                // Grab object id
                const id = String(/.+\/([0-9]+)\/$/.exec(item.url)[1]);

                return features.member(id).then(function(response) {
                    expect(response.body().data()).toEqual(item);
                });
            });

            return Promise.all(fetches);
        });
    });
});
