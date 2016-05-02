/**
Backend service

This module defines endpoints and access functions the features app REST service
*/

/* window.fetch polyfill */
import 'whatwg-fetch';
import restful, { fetchBackend } from 'restful.js';


/* Configure restful with fetch backend */
const api = restful('/api', fetchBackend(fetch));

const features = api.all('features');

const client = api.all('client');

const productArea = api.all('productarea');

export default {
    api,
    endpoints: {
        /* feature request objects */
        features,
        /* client objects */
        client,
        /* productArea objects */
        productArea
    }
};
