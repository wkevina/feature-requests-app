/**
Backend service

This module defines endpoints and access functions the features app REST service
*/

/* window.fetch polyfill */
import 'whatwg-fetch';
import restful, {fetchBackend} from 'restful.js';


/* Configure restful with fetch backend */
const api = restful('/api', fetchBackend(fetch));

const featureCollection = api.all('features');
const featureMember = api.one('features');

export default {
    api,
    endpoints: {
        features: {
            collection: featureCollection,
            member: featureMember
        }
    }
};
