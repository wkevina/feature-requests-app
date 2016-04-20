/*
 Configure nock interceptor for backend service
 */

import features from '../fixtures/features.js';
import client from '../fixtures/client.js';
import productArea from '../fixtures/productarea.js';

/*
 Mock api using fetch-mock
 */

export default function (fetchMock) {

    /* Serve from origin of page */
    //const base = window.location.origin;
    const base = '';

    fetchMock.mock(base + '/api/features', features);

    fetchMock.mock(base + '/api/client', client);

    fetchMock.mock(base + '/api/productarea', productArea);

    function strip (url) {
        return url.replace(/^http:\/\/localhost:8000/, '');
    }

    features.results.forEach((feature) => {
        const url = strip(feature.url);

        fetchMock.mock(RegExp(url + '?$'), feature);
    });

    client.results.forEach((client) => {
        const url = base + strip(client.url);

        fetchMock.mock(RegExp(url + '?$'), client);
    });

    productArea.results.forEach((area) => {
        const url = base + strip(area.url);

        fetchMock.mock(RegExp(url + '?$'), area);
    });
}
