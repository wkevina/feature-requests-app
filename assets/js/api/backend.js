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
const featureMember = (id) => featureCollection.get(id);

const clientCollection = api.all('client');
const clientMember = (id) => clientCollection.get(id);

export default {
    api,
    endpoints: {
        /* feature request objects */
        features: {
            collection: featureCollection,
            member: featureMember
        },
        /* client objects */
        client: {
            collection: clientCollection,
            member: clientMember
        }
    }
};
