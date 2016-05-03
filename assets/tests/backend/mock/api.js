/*
 Configure nock interceptor for backend service
 */

import features from '../fixtures/features.js';
import client from '../fixtures/client.js';
import productArea from '../fixtures/productarea.js';

/* Returns a regex that will match /api/endpoint
 with optional trailing slash or query parameters */
function collection(endpoint, base='') {
    return RegExp(base + `/api/${endpoint}/?(\\?([^0-9].*))*$`);
}

/* Return path part of url */
function strip(url) {
    return url.replace(/^http:\/\/localhost:8000/, '');
}

/*
 Mock api using fetch-mock
 */
export default function mockApi(fetchMock) {
    // Intercept all calls to fetch
    fetchMock.greed = 'bad';

    fetchMock.mock(collection('features'), 'GET', features);
    fetchMock.mock(collection('client'), 'GET', client);
    fetchMock.mock(collection('productarea'), 'GET', productArea);

    const setup = (el) => fetchMock.mock(strip(el.url), 'GET', el);

    features.results.forEach(setup);
    client.results.forEach(setup);
    productArea.results.forEach(setup);
}
