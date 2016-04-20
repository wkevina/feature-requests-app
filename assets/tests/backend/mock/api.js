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
function strip (url) {
    return url.replace(/^http:\/\/localhost:8000/, '');
}

/*
 Mock api using fetch-mock
 */
export default function (fetchMock) {
    // Intercept all calls to fetch
    fetchMock.greed = 'bad';

    fetchMock.mock(collection('features'), features);
    fetchMock.mock(collection('client'), client);
    fetchMock.mock(collection('productarea'), productArea);

    features.results.forEach((feature) => {
        const url = strip(feature.url);

        fetchMock.mock(RegExp(url + '?$'), feature);
    });

    client.results.forEach((client) => {
        const url = strip(client.url);

        fetchMock.mock(RegExp(url + '?$'), client);
    });

    productArea.results.forEach((area) => {
        const url = strip(area.url);

        fetchMock.mock(RegExp(url + '?$'), area);
    });
}
